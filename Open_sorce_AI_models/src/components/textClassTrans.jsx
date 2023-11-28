import { HfInference } from "@huggingface/inference";

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const hf = new HfInference(VITE_HUGGINGFACE_TOKEN);
const textToGenerate = "The definition of machine learning inference is ";

export async function generateText() {
  const response = await hf.textGeneration({
    inputs: textToGenerate,
    model: "HuggingFaceH4/zephyr-7b-beta",
  });

  const textClassification = await hf.textClassification({
    model: "distilbert-base-uncased-finetuned-sst-2-english",
    inputs: response.generated_text,
  });

  const textTranslationResponse = await hf.translation({
    model: "facebook/nllb-200-distilled-600M",
    inputs: textToGenerate,
    parameters: {
      src_lang: "en_XX",
      tgt_lang: "ur_PK",
    },
  });

  return {
    generatedText: response.generated_text,
    classification: textClassification[0].label,
    translatedText: textTranslationResponse.translation_text,
  };
}
