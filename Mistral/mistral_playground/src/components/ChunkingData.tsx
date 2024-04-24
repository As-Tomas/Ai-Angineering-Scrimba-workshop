import React from 'react'
import { splitDocument } from '../RAG/text_splitter';

export default function ChunkingData() {
    const [textArr, setTextArr] = React.useState<string[] | null>(null);

    async function useSplitDocument() {
        const textArr = await splitDocument('handbook.txt');
        console.log(textArr);
        setTextArr(textArr);
    }

  return (
    <div className=' flex flex-col items-center justify-center'>
        <h2 className="text-3xl font-semibold p-4">Chunking Data with langchain</h2>
        <p className=" w-2/3 ">
            This component demonstrates how to chunk data using langchain. Langchain is a
            language model that can be used to chunk data into smaller parts. This can be
            useful for processing large amounts of text data.
        </p>
        <button className=' bg-slate-500 p-4 px-6 rounded-lg border border-black'
            onClick={useSplitDocument}
        > Split text in to chunks</button>
        <div>
            {textArr && textArr.map((text, index) => (
                <div key={index}>
                    <h3>Chunk {index + 1}</h3>
                    <p>{text}</p>
                </div>
            ))}
        </div>

    </div>
  )
}
