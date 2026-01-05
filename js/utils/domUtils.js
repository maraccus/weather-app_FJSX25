/**
 * Lägger till fade-in-effekt på ett element.
 *
 * @param {HTMLElement} element - Elementet som ska få fade-in-effekt
 * @param {number} [delay=0] - Fördröjning innan animationen börjar (ms)
 */
export function addFadeIn(element, delay = 0) {
  if (!element) return;
  setTimeout(() => {
    element.classList.add("fade-in");
  }, delay);
}

/**
 * Fade out och in-effekt för uppdatering av kortinnehål med smooth transition.
 *
 * @param {HTMLElement[]} elements - Array av element som ska uppdateras
 * @param {Function} updateFn - Callback-funktion som uppdaterar innehål
 * @param {number} [duration=200] - Varaktighet av fade-effekten (ms)
 * @returns {Promise<void>}
 */
export async function fadeOutInUpdate(elements, updateFn, duration = 200) {
  return new Promise((resolve) => {
    elements.forEach((el) => {
      if (el) el.style.opacity = 0;
    });

    setTimeout(() => {
      updateFn();
      elements.forEach((el) => {
        if (el) el.style.opacity = 1;
      });
      resolve();
    }, duration);
  });
}

/**
 * Väntar ett visst antal millisekunder.
 *
 * @param {number} ms - Millisekunder att vänta
 * @returns {Promise<void>}
 */
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hämtar ett element och loggar varning om det inte hittas.
 *
 * @param {string} selector - CSS-selektor
 * @param {string} [context="document"] - Kontextsträng för loggning
 * @returns {HTMLElement|null}
 */
export function getElement(selector, context = "document") {
  const el = document.querySelector(selector);
  if (!el) {
    console.warn(`Element "${selector}" not found in ${context}`);
  }
  return el;
}

/**
 * Hämtar alla element matchande en selektor.
 *
 * @param {string} selector - CSS-selektor
 * @returns {NodeList}
 */
export function getElements(selector) {
  return document.querySelectorAll(selector);
}
