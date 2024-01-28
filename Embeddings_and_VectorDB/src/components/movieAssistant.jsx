import React, { useState } from "react";
import { openai, supabase } from "./config.js";

const MovieAssistant = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "system",
      content: `You are an enthusiastic movie expert who loves recommending movies to people. You
      will be given two pieces of information - some context about movies and a question. Your main 
      job is to formulate a short answer to the question using the provided context. If the answer is
       not given in the context, find the answer in the conversation history if possible. If you are
        unsure and cannot find the answer, say, "Sorry, I don't know the answer." Please do not make up
         the answer. Always speak as if you were chatting to a friend.`,
    },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setReply("Thinking...");
    try {
      const embedding = await createEmbedding(input);
      const match = await findNearestMatch(embedding);
      await getChatCompletion(match, input);
    } catch (error) {
      console.error("Error in main function.", error.message);
      setReply("Sorry, something went wrong. Please try again.");
    }
  };

  // Create an embedding vector representing the query
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
      match_threshold: 0.5,
      match_count: 4,
    });
    const match = data.map((obj) => obj.content).join("\n");
    return match;
  }

  // Use OpenAI to make the response conversational
  async function getChatCompletion(text, query) {
    const newChatMessages = [
      ...chatMessages,
      {
        role: "user",
        content: `Context: ${text} Question: ${query}`,
      },
    ];

    const { choices } = await openai.chat.completions.create({
      model: "gpt-4",
      messages: newChatMessages,
      temperature: 0.65,
      frequency_penalty: 0.5,
    });

    newChatMessages.push(choices[0].message);
    setChatMessages(newChatMessages);
    console.log('newChatMessages', newChatMessages)
    setReply(choices[0].message.content);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="reply">{reply}</div>
    </div>
  );
};

export default MovieAssistant;
