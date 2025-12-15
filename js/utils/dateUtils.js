export function formatWeatherTime(timeString) {
  if (!timeString) return "";

  const date = new Date(timeString);
  if (isNaN(date.getTime())) return timeString;

  return date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
