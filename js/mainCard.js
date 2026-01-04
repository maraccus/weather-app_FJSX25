/**
 * Skapar och lägger till huvudväderkortet i DOM:en.
 * Bygger upp alla element (datum, tid, stad, ikon, temperatur, beskrivning, pagination och remove-knapp)
 * och placerar dem i #cards-container.
 */
export function initMainCard() {
  // Skapa main-container
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";
  document.body.appendChild(mainContainer);

  // Skapa <!-- <div id="cards-container"></div> -->
  const cContainer = document.createElement("div");
  cContainer.id = "cards-container";

  // Skapa section
  const section = document.createElement("section");
  section.classList.add("card"); // Bakgrund sätts här

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
  icon.src = "assets/images/snow.png";
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

  // Favorites knapp
  const favoriteNav = document.createElement("nav");
  favoriteNav.id = "card-favorite";
  favoriteNav.innerHTML = `
    <button class="favorite-btn" aria-label="Lägg till favorit"><i class="fa-regular fa-star"></i></button>
    `;

  // Remove-knapp
  const removeNav = document.createElement("nav");
  removeNav.id = "card-remove";
  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("aria-label", "Ta bort stad");
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-x");
  removeBtn.appendChild(removeIcon);
  removeNav.appendChild(removeBtn);

  // Lägg allt i section
  section.append(
    date,
    time,
    city,
    icon,
    temp,
    description,
    pagination,
    favoriteNav,
    removeNav
  );

  // Lägg section i cards-container
  cContainer.appendChild(section);
  mainContainer.appendChild(cContainer);

  console.log("Huvudkort skapat");
}
