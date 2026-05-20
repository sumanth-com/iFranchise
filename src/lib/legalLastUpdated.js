/** Long-form date for legal pages (e.g. "May 20, 2026") — always reflects the current calendar day. */
const LEGAL_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

export function getLegalLastUpdatedLabel(date = new Date()) {
  return LEGAL_DATE_FORMAT.format(date);
}
