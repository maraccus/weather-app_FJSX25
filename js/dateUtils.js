export function formatDate(isoOrDate, locale = 'sv-SE') {
  if (!isoOrDate) return '';
  const d = new Date(isoOrDate);
  if (isNaN(d)) return '';
  return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
}

export function formatTime(isoOrDate, locale = 'sv-SE') {
  if (!isoOrDate) return '';
  const d = new Date(isoOrDate);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}
