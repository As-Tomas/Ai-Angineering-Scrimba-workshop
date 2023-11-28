import { HfInference } from "@huggingface/inference";

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const hf = new HfInference(VITE_HUGGINGFACE_TOKEN);

const text = "The definition of machine learning inference is ";

export async function tts() {
  const response = await hf.textToSpeech({
    inputs: text,
    model: "espnet/kan-bayashi_ljspeech_vits",
  });

//   console.log('response type:', typeof response);
//   console.log('response', response)

  // Create a new Audio object and play the audio
  const audio = URL.createObjectURL(response);
  // audio.play();
console.log('audio', audio)
  return {
    generatedAudio: audio,
  };
}
