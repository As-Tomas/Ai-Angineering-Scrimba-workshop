import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function generateImage() {
  let prompt = document.getElementById("prompt").value;
  const loading = document.getElementById("loading");
  const results = document.getElementById("results");

  if (prompt === "") {
    prompt = "A colorful coral reef with diverse marine life.";
  }

  loading.style.display = "block";

  let image;
  try {
    image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      response_format: "b64_json",
    });
  } catch (error) {
    console.log("error", error);
  }
  console.log("image", image);

  loading.style.display = "none";

  const row = document.createElement("div");
  row.innerHTML = `
  <p>Prompt: ${prompt}</p>
  <p>Revised Prompt: ${image.data[0].revised_prompt}</p>
  <img src="data:image/png;base64,${image.data[0].b64_json}" alt="Generated Image">
  `;
  results.appendChild(row);
}

document.getElementById("generate").addEventListener("click", generateImage);
