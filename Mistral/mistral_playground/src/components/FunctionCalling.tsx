import React from "react";
import MistralClient from "@mistralai/mistralai";
import { tools } from './tools.ts'

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const mistralClient = new MistralClient(apiKey);

export default function FunctionCalling() {
  const [text, setText] = React.useState<string | null>(null);
  const [generatedResponse, setGeneratedResponse] = React.useState<string | null>(null);

  async function callFunction() {

    async function agent(query : string) {
      const messages = [
        { role: "user", content: query }
      ];
        
      const response = await mistralClient.chat( {
          model: 'mistral-large-latest',
          messages: messages,
          tools: tools
      });
      
      return response;
    }

    // const queryText = "Is the transaction T1001 paid?";
    const queryText = "when the transaction T1001 paid?";
    setText(queryText);
    const response = await agent(queryText);
    console.log(response);
    // setGeneratedResponse(response as unknown as string);

  }

  return (
    <div className=" flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold p-4">
        Function calling
      </h2>
      <p className=" w-2/3 ">
        This component demonstrates how to  AI call function to get more information for response generation. 
      </p>
      <div>
        <button
          className=" bg-slate-500 p-4 px-6 rounded-lg border border-black"
          onClick={() => callFunction()}
        >
          {" "}
          Call function
        </button>
      </div>
      <div>{text}</div>
      <div>
        {generatedResponse && (
            <div>
                <h2 className="text-2xl">Generated Response</h2>
                <p>{generatedResponse}</p>
            </div>
            
        )}
      </div>
    </div>
  );
}
