"use client";
import React, { useState } from "react";
import {apiKey} from "../config/config.js"
interface WeatherData {
  name: string;
  current: {
    temp_c: number;
    wind_kph : number;
  };
}

const Weather: React.FC = () => {
  const [Weather, setWeather] = useState<WeatherData | undefined>();
  const [city, setCity] = useState("");

  const GetData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const weather: WeatherData = await response.json();
      console.log(weather);
      setWeather(weather);
    } catch (error) {
      console.error("ERROR WHILE FETCHING DATA", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full h-[850px] bg-black text-white gap-10">
      {Weather && (
        <div className="flex gap-5">
          <p className="text-5xl font-bold">Temperature: {Weather.current.temp_c}°C</p>
          <p className="text-5xl font-bold">Wind : {Weather.current.wind_kph}KPH</p>
        </div>
      )}
      <div className="w-1/3 h-16  flex items-center gap-5 ">
        <input
          type="text"
          placeholder="Enter The City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-96 h-full rounded-3xl p-3 outline-none bg-gray-800
          text-2xl"
        />
        <button
          onClick={GetData}
          className="bg-gray-900 text-white px-8 py-4 rounded-3xl hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300 "
        >
          Get Weather
        </button>
      </div>
    </div>
  );
};

export default Weather;
