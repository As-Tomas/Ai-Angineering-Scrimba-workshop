import React, { useEffect, useState } from "react";
import { openai, supabase } from "./config.js";
import podcasts from "./content.js";

export default function CreateAnEmbedding() {
  const [embedding, setEmbedding] = useState(null);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  // User query about podcasts
  //   const query = "I feel like having a good laugh! fin me few movies";
  //   const query = "What's the highest rated movie?";
  //   const query = "The movie with that actor from Castaway?";

  // Bring all function calls together
  async function main(input) {
    try {
      const embedding = await createEmbedding(input);
      const match = await findNearestMatch(embedding);
      return await getChatCompletion(match, input);
    } catch (error) {
      console.error("Error in main function.", error);
    }
  }

  // Create an embedding vector representing the input text
  async function createEmbedding(input) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input,
    });
    return embeddingResponse.data[0].embedding;
  }

  // Query Supabase and return a semantically matching text chunk
  async function findNearestMatch(embedding) {
    const { data } = await supabase.rpc("match_movies", {
      query_embedding: embedding,
      match_threshold: 0.50,
      match_count: 4,
    });
    // Manage multiple returned matches
    const match = data.map((obj) => obj.content).join("\n");
    return match;
  }

  // Use OpenAI to make the response conversational
  const chatMessages = [{
      role: "system",
      content: `You are an enthusiastic movie expert who loves recommending movies to people. You
       will be given two pieces of information - some context about movies and a question. Your main 
       job is to formulate a short answer to the question using the provided context. If the answer is
        not given in the context, find the answer in the conversation history if possible. If you are
         unsure and cannot find the answer, say, "Sorry, I don't know the answer." Please do not make up
          the answer. Always speak as if you were chatting to a friend.`,
    }];

  async function getChatCompletion(text, query) {

    chatMessages.push({
      role: "user",
      content: `Context: ${text} Question: ${query}`,
    });

    const { choices } = await openai.chat.completions.create({
      model: "gpt-4",
      messages: chatMessages,
      temperature: 0.65,
      frequency_penalty: 0.5,
    });

    chatMessages.push(choices[0].message);
    return choices[0].message.content;
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(inputValue);
  };

useEffect(() => {
    const fetchData = async () => {
        const data = await main(query);
        setEmbedding(data);
    };

    if (query) {
        fetchData();
    }
}, [query]);

  return (
    <div>
      <h1>Embedding</h1>
      <form onSubmit={handleSubmit} className="flex flex-row space-y-3 items-center justify-center">
        <label className="flex flex-row">
          Query:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
        />
      </form>

      <p className=" text-2xl font-bold text-slate-600">
        {embedding ? JSON.stringify(embedding) : "Loading..."}
      </p>
    </div>
  );
}
