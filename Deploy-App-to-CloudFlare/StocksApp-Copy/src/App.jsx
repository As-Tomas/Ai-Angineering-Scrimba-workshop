import React, { useState, useEffect, Text, Image } from "react";
import OpenAI from "openai";

const POLYGON_API_KEY = import.meta.env.VITE_REACT_APP_POLYGON_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

import { dates } from "./assets/utils/dates.jsx";
import logo from "./assets/images/logo-dave-text.png";
import add from "./assets/images/add.svg";
import loadingSvg from "./assets/images/loader.svg";

import Examples from "./pages/examples.jsx";
import Dalle from "./pages/dalle3.jsx";
import Moderation from "./pages/moderation.jsx";

function App() {
  const [tickersArr, setTickersArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [activComponent, setActivComponent] = useState(false);
  const [activeTab, setActiveTab] = useState("examples");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTickerStr = document.getElementById("ticker-input").value;
    if (newTickerStr.length > 2) {
      setTickersArr([...tickersArr, newTickerStr.toUpperCase()]);
      document.getElementById("ticker-input").value = "";
    } else {
      setError(
        "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla."
      );
    }
  };

  const fetchStockData = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const stockData = await Promise.all(
        tickersArr.map(async (ticker) => {
          try {
            console.log("ticker", ticker);
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${POLYGON_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            if (response.status === 200) {
              setApiMessage("Creating report...");
              delete data.request_id
              return JSON.stringify(data)
            } else {
              setError("There was an error fetching stock data.");
              return null;
            }
          } catch (err) {
            setError("There was an error fetching stock data.");
            console.error("error: ", err);
            return null;
          }
        })
      );
      fetchReport(stockData.join(""));
    } catch (err) {
      setLoading(false);
      setError("There was an error fetching stock data.");
      console.error("error: ", err);
    }
  };

  // if (tickersArr.length > 0) {
  //   fetchStockData();
  // }

  const fetchReport = async (data) => {
    // console.log("data", data);
    // Your AI code here

    const messages = [
      {
        role: "system",
        content:
          "You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.",
      },
      {
        role: "user",
        content: data,
      },
    ];

    try {
      // const openai = new OpenAI({
      //   apiKey: OPENAI_API_KEY,
      //   dangerouslyAllowBrowser: true,
      // });

      // const response = await openai.chat.completions.create({
      //   messages: messages,
      //   model: "gpt-4",
      //   max_tokens: 150,
      //   temperature: 2, // default 1
      // });

      const url = "https://openai-api-worker-0a0c1.tomasb-kodehode.workers.dev";

      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messages),
      })
      const data = await response.json()
      console.log("data", data)

      if (!response.ok) {
        setError(data.error);
        // throw new Error(`Worker Error: ${data.error}`)        
      }

      setOutput(data.content);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setError("Unable to access AI. Please refresh and try again");
    }
  };

  return (
    <div className="flex flex-col items-center w-[360px] mx-auto  ">
      <div className="flex w-full h-32 items-center justify-center bg-black">
        <img src={logo} alt="logo" className="w-[320px] " />
      </div>
      {error ? (
        <p className="text-red-500 text-lg text-center px-8 py-4">{error}</p>
      ) : (
        <p className=" text-lg text-center px-8 py-4 text-slate-800 ">
          Add up to 3 stock tickers below to get a super accurate stock
          predictions report👇{" "}
        </p>
      )}
      <form className="flex flex-col items-center">
        <div className="flex  ">
          <input
            id="ticker-input"
            className="border-2 border-r-0 border-gray-700 p-2 my-2 mx-0"
            placeholder="MSFT"
          />
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="flex items-center p-2 px-3 my-2 cursor-pointer border-2 border-gray-700 "
          >
            <img className="w-4" src={add} alt="add" />
          </button>
        </div>
        <p className="text-lg py-2 text-slate-800" id="ticker-choice-display">
          {tickersArr.length > 0
            ? tickersArr.map((ticker, index) => (
                <span key={index} className="text-lg font-medium ">
                  {tickersArr.length > 1 ? ticker + ", " : ticker}
                </span>
              ))
            : "Your tickers will appear here..."}
        </p>
        <button
          onClick={(event) => fetchStockData(event)}
          className="bg-green-300 border-2 border-gray-700 px-10 cursor-pointer uppercase font-medium text-stone-400 tracking-wider p-2 my-2"
        >
          Generate Report
        </button>
      </form>
      <p className="text-sm py-2 text-slate-800">
        Always correct 15% of the time!
      </p>
      {loading ? (
        <div className="loading-panel flex justify-center items-center">
          <img src={loadingSvg} alt="loading" className="w-16" />
          <p>{apiMessage}</p>
        </div>
      ) : (
        <div className="output-panel flex justify-center items-center">
          <p>{output}</p>
        </div>
      )}
      <p className="text-slate-800">
        &copy; This is not real financial advice!
      </p>
      <button
        onClick={() => setActivComponent((prevState) => !prevState)}
        className="text-red-500 text-lg text-center px-8 py-4"
      >
        Other examples
      </button>{" "}
      
      {activComponent && (
        <>
          <div className="flex justify-center space-x-4 bg-stone-300 p-2">
            <button
              className={`py-2 px-4 ${
                activeTab === "examples"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("examples")}
            >
              Examples
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "dalle"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("dalle")}
            >
              Dalle
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "moderation"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("moderation")}
            >
              Moderation
            </button>
          </div>
          <div className=" bg-stone-200 p-2 pb-11">
            {activeTab === "examples" && <Examples />}
            {activeTab === "dalle" && <Dalle />}
            {activeTab === "moderation" && <Moderation />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
