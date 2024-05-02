import React from "react";
import { splitDocument } from "../RAG/text_splitter";
import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const mistralClient = new MistralClient(apiKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default function QueryAndCompletion() {
  const [text, setText] = React.useState<string[] | null>(null);

  async function getSimilarityAnswer() {
    // 1. Getting the user input
    const input =
      "December 25th is on a Sunday, do I get any extra time off to account for that?";

    // 2. Creating an embedding of the input
    const embedding = await createEmbedding(input);

    // 3. Retrieving similar embeddings / text chunks (aka "context")
    const context = await retrieveMatches(embedding);
    console.log(context);
    setText(context);
    // 4. Combining the input and the context in a prompt
    // and using the chat API to generate a response
    //   const response = await generateChatResponse(context, input);
  }

  async function createEmbedding(input) {
    const embeddingResponse = await mistralClient.embeddings({
      model: "mistral-embed",
      input: [input],
    });
    return embeddingResponse.data[0].embedding;
  }

  async function retrieveMatches(embedding) {
    const { data } = await supabase.rpc("match_handbook_docs", {
      query_embedding: embedding,
      match_threshold: 0.78,
      match_count: 1,
    });
    return data[0].content;
  }

  async function generateChatResponse(context, query) {}

  return (
    <div className=" flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold p-4">
        Retreaving Data with Vector data base
      </h2>
      <p className=" w-2/3 ">
        This component demonstrates how to retrieve matches from vector database
      </p>
      <div>
        <button
          className=" bg-slate-500 p-4 px-6 rounded-lg border border-black"
          onClick={() => getSimilarityAnswer()}
        >
          {" "}
          Retrieve matches from database
        </button>
      </div>
      <div>{text}</div>
    </div>
  );
}
