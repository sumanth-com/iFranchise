import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LOGO } from '../lib/uiAssets.js';
import ThemeToggle from './ThemeToggle';
import { navigateTo as spaNavigate } from '../lib/navigation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { getOpenRoles, HIRING_ACTIVE } from './careersData';

const CAREERS_OPEN_COUNT = HIRING_ACTIVE ? getOpenRoles().length : 0;

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

const NAV_DROPDOWN_PANEL_CLASS =
  'navbar-dropdown-panel rounded-2xl border border-slate-200/60 bg-white shadow-2xl';

const NAV_LINK_BASE =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200';
const NAV_LINK_IDLE = 'site-navbar-link text-violet-800 hover:bg-violet-50 hover:text-violet-950';
const NAV_LINK_ACTIVE = 'site-navbar-link site-navbar-link--active bg-violet-100 text-violet-950';

function NavbarCareersOpenPill({ count, reduceMotion = false }) {
  if (!count) return null;

  return (
    <span
      className="navbar-careers-pill relative ml-1 inline-flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none"
      aria-label={`${count} open ${count === 1 ? 'position' : 'positions'}`}
    >
      {!reduceMotion && (
        <span className="navbar-careers-pill__pulse absolute inset-0 rounded-full" aria-hidden />
      )}
      <span className="relative z-[1]">{count}</span>
    </span>
  );
}

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

function ProcessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

// Services Dropdown Items
const SERVICES_ITEMS = [
  { title: 'Franchise Discovery', description: 'Find the perfect franchise match', Icon: FranchiseIcon, path: '/services' },
  { title: 'Franchise Expansion', description: 'Scale your brand nationwide', Icon: ExpansionIcon, path: '/services' },
  { title: 'Investor Matching', description: 'Connect with verified investors', Icon: InvestorIcon, path: '/services' },
  { title: 'Franchise Consulting', description: 'Expert guidance for growth', Icon: ConsultingIcon, path: '/services' },
  { title: 'Market Research', description: 'Data-driven market analysis', Icon: ResearchIcon, path: '/services' },
  { title: 'Lead Generation', description: 'Quality leads for your brand', Icon: LeadGenIcon, path: '/services' },
];

function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
      <path d="M8 9h2m-2 4h2m4-4h2m-2 4h2" />
    </svg>
  );
}

function KnowledgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function StoriesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-500 group-hover:stroke-[#0b0f19]" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

const RESOURCES_NAV_ITEMS = [
  { title: 'Blog', Icon: BlogIcon, path: '/blogs' },
  { title: 'Knowledge Hub', Icon: KnowledgeIcon, path: '/resources/knowledge-hub' },
  { title: 'Readiness Assessment', Icon: ProcessIcon, path: '/franchise-readiness-assessment' },
];

function NavbarResourcesPanel({ onNavigate }) {
  return (
    <motion.div className={`${NAV_DROPDOWN_PANEL_CLASS} w-[min(15.5rem,calc(100vw-32px))]`}>
      <div className="p-2" data-lenis-prevent>
        {RESOURCES_NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => onNavigate(item.path)}
            className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-violet-50"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-violet-600 transition-colors group-hover:bg-violet-100">
              <item.Icon />
            </span>
            <span className="text-sm font-semibold text-slate-900">{item.title}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Navbar() {
  const reduceMotion = usePrefersReducedMotion();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const savedScrollRef = useRef(0);

  const resourcesRef = useRef(null);
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
    document.body.classList.add('navbar-mobile-menu-open');

    if (window.__lenis) window.__lenis.stop();

    return () => {
      const scrollY = savedScrollRef.current;

      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('navbar-mobile-menu-open');

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
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const toggleNavDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  // Dropdown panels: close when clicking outside (opened via hover on desktop)
  useEffect(() => {
    if (activeDropdown !== 'resources') return undefined;

    const onPointerDown = (e) => {
      const target = e.target;
      if (resourcesRef.current?.contains(target)) return;
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
            <span className="site-navbar-logo-mark-wrap inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-xl sm:h-11 sm:w-11">
              <img
                src={NAV_LOGO.src}
                srcSet={NAV_LOGO.srcSet}
                sizes={NAV_LOGO.sizes}
                alt="iFranchise India franchise consulting company"
                className="site-navbar-logo-mark h-full w-full"
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                fetchPriority="auto"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallbackTried === '1') return;
                  img.dataset.fallbackTried = '1';
                  img.removeAttribute('srcset');
                  img.removeAttribute('sizes');
                  img.src = NAV_LOGO.src;
                }}
              />
            </span>
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
        <ul className="hidden flex-1 items-center justify-center gap-1.5 xl:flex">
          
          {/* About Us */}
          <li>
            <a
              href="/about-us"
              onClick={(e) => { e.preventDefault(); navigateTo('/about-us'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              About Us
            </a>
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

          {/* Franchise Opportunities */}
          <li>
            <a
              href="/franchise-opportunities"
              onClick={(e) => { e.preventDefault(); navigateTo('/franchise-opportunities'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              Franchise Opportunities
            </a>
          </li>

          {/* Resources dropdown */}
          <li
            className="relative"
            ref={resourcesRef}
            onMouseEnter={() => setActiveDropdown('resources')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              onClick={() => toggleNavDropdown('resources')}
              className={`${NAV_LINK_BASE} ${
                activeDropdown === 'resources' ? NAV_LINK_ACTIVE : NAV_LINK_IDLE
              }`}
              aria-expanded={activeDropdown === 'resources'}
              aria-haspopup="true"
            >
              Resources
              <ChevronIcon className={activeDropdown === 'resources' ? 'rotate-180' : ''} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'resources' && (
                <motion.div
                  key="resources-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Resources navigation"
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -left-8 top-full z-[10001] mt-2"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <NavbarResourcesPanel onNavigate={navigateTo} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Careers */}
          <li>
            <a
              href="/careers"
              onClick={(e) => { e.preventDefault(); navigateTo('/careers'); }}
              className={`${NAV_LINK_BASE} ${NAV_LINK_IDLE}`}
            >
              Careers
              <NavbarCareersOpenPill count={CAREERS_OPEN_COUNT} reduceMotion={reduceMotion} />
            </a>
          </li>

          {/* Contact Us */}
          <li>
            <a
              href="/contact-us"
              onClick={(e) => { e.preventDefault(); navigateTo('/contact-us'); }}
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
            className="site-navbar-cta group !hidden h-10 items-center gap-2 rounded-full bg-violet-600 px-6 py-0 text-sm font-bold text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all duration-300 hover:bg-violet-700 hover:shadow-[0_8px_28px_rgba(124,58,237,0.4)] hover:scale-[1.02] xl:!inline-flex"
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
                    alt="iFranchise India franchise consulting company"
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
                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/about-us"
                    onClick={(e) => { e.preventDefault(); navigateTo('/about-us'); }}
                    className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center rounded-xl border px-4 py-3.5 text-base font-bold"
                  >
                    About Us
                  </motion.a>

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

                  {RESOURCES_NAV_ITEMS.map((item) => (
                    <motion.a
                      key={item.path}
                      variants={reduceMotion ? undefined : mobileMenuNavItem}
                      href={item.path}
                      onClick={(e) => { e.preventDefault(); navigateTo(item.path); }}
                      className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center rounded-xl border px-4 py-3.5 text-base font-bold"
                    >
                      {item.title}
                    </motion.a>
                  ))}

                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/careers"
                    onClick={(e) => { e.preventDefault(); navigateTo('/careers'); }}
                    className="navbar-mobile-nav-item mobile-nav-link flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-base font-bold"
                  >
                    <span>Careers</span>
                    <NavbarCareersOpenPill count={CAREERS_OPEN_COUNT} reduceMotion={reduceMotion} />
                  </motion.a>

                  <motion.a
                    variants={reduceMotion ? undefined : mobileMenuNavItem}
                    href="/contact-us"
                    onClick={(e) => { e.preventDefault(); navigateTo('/contact-us'); }}
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
                  className="site-navbar-mobile-cta group flex w-full min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-[0.9375rem] font-bold transition-all active:scale-[0.98] sm:text-base"
                >
                  <span className="truncate">List Your Brand</span>
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
