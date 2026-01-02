/**
 * Enkel wrapper-klass för fetch-anrop med grundläggande felhantering.
 */
export class ApiService {
  /**
     * @param {string} url - Fullständig URL till API-endpoint
     */
  constructor(url) {
    this.url = url;
  }

  /**
     * Utför fetch-anrop och returnerar JSON-data.
     *
     * @returns {Promise<Object>} Parsad JSON-respons
     * @throws {Error} Vid icke-OK status eller nätverksfel
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
