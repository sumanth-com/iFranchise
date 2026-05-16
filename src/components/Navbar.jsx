import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brandLogo from '../assets/BrandNav.png';
import { useFranchiseOpportunityNavbarFilters } from '../context/FranchiseOpportunityNavbarFiltersContext';
import { buildNavbarFranchiseFilterOptions } from '../lib/franchiseNavbarFilters';

const FRANCHISE_NAVBAR_OPTIONS = buildNavbarFranchiseFilterOptions();

function NavbarFranchiseFilterCheckbox({ checked, label, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-violet-100/90 hover:bg-violet-50/70">
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-all duration-200 ${
          checked
            ? 'border-violet-600 bg-violet-600 shadow-[0_2px_8px_rgba(124,58,237,0.35)]'
            : 'border-slate-300 bg-white group-hover:border-violet-400/80'
        }`}
        aria-hidden
      >
        {checked && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2L5 8.7L9.5 3.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={`text-[13px] leading-snug transition-colors duration-200 ${
          checked ? 'font-semibold text-slate-900' : 'font-medium text-slate-600 group-hover:text-slate-800'
        }`}
      >
        {label}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

function FranchiseFilterSection({ title, children }) {
  return (
    <div className="min-h-0">
      <h4 className="mb-2.5 px-1 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
        {title}
      </h4>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function FranchiseFilterPanelBody({ navFranchiseFilters, embedded = false, compact = false }) {
  const panelClass = embedded
    ? 'grid grid-cols-1 gap-5 px-1 py-1'
    : compact
      ? 'franchise-filter-scroll grid max-h-[min(360px,calc(100vh-220px))] grid-cols-1 gap-4 overflow-y-auto overscroll-contain px-4 py-4 touch-pan-y'
      : 'franchise-filter-scroll grid max-h-[min(420px,calc(100vh-220px))] grid-cols-1 gap-6 overflow-y-auto overscroll-contain px-6 py-5 touch-pan-y sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6';

  const scrollHandlers = embedded
    ? {}
    : {
        onWheel: (e) => e.stopPropagation(),
        onTouchMove: (e) => e.stopPropagation(),
      };

  return (
    <div data-lenis-prevent className={panelClass} {...scrollHandlers}>
      <FranchiseFilterSection title="Brand">
        {FRANCHISE_NAVBAR_OPTIONS.brands.map((name) => (
          <NavbarFranchiseFilterCheckbox
            key={name}
            label={name}
            checked={navFranchiseFilters.brands.includes(name)}
            onChange={() => navFranchiseFilters.toggleBrand(name)}
          />
        ))}
      </FranchiseFilterSection>
      <FranchiseFilterSection title="Investment range">
        {FRANCHISE_NAVBAR_OPTIONS.investmentBuckets.map((b) => (
          <NavbarFranchiseFilterCheckbox
            key={b.key}
            label={b.label}
            checked={navFranchiseFilters.investmentBucketKeys.includes(b.key)}
            onChange={() => navFranchiseFilters.toggleInvestmentBucket(b.key)}
          />
        ))}
      </FranchiseFilterSection>
      <FranchiseFilterSection title="Location">
        {FRANCHISE_NAVBAR_OPTIONS.locations.map((loc) => (
          <NavbarFranchiseFilterCheckbox
            key={loc}
            label={loc}
            checked={navFranchiseFilters.locations.includes(loc)}
            onChange={() => navFranchiseFilters.toggleLocation(loc)}
          />
        ))}
      </FranchiseFilterSection>
      <FranchiseFilterSection title="Franchise model">
        {FRANCHISE_NAVBAR_OPTIONS.franchiseModels.map((m) => (
          <NavbarFranchiseFilterCheckbox
            key={m}
            label={m}
            checked={navFranchiseFilters.franchiseModels.includes(m)}
            onChange={() => navFranchiseFilters.toggleFranchiseModel(m)}
          />
        ))}
      </FranchiseFilterSection>
    </div>
  );
}

const NAV_COMPANY_PANEL_CLASS = 'w-[min(400px,calc(100vw-32px))]';
const NAV_FRANCHISE_PANEL_CLASS = 'w-[min(440px,calc(100vw-32px))]';
const NAV_DROPDOWN_PANEL_CLASS =
  'rounded-2xl border border-slate-200/60 bg-white shadow-2xl';
const NAV_SUBMENU_CLASS =
  'min-w-[15.5rem] w-max max-w-[min(18rem,calc(100vw-40px))] max-h-52 overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-slate-200/60 bg-white p-2.5 shadow-2xl';

const NAV_LINK_BASE =
  'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200';
const NAV_LINK_IDLE = 'text-violet-800 hover:bg-violet-50 hover:text-violet-950';
const NAV_LINK_ACTIVE = 'bg-violet-100 text-violet-950';

function NavbarFranchiseFilterMenuCheckbox({ checked, label, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-violet-50/90">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
          checked
            ? 'border-violet-600 bg-violet-600'
            : 'border-slate-300 bg-white group-hover:border-violet-400'
        }`}
      >
        {checked && (
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2L5 8.7L9.5 3.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={`whitespace-nowrap text-xs leading-snug ${
          checked ? 'font-semibold text-slate-900' : 'text-slate-600'
        }`}
      >
        {label}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

function NavbarFranchiseFilterColumn({
  label,
  count,
  isOpen,
  onToggle,
  children,
  align = 'start',
}) {
  const menuAlignClass = align === 'end' ? 'right-0 left-auto' : 'left-0';

  return (
    <motion.div className="relative min-w-0 flex-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={label}
        className={`flex w-full flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all duration-200 ${
          isOpen || count > 0
            ? 'border-violet-300 bg-violet-50 shadow-sm'
            : 'border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/60'
        }`}
      >
        <span className="flex w-full items-center justify-center gap-0.5 px-0.5">
          <span className="text-center text-xs font-semibold leading-tight text-slate-800">{label}</span>
          <ChevronIcon className={`h-3 w-3 shrink-0 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
        {count > 0 && (
          <span className="rounded-full bg-violet-600 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
            {count}
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-[calc(100%+8px)] z-50 ${menuAlignClass} ${NAV_SUBMENU_CLASS}`}
            data-lenis-prevent
            onMouseDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NavbarFranchisePremiumPanel({ navFranchiseFilters, onOpenListings, onClear }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (key) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  return (
    <motion.div className={`overflow-visible ${NAV_DROPDOWN_PANEL_CLASS}`}>
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Browse franchises</h3>
        <p className="mt-0.5 text-xs text-slate-500">Select filters, then view matching opportunities</p>
      </div>

      <div className="relative px-3 pb-4 pt-3">
        <div className="grid grid-cols-4 gap-2">
          <NavbarFranchiseFilterColumn
            label="Brand"
            count={navFranchiseFilters.brands.length}
            isOpen={openMenu === 'brand'}
            onToggle={() => toggleMenu('brand')}
          >
            {FRANCHISE_NAVBAR_OPTIONS.brands.map((name) => (
              <NavbarFranchiseFilterMenuCheckbox
                key={name}
                label={name}
                checked={navFranchiseFilters.brands.includes(name)}
                onChange={() => navFranchiseFilters.toggleBrand(name)}
              />
            ))}
          </NavbarFranchiseFilterColumn>

          <NavbarFranchiseFilterColumn
            label="Budget"
            count={navFranchiseFilters.investmentBucketKeys.length}
            isOpen={openMenu === 'investment'}
            onToggle={() => toggleMenu('investment')}
          >
            {FRANCHISE_NAVBAR_OPTIONS.investmentBuckets.map((b) => (
              <NavbarFranchiseFilterMenuCheckbox
                key={b.key}
                label={b.label}
                checked={navFranchiseFilters.investmentBucketKeys.includes(b.key)}
                onChange={() => navFranchiseFilters.toggleInvestmentBucket(b.key)}
              />
            ))}
          </NavbarFranchiseFilterColumn>

          <NavbarFranchiseFilterColumn
            label="Location"
            count={navFranchiseFilters.locations.length}
            isOpen={openMenu === 'location'}
            onToggle={() => toggleMenu('location')}
            align="end"
          >
            {FRANCHISE_NAVBAR_OPTIONS.locations.map((loc) => (
              <NavbarFranchiseFilterMenuCheckbox
                key={loc}
                label={loc}
                checked={navFranchiseFilters.locations.includes(loc)}
                onChange={() => navFranchiseFilters.toggleLocation(loc)}
              />
            ))}
          </NavbarFranchiseFilterColumn>

          <NavbarFranchiseFilterColumn
            label="Model"
            count={navFranchiseFilters.franchiseModels.length}
            isOpen={openMenu === 'model'}
            onToggle={() => toggleMenu('model')}
            align="end"
          >
            {FRANCHISE_NAVBAR_OPTIONS.franchiseModels.map((m) => (
              <NavbarFranchiseFilterMenuCheckbox
                key={m}
                label={m}
                checked={navFranchiseFilters.franchiseModels.includes(m)}
                onChange={() => navFranchiseFilters.toggleFranchiseModel(m)}
              />
            ))}
          </NavbarFranchiseFilterColumn>
        </div>
      </div>

      <FranchiseFilterPanelFooter compact onClear={onClear} onOpenListings={onOpenListings} />
    </motion.div>
  );
}

function FranchiseFilterPanelFooter({ onClear, onOpenListings, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-stretch gap-2 border-t border-slate-100 px-3 py-2.5">
        <button
          type="button"
          onClick={onClear}
          className="flex flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onOpenListings}
          className="group flex flex-1 items-center justify-center gap-1 rounded-lg bg-violet-600 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-700"
        >
          View listings
          <span className="inline-flex transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 border-t border-slate-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs leading-relaxed text-slate-500">
        Combinations narrow results together.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/80 hover:text-violet-800 hover:shadow-md active:scale-[0.98]"
        >
          Clear filters
        </button>
        <button
          type="button"
          onClick={onOpenListings}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1220] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(11,18,32,0.25)] transition-all duration-200 hover:bg-[#1a2332] hover:shadow-[0_8px_28px_rgba(124,58,237,0.22)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Open listings page
          <span className="inline-flex transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRightIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

// Premium Icon Components
function ChevronIcon({ className = '' }) {
  return (
    <svg className={`w-4 h-4 transition-transform duration-200 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <div className="relative h-5 w-5 flex flex-col justify-center gap-1">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="block h-0.5 w-5 bg-current origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="block h-0.5 w-5 bg-current"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="block h-0.5 w-5 bg-current origin-center"
      />
    </div>
  );
}

// Icon Components for Dropdowns
function FranchiseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l4-4 4 4 4-6 4 2M3 21h18" />
    </svg>
  );
}

function ExpansionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function InvestorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function ConsultingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ResearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function LeadGenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 6.5h15M4.5 12h8M4.5 17.5h15M15.5 10.5h4v4h-4z" />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M12 12v2M8 12h8" />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CompanyNavIconWrap({ children }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b1220] shadow-sm transition-all duration-200 group-hover:bg-violet-600 group-hover:shadow-md">
      {children}
    </span>
  );
}

const COMPANY_ITEMS = [
  { title: 'About Us', description: 'Our story, mission, and leadership.', Icon: AboutIcon, path: '/about' },
  { title: 'Contact Us', description: 'Speak with our franchise advisors.', Icon: ContactIcon, path: '/contact' },
  { title: 'Careers', description: 'Build your career with iFranchise.', Icon: TeamIcon, badge: '4', path: '/careers' },
];

// Services Dropdown Items
const SERVICES_ITEMS = [
  { title: 'Franchise Discovery', description: 'Find the perfect franchise match', Icon: FranchiseIcon, path: '/services' },
  { title: 'Franchise Expansion', description: 'Scale your brand nationwide', Icon: ExpansionIcon, path: '/services' },
  { title: 'Investor Matching', description: 'Connect with verified investors', Icon: InvestorIcon, path: '/services' },
  { title: 'Franchise Consulting', description: 'Expert guidance for growth', Icon: ConsultingIcon, path: '/services' },
  { title: 'Market Research', description: 'Data-driven market analysis', Icon: ResearchIcon, path: '/services' },
  { title: 'Lead Generation', description: 'Quality leads for your brand', Icon: LeadGenIcon, path: '/services' },
];

// Blogs nav (Resources renamed) — active items only
const BLOGS_NAV_ITEMS = [
  { title: 'Blogs', description: 'Latest insights and updates', Icon: BlogIcon, path: '/blog' },
];

/** @deprecated Hidden — restore when re-enabling Resources dropdown extras */
const RESOURCES_ITEMS_HIDDEN = [
  { title: 'FAQs', description: 'Common questions answered', Icon: FAQIcon, path: '/services' },
  { title: 'Industry Reports', description: 'Market analysis and trends', Icon: ReportIcon, path: '/blog' },
];

/** @deprecated Hidden — Company dropdown right column (legal pages + Book A Call) */
const SHOW_COMPANY_DROPDOWN_EXTRAS = false;

function Navbar() {
  const navFranchiseFilters = useFranchiseOpportunityNavbarFilters();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const companyRef = useRef(null);
  const franchiseRef = useRef(null);
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open and preserve scroll position
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPosition(currentScroll);
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';

      if (window.__lenis) window.__lenis.stop();
    } else {
      // Restore scroll position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position without triggering navigation
      if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition);
      }

      if (window.__lenis) window.__lenis.start();
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [isMobileMenuOpen, scrollPosition]);

  const toggleNavDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  // Company & Franchise filters: close when clicking outside (opened via hover on desktop)
  useEffect(() => {
    if (activeDropdown !== 'company' && activeDropdown !== 'franchiseFilters') return undefined;

    const onPointerDown = (e) => {
      const target = e.target;
      if (companyRef.current?.contains(target)) return;
      if (franchiseRef.current?.contains(target)) return;
      setActiveDropdown(null);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [activeDropdown]);

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('/');
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[9999] w-full bg-white transition-all duration-300 ${
        isScrolled
          ? 'h-16 border-b border-violet-100 shadow-[0_4px_24px_rgba(124,58,237,0.08)]'
          : 'h-20 border-b border-violet-100/90'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between h-full px-2 sm:px-4 lg:px-6">
        
        {/* Logo */}
        <div className="flex flex-col mr-auto">
          <a href="/" onClick={handleLogoClick} className="inline-flex items-center gap-2 sm:gap-3">
            <img 
              src={brandLogo} 
              alt="iFranchise" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight leading-tight text-violet-900">
                iFranchise
              </span>
              <p className="text-[10px] sm:text-xs leading-tight text-violet-600/80 hidden xs:block">
                India's Trusted Franchise Growth Platform
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          
          {/* Company — hover shows menu; click goes to About Us */}
          <li
            className="relative"
            ref={companyRef}
            onMouseEnter={() => setActiveDropdown('company')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => navigateTo('/about')}
              className={`${NAV_LINK_BASE} ${
                activeDropdown === 'company' ? NAV_LINK_ACTIVE : NAV_LINK_IDLE
              }`}
              aria-expanded={activeDropdown === 'company'}
              aria-haspopup="true"
            >
              Company
              <ChevronIcon className={activeDropdown === 'company' ? 'rotate-180' : ''} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute -left-20 top-full mt-2 ${NAV_COMPANY_PANEL_CLASS} ${NAV_DROPDOWN_PANEL_CLASS}`}
                >
                  <div className="p-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Company</h3>
                      {COMPANY_ITEMS.map((item) => (
                        <a
                          key={item.title}
                          href={item.path}
                          onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-slate-50"
                        >
                          <CompanyNavIconWrap>
                            <item.Icon />
                          </CompanyNavIconWrap>
                          <div className="flex-1">
                            <span className="flex items-center gap-2 text-sm font-medium text-slate-800 group-hover:text-violet-700">
                              {item.title}
                              {item.badge && (
                                <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                                  {item.badge}
                                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
                          </div>
                          <span className="text-base leading-none text-slate-400 opacity-0 group-hover:text-violet-600 group-hover:opacity-100 transition-all duration-200">→</span>
                        </a>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Services — direct link */}
          <li>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              Services
            </a>
          </li>

          {/* Franchise Opportunities — hover shows filter panel */}
          <li
            className="relative"
            ref={franchiseRef}
            onMouseEnter={() => setActiveDropdown('franchiseFilters')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className={`${NAV_LINK_BASE} ${
                activeDropdown === 'franchiseFilters' ? NAV_LINK_ACTIVE : NAV_LINK_IDLE
              }`}
              aria-expanded={activeDropdown === 'franchiseFilters'}
              aria-haspopup="true"
            >
              Franchise Opportunities
              <ChevronIcon className={activeDropdown === 'franchiseFilters' ? 'rotate-180' : ''} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'franchiseFilters' && (
                <motion.div
                  key="franchise-filter-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Filter franchise opportunities"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute -left-20 top-full z-[10001] mt-2 ${NAV_FRANCHISE_PANEL_CLASS}`}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                  <NavbarFranchisePremiumPanel
                    navFranchiseFilters={navFranchiseFilters}
                    onClear={() => navFranchiseFilters.clearNavbarFilters()}
                    onOpenListings={() => {
                      navigateTo('/franchise-opportunities');
                      setActiveDropdown(null);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Blogs — direct link */}
          <li>
            <a
              href="/blog"
              onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              Blogs
            </a>
          </li>

          {/* Contact Us */}
          <li>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex min-h-[48px] min-w-[100px] items-center justify-center gap-2.5 rounded-full border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-800 transition-all duration-200 hover:bg-violet-50 active:scale-95 lg:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
          <span className="font-medium">Menu</span>
        </button>

        {/* Desktop CTA Button */}
        <button
          type="button"
          onClick={() => navigateTo('/list-your-brand')}
          className="group ml-auto hidden items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all duration-300 hover:bg-violet-700 hover:shadow-[0_8px_28px_rgba(124,58,237,0.4)] hover:scale-[1.02] lg:inline-flex"
        >
          List Your Brand
          <motion.div
            className="inline-flex"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRightIcon />
          </motion.div>
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] bg-black/25 backdrop-blur-sm lg:hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full flex flex-col w-full max-w-sm bg-white shadow-2xl overflow-hidden"
              style={{ position: 'fixed', height: '100vh', maxHeight: '100vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={brandLogo} 
                    alt="iFranchise" 
                    className="h-9 w-9 rounded-xl"
                  />
                  <span className="text-lg font-bold text-[#0b0f19]">iFranchise</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="space-y-2">
                  
                  {/* Company Accordion */}
                  <div className="rounded-xl border border-slate-200">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                      className="flex w-full items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="text-base font-semibold text-slate-900">Company</span>
                      <ChevronIcon className={mobileAccordion === 'company' ? 'rotate-180' : ''} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'company' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-slate-100"
                        >
                          <div className="space-y-1 p-2">
                            {COMPANY_ITEMS.map((item) => (
                              <a
                                key={item.title}
                                href={item.path}
                                onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-violet-50/80"
                              >
                                <CompanyNavIconWrap>
                                  <item.Icon />
                                </CompanyNavIconWrap>
                                <span className="flex items-center gap-2">
                                  {item.title}
                                  {item.badge && (
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Services — direct link */}
                  <a
                    href="/services"
                    onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Services
                  </a>

                  {/* Franchise Opportunities — direct link (mobile) */}
                  <a
                    href="/franchise-opportunities"
                    onClick={(e) => { e.preventDefault(); navigateTo('/franchise-opportunities'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Franchise Opportunities
                  </a>

                  {/* Blogs — direct link */}
                  <a
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Blogs
                  </a>

                  {/* Contact Us */}
                  <a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Contact Us
                  </a>
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() => navigateTo('/list-your-brand')}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-50 active:scale-[0.98]"
                >
                  List Your Brand
                  <motion.div
                    className="inline-flex"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRightIcon />
                  </motion.div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
