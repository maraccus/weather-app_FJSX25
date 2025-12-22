export class addCity {
    constructor(city, weather, temp) {
        this.city = city;
        this.weather = weather;
        this.temp = temp;

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

    switchToCurrent() {
        const city = document.querySelector(".card-city");
        if (city) city.textContent = this.city;

        const temp = document.querySelector(".card-temp");
        if (temp) temp.textContent = this.temp + "°";

        const weather = document.querySelector(".card-weather");
        if (weather) weather.textContent = this.weather;
    }

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