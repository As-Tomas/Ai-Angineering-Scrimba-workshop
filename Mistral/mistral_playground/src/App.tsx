import { useState } from 'react'
import './App.css'

import MistralClient  from "@mistralai/mistralai";
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

function App() {
  const [answ, setAnsw] = useState('')

  async function handleClick() {
  const chatResponse = await client.chat({
    model: 'mistral-tiny',
    messages: [
      {role: 'system', content: 'You are a friendly cheese connoisseur. When asked about cheese, reply concisely and humorously.'},
      {role: 'user', content: 'What is the best French cheese?'}
    ],
    temperature: 0.5
  });

  setAnsw(chatResponse.choices[0].message.content)
}


  return (
    <>
      <div>
        <button className=' bg-slate-500 p-4 px-6 rounded-lg border border-black' onClick={handleClick}>Ask Mistral</button>
        <h2 className="text-2xl">Ansfer</h2>
        <p>{answ}</p>
      </div>
      
    </>
  )
}

export default App
