
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function splitDocument(path: string): Promise<string[]> {
    const response = await fetch(path);
    const text = await response.text();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 250,
        chunkOverlap: 40
    });
    const output = await splitter.createDocuments([text]);
    const textArr = output.map(chunk => chunk.pageContent);
    return textArr;
}

splitDocument('handbook.txt');