import { useEffect, useMemo, useRef, useState } from 'react';
import { navigateTo, NAVIGATE_EVENT } from '@/lib/navigation';
import { heroDisplayClass } from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';
import { FiStar } from 'react-icons/fi';
import ImageCarousel from './ImageCarousel';
import FranchiseGetStartedSection from './FranchiseGetStartedSection';
import BrochureDownloadButton from './BrochureDownloadButton';
import FranchiseSimilarCardImage from './FranchiseSimilarCardImage';
import {
  franchiseSlugToId,
  getFranchiseDetailById,
  getSimilarFranchiseDetails,
} from '../data/franchiseData';
import { getCarouselCategory, resolveDetailGalleryImages } from '../data/opportunities/brandImages';
import { FRANCHISE_DETAILS_SHELL } from '../lib/franchiseOpportunitiesShell.js';
import FranchiseLocationsPanel from './franchise/FranchiseLocationsPanel';

const tabs = ['Overview', 'Business Model', 'Investment Details', 'Locations', 'FAQ', 'Reviews'];

const getSelectedFranchiseId = () => {
  const pathname = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const idFromQuery = params.get('id');

  if (idFromQuery) {
    return idFromQuery;
  }

  if (pathname.startsWith('/franchise/')) {
    const slug = pathname.replace('/franchise/', '').trim().toLowerCase();
    if (franchiseSlugToId[slug]) {
      return franchiseSlugToId[slug];
    }
  }

  return '1';
};

const FRANCHISE_STAT_ITEMS = [
  { label: 'Investment', key: 'investment' },
  { label: 'Space (Sq.ft)', key: 'space' },
  { label: 'ROI', key: 'roi' },
  { label: 'Payback', key: 'payback' },
  { label: 'Outlets', key: 'outlets' },
];

function formatMetricDisplay(key, value) {
  const text = String(value ?? '');
  if (key !== 'space') return text;
  if (text.includes('\n')) return text.trim();
  return text
    .replace(/\s*\/\s*/g, '\n')
    .replace(/\s+(?=(?:PREMIUM|BREW|CLASSIC|TIER))/gi, '\n')
    .replace(/\n+/g, '\n')
    .trim();
}

/** Same stat cards as About section (right column on detail page). */
function FranchiseStatGrid({ franchise, className = '' }) {
  return (
    <div className={`fd-about-stats grid grid-cols-2 gap-3 ${className}`.trim()}>
      {FRANCHISE_STAT_ITEMS.map((item) => {
        const value = formatMetricDisplay(item.key, franchise.keyInfo[item.key]);
        const isOutlets = item.key === 'outlets';
        const isSpace = item.key === 'space';
        return (
          <article
            key={item.key}
            className={`fd-stat-card fd-about-stat-card flex min-h-[92px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm${
              isOutlets ? ' col-span-2' : ''
            }`}
          >
            <p className="fd-copy fd-field-label w-full text-[0.65rem] tracking-[0.12em]">
              {item.label}
            </p>
            <p
              className={`fd-copy fd-body-text mt-1.5 w-full leading-tight ${
                isSpace ? 'whitespace-pre-line text-sm leading-snug sm:text-base' : 'text-base sm:text-lg'
              }`}
            >
              {value}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function StarRating({ rating, max = 5 }) {
  const safeRating = Math.min(max, Math.max(0, Number(rating) || 0));
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${safeRating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <FiStar
          key={i}
          className={`h-4 w-4 ${i < safeRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

function DualSectionRow({ children }) {
  return (
    <div className="fd-dual-row grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
      {children}
    </div>
  );
}

function DualSectionPanel({ title, children }) {
  return (
    <article className="fd-dual-panel flex h-full min-h-0 flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-6 lg:p-7">
      <div className="fd-dual-panel-header shrink-0 border-b border-slate-100 pb-4">
        <h3 className={`fd-dual-panel-title fd-heading fd-copy ${TYPE.h3}`}>{title}</h3>
      </div>
      <div className="fd-dual-panel-body mt-5 flex min-h-0 flex-1 flex-col">{children}</div>
    </article>
  );
}

function BrandSupportList({ items, fallback }) {
  if (!items?.length) {
    return fallback ? (
      <p className="fd-copy fd-body-text text-sm leading-relaxed sm:leading-7">{fallback}</p>
    ) : null;
  }

  return (
    <ul className="fd-support-list flex min-h-0 flex-1 flex-col justify-center gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="fd-support-item fd-mini-card flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 sm:py-4"
        >
          <span
            className="fd-support-check flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700"
            aria-hidden
          >
            ✓
          </span>
          <p className="fd-copy min-w-0 flex-1 text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-6">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}

function BrandInsightsList({ insights, limit = 3, fallback }) {
  const displayInsights = (insights || []).slice(0, limit);
  if (!displayInsights.length) {
    return fallback ? (
      <p className="fd-copy fd-body-text text-sm leading-relaxed sm:leading-7">{fallback}</p>
    ) : null;
  }

  return (
    <div className="fd-insights-list flex min-h-0 flex-1 flex-col gap-3">
      {displayInsights.map((insight) => (
        <article
          key={insight.title}
          className="fd-insight-card fd-mini-card flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-center sm:px-5 sm:py-5"
        >
          <p className="fd-copy fd-field-label text-[0.65rem] tracking-[0.12em]">{insight.title}</p>
          <p className="fd-copy fd-body-text mt-2 text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-7">
            {insight.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function InvestmentFinancialsGrid({ items, limit = 4 }) {
  const displayItems = (items || []).slice(0, limit);

  return (
    <div className="fd-invest-financials flex min-h-0 flex-1 flex-col">
      <p className="fd-invest-intro fd-copy text-xs leading-relaxed sm:text-sm">
        Indicative figures from brand disclosure. Final numbers depend on city, format, and site.
      </p>
      <div className="fd-invest-grid mt-4 grid flex-1 grid-cols-2 gap-3 sm:gap-3.5">
        {displayItems.map((item) => (
          <article
            key={item.label}
            className="fd-invest-card fd-stat-card fd-about-stat-card flex min-h-[6.75rem] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm sm:min-h-[7.25rem] sm:px-3.5"
          >
            <p className="fd-copy fd-field-label w-full text-[0.65rem] tracking-[0.12em]">{item.label}</p>
            <p className="fd-copy fd-body-text mt-2 w-full whitespace-pre-line text-sm font-medium leading-snug">
              {item.value}
            </p>
          </article>
        ))}
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState('Overview');
  const tabsPanelRef = useRef(null);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(getSelectedFranchiseId);
  const selectedFranchise = useMemo(
    () => getFranchiseDetailById(selectedFranchiseId),
    [selectedFranchiseId]
  );

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
    setActiveTab('Overview');
  }, [selectedFranchiseId]);

  const skipInitialTabScroll = useRef(true);
  useEffect(() => {
    if (skipInitialTabScroll.current) {
      skipInitialTabScroll.current = false;
      return;
    }
    tabsPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab]);

  useEffect(() => {
    const syncFromLocation = () => {
      setSelectedFranchiseId(getSelectedFranchiseId());
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener(NAVIGATE_EVENT, syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener(NAVIGATE_EVENT, syncFromLocation);
    };
  }, []);

  const handleRelatedDetails = (id) => {
    const nextId = String(id);
    setSelectedFranchiseId(nextId);

    const detail = getFranchiseDetailById(nextId);
    if (detail?.slug) {
      navigateTo(`/franchise/${detail.slug}`);
    } else {
      navigateTo(`/franchise-details?id=${nextId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOverviewTab = activeTab === 'Overview';

  const renderTabContent = () => {
    if (activeTab === 'Business Model') {
      return (
        <div className="space-y-5">
          {selectedFranchise.businessModel && (
            <p className="fd-tab-body fd-copy text-base leading-relaxed">{selectedFranchise.businessModel}</p>
          )}
          <DualSectionRow>
            <DualSectionPanel title="Franchise Models">
              <div className="flex flex-1 flex-col gap-3">
                {selectedFranchise.franchiseModels.map((model) => (
                  <article key={model.name} className="fd-mini-card rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                    <p className="fd-copy fd-heading text-base">{model.name}</p>
                    <p className="fd-copy fd-body-text mt-1.5 text-sm leading-relaxed">{model.description}</p>
                  </article>
                ))}
              </div>
            </DualSectionPanel>
            <DualSectionPanel title="Agreement Details">
              <AgreementDetailsContent items={selectedFranchise.agreementDetails} />
            </DualSectionPanel>
          </DualSectionRow>
          <DualSectionPanel title="Franchise Structure">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {selectedFranchise.franchiseStructure.map((item) => (
                <article
                  key={item}
                  className="fd-mini-card flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-center"
                >
                  <p className="fd-copy fd-body-text text-sm">{item}</p>
                </article>
              ))}
            </div>
          </DualSectionPanel>
        </div>
      );
    }

    if (activeTab === 'Investment Details') {
      const investmentItems =
        selectedFranchise.investorInvestment || selectedFranchise.investmentDetails || [];
      return (
        <div className="space-y-5">
          <DualSectionPanel title="Investment & Financials">
            <InvestmentFinancialsGrid items={investmentItems} />
          </DualSectionPanel>
          <DualSectionPanel title="Operations & Returns">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'ROI', value: selectedFranchise.operationsReturns.roi },
                { label: 'Payback Period', value: selectedFranchise.operationsReturns.payback },
                { label: 'Hours Required', value: selectedFranchise.operationsReturns.hours },
                { label: 'Staff Requirement', value: selectedFranchise.operationsReturns.staff },
              ].map((metric) => (
                <article key={metric.label} className="fd-mini-card rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="fd-copy fd-field-label text-xs tracking-wide">{metric.label}</p>
                  <p className="fd-copy fd-body-text mt-1 text-sm">{metric.value}</p>
                </article>
              ))}
            </div>
          </DualSectionPanel>
        </div>
      );
    }

    if (activeTab === 'Locations') {
      const hasGroupedLocations = selectedFranchise.locationGroups?.length > 0;
      return (
        <div className="space-y-5">
          <DualSectionPanel title="Active & Target Locations">
            {hasGroupedLocations ? (
              <FranchiseLocationsPanel groups={selectedFranchise.locationGroups} />
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedFranchise.locations.map((location) => (
                  <span
                    key={location}
                    className="fd-copy rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium"
                  >
                    {location}
                  </span>
                ))}
              </div>
            )}
          </DualSectionPanel>
          <DualSectionPanel title="Market & Site Intelligence">
            <BrandInsightsList
              insights={selectedFranchise.aboutInsights}
              fallback={selectedFranchise.marketOpportunity || selectedFranchise.expansionVision}
            />
          </DualSectionPanel>
        </div>
      );
    }

    if (activeTab === 'FAQ') {
      return (
        <div className="space-y-3">
          {selectedFranchise.faqs.map((item) => (
            <article key={item.q} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <h4 className="fd-copy text-base font-semibold">{item.q}</h4>
              <p className="fd-tab-body fd-copy mt-2 text-sm leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === 'Reviews') {
      const reviews = (selectedFranchise.reviews || []).slice(0, 4);
      return (
        <div className="space-y-4">
          <div className="fd-reviews-summary flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <StarRating rating={5} />
            <p className="fd-tab-body fd-copy text-sm font-semibold">5.0 · {reviews.length} reviews</p>
            <span className="fd-copy text-xs">Verified partner feedback</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="fd-copy text-sm font-semibold">{review.name}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="fd-tab-body fd-copy mt-2 text-sm leading-relaxed">{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <main className={`franchise-details-page py-10 sm:py-12 lg:py-14 ${FRANCHISE_DETAILS_SHELL}`}>
      <div className="space-y-8">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)] lg:p-8">
            {/* Title row ? badges left, Download CTA right */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: name + status badges */}
              <div className="flex flex-wrap items-center gap-3">
                {selectedFranchise.logo ? (
                  <img
                    src={selectedFranchise.logo}
                    alt=""
                    decoding="async"
                    loading="eager"
                    className="h-11 w-auto max-w-[140px] shrink-0 object-contain sm:h-12"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <h1 className={`fd-copy fd-heading ${heroDisplayClass(true)}`}>{selectedFranchise.name}</h1>
                <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">{selectedFranchise.status}</span>
                <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">{selectedFranchise.badge}</span>
              </div>

              <BrochureDownloadButton
                franchise={{ id: selectedFranchise.id, name: selectedFranchise.name }}
                brochureUrl={selectedFranchise.brochureUrl}
              />
            </div>

          </div>

          {/* Key details (left) + gallery (right) */}
          <div className="fd-hero-split overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
            <div className="fd-hero-split-grid grid grid-cols-1 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:grid-cols-[minmax(280px,38%)_minmax(0,1fr)] lg:items-stretch">
              <div className="fd-hero-story flex flex-col justify-center gap-3 border-b border-slate-200 p-5 sm:p-6 lg:gap-3.5 lg:border-b-0 lg:border-r lg:py-6 lg:pl-6 lg:pr-5 xl:py-7">
                <div className="text-center lg:text-left">
                  <p className="fd-hero-story-kicker fd-field-label text-[0.65rem] tracking-[0.14em]">
                    Opportunity highlights
                  </p>
                  <p className="fd-hero-story-title fd-heading mt-1 text-base leading-snug sm:text-lg lg:text-[1.05rem] xl:text-lg">
                    {selectedFranchise.name}
                  </p>
                </div>

                <FranchiseStatGrid franchise={selectedFranchise} className="fd-hero-metrics w-full" />

                <div className="flex flex-col gap-1.5 text-center lg:text-left">
                  {selectedFranchise.franchiseModels?.[0]?.name && (
                    <p className="fd-hero-story-muted fd-body-text text-xs sm:text-sm">
                      <span className="font-medium">Model:</span>{' '}
                      {selectedFranchise.franchiseModels.map((m) => m.name).join(' · ')}
                    </p>
                  )}
                  {(selectedFranchise.locationsSummary ||
                    selectedFranchise.locations?.length > 0) && (
                    <p className="fd-hero-story-muted fd-body-text text-xs leading-relaxed sm:text-sm">
                      <span className="font-medium">Expansion:</span>{' '}
                      {selectedFranchise.locationsSummary ||
                        `${selectedFranchise.locations.slice(0, 4).join(' · ')}${
                          selectedFranchise.locations.length > 4 ? ' +' : ''
                        }`}
                    </p>
                  )}
                </div>
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
                  alt={selectedFranchise.name}
                  category={carouselCategory}
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

          <div
            ref={tabsPanelRef}
            className="fd-tabs-panel scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8"
          >
            <div className="fd-tabs flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`fd-tab-btn rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab ? 'fd-tab-btn--active btn-purple-solid' : 'fd-tab-btn--inactive'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="fd-tab-content mt-6">
              {isOverviewTab ? (
                <p className="fd-tab-body fd-copy text-base leading-relaxed">{selectedFranchise.overview}</p>
              ) : (
                renderTabContent()
              )}
            </div>
          </div>

          {isOverviewTab && (
          <>
          <section className="fd-about-section rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7">
            <DualSectionRow>
              <DualSectionPanel title={`About ${selectedFranchise.name}`}>
                <div className="fd-about-panel-body flex min-h-0 flex-1 flex-col gap-5">
                  {selectedFranchise.tagline && (
                    <p className="fd-about-tagline fd-copy text-sm font-semibold leading-snug sm:text-base">
                      {selectedFranchise.tagline}
                    </p>
                  )}
                  {selectedFranchise.overview && (
                    <p className="fd-about-description fd-copy text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-7">
                      {selectedFranchise.overview}
                    </p>
                  )}
                  <div className="fd-about-benefits">
                    <p className="fd-about-block-title fd-field-label text-[0.65rem] tracking-[0.12em]">
                      What this means for you
                    </p>
                    {selectedFranchise.whyChoose?.length > 0 ? (
                      <ul className="fd-about-benefits-list mt-3 space-y-3">
                        {selectedFranchise.whyChoose.slice(0, 3).map((item) => (
                          <li key={item.title} className="fd-copy text-sm leading-relaxed sm:leading-7">
                            <span className="font-semibold">{item.title}</span>
                            <span className="fd-about-benefit-desc">: {item.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="fd-about-block-body fd-copy mt-3 text-sm leading-relaxed sm:leading-7">
                        {selectedFranchise.idealInvestorProfile ||
                          'Review investment figures on the right to see if this brand fits your goals and budget.'}
                      </p>
                    )}
                  </div>
                </div>
              </DualSectionPanel>

              <DualSectionPanel title="Investment & Financials">
                <InvestmentFinancialsGrid
                  items={selectedFranchise.investorInvestment || selectedFranchise.investmentDetails}
                />
              </DualSectionPanel>
            </DualSectionRow>
          </section>

          <div className="fd-dual-sections space-y-5">
            <DualSectionRow>
              <DualSectionPanel title="Franchise Models">
                <div className="flex flex-1 flex-col gap-3">
                  {selectedFranchise.franchiseModels.map((model) => (
                    <article key={model.name} className="fd-mini-card rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                      <p className="fd-copy fd-heading text-base">{model.name}</p>
                      <p className="fd-copy fd-body-text mt-1.5 text-sm leading-relaxed">{model.description}</p>
                    </article>
                  ))}
                </div>
              </DualSectionPanel>
              <DualSectionPanel title="Agreement Details">
                <AgreementDetailsContent items={selectedFranchise.agreementDetails} />
              </DualSectionPanel>
            </DualSectionRow>

            <DualSectionRow>
              <DualSectionPanel title="Franchise Structure">
                <div className="grid flex-1 grid-cols-2 gap-3">
                  {selectedFranchise.franchiseStructure.map((item) => (
                    <article key={item} className="fd-mini-card flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                      <p className="fd-copy fd-body-text text-sm">{item}</p>
                    </article>
                  ))}
                </div>
              </DualSectionPanel>
              <DualSectionPanel title="Operations & Returns">
                <div className="grid flex-1 grid-cols-2 gap-3">
                  {[
                    { label: 'ROI', value: selectedFranchise.operationsReturns.roi },
                    { label: 'Payback Period', value: selectedFranchise.operationsReturns.payback },
                    { label: 'Hours Required', value: selectedFranchise.operationsReturns.hours },
                    { label: 'Staff Requirement', value: selectedFranchise.operationsReturns.staff },
                  ].map((metric) => (
                    <article key={metric.label} className="fd-mini-card rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                      <p className="fd-copy fd-field-label text-xs tracking-wide">{metric.label}</p>
                      <p className="fd-copy fd-body-text mt-1 text-sm">{metric.value}</p>
                    </article>
                  ))}
                </div>
              </DualSectionPanel>
            </DualSectionRow>

            <DualSectionRow>
              <DualSectionPanel title="Brand & Partner Support">
                <BrandSupportList
                  items={selectedFranchise.trainingSupport}
                  fallback={selectedFranchise.idealInvestorProfile}
                />
              </DualSectionPanel>
              <DualSectionPanel title="Requirements">
                <div className="flex flex-1 flex-col gap-2.5">
                  {selectedFranchise.requirements.map((item) => (
                    <article key={item.label} className="fd-mini-card rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
                      <p className="fd-copy fd-field-label text-xs tracking-wide">{item.label}</p>
                      <p className="fd-copy fd-body-text mt-1 text-sm leading-relaxed">{item.value}</p>
                    </article>
                  ))}
                </div>
              </DualSectionPanel>
            </DualSectionRow>

          </div>
          </>
          )}

          <FranchiseGetStartedSection />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
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
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
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
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {franchise.keyInfo.investment}
                      </span>
                      <span className="fd-copy rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                        {franchise.franchiseModels[0]?.name || 'FOFO'}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="fd-copy text-xs font-medium">ROI</p>
                        <p className="fd-copy fd-body-text text-lg">{franchise.keyInfo.roi}</p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="fd-copy text-xs font-medium">Payback</p>
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
    </main>
  );
}

export default FranchiseDetailsPage;
