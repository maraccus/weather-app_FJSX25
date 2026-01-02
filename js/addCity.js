import { formatDate, formatTime } from './dateUtils.js';

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

    constructor(city, weather, temp, time) {
        this.city = city;
        this.weather = weather;
        this.temp = temp;
        this.time = time;

        this.addCityCard();
    }

    addCityCard() {
        console.log("Creating pagination dot for new city: " + this.city);

        this.element = document.createElement('button');

        const dotIcon = document.createElement('i');
        dotIcon.classList.add("fa-regular", "fa-circle");

        this.element.appendChild(dotIcon);

        const container = document.getElementById('pagination-dots');
        if (container) {
            container.appendChild(this.element);

            this.setActiveDot(dotIcon);
            this.switchToCurrent();

            this.element.addEventListener('click', () => {
                this.switchToCurrent();
                this.setActiveDot(dotIcon);
            });

        } else {
            console.warn('Kunde inte lägga till pagination dot för sparad stad!');
        }
    }
    /**
     * Uppdaterar huvudkortet med data för denna stad.
     * Använder fade-effekt och formaterar datum/tid med dateUtils.
     * Markerar också aktuell prick som aktiv.
     */

    switchToCurrent() {
        const dateEl = document.querySelector('.card-date');
        const timeEl = document.querySelector('.card-time');
        const city = document.querySelector(".card-city");
        const temp = document.querySelector(".card-temp");
        const weather = document.querySelector(".card-weather");

        const elements = [dateEl, timeEl, city, temp, weather];

        // Fade out
        elements.forEach(anim => {
            if (anim) anim.style.opacity = 0;
        });

        // Fade in
        setTimeout(() => {
            if (dateEl) dateEl.textContent = this.time ? formatDate(this.time) : dateEl.textContent;
            if (timeEl) timeEl.textContent = this.time ? formatTime(this.time) : '';
            if (city) city.textContent = this.city;
            if (temp) temp.textContent = this.temp + "°C";
            if (weather) weather.textContent = this.weather;

            elements.forEach(anim => {
                if (anim) anim.style.opacity = 1;
            });
        }, 200);
    }
    /**
     * Markererar den aktuella pagination-pricken som aktiv (fylld cirkel)
     * och avmarkerar alla andra.
     *
     * @param {HTMLElement} activeIcon - Ikon-elementet för den aktiva pricken
     */

    setActiveDot(activeIcon) {
        const allDots = document.querySelectorAll('#pagination-dots button i');

        allDots.forEach(dot => {
            dot.classList.remove('fa-solid');
            dot.classList.add('fa-regular');
        });

        activeIcon.classList.remove('fa-regular');
        activeIcon.classList.add('fa-solid');
    }
}