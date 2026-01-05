export function initNavBar() {
  console.log("NavBar loading in...");

  const mainContainer = document.getElementById("main-container");

  const nContainer = document.createElement("div");
  nContainer.id = "nav-container";
  mainContainer.appendChild(nContainer);

  const navContainer = document.getElementById("nav-container");

  const navBar = document.createElement("nav");
  navBar.id = "nav-bar";
  navBar.setAttribute("role", "search"); // Landmark för sökfunktion
  navBar.setAttribute("aria-label", "Sök efter stad"); // För VoiceOver
  navContainer.appendChild(navBar);

  const searchBar = document.createElement("input");
  searchBar.type = "search"; // Ändra till search för bättre semantik
  searchBar.id = "cityInput";
  searchBar.placeholder = "Sök efter stad...";
  searchBar.setAttribute("aria-required", "true"); // Indikerar obligatoriskt fält
  navBar.appendChild(searchBar);

  const searchBtn = document.createElement("button");
  searchBtn.id = "searchBtn";
  searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  searchBtn.setAttribute("aria-label", "Sök efter väder i angiven stad"); // För VoiceOver
  navBar.appendChild(searchBtn);

  console.log("NavBar initialized");
}
