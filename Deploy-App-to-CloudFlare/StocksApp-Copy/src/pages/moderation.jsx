import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const moderation = () => {
  const [inputValue, setInputValue] = useState("I hate you!");
  const [output, setOutput] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchImage = async () => {
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      //https://platform.openai.com/docs/guides/safety-best-practices
      const response = await openai.moderations.create({
        input: inputValue,
        user: "user_123432423",
      });

      const { flagged, categories } = response.results[0];

      if (flagged) {
          const keys = Object.keys(categories);
          const filtered = keys.filter((key) => categories[key]);
          
          setOutput(`Your response has been flagged for the following reasons: ${filtered.join(", ")}.`)

        console.log("Response-> ", response);
        
      } else {
        setOutput("");
        console.log("Response-> ", response);
      }
      
      
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div className=" font-semibold">Safety best practices</div>
      <input
        className="border-2 border-gray-700 p-2 my-2 mx-0"
        placeholder="I hate you!..."
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <button
        type="submit"
        onClick={fetchImage}
        className="flex items-center p-2 px-3 my-2 cursor-pointer border-2 border-gray-700 "
      >
        Submit
      </button>
      
      <div>{output}</div>
    </div>
  );
};

export default moderation;
