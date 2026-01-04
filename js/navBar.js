/**
 * Skapar och lägger till navigationsfältet med sökinput och sökknapp.
 * Fältet placeras i #nav-container som skapas i main-container.
 */
export function initNavBar() {
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
