"use strict";
import config from "./config.js";
const weatherApi = config.weatherApi;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    const cityName = data.name.replace(/ Province$/, "");
    document.querySelector(".city").textContent = cityName;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    if (data.weather[0].main.toLowerCase() === "clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main.toLowerCase() === "clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main.toLowerCase() === "rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main.toLowerCase() === "drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main.toLowerCase() === "mist") {
      weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    console.error("Please enter a valid city name");
  }
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) {
      checkWeather(city);
    } else {
      console.error("Please enter a valid city name");
    }
  }
});
