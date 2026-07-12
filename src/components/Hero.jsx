import { useEffect, useLayoutEffect, useRef, useState, useCallback, lazy, Suspense, startTransition } from 'react';
import { useIsMobileViewport } from '../hooks/useIsMobileViewport';
import { createPortal } from 'react-dom';
import Button from './Button';
import CtaButton from './ui/CtaButton';
import SectionPill from './ui/SectionPill';
import TestimonialCard from './TestimonialCard';
import PremiumFAQItem from './ui/PremiumFAQItem';
import { preloadHomeHeroForTheme } from '../lib/preloadHomeHero.js';
import { removeStaticHero } from '../lib/removeStaticHero.js';
import { HOME_HERO_DARK, HOME_HERO_LIGHT, HERO_MOBILE_MQ } from '../lib/heroAssets.js';
import { submitContactForm } from '../lib/forms';
import { isContactFormReady } from '@/lib/contactForm';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from './forms/PhoneInput';
import StateLocationFields from './forms/StateLocationFields';
import { navigateTo } from '@/lib/navigation';
import { useFormSubmission, withHoneypot } from '../hooks/useFormSubmission';
import FormSuccessState from './forms/FormSuccessState';
import HoneypotField from './forms/HoneypotField';
import { WHO_WE_SERVE_IMAGES, IMAGE_FALLBACK, FRANCHISE_CATEGORY_IMAGES } from '../data/sectionImages';
import { SITE_CONTACT_ITEMS } from '../data/siteContact';
import { HOME_PAGE_FAQS } from '../data/faqContent.js';
import ResponsiveImg from './ui/ResponsiveImg.jsx';
import {
  FiUserCheck, FiBookOpen, FiUserPlus, FiTarget, FiMap, FiCompass,
  FiCheck, FiArrowRight,
} from 'react-icons/fi';
import { 
  franchiseOpportunities, 
  getTotalCities, 
  getAverageROI,
  calculateGrowthMetrics,
  getFeaturedOpportunities,
} from '../data/franchiseData';

const OpportunityCard = lazy(() => import('./OpportunityCard'));
const OurServicesSection = lazy(() => import('./OurServicesSection'));
const HomeFranchiseModelsSection = lazy(() => import('./ecosystem/HomeFranchiseModelsSection'));
const HomeBrowseInvestmentSection = lazy(() => import('./ecosystem/HomeBrowseInvestmentSection'));
import { useTheme } from '../context/ThemeContext';
import {
  getCardBaseStyle,
  cardHoverHandlers,
  serviceIconStyle,
  imageCornerTagStyle,
  sectionTitleClass,
  sectionSubtitleClass,
  cardTitleClass,
  cardListClass,
} from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';
import TrustLogoMarquee from './ui/TrustLogoMarquee.jsx';
import {
  HOME_TESTIMONIALS_MOBILE,
  TESTIMONIAL_COLUMNS,
} from '../data/testimonials.js';

// -- Lightweight scroll-triggered visibility hook ------------------------------
// Returns [ref, isVisible] ? isVisible toggles true/false on every enter/leave
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold, rootMargin: '0px 0px -4% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// -- Animated wrapper ? fades+slides in on scroll, resets when out -------------
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`${className} cinematic-scroll-reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

const growthCards = [
  {
    eyebrow: 'FOR BRAND OWNERS',
    tag: 'FRANCHISORS',
    pillBg: 'rgba(124,58,237,0.85)',
    tags: ['Scale', 'Expand', 'Franchise'],
    title: 'Expand Your Brand Through Franchising',
    description:
      'Turn your successful business into a scalable franchise model. We help brand owners structure, launch, and grow through strategic franchising systems, legal frameworks, and investor connections.',
    linkText: 'For Brand Owners',
    href: '/contact-us',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=640&q=80',
    fallbackImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=80',
    accent: 'from-violet-600 to-indigo-600',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-50',
  },
  {
    eyebrow: 'FOR INVESTORS',
    tag: 'FRANCHISEES',
    pillBg: 'rgba(5,150,105,0.85)',
    tags: ['Invest', 'Own', 'Grow'],
    title: 'Invest in Proven Franchise Opportunities',
    description:
      'Discover vetted franchise businesses across high-growth industries. Find the right investment based on your budget, goals, and market demand ? with clarity and confidence.',
    linkText: 'For Investors',
    href: '/contact-us',
    image:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=640&q=80',
    fallbackImage:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=640&q=80',
    accent: 'from-emerald-600 to-teal-600',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
  },
];


const statsCards = [
  {
    value: 100,
    suffix: '+',
    title: 'Franchise brands',
    description: 'Trusted by businesses across multiple industries and growth stages.',
  },
  {
    value: 10000,
    suffix: '+',
    title: 'Leads Generated',
    description: 'Qualified opportunities created through focused conversion systems.',
  },
  {
    value: 17,
    suffix: '+',
    title: 'Indian States Covered',
    description: 'Pan-India expansion mapped across tier 1, tier 2, and growth markets.',
  },
  {
    value: 37,
    suffix: '+',
    title: 'Cities Active',
    description: 'Metro and regional city rollouts built for scalable franchise growth in India.',
  },
];

const franchiseModels = [
  {
    id: 'foco-model',
    slug: 'foco-model',
    code: 'FOCO',
    title: 'Franchise Owned, Company Operated',
    description:
      'The franchise partner owns the unit while our central team manages operations, staffing, and quality delivery.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=80',
    cta: 'Explore FOCO',
  },
  {
    id: 'fofo-model',
    slug: 'fofo-model',
    code: 'FOFO',
    title: 'Franchise Owned and Operated',
    description:
      'The franchise partner owns and runs daily business operations with standardized systems and growth support.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=640&q=80',
    cta: 'Explore FOFO',
  },
  {
    id: 'fico-model',
    slug: 'fico-model',
    code: 'FICO',
    title: 'Franchise Invested, Company Operated',
    description:
      'Investors fund expansion while the company executes operations end-to-end with transparent reporting.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&q=80',
    cta: 'Explore FICO',
  },
];

const contactItems = SITE_CONTACT_ITEMS;

function Avatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="-ml-2 h-9 w-9 rounded-full border-2 border-white object-cover first:ml-0"
    />
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-[#111827]"
    >
      <path d="M12 2.5l2.94 5.95 6.56.96-4.75 4.63 1.12 6.54L12 17.5 6.13 20.58l1.12-6.54L2.5 9.41l6.56-.96L12 2.5z" />
    </svg>
  );
}

function GrowthCard({ card }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[20px] bg-white border border-slate-100 cursor-pointer"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
      }}
      onClick={() => navigateTo(card.href)}
    >
      {/* Image ? 16/9 ratio, fits fully in viewport */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{ aspectRatio: '16/9', backgroundColor: '#f8f9fa' }}
      >
        {/* Skeleton */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
        )}
        {/* Error fallback */}
        {imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-5xl font-black text-white">{card.eyebrow[0]}</span>
          </div>
        )}
        {/* Image ? contain so nothing is cut */}
        {!imgError && (
          <ResponsiveImg
            ref={imgRef}
            src={card.image}
            alt={card.title}
            remote
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 400px"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (card.fallbackImage && imgRef.current) {
                imgRef.current.src = card.fallbackImage;
                imgRef.current.removeAttribute('srcset');
                imgRef.current.onerror = () => setImgError(true);
              } else {
                setImgError(true);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              transition: 'transform 0.5s ease, opacity 0.4s ease',
              opacity: imgLoaded ? 1 : 0,
            }}
            className="group-hover:scale-[1.03]"
          />
        )}
        {/* Soft overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.10))' }}
        />
        {/* Tag pill ? top right, colored glassmorphism */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.14em] text-white px-3 py-1.5 rounded-full"
            style={{
              background: card.pillBg,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {card.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Eyebrow label */}
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-2">
          {card.eyebrow}
        </p>

        {/* Title */}
        <h3 className="text-lg font-extrabold tracking-tight text-[#0b0f19] leading-snug mb-2">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white flex-1 mb-3">
          {card.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {card.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-white px-2.5 py-0.5 rounded-full border border-slate-200"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); navigateTo(card.href); }}
          className={`group/btn inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r ${card.accent} text-white transition-all duration-200 active:scale-95 self-start`}
        >
          {card.linkText}
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
          </svg>
        </button>

      </div>
    </article>
  );
}

function StatCard({ stat }) {
  const rootRef = useRef(null);
  const [count, setCount] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || hasRunRef.current) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCountUp = () => {
      if (hasRunRef.current) return;
      hasRunRef.current = true;

      if (reducedMotion) {
        setCount(stat.value);
        return;
      }

      let frameId;
      let startTime;
      const durationMs = 2000;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / durationMs, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.floor(stat.value * eased));
        if (progress < 1) {
          frameId = window.requestAnimationFrame(animate);
        } else {
          setCount(stat.value);
        }
      };

      frameId = window.requestAnimationFrame(animate);
    };

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    if (alreadyVisible) {
      runCountUp();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCountUp();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(el);

    const fallbackId = window.setTimeout(() => {
      if (!hasRunRef.current) {
        setCount(stat.value);
        hasRunRef.current = true;
        observer.disconnect();
      }
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackId);
    };
  }, [stat.value]);

  return (
    <div ref={rootRef} className="inline-block">
      <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums mb-1">
        {count.toLocaleString('en-IN')}
        {stat.suffix}
      </p>
    </div>
  );
}

// -- Franchise Model Modal Data ------------------------------------------------
const MODEL_DETAILS = {
  FOCO: {
    badge: 'FOCO',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
    accentColor: '#7c3aed',
    tagline: 'Company manages operations while you focus on ownership and returns.',
    overview:
      'In the FOCO model, you invest in and own the franchise unit, but the franchisor\u2019s central team handles all day-to-day operations \u2014 staffing, quality control, and customer experience. You earn returns without being involved in daily management.',
    howItWorks: [
      'You provide the capital and own the franchise unit',
      'Franchisor deploys an operations team to run the outlet',
      'You receive regular performance reports and profit distributions',
      'Brand maintains quality standards across all units',
    ],
    investment: '?15L ? ?50L',
    whoShouldChoose:
      'Ideal for passive investors, working professionals, or HNIs who want franchise returns without operational involvement.',
    pros: [
      'Truly passive income ? no daily involvement needed',
      'Brand expertise drives operational quality',
      'Lower personal risk from management errors',
      'Scalable ? own multiple units simultaneously',
    ],
    considerations: [
      'Lower control over day-to-day decisions',
      'Returns depend on franchisor\u2019s operational efficiency',
      'Management fees reduce net margins',
    ],
  },
  FOFO: {
    badge: 'FOFO',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accentColor: '#059669',
    tagline: 'You own and run the business with full control and higher involvement.',
    overview:
      'In the FOFO model, you own the franchise unit and manage all operations yourself using the franchisor\u2019s proven systems, brand, and support. This gives you maximum control and higher profit potential in exchange for active involvement.',
    howItWorks: [
      'You invest capital and take ownership of the franchise unit',
      'Franchisor provides brand license, SOPs, and training',
      'You hire, manage staff, and run daily operations',
      'Ongoing support from franchisor for marketing and systems',
    ],
    investment: '?20L ? ?80L',
    whoShouldChoose:
      'Best for entrepreneurs, ex-professionals, or business-minded individuals who want hands-on ownership with a proven brand behind them.',
    pros: [
      'Full operational control and decision-making authority',
      'Higher profit margins ? no management fee to franchisor',
      'Direct relationship with customers and team',
      'Faster adaptation to local market needs',
    ],
    considerations: [
      'Requires significant time and personal involvement',
      'Operational success depends on your management skills',
      'Higher personal workload, especially in early stages',
    ],
  },
  FICO: {
    badge: 'FICO',
    badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
    accentColor: '#ea580c',
    tagline: 'You invest capital while the company handles execution and operations.',
    overview:
      'In the FICO model, the franchisor owns and operates the outlet while you act as a pure financial investor. You provide the capital for expansion and receive a fixed or revenue-linked return, with full transparency on performance.',
    howItWorks: [
      'You commit capital as a franchise investor',
      'Franchisor owns, sets up, and operates the unit entirely',
      'You receive periodic returns based on agreed terms',
      'Transparent reporting on revenue, costs, and performance',
    ],
    investment: '?10L ? ?40L',
    whoShouldChoose:
      'Perfect for investors seeking structured returns without any operational role ? similar to a business investment with brand-backed security.',
    pros: [
      'Zero operational involvement required',
      'Structured, predictable return framework',
      'Brand accountability for performance outcomes',
      'Low entry barrier with defined exit options',
    ],
    considerations: [
      'No ownership of the physical franchise unit',
      'Returns are capped by the agreed investment structure',
      'Less flexibility to influence business decisions',
    ],
  },
};

// -- Franchise Model Modal -----------------------------------------------------
function FranchiseModelModal({ model, onClose }) {
  const details = MODEL_DETAILS[model.code];
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    onClose();
  };

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!details) return null;

  const modal = (
    /* -- Full-screen backdrop ? always fixed to viewport -- */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(11,15,25,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      {/* -- Modal panel ? centered, never affected by scroll -- */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '85vh',
          backgroundColor: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(11,15,25,0.22), 0 0 0 1px rgba(11,15,25,0.06)',
          animation: 'modalIn 0.22s cubic-bezier(0.22,1,0.36,1) both',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* -- Scrollable inner wrapper ? clips inside the rounded container -- */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* -- HEADER -- */}
        <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-6 border-b border-slate-100 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${details.badgeColor}`}>
                {details.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b0f19] leading-tight mb-1">
              {model.title}
            </h2>
            <p className="text-sm text-white leading-relaxed">{details.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-white hover:bg-slate-200 hover:text-slate-700 transition-colors duration-150 mt-0.5"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* -- BODY -- */}
        <div className="px-8 py-6 space-y-7 flex-1">

          {/* Overview */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: details.accentColor + '15' }}>
                <svg className="w-4 h-4" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">Overview</h3>
            </div>
            <p className="text-sm text-white leading-relaxed pl-[2.375rem]">{details.overview}</p>
          </div>

          {/* How it Works */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: details.accentColor + '15' }}>
                <svg className="w-4 h-4" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">How It Works</h3>
            </div>
            <ul className="pl-[2.375rem] space-y-2">
              {details.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white">
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5" style={{ backgroundColor: details.accentColor }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Investment + Who Should Choose ? 2 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Investment Range</span>
              </div>
              <p className="text-2xl font-extrabold text-[#0b0f19]">{details.investment}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke={details.accentColor} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Who Should Choose</span>
              </div>
              <p className="text-sm text-white leading-relaxed">{details.whoShouldChoose}</p>
            </div>
          </div>

          {/* Pros + Considerations ? 2 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">Pros</h3>
              </div>
              <ul className="space-y-2">
                {details.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0b0f19] uppercase tracking-wider">Considerations</h3>
              </div>
              <ul className="space-y-2">
                {details.considerations.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white">
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* -- FOOTER -- */}
        <div className="flex items-center justify-between gap-3 px-8 py-5 border-t border-slate-100 bg-slate-50/60 rounded-b-[20px] shrink-0">
          <button
            onClick={() => navigateTo('/franchise-opportunities')}
            className="text-sm font-semibold text-white hover:text-[#0b0f19] transition-colors duration-150 underline underline-offset-2"
          >
            Compare Models
          </button>
          <button
            onClick={() => window.open('https://cal.com/ifranchise.in/30min', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: details.accentColor, boxShadow: `0 4px 14px ${details.accentColor}40` }}
          >
            Book Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
            </svg>
          </button>
        </div>
        </div>{/* -- end inner scrollable wrapper -- */}
      </div>
    </div>
  );

  // Render into document.body ? completely outside card/section DOM tree
  return createPortal(modal, document.body);
}

function FranchiseModelCard({ model, visible, delayMs }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <FranchiseModelModal model={model} onClose={() => setModalOpen(false)} />
      )}
      <article
        className={`group flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.15)] ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={model.image}
            alt={model.title}
            className="h-56 w-full object-cover transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            onLoad={(e) => { e.target.classList.add('loaded'); e.target.classList.remove('loading'); }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.classList.add('loaded');
              e.target.classList.remove('loading');
              let category = 'Food & Beverage';
              if (model.title.toLowerCase().includes('company') || model.title.toLowerCase().includes('operated')) category = 'Home Services';
              else if (model.title.toLowerCase().includes('invested') || model.title.toLowerCase().includes('invest')) category = 'Technology';
              e.target.src = FRANCHISE_CATEGORY_IMAGES[category] || IMAGE_FALLBACK;
            }}
          />
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-col flex-1 p-6">
          <div className="h-16 flex items-start">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-[#0b0f19] line-clamp-2">
              {model.title}
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-white line-clamp-3">
              {model.description}
            </p>
          </div>

          {/* CTA ? only these buttons are interactive */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigateTo('/franchise-opportunities');
              }}
              className="flex-1 rounded-xl btn-wave bg-[#0B1220] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a2332] hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore
            </button>
            <button
              type="button"
              data-action="open-modal"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#0B1220] hover:bg-slate-50"
            >
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M8 12h9" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

function TestimonialStatCard({ item }) {
  return (
    <article className="testimonial-stat-card rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="testimonial-stat-card__header">
        <p className="testimonial-stat-card__name text-sm font-semibold text-slate-900">{item.name}</p>
        <p className="testimonial-stat-card__role text-xs text-slate-600">{item.role}</p>
      </div>
      {item.rating && (
        <div className="mt-4 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      )}
      <p className="testimonial-stat-card__quote mt-4 text-sm leading-relaxed text-slate-700">{item.quote}</p>
    </article>
  );
}

function ContactIcon({ type }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-white">
        <path
          d="M4.5 4.5h4l1.8 4.2-2.1 2.1a15.4 15.4 0 0 0 5 5l2.1-2.1 4.2 1.8v4A1.6 1.6 0 0 1 18 21C10.3 21 3 13.7 3 6A1.6 1.6 0 0 1 4.5 4.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'location') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-white">
        <path
          d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-white">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m5 8 7 5 7-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HOMEPAGE_CONTACT_INITIAL = withHoneypot({
  fullName: '',
  email: '',
  website: '',
  contactNumber: createEmptyPhoneValue(),
  state: '',
  city: '',
  message: '',
  company: '',
});

function ContactSection() {
  const {
    values: formData,
    setField: handleInputChange,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formKey: 'homepage_contact',
    initialValues: HOMEPAGE_CONTACT_INITIAL,
    onSubmit: (data, { signal }) => submitContactForm(data, 'homepage_contact', { signal }),
  });

  const canSend = isContactFormReady(formData);

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] border border-emerald-300/20 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.16),transparent_50%),linear-gradient(130deg,#020506_0%,#051414_48%,#020506_100%)] px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.18),transparent_42%)]" />
        <div className="pointer-events-none absolute -left-12 top-16 h-[1px] w-52 bg-gradient-to-r from-transparent via-emerald-200/35 to-transparent hidden sm:block" />
        <div className="pointer-events-none absolute right-6 top-10 h-36 w-36 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-16 h-24 w-[260px] bg-[linear-gradient(90deg,transparent,rgba(167,243,208,0.18),transparent)] blur-sm hidden sm:block" />
        <p className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 text-[clamp(2rem,10vw,5.125rem)] font-black tracking-[0.2em] text-emerald-100/5 blur-[1px]">
          CONTACT
        </p>

        <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4 sm:space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50 backdrop-blur-md">
              Contact
            </span>
            <h2 className={`${TYPE.modalTitle} text-white`}>Get in touch</h2>
            <p className="max-w-[440px] text-sm sm:text-base font-medium leading-relaxed text-emerald-50/75">
              Have questions or ready to transform your business with our franchise solutions?
            </p>

            <div className="space-y-3 sm:space-y-4 pt-2">
              {contactItems.map((item) => {
                const Tag = item.href ? 'a' : 'article';
                const linkProps = item.href
                  ? {
                      href: item.href,
                      ...(item.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {}),
                    }
                  : {};
                return (
                  <Tag
                    key={item.title}
                    {...linkProps}
                    className="group flex items-center justify-between rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-200/35 hover:bg-white/15 hover:shadow-[0_10px_28px_rgba(16,185,129,0.14)]"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:h-12 sm:w-12">
                        <ContactIcon type={item.icon} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-emerald-100/70 sm:text-sm">{item.title}</p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-base">{item.value}</p>
                      </div>
                    </div>
                    {item.href && (
                      <span className="ml-2 shrink-0 text-emerald-200/60 opacity-0 transition duration-200 group-hover:opacity-100" aria-hidden>
                        â†’
                      </span>
                    )}
                  </Tag>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-md">
            {isSuccess ? (
              <FormSuccessState
                title="Thank you!"
                description="Your message was received. Our team will respond within one business day."
                onReset={resetForm}
                variant="emerald"
              />
            ) : (
            <form className="relative space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <HoneypotField value={formData._hp} onChange={handleInputChange} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
                className="site-form-field site-form-field--on-dark w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="site-form-field site-form-field--on-dark w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200"
              />
              <input
                type="url"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="site-form-field site-form-field--on-dark w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200"
              />
              <PhoneInput
                id="homepage-contact-phone"
                required
                variant="emerald"
                value={formData.contactNumber}
                onChange={(value) => handleInputChange('contactNumber', value)}
              />
              <StateLocationFields
                layout="stack"
                variant="emerald"
                className="gap-3 sm:gap-4"
                stateValue={formData.state}
                cityValue={formData.city}
                onStateChange={(v) => handleInputChange('state', v)}
                onCityChange={(v) => handleInputChange('city', v)}
                stateClassName="site-form-field site-form-field--on-dark w-full appearance-none rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white outline-none transition duration-200"
                cityClassName="site-form-field site-form-field--on-dark w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/45 outline-none transition duration-200"
                labelClassName="text-xs font-medium text-emerald-50/80"
              />
              <textarea
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                className="site-form-field site-form-field--on-dark w-full resize-none rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200"
              />
              <button
                type="submit"
                disabled={isSubmitting || !canSend}
                className={`w-full rounded-lg sm:rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold transition duration-300 disabled:cursor-not-allowed ${
                  canSend && !isSubmitting
                    ? 'bg-white text-[#091115] hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-[0_12px_25px_rgba(255,255,255,0.2)]'
                    : 'bg-white/20 text-white/45 shadow-none'
                }`}
              >
                {isSubmitting ? 'Submittingâ€¦' : 'Submit'}
              </button>
              {submitError && (
                <p className="text-center text-sm text-red-300" role="alert">
                  {submitError}
                </p>
              )}
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Franchise Education Card -------------------------------------------------

function FranchiseEduCard({ card, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(card.img);
  const [fallbackIdx, setFallbackIdx] = useState(0);

  // Force-trigger load: if the browser already cached the image,
  // onLoad won't fire ? so we check naturalWidth after mount.
  const imgRef = useRef(null);
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [activeSrc]);

  const handleError = () => {
    const next = fallbackIdx + 1;
    if (card.fallbackImgs && next < card.fallbackImgs.length) {
      setFallbackIdx(next);
      setActiveSrc(card.fallbackImgs[next]);
      setImgLoaded(false);
    } else {
      setImgError(true);
    }
  };

  return (
    <Reveal delay={index * 0.06} className="group bg-white rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image container ? fixed height, consistent ratio */}
      <div className="relative h-48 sm:h-52 overflow-hidden shrink-0 bg-slate-100">
        {/* Skeleton shimmer shown while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse" />
        )}
        {/* Fallback gradient on total failure */}
        {imgError && (
          <div className={`absolute inset-0 bg-gradient-to-br ${card.fallback} flex items-center justify-center`}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {!imgError && (
          <img
            ref={imgRef}
            src={activeSrc}
            alt={card.alt}
            loading="eager"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover object-center transition-opacity duration-200 group-hover:scale-105 transition-transform ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${card.badgeColor}`}>
            {card.badgeIcon}
            {card.badge}
          </span>
        </div>
        <h3 className="text-base sm:text-[17px] font-extrabold text-[#0b0f19] mb-3 leading-snug">
          {card.title}
        </h3>
        <p className="text-sm text-white leading-relaxed flex-1">
          {card.body}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2">
          <svg className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-white leading-relaxed italic">{card.why}</p>
        </div>
      </div>
    </Reveal>
  );
}

// --- Hero ---------------------------------------------------------------------

function FAQAccordionItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.06} className="group border border-slate-200/60 rounded-xl bg-white hover:shadow-md transition-all duration-300">
      {/* Question Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors duration-200 rounded-xl"
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Number Badge */}
          <div className="home-faq-item__badge flex-shrink-0 w-8 h-8 rounded-lg bg-[#0b0f19] text-white text-sm font-bold flex items-center justify-center">
            {faq.number}
          </div>
          
          {/* Question */}
          <h3 className="text-lg font-bold text-[#0b0f19] leading-tight tracking-tight pr-4">
            {faq.question}
          </h3>
        </div>
        
        {/* Plus/Minus Icon */}
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <svg 
            className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      
      {/* Answer Content */}
      <div 
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          <div className="pl-12">
            <p className="text-slate-600 leading-relaxed text-base">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// -- Hero CTA. purple pill, centered label --
function HeroCtaButton({ label, path, className = '', animDelay = '300ms' }) {
  return (
    <button
      type="button"
      onClick={() => navigateTo(path)}
      className={`hero-cta group ${className}`.trim()}
      style={{ animationDelay: animDelay }}
    >
      <span className="hero-cta__label">{label}</span>
    </button>
  );
}

function markImgReady(container, setter) {
  const img = container?.tagName === 'IMG' ? container : container?.querySelector?.('img');
  if (img?.complete && img.naturalWidth > 0) {
    setter(true);
  }
}

function Hero() {
  const { isLight, theme } = useTheme();
  const darkHeroRef = useRef(null);
  const lightHeroRef = useRef(null);
  const [darkHeroReady, setDarkHeroReady] = useState(false);
  const [lightHeroReady, setLightHeroReady] = useState(false);
  const growthRef = useRef(null);
  const modelsRef = useRef(null);
  const [growthVisible, setGrowthVisible] = useState(false);
  const [modelsVisible, setModelsVisible] = useState(false);
  const leftColumnLoop = [...TESTIMONIAL_COLUMNS.left, ...TESTIMONIAL_COLUMNS.left];
  const middleColumnLoop = [...TESTIMONIAL_COLUMNS.middle, ...TESTIMONIAL_COLUMNS.middle];
  const rightColumnLoop = [...TESTIMONIAL_COLUMNS.right, ...TESTIMONIAL_COLUMNS.right];

  const [belowFoldReady, setBelowFoldReady] = useState(false);
  const isMobileViewport = useIsMobileViewport();
  const heroImageReady = isLight ? lightHeroReady : darkHeroReady;

  useLayoutEffect(() => {
    const staticImg = document.querySelector('#ifr-static-hero img');
    if (staticImg?.complete && staticImg.naturalWidth > 0) {
      const lightStatic = document.documentElement.getAttribute('data-theme') === 'light';
      if (lightStatic) setLightHeroReady(true);
      else setDarkHeroReady(true);
    }
    markImgReady(darkHeroRef.current, setDarkHeroReady);
    markImgReady(lightHeroRef.current, setLightHeroReady);
  }, [isLight, theme]);

  useEffect(() => {
    if (!heroImageReady) return;
    removeStaticHero();
  }, [heroImageReady]);

  useEffect(() => {
    preloadHomeHeroForTheme(theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    const show = () => {
      if (!cancelled) startTransition(() => setBelowFoldReady(true));
    };
    const idleMs = isMobileViewport ? 2800 : 2200;
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout: idleMs });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const t = window.setTimeout(show, isMobileViewport ? 500 : 350);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [isMobileViewport]);

  // Section reveal â€” attach after below-fold sections mount
  useEffect(() => {
    if (!belowFoldReady) return undefined;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach((s) => {
      s.classList.add('will-animate');
      obs.observe(s);
    });

    return () => obs.disconnect();
  }, [belowFoldReady]);

  useEffect(() => {
    if (!growthRef.current || growthVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGrowthVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(growthRef.current);

    return () => observer.disconnect();
  }, [growthVisible]);

  useEffect(() => {
    if (!modelsRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setModelsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(modelsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative isolate overflow-x-hidden bg-transparent">
      {/* -- HERO SECTION ? cinematic entry -- */}
      <section
        className={`cinematic-hero relative flex min-h-[100lvh] w-full flex-col overflow-hidden ${
          isMobileViewport
            ? isLight
              ? 'cinematic-hero--light cinematic-hero--mobile'
              : 'cinematic-hero--dark cinematic-hero--mobile'
            : heroImageReady
              ? isLight
                ? 'cinematic-hero--light bg-[#f0f4fa]'
                : 'cinematic-hero--dark bg-[#0a0618]'
              : 'bg-transparent'
        }`}
      >
        <div className="hero-cinematic-media-wrap pointer-events-none absolute inset-0">
          {!isLight ? (
            <div
              ref={darkHeroRef}
              className={`hero-cinematic-media hero-cinematic-media--dark pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${
                darkHeroReady ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            >
              <picture className="block h-full w-full">
                <source media={HERO_MOBILE_MQ} srcSet={HOME_HERO_DARK.mobile} />
                <img
                  src={HOME_HERO_DARK.desktop}
                  alt=""
                  width={1536}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onLoad={() => setDarkHeroReady(true)}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_42%]"
                />
              </picture>
            </div>
          ) : null}
          {isLight ? (
            <div
              ref={lightHeroRef}
              className={`hero-cinematic-media hero-cinematic-media--light pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${
                lightHeroReady ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden
            >
              <picture className="block h-full w-full">
                <source media={HERO_MOBILE_MQ} srcSet={HOME_HERO_LIGHT.mobile} />
                <img
                  src={HOME_HERO_LIGHT.desktop}
                  alt=""
                  width={1536}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onLoad={() => setLightHeroReady(true)}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_38%]"
                />
              </picture>
            </div>
          ) : null}
        </div>
        <div
          className={`hero-cinematic-media-shadow pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-48 ${
            isLight ? 'hero-cinematic-media-shadow--light' : ''
          }`}
          aria-hidden
        />
        {!isLight || !isMobileViewport ? (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-36 bg-gradient-to-t max-md:h-44 sm:hidden ${
              isLight
                ? 'from-white/95 via-white/50 to-transparent'
                : 'from-[#0a0618]/90 via-[#0a0618]/40 to-transparent'
            }`}
            aria-hidden
          />
        ) : null}

        <div className="hero-cinematic-layout relative z-10 mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col px-4 pb-6 pt-16 max-sm:pt-[6.5rem] max-sm:pb-6 sm:px-6 xl:box-border xl:justify-start xl:px-8 xl:pb-12 xl:pt-[11.75rem]">
          <div className="hero-cinematic-content mx-auto flex w-full max-w-[900px] flex-col items-center justify-start text-center max-xl:max-w-[min(100%,36rem)] xl:mx-0 xl:max-w-[40rem] xl:flex-none xl:items-start xl:justify-start xl:text-left">
            <div
              className={`hero-cinematic-glass hero-cinematic-copy-stack flex w-full flex-none flex-col items-center justify-start max-md:mx-auto max-md:max-w-[22.5rem] max-xl:mx-auto max-xl:max-w-[34rem] xl:mx-0 xl:max-w-none xl:items-start ${
                isLight ? 'hero-cinematic-glass--light' : 'hero-cinematic-glass--dark'
              }`}
            >
            <h1
              className={`${TYPE.heroCinematic} hero-cinematic-title mb-2.5 max-w-full px-1 font-semibold tracking-tight max-sm:mb-2 sm:mb-3 xl:mb-2.5 xl:ml-0 xl:mr-0 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
              style={{ letterSpacing: '-0.022em' }}
            >
              <span className="hero-cinematic-title__line">
                India&apos;s Trusted Franchise Consulting Platform
              </span>{' '}
              <span className="hero-cinematic-title__line">
                for Brand Expansion, Franchise Opportunities &amp; Business Investors
              </span>
            </h1>

            <p
              className={`${TYPE.heroCinematicLead} hero-cinematic-lead mx-auto mb-3.5 max-w-[min(100%,34rem)] font-medium max-sm:max-w-[22rem] sm:max-w-[34rem] sm:mb-4 xl:mx-0 xl:mb-4 xl:max-w-none ${
                isLight ? 'text-slate-700' : 'text-white'
              }`}
            >
              Grow your business with expert franchise consulting, verified franchise opportunities, investor connections, franchise expansion strategy, and end-to-end business growth services across India.
            </p>

            <div className="hero-cinematic-why mx-auto mb-4 hidden w-full max-w-[min(100%,28rem)] text-left max-sm:max-w-[18.5rem] sm:max-w-[34rem] xl:mx-0 xl:mb-5 xl:block xl:max-w-none">
              <p
                className={`mb-2.5 text-sm font-semibold tracking-wide sm:text-[0.9375rem] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Why Choose iFranchise?
              </p>
              <ul className="hero-cinematic-benefits grid gap-2 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                {[
                  'Verified Franchise Opportunities',
                  'Franchise Development & Expansion',
                  'Expert Franchise Guidance',
                  'End-to-End Support',
                ].map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 text-[0.8125rem] leading-snug sm:text-sm ${
                      isLight ? 'text-slate-700' : 'text-white'
                    }`}
                  >
                    <FiCheck
                      className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isLight ? 'text-violet-600' : 'text-white'}`}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-cta-row mx-auto mt-3 flex w-full shrink-0 flex-col items-stretch justify-center gap-2.5 px-0 max-md:mt-3 max-md:gap-2.5 sm:mt-3 max-xl:mx-auto xl:mx-0 xl:mt-0 xl:max-w-none xl:flex-row xl:flex-wrap xl:justify-start xl:gap-3 xl:grid xl:max-w-[34rem] xl:grid-cols-2 xl:gap-4 2xl:max-w-[36rem] 2xl:gap-5">
              <HeroCtaButton
                label="Explore Franchise Opportunities"
                path="/franchise-opportunities"
                className="w-full min-w-0"
                animDelay="220ms"
              />
              <HeroCtaButton
                label="Expand Your Brand"
                path="/list-your-brand"
                className="w-full min-w-0"
                animDelay="300ms"
              />
            </div>
            </div>
          </div>
        </div>

      </section>

      <section className="relative z-10 w-full py-8 sm:py-10" aria-label="Trusted franchise brands">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`mb-6 text-sm font-medium sm:mb-8 ${isLight ? 'text-black' : 'text-white'}`}>
              Trusted by franchise brands on the iFranchise network
            </p>
            <TrustLogoMarquee variant="hero" />
          </div>
        </div>
      </section>

      {belowFoldReady ? (
      <Suspense fallback={null}>
      {/* -- FEATURED OPPORTUNITIES (after hero) -- */}
      <div className="section-reveal relative w-full overflow-hidden bg-transparent">
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 pt-14 pb-12">
          <div className="reveal-child text-center mb-10">
            <SectionPill className="mb-4">Opportunities</SectionPill>
            <h2 className={sectionTitleClass(isLight, { tight: true })}>
              Explore Franchise Opportunities Across India
            </h2>
            <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
              Discover franchise opportunities across fashion, food &amp; beverage, retail, education, wellness and other growing industries.
            </p>
          </div>

          <div className="home-featured-opportunities grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getFeaturedOpportunities(3).map((opportunity, i) => (
              <div
                key={opportunity.id}
                className="flex h-full flex-col"
                style={{ animation: `cardReveal 0.4s ease ${i * 0.08 + 0.1}s both` }}
              >
                <OpportunityCard opportunity={opportunity} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <CtaButton
              type="button"
              onClick={() => { window.history.pushState({}, '', '/franchise-opportunities'); window.dispatchEvent(new PopStateEvent('popstate')); }}
            >
              Explore All Franchise Opportunities
            </CtaButton>
          </div>
        </div>

        {/* -- thin divider line replaced by gradient fade -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-8"><div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} /></div>
      </div>

      <HomeFranchiseModelsSection />
      <HomeBrowseInvestmentSection />

      {/* ---------------------------------------------------------------
          CONTINUOUS DARK SECTION: Who We Serve ? Services ? Process
          One living animated background, no dividers, no gaps
      --------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden bg-transparent">

        {/* -- WHO WE HELP -- */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-12">
            <SectionPill className="mb-4">Who We Help</SectionPill>
            <h2 className={sectionTitleClass(isLight, { tight: true })}>
              Helping Brands Grow and Investors Invest
            </h2>
            <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
              Whether you&apos;re planning to expand your business or invest in a franchise, our team is here to guide you through every step.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 lg:grid-cols-2">
            {[
              {
                tag: 'For Brands',
                img: WHO_WE_SERVE_IMAGES.brands,
                heading: 'Expand Your Business Through Franchising',
                description:
                  'Build a franchise model, prepare your business for expansion and connect with qualified franchise partners.',
                points: [
                  'Franchise Business Evaluation',
                  'Franchise Model Development',
                  'Documentation & SOPs',
                  'Investor Acquisition',
                ],
                cta: 'Expand Your Brand',
                path: '/list-your-brand',
                delay: '0.1s',
              },
              {
                tag: 'For Investors',
                img: WHO_WE_SERVE_IMAGES.investors,
                heading: 'Find the Right Franchise Opportunity',
                description:
                  'Explore verified franchise opportunities based on your investment, industry preference and business goals.',
                points: [
                  'Compare Franchise Opportunities',
                  'Understand Business Models',
                  'Evaluate Investment Options',
                  'Connect with Brands',
                ],
                cta: 'Explore Opportunities',
                path: '/franchise-opportunities',
                delay: '0.18s',
              },
            ].map((card, ci) => (
              <div key={card.tag} className="group relative overflow-hidden rounded-2xl flex flex-col"
                style={getCardBaseStyle(isLight, { animation: `fadeUp 0.4s ease ${card.delay} both` })}
                {...cardHoverHandlers(isLight, -6)}
              >
                {/* Hover top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)' }} />

                {/* Image — contained card media */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <ResponsiveImg
                    src={card.img}
                    alt={card.tag}
                    remote
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 420px"
                    className="block h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = IMAGE_FALLBACK;
                    }}
                  />
                  {/* Tag badge */}
                  <span
                    className={`who-serve-image-tag absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-violet-700' : 'text-white'}`}
                    style={imageCornerTagStyle(isLight)}
                  >
                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${isLight ? 'bg-violet-600' : 'bg-violet-300'}`} />
                    {card.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className={`text-[1.05rem] font-extrabold mb-2 leading-snug ${cardTitleClass(isLight)}`}>{card.heading}</h3>
                  <p className={`mb-4 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300/90'}`}>
                    {card.description}
                  </p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {card.points.map((item, i) => (
                      <li key={i} className={`flex items-start gap-2.5 text-[0.8rem] leading-snug ${cardListClass(isLight)}`}>
                        <svg className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Premium CTA button */}
                  <button
                    type="button"
                    onClick={() => { window.history.pushState({}, '', card.path); window.dispatchEvent(new PopStateEvent('popstate')); }}
                    className="group/btn relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)', boxShadow: '0 4px 20px rgba(109,40,217,0.35)', transition: 'box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 35px rgba(109,40,217,0.55)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(109,40,217,0.35)'; }}
                  >
                    {/* Shine sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
                    <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
                      {card.cta}
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-1">
                        <FiArrowRight className="h-3 w-3" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -- thin gradient divider -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-8"><div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} /></div>

        {/* -- SERVICES -- */}
        <OurServicesSection
          isLight={isLight}
          cta="view-all"
          onViewAllServices={() => {
            window.history.pushState({}, '', '/services');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
        />

      </div>

      <div className="relative w-full overflow-hidden bg-transparent">

      {/* -- SOCIAL PROOF ECOSYSTEM -- */}
      <section className="relative w-full pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 lg:pb-8 section-reveal">
        <div className="section-container">
          
          {/* Section Header */}
          <div className="section-header">
            <SectionPill className="mb-5">Testimonials</SectionPill>
            <h2 className="section-title text-white">
              Trusted by brands. Backed by outcomes.
            </h2>
            <p className="section-subtitle text-white/55">
              From franchise structuring to investor conversion, iFranchise has helped brands scale smarter and franchisees choose with confidence.
            </p>
          </div>

          {/* Testimonials Section - UNCHANGED */}
          <div className="mb-16 sm:mb-20">
            <div className="hidden gap-6 sm:gap-9 md:grid md:grid-cols-2 xl:grid-cols-3">
              <div
                className="testi-column relative h-[500px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
              >
                <div className="testi-track-down space-y-6">
                  {leftColumnLoop.map((item, idx) => (
                    <TestimonialStatCard key={`${item.id}-left-${idx}`} item={item} />
                  ))}
                </div>
              </div>
              <div
                className="testi-column relative h-[500px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
              >
                <div className="testi-track-up space-y-6">
                  {middleColumnLoop.map((item, idx) => (
                    <TestimonialStatCard key={`${item.id}-middle-${idx}`} item={item} />
                  ))}
                </div>
              </div>
              <div
                className="testi-column relative h-[500px] overflow-hidden md:hidden xl:block"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
              >
                <div className="testi-track-down space-y-6">
                  {rightColumnLoop.map((item, idx) => (
                    <TestimonialStatCard key={`${item.id}-right-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 md:hidden">
              {HOME_TESTIMONIALS_MOBILE.map((item) => (
                <TestimonialStatCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Stats ? premium glassmorphism cards */}
          <div className="hero-stats-block">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { ...statsCards[0], accent: '#a78bfa', glow: 'rgba(167,139,250,0.2)', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
                { ...statsCards[1], accent: '#34d399', glow: 'rgba(52,211,153,0.2)', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> },
                { ...statsCards[2], accent: '#60a5fa', glow: 'rgba(96,165,250,0.2)', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
                { ...statsCards[3], accent: '#fb923c', glow: 'rgba(251,146,60,0.2)', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0l-1.5-1.5M5 21l1.5-1.5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h6"/></svg> },
              ].map((stat, index) => (
                <div key={stat.title} className="group relative overflow-hidden rounded-2xl p-6 flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${stat.glow}`; e.currentTarget.style.borderColor = `${stat.accent}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }} />

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${stat.accent}20`, color: stat.accent }}>
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <div className="mb-1">
                    <StatCard stat={stat} />
                  </div>

                  {/* Title */}
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: stat.accent }}>
                    {stat.title}
                  </p>

                  {/* Description */}
                  <p className="text-[0.75rem] text-white leading-relaxed flex-1">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Success pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { label: '100+ franchise brands', color: '#a78bfa' },
                { label: 'â‚¹800Cr+ ecosystem influenced', color: '#34d399' },
                { label: '72% investor preference', color: '#60a5fa' },
                { label: '30% CAGR aligned', color: '#fb923c' },
              ].map((item) => (
                <div key={item.label} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* -- FRANCHISE FAQ / DECISION INTELLIGENCE SECTION -- */}
      <section id="faq" className="relative w-full pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 section-reveal">
        <div className="section-container">
          {/* Subtle background pattern */}
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12 flex flex-col justify-center">
          
          {/* TOP CENTER PILL */}
          <div 
            className="text-center mb-8"
            style={{
              opacity: 0,
              animation: 'fadeSlideDown 0.3s ease forwards',
              animationDelay: '0.2s'
            }}
          >
            <SectionPill>FAQs</SectionPill>
          </div>

          {/* SECTION HEADER - CENTERED */}
          <div 
            className="text-center mb-12"
            style={{
              opacity: 0,
              animation: 'fadeSlideUp 0.35s ease forwards',
              animationDelay: '0.1s'
            }}
          >
            <h2 className="home-faq-section__title section-title text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ accordion. home page only */}
          <div
            className="mx-auto w-full max-w-3xl"
            style={{
              opacity: 0,
              animation: 'fadeSlideUp 0.35s ease forwards',
              animationDelay: '0.15s',
            }}
          >
              <div className="services-faq-list space-y-4">
                {HOME_PAGE_FAQS.map((faq, index) => (
                  <PremiumFAQItem
                    key={faq.question}
                    faq={faq}
                    index={index}
                  />
                ))}
              </div>
          </div>
          </div>
        </div>
      </section>

      {/* Smooth transition to footer */}
      </div>
      </Suspense>
      ) : null}
    </main>
  );
}

export default Hero;





