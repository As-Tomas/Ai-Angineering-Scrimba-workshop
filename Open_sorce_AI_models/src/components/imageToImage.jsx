import { HfInference } from "@huggingface/inference";

import oldPhoto from "../images/old-photo.jpeg";
const oldImageResponse = await fetch(oldPhoto)
const oldImageBlob = await oldImageResponse.blob()

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const hf = new HfInference(VITE_HUGGINGFACE_TOKEN);

const model = "ghoskno/Color-Canny-Controlnet-model"

const prompt = `An elderly couple walks together on a gravel path with green 
grass and trees on each side. Wearing neutral-colored clothes, they face away
 from the camera as they carry their bags.`

export async function imageToImage() {
  const response = await hf.imageToImage({
    model: model,
    inputs: oldImageBlob,
    parameters: {
      prompt: prompt,
      negative_prompt: "Black and white photo. text, bad anatomy, blurry, low quality",
      // Between 0 and 1
      strength: 0.85,
    }
  })

  console.log('response type:', typeof response);
  console.log('response', response)

async function blobToBase64(blob) {    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);      
    });
  }
  const blob = response instanceof Blob ? response : response.blob;  
  const newImageBase64 = await blobToBase64(blob)

  return {
    generatedImageBase64: newImageBase64,
  };
}
