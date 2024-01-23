import OpenAI from "openai";
import React, { useEffect, useState } from "react";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

export default  function CreateAnEmbedding() {
  const [embedding, setEmbedding] = useState(null);

  /** Ensure the OpenAI API key is available and correctly configured */
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing or invalid.");
  }

  /** OpenAI config */
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const content = [
    "Beyond Mars: speculating life on distant planets.",
    "Jazz under stars: a night in New Orleans' music scene.",
    "Mysteries of the deep: exploring uncharted ocean caves.",
    "Rediscovering lost melodies: the rebirth of vinyl culture.",
    "Tales from the tech frontier: decoding AI ethics.",
  ]; 

  useEffect(() => {
    const createEmbedding = async () => {
      const result = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: content
      });

      console.log(result);
      setEmbedding(result);
    //   console.log(embedding.data); 
    };

    // console.log(embedding.data[0].embedding.length); parodo dydi kiek skaiciu embeding arejus turi

    createEmbedding();
  }, []);

  return (
    <div>
      <h1>Embedding</h1>
      <p>Embedding: {embedding ? JSON.stringify(embedding) : "Loading..."}</p>
    </div>
  );
}
