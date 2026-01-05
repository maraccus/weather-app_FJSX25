/**
 * Skapar och lägger till navigationsfältet med sökinput och sökknapp.
 * Fältet placeras i #nav-container som skapas i main-container.
 * Inkluderar WCAG-tillgänglighet med labels och ARIA-attribut.
 */
export function initNavBar() {
  // Hämta main-container
  const mainContainer = document.getElementById("main-container");

  // Skapa nav-container
  const nContainer = document.createElement("div");
  nContainer.id = "nav-container";
  mainContainer.appendChild(nContainer);

  const navContainer = document.getElementById("nav-container");

  const navBar = document.createElement("nav");
  navBar.id = "nav-bar";
  navBar.setAttribute("aria-label", "Väder sökning");
  navContainer.appendChild(navBar);

  // Skapa label för input
  const label = document.createElement("label");
  label.setAttribute("for", "cityInput");
  label.className = "sr-only";
  label.textContent = "Sök efter stad";
  navBar.appendChild(label);

  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.id = "cityInput";
  searchBar.placeholder = "Sök efter stad...";
  searchBar.setAttribute("aria-label", "Stadsnamn");
  searchBar.setAttribute("autocomplete", "off");
  navBar.appendChild(searchBar);

  const searchBtn = document.createElement("button");
  searchBtn.id = "searchBtn";
  searchBtn.setAttribute("type", "button");
  searchBtn.setAttribute("aria-label", "Sök efter väder");
  searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>`;
  navBar.appendChild(searchBtn);
}
