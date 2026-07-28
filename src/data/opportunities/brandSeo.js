/**
 * Per-brand SEO overrides for franchise listing + detail pages.
 * Consumed by buildOpportunity.js → resolvePageSeo.js (PageSEO).
 */

/** @typedef {{ title: string, description: string, keywords?: string, ogTitle?: string, ogDescription?: string }} BrandSeoEntry */

/** @type {Record<string, BrandSeoEntry>} */
const BRAND_SEO_BY_SLUG = {
  odette: {
    title: 'Odette Franchise India | Investment & FICO Model | iFranchise',
    description:
      'Odette franchise in India from ₹45 Lakhs. Premium womens fashion and lifestyle retail — FICO model, 20% ROI, 45+ stores. Apply on iFranchise.',
    keywords:
      'odette franchise, odette franchise india, odette franchise cost, odette fashion franchise, women fashion franchise india, FICO franchise retail',
    ogTitle: 'Odette Franchise Opportunity | iFranchise',
    ogDescription:
      'Explore Odette franchise investment, FICO model, ROI, payback, and expansion across Tier 1 and Tier 2 cities in India.',
  },
  'original-burger-co': {
    title: 'Original Burger Co Franchise India | FICO & FOFO | iFranchise',
    description:
      'Original Burger Co franchise in India from ₹80 Lakhs. Gourmet burger QSR with FICO and FOFO models — 9+ outlets, metro expansion. Inquire on iFranchise.',
    keywords:
      'original burger co franchise, original burger co franchise india, original burger co franchise cost, burger franchise india, FICO burger franchise, FOFO QSR franchise',
    ogTitle: 'Original Burger Co Franchise | iFranchise',
    ogDescription:
      'Original Burger Co franchise investment, FICO and FOFO models, cities, ROI, and payback details on iFranchise.',
  },
  franco: {
    title: 'Franco Franchise India | Mens Fashion FICO Model | iFranchise',
    description:
      'Franco franchise in India from ₹45 Lakhs. Contemporary mens fashion retail — FICO model, malls and high streets, metro city expansion. Apply on iFranchise.',
    keywords:
      'franco franchise, franco franchise india, franco fashion franchise, mens fashion franchise india, FICO retail franchise, franco franchise cost',
    ogTitle: 'Franco Franchise Opportunity | iFranchise',
    ogDescription:
      'Franco mens fashion franchise investment, FICO model, minimum guarantee returns, and expansion cities on iFranchise.',
  },
  'biggies-burger': {
    title: 'Biggies Burger Franchise India | QSR FOFO Model | iFranchise',
    description:
      'Biggies Burger franchise in India from ₹15 Lakhs. Pioneer grilled burger QSR — 150+ outlets, pan-India FOFO model, multi-channel revenue. Apply on iFranchise.',
    keywords:
      'biggies burger franchise, biggies burger franchise india, biggies burger franchise cost, burger QSR franchise india, FOFO burger franchise, grilled burger franchise',
    ogTitle: 'Biggies Burger Franchise | iFranchise',
    ogDescription:
      'Biggies Burger franchise investment, FOFO model, 150+ outlets, payback, and pan-India expansion on iFranchise.',
  },
  bigguys: {
    title: 'BIGGUYS Franchise India | Fried Chicken FICO & FOFO | iFranchise',
    description:
      'BIGGUYS franchise in India from ₹25 Lakhs. Korean-style fried chicken QSR — FICO and FOFO models, 22+ outlets, Tier 1–3 cities. Inquire on iFranchise.',
    keywords:
      'bigguys franchise, bigguys franchise india, bigguys fried chicken franchise, fried chicken franchise india, FICO QSR franchise, bigguys franchise cost',
    ogTitle: 'BIGGUYS Franchise Opportunity | iFranchise',
    ogDescription:
      'BIGGUYS fried chicken franchise investment, FICO and FOFO models, payback, and city expansion on iFranchise.',
  },
  'brand-avenue': {
    title: 'Brand Avenue Franchise India | Multi-Brand Retail | iFranchise',
    description:
      'Brand Avenue franchise in India from ₹45 Lakhs. Multi-brand fashion retail (MBO) — FOFO and FICO models, 20+ stores, pan-India expansion. Apply on iFranchise.',
    keywords:
      'brand avenue franchise, brand avenue franchise india, multi brand outlet franchise, MBO franchise india, fashion retail franchise, brand avenue franchise cost',
    ogTitle: 'Brand Avenue Franchise | iFranchise',
    ogDescription:
      'Brand Avenue multi-brand fashion franchise investment, FOFO and FICO models, ROI, and expansion on iFranchise.',
  },
  'lassi-n-cafe': {
    title: 'Lassi N Cafe Franchise India | Low Investment QSR | iFranchise',
    description:
      'Lassi N Cafe franchise in India from ₹15 Lakhs. Youth cafe QSR — lassis, shakes, burgers, 30+ outlets, 6–12 month payback. Inquire on iFranchise.',
    keywords:
      'lassi n cafe franchise, lassi n cafe franchise india, lassi n cafe franchise cost, cafe franchise india, low investment food franchise, QSR franchise india',
    ogTitle: 'Lassi N Cafe Franchise | iFranchise',
    ogDescription:
      'Lassi N Cafe franchise investment, unit franchise model, average monthly profit, and pan-India expansion on iFranchise.',
  },
  'fusion-pizza-big-burger': {
    title: 'Fusion Pizza & Big Burger Franchise India | QSR | iFranchise',
    description:
      'Fusion Pizza and Big Burger franchise in India from ₹30 Lakhs. Dual-brand QSR — pizza and burger under one roof, FOFO model, 20+ stores. Apply on iFranchise.',
    keywords:
      'fusion pizza big burger franchise, fusion pizza franchise india, dual brand QSR franchise, pizza burger franchise india, FOFO food franchise, fusion franchise cost',
    ogTitle: 'Fusion Pizza & Big Burger Franchise | iFranchise',
    ogDescription:
      'Fusion Pizza and Big Burger dual-brand QSR franchise investment, FOFO model, sales, and payback on iFranchise.',
  },
  'kasturi-creations': {
    title: 'Kasturi Creations Franchise India | Ethnic Wear FICO | iFranchise',
    description:
      'Kasturi Creations franchise in India from ₹75 Lakhs onwards. Womens Indian ethnic wear — FICO model, 15+ stores, malls and high streets. Minimum guarantee returns. Apply on iFranchise.',
    keywords:
      'kasturi creations franchise, kasturi creations franchise india, kasturi franchise cost, ethnic wear franchise india, saree franchise india, FICO retail franchise',
    ogTitle: 'Kasturi Creations Franchise | iFranchise',
    ogDescription:
      'Kasturi Creations ethnic wear franchise investment, FICO model, returns, payback, and store expansion on iFranchise.',
  },
  '10-downing-street': {
    title: '10 Downing Street Franchise India | Pub & Nightlife | iFranchise',
    description:
      '10 Downing Street franchise in India from ₹5 Crores. British-inspired pub and nightlife chain — FOCO model, 18+ outlets, Tier 2 and metro cities. Inquire on iFranchise.',
    keywords:
      '10 downing street franchise, 10 downing street franchise india, pub franchise india, nightlife franchise india, brew house franchise, FOCO hospitality franchise',
    ogTitle: '10 Downing Street Franchise | iFranchise',
    ogDescription:
      '10 Downing Street pub franchise investment, FOCO model, formats, payback, and expansion cities on iFranchise.',
  },
  'freshco-goli-soda': {
    title: 'Freshco Goli Soda Franchise India | Beverage Unit | iFranchise',
    description:
      'Freshco Goli Soda franchise in India from ₹12.9 Lakhs. Beverage manufacturing unit — 207+ factories, 85% margin, 4-month payback, pan-India. Apply on iFranchise.',
    keywords:
      'freshco goli soda franchise, freshco franchise india, goli soda franchise, beverage manufacturing franchise india, low investment beverage franchise, freshco franchise cost',
    ogTitle: 'Freshco Goli Soda Franchise | iFranchise',
    ogDescription:
      'Freshco Goli Soda beverage manufacturing franchise investment, unit economics, payback, and pan-India expansion on iFranchise.',
  },
  emori: {
    title: 'EMORI Franchise Cost & Investment India | iFranchise',
    description:
      'EMORI franchise India: ₹2.25 Cr FICO investment with 15% annual guarantee or tiered margins. Expanding in Bengaluru, Mumbai, Hyderabad and Delhi.',
    keywords:
      'EMORI franchise, EMORI franchise India, EMORI franchise cost, EMORI franchise investment, EMORI Shark Tank India, EMORI franchise Bangalore, EMORI franchise Bengaluru, EMORI franchise Mumbai, EMORI franchise Hyderabad, EMORI franchise Chennai, EMORI franchise Delhi, EMORI franchise Noida, EMORI franchise Jaipur, EMORI franchise Chandigarh, EMORI franchise Gurgaon, lab grown diamond franchise India, lab grown diamond jewellery franchise, jewellery franchise opportunity India, diamond jewellery franchise, FICO jewellery franchise, premium retail franchise India',
    ogTitle: 'EMORI Franchise Cost, Investment & Returns | iFranchise',
    ogDescription:
      'Explore EMORI’s ₹2.25 Crores lab-grown diamond jewellery franchise, FICO model, returns, store format, and expansion across major Indian cities.',
  },
};

function buildDefaultKeywords({ brandName, industry }) {
  return [
    `${brandName} franchise`,
    `${brandName} franchise india`,
    `${industry} franchise india`,
    'franchise investment opportunities',
  ].join(', ');
}

/**
 * @param {string} slug
 * @param {{ brandName: string, industry: string, investment: string, model: string, summary: string }} ctx
 */
export function resolveBrandSeo(slug, ctx) {
  const key = String(slug || '').toLowerCase().trim();
  const custom = BRAND_SEO_BY_SLUG[key];

  if (custom) {
    return {
      title: custom.title,
      description: custom.description,
      keywords: custom.keywords || buildDefaultKeywords(ctx),
      ogTitle: custom.ogTitle || custom.title,
      ogDescription: custom.ogDescription || custom.description,
    };
  }

  const { brandName, industry, investment, model, summary } = ctx;
  const clippedSummary = summary.length > 120 ? `${summary.slice(0, 120)}…` : summary;

  return {
    title: `${brandName} Franchise | Investment, Model & Expansion | iFranchise`,
    description: `${brandName}: ${clippedSummary} Investment ${investment}. ${model} model. Explore on iFranchise.`,
    keywords: buildDefaultKeywords(ctx),
    ogTitle: `${brandName} Franchise | iFranchise`,
    ogDescription: `Investment, model, and expansion details for ${brandName} franchise on iFranchise.`,
  };
}
