import { listModels } from "@huggingface/hub";
// Create your Hugging Face Token: https://huggingface.co/settings/tokens
// Set your Hugging Face Token: https://scrimba.com/dashboard#env
// Learn more: https://scrimba.com/links/env-variables

const VITE_HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

// HuggingFace.js Hub Docs: https://huggingface.co/docs/huggingface.js/hub/README

// Challenge 1: Get Text To Image Models with inference enabled and 2000+ likes
export async function getListModels() {
  async function isModelInferenceEnabled(modelName) {
    const response = await fetch(
      `https://api-inference.huggingface.co/status/${modelName}`
    );
    const data = await response.json();
    return data.state == "Loadable";
  }

  const models = [];

  for await (const model of listModels({
    credentials: {
      accessToken: VITE_HUGGINGFACE_TOKEN,
    },
    search: {
      task: "text-to-image",
    },
  })) {
    if (model.likes < 2000) {
      continue;
    }

    if (await isModelInferenceEnabled(model.name)) {
      models.push(model);
    }
  }

  models.sort((model1, model2) => model2.likes - model1.likes);
  for (const model of models) {
    console.log(`${model.likes} Likes: https://huggingface.co/${model.name}`);
  }

  return {
    foundModels: models,
  };
}
