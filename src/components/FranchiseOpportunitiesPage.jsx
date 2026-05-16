import { useEffect, useMemo, useState } from 'react';
import { franchiseOpportunities } from '../data/franchiseData';
import { useFranchiseOpportunityNavbarFilters } from '../context/FranchiseOpportunityNavbarFiltersContext';
import { matchesNavbarFilters } from '../lib/franchiseNavbarFilters';

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

// Opportunity Card Component
function OpportunityCard({ opportunity }) {
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'HOT MARKET': return 'bg-red-500 text-white';
      case 'HIGH ROI': return 'bg-green-500 text-white';
      case 'NEW': return 'bg-violet-500 text-white';
      case 'TRENDING': return 'bg-purple-500 text-white';
      case 'GROWING': return 'bg-orange-500 text-white';
      case 'POPULAR': return 'bg-pink-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const handleViewDetails = () => {
    window.history.pushState({}, '', `/franchise-details?id=${opportunity.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <article 
      onClick={handleViewDetails}
      className="card-premium-dark rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(109,40,217,0.35)] hover:-translate-y-1 hover:border-[rgba(139,92,246,0.45)] cursor-pointer"
    >
      {/* Image with Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={opportunity.image}
          alt={opportunity.brandName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            // Fallback to a category-specific image based on franchise type
            const fallbackImages = {
              'Food & Beverage': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
              'Health & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
              'Home Services': 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
              'Education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
              'Technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
              'Retail': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
              'Entertainment': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
            };
            e.target.src = fallbackImages[opportunity.category] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(opportunity.badge)}`}>
          {opportunity.badge}
        </div>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="text-white">Model:</span>
              <span className="font-semibold text-white ml-2">{opportunity.model}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              opportunity.model === 'FOCO' ? 'bg-violet-500/25 text-violet-100 border border-violet-400/35' :
              opportunity.model === 'FOFO' ? 'bg-emerald-500/25 text-emerald-100 border border-emerald-400/35' :
              'bg-violet-500/25 text-violet-100 border border-violet-400/35'
            }`}>
              {opportunity.model === 'FOCO' ? 'Passive' : 
               opportunity.model === 'FOFO' ? 'Owner-Op' : 'Hybrid'}
            </span>
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

        {/* ROI Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-100 border border-emerald-400/35">
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

// Main Opportunities Page Component
function FranchiseOpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    industries: [],
    investment: '',
    models: [],
    location: ''
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
  
  const itemsPerPage = 9;
  const clearAllFilters = () => {
    clearNavbarFilters();
    setFilters({
      industries: [],
      investment: '',
      models: [],
      location: ''
    });
  };

  const navFilterChipCount =
    navBrands.length + navInvestKeys.length + navLocations.length + navModels.length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, navBrands, navInvestKeys, navLocations, navModels]);

  const filteredAndSortedOpportunities = useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();
    const investmentRange = parseSelectedRange(filters.investment);

    const filtered = opportunities.filter((opportunity) => {
      const matchesSearch =
        !searchLower ||
        opportunity.brandName.toLowerCase().includes(searchLower) ||
        opportunity.industry.toLowerCase().includes(searchLower) ||
        opportunity.category.toLowerCase().includes(searchLower) ||
        opportunity.locations.toLowerCase().includes(searchLower);

      const matchesIndustry =
        filters.industries.length === 0 || filters.industries.includes(opportunity.industry);

      const opportunityInvestment = parseInvestmentValue(opportunity.investment);
      const matchesInvestment =
        !investmentRange ||
        (opportunityInvestment >= investmentRange.min && opportunityInvestment <= investmentRange.max);

      const matchesModel =
        filters.models.length === 0 || filters.models.includes(opportunity.model);

      const locationLower = filters.location.trim().toLowerCase();
      const matchesLocation =
        !locationLower || opportunity.locations.toLowerCase().includes(locationLower);

      const matchesNavbar = matchesNavbarFilters(opportunity, navbarFilterSnapshot);

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesInvestment &&
        matchesModel &&
        matchesLocation &&
        matchesNavbar
      );
    });

    const sorted = [...filtered];
    if (sortBy === 'roi') {
      sorted.sort((a, b) => Number.parseInt(b.roi, 10) - Number.parseInt(a.roi, 10));
    } else if (sortBy === 'investment') {
      sorted.sort((a, b) => parseInvestmentValue(a.investment) - parseInvestmentValue(b.investment));
    } else {
      sorted.sort((a, b) => b.id - a.id);
    }

    return sorted;
  }, [searchTerm, sortBy, filters, navbarFilterSnapshot]);

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
    <main className="relative z-10 min-h-screen bg-transparent text-white">
      {/* Header */}
      <div className="border-b border-violet-500/25 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2 sm:text-3xl md:text-4xl sm:mb-3">Explore Franchise Opportunities</h1>
            <p className="text-base text-white sm:text-lg leading-relaxed">
              Browse our curated list of vetted franchise brands actively seeking expansion partners. Filter by your investment criteria to find the perfect match.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="relative">
        {/* ── DESKTOP LAYOUT ── 2-column sticky marketplace grid */}
        <div className="hidden lg:grid lg:grid-cols-[340px_minmax(0,1fr)] items-start max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 gap-8">

          {/* ── LEFT COLUMN — Sticky filter sidebar ── */}
          {/* sticky + self-start: sidebar stays pinned while right column scrolls.
              No overflow, no max-height — filter expands naturally with content. */}
          <div className="sticky top-24 self-start">
            <div className="card-premium-dark rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              {/* Header */}
              <div className="border-b border-violet-500/25 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h2 className="text-lg font-bold text-white">Filters</h2>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs uppercase tracking-wide text-white hover:text-white font-semibold transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              {/* Filter Content - No Scroll, All Visible */}
              <div className="p-4 space-y-4">
                {/* Industry Filters */}
                <div className="card-premium-dark-inner rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Industry
                  </h3>
                  <div className="space-y-2.5">
                    {INDUSTRY_OPTIONS.map(industry => (
                      <label key={industry} className="flex items-center cursor-pointer group py-1">
                        <input
                          type="checkbox"
                          checked={filters.industries.includes(industry)}
                          onChange={() => {
                            const newIndustries = filters.industries.includes(industry)
                              ? filters.industries.filter(i => i !== industry)
                              : [...filters.industries, industry];
                            setFilters({ ...filters, industries: newIndustries });
                          }}
                          className="w-4 h-4 text-violet-500 border-violet-400/40 rounded focus:ring-2 focus:ring-violet-500 focus:ring-offset-0"
                        />
                        <span className="ml-3 text-sm text-white group-hover:text-violet-100 transition-colors">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Investment Filters */}
                <div className="card-premium-dark-inner rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Min Investment
                  </h3>
                  <div className="space-y-2.5">
                    {INVESTMENT_OPTIONS.map(range => (
                      <label key={range} className="flex items-center cursor-pointer group py-1">
                        <input
                          type="radio"
                          name="investment"
                          checked={filters.investment === range}
                          onChange={() => setFilters({ ...filters, investment: range })}
                          className="w-4 h-4 text-violet-500 border-violet-400/40 focus:ring-2 focus:ring-violet-500 focus:ring-offset-0"
                        />
                        <span className="ml-3 text-sm text-white group-hover:text-violet-100 transition-colors">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Operating Model Filters */}
                <div className="card-premium-dark-inner rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Operating Model
                  </h3>
                  <div className="space-y-2.5">
                    {MODEL_OPTIONS.map(model => (
                      <label key={model} className="flex items-center cursor-pointer group py-1">
                        <input
                          type="checkbox"
                          checked={filters.models.includes(model)}
                          onChange={() => {
                            const newModels = filters.models.includes(model)
                              ? filters.models.filter(m => m !== model)
                              : [...filters.models, model];
                            setFilters({ ...filters, models: newModels });
                          }}
                          className="w-4 h-4 text-violet-500 border-violet-400/40 rounded focus:ring-2 focus:ring-violet-500 focus:ring-offset-0"
                        />
                        <span className="ml-3 text-sm text-white group-hover:text-violet-100 transition-colors">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="card-premium-dark-inner rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location Focus
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      list="franchise-location-cities"
                      placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="w-full px-4 py-3 border border-violet-500/30 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all"
                    />
                    <datalist id="franchise-location-cities">
                      {INDIAN_CITIES.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                    <p className="text-xs font-medium text-slate-900">Indian cities — type or pick from suggestions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Sticky search/sort + scrollable grid ── */}
          {/* min-w-0 prevents grid blowout. The column itself is NOT a scroll
              container — the page scrolls naturally, which is what makes
              position:sticky work correctly for the search bar inside it. */}
          <div className="min-w-0">
            {/* Search and Sort */}
            <div className="pb-3 mb-1">
              <div className="card-premium-dark rounded-xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
                <div className="flex gap-3">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search brands, industries..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="w-full pl-9 pr-4 py-2.5 border border-violet-500/30 rounded-lg text-sm bg-white text-slate-900 placeholder:text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all"
                    />
                  </div>
                  {/* Sort Dropdown */}
                  <div className="w-44 shrink-0">
                    <select
                      value={sortBy}
                      onChange={handleSort}
                      className="w-full px-3 py-2.5 border border-violet-500/30 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all bg-white text-slate-900"
                    >
                      <option value="newest">Newest Added</option>
                      <option value="roi">High ROI</option>
                      <option value="investment">Low Investment</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.industries.length > 0 || filters.investment || filters.models.length > 0 || filters.location) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.industries.map(industry => (
                  <span key={industry} className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                    {industry}
                    <button
                      onClick={() => {
                        const newIndustries = filters.industries.filter(i => i !== industry);
                        setFilters({ ...filters, industries: newIndustries });
                      }}
                      className="ml-1 text-white hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.investment && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                    {filters.investment}
                    <button
                      onClick={() => setFilters({ ...filters, investment: '' })}
                      className="ml-1 text-white hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.models.map(model => (
                  <span key={model} className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                    {model}
                    <button
                      onClick={() => {
                        const newModels = filters.models.filter(m => m !== model);
                        setFilters({ ...filters, models: newModels });
                      }}
                      className="ml-1 text-white hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.location && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                    {filters.location}
                    <button
                      onClick={() => setFilters({ ...filters, location: '' })}
                      className="ml-1 text-white hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-white">
                Showing <span className="font-semibold">{paginatedOpportunities.length}</span> of{' '}
                <span className="font-semibold">{filteredAndSortedOpportunities.length}</span> opportunities
              </p>
            </div>

            {/* Opportunities Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-8">
              {isLoading ? (
                // Show skeleton cards during loading
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <OpportunityCardSkeleton key={`skeleton-${index}`} />
                ))
              ) : paginatedOpportunities.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-violet-500/25 bg-violet-950/20 py-16 px-6 text-center">
                  <p className="text-base font-semibold text-white">No franchise opportunities found</p>
                  <p className="mt-2 max-w-md text-sm text-white">
                    Adjust filters from the Franchise Opportunities menu in the navbar, or choose Clear All in the filters panel here.
                  </p>
                </div>
              ) : (
                // Show actual opportunities
                paginatedOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        {/* ── END DESKTOP LAYOUT ── */}

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Mobile top bar — sticky: filter button + search + sort */}
          <div className="sticky top-16 z-20 bg-[#0a0618]/92 backdrop-blur-md border-b border-violet-500/20 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6">
            <div className="flex gap-2 pt-4">
              {/* Filter toggle */}
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 border border-violet-500/35 rounded-lg text-sm font-semibold text-white bg-violet-500/15 hover:bg-violet-500/25 transition-all shrink-0 min-h-[44px]"
                aria-label="Open filters"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {(filters.industries.length > 0 || filters.investment || filters.models.length > 0 || filters.location || navFilterChipCount > 0) && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                    {filters.industries.length +
                      (filters.investment ? 1 : 0) +
                      filters.models.length +
                      (filters.location ? 1 : 0) +
                      navFilterChipCount}
                  </span>
                )}
              </button>

              {/* Search */}
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-9 pr-3 py-2.5 border border-violet-500/30 rounded-lg text-sm bg-white text-slate-900 placeholder:text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all min-h-[44px]"
                />
              </div>

              {/* Sort */}
              <div className="shrink-0">
                <select
                  value={sortBy}
                  onChange={handleSort}
                  className="h-full px-3 py-2.5 border border-violet-500/30 rounded-lg text-sm bg-white text-slate-900 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all min-h-[44px]"
                >
                  <option value="newest">Newest</option>
                  <option value="roi">High ROI</option>
                  <option value="investment">Low Inv.</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Display — mobile */}
          {(filters.industries.length > 0 || filters.investment || filters.models.length > 0 || filters.location) && (
            <div className="mt-3 mb-2 flex flex-wrap gap-2">
              {filters.industries.map(industry => (
                <span key={industry} className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                  {industry}
                  <button
                    onClick={() => {
                      const newIndustries = filters.industries.filter(i => i !== industry);
                      setFilters({ ...filters, industries: newIndustries });
                    }}
                    className="ml-1 text-white hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.investment && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                  {filters.investment}
                  <button
                    onClick={() => setFilters({ ...filters, investment: '' })}
                    className="ml-1 text-white hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.models.map(model => (
                <span key={model} className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                  {model}
                  <button
                    onClick={() => {
                      const newModels = filters.models.filter(m => m !== model);
                      setFilters({ ...filters, models: newModels });
                    }}
                    className="ml-1 text-white hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              {filters.location && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 text-white border border-violet-400/40 rounded-full text-sm">
                  {filters.location}
                  <button
                    onClick={() => setFilters({ ...filters, location: '' })}
                    className="ml-1 text-white hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Count — mobile */}
          <div className="mt-3 mb-4">
            <p className="text-sm text-white">
              Showing <span className="font-semibold">{paginatedOpportunities.length}</span> of{' '}
              <span className="font-semibold">{filteredAndSortedOpportunities.length}</span> opportunities
            </p>
          </div>

          {/* Opportunities Grid — mobile */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            {isLoading ? (
              // Show skeleton cards during loading
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <OpportunityCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : paginatedOpportunities.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-violet-500/25 bg-violet-950/20 py-16 px-6 text-center">
                <p className="text-base font-semibold text-white">No franchise opportunities found</p>
                <p className="mt-2 max-w-md text-sm text-white">
                  Adjust filters from the Franchise Opportunities menu in the navbar, or choose Clear All in the filters panel here.
                </p>
              </div>
            ) : (
              // Show actual opportunities
              paginatedOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-[min(320px,85vw)] bg-[#12082a] border-r border-violet-500/25 z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-violet-500/25">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h2 className="text-lg font-bold text-white">Filters</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => clearAllFilters()}
                  className="text-sm text-white hover:text-white font-medium transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 text-violet-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-5 pb-24 space-y-6">
              {/* Industry Filters */}
              <div className="card-premium-dark-inner rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Industry
                </h3>
                <div className="space-y-3">
                  {INDUSTRY_OPTIONS.map(industry => (
                    <label key={industry} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.industries.includes(industry)}
                        onChange={() => {
                          const newIndustries = filters.industries.includes(industry)
                            ? filters.industries.filter(i => i !== industry)
                            : [...filters.industries, industry];
                          setFilters({ ...filters, industries: newIndustries });
                        }}
                        className="w-4 h-4 text-violet-500 border-violet-400/40 rounded focus:ring-2 focus:ring-violet-500 focus:ring-offset-0"
                      />
                      <span className="ml-3 text-sm text-white group-hover:text-violet-100 transition-colors">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Investment Filters */}
              <div className="card-premium-dark-inner rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Min Investment
                </h3>
                <div className="space-y-3">
                  {INVESTMENT_OPTIONS.map(range => (
                    <label key={range} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="investment-mobile"
                        checked={filters.investment === range}
                        onChange={() => setFilters({ ...filters, investment: range })}
                        className="w-4 h-4 text-violet-500 border-violet-400/40 focus:ring-2 focus:ring-violet-500 focus:ring-offset-0"
                      />
                      <span className="ml-3 text-sm text-white group-hover:text-violet-100 transition-colors">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Operating Model Filters */}
              <div className="card-premium-dark-inner rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Operating Model
                </h3>
                <div className="space-y-3">
                  {MODEL_OPTIONS.map(model => (
                    <label key={model} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.models.includes(model)}
                        onChange={() => {
                          const newModels = filters.models.includes(model)
                            ? filters.models.filter(m => m !== model)
                            : [...filters.models, model];
                          setFilters({ ...filters, models: newModels });
                        }}
                        className="w-4 h-4 text-violet-500 border-violet-400/40 rounded focus:ring-2 focus:ring-violet-500 focus:ring-offset-0"
                      />
                      <span className="ml-3 text-sm text-white group-hover:text-violet-100 transition-colors">{model}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="card-premium-dark-inner rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location Focus
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    list="franchise-location-cities-mobile"
                    placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-4 py-2 border border-violet-500/30 rounded-lg text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all"
                  />
                  <datalist id="franchise-location-cities-mobile">
                    {INDIAN_CITIES.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                  <p className="text-xs font-medium text-slate-900">Indian cities — type or pick from suggestions</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default FranchiseOpportunitiesPage;
