import { WeatherCard } from "./weatherCard.js";
import * as WeatherData from "./weatherData.js";

let weatherCards = [];

async function initApp() {
  console.log("Initializing app...");

  await WeatherData.loadCities();
  console.log("Cities loaded");

  const btnHtml = document.querySelector("#searchBtn");
  const userInputHtml = document.querySelector("#cityInput");

  if (!btnHtml || !userInputHtml) {
    console.error("Search button or input not found in DOM!");
    return;
  }

  const handleSearch = async () => {
    const cityName = userInputHtml.value.trim();
    console.log("Searching for city:", cityName);

    if (!cityName) {
      console.log("City name is empty");
      return;
    }

    const result = await WeatherData.getWeather(cityName);
    if (!result) {
      console.log("No weather result returned");
      return;
    }

    const { city, weather } = result;
    console.log("Got weather data for:", city.name, weather);

    let card = new WeatherCard(city, weather);
    weatherCards.push(card);
    console.log("Card created, total cards:", weatherCards.length);

    userInputHtml.value = "";
  };

  btnHtml.addEventListener("click", async () => {
    console.log("Search button clicked");
    await handleSearch();
  });

  userInputHtml.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Enter key pressed");
      await handleSearch();
    }
  });

  console.log("Event listeners attached");
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
