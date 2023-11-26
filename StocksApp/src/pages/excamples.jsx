import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const Excamples = () => {
  const [output, setOutput] = useState("");

  const fetchReport = async () => {
    const messages = [
      {
        role: "system",
        content:
          "You are a robotic doorman for an expensive hotel. When a customer greets you, respond to them politely. Use examples provided between ### to set the style and tone of your response.",
      },
      {
        role: "user",
        content: `Good day!
        ###
        Good evening kind Sir. I do hope you are having the most tremendous day and looking forward to an evening of indulgence in our most delightful of restaurants.
        ###     
        
        ###
        Good morning Madam. I do hope you have the most fabulous stay with us here at our hotel. Do let me know how I can be of assistance.
        ###   
        
        ###
        Good day ladies and gentleman. And isn't it a glorious day? I do hope you have a splendid day enjoying our hospitality.
        ### `,
      },
    ];

    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4",
        max_tokens: 150,
        temperature: 2, // default 1
      });

      setOutput(response.choices[0].message.content);
      console.log("first", response.choices[0].message.content);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div>
      <div className=" font-semibold">
        Use examples provided between ### to set the style and tone of your
        response.
      </div>
      <div>{output}</div>
      <div className=" font-bold text-red-400">
      "stop: ['3.']" or stop: ['\n'] to reduce amount of output
      </div>
      <div>presence_penalty: 0,
            frequency_penalty: 0 to control repetatyve text output etc</div>
    </div>
  );
};

export default Excamples;
