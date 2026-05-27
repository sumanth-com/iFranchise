import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LOGO } from '../lib/uiAssets.js';
import ThemeToggle from './ThemeToggle';
import { useFranchiseOpportunityNavbarFilters } from '../context/FranchiseOpportunityNavbarFiltersContext';
import { buildNavbarFranchiseFilterOptions } from '../lib/franchiseNavbarFilters';
import { navigateTo as spaNavigate } from '../lib/navigation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const MENU_EASE = [0.22, 1, 0.36, 1];
const MENU_SPRING = { type: 'spring', stiffness: 520, damping: 38, mass: 0.85 };

/** Mobile drawer — transform/opacity only (GPU-friendly). */
const mobileMenuBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18, ease: MENU_EASE } },
  exit: { opacity: 0, transition: { duration: 0.14, ease: MENU_EASE } },
};

const mobileMenuPaperPanel = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: MENU_SPRING },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.2, ease: MENU_EASE } },
};

const mobileMenuSlidePanel = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0 } },
  exit: { x: '100%', transition: { duration: 0 } },
};

const mobileMenuNavStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
};

const mobileMenuNavItem = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: MENU_EASE },
  },
};

const mobileMenuHeader = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: MENU_EASE, delay: 0.03 },
  },
};

const mobileMenuFooter = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: MENU_EASE, delay: 0.08 },
  },
};

const FRANCHISE_NAVBAR_OPTIONS = buildNavbarFranchiseFilterOptions();

function NavbarFilterCheckIcon() {
  return (
    <svg className="navbar-filter-check-icon h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2L5 8.7L9.5 3.8"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavbarFilterChevron({ isOpen = false }) {
  return (
    <svg
      className={`navbar-filter-chevron h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="#6d28d9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompanyNavRowArrow() {
  return (
    <span
      className="company-nav-row-arrow inline-flex shrink-0 translate-x-0 text-violet-600 transition-transform duration-300 ease-out group-hover:translate-x-2"
      aria-hidden
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h13M14 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

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
        {checked && <NavbarFilterCheckIcon />}
      </span>
      <span
        className={`text-[13px] leading-snug transition-colors duration-200 ${
          checked ? 'font-semibold text-slate-900' : 'font-medium text-slate-700 group-hover:text-slate-900'
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
      <h4 className="mb-2.5 px-1 text-[11px] font-bold uppercase tracking-[0.1em] text-violet-800">
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
  'navbar-dropdown-panel rounded-2xl border border-slate-200/60 bg-white shadow-2xl';
const NAV_SUBMENU_CLASS =
  'navbar-dropdown-panel min-w-[15.5rem] w-max max-w-[min(18rem,calc(100vw-40px))] max-h-52 overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-slate-200/60 bg-white p-2.5 shadow-2xl';

const NAV_LINK_BASE =
  'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200';
const NAV_LINK_IDLE = 'site-navbar-link text-violet-800 hover:bg-violet-50 hover:text-violet-950';
const NAV_LINK_ACTIVE = 'site-navbar-link site-navbar-link--active bg-violet-100 text-violet-950';

function NavbarFranchiseFilterMenuCheckbox({ checked, label, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-violet-50/90">
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-all ${
          checked
            ? 'border-violet-600 bg-violet-600 shadow-[0_2px_8px_rgba(124,58,237,0.35)]'
            : 'border-slate-300 bg-white group-hover:border-violet-400'
        }`}
      >
        {checked && <NavbarFilterCheckIcon />}
      </span>
      <span
        className={`whitespace-nowrap text-xs leading-snug ${
          checked ? 'font-semibold text-slate-900' : 'text-slate-700'
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
        <span className="flex w-full items-center justify-center gap-1 px-0.5">
          <span className="text-center text-xs font-semibold leading-tight text-slate-800">{label}</span>
          <NavbarFilterChevron isOpen={isOpen} />
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
        <p className="mt-0.5 text-xs font-medium text-slate-600">Select filters, then view matching opportunities</p>
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
          className="flex flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
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
      <p className="text-xs leading-relaxed text-slate-600">
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
  const barTransition = { duration: 0.2, ease: MENU_EASE };
  return (
    <div className="relative h-5 w-5 flex flex-col justify-center gap-1">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={barTransition}
        className="block h-0.5 w-5 bg-current origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={barTransition}
        className="block h-0.5 w-5 bg-current"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={barTransition}
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
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M12 11v3M8 11h8" />
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

function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function CompanyNavIconWrap({ children }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition-all duration-200 group-hover:from-violet-700 group-hover:to-violet-900 group-hover:shadow-[0_6px_18px_rgba(124,58,237,0.45)] [&_svg]:text-white [&_svg]:stroke-white">
      {children}
    </span>
  );
}

const COMPANY_ITEMS = [
  { title: 'About Us', description: 'Our story, mission, and leadership.', Icon: AboutIcon, path: '/about' },
  { title: 'Careers', description: 'Build your career with iFranchise.', Icon: TeamIcon, path: '/careers' },
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

// Blogs nav (Resources renamed) - active items only
const BLOGS_NAV_ITEMS = [
  { title: 'Blogs', description: 'Latest insights and updates', Icon: BlogIcon, path: '/blog' },
];

/** @deprecated Hidden - restore when re-enabling Resources dropdown extras */
const RESOURCES_ITEMS_HIDDEN = [
  { title: 'FAQs', description: 'Common questions answered', Icon: FAQIcon, path: '/services' },
  { title: 'Industry Reports', description: 'Market analysis and trends', Icon: ReportIcon, path: '/blog' },
];

/** @deprecated Hidden - Company dropdown right column (legal pages + Book A Call) */
const SHOW_COMPANY_DROPDOWN_EXTRAS = false;

function Navbar() {
  const navFranchiseFilters = useFranchiseOpportunityNavbarFilters();
  const reduceMotion = usePrefersReducedMotion();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const savedScrollRef = useRef(0);

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

  // Lock body scroll when mobile menu is open; preserve scroll via ref (never in effect deps)
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

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
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setMobileAccordion(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

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
    spaNavigate(path);
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
      className={`site-navbar fixed left-0 top-0 z-[9999] h-16 w-full ${
        isScrolled ? 'site-navbar--scrolled' : ''
      }`}
    >
      <nav className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-2 px-3 sm:px-4 xl:px-6">
        
        {/* Logo */}
        <div className="site-navbar-brand flex min-w-0 flex-1 flex-col xl:mr-auto xl:flex-none">
          <a href="/" onClick={handleLogoClick} className="inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-3">
            <img
              src={NAV_LOGO.src}
              srcSet={NAV_LOGO.srcSet}
              sizes={NAV_LOGO.sizes}
              alt="iFranchise"
              className="h-9 w-9 shrink-0 rounded-xl sm:h-10 sm:w-10"
              width={40}
              height={40}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="flex min-w-0 flex-col">
              <span className="site-navbar-logo-title truncate text-lg font-extrabold tracking-tight leading-tight text-violet-900 sm:text-2xl">
                iFranchise
              </span>
              <p
                className={`site-navbar-logo-tagline hidden text-[10px] font-semibold leading-tight text-violet-800 transition-[opacity,max-height] duration-300 sm:block sm:text-xs ${
                  isScrolled ? 'max-h-0 opacity-0' : 'max-h-6 opacity-100'
                }`}
              >
                India&apos;s Trusted Franchise Growth Platform
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          
          {/* Company - hover shows menu; click goes to About Us */}
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
                            <span className="flex items-center gap-2 text-sm font-bold text-slate-800 group-hover:text-violet-700">
                              {item.title}
                              {item.badge && (
                                <span className="relative inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                                  {item.badge}
                                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block text-xs font-medium leading-snug text-slate-600">{item.description}</span>
                          </div>
                          <CompanyNavRowArrow />
                        </a>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Services - direct link */}
          <li>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              Services
            </a>
          </li>

          {/* Franchise Opportunities - hover shows filter panel; click goes to listings */}
          <li
            className="relative"
            ref={franchiseRef}
            onMouseEnter={() => setActiveDropdown('franchiseFilters')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => navigateTo('/franchise-opportunities')}
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

          {/* Blogs - direct link */}
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

        <div className="site-navbar-actions ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 xl:gap-3">
          <ThemeToggle compact className="!inline-flex shrink-0 xl:!hidden" />
          <ThemeToggle className="!hidden shrink-0 xl:!inline-flex" />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="site-navbar-menu-btn inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-200 text-violet-800 transition-all duration-200 hover:bg-violet-50 active:scale-95 min-[480px]:w-auto min-[480px]:min-w-[5.5rem] min-[480px]:gap-2 min-[480px]:px-3.5 xl:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
            <span className="site-navbar-menu-label hidden font-bold min-[480px]:inline">Menu</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('/list-your-brand')}
            className="site-navbar-cta group !hidden items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all duration-300 hover:bg-violet-700 hover:shadow-[0_8px_28px_rgba(124,58,237,0.4)] hover:scale-[1.02] xl:!inline-flex"
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
      </nav>

      {/* Mobile Navigation Drawer. paper unfold from top-right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="presentation"
            variants={mobileMenuBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="navbar-mobile-overlay fixed inset-0 z-[99999] bg-black/25 backdrop-blur-sm xl:hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              variants={reduceMotion ? mobileMenuSlidePanel : mobileMenuPaperPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="navbar-mobile-panel navbar-mobile-panel--paper fixed right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-sm flex-col overflow-hidden overscroll-contain shadow-2xl touch-pan-y"
              style={{ transformOrigin: '100% 0%' }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              {/* Mobile Header */}
              <motion.div
                variants={reduceMotion ? undefined : mobileMenuHeader}
                initial={reduceMotion ? false : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
                className="navbar-mobile-panel__header flex shrink-0 items-center justify-between border-b px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={NAV_LOGO.src}
                    srcSet={NAV_LOGO.srcSet}
                    sizes={NAV_LOGO.sizes}
                    alt="iFranchise"
                    className="h-9 w-9 rounded-xl"
                    width={36}
                    height={36}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="navbar-mobile-panel__brand text-lg font-bold">iFranchise</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle compact />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="navbar-mobile-panel__close flex h-10 w-10 items-center justify-center rounded-full transition-all"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                <motion.nav
                  className="navbar-mobile-nav flex w-full flex-col gap-2.5"
                  variants={reduceMotion ? undefined : mobileMenuNavStagger}
                  initial={reduceMotion ? false : 'hidden'}
                  animate={reduceMotion ? undefined : 'visible'}
                >
                  {/* Company Accordion. sub-items open downward */}
                  <motion.div
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    className="navbar-mobile-accordion w-full overflow-hidden rounded-xl border"
                  >
                    <button
                      type="button"
                      onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                      className="navbar-mobile-nav-item flex w-full items-center justify-between px-4 py-3.5 text-left"
                    >
                      <span className="navbar-mobile-nav-label text-base font-bold">Company</span>
                      <ChevronIcon className={mobileAccordion === 'company' ? 'rotate-180' : ''} />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'company' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: MENU_EASE }}
                          className="navbar-mobile-accordion-panel w-full overflow-hidden border-t"
                        >
                          <div className="navbar-mobile-accordion-sub flex w-full flex-col gap-1 p-2">
                            {COMPANY_ITEMS.map((item) => (
                              <a
                                key={item.title}
                                href={item.path}
                                onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                                className="navbar-mobile-sub-link mobile-nav-link group flex w-full min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold"
                              >
                                <CompanyNavIconWrap>
                                  <item.Icon />
                                </CompanyNavIconWrap>
                                <span className="flex min-w-0 flex-1 items-center gap-2 font-bold">
                                  {item.title}
                                  {item.badge && (
                                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
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
                  </motion.div>

                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/services"
                    onClick={(e) => { e.preventDefault(); navigateTo('/services'); }}
                    className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center rounded-xl border px-4 py-3.5 text-base font-bold"
                  >
                    Services
                  </motion.a>

                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/franchise-opportunities"
                    onClick={(e) => { e.preventDefault(); navigateTo('/franchise-opportunities'); }}
                    className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center rounded-xl border px-4 py-3.5 text-base font-bold"
                  >
                    Franchise Opportunities
                  </motion.a>

                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
                    className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center rounded-xl border px-4 py-3.5 text-base font-bold"
                  >
                    Blogs
                  </motion.a>

                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }}
                    className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center rounded-xl border px-4 py-3.5 text-base font-bold"
                  >
                    Contact Us
                  </motion.a>
                </motion.nav>
              </div>

              {/* Mobile CTA. List Your Brand (not in top bar on mobile) */}
              <motion.div
                variants={reduceMotion ? undefined : mobileMenuFooter}
                initial={reduceMotion ? false : 'hidden'}
                animate={reduceMotion ? undefined : 'visible'}
                className="navbar-mobile-panel__footer shrink-0 border-t p-4"
              >
                <button
                  type="button"
                  onClick={() => navigateTo('/list-your-brand')}
                  className="site-navbar-mobile-cta group flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold transition-all active:scale-[0.98]"
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
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
