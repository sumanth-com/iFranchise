import { useEffect, useMemo, useState } from 'react';
import { franchiseOpportunities } from '../data/franchiseData';
import { useFranchiseOpportunityNavbarFilters } from '../context/FranchiseOpportunityNavbarFiltersContext';
import { matchesNavbarFilters } from '../lib/franchiseNavbarFilters';
import { navigateTo } from '@/lib/navigation';
import { TYPE } from '../lib/typography.js';
import { FRANCHISE_OPPORTUNITIES_SHELL } from '../lib/franchiseOpportunitiesShell.js';

// Use centralized data source
const opportunities = franchiseOpportunities;

const INDUSTRY_OPTIONS = ['Food & Beverage', 'Retail', 'Health & Wellness', 'Home Services', 'Technology', 'Education', 'Entertainment'];
const INVESTMENT_OPTIONS = ['Under $50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000 - $500,000', 'Over $500,000'];
const MODEL_OPTIONS = ['FOCO', 'FOFO', 'FICO'];
const INDIAN_CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh',
];

const parseInvestmentValue = (investmentLabel) => {
  const cleaned = investmentLabel.replace(/[$,]/g, '');
  const numbers = cleaned.match(/\d+/g)?.map(Number) || [];
  return numbers.length ? Math.min(...numbers) : Number.POSITIVE_INFINITY;
};

function FilterSelect({ label, value, onChange, children, className = '', compact = false }) {
  return (
    <div className={className}>
      <label
        className={
          compact
            ? 'mb-1 block text-xs font-semibold text-white'
            : 'mb-2 block text-sm font-semibold text-white'
        }
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="fo-filter-select w-full rounded-lg border border-violet-500/30 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-violet-400 focus:ring-2 focus:ring-violet-500 transition-all"
      >
        {children}
      </select>
    </div>
  );
}

const parseSelectedRange = (selectedRange) => {
  switch (selectedRange) {
    case 'Under $50,000':
      return { min: 0, max: 50000 };
    case '$50,000 - $100,000':
      return { min: 50000, max: 100000 };
    case '$100,000 - $250,000':
      return { min: 100000, max: 250000 };
    case '$250,000 - $500,000':
      return { min: 250000, max: 500000 };
    case 'Over $500,000':
      return { min: 500000, max: Number.POSITIVE_INFINITY };
    default:
      return null;
  }
};

// Skeleton Loading Component
function OpportunityCardSkeleton() {
  return (
    <article className="card-premium-dark rounded-xl overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 bg-violet-950/60 animate-pulse"></div>
      
      {/* Content Skeleton */}
      <div className="p-5">
        {/* Category Skeleton */}
        <div className="h-3 bg-violet-900/40 rounded w-16 mb-2 animate-pulse"></div>
        
        {/* Brand Name Skeleton */}
        <div className="h-6 bg-violet-900/40 rounded w-3/4 mb-3 animate-pulse"></div>

        {/* Info Section Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <div className="h-4 bg-violet-900/40 rounded w-20 mr-2 animate-pulse"></div>
            <div className="h-4 bg-violet-900/40 rounded w-24 animate-pulse"></div>
          </div>
          <div className="flex items-center text-sm">
            <div className="h-4 bg-violet-900/40 rounded w-20 mr-2 animate-pulse"></div>
            <div className="h-4 bg-violet-900/40 rounded w-16 animate-pulse"></div>
          </div>
          <div className="flex items-center text-sm">
            <div className="h-4 bg-violet-900/40 rounded w-20 mr-2 animate-pulse"></div>
            <div className="h-4 bg-violet-900/40 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* ROI Badge Skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-violet-900/40 rounded-full w-16 animate-pulse"></div>
        </div>

        {/* CTA Button Skeleton */}
        <div className="h-10 bg-violet-900/40 rounded-lg animate-pulse"></div>
      </div>
    </article>
  );
}

function getModelPill(model) {
  if (model === 'FOCO') {
    return {
      label: 'Passive',
      className: 'bg-violet-500/25 text-violet-100 border border-violet-400/35',
    };
  }
  if (model === 'FOFO') {
    return {
      label: 'Owner-Op',
      className: 'bg-emerald-500/25 text-emerald-100 border border-emerald-400/35',
    };
  }
  return {
    label: 'Hybrid',
    className: 'bg-violet-500/25 text-violet-100 border border-violet-400/35',
  };
}

// Opportunity Card Component
function OpportunityCard({ opportunity }) {
  const handleViewDetails = () => {
    navigateTo(`/franchise-details?id=${opportunity.id}`);
  };

  const modelPill = getModelPill(opportunity.model);
  const brandBg = opportunity.cardBackground || '#12082a';
  const brandAccent = opportunity.cardAccent || brandBg;

  return (
    <article
      onClick={handleViewDetails}
      className="fo-opportunity-card card-premium-dark group cursor-pointer overflow-hidden rounded-xl"
      style={{
        '--fo-card-bg': brandBg,
        '--fo-card-accent': brandAccent,
      }}
    >
      <div
        className={`fo-opportunity-card__media relative w-full overflow-hidden ${
          opportunity.cardFit === 'contain' ? 'h-56' : 'h-52'
        }`}
      >
        <img
          src={opportunity.logo || opportunity.image}
          alt={opportunity.brandName}
          className={
            opportunity.cardFit === 'contain'
              ? 'fo-opportunity-card__img fo-opportunity-card__img--contain'
              : 'fo-opportunity-card__img fo-opportunity-card__img--fill'
          }
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.onerror = null;
            const fallbackImages = {
              'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
              'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
              'Home Services': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
              'Education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
              'Technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
              'Retail': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
              'Entertainment': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
            };
            e.target.src = fallbackImages[opportunity.category] || opportunity.image;
          }}
        />
        <div className="fo-opportunity-card__sheen pointer-events-none" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="text-xs text-white/90 font-medium mb-1">{opportunity.category}</div>
        
        {/* Brand Name */}
        <h3 className="text-lg font-bold text-white mb-3">{opportunity.brandName}</h3>

        {/* Info Section */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white">Investment:</span>
              <span className="font-semibold text-white ml-2">{opportunity.investment}</span>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <svg className="w-4 h-4 text-white mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-white">Model:</span>
            <span className="font-semibold text-white ml-2">{opportunity.model}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white">Locations:</span>
            <span className="font-semibold text-white ml-2">{opportunity.locations}</span>
          </div>
        </div>

        {/* Model + ROI pills — single row */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${modelPill.className}`}
          >
            {modelPill.label}
          </span>
          <span className="inline-flex items-center rounded-full border border-emerald-400/35 bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-100">
            {opportunity.roi} ROI
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="btn-purple-solid w-full rounded-lg border-none py-2 px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisible = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-1 mt-8">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm text-white hover:text-white disabled:text-white/35 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-sm text-white hover:text-white"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-white">...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${
            page === currentPage
              ? 'bg-violet-600 text-white'
              : 'text-white hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-white">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-sm text-white hover:text-white"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-white hover:text-white disabled:text-white/35 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

function FilterFields({ filters, setFilters, onChange, variant = 'stacked' }) {
  const update = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    onChange?.();
  };

  const isToolbar = variant === 'toolbar';
  const wrapClass = isToolbar
    ? 'grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'
    : 'space-y-4';

  return (
    <div className={wrapClass}>
      <FilterSelect
        compact={isToolbar}
        label="Industry"
        value={filters.industry}
        onChange={(industry) => update({ industry })}
      >
        <option value="">All industries</option>
        {INDUSTRY_OPTIONS.map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        compact={isToolbar}
        label="Investment range"
        value={filters.investment}
        onChange={(investment) => update({ investment })}
      >
        <option value="">All investment ranges</option>
        {INVESTMENT_OPTIONS.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        compact={isToolbar}
        label="Operating model"
        value={filters.model}
        onChange={(model) => update({ model })}
      >
        <option value="">All models</option>
        {MODEL_OPTIONS.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        compact={isToolbar}
        label="Location"
        value={filters.location}
        onChange={(location) => update({ location })}
      >
        <option value="">All locations</option>
        {INDIAN_CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </FilterSelect>
    </div>
  );
}

function FilterToolbar({
  filters,
  setFilters,
  sortBy,
  onSort,
  onClearAll,
  onFilterChange,
}) {
  return (
    <div className="card-premium-dark rounded-xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
        <FilterFields
          variant="toolbar"
          filters={filters}
          setFilters={setFilters}
          onChange={onFilterChange}
        />
        <div className="flex shrink-0 flex-wrap items-end gap-2 sm:gap-3 lg:pb-0.5">
          <button
            type="button"
            onClick={onClearAll}
            className="rounded-lg border border-violet-400/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-violet-300/60"
          >
            Clear All
          </button>
          <div className="min-w-[9.5rem] flex-1 sm:flex-none sm:w-40 lg:w-44">
            <label className="mb-1 block text-xs font-semibold text-white lg:sr-only">Sort by</label>
            <select
              value={sortBy}
              onChange={onSort}
              className="fo-toolbar-field w-full rounded-lg border px-3 py-2.5 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-500 transition-all"
            >
              <option value="newest">Newest Added</option>
              <option value="roi">High ROI</option>
              <option value="investment">Low Investment</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveFilterChips({ filters, setFilters }) {
  const hasFilters = Boolean(
    filters.industry || filters.investment || filters.model || filters.location
  );
  if (!hasFilters) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.industry && (
        <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/40 bg-violet-500/20 px-3 py-1 text-sm text-white">
          {filters.industry}
          <button type="button" onClick={() => setFilters({ ...filters, industry: '' })} className="ml-1">
            ×
          </button>
        </span>
      )}
      {filters.investment && (
        <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/40 bg-violet-500/20 px-3 py-1 text-sm text-white">
          {filters.investment}
          <button type="button" onClick={() => setFilters({ ...filters, investment: '' })} className="ml-1">
            ×
          </button>
        </span>
      )}
      {filters.model && (
        <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/40 bg-violet-500/20 px-3 py-1 text-sm text-white">
          {filters.model}
          <button type="button" onClick={() => setFilters({ ...filters, model: '' })} className="ml-1">
            ×
          </button>
        </span>
      )}
      {filters.location && (
        <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/40 bg-violet-500/20 px-3 py-1 text-sm text-white">
          {filters.location}
          <button type="button" onClick={() => setFilters({ ...filters, location: '' })} className="ml-1">
            ×
          </button>
        </span>
      )}
    </div>
  );
}

// Main Opportunities Page Component
function FranchiseOpportunitiesPage() {
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    industry: '',
    investment: '',
    model: '',
    location: '',
  });

  const {
    brands: navBrands,
    investmentBucketKeys: navInvestKeys,
    locations: navLocations,
    franchiseModels: navModels,
    clearNavbarFilters,
  } = useFranchiseOpportunityNavbarFilters();

  const navbarFilterSnapshot = useMemo(
    () => ({
      brands: navBrands,
      investmentBucketKeys: navInvestKeys,
      locations: navLocations,
      franchiseModels: navModels,
    }),
    [navBrands, navInvestKeys, navLocations, navModels]
  );
  
  const itemsPerPage = 6;
  const clearAllFilters = () => {
    clearNavbarFilters();
    setFilters({
      industry: '',
      investment: '',
      model: '',
      location: '',
    });
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, navBrands, navInvestKeys, navLocations, navModels]);

  const filteredAndSortedOpportunities = useMemo(() => {
    const investmentRange = parseSelectedRange(filters.investment);

    const filtered = opportunities.filter((opportunity) => {
      const matchesIndustry = !filters.industry || opportunity.industry === filters.industry;

      const matchesInvestment =
        !investmentRange ||
        (opportunity.minInvestment <= investmentRange.max &&
          opportunity.maxInvestment >= investmentRange.min);

      const oppModels = opportunity.models?.length ? opportunity.models : [opportunity.model];
      const matchesModel = !filters.model || oppModels.includes(filters.model);

      const locationLower = filters.location.trim().toLowerCase();
      const cityHaystack = `${opportunity.locations} ${(opportunity.cities || []).join(' ')}`.toLowerCase();
      const matchesLocation = !locationLower || cityHaystack.includes(locationLower);

      const matchesNavbar = matchesNavbarFilters(opportunity, navbarFilterSnapshot);

      return matchesIndustry && matchesInvestment && matchesModel && matchesLocation && matchesNavbar;
    });

    const sorted = [...filtered];
    if (sortBy === 'roi') {
      sorted.sort((a, b) => (b.roiValue ?? 0) - (a.roiValue ?? 0));
    } else if (sortBy === 'investment') {
      sorted.sort((a, b) => parseInvestmentValue(a.investment) - parseInvestmentValue(b.investment));
    } else {
      sorted.sort((a, b) => b.id - a.id);
    }

    return sorted;
  }, [sortBy, filters, navbarFilterSnapshot]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedOpportunities.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedOpportunities = filteredAndSortedOpportunities.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <main className="franchise-opportunities-page relative z-10 min-h-screen bg-transparent text-white">
      {/* Header */}
      <div className="border-b border-violet-500/25 bg-transparent">
        <div className={`${FRANCHISE_OPPORTUNITIES_SHELL} py-8 lg:py-10`}>
          <div className="max-w-3xl">
            <h1 className={`${TYPE.heroListing} text-white mb-2 sm:mb-3`}>Explore Franchise Opportunities</h1>
            <p className="text-base text-white sm:text-lg leading-relaxed">
              Browse our curated list of vetted franchise brands actively seeking expansion partners. Filter by your investment criteria to find the perfect match.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout — filters in top bar, full-width card grid */}
      <div className={`relative ${FRANCHISE_OPPORTUNITIES_SHELL} py-6 lg:py-8`}>
        <div className="pb-4 mb-2">
          <FilterToolbar
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            onSort={handleSort}
            onClearAll={() => {
              clearAllFilters();
              setCurrentPage(1);
            }}
            onFilterChange={() => setCurrentPage(1)}
          />
        </div>

        <ActiveFilterChips filters={filters} setFilters={setFilters} />

        <div className="mb-4">
          <p className="text-sm text-white">
            Showing <span className="font-semibold">{paginatedOpportunities.length}</span> of{' '}
            <span className="font-semibold">{filteredAndSortedOpportunities.length}</span> opportunities
            {totalPages > 1 && (
              <span>
                {' '}
                · Page <span className="font-semibold">{safeCurrentPage}</span> of{' '}
                <span className="font-semibold">{totalPages}</span>
              </span>
            )}
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7 xl:grid-cols-3 xl:gap-8">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <OpportunityCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : paginatedOpportunities.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-violet-500/25 bg-violet-950/20 py-16 px-6 text-center">
              <p className="text-base font-semibold text-white">No franchise opportunities found</p>
              <p className="mt-2 max-w-md text-sm text-white">
                Adjust filters above, use the Franchise Opportunities menu in the navbar, or choose Clear All.
              </p>
            </div>
          ) : (
            paginatedOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
          )}
        </div>

        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export default FranchiseOpportunitiesPage;
