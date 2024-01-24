
import React, { useEffect, useState } from "react";
import { openai, supabase } from './config.js';

export default function CreateAnEmbedding() {
  const [embedding, setEmbedding] = useState(null);  

  const content = [
    "Beyond Mars: speculating life on distant planets.",
    "Jazz under stars: a night in New Orleans' music scene.",
    "Mysteries of the deep: exploring uncharted ocean caves.",
    "Rediscovering lost melodies: the rebirth of vinyl culture.",
    "Tales from the tech frontier: decoding AI ethics.",
  ];
//   Jiq5S-x$ee(&z!W
  console.log("Component rendered");

  useEffect(() => {
    const createEmbedding = async (input) => {
      const results = await Promise.all(
        input.map(async (textChunk) => {
          const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: textChunk,
          });
          const data = {
            content: textChunk,
            embedding: embeddingResponse.data[0].embedding,
          };
          console.log(data);
          return data;
        })
      );
      setEmbedding(results);
      console.log("Embedding complete!");
    };

    createEmbedding(content);
  }, []);

  return (
    <div>
      <h1>Embedding</h1>
      <p>Embedding: {embedding ? JSON.stringify(embedding) : "Loading..."}</p>
    </div>
  );
}
