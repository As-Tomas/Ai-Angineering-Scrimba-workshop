import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { HfInference } from "@huggingface/inference";

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

function App() {
  const [output, setOutput] = useState('');

  console.log("VITE_HUGGINGFACE_TOKEN", VITE_HUGGINGFACE_TOKEN);

  const hf = new HfInference(VITE_HUGGINGFACE_TOKEN);

  const textToGenerate = "The definition of machine learning inference is ";

 

  async function generateText() {
    const response = await hf.textGeneration({
      inputs: textToGenerate,
      model: "HuggingFaceH4/zephyr-7b-beta", // chosing a model from the list in huggingface.co/models

    });
    console.log(response);
    setOutput(response.generated_text);
  }

  generateText();

 

  return (
    <>
      <div>
        {output}
      </div>
      
    </>
  );
}

export default App;
