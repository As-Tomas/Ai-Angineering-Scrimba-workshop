import React, { useEffect, useState } from "react";
import { openai, supabase } from "./config.js";
import podcasts from "./content.js";

export default function CreateAnEmbedding() {
  const [embedding, setEmbedding] = useState(null); 

  const storeToDB = async () => {
    // Insert content and embedding into Supabase
    await supabase.from("documents").insert(embedding);
    console.log("Storing complete!");
  };

 
  // User query about podcasts
  const query = "An episode Elon Musk would enjoy";
  

  // Bring all function calls together
  async function main(input) {
    const embedding = await createEmbedding(input);
    const match = await findNearestMatch(embedding);
    return await getChatCompletion(match, input);

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
    const { data } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 1,
    });
    return data[0].content;
  }

  // Use OpenAI to make the response conversational
  const chatMessages = [
    {
      role: "system",
      content: `You are an enthusiastic podcast expert who loves recommending podcasts to people. You will be given two pieces of information - 
      some context about podcasts episodes and a question. Your main job is to formulate a short answer to the question using the provided context.
       If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`,
    },
  ];

  async function getChatCompletion(text, query) {
    chatMessages.push({
      role: "user",
      content: `Context: ${text} Question: ${query}`,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: chatMessages,
      temperature: 0.5,
      frequency_penalty: 0.5,
    });

    console.log(response.choices[0].message.content); 
    return response.choices[0].message.content;   
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await main(query);
      setEmbedding(data);
      console.log("data", data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <button
        className=" bg-slate-300 border-2 border-gray-600 m-2 "
        onClick={storeToDB}
      >
        Store to DB
      </button>
      <h1>Embedding</h1>
      <p>Embedding: {embedding ? JSON.stringify(embedding) : "Loading..."}</p>
    </div>
  );
}
