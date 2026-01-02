import { jest } from "@jest/globals";  // <-- VIKTIGT! Lägg till denna rad högst upp
import { getWeatherForCity } from "../js/weatherData.js";

describe("weatherData.js - getWeatherForCity", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("hämtar väderdata korrekt för en giltig stad", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          results: [
            {
              name: "Stockholm",
              latitude: 59.33,
              longitude: 18.06,
              country: "Sweden",
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({
          current_weather: {
            temperature: 5.2,
            weathercode: 3,
            time: "2026-01-02T12:00",
          },
        }),
      });

    const result = await getWeatherForCity("Stockholm");

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toContain("geocoding-api.open-meteo.com");
    expect(global.fetch.mock.calls[1][0]).toContain("api.open-meteo.com");

    expect(result).toMatchObject({
      city: expect.objectContaining({
        name: "Stockholm",
        latitude: 59.33,
        longitude: 18.06,
      }),
      weather: {
        temperature: 5.2,
        description: "Mulet",
        weathercode: 3,
        time: "2026-01-02T12:00",
      },
    });
  });

  it("returnerar null om staden inte hittas", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ results: [] }),
    });

    const result = await getWeatherForCity("Okändstad123");

    expect(result).toBeNull();
  });

  it("hanterar nätverksfel och returnerar null", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Nätverksfel"));

    const result = await getWeatherForCity("Stockholm");

    expect(result).toBeNull();
  });
});