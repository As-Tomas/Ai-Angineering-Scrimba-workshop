import React, { useState } from "react";
import OpenAI from "openai";
// import { getCurrentWeather, getLocation, tools, functions } from "./tools";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const assistanID= "asst_cM0naaJFJZJXyFNyI5IQ3aSV";
const file_ids= ["file-zSs8MPpBI9l8JUXAKpgWL1u0"];
//asst_KPXhtmnL1R63LN1tIyHDixZt




  export default function Assistant() {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleQueryChange = (event) => {
      setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const agentResponse = await createAssistant(query);
      setResponse(agentResponse);
    };
    // 1) run code upload file and save its Id
    // 2) create assistant wit file ID and save assistans id 

    // Upload a file with an "assistants" purpose
    // const file = await openai.files.create({
    //   file: await fetch("movies.txt"),
    //   purpose: "assistants",
    // });
    // console.log(file)

    // Create Movie Expert Assistant
    async function createAssistant(query) {
      const myAssistant = await openai.beta.assistants.create({
        instructions: `You are great at recommending movies. When asked a question, use the information 
      in the provided file to form a friendly response. If you cannot find the answer in the file, do 
      your best to infer what the answer should be.`,
        name: "Movie Expert2",
        tools: [{ type: "retrieval" }],
        model: "gpt-4-1106-preview",
        file_ids: file_ids,
      });

      console.log(myAssistant);
      return myAssistant;
    } 

  return (
    <div>
      <p>Ai agent new way bysaing vector databases</p>

      <form onSubmit={handleSubmit}>
        <input
          className=" border-2 p-3 rounded-lg"
          placeholder="ask for something"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />
        <button
          className=" m-4 border-2 border-gray-400 bg-slate-100 hover:bg-slate-300 "
          type="submit"
        >
          Ask
        </button>
      </form>
      <div className="response">{response}</div>
    </div>
  );
}
