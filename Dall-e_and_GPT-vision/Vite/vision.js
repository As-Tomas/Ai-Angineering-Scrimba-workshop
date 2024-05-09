import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const imgURL = "https://scrimba.com/links/egg-image";

const imgURL1 = "https://scrimba.com/links/cheese-1-img";
const imgURL2 = "https://scrimba.com/links/cheese-2-img";

async function analyseImage() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What's the difference between these two types of cheese?" },
            {
              type: "image_url",
              image_url: {
                url: imgURL
              }
            },
            {
              type: "image_url",
              image_url: {
                url: imgURL2
              }
            }
          ]
        }
      ]
    });
  console.log(response.choices[0]);

  const results = document.getElementById('results');

  const row = document.createElement("div");
  row.innerHTML = `
  <p>Prompt: ${response.choices[0].message.content}</p>
  <img src="${imgURL1}" alt="Cheese">
  <img src="${imgURL2}" alt="Cheese">
  `;
  results.appendChild(row);
}

document.getElementById("analyse").addEventListener("click", analyseImage);
// document.body.innerHTML = `<img src="${imgURL}" alt="Image to analyze">`;