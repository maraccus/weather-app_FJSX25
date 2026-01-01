// export function initMainCard() {

//     // Hämta cards-container
//     const cardsContainer = document.getElementById("cards-container");

//     // Skapa section
//     const section = document.createElement("section");
//     section.classList.add("card", "weather-rain");

//     // Datum
//     const date = document.createElement("p");
//     date.className = "card-date";
//     date.textContent = "Day, Date";

//     // Tid
//     const time = document.createElement("p");
//     time.className = "card-time";
//     time.textContent = "";

//     // Stad
//     const city = document.createElement("h2");
//     city.className = "card-city";
//     city.textContent = "City";

//     // Ikon
//     const icon = document.createElement("img");
//     icon.className = "card-icon";
//     icon.src = "assets/images/rain.png";
//     icon.alt = "";

//     // Temperatur
//     const temp = document.createElement("h3");
//     temp.className = "card-temp";
//     temp.textContent = "Temp";

//     // Beskrivning
//     const description = document.createElement("p");
//     description.className = "card-description";
//     description.textContent = "Weather";

//     // Pagination
//     const pagination = document.createElement("nav");
//     pagination.id = "pagination-dots";

//     /* pagination.innerHTML = `
//     <button><i class="fa-solid fa-circle"></i></button>
//     `; */

//     // Remove-knapp
//     const removeNav = document.createElement("nav");
//     removeNav.id = "card-remove";

//     removeNav.innerHTML = `
//     <button><i class="fa-solid fa-x"></i></button>
//     `;

//     // Lägg allt i section
//     section.append(
//     date,
//     time,
//     city,
//     icon,
//     temp,
//     description,
//     pagination,
//     removeNav
//     );

//     // Lägg section i cards-container
//     cardsContainer.appendChild(section);

//     console.log("Huvudkort skapat");

// }

{/* <div id="nav-container">

    <nav id="nav-bar">
        <input type="text" id="cityInput" placeholder="Sök efter stad...">
        <button id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
    </nav>

</div> */}

export function initNavBar(){
    console.log("NavBar loading in...");

    // Hämta main-container
    const mainContainer = document.getElementById("main-container");

    // Skapa <!-- <div id="nav-container"></div> -->
    const nContainer = document.createElement("div");
    nContainer.id = "nav-container";
    mainContainer.appendChild(nContainer);

    const navContainer = document.getElementById("nav-container");

    const navBar = document.createElement("nav");
    navBar.id = "nav-bar";
    navContainer.appendChild(navBar);

    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.id = "cityInput";
    searchBar.placeholder = "Sök efter stad...";
    navBar.appendChild(searchBar);

    const searchBtn = document.createElement("button");
    searchBtn.id = "searchBtn";
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    navBar.appendChild(searchBtn);

    console.log("NavBar initialized");

}