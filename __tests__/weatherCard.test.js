import { addCity } from "../js/addCity.js";
import { jest } from "@jest/globals";  // <-- VIKTIGT: Importera jest här för ESM!

describe("addCity – pagination och kortbyte", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cards-container">
        <section class="card">
          <p class="card-date">Day, Date</p>
          <p class="card-time"></p>
          <h2 class="card-city">City</h2>
          <img class="card-icon" src="" alt="">
          <h3 class="card-temp">Temp</h3>
          <p class="card-description">Weather</p>
          <nav id="pagination-dots"></nav>
          <nav id="card-favorite">
            <button class="favorite-btn" aria-label="Lägg till favorit">
              <i class="fa-regular fa-star"></i>
            </button>
          </nav>
          <nav id="card-remove">
            <button aria-label="Ta bort stad">
              <i class="fa-solid fa-x"></i>
            </button>
          </nav>
        </section>
      </div>
    `;

    // Mocka localStorage manuellt (utan jest.fn() om du vill, men det funkar nu med importen)
    const store = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value; },
        removeItem: (key) => { delete store[key]; },
        clear: () => { Object.keys(store).forEach(key => delete store[key]); },
      },
      writable: true,
    });
  });

  it("skapar en pagination-dot och uppdaterar kortet vid klick", async () => {
    const city = new addCity("Göteborg", "Regn", 7, "2026-01-02T14:00", 61);

    const dotButton = document.querySelector("#pagination-dots button");
    expect(dotButton).toBeTruthy();

    dotButton.click();

    // Vänta på fade-effekten (200ms + marginal)
    await new Promise(resolve => setTimeout(resolve, 300));

    expect(document.querySelector(".card-city").textContent).toBe("Göteborg");
    expect(document.querySelector(".card-temp").textContent).toBe("7°C");
    expect(document.querySelector(".card-description").textContent).toBe("Regn");
    expect(document.querySelector(".card-time").textContent).toBe("14:00");
    expect(document.querySelector(".card-date").textContent).not.toBe("Day, Date");

    // Bonus: Kolla att rätt väderklass lagts till på .card
    const card = document.querySelector(".card");
    expect(card.classList.contains("weather-rain")).toBe(true);
  });

  it("markerar aktiv dot korrekt", async () => {
    new addCity("Stockholm", "Molnigt", 5, "2026-01-02T12:00", 3);
    new addCity("Malmö", "Klart", 10, "2026-01-02T12:00", 0);

    await new Promise(resolve => setTimeout(resolve, 300));

    const dots = document.querySelectorAll("#pagination-dots button i");
    expect(dots.length).toBe(2);

    expect(dots[1].classList.contains("fa-solid")).toBe(true);
    expect(dots[0].classList.contains("fa-regular")).toBe(true);
  });
});