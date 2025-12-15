export class WeatherStorage{
    constructor(city, weather) {
        this.city = city;
        this.weather = weather;

        this.addCityToWeather();
    }

    addCityToWeather(){
        console.log("Running addCityToWeather func.")
    }

    createCard(){
        console.log("Running createCard func.");

        const buttonContainer = document.querySelector('.card-scroll');

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle';

        buttonContainer.appendChild(icon);

    }

//     // Remove card and elements from DOM
//    remove() {
//     if (this.element) {
//         this.element.classList.add('removing');

//         setTimeout(() => {
//             this.element.remove();
//             this.element = null;
//         }, 300); // matchar transition-tiden
//     }
}

