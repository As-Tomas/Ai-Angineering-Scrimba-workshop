// App.tsx
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ChatComponent from "./components/ChatComponent";
import ChunkingData from "./components/ChunkingData";
import QueryAndCompletion from "./components/QueryAndCompletion";
import FunctionCalling from "./components/FunctionCalling";

function ProjectDescription() {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <h2 className="text-3xl font-semibold p-4">Project description</h2>
      <p className=" w-2/3 ">
        This project is a playground for Mistral AI. It demonstrates how to use
        the Mistral AI API to build a chatbot. The chatbot is trained on the
        Mistral-tiny model and is designed to answer questions about cheese.
      </p>
   </div>
  );
  }

function App() {
  return (
    <Router>
      <div className="flex">
        <nav className="w-1/5 p-4 border-r border-black text-2xl font-semibold text-slate-600  ">
          <ul>
            <li className="border-b border-slate-300">
              <Link to="/description">Project Description</Link>
            </li>
            <li className="border-b border-slate-300 ">
              <Link to="/chat">Chat</Link>
            </li>
            <li className="border-b border-slate-300 ">
              <Link to="/chunkingdata">Chunking Data with langchain</Link>
            </li>
            <li className="border-b border-slate-300 ">
              <Link to="/retrieve">Retrieve Data</Link>
            </li>
            <li className="border-b border-slate-300 ">
              <Link to="/function-calling">Function Calling</Link>
            </li>
          </ul>
        </nav>

        <div className="flex-grow p-4">
          <Routes>
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/description" element={<ProjectDescription />} />
            <Route path="/chunkingdata" element={<ChunkingData />} />
            <Route path="/retrieve" element={<QueryAndCompletion />} />
            <Route path="/function-calling" element={<FunctionCalling />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;