import React, { useEffect, useState } from "react";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import podcasts from "./podcasts.txt";

function ChunkingData() {
  const [output, setOutput] = useState(null);
  // LangChain text splitter
  async function splitDocument() {
    const response = await fetch(podcasts);
    const text = await response.text();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 150,
      chunkOverlap: 15,
    });
    const output = await splitter.createDocuments([text]);
    console.log(output);
    setOutput(output);
  }

  useEffect(() => {
    splitDocument();
  }, []);

  return (
    <div>
      {output
        ? output.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)
        : "loading..."}
    </div>
  );
}

export default ChunkingData;
