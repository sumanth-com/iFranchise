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

export function formatBrandDisplayName(name, slug = '') {
  const key = slug?.toLowerCase?.() || '';
  if (key === 'original-burger-co') return 'Original Burger Co';
  if (key === 'fusion-pizza-big-burger') return 'Fusion Pizza & Big Burger Co';

  const cleaned = cleanText(name).replace(/\(2\)/i, '').trim();
  if (!cleaned) return '';

  return cleaned
    .split(/\s+/)
    .map((word) => {
      if (/^co\.?$/i.test(word)) return 'Co';
      if (/^\d+$/.test(word)) return word;
      if (word.length <= 2 && /^[A-Z.&]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

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

/**
 * Normalize outlet copy for cards/detail stats (e.g. "40+", "9+").
 * Sums city-wise breakdowns like "6 in bang, 2 in chen, 1 in hyd".
 */
export function formatOutletsDisplay(raw = '') {
  const text = cleanText(raw);
  if (!text) return '';

  if (/\d+\s+in\s+/i.test(text)) {
    const counts = [...text.matchAll(/(\d+)\s+in\s+/gi)].map((m) => parseInt(m[1], 10));
    if (counts.length) {
      const total = counts.reduce((sum, n) => sum + n, 0);
      return total > 0 ? `${total}+` : text;
    }
  }

  const compactPlus = text.match(/^(\d+)\s*\+/);
  if (compactPlus) return `${compactPlus[1]}+`;

  const embeddedPlus = text.match(/(\d+)\s*\+/);
  if (embeddedPlus) return `${embeddedPlus[1]}+`;

  const outletsWord = text.match(/^(\d+)\s+outlets?\b/i);
  if (outletsWord) return `${outletsWord[1]}+`;

  return text;
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

const MODEL_TOKENS = ['FOFO', 'FICO', 'FOCO', 'COFO', 'COCO', 'FIFO'];

function detectModels(text) {
  const found = new Set();
  if (/FOFO|FRANCHISE\s+OWNED.*FRANCHISE\s+OPERATED|UNIT\s+FRANCHISE/.test(text)) found.add('FOFO');
  if (/FICO|HYBRID/.test(text)) found.add('FICO');
  if (/FOCO|FOCO\s+MODEL/.test(text)) found.add('FOCO');
  if (/COFO/.test(text)) found.add('COFO');
  if (/COCO/.test(text)) found.add('COCO');
  if (/FIFO/.test(text)) found.add('FIFO');
  if (!found.size) found.add('FOFO');
  return found;
}

export function parseModels(raw = '') {
  const text = cleanText(raw).toUpperCase();
  const found = detectModels(text);
  const ordered = [];

  for (const segment of text.split(/[,/|]+|\band\b/gi)) {
    for (const model of MODEL_TOKENS) {
      if (segment.includes(model) && found.has(model) && !ordered.includes(model)) {
        ordered.push(model);
      }
    }
  }

  for (const model of MODEL_TOKENS) {
    if (found.has(model) && !ordered.includes(model)) ordered.push(model);
  }

  return ordered;
}

export function primaryModel(models) {
  const order = ['FOFO', 'FICO', 'FOCO', 'COFO', 'COCO', 'FIFO'];
  return order.find((m) => models.includes(m)) || models[0] || 'FOFO';
}

/** Card/detail primary model when brand supports multiple formats. */
const PRIMARY_MODEL_BY_SLUG = {
  'original-burger-co': 'FICO',
  'bigguys': 'FICO',
  'brand-avenue': 'FOFO',
};

export function resolvePrimaryModel(slug, models) {
  const override = PRIMARY_MODEL_BY_SLUG[slug?.toLowerCase?.()];
  if (override && models.includes(override)) return override;
  return primaryModel(models);
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
      s = s.replace(/₹?\s*(\d+(?:\.\d+)?)\s*lakh\b/gi, '₹$1 Lakhs');
      s = s.replace(/(\d+(?:\.\d+)?)\s*lakh\b/gi, '$1 Lakhs');
      s = s.replace(/₹?\s*(\d+(?:\.\d+)?)\s*l\b(?![a-z])/gi, '₹$1 Lakhs');
      s = s.replace(/(\d+(?:\.\d+)?)\s*l\b(?![a-z])/gi, '$1 Lakhs');
      s = s.replace(/\b₹(\d+(?:\.\d+)?)\s+Lakhs\b/gi, '₹$1 Lakhs');
      return s.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean)
    .join('\n');
}

function formatLakhShort(num) {
  const n = parseFloat(num);
  if (!Number.isFinite(n)) return '';
  return String(n % 1 === 0 ? Math.round(n) : n.toFixed(2).replace(/\.?0+$/, ''));
}

function formatPercentShort(value, suffix = '') {
  const n = parseFloat(value);
  if (!Number.isFinite(n)) return '';
  const label = n % 1 === 0 ? String(Math.round(n)) : n.toFixed(1);
  return suffix ? `${label}% ${suffix}` : `${label}%`;
}

/**
 * Short returns label for investment cards (full text kept for tooltip / about).
 */
export function formatReturnsDisplay(raw = '') {
  const text = cleanText(raw);
  if (!text || isPlaceholder(text)) return { display: 'On request', full: '' };

  const full = formatIndianCurrencyText(text);

  if (/break[- ]?even/i.test(text)) {
    const range = text.match(/(\d+)\s*[-–]\s*(\d+)\s*years?/i);
    if (range) return { display: `${range[1]}–${range[2]} yr`, full };
    return { display: 'Break-even', full };
  }

  if (/multi[- ]channel/i.test(text)) return { display: 'Multi-channel', full };

  const monthlyProfit = text.match(
    /(?:avg(?:age)?\s*)?monthly\s*profit[^₹\d]*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakhs?|lac)/i,
  );
  if (monthlyProfit) {
    return { display: `₹${formatLakhShort(monthlyProfit[1])}L per month`, full };
  }

  const revenueSharePct = text.match(
    /(\d+(?:\.\d+)?)\s*%\s*(?:revenue\s*share|rev\.?\s*share|margin(?:\s+of\s+the\s+sales)?|of\s*(?:sale|sales))/i,
  );
  const minGuaranteeInr = text.match(
    /(?:minimum\s*guarantee|min(?:imum)?\s*guarantee|mg\b)[^₹\d]*₹\s*([\d,]+(?:\.\d+)?)/i,
  );
  if (minGuaranteeInr && revenueSharePct && /whichever|higher/i.test(text)) {
    const inrNum = minGuaranteeInr[1].replace(/,/g, '');
    const pct = parseFloat(revenueSharePct[1]);
    const pctLabel = pct % 1 === 0 ? String(Math.round(pct)) : String(pct);
    const primary = `₹${Number(inrNum).toLocaleString('en-IN')} / Month`;
    return {
      display: `${primary} or ${pctLabel}% Revenue Share`,
      full,
      structured: {
        primary,
        connector: 'or',
        secondary: `${pctLabel}% Revenue Share`,
        footnote: '(Whichever Is Higher)',
      },
    };
  }

  const minGuaranteeLakh = text.match(
    /(?:min(?:imum)?\s*guarantee|min\s*guaran)[^₹\d]*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakhs?|lac)/i,
  );
  if (minGuaranteeLakh && revenueSharePct && /whichever|higher/i.test(text)) {
    const pct = parseFloat(revenueSharePct[1]);
    const pctLabel = pct % 1 === 0 ? String(Math.round(pct)) : String(pct);
    const lakhLabel = formatLakhShort(minGuaranteeLakh[1]);
    return {
      display: `₹${lakhLabel} Lakhs / Month or ${pctLabel}% Revenue Share`,
      full,
      structured: {
        primary: `₹${lakhLabel} Lakhs / Month`,
        connector: 'or',
        secondary: `${pctLabel}% Revenue Share`,
        footnote: '(Whichever Is Higher)',
      },
    };
  }

  const netRange = text.match(/net\s*profit\s*(\d+(?:\.\d+)?)\s*(?:to|-|–)\s*(\d+(?:\.\d+)?)\s*%/i);
  if (netRange) {
    return {
      display: `${Math.round(parseFloat(netRange[1]))}–${Math.round(parseFloat(netRange[2]))}% net`,
      full,
    };
  }

  const perAnnum = text.match(/(\d+(?:\.\d+)?)\s*%\s*(?:per\s*annum|p\.?\s*a\.?|annum)/i);
  if (perAnnum) {
    return { display: formatPercentShort(perAnnum[1], 'per year'), full };
  }

  const percents = [...text.matchAll(/(\d+(?:\.\d+)?)\s*%/gi)]
    .map((m) => parseFloat(m[1]))
    .filter((n) => n > 0 && n <= 100);
  const uniq = [...new Set(percents)].sort((a, b) => a - b);

  const minLakh = text.match(
    /(?:min(?:imum)?\s*guarantee|min\s*guaran)[^₹\d]*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakhs?|lac)/i,
  );

  if (uniq.length >= 2 && /whichever| or \d/i.test(text)) {
    const display = `${Math.round(uniq[0])}–${Math.round(uniq[uniq.length - 1])}%`;
    return { display, full };
  }

  const parts = [];
  if (uniq.length) {
    const main = uniq[uniq.length - 1];
    if (/margin/i.test(text)) parts.push(formatPercentShort(main, 'margin'));
    else if (/sales|sale/i.test(text)) parts.push(formatPercentShort(main, 'sales'));
    else if (/revenue|rev\b/i.test(text)) parts.push(formatPercentShort(main, 'rev'));
    else parts.push(formatPercentShort(main));
  }

  if (minLakh) parts.push(`₹${formatLakhShort(minLakh[1])}L min`);

  if (parts.length) {
    return { display: parts.slice(0, 2).join(' · '), full };
  }

  if (full.length <= 28) return { display: full, full };
  return { display: `${full.slice(0, 26)}…`, full };
}

/** Normalize space values to use Sq.ft consistently. */
export function formatSpaceSqFt(text = '') {
  if (!text) return '';
  return String(text)
    .split('\n')
    .map((line) => {
      let l = cleanText(line);
      if (!l) return '';
      l = l.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
      l = l.replace(/\bsq\.?\s*ft\.?\b/gi, 'Sq.ft');
      if (/\d/.test(l) && !/sq\.ft/i.test(l)) {
        l = l.replace(/(\d[\d,]*)\s*(-)?\s*$/, (_, num) => `${num} Sq.ft`);
      }
      // Drop orphaned trailing dash (e.g. "700 Sq.ft -" with no upper bound)
      l = l.replace(/(\d[\d,]*\s+Sq\.ft)\s*-\s*$/i, '$1');
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

/** Named cities only — no tier-1/tier-2 inference (used on listing cards). */
export function extractNamedCities(...texts) {
  const cities = new Set();
  const combined = texts.filter(Boolean).join(' ').toLowerCase();

  Object.entries(INDIAN_CITY_ALIASES).forEach(([alias, canonical]) => {
    const re = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (re.test(combined)) cities.add(canonical);
  });

  const cityList =
    /mumbai|delhi|bengaluru|bangalore|hyderabad|chennai|pune|kolkata|ahmedabad|jaipur|lucknow|surat|indore|chandigarh|goa|kochi|guwahati/gi;
  let m;
  while ((m = cityList.exec(combined)) !== null) {
    const token = m[0].toLowerCase();
    const mapped = INDIAN_CITY_ALIASES[token] || token.charAt(0).toUpperCase() + token.slice(1);
    cities.add(mapped);
  }

  return [...cities];
}

/** Named cities plus tier/pan-India expansion (used for search filters). */
export function extractCities(...texts) {
  const cities = new Set(extractNamedCities(...texts));
  const combined = texts.filter(Boolean).join(' ').toLowerCase();

  const tierPanList = /tier\s*1|tier\s*2|pan\s*india/gi;
  let m;
  while ((m = tierPanList.exec(combined)) !== null) {
    const token = m[0].toLowerCase();
    if (token.includes('tier 1')) {
      ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'].forEach((c) =>
        cities.add(c)
      );
    } else if (token.includes('tier 2')) {
      ['Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Ahmedabad'].forEach((c) => cities.add(c));
    } else if (token.includes('pan india')) {
      cities.add('Pan India');
    }
  }

  return [...cities];
}

export function deriveLocationsLabel(targetAreas, locationType, cities) {
  return formatExpansionHeroLabel({ cities, targetAreas, locationType });
}

function formatCityList(cities = []) {
  const list = [...new Set(cities.map((c) => cleanText(c)).filter(Boolean))];
  if (list.length === 1) return list[0];
  if (list.length <= 3) return list.join(' · ');
  return `${list.slice(0, 3).join(' · ')} · +${list.length - 3} cities`;
}

/** User-facing India label when data only has tier jargon, not named cities. */
function formatTierFallback(target = '') {
  const t = cleanText(target).toLowerCase();
  if (/pan\s*india/i.test(t)) return 'Pan India';
  if (/^all\s+cities$/i.test(t) || /cities?\s+across\s+india/i.test(t)) return 'Cities across India';
  if (/^india$/i.test(t)) return 'India';
  if (/tier\s*1/i.test(t) && /tier\s*2/i.test(t)) return 'Major cities across India';
  if (/tier\s*1/i.test(t)) return 'Metro cities in India';
  if (/tier\s*2/i.test(t)) return 'Growing cities in India';
  if (/tier\s*3/i.test(t)) return 'Cities across India';
  if (/metro/i.test(t)) return 'Metro cities in India';
  return 'Expansion across India';
}

function isTierOnlyToken(text = '') {
  const t = cleanText(text).toLowerCase();
  if (!t) return true;
  return (
    /^tier\s*(?:i{1,3}|\d+)\b/.test(t) ||
    /\btier\s*\d\b/.test(t) ||
    /cities?\s+across\s+india/i.test(t) ||
    /^pan\s*india/i.test(t) ||
    /^all\s+cities$/i.test(t) ||
    /^premium$/i.test(t) ||
    /^brew\s*house$/i.test(t)
  );
}

function stripTierJargonFromLocationType(text = '') {
  const cleaned = cleanText(text)
    .replace(/\btier\s*(?:i{1,3}|\d+)\s*cities?\b/gi, '')
    .replace(/\s*\/\s*/g, ' · ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/^(?:·\s*)+|(?:\s*·)+$/g, '');
  return cleaned;
}

/**
 * Short expansion line for detail hero (no trailing "+").
 */
export function formatExpansionHeroLabel({
  cities = [],
  locationsSummary = '',
  targetAreas = '',
  locationType = '',
} = {}) {
  const summary = cleanText(locationsSummary);
  if (summary && /\(\d+\s*places?\)/i.test(summary)) {
    return summary;
  }

  const target = cleanText(targetAreas);
  if (/pan\s*india/i.test(target) || cities.some((c) => /pan india/i.test(c))) return 'Pan India';

  const namedCities = cities
    .map((c) => cleanText(c))
    .filter((c) => c && !/pan india/i.test(c));
  if (namedCities.length) return formatCityList(namedCities);

  if (target) {
    if (/^all\s+cities$/i.test(target)) return 'Cities across India';
    if (/and other metro|other metro cities/i.test(target)) return 'Major metro cities in India';
    const parts = target
      .split(/[,;|]/)
      .map((p) => cleanText(p))
      .filter((p) => p && p.length < 48 && !/and other/i.test(p) && !isTierOnlyToken(p));
    if (parts.length > 3) {
      return `${parts.slice(0, 3).join(' · ')} · +${parts.length - 3} cities`;
    }
    if (parts.length) return parts.join(' · ');
    if (/tier/i.test(target)) return formatTierFallback(target);
    if (target.length <= 44) return target.replace(/,\s*/g, ' · ');
    return 'Multi-city expansion in India';
  }

  const loc = cleanText(locationType);
  if (loc) {
    const withoutTier = stripTierJargonFromLocationType(loc);
    if (withoutTier && withoutTier.length <= 44) return withoutTier;
    if (withoutTier) return 'Select markets in India';
    if (/tier/i.test(loc)) return formatTierFallback(loc);
    return loc.length > 44 ? 'Select markets in India' : loc;
  }

  return 'India';
}

/** Full expansion text for tooltip / locations tab. */
export function formatExpansionDetailLabel({
  cities = [],
  locationsSummary = '',
  targetAreas = '',
  locationType = '',
} = {}) {
  const summary = cleanText(locationsSummary);
  if (summary) return summary;
  const target = cleanText(targetAreas);
  if (target) return target.replace(/,\s*/g, ' · ');
  const list = [...new Set(cities.map((c) => cleanText(c)).filter(Boolean))];
  if (list.length) return list.join(' · ');
  return cleanText(locationType) || 'India';
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

/** Agreement term: duration only — strip calendar years e.g. "(2020)". */
export function formatAgreementTerm(raw) {
  const text = cleanText(raw);
  if (!text) return '';
  return text
    .split('\n')
    .map((line) => {
      let l = line.replace(/\s*\(\s*(?:19|20)\d{2}\s*\)/gi, '').trim();
      if (!l) return '';
      l = l.replace(/\bUF\b\s*-\s*/gi, 'Unit Franchise - ');
      l = l.replace(/\bMF\b\s*-\s*/gi, 'Master Franchise - ');
      l = l.replace(/(Unit Franchise\s*-\s*[^·\n]+?)\s+(Master Franchise\s*-\s*)/gi, '$1 · $2');
      return l.replace(/\s+/g, ' ').trim();
    })
    .filter(Boolean)
    .join(' · ');
}

export function isPlaceholder(value) {
  const v = cleanText(value);
  return !v || /^-+$/.test(v.replace(/\s/g, '')) || v === '--';
}
