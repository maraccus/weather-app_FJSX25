const STORAGE_KEY = "favoriteWeatherCities";

/**
 * Hämtar alla favoritsparade städer från localStorage.
 * @returns {Array<string>} Array med namn på favoritsparade städer
 */
export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Kontrollerar om en stad är sparad som favorit.
 * @param {string} cityName - Namnet på staden att kontrollera
 * @returns {boolean} Sant om staden är en favorit
 */
export function isFavorite(cityName) {
  return getFavorites().includes(cityName);
}

/**
 * Lägger till en stad till favoriter om den inte redan finns sparad.
 * @param {string} cityName - Namnet på staden att lägga till
 */
export function addFavorite(cityName) {
  const favorites = getFavorites();
  if (!favorites.includes(cityName)) {
    favorites.push(cityName);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

/**
 * Tar bort en stad från favoriter.
 * @param {string} cityName - Namnet på staden att ta bort
 */
export function removeFavorite(cityName) {
  const favorites = getFavorites();
  const filtered = favorites.filter((city) => city !== cityName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Togglar favoritstatus för en stad.
 * Om staden är favorit tas den bort, annars läggs den till.
 * @param {string} cityName - Namnet på staden att toggla
 * @returns {boolean} Ny favoritstatus (sant om nu favorit)
 */
export function toggleFavorite(cityName) {
  if (isFavorite(cityName)) {
    removeFavorite(cityName);
    return false;
  } else {
    addFavorite(cityName);
    return true;
  }
}
