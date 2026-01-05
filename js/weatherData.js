import { ApiService } from "./api/api.js";
import { convertWmoCode } from "./utils/weatherCodeUtils.js";

/**
 * Hämtar aktuellt väder för en given stad genom att först söka koordinater via Open-Meteo Geocoding API
 * och sedan hämta väderdata via Open-Meteo Forecast API.
 *
 * @param {string} cityName - Namnet på staden att söka väder för (t.ex. "Stockholm"). Ej skiftlägeskänsligt.
 * @returns {Promise<Object|null>} Ett objekt med två egenskaper:
 *   - city: Objekt med stadens namn, latitude och longitude
 *   - weather: Objekt med temperature, description, weathercode och time
 *   Returnerar null om staden inte hittas, API-fel inträffar eller om fetch misslyckas.
 * @example
 * const result = await getWeatherForCity("Göteborg");
 * // result = { city: {...}, weather: {...} }
 */
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
    const { description, icon } = convertWmoCode(cw.weathercode);
    const weather = {
      temperature: cw.temperature ?? null,
      description,
      weathercode: cw.weathercode ?? null,
      time: cw.time ?? null,
      icon,
    };

    return { city, weather };
  } catch (err) {
    console.error("Kunde inte hämta väder:", err);
    return null;
  }
}
