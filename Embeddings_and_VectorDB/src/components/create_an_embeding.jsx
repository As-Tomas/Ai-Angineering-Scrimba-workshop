import React, { useEffect, useState } from "react";
import { openai, supabase } from "./config.js";
 import podcasts from "./content.js";

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

  const storeToDB = async ()=>{
// Insert content and embedding into Supabase
      await supabase.from('documents').insert(embedding);
    console.log("Storing complete!");
  }

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

      console.log("Embedding complete!");
    };

    createEmbedding(podcasts);
  }, []);

  return (
    <div>
        <button className=" bg-slate-300 border-2 border-gray-600 m-2 " onClick={storeToDB}>Store to DB</button>
      <h1>Embedding</h1>
      <p>Embedding: {embedding ? JSON.stringify(embedding) : "Loading..."}</p>
    </div>
  );
}
