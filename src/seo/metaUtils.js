/**
 * Title and description formatting for SERP / social snippets.
 */

const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 160;

export function formatTitle(title, max = TITLE_MAX) {
  const clean = String(title ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return '';
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function formatDescription(text, min = DESC_MIN, max = DESC_MAX) {
  let clean = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return '';

  if (clean.length > max) {
    return `${clean.slice(0, max - 1).trim()}…`;
  }

  if (clean.length < min) {
    const pad =
      ' Connect with iFranchise for franchise consulting, investment opportunities, and expansion support across India.';
    const combined = `${clean}${pad}`;
    if (combined.length <= max) return combined;
    return `${combined.slice(0, max - 1).trim()}…`;
  }

  return clean;
}

/**
 * Normalize a static or dynamic SEO entry before it hits the document head.
 * @param {object} entry
 */
export function normalizeSeoEntry(entry) {
  if (!entry) return entry;
  return {
    ...entry,
    title: formatTitle(entry.title),
    description: formatDescription(entry.description),
    ogTitle: entry.ogTitle ? formatTitle(entry.ogTitle) : undefined,
    ogDescription: entry.ogDescription ? formatDescription(entry.ogDescription) : undefined,
  };
}
