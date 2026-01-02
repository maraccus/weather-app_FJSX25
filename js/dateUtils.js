/**
 * Formaterar ett datum eller ISO-sträng till svenskt långformat.
 * Exempel: "torsdag 2 januari"
 *
 * @param {string|Date} isoOrDate - ISO-sträng eller Date-objekt
 * @param {string} [locale='sv-SE'] - Språkkod, default svenska
 * @returns {string} Formaterat datum med stor begynnelsebokstav. Returnerar tom sträng vid ogiltig input.
 */
export function formatDate(isoOrDate, locale = 'sv-SE') {
  if (!isoOrDate) return '';
  const d = new Date(isoOrDate);
  if (isNaN(d)) return '';
  const str = d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Formaterar ett datum eller ISO-sträng till svenskt klockslag.
 * Exempel: "14:30"
 *
 * @param {string|Date} isoOrDate - ISO-sträng eller Date-objekt
 * @param {string} [locale='sv-SE'] - Språkkod, default svenska
 * @returns {string} Formaterat klockslag (timme:minut). Returnerar tom sträng vid ogiltig input.
 */
export function formatTime(isoOrDate, locale = 'sv-SE') {
  if (!isoOrDate) return '';
  const d = new Date(isoOrDate);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}
