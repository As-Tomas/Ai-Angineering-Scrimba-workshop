import React, { useEffect, useState } from "react";
import { openai, supabase } from "./config.js";

export default function CreateAnEmbedding() {
  const [embedding, setEmbedding] = useState(null);

  const content = [
    "Beyond Mars: speculating life on distant planets.",
    "Jazz under stars: a night in New Orleans' music scene.",
    "Mysteries of the deep: exploring uncharted ocean caves.",
    "Rediscovering lost melodies: the rebirth of vinyl culture.",
    "Tales from the tech frontier: decoding AI ethics.",
  ];

  console.log("Component rendered");

  useEffect(() => {
    const createEmbedding = async (input) => {
      const data = await Promise.all(
        input.map(async (textChunk) => {
          const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: textChunk,
          });
          return {
            content: textChunk,
            embedding: embeddingResponse.data[0].embedding,
          };
        })
      );
      setEmbedding(data);

      // Insert content and embedding into Supabase
      await supabase.from('documents').insert(data);

      console.log("Embedding and storing complete!");
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
