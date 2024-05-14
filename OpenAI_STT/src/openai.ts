import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

export async function stt(audioBlob: Blob) {
  if (!(audioBlob instanceof Blob)) {
    console.error("The provided parameter is not a Blob:", audioBlob);
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const arrayBuffer = reader.result as ArrayBuffer;
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([arrayBuffer], { type: "audio/wav" }),
      "file.wav"
    );
    formData.append("model", "whisper-1"); // Specify the model

    fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, 
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const responseElement = document.getElementById("response");
        if (responseElement) {
          responseElement.innerText = data.text;
        }
      })
      .catch((error) => {
        console.error("Error processing transcription:", error);
      });
  };

  reader.onerror = (error) => console.error("Error reading blob:", error);

  reader.readAsArrayBuffer(audioBlob);
}
