export class WeatherStorage {
    constructor(city, weather) {
        this.city = city;
        this.weather = weather;

        this.addCityToWeather();
    }

    addCityToWeather() {
        console.log("Running addCityToWeather func.");
        this.createCard();
    }

    createCard() {
        const buttonContainer = document.querySelector('.card-scroll');

        if (!buttonContainer) {
            console.error('.card-scroll hittades inte');
            return;
        }

        const icon = document.createElement('i');
        icon.className = 'fa-regular fa-circle';

        buttonContainer.appendChild(icon);
    }
}