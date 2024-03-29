import React, { useState } from "react";
import OpenAI from "openai";
import { getCurrentWeather, getLocation, tools, functions } from "./tools";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const availableFunctions = {
  getCurrentWeather,
  getLocation,
};

/**
 * Goal - build an agent that can answer any questions that might require knowledge about my current location and the current weather at my location.
 */

const ReActAgent = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const agentResponse = await agent(query);
    setResponse(agentResponse);
  };

  let messages = [
    {
      role: "system",
      content:
        `You are a helpful AI agent. Transform technical data into engaging, 
        conversational responses, but only include the normal information a 
        regular person might want unless they explicitly ask for more. Provide 
        highly specific answers based on the information you're given. Prefer 
        to gather information with the tools provided to you rather than 
        giving basic, generic answers. `,
    },
    
  ];

  const agent = async (userQuery) => {
    messages.push({ role: "user", content: userQuery });

    //if we do chat so here we shoud display ussers query
    //renderNewMessage(query, "user")

//-manual way
    // const MAX_ITERATIONS = 5;

    // for (let i = 0; i < MAX_ITERATIONS; i++) {
    //   console.log(`Iteration #${i + 1}`);
    //   const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo-1106",
    //     messages,
    //     tools
    //   });

    //   const responseText = response.choices[0];
    //     console.log("responseText:", responseText);
    //     // Check finish_reason
    //     // if "stop"
    //         // return the result
    //     // else if "tool_calls"
    //         // call functions
    //         // append results
    //         // continue
    //     const { finish_reason: wahteverIWantToCallITfinishReason, message } = response.choices[0]
    //     const { tool_calls: toolCalls } = message

    //     messages.push(message)

    //     if (wahteverIWantToCallITfinishReason === "stop") {
    //         console.log(message.content)
    //         console.log("AGENT ENDING")
    //         return message.content

    //     } else if (responseText.finish_reason === "tool_calls") {
    //         // get the function name
    //         // access the actual function from the array of available functions
    //         // call that function
    //         // console.log the result
    //         for (const toolCall of toolCalls) {
    //             const functionName = toolCall.function.name
    //             const functionToCall = availableFunctions[functionName]
                
    //             // What's the current weather in Tokyo and New York City and Oslo?
                
    //             const functionArgs = JSON.parse(toolCall.function.arguments)
    //             const functionResponse = await functionToCall(functionArgs)
    //             console.log(functionResponse)
    //             messages.push({
    //                 tool_call_id: toolCall.id,
    //                 role: "tool",
    //                 name: functionName,
    //                 content: functionResponse
    //             })
    //         }
    //     }
    // }

    const runner = openai.beta.chat.completions.runFunctions({
        model: "gpt-3.5-turbo-1106",
        messages,
        functions
    }).on("message", (message) => console.log(message))
    
    const finalContent = await runner.finalContent()
    console.log(finalContent)
    messages.push({ role: "system", content: finalContent })
    return finalContent;
  };

  return (
    <div>
      <p>What is the current weather in New York City? - checks just temp</p>
      <p>
        What is the current weather in my location? - check both location and
        temp
      </p>
      <p>
        What are some activity ideas that I can do this afternoon based on my
        location and weather? - does both loca and temp pluss activities by it
        self{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          className=" border-2 p-3 rounded-lg"
          placeholder="ask for something"
          type="text"
          value={query}
          onChange={handleQueryChange}
        />
        <button
          className=" m-4 border-2 border-gray-400 bg-slate-100 hover:bg-slate-300 "
          type="submit"
        >
          Ask
        </button>
      </form>
      <div className="response">{response}</div>
    </div>
  );
};

export default ReActAgent;
