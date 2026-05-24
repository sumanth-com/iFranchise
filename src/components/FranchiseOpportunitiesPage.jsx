import { useEffect, useMemo, useState } from 'react';
import { franchiseOpportunities } from '../data/franchiseData';
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
    <div className="fo-filter-toolbar card-premium-dark rounded-xl p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
        <FilterFields
          variant="toolbar"
          filters={filters}
          setFilters={setFilters}
          onChange={onFilterChange}
        />
        <div className="flex shrink-0 flex-wrap items-end gap-2 sm:gap-3 lg:pb-0.5">
          <div className="min-w-[9.5rem] flex-1 sm:flex-none sm:w-40 lg:w-44">
            <label className="mb-1 block text-xs font-semibold text-white lg:sr-only">Sort by</label>
            <select
              value={sortBy}
              onChange={onSort}
              aria-label="Sort by"
              className="fo-toolbar-field w-full rounded-lg border px-3 py-2.5 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-500 transition-all"
            >
              <option value="newest">Newest Added</option>
              <option value="roi">High ROI</option>
              <option value="investment">Low Investment</option>
            </select>
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="rounded-lg border border-violet-400/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-violet-300/60"
          >
            Clear All
          </button>
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
      <div className={`relative ${FRANCHISE_OPPORTUNITIES_SHELL} pb-10 pt-8 lg:pb-12 lg:pt-10`}>
        <FranchiseOpportunitiesHeader />

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
          />

          <ActiveFilterChips filters={filters} setFilters={setFilters} />
        </div>

        <div className="mb-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7 xl:grid-cols-3 xl:gap-8">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <OpportunityCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : paginatedOpportunities.length === 0 ? (
            <div className="fo-empty-state col-span-full flex flex-col items-center justify-center rounded-xl border py-16 px-6 text-center">
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

      <FranchiseOpportunitiesWayWeWork />
    </main>
  );
}


export default FranchiseOpportunitiesPage;
