import { addCity } from './addCity.js';
import { initMainCard } from "./mainCard.js";
import { initNavBar } from "./navBar.js";
import { getWeatherForCity } from "./weatherData.js";
import { initIntro } from "./intro.js";
import { initPopup, showPopup } from './popup.js';

let maxCities = 5;
let savedCities = [];

async function startApp() {

    // Skapa huvudkortet
    initMainCard();
    addDefaultCity();
    
    // Skapa navigationsbaren
    initNavBar();

    const cardsContainer = document.getElementById("cards-container");
    const navContainer = document.getElementById("nav-container");
    cardsContainer.classList.add("fade-in");
    navContainer.classList.add("fade-in");
    
    

    console.log("Initializing app...");
    
    

    console.log("App ready");

    const btnHtml = document.querySelector("#searchBtn");
    const userInputHtml = document.querySelector("#cityInput");

    if (!btnHtml || !userInputHtml) {
        console.error("Search button or input not found in DOM!");
        return;
    }

    const handleSearch = async () => {
        if (savedCities.length >= maxCities) {
            console.log("Maximum number of cities reached:", maxCities);
            showPopup("Kan inte lägga till fler städer. Ta bort en befintlig stad först.");
            return;
        } else {
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

        // Add data from api to pagination
        let dot = new addCity(city.name, weather.description, Math.round(weather.temperature), weather.time);
        savedCities.push(dot);
        console.log("Added to pagination dots, total saved cities:", savedCities.length);

        userInputHtml.value = "";
        }
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

async function addDefaultCity(){
    console.log("Default city added");

    const result = await getWeatherForCity("Stockholm");
    const { city, weather } = result;
    console.log("Got weather data for:", city.name, weather);

    // Add data from api to pagination
    let dot = new addCity(city.name, weather.description, Math.round(weather.temperature), weather.time);
    savedCities.push(dot);
    
}

// Event listeners
//////////////////

// Starta introduktionen när sidan är laddad
document.addEventListener("DOMContentLoaded", async () => {
    initIntro();
    initPopup();
});

// Starta appen när introduktionen är klar
window.addEventListener("introFinished", () => {
  startApp();
});