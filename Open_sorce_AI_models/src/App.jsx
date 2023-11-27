import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { HfInference } from "@huggingface/inference";

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

function App() {
  const [output, setOutput] = useState('');
  const [classification, setclassification] = useState('');

  const hf = new HfInference(VITE_HUGGINGFACE_TOKEN);

  const textToGenerate = "The definition of machine learning inference is ";

 

  async function generateText() {
    
  const response = await hf.textGeneration({
    inputs: textToGenerate,
    model: "HuggingFaceH4/zephyr-7b-beta", // choosing a model from the list in huggingface.co/models
  });

  const text = response.generated_text;
  console.log('text', text)

  const textClassification = await hf.textClassification({
    model: "distilbert-base-uncased-finetuned-sst-2-english", // getin its clasification
    inputs: text
  });
  
  console.log(textClassification[0].label);

  const textTranslationResponse = await hf.translation({
    model: 'facebook/nllb-200-distilled-600M',
    inputs: textToGenerate,
    parameters: {
      src_lang: "en_XX",
      tgt_lang: "ur_PK"
  }
    
  });

  const translatedText = textTranslationResponse.translation_text

  setclassification(textClassification[0].label);

  // Use the local variable textClassification instead of the state variable classification
  setOutput(`response.generated_text: ${response.generated_text} \n textClassification: ${textClassification[0].label} \n translatedText : ${translatedText}`);
}

useEffect(() => {
  generateText();
}, []);

 

  return (
    <>
      <div>
        {output}
      </div>
      
    </>
  );
}

export default App;
