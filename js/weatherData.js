import { ApiService } from "./api/api.js";

export async function getWeatherForCity(cityName) {
  if (!cityName) return null;

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=1&language=en&format=json`;
  const geoApi = new ApiService(geoUrl);

  try {
    const geoJson = await geoApi.fetchData();
    const results = geoJson.results || [];
    if (!results.length) {
      alert("Staden hittades inte.");
      return null;
    }

    const city = results[0];
    const { latitude, longitude } = city;

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const forecastApi = new ApiService(forecastUrl);
    const forecastJson = await forecastApi.fetchData();

    const cw = forecastJson.current_weather || {};
    const weather = {
      temperature: cw.temperature ?? null,
      description: convertWmo(cw.weathercode),
      weathercode: cw.weathercode ?? null,
      time: cw.time ?? null,
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