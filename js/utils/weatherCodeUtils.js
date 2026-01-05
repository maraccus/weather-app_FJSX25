/**
 * Konverterar WMO-väderkodd till svensk väderbeskrivning och motsvarande ikon.
 *
 * @param {number} code - WMO-väderkodd från Open-Meteo API
 * @returns {Object} Objekt med description (sträng) och icon (väg till ikon)
 * @example
 * const { description, icon } = convertWmoCode(3);
 * // description: "Mulet", icon: "./assets/images/mostly-cloudy.png"
 */
export function convertWmoCode(code) {
  const mapping = {
    0: { description: "Klart", icon: "./assets/images/partly-cloudy.png" },
    1: { description: "Lätt molnigt", icon: "./assets/images/partly-cloudy.png" },
    2: { description: "Molnigt", icon: "./assets/images/mostly-cloudy.png" },
    3: { description: "Mulet", icon: "./assets/images/mostly-cloudy.png" },
    45: { description: "Dimma", icon: "./assets/images/mostly-cloudy.png" },
    48: { description: "Dimma", icon: "./assets/images/mostly-cloudy.png" },
    51: { description: "Duggregn", icon: "./assets/images/rain.png" },
    53: { description: "Duggregn", icon: "./assets/images/rain.png" },
    55: { description: "Duggregn", icon: "./assets/images/rain.png" },
    61: { description: "Regn", icon: "./assets/images/rain.png" },
    63: { description: "Regn", icon: "./assets/images/rain.png" },
    65: { description: "Regn", icon: "./assets/images/rain.png" },
    71: { description: "Snöfall", icon: "./assets/images/snow.png" },
    73: { description: "Snöfall", icon: "./assets/images/snow.png" },
    75: { description: "Snöfall", icon: "./assets/images/snow.png" },
    95: { description: "Åska", icon: "./assets/images/thunderstorm.png" },
    96: { description: "Åska", icon: "./assets/images/thunderstorm.png" },
    99: { description: "Åska", icon: "./assets/images/thunderstorm.png" },
  };
  return mapping[code] || { description: "Okänt väder", icon: "./assets/images/partly-cloudy.png" };
}

/**
 * Mappar vädertyp till motsvarande CSS-klass.
 *
 * @param {string} weatherDescription - Väderbeskrivning (t.ex. "Regn")
 * @returns {string} CSS-klassnamn för vädertypen
 */
export function getWeatherClass(weatherDescription) {
  const classMap = {
    "Snöfall": "weather-snow",
    "Regn": "weather-rain",
    "Duggregn": "weather-rain",
    "Åska": "weather-thunder",
    "Mulet": "weather-cloudy",
    "Klart": "weather-sun",
    "Lätt molnigt": "weather-cloudy",
    "Molnigt": "weather-cloudy",
    "Dimma": "weather-cloudy",
  };
  return classMap[weatherDescription] || "weather-cloudy";
}
