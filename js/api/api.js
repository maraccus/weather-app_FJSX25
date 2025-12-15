/**
 * Service class for making API requests.
 */
export class ApiService {
  /**
   * Creates an instance of ApiService.
   * @param {string} url - The API endpoint URL to fetch data from.
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Fetches data from the configured API endpoint.
   * @async
   * @returns {Promise<Object>} A promise that resolves to the parsed JSON response.
   * @throws {Error} Throws an error if the fetch fails or the response is not ok.
   */
  async fetchData() {
    try {
      const res = await fetch(this.url);
      if (!res.ok) throw new Error("Kunde inte hämta data");
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
