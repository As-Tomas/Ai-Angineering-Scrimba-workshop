import React, { useState } from "react";
import OpenAI from "openai";
// https://platform.openai.com/docs/api-reference/threads/createThread;

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const MovieExpert = "asst_HIPK2NVtxjkt9PYEmzQmtgoq";
const file_ids = ["file-UuVlCAXZDOHHl8fgrYZEtkkM"];

let threadID = "thread_kGsRo2OJUrtF5ID89G8t8Eh8";
let runID = "run_4YW1W73dp3W6pwTDGcWAC5uQ";

export default function Assistant() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 1) run code upload file and save its Id
    // 2) create assistant wit file ID and save assistans id
    // 3) create thread and save thread id
    // const agentResponse = await uploadFile();
    // const agentResponse = await createAssistant(query);

    // const agentResponse = await CreateThread();
    // const agentResponse = await createMessage();
    // const agentResponse = await runThread();
    // const agentResponse = await getRun();
    const agentResponse = await listMessages();
    setResponse(agentResponse);
  };

  // Upload a file with an "assistants" purpose
  async function uploadFile() {
    const file = await openai.files.create({
      file: await fetch("movies.txt"),
      purpose: "assistants",
    });
    console.log(file);
    return file.id;
  }

  // Create Movie Expert Assistant
  async function createAssistant(query) {
    const myAssistant = await openai.beta.assistants.create({
      instructions: `You are great at recommending movies. When asked a question, use the information 
      in the provided file to form a friendly response. If you cannot find the answer in the file, do 
      your best to infer what the answer should be.`,
      name: "Movie Expert3",
      tools: [{ type: "retrieval" }],
      model: "gpt-4-1106-preview",
      file_ids: file_ids,
    });

    console.log(myAssistant);
    return myAssistant.id;
  }

  // Create thread
  async function CreateThread() {
    const thread = await openai.beta.threads.create();
    console.log(thread);
    threadID = thread.id;
    return thread.id;
  }

  async function createMessage() {
    const threadMessages = await openai.beta.threads.messages.create(threadID, {
      role: "user",
      content: "Can you recommend a comedy?",
    });
    console.log(threadMessages);
  }

  // Run the assistant's thread
  async function runThread() {
    const run = await openai.beta.threads.runs.create(threadID, {
      assistant_id: MovieExpert,
    });
    console.log(run);
    runID = run.id;
    return run.id;
  }

  // Get the current run
  async function getRun() {
    const currentRun = await openai.beta.threads.runs.retrieve(
      threadID,
      runID
    );
    console.log("Run status: " + currentRun.status);
    return currentRun.status;
  }

  // List thread messages
  async function listMessages() {
    const threadMessages = await openai.beta.threads.messages.list(threadID);

    console.log(threadMessages.data);
    return threadMessages.data[0].content[0].text.value;
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
