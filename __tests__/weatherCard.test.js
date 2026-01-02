import { addCity } from "../js/addCity.js";

describe("addCity – pagination och kortbyte", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav id="pagination-dots"></nav>
      <p class="card-date"></p>
      <p class="card-time"></p>
      <h2 class="card-city">City</h2>
      <h3 class="card-temp">Temp</h3>
      <p class="card-description">Weather</p>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("skapar en pagination-dot och uppdaterar kortet vid klick", () => {
    const city = new addCity("Göteborg", "Regn", 7, "2026-01-02T14:00");

    // Kolla att dot skapades
    const dotButton = document.querySelector("#pagination-dots button");
    expect(dotButton).toBeTruthy();

    // Simulera klick
    dotButton.click();

    // Efter fade (200ms + lite marginal)
    setTimeout(() => {
      expect(document.querySelector(".card-city").textContent).toBe("Göteborg");
      expect(document.querySelector(".card-temp").textContent).toBe("7°C");
      expect(document.querySelector(".card-weather").textContent).toBe("Regn");
      expect(document.querySelector(".card-time").textContent).toBe("14:00");
      // formatDate ger t.ex. "fredag 2 januari" – vi kollar bara att det ändrats
      expect(document.querySelector(".card-date").textContent).not.toBe("Day, Date");
    }, 300);
  });

  it("markerar aktiv dot korrekt", () => {
    new addCity("Stockholm", "Molnigt", 5, "2026-01-02");
    const secondCity = new addCity("Malmö", "Klart", 10, "2026-01-02");

    const dots = document.querySelectorAll("#pagination-dots button i");
    expect(dots.length).toBe(2);

    // Den sista ska vara aktiv
    expect(dots[1].classList.contains("fa-solid")).toBe(true);
    expect(dots[0].classList.contains("fa-regular")).toBe(true);
  });
});