import { useEffect, useMemo, useState } from 'react';
import { navigateTo } from '@/lib/navigation';
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
import { getCarouselCategory } from '../data/opportunities/brandImages';
import { FRANCHISE_DETAILS_SHELL } from '../lib/franchiseOpportunitiesShell.js';

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

function FranchiseDetailsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(getSelectedFranchiseId);
  const selectedFranchise = useMemo(
    () => getFranchiseDetailById(selectedFranchiseId),
    [selectedFranchiseId]
  );

  const galleryImages = useMemo(() => {
    const raw = selectedFranchise?.slideshow ?? selectedFranchise?.gallery ?? [];
    const list = Array.isArray(raw) ? raw.filter(Boolean) : [];
    const brandPhotos = list.filter((src) => src && src !== selectedFranchise?.logo);
    const slides = brandPhotos.length > 0 ? brandPhotos : list;
    return slides.slice(0, 10);
  }, [selectedFranchise]);

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

  useEffect(() => {
    const handleRouteUpdate = () => {
      setSelectedFranchiseId(getSelectedFranchiseId());
    };

    window.addEventListener('popstate', handleRouteUpdate);
    return () => {
      window.removeEventListener('popstate', handleRouteUpdate);
    };
  }, []);

  const handleRelatedDetails = (id) => {
    const detail = getFranchiseDetailById(id);
    if (detail?.slug) {
      navigateTo(`/franchise/${detail.slug}`);
      return;
    }
    navigateTo(`/franchise-details?id=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTabContent = () => {
    if (activeTab === 'Overview') {
      return <p className="fd-tab-body fd-copy text-base leading-relaxed">{selectedFranchise.overview}</p>;
    }
    if (activeTab === 'Business Model') {
      return <p className="fd-tab-body fd-copy text-base leading-relaxed">{selectedFranchise.businessModel}</p>;
    }
    if (activeTab === 'Investment Details') {
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {(selectedFranchise.investorInvestment || selectedFranchise.investmentDetails).map((item) => (
            <article key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="fd-copy text-sm">{item.label}</p>
              <p className="fd-copy fd-body-text mt-1 whitespace-pre-line text-lg">{item.value}</p>
            </article>
          ))}
        </div>
      );
    }
    if (activeTab === 'Locations') {
      return (
        <div className="flex flex-wrap gap-2">
          {selectedFranchise.locations.map((location) => (
            <span key={location} className="fd-copy rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium">
              {location}
            </span>
          ))}
        </div>
      );
    }
    if (activeTab === 'FAQ') {
      return (
        <div className="space-y-3">
          {selectedFranchise.faqs.map((item) => (
            <article key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
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
          <p className="fd-tab-body fd-copy text-sm font-semibold">5.0 · 4 reviews</p>
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
                    className="h-11 w-auto max-w-[140px] shrink-0 object-contain sm:h-12"
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
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
              <div className="fd-hero-story flex flex-col justify-center gap-4 border-b border-slate-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:py-8">
                <div className="text-center lg:text-left">
                  <p className="fd-hero-story-kicker fd-field-label text-[0.65rem] tracking-[0.14em]">
                    Opportunity highlights
                  </p>
                  <p className="fd-hero-story-title fd-heading mt-1.5 text-lg leading-snug sm:text-xl">
                    {selectedFranchise.name}
                  </p>
                </div>

                <FranchiseStatGrid franchise={selectedFranchise} className="fd-hero-metrics w-full" />

                <div className="flex flex-col gap-2 text-center lg:text-left">
                  {selectedFranchise.franchiseModels?.[0]?.name && (
                    <p className="fd-hero-story-muted fd-body-text text-xs sm:text-sm">
                      <span className="font-medium">Model:</span>{' '}
                      {selectedFranchise.franchiseModels.map((m) => m.name).join(' · ')}
                    </p>
                  )}
                  {selectedFranchise.locations?.length > 0 && (
                    <p className="fd-hero-story-muted fd-body-text text-xs leading-relaxed sm:text-sm">
                      <span className="font-medium">Expansion:</span>{' '}
                      {selectedFranchise.locations.slice(0, 4).join(' · ')}
                      {selectedFranchise.locations.length > 4 ? ' +' : ''}
                    </p>
                  )}
                </div>
              </div>

              <div className="fd-hero-gallery relative min-h-[280px] bg-slate-100 sm:min-h-[320px] lg:min-h-[420px]">
                <ImageCarousel
                  images={galleryImages}
                  alt={selectedFranchise.name}
                  category={carouselCategory}
                  showThumbnails={false}
                  fillParent
                  heightClassName="h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[420px]"
                />
              </div>
            </div>
          </div>

          <div className="fd-tabs-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
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
            <div className="fd-tab-content mt-6">{renderTabContent()}</div>
          </div>

          <section className="fd-about-section rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7">
            <DualSectionRow>
              <DualSectionPanel title={`About ${selectedFranchise.name}`}>
                <div className="flex min-h-0 flex-1 flex-col gap-4">
                  {selectedFranchise.tagline && (
                    <p className="fd-about-intro fd-body-text text-sm leading-snug">{selectedFranchise.tagline}</p>
                  )}
                  {selectedFranchise.overview && (
                    <p className="fd-copy fd-body-text text-sm leading-relaxed sm:text-base">{selectedFranchise.overview}</p>
                  )}
                  <div>
                    <p className="fd-about-block-title fd-field-label text-xs tracking-wide">
                      What this means for you
                    </p>
                    {selectedFranchise.whyChoose?.length > 0 ? (
                      <ul className="mt-2.5 space-y-2">
                        {selectedFranchise.whyChoose.slice(0, 3).map((item) => (
                          <li key={item.title} className="fd-copy fd-body-text text-sm leading-relaxed">
                            <span className="font-medium">{item.title}</span>
                            <span> — {item.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="fd-about-block-body mt-2 text-sm leading-relaxed">
                        {selectedFranchise.idealInvestorProfile ||
                          'Review investment figures on the right to see if this brand fits your goals and budget.'}
                      </p>
                    )}
                  </div>
                </div>
              </DualSectionPanel>

              <DualSectionPanel title="Investment & Financials">
                <div className="flex min-h-0 flex-1 flex-col gap-3">
                  <p className="fd-about-intro fd-body-text text-xs leading-relaxed">
                    Indicative figures from brand disclosure. Final numbers depend on city, format, and site.
                  </p>
                  <div className="fd-invest-grid grid grid-cols-2 gap-3">
                    {(selectedFranchise.investorInvestment || selectedFranchise.investmentDetails || [])
                      .slice(0, 4)
                      .map((item) => (
                        <article
                          key={item.label}
                          className="fd-stat-card fd-about-stat-card flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 py-3 text-center shadow-sm"
                        >
                          <p className="fd-copy fd-field-label w-full text-[0.65rem] tracking-[0.12em]">
                            {item.label}
                          </p>
                          <p className="fd-copy fd-body-text mt-1.5 w-full whitespace-pre-line text-sm leading-snug">
                            {item.value}
                          </p>
                        </article>
                      ))}
                  </div>
                  <p className="fd-copy fd-body-text mt-auto pt-1 text-[0.7rem] leading-relaxed">
                    {selectedFranchise.disclaimer}
                  </p>
                </div>
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
                <div className="flex flex-1 flex-col gap-2.5">
                  {selectedFranchise.agreementDetails.map((item) => (
                    <article key={item.label} className="fd-mini-card rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
                      <p className="fd-copy fd-field-label text-xs tracking-wide">{item.label}</p>
                      <p className="fd-copy fd-body-text mt-1 text-sm leading-relaxed">{item.value}</p>
                    </article>
                  ))}
                  <p className="fd-copy mt-auto pt-1 text-xs leading-relaxed">{selectedFranchise.disclaimer}</p>
                </div>
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
              <DualSectionPanel title="Expansion Plans">
                <div className="flex flex-1 flex-col gap-2.5">
                  {selectedFranchise.expansionPlans.map((plan) => (
                    <article key={plan} className="fd-mini-card rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
                      <p className="fd-copy fd-body-text text-sm">{plan}</p>
                    </article>
                  ))}
                </div>
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


          <FranchiseGetStartedSection />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className={`fd-copy fd-heading ${TYPE.subsection}`}>Explore Similar Opportunities</h3>
                <p className="fd-copy mt-1 text-sm text-slate-600">
                  Other brands in a similar category and investment range — tap a card to view full details.
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
