import { useEffect, useState } from "react";
import "./App.css";
import { generateText } from "./components/textClassTrans.jsx";
import { tts } from "./components/textToSpeech.jsx";
import { imageToImage } from "./components/imageToImage.jsx";
import { getListModels } from "./components/listModels.jsx";

import { HfInference } from "@huggingface/inference";

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

function App() {
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [audio, setAudio] = useState(null);
  const [modelsList, setmodelsList] = useState([]);

  const handleClick = () => {
    async function fetchData() {
      const { generatedText, classification, translatedText } =
        await generateText();

      setOutput(
        `response.generated_text: ${generatedText} \n textClassification: ${classification} \n translatedText : ${translatedText}`
      );
    }
    fetchData();
    setShowOutput(!showOutput);
  };

  const handleTTS = () => {
    async function fetchData() {
      const { generatedAudio } = await tts();
      console.log("generatedAudio", generatedAudio);
      setAudio(generatedAudio);
    }
    fetchData();
  };

  const convertimageToImage = () => {
    async function fetchData() {
      const { generatedImageBase64 } = await imageToImage();
      console.log("generatedImage", generatedImageBase64);
      setOutput(generatedImageBase64);
      setShowOutput(!showOutput);
    }
    fetchData();
  };

  const showListOfModels = () => {
    async function fetchData() {
      const { foundModels } = await getListModels();
      console.log("foundModels", foundModels);
      setmodelsList(foundModels);
      setShowOutput(!showOutput);
    }
    fetchData();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className=" bg-slate-200 rounded-lg px-2 border-2 border-stone-300 "
      >
        Show text clasification translation
      </button>
      <button
        onClick={handleTTS}
        className=" bg-slate-200 rounded-lg px-2 border-2 border-stone-300 "
      >
        Load Text to speech
      </button>
      <button
        onClick={convertimageToImage}
        className=" bg-slate-200 rounded-lg px-2 border-2 border-stone-300 "
      >
        Image to image
      </button>
      <button
        onClick={showListOfModels}
        className=" bg-slate-200 rounded-lg px-2 border-2 border-stone-300 "
      >
        Show List Of Models
      </button>
      {showOutput &&
        modelsList.map((item, index) => (
          <div key={index} className="flex ">
            {Object.keys(item).map((key) => (
              <p className="p-2"
              key={key}>{`${key}: ${item[key]}`}</p>
            ))}
          </div>
        ))}

      <img src={output}></img>
      <audio id="speech" src={audio} controls />
      {showOutput && <div>{output}</div>}
    </>
  );
}

export default App;
