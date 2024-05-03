
import { useState } from 'react'
import MistralClient  from "@mistralai/mistralai";
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

export default function ChatComponent() {
  const [answ, setAnsw] = useState('')

  async function handleClick() {
    const chatResponse = client.chatStream({
      model: 'mistral-tiny',
      messages: [
        {role: 'system', content: 'You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.'},
        {role: 'user', content: 'What is the best French cheese?'}
      ],
      temperature: 0.5,
      response_format: {
        type: "json_object",
      },
    });

    for await (const chunk of chatResponse) {   
      const newContent = chunk.choices[0].delta.content || '';
      setAnsw(prevAnsw => prevAnsw + newContent);
    }
    // console.log('chatResponse', chatResponse)
    // setAnsw(chatResponse.choices[0].message.content);
  }

  return (
    <>
      <div className=' flex flex-col items-center justify-center'>
        <button className=' bg-slate-500 p-4 px-6 rounded-lg border border-black' 
        onClick={handleClick}
        >
            Ask Mistral
        </button>
        <h2 className="text-2xl">Answer</h2>
        <p>{answ}</p>
      </div>
    </>
  )
}