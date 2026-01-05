/**
 * Skapar och lägger till huvudväderkortet i DOM:en.
 * Bygger upp alla element (datum, tid, stad, ikon, temperatur, beskrivning, pagination och remove-knapp)
 * och placerar dem i #cards-container med WCAG-tillgänglighet.
 */
export function initMainCard() {
  // Skapa main-container
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";
  document.body.appendChild(mainContainer);

  // Skapa cards-container
  const cContainer = document.createElement("div");
  cContainer.id = "cards-container";

  // Skapa section (main landmark för väderinfo)
  const section = document.createElement("section");
  section.classList.add("card");
  section.setAttribute("aria-label", "Aktuell väderinformation");

  // Datum
  const date = document.createElement("p");
  date.className = "card-date";
  date.textContent = "Day, Date";
  date.setAttribute("aria-live", "polite");

  // Tid
  const time = document.createElement("p");
  time.className = "card-time";
  time.textContent = "";
  time.setAttribute("aria-live", "polite");

  // Stad (heading för bättre semantik)
  const city = document.createElement("h2");
  city.className = "card-city";
  city.textContent = "City";
  city.setAttribute("aria-live", "polite");

  // Ikon
  const icon = document.createElement("img");
  icon.className = "card-icon";
  icon.src = "assets/images/snow.png";
  icon.alt = "Väderikonen";
  icon.setAttribute("aria-hidden", "false");

  // Temperatur
  const temp = document.createElement("h3");
  temp.className = "card-temp";
  temp.textContent = "Temp";
  temp.setAttribute("aria-live", "polite");

  // Beskrivning
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = "Weather";
  description.setAttribute("aria-live", "polite");

  // Pagination (navigation landmark)
  const pagination = document.createElement("nav");
  pagination.id = "pagination-dots";
  pagination.setAttribute("aria-label", "Stadbyte");

  // Favorites knapp
  const favoriteNav = document.createElement("nav");
  favoriteNav.id = "card-favorite";
  favoriteNav.setAttribute("aria-label", "Favorithantering");
  favoriteNav.innerHTML = `
    <button class="favorite-btn" aria-label="Lägg till favorit" type="button">
      <i class="fa-regular fa-star" aria-hidden="true"></i>
    </button>
    `;

  // Remove-knapp
  const removeNav = document.createElement("nav");
  removeNav.id = "card-remove";
  removeNav.setAttribute("aria-label", "Stadsborttagning");
  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("aria-label", "Ta bort stad");
  removeBtn.setAttribute("type", "button");
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid", "fa-x");
  removeIcon.setAttribute("aria-hidden", "true");
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
}


