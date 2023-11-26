import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const Dalle = () => {
  const [inputValue, setInputValue] = useState("");
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

      const response = await openai.images.generate({
        model: "dall-e-3", // default dall-e-2
        prompt: inputValue, //required
        n: 1, //default 1 dalle-2 supports up to 10 imgages generation
        size: "1024x1024", //default 1024x1024 suported 1792x1024, 1024x1792
        style: "vivid", //default vivid (other option: natural)
        response_format: "b64_json", //default url supported base64 "b64_json"
      });

    //   setOutput(response.data[0].url);
    setOutput(`data:image/png;base64,${response.data[0].b64_json}`);
      console.log("Response-> ", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div className=" font-semibold">Dalle - 3 image generation</div>
      <input
        className="border-2 border-gray-700 p-2 my-2 mx-0"
        placeholder="imagine something..."
        value={inputValue}
        onChange={handleInputChange}
      >
      </input>
        <button
          type="submit"
          onClick={fetchImage}
          className="flex items-center p-2 px-3 my-2 cursor-pointer border-2 border-gray-700 "
        >
          Submit
        </button>
      <img src={output} alt="Dalle 3 generated image" />
      {/* <div>{output}</div> */}
    </div>
  );
};

export default Dalle;
