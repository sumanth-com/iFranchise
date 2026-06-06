import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { franchiseOpportunities, pinFeaturedOpportunitiesFirst } from '../data/franchiseData';
import { INDIAN_CITIES, getLocationPath, parseLocationPathname } from '../data/opportunityLocations';
import { NAVIGATE_EVENT, navigateTo } from '../lib/navigation';
import { useFranchiseOpportunityNavbarFilters } from '../context/FranchiseOpportunityNavbarFiltersContext';
import {
  investmentInrRangeMatchesOpportunity,
  matchesNavbarFilters,
  PAGE_INVESTMENT_LABELS,
  parsePageInvestmentRange,
} from '../lib/franchiseNavbarFilters';
import { FRANCHISE_OPPORTUNITIES_SHELL } from '../lib/franchiseOpportunitiesShell.js';
import OpportunityCard from './OpportunityCard';
import FranchiseOpportunitiesHeader from './franchise-opportunities/FranchiseOpportunitiesHeader';
import FranchiseOpportunitiesWayWeWork from './franchise-opportunities/FranchiseOpportunitiesWayWeWork';

// Use centralized data source
const opportunities = franchiseOpportunities;

const INDUSTRY_OPTIONS = ['Food & Beverage', 'Retail', 'Health & Wellness', 'Home Services', 'Technology', 'Education', 'Entertainment'];
const MODEL_OPTIONS = ['FOCO', 'FOFO', 'FICO'];

const parseInvestmentValue = (investmentLabel) => {
  const cleaned = investmentLabel.replace(/[$,]/g, '');
  const numbers = cleaned.match(/\d+/g)?.map(Number) || [];
  return numbers.length ? Math.min(...numbers) : Number.POSITIVE_INFINITY;
};

function FilterSelect({ label, value, onChange, children, className = '', compact = false }) {
  return (
    <div className={`${compact ? 'fo-filter-field' : ''} ${className}`.trim()}>
      <label
        className={
          compact
            ? 'fo-filter-label fo-filter-label--compact mb-1 block text-xs font-semibold'
            : 'fo-filter-label mb-2 block text-sm font-semibold'
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
    <nav className="fo-pagination mt-8 flex items-center justify-center gap-1" aria-label="Franchise listings pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="fo-pagination-btn fo-pagination-btn--nav min-h-10 px-3 py-2 text-sm font-medium disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="fo-pagination-btn min-h-10 min-w-10 rounded-md px-3 py-2 text-sm font-semibold"
          >
            1
          </button>
          {startPage > 2 && <span className="fo-pagination-ellipsis px-2 text-sm font-medium">…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`fo-pagination-btn min-h-10 min-w-10 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
            page === currentPage ? 'fo-pagination-btn--active' : ''
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="fo-pagination-ellipsis px-2 text-sm font-medium">…</span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="fo-pagination-btn min-h-10 min-w-10 rounded-md px-3 py-2 text-sm font-semibold"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="fo-pagination-btn fo-pagination-btn--nav min-h-10 px-3 py-2 text-sm font-medium disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
}

function FilterFields({ filters, setFilters, onChange, onLocationChange, variant = 'stacked' }) {
  const update = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    onChange?.();
  };

  const handleLocationChange = (location) => {
    update({ location });
    onLocationChange?.(location);
  };

  const isToolbar = variant === 'toolbar';
  const wrapClass = isToolbar
    ? 'fo-filter-fields grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'
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
        {PAGE_INVESTMENT_LABELS.map((range) => (
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
        onChange={handleLocationChange}
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

function countActiveFilters(filters, navbarSnapshot) {
  let count = [filters.industry, filters.investment, filters.model, filters.location].filter(Boolean).length;
  count += navbarSnapshot.brands?.length ?? 0;
  count += navbarSnapshot.investmentBucketKeys?.length ?? 0;
  count += navbarSnapshot.locations?.length ?? 0;
  count += navbarSnapshot.franchiseModels?.length ?? 0;
  return count;
}

function FilterIcon() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

/** Compact bar + bottom sheet. mobile/tablet only (desktop toolbar unchanged below lg). */
function MobileFilterBar({
  filters,
  setFilters,
  sortBy,
  onSort,
  onClearAll,
  onFilterChange,
  onLocationChange,
  activeFilterCount,
  resultCount,
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const savedScrollRef = useRef(0);

  useEffect(() => {
    if (!sheetOpen) return undefined;

    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    savedScrollRef.current = currentScroll;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScroll}px`;
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';

    if (window.__lenis) window.__lenis.stop();

    return () => {
      const scrollY = savedScrollRef.current;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
      if (window.__lenis) {
        window.__lenis.start();
        window.__lenis.scrollTo(scrollY, { immediate: true });
      }
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [sheetOpen]);

  const closeSheet = () => setSheetOpen(false);

  const handleApply = () => {
    onFilterChange?.();
    closeSheet();
  };

  const handleClear = () => {
    onClearAll();
    onFilterChange?.();
  };

  return (
    <>
      <div className="fo-filter-mobile-bar card-premium-dark lg:hidden">
        <button
          type="button"
          className="fo-filter-mobile-trigger"
          onClick={() => setSheetOpen(true)}
          aria-expanded={sheetOpen}
          aria-haspopup="dialog"
        >
          <FilterIcon />
          <span className="fo-filter-mobile-trigger__label">Filters</span>
          {activeFilterCount > 0 && (
            <span className="fo-filter-mobile-badge" aria-label={`${activeFilterCount} active filters`}>
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="fo-filter-mobile-sort">
          <label htmlFor="fo-mobile-sort" className="sr-only">
            Sort by
          </label>
          <select
            id="fo-mobile-sort"
            value={sortBy}
            onChange={onSort}
            className="fo-filter-mobile-sort__select"
          >
            <option value="newest">Newest</option>
            <option value="roi">High ROI</option>
            <option value="investment">Low investment</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <div className="fo-filter-sheet-root lg:hidden" role="presentation">
            <motion.button
              type="button"
              className="fo-filter-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Close filters"
              onClick={closeSheet}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="fo-filter-sheet-title"
              className="fo-filter-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
              data-lenis-prevent
            >
              <div className="fo-filter-sheet__handle" aria-hidden />
              <header className="fo-filter-sheet__header">
                <div>
                  <h2 id="fo-filter-sheet-title" className="fo-filter-sheet__title">
                    Filters
                  </h2>
                  <p className="fo-filter-sheet__subtitle">
                    {resultCount} {resultCount === 1 ? 'opportunity' : 'opportunities'} match
                  </p>
                </div>
                <button
                  type="button"
                  className="fo-filter-sheet__close"
                  onClick={closeSheet}
                  aria-label="Close filters"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </header>

              <div className="fo-filter-sheet__body">
                <FilterFields
                  variant="stacked"
                  filters={filters}
                  setFilters={setFilters}
                  onChange={onFilterChange}
                  onLocationChange={onLocationChange}
                />
              </div>

              <footer className="fo-filter-sheet__footer">
                <button type="button" className="fo-filter-sheet__clear" onClick={handleClear}>
                  Clear all
                </button>
                <button type="button" className="fo-filter-sheet__apply" onClick={handleApply}>
                  Show results
                </button>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterToolbar({
  filters,
  setFilters,
  sortBy,
  onSort,
  onClearAll,
  onFilterChange,
  onLocationChange,
  activeFilterCount,
  resultCount,
}) {
  return (
    <>
      <MobileFilterBar
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        onSort={onSort}
        onClearAll={onClearAll}
        onFilterChange={onFilterChange}
        onLocationChange={onLocationChange}
        activeFilterCount={activeFilterCount}
        resultCount={resultCount}
      />

      <div className="fo-filter-toolbar fo-filter-toolbar--desktop card-premium-dark hidden rounded-xl p-4 lg:block">
        <div className="fo-filter-toolbar__inner flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-3">
          <FilterFields
            variant="toolbar"
            filters={filters}
            setFilters={setFilters}
            onChange={onFilterChange}
            onLocationChange={onLocationChange}
          />
          <div className="fo-filter-toolbar__actions flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
            <div className="fo-filter-field min-w-[9.5rem] flex-1 sm:flex-none sm:w-40 lg:w-44">
              <label
                className="fo-filter-label fo-filter-label--compact fo-filter-label--spacer mb-1 block text-xs font-semibold"
                aria-hidden="true"
              >
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={onSort}
                aria-label="Sort by"
                className="fo-toolbar-field fo-filter-select w-full rounded-lg border px-3 py-2.5 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-500 transition-all"
              >
                <option value="newest">Newest Added</option>
                <option value="roi">High ROI</option>
                <option value="investment">Low Investment</option>
              </select>
            </div>
            <div className="fo-filter-field fo-filter-field--action">
              <label
                className="fo-filter-label fo-filter-label--compact fo-filter-label--spacer mb-1 block text-xs font-semibold"
                aria-hidden="true"
              >
                Actions
              </label>
              <button
                type="button"
                onClick={onClearAll}
                className="fo-filter-clear-btn w-full rounded-lg border border-violet-400/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-violet-300/60 sm:w-auto"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ActiveFilterChips({ filters, setFilters, onLocationClear }) {
  const hasFilters = Boolean(
    filters.industry || filters.investment || filters.model || filters.location
  );
  if (!hasFilters) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
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
          <button
            type="button"
            onClick={() => {
              setFilters({ ...filters, location: '' });
              onLocationClear?.();
            }}
            className="ml-1"
          >
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
  const [filters, setFilters] = useState(() => {
    const cityFromUrl =
      typeof window !== 'undefined' ? parseLocationPathname(window.location.pathname) : null;
    return {
      industry: '',
      investment: '',
      model: '',
      location: cityFromUrl || '',
    };
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

  const syncUrlForLocation = (location) => {
    if (typeof window === 'undefined') return;
    const currentPath = window.location.pathname;
    if (location) {
      const targetPath = getLocationPath(location);
      if (targetPath && currentPath !== targetPath) {
        navigateTo(targetPath, { replace: currentPath.startsWith('/location/') });
      }
      return;
    }
    if (currentPath.startsWith('/location/')) {
      navigateTo('/franchise-opportunities', { replace: true });
    }
  };

  const handleLocationChange = (location) => {
    syncUrlForLocation(location);
    setCurrentPage(1);
  };

  const handleLocationClear = () => {
    syncUrlForLocation('');
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    clearNavbarFilters();
    setFilters({
      industry: '',
      investment: '',
      model: '',
      location: '',
    });
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/location/')) {
      navigateTo('/franchise-opportunities', { replace: true });
    }
  };

  useEffect(() => {
    const syncFiltersFromUrl = () => {
      const cityFromUrl = parseLocationPathname(window.location.pathname);
      const onBasePage = window.location.pathname === '/franchise-opportunities';
      setFilters((prev) => {
        if (cityFromUrl) {
          return prev.location === cityFromUrl ? prev : { ...prev, location: cityFromUrl };
        }
        if (onBasePage && prev.location) {
          return { ...prev, location: '' };
        }
        return prev;
      });
    };

    syncFiltersFromUrl();
    window.addEventListener('popstate', syncFiltersFromUrl);
    window.addEventListener(NAVIGATE_EVENT, syncFiltersFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFiltersFromUrl);
      window.removeEventListener(NAVIGATE_EVENT, syncFiltersFromUrl);
    };
  }, []);

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
    const investmentRange = parsePageInvestmentRange(filters.investment);

    const filtered = opportunities.filter((opportunity) => {
      const matchesIndustry = !filters.industry || opportunity.industry === filters.industry;

      const matchesInvestment =
        !investmentRange || investmentInrRangeMatchesOpportunity(investmentRange, opportunity);

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

    return pinFeaturedOpportunitiesFirst(sorted);
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
      <div className={`fo-page-shell relative ${FRANCHISE_OPPORTUNITIES_SHELL} pb-10 pt-8 lg:pb-12 lg:pt-10`}>
        <FranchiseOpportunitiesHeader cityName={filters.location || undefined} />

        <div className="fo-toolbar-sticky sticky top-16 z-40 mb-4 pb-2 pt-1">
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
            onLocationChange={handleLocationChange}
            activeFilterCount={countActiveFilters(filters, navbarFilterSnapshot)}
            resultCount={filteredAndSortedOpportunities.length}
          />

          <ActiveFilterChips
            filters={filters}
            setFilters={setFilters}
            onLocationClear={handleLocationClear}
          />
        </div>

        <div className="fo-cards-grid mb-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-7 xl:grid-cols-3 xl:gap-8">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <OpportunityCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : paginatedOpportunities.length === 0 ? (
            <div className="fo-empty-state col-span-full flex flex-col items-center justify-center rounded-xl border py-16 px-6 text-center">
              <p className="text-base font-semibold text-white">No franchise opportunities found</p>
              <p className="mt-2 max-w-md text-sm text-white">
                {filters.location
                  ? `No listings match ${filters.location} with the current filters. Try adjusting industry, investment, or model—or choose Clear All.`
                  : 'Adjust filters above, use the Franchise Opportunities menu in the navbar, or choose Clear All.'}
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

      <FranchiseOpportunitiesWayWeWork />
    </main>
  );
}


export default FranchiseOpportunitiesPage;
