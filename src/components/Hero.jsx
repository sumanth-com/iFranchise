import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import CtaButton from './ui/CtaButton';
import SectionPill from './ui/SectionPill';
import TestimonialCard from './TestimonialCard';
import PremiumFAQItem from './ui/PremiumFAQItem';
import { homeHeroBgDark, homeHeroBgLight, preloadHomeHeroForTheme } from '../lib/preloadHomeHero.js';
import { submitContactForm } from '../lib/forms';
import { digitsOnlyPhone, isContactFormReady } from '@/lib/contactForm';
import { phoneInputProps } from '@/lib/phoneInput';
import { navigateTo } from '@/lib/navigation';
import { useFormSubmission, withHoneypot } from '../hooks/useFormSubmission';
import FormSuccessState from './forms/FormSuccessState';
import HoneypotField from './forms/HoneypotField';
import { WHO_WE_SERVE_IMAGES, HOME_INDUSTRIES, IMAGE_FALLBACK, FRANCHISE_CATEGORY_IMAGES } from '../data/sectionImages';
import { SITE_CONTACT_ITEMS } from '../data/siteContact';
import brandLogo from '../assets/BrandLogo.png';
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
import OpportunityCard from './OpportunityCard';
import { useTheme } from '../context/ThemeContext';
import ProcessGrowthEngineVisual from './ProcessGrowthEngineVisual';
import IndustryCard from './IndustryCard';
import OurServicesSection from './OurServicesSection';
import {
  getCardBaseStyle,
  cardHoverHandlers,
  metricBoxStyle,
  serviceIconStyle,
  imageCornerTagStyle,
  sectionTitleClass,
  sectionSubtitleClass,
  cardTitleClass,
  cardBodyClass,
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
    href: '/contact',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85',
    fallbackImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85',
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
    href: '/contact',
    image:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=85',
    fallbackImage:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=85',
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
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
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
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
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
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    cta: 'Explore FICO',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'Analyze business goals, market positioning, and growth opportunities to define a scalable roadmap.',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description:
      'Create conversion-focused UX/UI aligned with user behavior and business objectives.',
  },
  {
    number: '03',
    title: 'Development & Launch',
    description:
      'Build high-performance platforms optimized for scalability, speed, and real-world usage.',
  },
  {
    number: '04',
    title: 'Optimization & Scale',
    description:
      'Continuously improve performance, conversion, and expansion strategies using real data.',
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
          <img
            ref={imgRef}
            src={card.image}
            alt={card.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (card.fallbackImage) {
                imgRef.current.src = card.fallbackImage;
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

function StatCard({ stat, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;
    const durationMs = 2000; // 2 seconds for smooth animation

    // Always reset to 0 when active changes
    if (!active) {
      setCount(0);
      return undefined;
    }

    // Start animation from 0
    setCount(0);

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Eased animation for smooth counting
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(stat.value * eased);
      
      setCount(currentCount);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly at the target value
        setCount(stat.value);
      }
    };

    // Small delay before starting animation for better visual effect
    const timeoutId = setTimeout(() => {
      frameId = window.requestAnimationFrame(animate);
    }, 200);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active, stat.value]); // Re-run when active changes

  return (
    <div className="inline-block">
      <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white tabular-nums mb-1">
        {count.toLocaleString()}
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
            onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}
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
                window.history.pushState({}, '', `/franchise/${model.slug}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
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
  contactNumber: '',
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
                        →
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
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                type="url"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
              />
              <input
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', digitsOnlyPhone(e.target.value))}
                required
                className="w-full rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
                {...phoneInputProps()}
              />
              <textarea
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                className="w-full resize-none rounded-lg sm:rounded-xl border border-white/15 bg-black/25 px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white outline-none transition duration-200 focus:border-emerald-200/40 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
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
                {isSubmitting ? 'Submitting…' : 'Submit'}
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

// --- Market Intelligence Section ---------------------------------------------

function useCountUp(target, active, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let frameId; let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);
  return count;
}

// -- Dataset definitions ------------------------------------------------------
const CHART_DATASETS = {
  Monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bars:   [42, 48, 55, 51, 60, 67, 63, 72, 78, 74, 85, 92],
    line:   [30, 36, 44, 40, 52, 58, 55, 65, 70, 67, 80, 88],
  },
  Quarterly: {
    labels: ["Q1'21", "Q2'21", "Q3'21", "Q4'21", "Q1'22", "Q2'22", "Q3'22", "Q4'22", "Q1'23", "Q2'23", "Q3'23", "Q4'23"],
    bars:   [38, 45, 52, 61, 58, 70, 78, 85, 80, 90, 95, 100],
    line:   [28, 35, 42, 50, 48, 58, 65, 72, 68, 80, 88, 96],
  },
  Yearly: {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024E', '2025E'],
    bars:   [28, 36, 30, 52, 68, 82, 90, 100],
    line:   [20, 28, 22, 44, 60, 76, 86, 96],
  },
};

const CATEGORIES = [
  { name: 'Food & Beverage', pct: 25, color: '#7c3aed' }, // 6 out of 24 = 25%
  { name: 'Home Services',   pct: 25, color: '#3b82f6' }, // 6 out of 24 = 25%
  { name: 'Health & Wellness', pct: 21, color: '#10b981' }, // 5 out of 24 = 21%
  { name: 'Retail',          pct: 17, color: '#f97316' }, // 4 out of 24 = 17%
  { name: 'Education',       pct: 12, color: '#f43f5e' }, // 3 out of 24 = 12%
];

const SOURCES = ['IFA', 'KPMG', 'Franchise India', 'Statista', 'Deloitte', 'Industry Reports'];

// -- Donut chart --------------------------------------------------------------
function DonutChart({ active }) {
  const r = 48; const cx = 64; const cy = 64;
  const circ = 2 * Math.PI * r;
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (!active) {
      setFilled(0);
      return;
    }
    let frameId; let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      setFilled(Math.floor(72 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) { frameId = requestAnimationFrame(tick); }
      else { setFilled(72); }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active]);
  const dash = (circ * filled) / 100;
  return (
    <svg viewBox="0 0 128 128" className="market-donut-chart h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" className="market-donut-track" strokeWidth="16" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#dg)"
        strokeWidth="16"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        className="market-donut-pct"
        fill="#ffffff"
      >
        {filled}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="market-donut-label"
        fill="rgba(255, 255, 255, 0.9)"
      >
        FRANCHISE
      </text>
    </svg>
  );
}

// -- Bar + line chart ---------------------------------------------------------
function BarLineChart({ dataset, active }) {
  const [tooltip, setTooltip] = useState(null);
  const { labels, bars, line } = dataset;
  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div id="market-intelligence-chart" className="relative h-52 sm:h-56 select-none">
      {/* Y-axis */}
      <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between pr-1.5">
        {yTicks.map((v) => (
          <span key={v} className="text-[9px] text-white font-medium w-5 text-right leading-none">{v}</span>
        ))}
      </div>

      {/* Grid */}
      <div className="absolute left-7 right-0 top-0 bottom-6 pointer-events-none">
        {yTicks.map((_, i) => (
          <div key={i} className="absolute w-full border-t border-white/8"
            style={{ top: `${(i / (yTicks.length - 1)) * 100}%` }} />
        ))}
      </div>

      {/* Bars */}
      <div className="absolute left-7 right-0 top-0 bottom-6 flex items-end gap-1">
        {bars.map((val, i) => (
          <div key={`${labels[i]}-${i}`}
            className="relative flex-1 flex flex-col items-center group/bar cursor-pointer"
            onMouseEnter={() => setTooltip({ i, val, label: labels[i] })}
            onMouseLeave={() => setTooltip(null)}
          >
            {tooltip?.i === i && (
              <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 z-20
                bg-[#0b0f19] text-white text-[10px] font-bold px-2 py-1 rounded-lg
                whitespace-nowrap shadow-xl pointer-events-none">
                {labels[i]}: {val}%
                <div className="absolute top-full left-1/2 -translate-x-1/2
                  border-[3px] border-transparent border-t-[#0b0f19]" />
              </div>
            )}
            <div
              className="w-full rounded-t-[3px] bg-gradient-to-t from-violet-500/90 to-violet-400/60
                group-hover/bar:from-violet-600 group-hover/bar:to-violet-500 transition-colors duration-150"
              style={{
                height: active ? `${val}%` : '2px',
                transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* SVG line overlay */}
      <svg className="absolute pointer-events-none overflow-visible"
        style={{ left: '1.75rem', top: 0, width: 'calc(100% - 1.75rem)', height: 'calc(100% - 1.5rem)' }}
        preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <polyline
          points={line.map((v, i) => `${(i / (line.length - 1)) * 100},${100 - v}`).join(' ')}
          fill="none" stroke="url(#lg2)" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="220" strokeDashoffset={active ? '0' : '220'}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) 0.25s' }}
        />
        {line.map((v, i) => (
          <circle key={i} cx={(i / (line.length - 1)) * 100} cy={100 - v} r="1.4"
            fill="#8b5cf6" opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.25s ease ${0.25 + i * 0.08}s` }} />
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="absolute left-7 right-0 bottom-0 flex justify-between">
        {labels.map((l) => (
          <span key={l} className="text-[8px] sm:text-[9px] text-white font-medium flex-1 text-center leading-none">{l}</span>
        ))}
      </div>
    </div>
  );
}

/* -- Legacy sub-components kept for reference but replaced above -- */
function NodeGraph({ active }) {
  const nodes = [
    { x: 50, y: 50, r: 7, delay: 0 },
    { x: 20, y: 25, r: 4, delay: 0.3 },
    { x: 78, y: 22, r: 5, delay: 0.6 },
    { x: 15, y: 68, r: 4, delay: 0.9 },
    { x: 82, y: 65, r: 6, delay: 0.4 },
    { x: 50, y: 85, r: 4, delay: 0.7 },
    { x: 35, y: 48, r: 3, delay: 1.1 },
    { x: 65, y: 42, r: 3, delay: 0.2 },
  ];
  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,6],[2,7],[3,5],[4,5],
  ];
  return (
    <div className="relative w-full h-36">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="#7c3aed" strokeWidth="0.5" strokeOpacity="0.25"
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 3} fill="#7c3aed" fillOpacity="0.08">
              {active && (
                <animate attributeName="r" values={`${n.r+3};${n.r+6};${n.r+3}`}
                  dur="2.4s" begin={`${n.delay}s`} repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#ng)" />
          </g>
        ))}
        {/* Travelling pulse dot */}
        {active && (
          <circle r="1.8" fill="#a78bfa">
            <animateMotion dur="3s" repeatCount="indefinite" path="M50,50 L20,25 L78,22 L82,65 L50,85 L15,68 L50,50" />
          </circle>
        )}
        <defs>
          <radialGradient id="ng" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
      </svg>
      {/* Signal badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-full px-2.5 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500" />
        </span>
        <span className="text-[10px] font-bold text-violet-700">+34% Growth Signal</span>
      </div>
    </div>
  );
}

/* Card 2 ? Opportunity Gauge */
function OpportunityGauge({ active }) {
  const [angle, setAngle] = useState(0);
  const targetAngle = 210; // ~70% of 300deg arc
  useEffect(() => {
    if (!active) return;
    let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setAngle(Math.floor(targetAngle * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);

  // Arc from -150deg to +150deg (300deg total), needle at `angle` from start
  const cx = 60; const cy = 62; const r = 44;
  const startDeg = -210; // left end
  const needleDeg = startDeg + angle;
  const toRad = (d) => (d * Math.PI) / 180;
  const nx = cx + (r - 6) * Math.cos(toRad(needleDeg));
  const ny = cy + (r - 6) * Math.sin(toRad(needleDeg));

  const arcPath = (start, end, radius) => {
    const s = { x: cx + radius * Math.cos(toRad(start)), y: cy + radius * Math.sin(toRad(start)) };
    const e = { x: cx + radius * Math.cos(toRad(end)),   y: cy + radius * Math.sin(toRad(end)) };
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const zones = [
    { label: 'Saturated', color: '#f43f5e', start: -210, end: -110 },
    { label: 'Emerging',  color: '#f59e0b', start: -110, end: -10  },
    { label: 'High Demand', color: '#10b981', start: -10, end: 90  },
  ];

  return (
    <div className="relative w-full h-36 flex flex-col items-center">
      <svg viewBox="0 0 120 80" className="w-full h-28" preserveAspectRatio="xMidYMid meet">
        {/* Zone arcs */}
        {zones.map((z) => (
          <path key={z.label} d={arcPath(z.start, z.end, 44)}
            fill="none" stroke={z.color} strokeWidth="6" strokeOpacity="0.25" strokeLinecap="round" />
        ))}
        {/* Active arc */}
        <path d={arcPath(-210, startDeg + angle, 44)}
          fill="none" stroke="url(#gaugeGrad)" strokeWidth="6" strokeLinecap="round" />
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="3" fill="#7c3aed" />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {/* Zone labels */}
      <div className="flex items-center gap-3 -mt-2">
        {zones.map((z) => (
          <div key={z.label} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: z.color }} />
            <span className="text-[9px] font-semibold text-white">{z.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card 3 ? Benchmark Speedometer bars */
function BenchmarkBars({ active }) {
  const segments = [
    { label: 'Food & Bev',  score: 88, color: '#7c3aed' },
    { label: 'Retail',      score: 72, color: '#3b82f6' },
    { label: 'Education',   score: 65, color: '#10b981' },
    { label: 'Wellness',    score: 58, color: '#f97316' },
  ];
  return (
    <div className="w-full space-y-2.5 pt-1">
      {segments.map((s, i) => (
        <div key={s.label}>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] font-semibold text-white">{s.label}</span>
            <span className="text-[11px] font-bold text-slate-800">{s.score}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-200"
              style={{
                width: active ? `${s.score}%` : '0%',
                background: s.color,
                transitionDelay: `${0.3 + i * 0.12}s`,
              }}
            />
          </div>
        </div>
      ))}
      {/* Dial indicator */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-white font-medium">Scalability Index</span>
        <span className="text-[11px] font-bold text-violet-600">
          {active ? '? Optimised' : '?'}
        </span>
      </div>
    </div>
  );
}

/* Card 4 ? Investor Signal Stream */
function InvestorSignals({ active }) {
  const signals = [
    {
      icon: (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      text: 'Retail interest rising in Pune',
      time: '2m ago',
      color: 'bg-blue-50 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Food demand trending in Tier 2',
      time: '5m ago',
      color: 'bg-orange-50 border-orange-100',
      iconBg: 'bg-orange-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      text: 'Education sector gaining traction',
      time: '9m ago',
      color: 'bg-emerald-50 border-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      icon: (
        <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      text: 'Wellness brands expanding fast',
      time: '14m ago',
      color: 'bg-violet-50 border-violet-100',
      iconBg: 'bg-violet-100',
    },
  ];
  return (
    <div className="w-full space-y-2 pt-1">
      {signals.map((s, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 ${s.color} transition-all duration-200`}
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : 'translateX(-12px)',
            transitionDelay: `${0.2 + i * 0.15}s`,
          }}
        >
          <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
            {s.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug truncate">{s.text}</p>
            <p className="text-[10px] text-white">{s.time}</p>
          </div>
          <span className="relative shrink-0 flex h-2 w-2">
            {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        </div>
      ))}
    </div>
  );
}

// -- Main section -------------------------------------------------------------
function MarketIntelligenceSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [tab, setTab] = useState('Quarterly');

  // Calculate REAL data from franchise opportunities
  const totalFranchises = franchiseOpportunities.length;
  const totalCities = getTotalCities(); // 8
  const avgROI = getAverageROI(); // Average ROI
  const growthMetrics = calculateGrowthMetrics(); // Recent growth

  const marketSize = useCountUp(totalFranchises, active, 1800);
  const cagr       = useCountUp(avgROI,  active, 1400); // Real: Average ROI
  const cities     = useCountUp(totalCities, active, 1600); // Real: 8 cities
  const investors  = useCountUp(growthMetrics.growthRate,  active, 1500); // Real: Growth rate

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        // Toggle active on every enter/leave ? animations replay each time
        setActive(e.isIntersecting);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const kpis = [
    { label: 'Total Franchises',     value: `${marketSize}`, sub: 'Verified opportunities',   dotColor: '#7c3aed' },
    { label: 'Average ROI',     value: `${cagr}%`,             sub: 'Across all brands',   dotColor: '#10b981' },
    { label: 'Active Cities', value: `${cities}`,            sub: 'Pan India coverage', dotColor: '#3b82f6' },
    { label: 'Recent Growth',  value: `${investors}%`,         sub: 'Last 3 months',  dotColor: '#f97316' },
  ];

  const dataset = CHART_DATASETS[tab];

  // Build smooth cubic bezier SVG path
  const buildPath = (pts, close = false) => {
    if (!pts.length) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cp1x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * 0.4;
      const cp1y = pts[i - 1].y;
      const cp2x = pts[i].x - (pts[i].x - pts[i - 1].x) * 0.4;
      const cp2y = pts[i].y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i].x} ${pts[i].y}`;
    }
    if (close) {
      d += ` L ${pts[pts.length - 1].x} 100 L ${pts[0].x} 100 Z`;
    }
    return d;
  };

  const linePoints = dataset.line.map((v, i) => ({
    x: (i / (dataset.line.length - 1)) * 100,
    y: 100 - v,
  }));

  return (
    <section ref={ref} className="w-full">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 py-10">

        {/* Compact Header */}
        <div className="theme-section-on-light text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-700">India Franchise Market Intelligence</span>
          </div>
          <h2 className={`${TYPE.sectionCompact} text-white`}>
            Inside India&apos;s Franchise Growth Engine
          </h2>
          <p className="text-sm text-white max-w-xl mx-auto leading-relaxed">
            Real-time market insights, investor patterns, and expansion trends shaping India&apos;s franchise future.
          </p>
        </div>

        {/* Live ticker - Reversed Animation (Right to Left) */}
        <div className="mb-5 overflow-hidden rounded-xl border border-white/10 shadow-sm">
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
            {/* Fade edges */}
            <div className="relative overflow-hidden flex-1">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-transparent z-10" />
              {/* Duplicated text for seamless RIGHT?LEFT loop */}
              <div className="flex w-max animate-marquee-left">
                {[0, 1].map((n) => (
                  <p key={n} className="text-xs text-white font-medium whitespace-nowrap pr-16">
                    24 verified franchise opportunities across India &nbsp;&middot;&nbsp;
                    Operating in 8 major cities including Mumbai, Delhi, Bengaluru &nbsp;&middot;&nbsp;
                    Average ROI of 34% across all franchise brands &nbsp;&middot;&nbsp;
                    Food & Beverage and Home Services leading with 25% market share each &nbsp;&middot;&nbsp;
                    Investment opportunities starting from &#8377;25K to &#8377;350K &nbsp;&middot;&nbsp;
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact KPI stat tiles - No hover effects */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                opacity: active ? 1 : 0.4,
                transform: active ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-widest text-white mb-1.5">{k.label}</p>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: k.dotColor }} />
                <p className="text-xl font-extrabold text-white tabular-nums leading-none">{k.value}</p>
              </div>
              <p className="text-[10px] text-white">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Premium Main dashboard card */}
        <div className="theme-dark-surface rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_280px]">

            {/* LEFT ? Premium Chart panel */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-white/10">

              {/* Chart header row */}
              <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white mb-0.5">Revenue Growth Index</p>
                  <p className="text-sm font-extrabold text-white">India Franchise Market Expansion</p>
                </div>
                {/* More prominent tab buttons */}
                <div className="market-intel-tabs flex items-center gap-1 rounded-xl p-1 shrink-0" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  {['Monthly', 'Quarterly', 'Yearly'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`market-intel-tab-btn text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
                        tab === t
                          ? 'is-active bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-md'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Professional Chart area with clear labels */}
              <div className="relative h-52 select-none">
                {/* Y-axis with percentage labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between pr-2 pointer-events-none">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <span key={v} className="text-[10px] text-white font-medium w-7 text-right leading-none">{v}%</span>
                  ))}
                </div>

                {/* Grid lines - Professional stock style */}
                <div className="absolute left-9 right-0 top-0 bottom-8 pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="absolute w-full border-t border-white/8" style={{ top: `${(i / 4) * 100}%` }} />
                  ))}
                  {/* Vertical grid lines */}
                  {dataset.labels.map((_, i) => (
                    <div 
                      key={`vline-${i}`} 
                      className="absolute h-full border-l border-white/5" 
                      style={{ left: `${(i / (dataset.labels.length - 1)) * 100}%` }} 
                    />
                  ))}
                </div>

                {/* SVG chart - Stock-style realistic line */}
                <svg
                  className="absolute top-0 pointer-events-none"
                  style={{ left: '2.25rem', width: 'calc(100% - 2.25rem)', height: 'calc(100% - 2rem)' }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* 3D Pipe gradients ? white/silver */}
                    <linearGradient id="miBarGrad3D" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
                      <stop offset="15%" stopColor="#cbd5e1" stopOpacity="0.75" />
                      <stop offset="35%" stopColor="#f1f5f9" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="65%" stopColor="#f1f5f9" stopOpacity="0.95" />
                      <stop offset="85%" stopColor="#cbd5e1" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.5" />
                    </linearGradient>
                    {/* Top ellipse gradient - bright white reflection */}
                    <radialGradient id="miBarTop" cx="50%" cy="30%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor="#f1f5f9" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.85" />
                    </radialGradient>
                    {/* Bottom ellipse gradient - darker silver for depth */}
                    <radialGradient id="miBarBottom" cx="50%" cy="70%">
                      <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#64748b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#475569" stopOpacity="0.7" />
                    </radialGradient>
                    <linearGradient id="miAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    {/* Enhanced shadow filter for stronger 3D depth */}
                    <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/>
                      <feOffset dx="1" dy="2" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    {/* Inner shadow for depth */}
                    <filter id="innerShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
                      <feOffset dx="0" dy="1"/>
                      <feComposite operator="out" in="SourceGraphic"/>
                    </filter>
                  </defs>

                  {/* Premium 3D Pipe Bars with Enhanced Depth */}
                  {dataset.bars.map((val, i) => {
                    const bw = 100 / dataset.bars.length;
                    const x = i * bw + bw * 0.22;
                    const w = bw * 0.56;
                    const barH = active ? val : val * 0.3;
                    const topY = 100 - barH;
                    const ellipseRy = w * 0.18; // Larger ellipse for more 3D effect
                    
                    return (
                      <g key={`${tab}-bar-${i}`}>
                        {/* Bottom ellipse (base) - creates 3D bottom cap */}
                        <ellipse
                          cx={x + w / 2}
                          cy={100}
                          rx={w / 2}
                          ry={ellipseRy * 0.8}
                          fill="url(#miBarBottom)"
                          opacity="0.6"
                        />
                        
                        {/* Main pipe body with enhanced shadow */}
                        <g filter="url(#barShadow)">
                          {/* Pipe body with cylindrical gradient */}
                          <rect
                            x={x} 
                            y={topY + ellipseRy} 
                            width={w} 
                            height={barH - ellipseRy}
                            fill="url(#miBarGrad3D)"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Strong highlight on left edge - light reflection */}
                          <rect
                            x={x + w * 0.08}
                            y={topY + ellipseRy}
                            width={w * 0.2}
                            height={barH - ellipseRy}
                            fill="white"
                            opacity="0.25"
                            rx="1"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Strong shadow on right edge - depth */}
                          <rect
                            x={x + w - w * 0.22}
                            y={topY + ellipseRy}
                            width={w * 0.22}
                            height={barH - ellipseRy}
                            fill="black"
                            opacity="0.25"
                            rx="1"
                            style={{
                              transition: `height 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, y 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* 3D Top cap (ellipse) with radial gradient */}
                          <ellipse
                            cx={x + w / 2}
                            cy={topY + ellipseRy}
                            rx={w / 2}
                            ry={ellipseRy}
                            fill="url(#miBarTop)"
                            style={{
                              transition: `cy 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                          
                          {/* Top highlight - glossy effect */}
                          <ellipse
                            cx={x + w / 2}
                            cy={topY + ellipseRy * 0.7}
                            rx={w / 3}
                            ry={ellipseRy * 0.5}
                            fill="white"
                            opacity="0.3"
                            style={{
                              transition: `cy 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s`,
                            }}
                          />
                        </g>
                      </g>
                    );
                  })}

                  {/* Subtle area fill under line */}
                  <path d={buildPath(linePoints, true)} fill="url(#miAreaGrad)" />

                  {/* Realistic stock-style trend line - Clean green */}
                  <path
                    key={`${tab}-line`}
                    d={buildPath(linePoints)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="200"
                    strokeDashoffset={active ? '0' : '200'}
                    style={{ 
                      transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
                    }}
                  />

                  {/* Small dots on line - Stock style */}
                  {linePoints.map((pt, i) => (
                    <circle
                      key={`${tab}-dot-${i}`}
                      cx={pt.x} cy={pt.y} r="1.5"
                      fill="#10b981"
                      opacity={active ? 0.6 : 0}
                      style={{ 
                        transition: `opacity 0.3s ease ${0.6 + i * 0.08}s`,
                      }}
                    />
                  ))}
                </svg>

                {/* X-axis labels - Clear and visible */}
                <div className="absolute left-9 right-0 bottom-0 flex justify-between px-1">
                  {dataset.labels.map((l) => (
                    <span key={l} className="text-[10px] text-white font-semibold flex-1 text-center">{l}</span>
                  ))}
                </div>
              </div>

              {/* Useful insights below chart - No wasted space */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between gap-4">
                  {/* Legend */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to top, #7c3aed, #a78bfa)' }} />
                      <span className="text-[10px] text-white font-medium">Market Growth</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0.5 bg-emerald-500 rounded" />
                      <span className="text-[10px] text-white font-medium">CAGR Trend</span>
                    </div>
                  </div>
                  {/* Key insight */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.15)" }}>
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-bold text-emerald-400">+{avgROI}% Avg Growth</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT ? Compact Donut + Category bars */}
            <div className="flex flex-col divide-y divide-white/10">

              {/* Compact Donut */}
              <div className="p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white mb-0.5">Investor Preference</p>
                <p className="text-xs font-bold text-white mb-3">Franchise vs Independent</p>
                <div className="flex items-center gap-3">
                  <div className="w-[75px] h-[75px] shrink-0">
                    <DonutChart active={active} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Franchise Model', pct: '72%', color: '#7c3aed' },
                      { label: 'Independent',     pct: '28%', color: '#e2e8f0' },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                        <div>
                          <p className="text-[10px] font-semibold text-white leading-tight">{s.label}</p>
                          <p className="text-[9px] text-white">{s.pct}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-[9px] text-white italic">3&times; since 2020</p>
                  </div>
                </div>
              </div>

              {/* Compact Category bars */}
              <div className="p-4 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white mb-0.5">Top Sectors</p>
                <p className="text-xs font-bold text-white mb-3">Fastest Growing Categories</p>
                <div className="space-y-2.5">
                  {CATEGORIES.map((cat, i) => (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-white">{cat.name}</span>
                        <span className="market-intel-sector-pct text-[10px] font-bold">{cat.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-200"
                          style={{
                            width: active ? `${cat.pct}%` : `${cat.pct * 0.25}%`,
                            background: cat.color,
                            transitionDelay: `${0.4 + i * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Compact Source strip */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Verified Sources:</span>
            {SOURCES.map((s) => (
              <span key={s} className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-[11px] text-white font-medium">AI + Market Intelligence Powered</p>
          </div>
        </div>



      </div>
    </section>
  );
}

// --- Process Timeline Component ----------------------------------------------

const PROCESS_FLOWS = {
  Investors: [
    {
      num: '01',
      title: 'Discover Opportunities',
      desc: 'Browse franchise businesses based on industry, location, and investment range.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Evaluate the Business',
      desc: 'Review business models, investment details, support systems, and growth potential.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Connect & Start',
      desc: 'Connect directly with brands and take the next step toward franchise ownership.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ],
  Brands: [
    {
      num: '01',
      title: 'List Your Franchise',
      desc: 'Showcase your business opportunity with detailed franchise information.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Reach the Right Investors',
      desc: 'Get visibility among investors actively searching for franchise opportunities.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Expand Across Markets',
      desc: 'Build your franchise presence and grow across new cities and regions.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ],
};

function ProcessStepCard({ step, index, visible, isLight }) {
  const cardSurface = isLight
    ? { background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)' }
    : { background: 'rgba(109,40,217,0.22)', border: '1px solid rgba(167,139,250,0.42)', boxShadow: '0 8px 32px rgba(109,40,217,0.28)', backdropFilter: 'blur(12px)' };
  const numStyle = isLight
    ? { background: '#ffffff', border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)', color: '#0b0f19' }
    : {
        background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
        border: '2px solid rgba(167,139,250,0.55)',
        boxShadow: '0 0 0 4px rgba(139,92,246,0.2), 0 4px 16px rgba(109,40,217,0.4)',
        color: '#ffffff',
      };
  return (
    <div
      className="relative flex-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.45s ease ${index * 0.1}s, transform 0.45s ease ${index * 0.1}s`,
      }}
    >
      <div
        className="group relative flex h-full min-h-[118px] overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
        style={cardSurface}
      >
        {!isLight && (
          <>
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, transparent 60%)' }}
            />
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.85), transparent)' }}
            />
          </>
        )}
        <div className="relative z-10 flex w-full items-start gap-4">
          <div
            className="process-step-num flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={numStyle}
          >
            <span className="text-xs font-extrabold">{step.num}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`mb-1.5 text-[0.95rem] font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>{step.title}</h3>
            <p className={`text-[0.78rem] leading-relaxed ${isLight ? 'text-slate-600' : 'text-white'}`}>{step.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessTimeline({ isLight }) {
  const [mode, setMode] = useState('Investors');
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const hasShown = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasShown.current) {
          hasShown.current = true;
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = PROCESS_FLOWS[mode];

  return (
    <>
      <style>{`
        .process-cinematic-grid {
          background-image:
            linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          animation: processGridDrift 24s linear infinite;
        }
        @keyframes processGridDrift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 28px 28px, 28px 28px; }
        }
        .process-hub-pulse { animation: processHubPulse 3.2s ease-in-out infinite; }
        @keyframes processHubPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 40px rgba(124,58,237,0.4); }
          50% { transform: translate(-50%, -50%) scale(1.06); box-shadow: 0 0 56px rgba(167,139,250,0.55); }
        }
        .process-orbit-node {
          animation: processOrbitFloat 3.5s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(196,181,253,0.8);
        }
        @keyframes processOrbitFloat {
          0%, 100% { transform: translateY(0); opacity: 0.65; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
        .process-flow-line { stroke-dasharray: 400; animation: processFlowDraw 4s ease-in-out infinite; }
        .process-flow-line-alt { animation: processFlowDash 6s linear infinite; }
        @keyframes processFlowDraw {
          0% { stroke-dashoffset: 400; opacity: 0.35; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -400; opacity: 0.35; }
        }
        @keyframes processFlowDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -80; }
        }
        .process-float-badge { animation: processBadgeFloat 4s ease-in-out infinite; }
        @keyframes processBadgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <div ref={ref} className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
        <ProcessGrowthEngineVisual mode={mode} visible={visible} isLight={isLight} />
        <div className="flex min-h-[420px] flex-col gap-5">
          <div
            className={`process-mode-toggle inline-flex w-fit items-center gap-1 rounded-2xl p-1 ${isLight ? 'bg-slate-100 border border-slate-200' : ''}`}
            style={isLight ? undefined : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {['Investors', 'Brands'].map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`relative rounded-xl px-5 sm:px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                    isLight
                      ? active
                        ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-[0_4px_16px_rgba(109,40,217,0.35)]'
                        : 'bg-transparent text-slate-600 hover:text-slate-900'
                      : ''
                  }`}
                  style={
                    isLight
                      ? undefined
                      : {
                          background: active ? 'linear-gradient(135deg, #6d28d9, #4f46e5)' : 'transparent',
                          color: active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                          boxShadow: active ? '0 4px 16px rgba(109,40,217,0.4)' : 'none',
                        }
                  }
                >
                  For {m}
                </button>
              );
            })}
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4">
            {steps.map((step, i) => (
              <ProcessStepCard key={`${mode}-${step.num}`} step={step} index={i} visible={visible} isLight={isLight} />
            ))}
          </div>
        </div>
      </div>
    </>
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

// -- Hero CTA. white pill, purple text (excluded from site-wide violet CTAs) --
function HeroCtaButton({ label, path, className = '', animDelay = '300ms' }) {
  return (
    <button
      type="button"
      onClick={() => navigateTo(path)}
      className={`hero-cta group ${className}`.trim()}
      style={{ animationDelay: animDelay }}
    >
      <span className="hero-cta__label">{label}</span>
      <span className="hero-cta__icon" aria-hidden>
        <svg className="hero-cta__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
        </svg>
      </span>
    </button>
  );
}

function markImgReady(img, setter) {
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
  const statsRef = useRef(null);
  const modelsRef = useRef(null);
  const processRef = useRef(null);
  const processTimelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [growthVisible, setGrowthVisible] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [modelsVisible, setModelsVisible] = useState(false);
  const [processLineProgress, setProcessLineProgress] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [visibleProcessSteps, setVisibleProcessSteps] = useState(() =>
    processSteps.map(() => false)
  );
  const leftColumnLoop = [...TESTIMONIAL_COLUMNS.left, ...TESTIMONIAL_COLUMNS.left];
  const middleColumnLoop = [...TESTIMONIAL_COLUMNS.middle, ...TESTIMONIAL_COLUMNS.middle];
  const rightColumnLoop = [...TESTIMONIAL_COLUMNS.right, ...TESTIMONIAL_COLUMNS.right];

  useLayoutEffect(() => {
    markImgReady(darkHeroRef.current, setDarkHeroReady);
    markImgReady(lightHeroRef.current, setLightHeroReady);
  }, [isLight, theme]);

  useEffect(() => {
    preloadHomeHeroForTheme(theme);
  }, [theme]);

  useEffect(() => {
    let frameId;
    let startTime;
    const durationMs = 1400;
    const targetCount = 150;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setReviewCount(Math.floor(targetCount * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Section reveal ? replays every time section enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Remove so it re-animates next time it enters
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
  }, []);

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
    if (!statsRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Always reset to false first, then trigger animation
          setStatsInView(false);
          // Use requestAnimationFrame to ensure state update happens before triggering animation
          requestAnimationFrame(() => {
            setStatsInView(true);
          });
        } else {
          // Reset when leaving viewport to prepare for next animation
          setStatsInView(false);
        }
      },
      { 
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-50px 0px' // Add some margin to prevent premature triggering
      }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    if (!processTimelineRef.current) {
      return undefined;
    }

    let rafId = null;

    const updateProgress = () => {
      const rect = processTimelineRef.current.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.55;
      const rawProgress = (triggerY - rect.top) / rect.height;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProcessLineProgress(clamped);
      rafId = null;
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const refs = stepRefs.current.filter(Boolean);
    if (!refs.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-step-index'));
          if (entry.isIntersecting) {
            setVisibleProcessSteps((prev) => {
              if (prev[idx]) {
                return prev;
              }
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative isolate overflow-x-hidden bg-transparent">
      {/* -- HERO SECTION ? cinematic entry -- */}
      <section
        className={`cinematic-hero relative flex h-[100dvh] max-h-[100dvh] min-h-[100dvh] w-full flex-col overflow-hidden ${
          isLight ? 'cinematic-hero--light bg-[#f0f4fa]' : 'cinematic-hero--dark bg-[#0a0618]'
        }`}
      >
        <div className="hero-cinematic-media-wrap pointer-events-none absolute inset-0">
          <img
            ref={darkHeroRef}
            src={homeHeroBgDark}
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            onLoad={() => setDarkHeroReady(true)}
            className={`hero-cinematic-media hero-cinematic-media--dark pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_42%] transition-opacity duration-300 ease-out ${
              !isLight && darkHeroReady ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden
          />
          <img
            ref={lightHeroRef}
            src={homeHeroBgLight}
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            onLoad={() => setLightHeroReady(true)}
            className={`hero-cinematic-media hero-cinematic-media--light pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_38%] transition-opacity duration-300 ease-out ${
              isLight && lightHeroReady ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden
          />
        </div>
        <div
          className={`hero-cinematic-media-shadow pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-48 ${
            isLight ? 'hero-cinematic-media-shadow--light' : ''
          }`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-44 bg-gradient-to-t sm:hidden ${
            isLight
              ? 'from-white/95 via-white/50 to-transparent'
              : 'from-[#0a0618]/90 via-[#0a0618]/40 to-transparent'
          }`}
          aria-hidden
        />

        <div className="hero-cinematic-layout relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-6 pt-16 max-sm:pt-[6.5rem] max-sm:pb-8 sm:px-8 max-xl:pb-10 xl:justify-center xl:pb-20">
          <div className="hero-cinematic-content mx-auto flex w-full max-w-[900px] flex-col items-center justify-start text-center max-xl:max-w-[min(100%,52rem)] xl:flex-none xl:justify-center">
            <div className="flex w-full flex-none flex-col items-center justify-start xl:justify-center">
            <div
              className="hero-cinematic-pill cinematic-enter-pill hero-cinematic-pill--animated mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-[10px] max-sm:mb-3.5 sm:mb-6 sm:gap-3 sm:px-6 sm:py-2.5"
              style={
                isLight
                  ? undefined
                  : {
                      background: 'rgba(88,28,135,0.55)',
                      borderColor: 'rgba(192,132,252,0.5)',
                    }
              }
            >
              <span className="hero-cinematic-pill-dot h-2.5 w-2.5 flex-shrink-0 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]" aria-hidden />
              <span
                className={`hero-cinematic-pill-text text-xs font-bold uppercase tracking-[0.16em] sm:text-[13px] sm:tracking-[0.18em] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Built for Ambitious Growth
              </span>
            </div>

            <h1
              className={`${TYPE.heroCinematic} mb-3.5 max-w-full px-0.5 font-semibold tracking-tight max-sm:mb-3 sm:mb-5 xl:mb-3 xl:whitespace-nowrap ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
              style={
                isLight
                  ? { letterSpacing: '-0.025em' }
                  : {
                      letterSpacing: '-0.025em',
                      textShadow:
                        '0 2px 28px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.9)',
                    }
              }
            >
              Where <span className={`hero-cinematic-accent ${isLight ? 'text-violet-700' : 'text-violet-300'}`}>Brands</span> Expand
              <br className="hidden xl:block" />
              <span className="xl:hidden"> </span>
              and <span className={`hero-cinematic-accent ${isLight ? 'text-violet-700' : 'text-violet-300'}`}>Investors</span> Discover What&apos;s Next
            </h1>

            <p
              className={`${TYPE.heroCinematicLead} mx-auto max-w-[min(100%,28rem)] font-normal sm:max-w-[34rem] ${
                isLight ? 'text-slate-600' : 'text-white/95'
              }`}
              style={
                isLight
                  ? undefined
                  : {
                      textShadow: '0 2px 14px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,0.55)',
                    }
              }
            >
              iFranchise connects growing businesses with serious investors through a smarter ecosystem built for long-term growth.
            </p>

            <div className="hero-cta-row mx-auto mt-4 flex w-full max-w-[900px] shrink-0 flex-row flex-wrap items-stretch justify-center gap-2.5 px-1 sm:mt-5 sm:gap-3 xl:mt-1.5 xl:grid xl:max-w-[34rem] xl:grid-cols-2 xl:gap-4 xl:px-0 2xl:max-w-[36rem] 2xl:gap-5 2xl:mt-2.5">
              <HeroCtaButton
                label="Explore Opportunities"
                path="/franchise-opportunities"
                className="min-w-0 xl:w-full"
                animDelay="220ms"
              />
              <HeroCtaButton
                label="List Your Brand"
                path="/list-your-brand"
                className="min-w-0 xl:w-full"
                animDelay="300ms"
              />
            </div>
            </div>
          </div>
        </div>

      </section>

      {/* -- FEATURED OPPORTUNITIES (after hero) -- */}
      <div className="section-reveal relative w-full overflow-hidden bg-transparent">
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 pt-14 pb-12">
          <div className="reveal-child text-center mb-10">
            <SectionPill className="mb-4">Opportunities</SectionPill>
            <h2 className={sectionTitleClass(isLight, { tight: true })}>Featured Franchises</h2>
            <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
              Curated, high-performing brands ready for expansion and investment.
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
              View All Opportunities
            </CtaButton>
          </div>
        </div>

        {/* -- thin divider line replaced by gradient fade -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-8"><div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} /></div>
      </div>

      {/* ---------------------------------------------------------------
          CONTINUOUS DARK SECTION: Who We Serve ? Services ? Process
          One living animated background, no dividers, no gaps
      --------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden bg-transparent">

        {/* -- WHO WE SERVE -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-12">
            <SectionPill className="mb-4">Who We Serve</SectionPill>
            <h2 className={sectionTitleClass(isLight, { tight: true })}>Built for Investors and Growing Brands</h2>
            <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
              Whether investing in franchise businesses or expanding your brand ? iFranchise provides the infrastructure for long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                tag: 'For Investors',
                img: WHO_WE_SERVE_IMAGES.investors,
                heading: 'Invest in Businesses Built for Long-Term Growth',
                points: ['Explore verified franchise opportunities', 'Compare business models & investment requirements', 'Discover opportunities across multiple industries', 'Connect directly with franchise brands'],
                cta: 'Explore Opportunities',
                path: '/franchise-opportunities',
                delay: '0.1s',
              },
              {
                tag: 'For Brands',
                img: WHO_WE_SERVE_IMAGES.brands,
                heading: 'Turn Your Brand Into a Scalable Franchise Network',
                points: ['Reach serious investors actively looking for opportunities', 'Expand into new markets and cities', 'Generate qualified franchise leads', 'Build a stronger brand presence'],
                cta: 'List Your Brand',
                path: '/list-your-brand',
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

                {/* Image ? full card width, natural height */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.tag}
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
                  <h3 className={`text-[1.05rem] font-extrabold mb-4 leading-snug ${cardTitleClass(isLight)}`}>{card.heading}</h3>
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

        {/* -- thin divider line replaced by gradient fade -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-8"><div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} /></div>

        {/* -- thin divider line replaced by gradient fade -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-8"><div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} /></div>

        {/* -- PROCESS -- */}
        <div id="about" ref={processRef} className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-14">
            <SectionPill className="mb-4">iFranchise Process</SectionPill>
            <h2 className={sectionTitleClass(isLight, { tight: true })}>Two Strategic Paths. One Growth Engine.</h2>
            <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
              Whether scaling a franchise brand or investing in the right opportunity ? iFranchise simplifies every critical step.
            </p>
          </div>

          {/* Full ProcessTimeline ? free scroll, no viewport constraint */}
          <ProcessTimeline isLight={isLight} />

          {/* Outcome metrics */}
          <div className={`${TYPE.mobileStatsGrid} mt-14 gap-4 sm:grid-cols-4`}>
            {[
              { value: '30 Days', label: 'To Franchise-Ready' },
              { value: '90 Days', label: 'First Investor Matched' },
              { value: '6 Months', label: 'First Unit Live' },
              { value: '12 Months', label: 'Multi-City Expansion' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center py-5 px-4 rounded-2xl text-center" style={metricBoxStyle(isLight)}>
                <p className={`text-xl font-extrabold mb-1 ${cardTitleClass(isLight)}`}>{m.value}</p>
                <p className={`text-[0.7rem] font-medium ${cardBodyClass(isLight)}`}>{m.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <CtaButton type="button" onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}>
              Start Your Expansion Journey
            </CtaButton>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------
          CONTINUOUS DARK SECTION: Industries ? Featured Opportunities
          Same living animated background, seamless flow
      --------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden bg-transparent">

        {/* -- INDUSTRIES -- */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="theme-section-on-light text-center mb-10">
            <SectionPill className="mb-4">Industries</SectionPill>
            <h2 className={sectionTitleClass(isLight, { tight: true })}>
              Opportunities Across High-Growth Industries
            </h2>
            <p className={sectionSubtitleClass(isLight, 'max-w-xl')}>
              Franchise opportunities across India's most dynamic sectors ? each with proven models and qualified investors.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_INDUSTRIES.map((ind, i) => (
              <div key={ind.label} className="h-full" style={{ animation: `cardReveal 0.4s ease ${i * 0.07 + 0.1}s both` }}>
                <IndustryCard
                  label={ind.label}
                  desc={ind.desc}
                  img={ind.img}
                  accent={ind.accent}
                  priority={i < 3}
                  onExplore={() => {
                    window.history.pushState({}, '', '/franchise-opportunities');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <CtaButton
              type="button"
              onClick={() => { window.history.pushState({}, '', '/franchise-opportunities'); window.dispatchEvent(new PopStateEvent('popstate')); }}
            >
              Explore All Industries
            </CtaButton>
          </div>
        </div>

        {/* thin gradient divider */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-8"><div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)' }} /></div>

      </div>

      {/* ---------------------------------------------------------------
          CONTINUOUS DARK SECTION: Why iFranchise ? Testimonials ? Market Intelligence ? FAQ
      --------------------------------------------------------------- */}
      <div className="relative w-full overflow-hidden bg-transparent">

      {/* -- WHY iFRANCHISE SECTION -- */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="theme-section-on-light text-center mb-8 sm:mb-10">
            <SectionPill className="mb-4">Why iFranchise</SectionPill>
            <h2 className={`${TYPE.sectionBand} text-white mb-3 px-4`}>
              Why Investors and Brands Choose iFranchise
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-2xl mx-auto px-4">
              Built to simplify franchise discovery, expansion, and investment through structured business intelligence.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {[
              {
                title: 'Verified Opportunities',
                desc: 'Every opportunity is reviewed and structured to provide clarity and transparency.',
                delay: 0,
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
              },
              {
                title: 'Faster Brand Expansion',
                desc: 'We help brands connect with the right investors to scale faster across markets.',
                delay: 0.07,
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
              },
              {
                title: 'Investor-Focused Discovery',
                desc: 'Simplified franchise discovery experience designed around business goals and investment intent.',
                delay: 0.14,
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
              },
              {
                title: 'Data-Driven Marketplace',
                desc: 'Industry-focused insights and structured business information help users make better decisions.',
                delay: 0.21,
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={card.delay} className="h-full">
                <div className="theme-light-card group relative h-full flex flex-col overflow-hidden rounded-2xl"
                  style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(109,40,217,0.3)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.18)'; }}
                >
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)' }} />
                  {/* Shine sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full pointer-events-none rounded-2xl"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', transition: 'transform 0.7s ease' }} />

                  {/* Icon area */}
                  <div className="relative flex items-center justify-center h-44 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
                    <div className="why-feature-icon relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300 group-hover:scale-110 [&_svg]:text-current"
                      style={isLight
                        ? { background: 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%)', border: '1px solid #5b21b6', color: '#ffffff', boxShadow: '0 8px 24px rgba(109,40,217,0.25)', animation: `iconPulse 3s ease-in-out infinite ${i * 0.5}s` }
                        : { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', boxShadow: '0 0 0 0 rgba(139,92,246,0.4)', animation: `iconPulse 3s ease-in-out infinite ${i * 0.5}s` }}
                      ref={(el) => {
                        if (!el || el.dataset.hoverBound === '1') return;
                        el.dataset.hoverBound = '1';
                        const c = el.closest('.group');
                        if (!c) return;
                        const base = isLight
                          ? { background: 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%)', border: '1px solid #5b21b6', color: '#ffffff' }
                          : { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' };
                        const onEnter = () => {
                          el.style.background = isLight ? 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)' : 'rgba(139,92,246,0.3)';
                          el.style.boxShadow = '0 0 24px rgba(109,40,217,0.45)';
                        };
                        const onLeave = () => {
                          el.style.background = base.background;
                          el.style.border = base.border;
                          el.style.color = base.color;
                          el.style.boxShadow = isLight ? '0 8px 24px rgba(109,40,217,0.25)' : 'none';
                        };
                        c.addEventListener('mouseenter', onEnter);
                        c.addEventListener('mouseleave', onLeave);
                      }}
                    >
                      {card.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-2 flex flex-col flex-1">
                    <h3 className="text-[1rem] font-bold text-white leading-snug mb-2">{card.title}</h3>
                    <p className="text-[0.8rem] text-white leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={() => { window.history.pushState({}, '', '/franchise-opportunities'); window.dispatchEvent(new PopStateEvent('popstate')); }}
              className="why-section-cta group inline-flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)', boxShadow: '0 4px 20px rgba(109,40,217,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(109,40,217,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(109,40,217,0.35)'; }}
            >
              Explore Franchise Opportunities
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* -- SOCIAL PROOF ECOSYSTEM -- */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 section-reveal">
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
          <div ref={statsRef} className="mb-16 sm:mb-20">
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
                    <StatCard stat={stat} active={statsInView} />
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
                { label: '₹800Cr+ ecosystem influenced', color: '#34d399' },
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
          {/* Brand Trust Rail */}
          <div className="text-center">
            <p className="text-sm font-medium text-white mb-6 sm:mb-8">
              Trusted by franchise brands on the iFranchise network
            </p>

            <TrustLogoMarquee variant="hero" />
          </div>

        </div>
      </section>

      {/* -- INDIA FRANCHISE MARKET INTELLIGENCE -- */}
      <MarketIntelligenceSection />

      {/* -- FRANCHISE FAQ / DECISION INTELLIGENCE SECTION -- */}
      <section id="faq" className="relative w-full py-12 sm:py-16 lg:py-20 section-reveal">
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
              Helpful Franchise Questions & Answers
            </h2>
            <p className="home-faq-section__subtitle text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
              Everything founders, investors, and franchise buyers need to know before making expansion decisions.
            </p>
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
              <div className="space-y-3">
                {[
                  {
                    number: "01",
                    question: "How much does it cost to start a franchise?",
                    answer: "Franchise investment varies by industry. Low-cost franchises (?2-10 lakhs), mid-range (?10-50 lakhs), premium (?50 lakhs+). FOCO models require 30-40% less capital than FOFO models."
                  },
                  {
                    number: "02", 
                    question: "What's the difference between FOCO, FOFO & COCO?",
                    answer: "FOCO: You invest, company operates. FOFO: You own and operate. COCO: Company owned and operated. Each offers different risk-reward profiles and involvement levels."
                  },
                  {
                    number: "03",
                    question: "Is franchise business profitable in India?",
                    answer: "Successful franchises achieve 15-25% net margins after stabilization. F&B shows 18-30% gross margins, retail 25-40%, services 35-50%. Success depends on brand strength and execution."
                  },
                  {
                    number: "04",
                    question: "What legal documents are required?",
                    answer: "Essential documents: FDD, Franchise Agreement, Trademark License, Operations Manual, Territory Rights. Plus GST registration, FSSAI license, and local permits."
                  },
                  {
                    number: "05",
                    question: "How long does it take to launch a franchise?",
                    answer: "Typically 3-6 months from agreement to opening. Includes due diligence, documentation, site selection, setup, training, and soft launch preparation."
                  }
                ].map((faq, index) => (
                  <PremiumFAQItem 
                    key={faq.number}
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
    </main>
  );
}

export default Hero;





