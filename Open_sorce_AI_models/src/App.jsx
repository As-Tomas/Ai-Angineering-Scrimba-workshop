import { useEffect, useState } from "react";
import "./App.css";
import { generateText } from "./components/textClassTrans.jsx";

import { HfInference } from "@huggingface/inference";

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

function App() {
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { generatedText, classification, translatedText } =
        await generateText();
      setOutput(
        `response.generated_text: ${generatedText} \n textClassification: ${classification} \n translatedText : ${translatedText}`
      );
    }
    fetchData();
  }, []);

  const handleClick = () => {
    setShowOutput(!showOutput);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className=" bg-slate-200 rounded-lg px-2 border-2 border-stone-300 "
      >
        Show text clasification translation
      </button>
      {showOutput && <div>{output}</div>}
    </>
  );
}

export default App;
