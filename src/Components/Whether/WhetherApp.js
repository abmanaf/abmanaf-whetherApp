import React, { useEffect, useState } from "react";
import search from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import "./WhetherApp.css";
import axios from "axios";

function WhetherApp() {
  /*
  const [inputData, setInputData] = useState({
    celsius: 10,
    name: "Ghana",
    humidity: 20,
    speed: 10,
    image_per_location: cloud,
  });
*/
  const [inputData, setInputData] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (location !== "") {
      const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e9483d5c7af8ac5346fc774617948e67&units=metric`;
      const time_zone_api = "http://worldtimeapi.org/api/timezone";
      axios
        .get(api_url)
        .then((res) => {
          let imageDirectory = cloud; // Default image
          if (res.data.weather && res.data.weather.length > 0) {
            const weatherMain = res.data.weather[0].main;

            switch (weatherMain) {
              case "cloud":
                imageDirectory = cloud;
              case "Clear":
                imageDirectory = clear;
                break;
              case "Drizzle":
                imageDirectory = drizzle;
                break;
              case "Rain":
                imageDirectory = rain;
                break;
              case "Humidity":
                imageDirectory = humidity;
                break;
              case "Wind":
                imageDirectory = wind;
                break;
              case "Snow":
                imageDirectory = snow;
                break;
              // Add more cases as needed
              default:
                break;
            }
          }

          setInputData({
            ...inputData,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image_per_location: imageDirectory,
          });
          console.log(res.data);
          console.log(time_zone_api);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            alert("Invalid Location");
          }
          console.error(err);
        });
    } else {
      alert("input the location");
    }
  };

  return (
    <div className="main-container">
      <div className="search-container">
        <div>
          <input
            type="text"
            placeholder="Enter County/city name"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </div>
        <div className="search-image" onClick={handleSearch}>
          <img src={search} alt="search" />
        </div>
      </div>

      {inputData ? (
        <>
          <div className="whether-images">
            <img src={inputData.image_per_location} alt="cloud" />
          </div>
          <div className="temperature">{Math.round(inputData.celsius)}°C</div>
          <div className="location">{inputData.name}</div>
          <div className="data-container">
            {/* 
            <div className="element">
              <img src={humidity} alt="" className="icons" />
              <div className="data">
                <div className="humidity">{inputData.humidity}%</div>
                <div className="humidity-text">Humidity</div>
              </div>
            </div>
            */}
            <div className="element">
              <div className="wind-image">
                <img src={wind} alt="" className="icons" />
              </div>
              <div className="data">
                <div className="humidity">{inputData.speed} km/h</div>
                <div className="humidity-text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default WhetherApp;
