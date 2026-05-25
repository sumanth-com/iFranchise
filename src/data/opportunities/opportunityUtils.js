import { getFranchiseCategoryImage } from '../sectionImages.js';

/** Approximate INR → USD for filter bucket overlap (navbar uses USD ranges). */
export const INR_PER_USD = 83;

const LAKH = 100_000;
const CRORE = 10_000_000;

const INDIAN_CITY_ALIASES = {
  bang: 'Bengaluru',
  bangalore: 'Bengaluru',
  bengaluru: 'Bengaluru',
  chen: 'Chennai',
  chennai: 'Chennai',
  hyd: 'Hyderabad',
  hyderabad: 'Hyderabad',
  mub: 'Mumbai',
  mumbai: 'Mumbai',
  ko: 'Kolkata',
  kolkata: 'Kolkata',
  delhi: 'Delhi NCR',
  ncr: 'Delhi NCR',
  pune: 'Pune',
  ahmedabad: 'Ahmedabad',
  surat: 'Surat',
  jaipur: 'Jaipur',
  lucknow: 'Lucknow',
  indore: 'Indore',
  chandigarh: 'Chandigarh',
  kochi: 'Kochi',
  goa: 'Goa',
  guwahati: 'Guwahati',
};

export function slugifyBrand(name = '') {
  return name
    .toLowerCase()
    .replace(/\(2\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function cleanText(value) {
  if (value == null || value === false) return '';
  return String(value)
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeCategory(raw = '') {
  const c = cleanText(raw).toLowerCase();
  if (!c) return 'Food & Beverage';
  if (c.includes('retail') || c.includes('apparel') || c.includes('fashion') || c.includes('lifestyle')) {
    return 'Retail';
  }
  if (
    c.includes('f&b') ||
    c.includes('f & b') ||
    c.includes('qsr') ||
    c.includes('burger') ||
    c.includes('pizza') ||
    c.includes('food') ||
    c.includes('restaurant') ||
    c.includes('café') ||
    c.includes('cafe')
  ) {
    return 'Food & Beverage';
  }
  if (c.includes('pub') || c.includes('nightlife') || c.includes('hospitality')) {
    return 'Entertainment';
  }
  if (c.includes('wellness') || c.includes('health') || c.includes('gym')) {
    return 'Health & Wellness';
  }
  if (c.includes('edu')) return 'Education';
  if (c.includes('tech')) return 'Technology';
  if (c.includes('home')) return 'Home Services';
  return 'Food & Beverage';
}

export function parseModels(raw = '') {
  const text = cleanText(raw).toUpperCase();
  const found = new Set();
  if (/FOFO|FRANCHISE\s+OWNED.*FRANCHISE\s+OPERATED|UNIT\s+FRANCHISE/.test(text)) found.add('FOFO');
  if (/FICO|HYBRID/.test(text)) found.add('FICO');
  if (/FOCO|FOCO\s+MODEL/.test(text)) found.add('FOCO');
  if (/COFO/.test(text)) found.add('COFO');
  if (/COCO/.test(text)) found.add('COCO');
  if (/FIFO/.test(text)) found.add('FIFO');
  if (!found.size) found.add('FOFO');
  return [...found];
}

export function primaryModel(models) {
  const order = ['FOFO', 'FICO', 'FOCO', 'COFO', 'COCO', 'FIFO'];
  return order.find((m) => models.includes(m)) || models[0] || 'FOFO';
}

/**
 * Extract rupee amounts from free-text investment fields.
 * @returns {{ amountsInr: number[], minInr: number|null, maxInr: number|null }}
 */
export function parseInvestmentAmounts(...parts) {
  const amountsInr = [];
  const combined = parts.filter(Boolean).join(' ');

  const lakhCrRegex =
    /(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:l(?:akhs?)?|lac)\b|(\d+(?:\.\d+)?)\s*(?:crore|cr)\b/gi;

  let match;
  while ((match = lakhCrRegex.exec(combined)) !== null) {
    if (match[1]) amountsInr.push(parseFloat(match[1]) * LAKH);
    if (match[2]) amountsInr.push(parseFloat(match[2]) * CRORE);
  }

  // Bare "75L" / "80L" patterns
  const shortLakh = /(\d+(?:\.\d+)?)\s*l\b/gi;
  while ((match = shortLakh.exec(combined)) !== null) {
    amountsInr.push(parseFloat(match[1]) * LAKH);
  }

  // "5 Cr" with space
  const shortCr = /(\d+(?:\.\d+)?)\s*(?:crore|cr)\b/gi;
  while ((match = shortCr.exec(combined)) !== null) {
    if (!match[0].toLowerCase().includes('channel')) {
      amountsInr.push(parseFloat(match[1]) * CRORE);
    }
  }

  const unique = [...new Set(amountsInr.filter((n) => Number.isFinite(n) && n > 0))].sort((a, b) => a - b);
  if (!unique.length) return { amountsInr: [], minInr: null, maxInr: null };

  const hasPlus = /\+|onwards|\+/i.test(combined);
  return {
    amountsInr: unique,
    minInr: unique[0],
    maxInr: hasPlus && unique.length === 1 ? unique[0] * 1.5 : unique[unique.length - 1],
  };
}

export function formatInrRange(minInr, maxInr) {
  const fmt = (n) => {
    if (n >= CRORE) {
      const cr = n / CRORE;
      const val = cr % 1 === 0 ? String(Math.round(cr)) : cr.toFixed(1).replace(/\.0$/, '');
      return `₹${val} Crores`;
    }
    const lakhs = n / LAKH;
    if (lakhs >= 100) {
      const cr = n / CRORE;
      const val = cr % 1 === 0 ? String(Math.round(cr)) : cr.toFixed(1).replace(/\.0$/, '');
      return `₹${val} Crores`;
    }
    const val = lakhs % 1 === 0 ? String(lakhs) : lakhs.toFixed(1).replace(/\.0$/, '');
    return `₹${val} Lakhs`;
  };
  if (minInr == null && maxInr == null) return 'On request';
  if (minInr != null && maxInr != null && Math.abs(minInr - maxInr) > LAKH) {
    return `${fmt(minInr)} to ${fmt(maxInr)}`;
  }
  const base = minInr ?? maxInr;
  return `${fmt(base)}+`;
}

export function inrToUsdFilterAmount(inr) {
  return Math.round(inr / INR_PER_USD);
}

/** Display amounts with full Lakhs / Crores (no "L" or "Cr" shorthand). */
export function formatIndianCurrencyText(text = '') {
  if (!text) return '';
  return String(text)
    .split('\n')
    .map((line) => {
      let s = line;
      s = s.replace(/₹?\s*(\d+(?:\.\d+)?)\s*(?:crore|cr)\b/gi, '₹$1 Crores');
      s = s.replace(/(\d+(?:\.\d+)?)\s*(?:crore|cr)\b/gi, '$1 Crores');
      s = s.replace(/₹?\s*(\d+(?:\.\d+)?)\s*l\b(?![a-z])/gi, '₹$1 Lakhs');
      s = s.replace(/(\d+(?:\.\d+)?)\s*l\b(?![a-z])/gi, '$1 Lakhs');
      s = s.replace(/\b₹(\d+(?:\.\d+)?)\s+Lakhs\b/gi, '₹$1 Lakhs');
      return s.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean)
    .join('\n');
}

/** Normalize space values to use Sq.ft consistently. */
export function formatSpaceSqFt(text = '') {
  if (!text) return '';
  return String(text)
    .split('\n')
    .map((line) => {
      let l = cleanText(line);
      if (!l) return '';
      l = l.replace(/\bsq\.?\s*ft\.?\b/gi, 'Sq.ft');
      if (/\d/.test(l) && !/sq\.ft/i.test(l)) {
        l = l.replace(/(\d[\d,]*)\s*(-)?\s*$/, (_, num, dash) =>
          dash ? `${num} Sq.ft -` : `${num} Sq.ft`
        );
      }
      return l;
    })
    .filter(Boolean)
    .join('\n');
}

export function parseRoiPercent(raw) {
  const text = cleanText(raw);
  if (!text) return null;
  const pct = text.match(/(\d+(?:\.\d+)?)\s*%/);
  if (pct) return Math.round(parseFloat(pct[1]));
  const num = parseFloat(text);
  if (!Number.isFinite(num)) return null;
  if (num > 0 && num <= 1) return Math.round(num * 100);
  if (num > 1 && num <= 100) return Math.round(num);
  return null;
}

export function parsePaybackMonths(raw) {
  const text = cleanText(raw).toLowerCase();
  if (!text) return null;
  if (text.includes('year')) {
    const years = text.match(/(\d+(?:\.\d+)?)\s*(?: to |-|to)?\s*(\d+(?:\.\d+)?)?\s*year/);
    if (years) {
      const low = parseFloat(years[1]) * 12;
      const high = years[2] ? parseFloat(years[2]) * 12 : low;
      return Math.round((low + high) / 2);
    }
  }
  const months = text.match(/(\d+)\s*(?: to |-|to)\s*(\d+)?\s*month/);
  if (months) {
    const low = parseInt(months[1], 10);
    const high = months[2] ? parseInt(months[2], 10) : low;
    return Math.round((low + high) / 2);
  }
  const single = text.match(/(\d+)\s*month/);
  if (single) return parseInt(single[1], 10);
  return null;
}

export function extractCities(...texts) {
  const cities = new Set();
  const combined = texts.filter(Boolean).join(' ').toLowerCase();

  Object.entries(INDIAN_CITY_ALIASES).forEach(([alias, canonical]) => {
    const re = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (re.test(combined)) cities.add(canonical);
  });

  const metroList =
    /mumbai|delhi|bengaluru|bangalore|hyderabad|chennai|pune|kolkata|ahmedabad|jaipur|lucknow|surat|indore|chandigarh|goa|kochi|tier\s*1|tier\s*2|pan\s*india/gi;
  let m;
  while ((m = metroList.exec(combined)) !== null) {
    const token = m[0].toLowerCase();
    if (token.includes('tier 1')) {
      ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'].forEach((c) =>
        cities.add(c)
      );
    } else if (token.includes('tier 2')) {
      ['Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Ahmedabad'].forEach((c) => cities.add(c));
    } else if (token.includes('pan india')) {
      ['Pan India'].forEach((c) => cities.add(c));
    } else {
      const mapped = INDIAN_CITY_ALIASES[token] || token.charAt(0).toUpperCase() + token.slice(1);
      cities.add(mapped);
    }
  }

  return [...cities];
}

export function deriveLocationsLabel(targetAreas, locationType, cities) {
  const target = cleanText(targetAreas);
  if (/pan\s*india/i.test(target)) return 'Pan India';
  if (target) return target.length > 48 ? `${target.slice(0, 45)}…` : target;
  if (cities.length) return cities.slice(0, 3).join(', ');
  const loc = cleanText(locationType);
  if (loc) return loc.length > 48 ? `${loc.slice(0, 45)}…` : loc;
  return 'India';
}

export function deriveBadge({ roi, paybackMonths, totalOutlets, targetAreas }) {
  const outletNum = parseInt(String(totalOutlets).replace(/\D/g, ''), 10) || 0;
  if (outletNum >= 100 || /150\+|100\+/i.test(totalOutlets)) return 'POPULAR';
  if (roi != null && roi >= 30) return 'HIGH ROI';
  if (paybackMonths != null && paybackMonths <= 18) return 'HOT MARKET';
  if (/pan\s*india/i.test(targetAreas)) return 'HOT MARKET';
  if (/growing/i.test(totalOutlets) || (outletNum > 0 && outletNum < 25)) return 'GROWING';
  return 'FEATURED';
}

export function categoryImage(industry) {
  return getFranchiseCategoryImage(industry);
}

export function splitParagraphs(text, max = 4) {
  const cleaned = cleanText(text);
  if (!cleaned) return [];
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length <= max) return sentences;
  const chunk = Math.ceil(sentences.length / max);
  const out = [];
  for (let i = 0; i < sentences.length; i += chunk) {
    out.push(sentences.slice(i, i + chunk).join(' '));
  }
  return out.slice(0, max);
}

export function isPlaceholder(value) {
  const v = cleanText(value);
  return !v || /^-+$/.test(v.replace(/\s/g, '')) || v === '--';
}
