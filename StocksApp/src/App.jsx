import React, { useState, useEffect, Text, Image } from "react";

import { dates } from "./assets/utils/dates.jsx";
import logo from "./assets/images/logo-dave-text.png";
import add from "./assets/images/add.svg";
import loadingSvg from "./assets/images/loader.svg";

function App() {
  const [tickersArr, setTickersArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

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

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const stockData = await Promise.all(
        tickersArr.map(async (ticker) => {
          const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`;
          const response = await fetch(url);
          const data = await response.text();
          if (response.status === 200) {
            setApiMessage("Creating report...");
            return data;
          } else {
            setError("There was an error fetching stock data.");
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
    // Your AI code here
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

      <form  className="flex flex-col items-center">
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
          onClick={fetchStockData}
          type="submit"
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
    </div>
  );
}

export default App;
