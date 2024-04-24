// App.tsx
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ChatComponent from "./components/ChatComponent";

function ProjectDescription() {
  return <h2>Project description</h2>;
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
          </ul>
        </nav>

        <div className="flex-grow p-4">
          <Routes>
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/description" element={<ProjectDescription />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;