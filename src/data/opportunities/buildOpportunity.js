import {
  cleanText,
  deriveBadge,
  deriveLocationsLabel,
  formatBrandDisplayName,
  extractCities,
  formatAgreementTerm,
  formatExpansionDetailLabel,
  formatExpansionHeroLabel,
  formatInrRange,
  formatIndianCurrencyText,
  formatOutletsDisplay,
  formatReturnsDisplay,
  formatSpaceSqFt,
  inrToUsdFilterAmount,
  isPlaceholder,
  normalizeCategory,
  parseInvestmentAmounts,
  parseModels,
  parsePaybackMonths,
  parseRoiPercent,
  resolvePrimaryModel,
  slugifyBrand,
} from './opportunityUtils.js';
import { getBrandImages } from './brandImages.js';
import { getBrochureUrlByFranchiseSlug } from './brochurePdfs.js';
import { getBrandGoogleReviews } from './brandGoogleReviews.js';
import {
  flattenLocationLabels,
  flattenLocationTags,
  getBrandLocationGroups,
  getLocationGroupsSummary,
} from './brandLocations.js';

const MODEL_DESCRIPTIONS = {
  FOFO: 'Franchise-owned, franchise-operated: ideal for hands-on operators who want full unit control.',
  FICO: 'Franchise-investor, company-operated: suited for investors seeking professional operations management.',
  FOCO: 'Franchise-owned, company-operated: structured for semi-passive investors with brand-led operations.',
  COFO: 'Company-owned, franchise-operated: leverages local operators under central brand standards.',
  COCO: 'Company-owned, company-operated: corporate-led expansion with centralized control.',
  FIFO: 'Franchise-investor, franchise-operated: shared governance between investor and operating partner.',
};

function formatMultiLineField(text) {
  if (text == null || text === false) return '';
  const normalized = String(text).replace(/\r\n/g, '\n').trim();
  if (!normalized) return '';
  if (normalized.includes('\n')) {
    return normalized
      .split('\n')
      .map((line) => cleanText(line))
      .filter(Boolean)
      .join('\n');
  }
  return cleanText(normalized)
    .replace(/,\s*(?=(?:Classic|Premium|Brew|FOFO|FICO|UF|MF|Unit))/gi, '\n')
    .replace(/\s*\/\s*/g, '\n')
    .replace(/\s+(?=(?:PREMIUM|BREW|CLASSIC)(?!\s*\())/gi, '\n')
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
  const slot = (label, value, fallback, detail) => ({
    label,
    value: value && String(value).trim() ? value : fallback,
    detail: detail || '',
  });
  const returnsInfo = !isPlaceholder(returns)
    ? formatReturnsDisplay(returns)
    : { display: 'On request', full: '' };
  const base = [
    slot('Franchise fee', !isPlaceholder(franchiseFee) ? formatMoneyDisplay(franchiseFee) : '', 'On request'),
    slot('Space (Sq.ft)', !isPlaceholder(raw.sqFt) ? formatSpaceDisplay(raw.sqFt) : '', 'As per format'),
    slot('Returns', returnsInfo.display, 'On request', returnsInfo.full),
    slot('Payback', paybackLabel || '', 'On request'),
  ];
  const extras = Array.isArray(raw.investorHighlights)
    ? raw.investorHighlights
        .map((item) =>
          slot(cleanText(item.label), cleanText(item.value), 'On request', cleanText(item.detail)),
        )
        .filter((item) => item.label && item.value)
    : [];
  const omit = new Set((raw.investorPanelOmit || []).map((label) => cleanText(label)));
  return [...base, ...extras].filter((item) => !omit.has(item.label));
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
  if (roi != null) {
    items.push({
      title: 'Returns Profile',
      description: `Indicative returns around ${roi}% per annum (subject to location and operating performance).`,
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
  return plans.length ? plans : ['India, select markets'];
}

/**
 * @param {import('./rawBrands.js').RAW_BRANDS[number]} raw
 * @param {number} id
 */
export function buildOpportunityRecord(raw, id) {
  const rawName = cleanText(raw.franchiseName).replace(/\(2\)/i, '').trim();
  const slug = slugifyBrand(rawName);
  const brandName = formatBrandDisplayName(raw.franchiseName, slug);
  const industry = normalizeCategory(raw.category);
  const models = parseModels(raw.businessModel);
  const model = resolvePrimaryModel(slug, models);

  const { minInr, maxInr } = parseInvestmentAmounts(raw.investmentMin, raw.investmentMax);
  const minInvestment = minInr != null ? inrToUsdFilterAmount(minInr) : 50_000;
  const maxInvestment = maxInr != null ? inrToUsdFilterAmount(maxInr) : minInvestment * 2;
  const investment = cleanText(raw.investmentDisplay) || formatInrRange(minInr, maxInr);

  const roiValue = parseRoiPercent(raw.roiPercentage) ?? parseRoiPercent(raw.returns);
  const roi = roiValue != null ? `${roiValue}%` : 'On request';
  const paybackMonths = parsePaybackMonths(raw.paybackPeriod);

  const cities = extractCities(raw.targetAreas, raw.mcp, raw.locationType);
  const locationGroups = getBrandLocationGroups(slug);
  const groupedCities = locationGroups ? flattenLocationLabels(locationGroups) : cities;
  const locationCities = groupedCities.length ? groupedCities : cities;
  const locations = cleanText(raw.expansionDisplay)
    || deriveLocationsLabel(
      cleanText(raw.targetAreas) || cleanText(raw.mcp),
      raw.locationType,
      locationCities,
    );
  const badge = deriveBadge({
    roi: roiValue,
    paybackMonths,
    totalOutlets: raw.totalOutlets,
    targetAreas: raw.targetAreas,
  });

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
    image: brandImages.logo || brandImages.card,
    cardFit: brandImages.cardFit || 'cover',
    cardBackground: brandImages.cardBackground,
    cardAccent: brandImages.cardAccent,
    badge,
    investment,
    model,
    models,
    locations,
    cities: groupedCities.length ? groupedCities : cities,
    roi,
    roiValue,
    summary,
    tagline,
    expansionNote: cleanText(raw.targetAreas || raw.mcp) || locations,
    status: 'active',
    addedDate: '2025-01-01',
    minInvestment,
    maxInvestment,
    minInr: minInr ?? null,
    maxInr: maxInr ?? null,
    currency: raw.currency || 'INR',
    metaTitle: `${brandName} Franchise | Investment, Model & Expansion | iFranchise`,
    metaDescription: `${brandName}: ${summary.slice(0, 120)}… Investment ${investment}. ${model} model. Explore on iFranchise.`,
    searchText: [brandName, industry, tagline, summary, locations, models.join(' '), raw.targetAreas, raw.mcp]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };

  const paybackLabel = cleanText(raw.paybackPeriod) || (paybackMonths ? `${paybackMonths} months` : 'On request');
  const outlets = formatOutletsDisplay(raw.totalOutlets) || 'Growing network';
  const googleReviews = getBrandGoogleReviews(slug);

  const detail = {
    id: String(id),
    slug,
    name: brandName,
    industry,
    status: 'Verified',
    badge: badge === 'FEATURED' ? 'Premium Listing' : badge,
    tagline,
    logo: brandImages.logo || '',
    image: brandImages.logo || brandImages.card,
    banner: brandImages.banner,
    gallery: brandImages.gallery,
    slideshow: brandImages.slideshow ?? brandImages.gallery,
    cardBackground: brandImages.cardBackground,
    cardFit: brandImages.cardFit || 'fill',
    brochureUrl: getBrochureUrlByFranchiseSlug(slug) || cleanText(raw.websiteBrochureLink) || '',
    keyInfo: {
      investment,
      investmentNote: cleanText(raw.investmentNote) || '',
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
    locations: locationGroups ? flattenLocationTags(locationGroups) : buildExpansionPlans(raw, cities),
    locationsSummary: locationGroups ? getLocationGroupsSummary(locationGroups) : null,
    locationGroups: locationGroups ?? null,
    expansionDisplay: cleanText(raw.expansionDisplay)
      || formatExpansionHeroLabel({
      cities: groupedCities.length ? groupedCities : cities,
      locationsSummary: locationGroups ? getLocationGroupsSummary(locationGroups) : '',
      targetAreas: raw.targetAreas,
      locationType: raw.locationType,
    }),
    expansionDetail: formatExpansionDetailLabel({
      cities: groupedCities.length ? groupedCities : cities,
      locationsSummary: locationGroups ? getLocationGroupsSummary(locationGroups) : '',
      targetAreas: raw.targetAreas,
      locationType: raw.locationType,
    }),
    faqs: buildFaqs(raw, investment, models),
    reviews: googleReviews?.reviews ?? [],
    reviewSummary: googleReviews
      ? { rating: googleReviews.rating, count: googleReviews.count, source: 'Google' }
      : null,
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
    whyChoose:
      Array.isArray(raw.whyChoose) && raw.whyChoose.length
        ? raw.whyChoose.map((item) => ({
            title: cleanText(item.title),
            description: cleanText(item.description),
          }))
        : buildWhyChoose(raw, industry, roiValue, outlets, models),
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
    ].filter((r) => r.value && r.value !== 'India, select markets'),
    trainingSupport: buildTrainingSupport(raw, models),
    agreementDetails: [
      !isPlaceholder(raw.agreementTerm) && {
        label: 'Agreement Term',
        value: formatAgreementTerm(raw.agreementTerm),
      },
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
