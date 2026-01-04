import { formatDate, formatTime } from "./dateUtils.js";
import { isFavorite, toggleFavorite } from "./localStorage.js";

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
    console.log("Creating pagination dot for new city: " + this.city);

    this.element = document.createElement("button");

    const dotIcon = document.createElement("i");
    dotIcon.classList.add("fa-regular", "fa-circle");

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
    } else {
      console.warn("Kunde inte lägga till pagination dot för sparad stad!");
    }
  }

  removeCity(savedCities){
    console.log("Removing city: " + this.city);

    const container = document.getElementById("pagination-dots");

    if (container && this.element) {
      const removedIndex = this.id;

      // 1. Remove from array
      savedCities.splice(removedIndex, 1);

      // 2. Remove DOM element
      container.removeChild(this.element);

      // 3. Fix IDs for cities after the removed one
      for (let i = removedIndex; i < savedCities.length; i++) {
        savedCities[i].id -= 1;
      }

  } else {
    console.warn("Kunde inte ta bort pagination dot för stad!");
  }
  }
  /**
   * Uppdaterar huvudkortet med data för denna stad.
   * Använder fade-effekt och formaterar datum/tid med dateUtils.
   * Markerar också aktuell prick som aktiv.
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

    card.classList.remove(
      "weather-snow",
      "weather-rain",
      "weather-thunder",
      "weather-sun",
      "weather-cloudy",
      "weather-clear"
    );

    switch (this.weather) {
      case "Snöfall":
        card.classList.toggle("weather-snow");
        icon.src = "./assets/images/snow.png";
        break;
      case "Regn":
        card.classList.toggle("weather-rain");
        icon.src = "./assets/images/rain.png";
        break;
      case "Åska":
        card.classList.toggle("weather-thunder");
        icon.src = "./assets/images/thunderstorm.png";
        break;
      case "Mulet":
        card.classList.toggle("weather-cloudy");
        icon.src = "./assets/images/mostly-cloudy.png";
        break;
      case "Klart":
        card.classList.toggle("weather-sun");
        icon.src = "./assets/images/partly-cloudy.png";
        break;
      case "Duggregn":
        card.classList.toggle("weather-rain");
        icon.src = "./assets/images/rain.png";
        break;
      case "Lätt molnigt":
        card.classList.toggle("weather-cloudy");
        icon.src = "./assets/images/partly-cloudy.png";
        break;
      case "Molnigt":
        card.classList.toggle("weather-cloudy");
        icon.src = "./assets/images/mostly-cloudy.png";
        break;
    }

    const elements = [dateEl, timeEl, city, temp, weather];

    // Fade out
    elements.forEach((anim) => {
      if (anim) anim.style.opacity = 0;
    });

    // Fade in
    setTimeout(() => {
      if (dateEl)
        dateEl.textContent = this.time
          ? formatDate(this.time)
          : dateEl.textContent;
      if (timeEl) timeEl.textContent = this.time ? formatTime(this.time) : "";
      if (city) city.textContent = this.city;
      if (temp) temp.textContent = this.temp + "°C";
      if (weather) weather.textContent = this.weather;

      elements.forEach((anim) => {
        if (anim) anim.style.opacity = 1;
      });
    }, 200);
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
