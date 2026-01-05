import { addCity } from "./addCity.js";
import { initMainCard } from "./mainCard.js";
import { initNavBar } from "./navBar.js";
import { getWeatherForCity } from "./weatherData.js";
import { initIntro } from "./intro.js";
import { initPopup, showPopup } from "./popup.js";
import { getFavorites, toggleFavorite } from "./localStorage.js";

let maxCities = 5;
let savedCities = [];

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

  const btnHtml = document.getElementById("searchBtn");
  const userInputHtml = document.getElementById("cityInput");

  if (!btnHtml || !userInputHtml) {
    console.error("Search button or input not found in DOM!");
    return;
  }

  const handleSearch = async () => {
    const cityName = userInputHtml.value.trim();

    if (!cityName) {
      return;
    }

    // Kollar om stad redan är laddad
    const existingCity = savedCities.find(
      (city) => city.city.toLowerCase() === cityName.toLowerCase()
    );
    if (existingCity) {
      existingCity.switchToCurrent();
      existingCity.setActiveDot(existingCity.element.querySelector("i"));
      userInputHtml.value = "";
      return;
    }

    if (savedCities.length >= maxCities) {
      showPopup(
        "Kan inte lägga till fler städer. Ta bort en befintlig stad först."
      );
      return;
    }

    const result = await getWeatherForCity(cityName);
    if (!result) {
      return;
    }

    const { city, weather } = result;

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

    userInputHtml.value = "";
  };

  btnHtml.addEventListener("click", async () => {
    await handleSearch();
  });

  userInputHtml.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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

async function addDefaultCity() {
  const favorites = getFavorites();

  if (favorites.length > 0) {
    // Laddar lista med favorit städer
    for (const cityName of favorites) {
      const result = await getWeatherForCity(cityName);
      if (result) {
        const { city, weather } = result;
        let dot = new addCity(
          city.name,
          weather.description,
          Math.round(weather.temperature),
          weather.time,
          weather.weathercode
        );
        savedCities.push(dot);
        // Lägg till ID till staden
        let savedId = savedCities.length;
        savedCities[savedId - 1].id = savedId - 1;
      }
    }
  } else {
    // Laddar stockholm som default om favorit städer inte finns
    const result = await getWeatherForCity("Stockholm");
    const { city, weather } = result;
    let dot = new addCity(
      city.name,
      weather.description,
      Math.round(weather.temperature),
      weather.time,
      weather.weathercode
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
