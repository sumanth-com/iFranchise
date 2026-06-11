import { useEffect, useMemo, useRef, useState } from 'react';
import { navigateTo, NAVIGATE_EVENT, restoreScrollWithRetry } from '@/lib/navigation';
import { heroDisplayClass } from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';
import ImageCarousel from './ImageCarousel';
import BrochureDownloadButton from './BrochureDownloadButton';
import FranchiseInquiryLauncher from './FranchiseInquiryLauncher';
import FranchiseInquiryStickyPanel from './FranchiseInquiryStickyPanel';
import FranchiseSimilarCardImage from './FranchiseSimilarCardImage';
import {
  getFranchiseDetailById,
  getSimilarFranchiseDetails,
} from '../data/franchiseData';
import {
  getFranchiseDetailPath,
  resolveFranchiseIdFromLocation,
  canonicalizeFranchiseUrl,
} from '../lib/franchisePaths';
import { getCarouselCategory, resolveDetailGalleryImages } from '../data/opportunities/brandImages';
import { formatReturnsDisplay } from '../data/opportunities/opportunityUtils.js';
import { FRANCHISE_DETAILS_SHELL } from '../lib/franchiseOpportunitiesShell.js';
import { franchiseBrandAlt } from '../seo/imageAlt.js';

const getSelectedFranchiseId = () =>
  resolveFranchiseIdFromLocation(window.location.pathname, window.location.search);

const FRANCHISE_STAT_ITEMS = [
  { label: 'Investment', key: 'investment' },
  { label: 'Agreement Term', key: 'agreementTerm' },
  { label: 'Outlets', key: 'outlets' },
];

function formatMetricDisplay(key, value) {
  const text = String(value ?? '');
  if (key !== 'space') return text;
  if (text.includes('\n')) return text.trim();
  return text
    .replace(/\s*\/\s*/g, '\n')
    .replace(/\s+(?=(?:PREMIUM|BREW|CLASSIC)(?!\s*\())/gi, '\n')
    .replace(/\n+/g, '\n')
    .trim();
}

function StatCardValue({ value, note, multiline = false }) {
  const spaceMultiline = multiline && String(value).includes('\n');
  return (
    <>
      <p
        className={`fd-copy fd-body-text mt-1.5 w-full leading-tight ${
          spaceMultiline
            ? 'whitespace-pre-line text-sm leading-snug sm:text-base'
            : 'text-base font-medium sm:text-lg'
        }`}
      >
        {value}
      </p>
      {note ? (
        <p className="fd-copy mt-1 w-full text-[0.6875rem] font-semibold leading-snug text-slate-500">
          {note}
        </p>
      ) : null}
    </>
  );
}

function HeroStatCard({ label, value, note, multiline = false, title, className = '' }) {
  return (
    <article
      className={`fd-stat-card fd-about-stat-card flex min-h-[92px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm ${className}`.trim()}
      title={title || undefined}
    >
      <p className="fd-copy fd-field-label w-full text-[0.65rem] tracking-[0.12em]">{label}</p>
      <StatCardValue value={value} note={note} multiline={multiline} />
    </article>
  );
}

/** Same stat cards as About section (right column on detail page). */
function FranchiseStatGrid({ franchise, className = '' }) {
  const agreementItems = franchise?.agreementDetails || [];
  const agreementTermValue = agreementItems.find((item) => item.label === 'Agreement Term')?.value || '';
  const modelValue = franchise.franchiseModels?.map((m) => m.name).join(' · ') || '';
  const expansionValue =
    franchise.expansionDisplay ||
    franchise.locationsSummary ||
    franchise.locations?.slice(0, 3).join(' · ') ||
    '';

  return (
    <div className={`fd-about-stats grid grid-cols-2 gap-3 ${className}`.trim()}>
      {FRANCHISE_STAT_ITEMS.map((item) => {
        const rawValue =
          item.key === 'agreementTerm' ? agreementTermValue : franchise.keyInfo[item.key];
        const value = formatMetricDisplay(item.key, rawValue);
        const note = item.key === 'investment' ? franchise.keyInfo.investmentNote : '';
        if (item.key === 'agreementTerm' && !value) return null;
        return (
          <HeroStatCard key={item.key} label={item.label} value={value} note={note} />
        );
      })}
      {modelValue ? <HeroStatCard key="model" label="Model" value={modelValue} /> : null}
      {expansionValue ? (
        <HeroStatCard
          key="expansion"
          label="Expansion"
          value={expansionValue}
          title={franchise.expansionDetail || undefined}
          className="fd-stat-card--full col-span-2"
        />
      ) : null}
    </div>
  );
}

function getExpansionPlanLocations(franchise) {
  const candidates = [
    franchise.expansionDetail,
    franchise.locationsSummary,
    franchise.expansionDisplay,
    franchise.locations?.length ? franchise.locations.join(' · ') : '',
    franchise.expansionPlans?.length ? franchise.expansionPlans.join(' · ') : '',
  ];
  return candidates.map((value) => String(value || '').trim()).find(Boolean) || '';
}

function withIndiaGeoHint(text) {
  const cleaned = String(text || '').trim();
  if (!cleaned) return '';
  return /\bindia\b/i.test(cleaned) ? cleaned : `${cleaned} in India`;
}

function buildAboutParagraphs(franchise) {
  const paragraphs = [];
  const overview = String(franchise.overview || '').trim();
  if (overview) paragraphs.push(overview);

  const investment = franchise.keyInfo?.investment;
  const models =
    franchise.businessModelDisplay ||
    franchise.franchiseModels?.map((model) => model.name).filter(Boolean).join(' and ') ||
    '';
  const profile = String(franchise.idealInvestorProfile || '').trim();
  let investorLine = '';
  if (investment && models) {
    investorLine = franchise.businessModelDisplay
      ? `Franchise investment starts at ${investment} under ${models}.`
      : `Franchise investment starts at ${investment} on a ${models} model.`;
  } else if (investment) {
    investorLine = `Franchise investment starts at ${investment}.`;
  } else if (models) {
    investorLine = `This opportunity is offered on a ${models} franchise model.`;
  }
  if (investorLine && profile) {
    paragraphs.push(`${investorLine} ${profile}`);
  } else if (investorLine || profile) {
    paragraphs.push(investorLine || profile);
  }

  const outlets = franchise.keyInfo?.outlets;
  if (outlets) {
    paragraphs.push(
      `${franchise.name} already operates ${outlets} outlets, which helps new partners enter with a recognised brand in the ${franchise.industry || 'Indian'} market.`,
    );
  }

  const locationProfile = franchise.requirements?.find((item) => item.label === 'Location Profile')?.value;
  if (locationProfile) {
    paragraphs.push(
      `Units are designed for ${locationProfile.toLowerCase()}, with franchisor support from site planning through day-to-day operations.`,
    );
  }

  if (paragraphs.length < 3 && franchise.businessModel) {
    const businessModel = String(franchise.businessModel || '').trim();
    if (businessModel && !paragraphs.some((line) => line.includes(businessModel.slice(0, 48)))) {
      paragraphs.push(businessModel);
    }
  }

  return paragraphs.filter(Boolean).slice(0, 4);
}

function AboutBrandSection({ franchise }) {
  const aboutParagraphs = buildAboutParagraphs(franchise);
  const expansionLocations = withIndiaGeoHint(getExpansionPlanLocations(franchise));
  const headingId = `fd-about-${franchise.slug || franchise.id}-heading`;
  const expansionId = `fd-about-${franchise.slug || franchise.id}-expansion`;

  return (
    <>
      <h2 id={headingId} className={`fd-about-heading fd-heading fd-copy ${TYPE.h3}`}>
        About {franchise.name}
      </h2>
      {franchise.tagline ? (
        <p className="fd-about-tagline fd-copy mt-3 text-sm font-semibold leading-snug sm:text-base">
          {franchise.tagline}
        </p>
      ) : null}
      {aboutParagraphs.map((paragraph, index) => (
        <p
          key={`about-${index}`}
          className="fd-about-description fd-copy mt-3 text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-7"
        >
          {paragraph}
        </p>
      ))}
      {expansionLocations ? (
        <div
          className="fd-about-expansion mt-6 border-t border-slate-100 pt-5"
          aria-labelledby={expansionId}
        >
          <h3 id={expansionId} className="fd-about-expansion-title fd-copy text-sm font-semibold sm:text-base">
            Expansion Plan
          </h3>
          <p className="fd-about-expansion-text fd-copy mt-2 text-sm leading-relaxed sm:leading-7">
            <strong className="font-semibold">Locations available:</strong> {expansionLocations}
          </p>
        </div>
      ) : null}
    </>
  );
}

function BrandSupportList({ items, fallback }) {
  if (!items?.length) {
    return fallback ? (
      <p className="fd-copy fd-body-text text-sm leading-relaxed sm:leading-7">{fallback}</p>
    ) : null;
  }

  return (
    <div className="fd-support-grid fd-invest-grid grid grid-cols-2 gap-3 sm:gap-3.5">
      {items.map((item) => (
        <article
          key={item}
          className="fd-support-card fd-invest-card fd-stat-card fd-about-stat-card flex min-h-[6.25rem] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-3.5 text-center shadow-sm sm:min-h-[6.75rem] sm:px-3.5 sm:py-4"
        >
          <p className="fd-copy fd-body-text w-full text-xs font-medium leading-snug sm:text-sm">
            {item}
          </p>
        </article>
      ))}
    </div>
  );
}

const INVESTMENT_OVERVIEW_LABELS = {
  'Franchise fee': 'Franchise Fee',
  'Space (Sq.ft)': 'Space Required',
  Returns: 'Returns',
  Payback: 'Payback Period',
  'Lock-in Period': 'Lock-in Period',
  'Franchise types': 'Franchise Types',
};

function upsertOverviewRow(rows, { label, value }, { after, before } = {}) {
  if (!value) return;
  const displayValue =
    label === 'Space (Sq.ft)' ? formatMetricDisplay('space', value) : String(value).trim();
  if (!displayValue) return;

  const existingIdx = rows.findIndex((item) => item.label === label);
  if (existingIdx >= 0) {
    rows[existingIdx] = { ...rows[existingIdx], value: displayValue };
    return;
  }

  const anchorIdx = after
    ? rows.findIndex((item) => after.test(item.label))
    : before
      ? rows.findIndex((item) => before.test(item.label))
      : -1;
  const row = { label, value: displayValue };
  if (after && anchorIdx >= 0) rows.splice(anchorIdx + 1, 0, row);
  else if (before && anchorIdx >= 0) rows.splice(anchorIdx, 0, row);
  else rows.push(row);
}

function formatInvestmentOverviewValue(item) {
  if (item.returnsStructured) {
    const { primary, connector, secondary } = item.returnsStructured;
    return [primary, connector, secondary].filter(Boolean).join(' ');
  }
  return item.value;
}

function InvestmentOverviewList({
  items,
  franchiseStructure = [],
  models = [],
  space = '',
  payback = '',
  lockIn = '',
}) {
  const structure = (franchiseStructure || []).map((s) => String(s).trim()).filter(Boolean);
  const hasMaster = structure.some((s) => s.toLowerCase().includes('master'));
  const hasUnit = structure.some((s) => s.toLowerCase().includes('unit'));
  const typeLabels = [
    hasMaster ? 'Master Franchise' : null,
    hasUnit ? 'Unit Franchise' : null,
    (models || []).length > 1 ? 'Multi-Model' : null,
  ].filter(Boolean);

  const franchiseTypesItem = typeLabels.length
    ? {
        label: 'Franchise types',
        value: typeLabels.join(' · '),
      }
    : null;

  const rows = [...(items || [])];
  if (franchiseTypesItem) {
    const spaceIdx = rows.findIndex((item) => /space/i.test(item.label));
    if (spaceIdx >= 0) rows.splice(spaceIdx + 1, 0, franchiseTypesItem);
    else rows.push(franchiseTypesItem);
  }
  upsertOverviewRow(rows, { label: 'Space (Sq.ft)', value: space }, { after: /franchise fee/i });
  upsertOverviewRow(rows, { label: 'Payback', value: payback }, { after: /returns/i });
  upsertOverviewRow(rows, { label: 'Lock-in Period', value: lockIn }, { after: /payback/i });

  return (
    <dl className="fd-investment-overview">
      {rows.map((item) => (
        <div
          key={item.label}
          className="fd-investment-overview__row flex items-start justify-between gap-4 border-b border-slate-100 py-3.5 last:border-b-0 sm:py-4"
        >
          <dt className="fd-investment-overview__label fd-copy shrink-0 text-sm text-slate-500">
            {INVESTMENT_OVERVIEW_LABELS[item.label] || item.label}:
          </dt>
          <dd className="fd-investment-overview__value fd-copy max-w-[58%] text-right text-sm font-bold leading-snug text-slate-900 sm:max-w-[62%] sm:text-base">
            {formatInvestmentOverviewValue(item)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function AgreementDetailCard({ label, value, className = '' }) {
  return (
    <article
      className={`fd-mini-card fd-agreement-detail-card flex flex-col items-center justify-center px-4 py-4 text-center sm:py-5 ${className}`.trim()}
    >
      <p className="fd-copy fd-field-label text-[0.65rem] font-semibold uppercase tracking-[0.12em]">{label}</p>
      <p className="fd-copy fd-body-text mt-2 text-base font-semibold leading-snug sm:text-lg">{value}</p>
    </article>
  );
}

/** Left: Agreement Term + Lock-in; right: Currency (equal column width, currency full height). */
function AgreementDetailsContent({ items }) {
  const agreementTerm = items.find((item) => item.label === 'Agreement Term');
  const lockInPeriod = items.find((item) => item.label === 'Lock-in Period');
  const currency = items.find((item) => item.label === 'Currency');
  const leftItems = [agreementTerm, lockInPeriod].filter(Boolean);

  return (
    <div className="fd-agreement-details-layout grid min-h-[11rem] flex-1 grid-cols-2 gap-2.5 sm:gap-3">
      <div className="fd-agreement-details-layout__left flex min-h-0 flex-col gap-2.5">
        {leftItems.map((item) => (
          <AgreementDetailCard key={item.label} label={item.label} value={item.value} className="flex-1" />
        ))}
      </div>
      {currency && (
        <AgreementDetailCard
          label={currency.label}
          value={currency.value}
          className="fd-agreement-details-layout__currency h-full min-h-0"
        />
      )}
    </div>
  );
}

function FranchiseDetailsPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [brandHeaderStuck, setBrandHeaderStuck] = useState(false);
  const [brandHeaderHeight, setBrandHeaderHeight] = useState(0);
  const brandHeaderRef = useRef(null);
  const brandHeaderSentinelRef = useRef(null);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(getSelectedFranchiseId);
  const selectedFranchise = useMemo(
    () => getFranchiseDetailById(selectedFranchiseId),
    [selectedFranchiseId]
  );

  const franchiseOpportunityTitle = useMemo(
    () => `${selectedFranchise?.name ?? ''} FRANCHISE OPPORTUNITY`.trim(),
    [selectedFranchise?.name],
  );

  const franchiseTitleSingleLine = franchiseOpportunityTitle.length <= 34;

  const galleryImages = useMemo(
    () => resolveDetailGalleryImages(selectedFranchise),
    [selectedFranchise]
  );

  const galleryImageFit = 'cover';

  const carouselCategory = useMemo(
    () => getCarouselCategory(selectedFranchise?.industry),
    [selectedFranchise?.industry]
  );

  const similarFranchises = useMemo(
    () => getSimilarFranchiseDetails(selectedFranchiseId, 3),
    [selectedFranchiseId],
  );

  useEffect(() => {
    restoreScrollWithRetry(0);
  }, [selectedFranchiseId]);

  useEffect(() => {
    const syncFromLocation = () => {
      canonicalizeFranchiseUrl();
      setSelectedFranchiseId(getSelectedFranchiseId());
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener(NAVIGATE_EVENT, syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener(NAVIGATE_EVENT, syncFromLocation);
    };
  }, []);

  useEffect(() => {
    const sentinel = brandHeaderSentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isStuck = !entry.isIntersecting;
        if (isStuck && brandHeaderRef.current) {
          setBrandHeaderHeight(brandHeaderRef.current.offsetHeight);
        }
        setBrandHeaderStuck(isStuck);
      },
      { root: null, rootMargin: '-64px 0px 0px 0px', threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [selectedFranchiseId]);

  useEffect(() => {
    const header = brandHeaderRef.current;
    if (!header) return undefined;

    const updateHeight = () => setBrandHeaderHeight(header.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [selectedFranchiseId]);

  const handleRelatedDetails = (id) => {
    const nextId = String(id);
    setSelectedFranchiseId(nextId);
    navigateTo(getFranchiseDetailPath(nextId));
  };

  if (!selectedFranchise) {
    return (
      <main className={`franchise-details-page py-10 sm:py-12 lg:py-14 ${FRANCHISE_DETAILS_SHELL}`}>
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Franchise not found</h1>
          <p className="mt-2 text-sm text-slate-600">This franchise opportunity is unavailable or the link may be incorrect.</p>
          <button
            type="button"
            onClick={() => navigateTo('/franchise-opportunities')}
            className="btn-purple-solid mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          >
            Browse opportunities
          </button>
        </div>
      </main>
    );
  }

  const scrollToInquiryForm = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      document.getElementById('fd-sticky-inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setInquiryOpen(true);
  };

  return (
    <main
      className="franchise-details-page pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-0"
      style={{ '--fd-brand-header-height': `${brandHeaderHeight || 76}px` }}
    >
      <FranchiseInquiryLauncher
        franchise={{ id: selectedFranchise.id, name: selectedFranchise.name, logo: selectedFranchise.logo }}
        franchiseStructure={selectedFranchise.franchiseStructure}
        className="fd-inquiry-side-rail"
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        hideOnDesktop
        hideSideRail
      />
      <div className="fd-page-body">
        <div ref={brandHeaderSentinelRef} className="fd-brand-header-sentinel h-px w-full" aria-hidden="true" />
        {brandHeaderStuck ? (
          <div
            className="fd-brand-header-placeholder"
            style={{ height: brandHeaderHeight }}
            aria-hidden="true"
          />
        ) : null}
        <div
          ref={brandHeaderRef}
          className={`fd-brand-header-bar mx-6 rounded-2xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.06)] sm:mx-10 md:mx-14 lg:mx-0 lg:w-full lg:rounded-none lg:border-x-0 lg:border-t-0${
            brandHeaderStuck ? ' fd-brand-header-bar--stuck' : ''
          }`}
        >
          <div className={`fd-brand-header-inner ${FRANCHISE_DETAILS_SHELL} py-5 lg:py-3`}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
              {/* Left: name + status badges */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-2.5">
                {selectedFranchise.logo ? (
                  <img
                    src={selectedFranchise.logo}
                    alt={franchiseBrandAlt(selectedFranchise.name, selectedFranchise.industry)}
                    decoding="async"
                    loading="eager"
                    className="h-10 w-auto max-w-[120px] shrink-0 object-contain sm:h-11 lg:h-10"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <p className={`fd-copy fd-heading fd-brand-header-title ${heroDisplayClass(true)}`}>{selectedFranchise.name}</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 lg:text-[0.8125rem]">{selectedFranchise.status}</span>
              </div>

              <div
                className={`grid w-full gap-2 sm:flex sm:w-auto sm:gap-3 ${selectedFranchise.brochureUrl ? 'grid-cols-2' : 'grid-cols-1'}`}
              >
                <button
                  type="button"
                  onClick={scrollToInquiryForm}
                  className="btn-purple-solid inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg px-2 py-2.5 text-[0.625rem] font-semibold leading-none tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm lg:px-5 lg:py-2.5 lg:text-sm"
                >
                  Connect With Franchise Experts
                </button>
                {selectedFranchise.brochureUrl ? (
                  <BrochureDownloadButton
                    franchise={{
                      id: selectedFranchise.id,
                      name: selectedFranchise.name,
                      slug: selectedFranchise.slug,
                    }}
                    brochureUrl={selectedFranchise.brochureUrl}
                    className="btn-purple-solid group inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg px-2 py-2.5 text-[0.625rem] font-semibold leading-none tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm lg:px-5 lg:py-2.5 lg:text-sm"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-6 space-y-8 sm:mt-8 ${FRANCHISE_DETAILS_SHELL}`}>
        <section className="space-y-6">
          {/* Key details (left) + gallery (right) */}
          <div className="fd-hero-split overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            <div className="fd-hero-split-grid grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:grid-cols-[minmax(300px,42%)_minmax(0,1fr)] lg:items-stretch">
              <div className="fd-hero-story flex flex-col justify-center gap-3 border-b border-slate-200 p-5 sm:p-6 lg:gap-3.5 lg:border-b-0 lg:border-r lg:py-6 lg:pl-6 lg:pr-5 xl:py-7">
                <div className="min-w-0 text-center lg:text-left">
                  <h1
                    className={`fd-hero-story-title fd-heading mt-0 font-bold leading-snug tracking-tight ${
                      franchiseTitleSingleLine
                        ? 'text-[clamp(1.1875rem,3.8vw,1.5625rem)] whitespace-nowrap'
                        : 'text-[clamp(0.8125rem,2.4vw,1.0625rem)] text-balance break-words'
                    }`}
                  >
                    {franchiseOpportunityTitle}
                  </h1>
                  <p className="fd-hero-story-highlights fd-heading mt-1 text-base font-bold leading-snug sm:text-lg lg:text-[1.05rem] xl:text-lg">
                    Highlights
                  </p>
                </div>

                <FranchiseStatGrid franchise={selectedFranchise} className="fd-hero-metrics w-full" />
              </div>

              <div
                className="fd-hero-gallery relative min-h-[min(56vw,360px)] bg-slate-100 sm:min-h-[380px] lg:min-h-[460px] lg:h-full xl:min-h-[500px]"
                style={
                  selectedFranchise.cardBackground
                    ? { backgroundColor: selectedFranchise.cardBackground }
                    : undefined
                }
              >
                <ImageCarousel
                  key={selectedFranchiseId}
                  images={galleryImages}
                  alt={franchiseBrandAlt(selectedFranchise.name, selectedFranchise.industry)}
                  category={carouselCategory}
                  brandAssetsOnly
                  showThumbnails={false}
                  fillParent
                  preloadAll
                  imageFit={galleryImageFit}
                  imageSizes="(max-width: 1023px) 100vw, 62vw"
                  galleryBackground={selectedFranchise.cardBackground}
                  className="absolute inset-0 z-0 h-full w-full"
                  heightClassName="h-full min-h-[min(56vw,360px)] w-full sm:min-h-[380px] lg:min-h-[460px] xl:min-h-[500px]"
                />
              </div>
            </div>
          </div>

          <div className="fd-sticky-form-region">
              <div className="fd-sticky-form-region__main space-y-6">
                <section
                  className="fd-about-section rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7"
                  aria-labelledby={`fd-about-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                >
                  <AboutBrandSection franchise={selectedFranchise} />
                </section>

                <section
                  className="fd-about-section rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7"
                  aria-labelledby={`fd-investment-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                >
                  <h2
                    id={`fd-investment-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                    className={`fd-section-heading fd-heading fd-copy ${TYPE.h3}`}
                  >
                    Investment Overview
                  </h2>
                  <div className="fd-section-body mt-5">
                    <InvestmentOverviewList
                      items={selectedFranchise.investorInvestment || selectedFranchise.investmentDetails}
                      franchiseStructure={selectedFranchise.franchiseStructure}
                      models={selectedFranchise.franchiseModels}
                      space={selectedFranchise.keyInfo?.space}
                      payback={selectedFranchise.keyInfo?.payback}
                      lockIn={
                        selectedFranchise.agreementDetails?.find(
                          (item) => item.label === 'Lock-in Period',
                        )?.value
                      }
                    />
                  </div>
                </section>

                <section
                  className="fd-about-section rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7"
                  aria-labelledby={`fd-support-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                >
                  <h2
                    id={`fd-support-${selectedFranchise.slug || selectedFranchise.id}-heading`}
                    className={`fd-section-heading fd-heading fd-copy ${TYPE.h3}`}
                  >
                    Brand & Partner Support
                  </h2>
                  <div className="fd-section-body mt-5">
                    <BrandSupportList
                      items={selectedFranchise.trainingSupport}
                      fallback={selectedFranchise.idealInvestorProfile}
                    />
                  </div>
                </section>
              </div>

              <aside className="fd-sticky-form-region__aside hidden lg:block" aria-label="Franchise enquiry form">
                <FranchiseInquiryStickyPanel
                  franchise={{
                    id: selectedFranchise.id,
                    name: selectedFranchise.name,
                    logo: selectedFranchise.logo,
                  }}
                  franchiseStructure={selectedFranchise.franchiseStructure}
                />
              </aside>
            </div>

          <section className="fd-similar-section rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className={`fd-copy fd-heading ${TYPE.subsection}`}>Explore Similar Opportunities</h3>
                <p className="fd-copy mt-1 text-sm text-slate-600">
                  Other brands in a similar category and investment range. Tap a card to view full details.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarFranchises.map((franchise) => (
                <article
                  key={franchise.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => handleRelatedDetails(franchise.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRelatedDetails(franchise.id);
                    }
                  }}
                  className="fd-similar-card group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <FranchiseSimilarCardImage
                      franchise={franchise}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                      {franchise.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className={`fd-copy ${TYPE.cardTitle}`}>{franchise.name}</h4>
                    <p className="fd-copy mt-2 line-clamp-3 text-sm leading-relaxed">{franchise.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="fd-similar-badge rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {franchise.keyInfo.investment}
                      </span>
                      <span className="fd-similar-badge fd-copy rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                        {franchise.franchiseModels[0]?.name || 'FOFO'}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="fd-similar-stat fd-tab-surface-card rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                        <p className="fd-tab-surface-label fd-copy text-xs font-medium">ROI</p>
                        <p className="fd-copy fd-body-text text-lg">{franchise.keyInfo.roi}</p>
                      </div>
                      <div className="fd-similar-stat fd-tab-surface-card rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                        <p className="fd-tab-surface-label fd-copy text-xs font-medium">Payback</p>
                        <p className="fd-copy fd-body-text text-lg">{franchise.keyInfo.payback}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRelatedDetails(franchise.id);
                      }}
                      className="btn-purple-solid mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
        </div>
      </div>
    </main>
  );
}

export default FranchiseDetailsPage;
