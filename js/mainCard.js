export function initMainCard() {

    // Hämta cards-container
    const cardsContainer = document.getElementById("cards-container");

    // Skapa section
    const section = document.createElement("section");
    section.classList.add("card", "weather-rain");

    // Datum
    const date = document.createElement("p");
    date.className = "card-date";
    date.textContent = "Day, Date";

    // Tid
    const time = document.createElement("p");
    time.className = "card-time";
    time.textContent = "";

    // Stad
    const city = document.createElement("h2");
    city.className = "card-city";
    city.textContent = "City";

    // Ikon
    const icon = document.createElement("img");
    icon.className = "card-icon";
    icon.src = "assets/images/rain.png";
    icon.alt = "";

    // Temperatur
    const temp = document.createElement("h3");
    temp.className = "card-temp";
    temp.textContent = "Temp";

    // Beskrivning
    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = "Weather";

    // Pagination
    const pagination = document.createElement("nav");
    pagination.id = "pagination-dots";

    /* pagination.innerHTML = `
    <button><i class="fa-solid fa-circle"></i></button>
    `; */

    // Remove-knapp
    const removeNav = document.createElement("nav");
    removeNav.id = "card-remove";

    removeNav.innerHTML = `
    <button><i class="fa-solid fa-x"></i></button>
    `;

    // Lägg allt i section
    section.append(
    date,
    time,
    city,
    icon,
    temp,
    description,
    pagination,
    removeNav
    );

    // Lägg section i cards-container
    cardsContainer.appendChild(section);

    console.log("Huvudkort skapat");

}



