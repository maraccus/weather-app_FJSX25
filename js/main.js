import { addCity } from './addCity.js';
import { initMainCard } from "./mainCard.js";
import { initNavBar } from "./navBar.js";
import { getWeatherForCity } from "./weatherData.js";

async function startApp() {

    // Skapa huvudkortet
    initMainCard();
    
    // Skapa navigationsbaren
    initNavBar();

    const cardsContainer = document.getElementById("cards-container");
    const navContainer = document.getElementById("nav-container");
    cardsContainer.classList.add("fade-in");
    navContainer.classList.add("fade-in");
    
    let savedCities = [];

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

        const result = await getWeatherForCity(cityName);
        if (!result) {
            console.log("No weather result returned");
            return;
        }

        const { city, weather } = result;
        console.log("Got weather data for:", city.name, weather);

        // Add data from api to pagnation
        let dot = new addCity(city.name, weather.description, Math.round(weather.temperature), weather.time);
        savedCities.push(dot);
        console.log("Added to pagination dots, total saved cities:", savedCities.length);

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

async function initNav(){
    console.log("Nav initialized");
};

// // Wait for DOM to be ready
// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", initApp);
// } else {
//     initApp();
// }

// startApp();

window.addEventListener("introFinished", () => {
  startApp();
});