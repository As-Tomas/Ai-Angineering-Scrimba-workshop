import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const imgURL = "https://scrimba.com/links/egg-image";

async function analyseImage() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "I found this small egg on the ground in South Florida during spring. What type of bird could it be from?" },
          {
            type: "image_url",
            image_url: {
              url: imgURL
            }
          }
        ]
      }
    ]
  });
  console.log(response.choices[0]);

  const row = document.createElement("div");
  row.innerHTML = `
  <p>Prompt: ${response.choices[0].message.content}</p>
  `;
  results.appendChild(row);
}


document.getElementById("analyse").addEventListener("click", analyseImage);
// document.body.innerHTML = `<img src="${imgURL}" alt="Image to analyze">`;