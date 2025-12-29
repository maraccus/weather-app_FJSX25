import { allCities, loadCities, findCityByName } from "../js/weatherData.js";
import { jest } from "@jest/globals";

// Mocka global fetch direkt – detta fångar alla fetch-anrop i testen
global.fetch = jest.fn();

describe("weatherData.js", () => {
  // Rensa allCities och fetch-mocken innan varje test
  beforeEach(() => {
    allCities.length = 0;
    fetch.mockClear();
  });

  it("findCityByName hittar stad oavsett versaler/gemener", () => {
    allCities.push(
      { name: "Stockholm", latitude: 59.33, longitude: 18.06 },
      { name: "Göteborg", latitude: 57.71, longitude: 11.97 }
    );

    expect(findCityByName("stockholm")).toEqual({
      name: "Stockholm",
      latitude: 59.33,
      longitude: 18.06,
    });

    expect(findCityByName("GÖTEBORG")).toEqual({
      name: "Göteborg",
      latitude: 57.71,
      longitude: 11.97,
    });

    expect(findCityByName("Malmö")).toBeUndefined();
    expect(findCityByName("")).toBeUndefined();
    expect(findCityByName(" ")).toBeUndefined();
  });

  it("loadCities hämtar och lagrar städer", async () => {
    const mockCities = [
      { name: "Uppsala", latitude: 60.13, longitude: 17.63 },
      { name: "Linköping", latitude: 58.41, longitude: 15.62 },
    ];

    // Mocka fetch så att det returnerar vår mockdata
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCities),
    });

    await loadCities();

    // Kontrollera att fetch anropades med rätt URL
    expect(fetch).toHaveBeenCalledWith(
      "http://kontoret.onvo.se:10480/GetCities"
    );

    // Kontrollera att städerna lagrades
    expect(allCities).toEqual(mockCities);
  });
});
