export class addCity{
    constructor(city, weather, temp) {
        this.city = city;
        this.weather = weather;
        this.temp = temp;

        this.addCityCard();
    }

    addCityCard(){
        console.log("Creating pagination dot for new card: " + this.city)

        // Skapa huvudsektionen
        this.element = document.createElement('button');

        const dotIcon = document.createElement('i');
        dotIcon.classList.add("fa-regular", "fa-circle");

        this.element.appendChild(dotIcon);

        // Lägg till kortet i container
        const container = document.getElementById('pagination-dots');
        if (container) {
            container.appendChild(this.element);

            this.element.addEventListener('click', () => {
                this.switchToCurrent();
                dotIcon.classList.remove('fa-regular');
                dotIcon.classList.add('fa-solid');
            });


        } else {
            console.warn('Kunde inte lägga till pagination dot för sparad stad!');
        }

    }

    switchToCurrent(){
        console.log("Dot clicked for city: " + this.city);

                const city = document.querySelector(".card-city");
                city.textContent = this.city;

                const temp = document.querySelector(".card-temp");
                temp.textContent = this.temp + "°";

                const weather = document.querySelector(".card-temp");
                temp.textContent = this.weather;

                const allDots = document.querySelectorAll('#pagination-dots button i');

                allDots.forEach(dot => {
                    dot.classList.remove('fa-solid');
                    dot.classList.add('fa-regular');
                });

                // Sätt den klickade dotten som aktiv
                
    }

}