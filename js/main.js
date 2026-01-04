import { addCity } from "./addCity.js";
import { initMainCard } from "./mainCard.js";
import { initNavBar } from "./navBar.js";
import { getWeatherForCity } from "./weatherData.js";
import { initIntro } from "./intro.js";
import { initPopup, showPopup } from "./popup.js";
import { getFavorites, toggleFavorite } from "./localStorage.js";

let maxCities = 5;
let savedCities = [];
let currentCity = null;
let selectedCity = null;

async function startApp() {
  // Skapa huvudkortet
  initMainCard();
  await addDefaultCity();

  
  const rmv = document.getElementById("card-remove");
  rmv.addEventListener("click", () => {
  if (savedCities.length === 1) {
    showPopup("Minst en stad måste finnas kvar.");
  } else {
    window.currentCity.removeCity(savedCities);
  }
});

  // Skapa navigationsbaren
  initNavBar();


  const cardsContainer = document.getElementById("cards-container");
  const navContainer = document.getElementById("nav-container");
  cardsContainer.classList.add("fade-in");
  navContainer.classList.add("fade-in");

  attachFavoriteButtonListener();

  console.log("Initializing app...");

  console.log("App ready");

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

    // Kollar om stad redan är laddad
    const existingCity = savedCities.find(
      (city) => city.city.toLowerCase() === cityName.toLowerCase()
    );
    if (existingCity) {
      console.log("City already loaded, switching focus to:", cityName);
      existingCity.switchToCurrent();
      existingCity.setActiveDot(existingCity.element.querySelector("i"));
      userInputHtml.value = "";
      return;
    }

    if (savedCities.length >= maxCities) {
      console.log("Maximum number of cities reached:", maxCities);
      showPopup(
        "Kan inte lägga till fler städer. Ta bort en befintlig stad först."
      );
      return;
    }

    const result = await getWeatherForCity(cityName);
    if (!result) {
      console.log("No weather result returned");
      return;
    }

    const { city, weather } = result;
    console.log("Got weather data for:", city.name, weather);

    // Add data from api to pagination
    let dot = new addCity(
      city.name,
      weather.description,
      Math.round(weather.temperature),
      weather.time,
      weather.weathercode
    );
    savedCities.push(dot);

    let savedId = savedCities.length;
    savedCities[savedId - 1].id = savedId - 1;
    console.log(
      "Added to pagination dots, total saved cities:",
      savedCities.length
    );

    for (let i = 0; i < savedCities.length; i++) {
      console.log(savedCities[i].city, ", ID:", savedCities[i].id);
    }

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
}

function attachFavoriteButtonListener() {
  const favoriteNav = document.getElementById("card-favorite");
  if (!favoriteNav) {
    return;
  }

  favoriteNav.addEventListener("click", (e) => {
    const favoriteBtn = e.target.closest(".favorite-btn");
    if (!favoriteBtn) return;

    e.stopPropagation();
    if (!window.currentCity) {
      return;
    }

    toggleFavorite(window.currentCity.city);
    window.currentCity.updateFavoriteButton();
  });
}

async function initNav() {}

async function addDefaultCity() {
  const favorites = getFavorites();

  selectedCity = 0;

  if (favorites.length > 0) {
    // Laddar lista med favorit städer
    console.log("Loading favorites:", favorites);
    for (const cityName of favorites) {
      const result = await getWeatherForCity(cityName);
      if (result) {
        const { city, weather } = result;
        console.log("Got weather data for:", city.name, weather);
        let dot = new addCity(
          city.name,
          weather.description,
          Math.round(weather.temperature),
          weather.time
        );
        savedCities.push(dot);
      }
    }
  } else {
    // Laddar stockholm som default om favorit städer inte finns
    console.log("No favorites found, loading default city: Stockholm");
    const result = await getWeatherForCity("Stockholm");
    const { city, weather } = result;
    console.log("Got weather data for:", city.name, weather);
    let dot = new addCity(
      city.name,
      weather.description,
      Math.round(weather.temperature),
      weather.time
    );
    savedCities.push(dot);
    dot.id = 0;
  }
}

// Event listeners

// Starta introduktionen när sidan är laddad
document.addEventListener("DOMContentLoaded", async () => {
  initIntro();
  initPopup();
});

// Starta appen när introduktionen är klar
window.addEventListener("introFinished", () => {
  startApp();
});
