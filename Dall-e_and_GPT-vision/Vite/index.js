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
    prompt = "A steampunk city with gear-driven machines, airships docked atop buildings, and streets lit by gas lamps, set in a vast canyon";
  }

  loading.style.display = "block";

  //Landscape 1792x1024
  //Portrait 1024x1792
  // Quality Standard or HD
  // style: "natural" "vivid"

  let image;
  try {
    image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      response_format: "b64_json",
      size: "1024x1792",
      quality: "hd",
      style: "vivid"
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
