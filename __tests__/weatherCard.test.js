import { WeatherCard } from "../js/weatherCard.js";

describe("WeatherCard", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "cards-container";
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("skapar ett väderkort med rätt innehåll", () => {
    const city = { name: "Stockholm" };
    const weather = {
      temperature: 8.7,
      description: "Molnigt",
    };

    new WeatherCard(city, weather);

    const card = container.querySelector(".weather-card");
    expect(card).toBeTruthy();

    expect(card.querySelector(".weather-city").textContent).toBe("Stockholm");
    expect(card.querySelector(".weather-degrees").textContent).toBe("9"); // avrundat
    expect(card.querySelector(".weather-description").textContent).toBe(
      "Molnigt"
    );
  });

  it("kan tas bort med remove()-metoden", (done) => {
    const cardInstance = new WeatherCard(
      { name: "Teststad" },
      { temperature: 10 }
    );

    cardInstance.remove();

    // Vänta på animationen (300ms + lite marginal)
    setTimeout(() => {
      expect(container.querySelector(".weather-card")).toBeNull();
      done();
    }, 500);
  });
});
