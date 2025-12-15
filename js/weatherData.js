import { ApiService } from "./api/api.js";

let allCities = [];

export async function loadCities() {
  const api = new ApiService("http://kontoret.onvo.se:10480/GetCities");

  try {
    allCities = await api.fetchData();
    console.log("Loaded cities:", allCities);
  } catch (err) {
    console.error("Kunde inte hämta städer:", err);
  }
}

export function findCityByName(name) {
  const lower = name.toLowerCase();
  return allCities.find((c) => c.name.toLowerCase() === lower);
}

export async function getWeather(cityName) {
  const city = findCityByName(cityName);
  if (!city) {
    alert("Staden finns inte i listan.");
    return null;
  }

  const { latitude, longitude } = city;

  const url = `http://kontoret.onvo.se:10480/GetWeather?lat=${latitude}&lon=${longitude}`;
  const api = new ApiService(url);

  try {
    const weatherJSON = await api.fetchData();

    const weather = {
      temperature: weatherJSON.current.temperature_2m,
      description: convertWmo(weatherJSON.current.weather_code),
      weathercode: weatherJSON.current.weather_code,
      time: weatherJSON.current.time,
    };

    return { city, weather };
  } catch (err) {
    console.error("Kunde inte hämta väder:", err);
    return null;
  }
}

function convertWmo(code) {
  const mapping = {
    0: "Klart",
    1: "Lätt molnigt",
    2: "Molnigt",
    3: "Mulet",
    45: "Dimma",
    48: "Dimma",
    51: "Duggregn",
    53: "Duggregn",
    55: "Duggregn",
    61: "Regn",
    63: "Regn",
    65: "Regn",
    71: "Snöfall",
    73: "Snöfall",
    75: "Snöfall",
    95: "Åska",
    96: "Åska",
    99: "Åska",
  };
  return mapping[code] || "Okänt väder";
}
