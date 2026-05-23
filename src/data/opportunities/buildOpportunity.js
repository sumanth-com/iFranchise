import {
  cleanText,
  deriveBadge,
  deriveLocationsLabel,
  extractCities,
  formatInrRange,
  formatIndianCurrencyText,
  formatSpaceSqFt,
  inrToUsdFilterAmount,
  isPlaceholder,
  normalizeCategory,
  parseInvestmentAmounts,
  parseModels,
  parsePaybackMonths,
  parseRoiPercent,
  primaryModel,
  slugifyBrand,
} from './opportunityUtils.js';
import { getBrandImages } from './brandImages.js';

const MODEL_DESCRIPTIONS = {
  FOFO: 'Franchise-owned, franchise-operated — ideal for hands-on operators who want full unit control.',
  FICO: 'Franchise-investor, company-operated — suited for investors seeking professional operations management.',
  FOCO: 'Franchise-owned, company-operated — structured for semi-passive investors with brand-led operations.',
  COFO: 'Company-owned, franchise-operated — leverages local operators under central brand standards.',
  COCO: 'Company-owned, company-operated — corporate-led expansion with centralized control.',
  FIFO: 'Franchise-investor, franchise-operated — shared governance between investor and operating partner.',
};

function formatMultiLineField(text) {
  const cleaned = cleanText(text);
  if (!cleaned) return '';
  return cleaned
    .replace(/,\s*(?=(?:Classic|Premium|Brew|FOFO|FICO|UF|MF|Unit))/gi, '\n')
    .replace(/\s*\/\s*/g, '\n')
    .replace(/\s+(?=(?:PREMIUM|BREW|CLASSIC|TIER))/gi, '\n')
    .replace(/\n+/g, '\n')
    .trim();
}

function formatMoneyDisplay(text) {
  return formatIndianCurrencyText(formatMultiLineField(text));
}

function formatSpaceDisplay(text) {
  return formatSpaceSqFt(formatMultiLineField(text));
}

function buildInvestorInvestmentSummary(raw, _investmentLabel, franchiseFee, returns, _models, paybackLabel) {
  const slot = (label, value, fallback) => ({
    label,
    value: value && String(value).trim() ? value : fallback,
  });
  return [
    slot('Franchise fee', !isPlaceholder(franchiseFee) ? formatMoneyDisplay(franchiseFee) : '', 'On request'),
    slot('Space (Sq.ft)', !isPlaceholder(raw.sqFt) ? formatSpaceDisplay(raw.sqFt) : '', 'As per format'),
    slot('Returns', !isPlaceholder(returns) ? formatIndianCurrencyText(cleanText(returns)) : '', 'On request'),
    slot('Payback', paybackLabel || '', 'On request'),
  ];
}

function buildAboutInsights(raw, brandName, summary) {
  const insights = [];
  if (!isPlaceholder(raw.targetAreas)) {
    insights.push({
      title: 'Where the brand is expanding',
      body: cleanText(raw.targetAreas),
    });
  }
  if (!isPlaceholder(raw.mcp)) {
    const body = cleanText(raw.mcp);
    insights.push({
      title: 'Priority cities & corridors',
      body: body.length > 400 ? `${body.slice(0, 400)}…` : body,
    });
  }
  if (!isPlaceholder(raw.locationType)) {
    insights.push({
      title: 'Ideal location profile',
      body: cleanText(raw.locationType),
    });
  }
  if (!isPlaceholder(raw.returns)) {
    insights.push({
      title: 'How returns are structured',
      body: cleanText(raw.returns),
    });
  }
  const summaryClean = cleanText(summary);
  if (!insights.length && summaryClean) {
    insights.push({
      title: `${brandName} at a glance`,
      body: summaryClean,
    });
  }
  return insights;
}

function buildWhyChoose(raw, industry, roi, outlets, models) {
  const items = [];
  if (!isPlaceholder(raw.shortDescription)) {
    items.push({
      title: 'Established Brand Proposition',
      description: cleanText(raw.shortDescription).slice(0, 160) + (raw.shortDescription.length > 160 ? '…' : ''),
    });
  }
  if (!isPlaceholder(outlets)) {
    items.push({
      title: 'Network Strength',
      description: `${cleanText(outlets)} — demonstrating market validation and operational scale.`,
    });
  }
  if (roi != null) {
    items.push({
      title: 'Returns Profile',
      description: `Indicative returns around ${roi}% per annum (subject to location and operating performance).`,
    });
  }
  if (!isPlaceholder(raw.returns)) {
    items.push({
      title: 'Commercial Structure',
      description: cleanText(raw.returns),
    });
  }
  if (!isPlaceholder(raw.targetAreas) || !isPlaceholder(raw.mcp)) {
    items.push({
      title: 'Expansion Roadmap',
      description: cleanText(raw.targetAreas || raw.mcp).slice(0, 200),
    });
  }
  if (!items.length) {
    items.push({
      title: `${industry} Opportunity`,
      description: `Partner with ${cleanText(raw.franchiseName)} on a structured ${models.join(' / ')} franchise model.`,
    });
  }
  return items.slice(0, 5);
}

function buildTrainingSupport(raw, models) {
  const items = [];
  if (models.includes('FICO') || models.includes('FOCO')) {
    items.push('Managed operations & performance reporting');
    items.push('Central marketing and brand compliance');
  }
  if (models.includes('FOFO')) {
    items.push('Launch training and standard operating procedures');
    items.push('Site selection and pre-opening support');
  }
  items.push('Supply chain and vendor onboarding guidance');
  if (!isPlaceholder(raw.staffRequirement)) {
    items.push(`Staffing: ${cleanText(raw.staffRequirement)}`);
  } else {
    items.push('Ongoing field support and operational reviews');
  }
  return [...new Set(items)].slice(0, 6);
}

function buildDefaultReviews(brandName) {
  const templates = [
    {
      name: 'Priya S.',
      text: `Transparent disclosure and professional support from the ${brandName} team. Investment terms were clear from day one.`,
    },
    {
      name: 'Rahul M.',
      text: `Solid franchise framework with practical onboarding. ${brandName} helped us evaluate location and payback realistically.`,
    },
    {
      name: 'Anita K.',
      text: `Listing quality on iFranchise matched what we heard on calls. ${brandName} operations playbook is well structured for new partners.`,
    },
    {
      name: 'Vikram D.',
      text: `Confident after due diligence — ${brandName} shared unit economics and expansion plans without overpromising returns.`,
    },
  ];
  return templates.map((r) => ({ ...r, rating: 5 }));
}

function buildFaqs(raw, investmentLabel, models) {
  const brand = cleanText(raw.franchiseName);
  const faqs = [
    {
      q: `What is the investment range for ${brand}?`,
      a: `Total investment typically starts from ${investmentLabel}. Final capital depends on format, city tier, and store size.`,
    },
    {
      q: 'Is prior industry experience required?',
      a: 'Prior experience helps but is not always mandatory. The brand provides onboarding, SOPs, and operational guidance aligned to the franchise model.',
    },
  ];
  if (models.length) {
    faqs.push({
      q: 'Which franchise models are available?',
      a: `Available structures include ${models.join(', ')}. The right format depends on your involvement level and capital allocation.`,
    });
  }
  if (!isPlaceholder(raw.paybackPeriod)) {
    faqs.push({
      q: 'What is the expected payback timeline?',
      a: `Indicative payback: ${cleanText(raw.paybackPeriod)}. Actual timelines vary by catchment, rent, and operating discipline.`,
    });
  }
  return faqs;
}

function buildFranchiseStructure(models, raw) {
  const structure = [];
  if (/master|mf/i.test(raw.investmentMin || '') || /master/i.test(raw.investmentMax || '')) {
    structure.push('Master Franchise');
  }
  structure.push('Unit Franchise');
  if (models.length > 1) structure.push('Multi-Model');
  if (/pan\s*india|tier/i.test(raw.targetAreas || '')) structure.push('Multi-City Expansion');
  return [...new Set(structure)];
}

function buildExpansionPlans(raw, cities) {
  const plans = [];
  const target = cleanText(raw.targetAreas);
  if (target) {
    target.split(/[,;|]/).forEach((part) => {
      const p = cleanText(part);
      if (p && p.length < 60) plans.push(p);
    });
  }
  if (!plans.length && cities.length) {
    cities.slice(0, 8).forEach((c) => plans.push(c));
  }
  if (!plans.length && !isPlaceholder(raw.locationType)) {
    plans.push(cleanText(raw.locationType));
  }
  return plans.length ? plans : ['India — select markets'];
}

/**
 * @param {import('./rawBrands.js').RAW_BRANDS[number]} raw
 * @param {number} id
 */
export function buildOpportunityRecord(raw, id) {
  const brandName = cleanText(raw.franchiseName).replace(/\(2\)/i, '').trim();
  const industry = normalizeCategory(raw.category);
  const models = parseModels(raw.businessModel);
  const model = primaryModel(models);

  const { minInr, maxInr } = parseInvestmentAmounts(raw.investmentMin, raw.investmentMax);
  const minInvestment = minInr != null ? inrToUsdFilterAmount(minInr) : 50_000;
  const maxInvestment = maxInr != null ? inrToUsdFilterAmount(maxInr) : minInvestment * 2;
  const investment = formatInrRange(minInr, maxInr);

  const roiValue = parseRoiPercent(raw.roiPercentage) ?? parseRoiPercent(raw.returns);
  const roi = roiValue != null ? `${roiValue}%` : 'On request';
  const paybackMonths = parsePaybackMonths(raw.paybackPeriod);

  const cities = extractCities(raw.targetAreas, raw.mcp, raw.locationType);
  const locations = deriveLocationsLabel(raw.targetAreas, raw.locationType, cities);
  const badge = deriveBadge({
    roi: roiValue,
    paybackMonths,
    totalOutlets: raw.totalOutlets,
    targetAreas: raw.targetAreas,
  });

  const slug = slugifyBrand(brandName);
  const tagline = cleanText(raw.tagline);
  const summary = cleanText(raw.shortDescription);
  const spaceLabel = raw.sqFt && !isPlaceholder(raw.sqFt) ? formatSpaceDisplay(raw.sqFt) : 'As per brand format';
  const brandImages = getBrandImages(slug, industry);

  const listing = {
    id,
    slug,
    brandName,
    category: industry,
    industry,
    logo: brandImages.logo || '',
    image: brandImages.card,
    cardFit: brandImages.cardFit || 'cover',
    cardBackground: brandImages.cardBackground,
    cardAccent: brandImages.cardAccent,
    badge,
    investment,
    model,
    models,
    locations,
    cities,
    roi,
    roiValue,
    summary,
    tagline,
    expansionNote: cleanText(raw.targetAreas || raw.mcp) || locations,
    status: 'active',
    addedDate: '2025-01-01',
    minInvestment,
    maxInvestment,
    currency: raw.currency || 'INR',
    metaTitle: `${brandName} Franchise — Investment, Model & Expansion | iFranchise`,
    metaDescription: `${brandName}: ${summary.slice(0, 120)}… Investment ${investment}. ${model} model. Explore on iFranchise.`,
    searchText: [brandName, industry, tagline, summary, locations, models.join(' '), raw.targetAreas, raw.mcp]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };

  const paybackLabel = cleanText(raw.paybackPeriod) || (paybackMonths ? `${paybackMonths} months` : 'On request');
  const outlets = cleanText(raw.totalOutlets) || 'Growing network';

  const detail = {
    id: String(id),
    slug,
    name: brandName,
    industry,
    status: 'Verified',
    badge: badge === 'FEATURED' ? 'Premium Listing' : badge,
    tagline,
    logo: brandImages.logo || '',
    image: brandImages.card,
    banner: brandImages.banner,
    gallery: brandImages.gallery,
    slideshow: brandImages.slideshow ?? brandImages.gallery,
    brochureUrl: cleanText(raw.websiteBrochureLink) || '',
    keyInfo: {
      investment,
      space: spaceLabel,
      roi,
      payback: paybackLabel,
      outlets,
    },
    overview: summary,
    businessModel: [
      models.length ? `Franchise model: ${models.join(', ')}.` : '',
      !isPlaceholder(raw.locationType) ? `Location fit: ${cleanText(raw.locationType)}.` : '',
      !isPlaceholder(raw.returns) ? `Returns: ${cleanText(raw.returns)}.` : '',
    ]
      .filter(Boolean)
      .join(' '),
    investorInvestment: buildInvestorInvestmentSummary(
      raw,
      investment,
      raw.franchiseFee,
      raw.returns,
      models,
      paybackLabel
    ),
    aboutInsights: buildAboutInsights(raw, brandName, summary),
    investmentDetails: buildInvestorInvestmentSummary(
      raw,
      investment,
      raw.franchiseFee,
      raw.returns,
      models,
      paybackLabel
    ),
    locations: buildExpansionPlans(raw, cities),
    faqs: buildFaqs(raw, investment, models),
    reviews: buildDefaultReviews(brandName),
    aboutBrand: [],
    financialHighlights: {
      investmentRange: investment,
      areaRequired: spaceLabel,
      franchiseFee: raw.franchiseFee && !isPlaceholder(raw.franchiseFee)
        ? formatMoneyDisplay(raw.franchiseFee)
        : 'On request',
    },
    financialTable: [],
    franchiseModels: models.map((name) => ({
      name,
      description: MODEL_DESCRIPTIONS[name] || `${name} partnership format.`,
    })),
    whyChoose: buildWhyChoose(raw, industry, roiValue, outlets, models),
    franchiseStructure: buildFranchiseStructure(models, raw),
    operationsReturns: {
      roi: roiValue != null ? `${roiValue}% indicative annual return` : cleanText(raw.returns) || 'Shared on enquiry',
      payback: paybackLabel,
      hours: models.includes('FICO') || models.includes('FOCO') ? 'Oversight-led (semi-passive)' : 'Owner-operator involvement',
      staff: cleanText(raw.staffRequirement) || 'As per unit format & city',
    },
    expansionPlans: buildExpansionPlans(raw, cities),
    requirements: [
      {
        label: 'Location Profile',
        value: cleanText(raw.locationType) || 'High-visibility retail or F&B catchments',
      },
      {
        label: 'Space (Sq.ft)',
        value: spaceLabel,
      },
      {
        label: 'Target Markets',
        value: cleanText(raw.targetAreas) || locations,
      },
    ].filter((r) => r.value && r.value !== 'India — select markets'),
    trainingSupport: [],
    agreementDetails: [
      !isPlaceholder(raw.agreementTerm) && { label: 'Agreement Term', value: cleanText(raw.agreementTerm) },
      !isPlaceholder(raw.lockInPeriod) && { label: 'Lock-in Period', value: cleanText(raw.lockInPeriod) },
      { label: 'Currency', value: raw.currency === 'INR' ? 'INR (₹)' : raw.currency || 'INR (₹)' },
    ].filter(Boolean),
    marketOpportunity: !isPlaceholder(raw.targetAreas)
      ? cleanText(raw.targetAreas)
      : !isPlaceholder(raw.mcp)
        ? 'Multi-city rollout with defined expansion corridors.'
        : '',
    idealInvestorProfile:
      models.includes('FICO') || models.includes('FOCO')
        ? 'Investors seeking a professionally managed franchise with clear reporting and brand-led operations.'
        : 'Entrepreneurs ready for hands-on QSR/retail operations with local market knowledge.',
    brandStrengths: buildWhyChoose(raw, industry, roiValue, outlets, models).map((w) => w.title),
    expansionVision: cleanText(raw.targetAreas || raw.mcp) || 'National expansion across priority Indian markets.',
    disclaimer:
      'All figures are indicative from brand disclosures and vary by city, store format, rent, and operating performance. Conduct independent due diligence before investment.',
  };

  return { listing, detail };
}
