export function initPopup() {
  const popUp = document.createElement("div");
  popUp.id = "warning-popup";
  popUp.classList.add("popup");
  document.body.appendChild(popUp);

  const testBtn = document.getElementById("poptest");
  if (testBtn) {
    testBtn.addEventListener("click", () => {
      showPopup("Detta är ett testmeddelande!");
    });
  }
}

export function showPopup(popuptext) {
  const popup = document.getElementById("warning-popup");
  popup.innerHTML = "<i class=\"fa-solid fa-triangle-exclamation\"></i> " + popuptext;

  // Add the show class
  popup.classList.add("show");

  // Remove after set time
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}