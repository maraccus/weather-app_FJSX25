export class WeatherCard{
    constructor(city, weather) {
        this.city = city;
        this.weather = weather;

        this.createCard();
    }

    createCard(){
        console.log("Running createCard func.")

        // Skapa huvudsektionen
        this.element = document.createElement('section');
        this.element.className = 'weather-card';

        // Top div med stängningsknapp
        const topDiv = document.createElement('div');
        topDiv.className = 'weather-card-top';

        const closeButton = document.createElement('button');
        closeButton.className = 'weather-card-close';
        closeButton.innerHTML = '<i class="fa-solid fa-x"></i>';
        closeButton.addEventListener('click', () => this.remove());

        topDiv.appendChild(closeButton);
        this.element.appendChild(topDiv);

        // Info div
        const infoDiv = document.createElement('div');
        infoDiv.className = 'weather-card-info';

        const dateP = document.createElement('p');
        dateP.className = 'weather-date';
        dateP.textContent = "Måndag, 24 November";

        const cityH2 = document.createElement('h2');
        cityH2.className = 'weather-city';
        cityH2.textContent = this.city.name;

        const iconImg = document.createElement('img');
        iconImg.className = 'weather-icon';
        iconImg.src = "assets/images/partly-cloudy.png";
        iconImg.alt = this.weather?.description || '';

        const degreesH3 = document.createElement('h3');
        degreesH3.className = 'weather-degrees';
        degreesH3.textContent = this.weather ? Math.round(this.weather.temperature) : "--";

        const descP = document.createElement('p');
        descP.className = 'weather-description';
        descP.textContent = this.weather?.description || "Okänt väder";

        infoDiv.append(dateP, cityH2, iconImg, degreesH3, descP);
        this.element.appendChild(infoDiv);

        // Bottom div
        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'weather-card-bottom';
        bottomDiv.innerHTML = '&nbsp;';
        this.element.appendChild(bottomDiv);

        // Lägg till kortet i container
        const container = document.getElementById('cards-container');
        if (container) {
            container.appendChild(this.element);
        } else {
            console.warn('cards-container finns inte i DOM!');
        }
    }

    // Remove card and elements from DOM
   remove() {
    if (this.element) {
        this.element.classList.add('removing');

        setTimeout(() => {
            this.element.remove();
            this.element = null;
        }, 300); // matchar transition-tiden
    }
}
}
