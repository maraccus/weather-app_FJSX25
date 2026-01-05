/**
 * Skapar popup-elementet för varningsmeddelanden och lägger till det i DOM:en.
 */
export function initPopup() {
  const popUp = document.createElement("div");
  popUp.id = "warning-popup";
  popUp.classList.add("popup");
  popUp.setAttribute("role", "alert");
  popUp.setAttribute("aria-live", "assertive");
  document.body.appendChild(popUp);
}

/**
 * Visar ett varningsmeddelande i popupen under 2 sekunder.
 *
 * @param {string} popuptext - Textmeddelandet som ska visas
 */
export function showPopup(popuptext) {
  const popup = document.getElementById("warning-popup");
  popup.innerHTML =
    '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ' + popuptext;

  // Add the show class
  popup.classList.add("show");

  // Remove after set time
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}
