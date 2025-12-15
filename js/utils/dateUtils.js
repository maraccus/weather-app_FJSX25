/**
 * Formats a time string to Swedish locale time format (HH:MM).
 * @param {string} timeString - The time string to format (should be a valid date string).
 * @returns {string} The formatted time in HH:MM format, an empty string if input is falsy, 
 *                   or the original string if it cannot be parsed as a valid date.
 * @example
 * formatWeatherTime("2024-03-15T14:30:00"); // Returns "14:30"
 * formatWeatherTime(""); // Returns ""
 * formatWeatherTime("invalid"); // Returns "invalid"
 */
export function formatWeatherTime(timeString) {
  if (!timeString) return "";

  const date = new Date(timeString);
  if (isNaN(date.getTime())) return timeString;

  return date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
