import OpenAI from "openai";

const openai = new OpenAI({
    // Save your own API key as an env variable -> https://scrimba.com/links/scrimba-env-vars
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

async function main() {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: `Today is a wonderful day to build something people love!`,
    });
    await play(mp3);
}

async function play(file) {
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const audioURL = window.URL.createObjectURL(blob);
    const audio = new Audio(audioURL);
    audio.play();
}

// main();

document.getElementById("analyse").addEventListener("click", main);