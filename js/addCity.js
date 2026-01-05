import { formatDate, formatTime } from "./dateUtils.js";
import { isFavorite } from "./localStorage.js";
import { convertWmoCode, getWeatherClass } from "./utils/weatherCodeUtils.js";
import { fadeOutInUpdate } from "./utils/domUtils.js";

/**
 * Klass som hanterar en tillagd stad i väderappen.
 * Skapar en pagination-dot (prick) i navigeringen och ansvarar för att uppdatera huvudkortet
 * när användaren klickar på pricken.
 */

export class addCity {
  /**
   * Skapar en ny stadsinstans och lägger till en prick i pagination-menyn.
   *
   * @param {string} city - Stadens namn (t.ex. "Stockholm")
   * @param {string} weather - Väderbeskrivning (t.ex. "Molnigt")
   * @param {number} temp - Avrundad temperatur i grader Celsius
   * @param {string} time - ISO-tidsträng för väderobservationen (används för datum/tid-formatering)
   * @param {number} [weathercode] - WMO-väderkodd för att bestämma ikon
   * @param {number} [id] - Stad-ID för pagination
   */

  constructor(city, weather, temp, time, weathercode, id) {
    this.city = city;
    this.weather = weather;
    this.temp = temp;
    this.time = time;
    this.weathercode = weathercode;
    this.id = id !== undefined ? id : null;

    this.addCityCard();
  }

  addCityCard() {
    this.element = document.createElement("button");
    this.element.setAttribute("aria-label", `Växla till väder i ${this.city}`);
    this.element.setAttribute("type", "button");

    const dotIcon = document.createElement("i");
    dotIcon.classList.add("fa-regular", "fa-circle");
    dotIcon.setAttribute("aria-hidden", "true");

    this.element.appendChild(dotIcon);

    const container = document.getElementById("pagination-dots");
    if (container) {
      container.appendChild(this.element);

      this.setActiveDot(dotIcon);
      this.switchToCurrent();

      this.element.addEventListener("click", () => {
        this.switchToCurrent();
        this.setActiveDot(dotIcon);
      });

      this.element.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.switchToCurrent();
          this.setActiveDot(dotIcon);
        }
      });
    }
  }

  removeCity(savedCities) {
    const container = document.getElementById("pagination-dots");
    if (!container || !this.element) return;

    const removedIndex = this.id;

    // 1. Remove from array
    savedCities.splice(removedIndex, 1);

    // 2. Remove DOM element
    container.removeChild(this.element);

    // 3. Fix IDs
    for (let i = removedIndex; i < savedCities.length; i++) {
      savedCities[i].id -= 1;
    }

    // 4. Choose next city (or previous)
    if (savedCities.length > 0) {
      const nextIndex =
        removedIndex < savedCities.length
          ? removedIndex
          : removedIndex - 1;

      const nextCity = savedCities[nextIndex];
      nextCity.switchToCurrent();
      nextCity.setActiveDot(nextCity.element.querySelector("i"));
    }
  }
  /**
   * Uppdaterar huvudkortet med data för denna stad.
   * Använder fade-effekt och formaterar datum/tid med dateUtils.
   */

  switchToCurrent() {
    // Set this city as the current one globally
    window.currentCity = this;

    const dateEl = document.querySelector(".card-date");
    const timeEl = document.querySelector(".card-time");
    const city = document.querySelector(".card-city");
    const temp = document.querySelector(".card-temp");
    const weather = document.querySelector(".card-description");
    const card = document.querySelector(".card");
    const icon = document.querySelector(".card-icon");

    // Update favorite button state
    this.updateFavoriteButton();

    // Remove all weather classes
    card.classList.remove(
      "weather-snow",
      "weather-rain",
      "weather-thunder",
      "weather-sun",
      "weather-cloudy",
      "weather-clear"
    );

    // Add appropriate weather class and set icon
    const weatherClass = getWeatherClass(this.weather);
    card.classList.add(weatherClass);

    // Set icon from weathercode
    if (this.weathercode !== undefined) {
      const { icon: iconPath } = convertWmoCode(this.weathercode);
      icon.src = iconPath;
    }
    icon.alt = `Väderikonen för ${this.weather}`;

    const elements = [dateEl, timeEl, city, temp, weather];

    fadeOutInUpdate(elements, () => {
      if (dateEl)
        dateEl.textContent = this.time
          ? formatDate(this.time)
          : dateEl.textContent;
      if (timeEl) timeEl.textContent = this.time ? formatTime(this.time) : "";
      if (city) city.textContent = this.city;
      if (temp) temp.textContent = this.temp + "°C";
      if (weather) weather.textContent = this.weather;
    });
  }
  /**
   * Markerar den aktuella pagination-pricken som aktiv (fylld cirkel)
   * och avmarkerar alla andra.
   *
   * @param {HTMLElement} activeIcon - Ikon-elementet för den aktiva pricken
   */

  setActiveDot(activeIcon) {
    const allDots = document.querySelectorAll("#pagination-dots button i");

    allDots.forEach((dot) => {
      dot.classList.remove("fa-solid");
      dot.classList.add("fa-regular");
    });

    activeIcon.classList.remove("fa-regular");
    activeIcon.classList.add("fa-solid");
  }

  updateFavoriteButton() {
    const favoriteBtn = document.querySelector(".favorite-btn");
    const favoriteIcon = document.querySelector(".favorite-btn i");
    if (!favoriteIcon || !favoriteBtn) return;

    if (isFavorite(this.city)) {
      favoriteIcon.classList.remove("fa-regular");
      favoriteIcon.classList.add("fa-solid");
      favoriteBtn.setAttribute(
        "aria-label",
        `Ta bort ${this.city} från favoriter`
      );
    } else {
      favoriteIcon.classList.remove("fa-solid");
      favoriteIcon.classList.add("fa-regular");
      favoriteBtn.setAttribute(
        "aria-label",
        `Lägg till ${this.city} som favorit`
      );
    }
  }
}
