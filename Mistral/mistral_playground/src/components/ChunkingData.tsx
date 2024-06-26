import React from "react";
import { splitDocument } from "../RAG/text_splitter";
import MistralClient from "@mistralai/mistralai";
import { supabase } from './singleInstanceOfSuppabase.ts'

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

const mistalClient = new MistralClient(apiKey);

export default function ChunkingData() {
  const [textArr, setTextArr] = React.useState<string[] | null>(null);
  const [chunkEmbedding, setChunkEmbedding] = React.useState<string | null>(null);
  const [chunksAndEmbeddings, setChunksAndEmbeddings] = React.useState<any[] | null>(null);

  async function useSplitDocument() {
    const textArr = await splitDocument("handbook.txt");
    console.log(textArr);
    setTextArr(textArr);
  }

  async function createEmbeddings(chunks: string[]) {  
    const chunkEmbedding = await mistalClient.embeddings({
      model: "mistral-embed",
      input: chunks,
    });

    const chunksAndEmbeddings = chunks.map((chunk, i) => {
        return {
        content : chunk,
        embedding : chunkEmbedding.data[i].embedding
        }
    });    

    setChunkEmbedding(JSON.stringify(chunksAndEmbeddings, null, 2));
    setChunksAndEmbeddings(chunksAndEmbeddings);

    return chunksAndEmbeddings
  }

  async function storeChunksAndEmbeddings(chunksAndEmbeddings: any[]) {
    await supabase.from('handbook_docs').insert(chunksAndEmbeddings);
    console.log("Upload complete!");
    setChunkEmbedding("Upload complete!");
  }

  

  return (
    <div className=" flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold p-4">
        Chunking Data with langchain
      </h2>
      <p className=" w-2/3 ">
        This component demonstrates how to chunk data using langchain. Langchain
        is a language model that can be used to chunk data into smaller parts.
        This can be useful for processing large amounts of text data.
      </p>
      <div>
        <button
          className=" bg-slate-500 p-4 px-6 rounded-lg border border-black"
          onClick={useSplitDocument}
        >
          {" "}
          Split text in to chunks
        </button>
        <button
          className=" bg-slate-500 p-4 px-6 rounded-lg border border-black"
          onClick={() => textArr && createEmbeddings(textArr)}
        >
          {" "}
          Get chunk embedding
        </button>
        <button
          className=" bg-slate-500 p-4 px-6 rounded-lg border border-black"
          onClick={() => chunksAndEmbeddings && storeChunksAndEmbeddings(chunksAndEmbeddings)}
        >
          {" "}
          Store chunksAndEmbeddings in Supabase
        </button>
      </div>
      <div>{chunkEmbedding}</div>
      <div>
        {textArr &&
          textArr.map((text, index) => (
            <div key={index}>
              <h3>Chunk {index + 1}</h3>
              <p>{text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
