import '../styles/services-process-mobile.css';
import { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrendingUp, FiTarget, FiUsers, FiMessageSquare,
  FiHeadphones, FiGlobe, FiArrowRight, FiCheck,
  FiBarChart2, FiZap, FiShield, FiLayers,
  FiCheckCircle, FiRefreshCw, FiFileText, FiAward, FiActivity,
  FiUserCheck, FiBookOpen, FiUserPlus, FiCompass, FiMap,
  FiCoffee, FiTool, FiShoppingBag
} from 'react-icons/fi';
import CtaButton from './ui/CtaButton';
import SectionPill from './ui/SectionPill';
import { useTheme } from '../context/ThemeContext';
import BrandLogo from '../assets/BrandLogo.webp';
import { SERVICES_INDUSTRIES } from '../data/sectionImages';
import {
  franchiseOpportunities,
  getFeaturedOpportunities,
  toInvestorDashboardOpportunity,
} from '../data/franchiseData';
import { navigateTo as spaNavigate, scrollToHashSection } from '@/lib/navigation';
import IndustryCard from './IndustryCard';
import OurServicesSection from './OurServicesSection';
import { heroDisplayClass, sectionTitleClass, sectionSubtitleClass } from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';
import reviewR1 from '../assets/R1.webp';
import reviewR2 from '../assets/R2.webp';
import reviewR3 from '../assets/R3.webp';
import reviewR4 from '../assets/R4.webp';

const SERVICES_HERO_REVIEW_AVATARS = [reviewR1, reviewR2, reviewR3, reviewR4];

function ServicesHeroStars({ isLight }) {
  return (
    <div
      className={`services-hero-stars flex items-center justify-center gap-1 ${isLight ? 'services-hero-stars--light' : 'services-hero-stars--dark'}`}
      aria-hidden
    >
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="services-hero-star h-4 w-4" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ServicesHeroAvatars({ isLight }) {
  return (
    <div className="services-hero-avatars flex items-center justify-center" aria-hidden>
      {SERVICES_HERO_REVIEW_AVATARS.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          initial={{ opacity: 0, x: 56, rotate: 18, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{
            duration: 0.55,
            delay: 0.22 + (SERVICES_HERO_REVIEW_AVATARS.length - 1 - i) * 0.11,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`services-hero-avatars__img h-10 w-10 rounded-full border-2 object-cover object-center ${isLight ? 'border-white' : 'border-slate-900'} ${i > 0 ? '-ml-2' : ''}`}
          style={{ zIndex: i + 1 }}
          loading="eager"
          decoding="async"
        />
      ))}
    </div>
  );
}

function scrollToServicesOverview() {
  document.getElementById('services-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// -- Lightweight CSS-only reveal - no framer-motion per element ----------------
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -4% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(14px)',
        transition: `opacity 0.3s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.3s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// -- Lightweight counter - uses rAF, no setInterval ----------------------------
function Counter({ target, suffix = '', duration = 800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// -- Lightweight step badge - 1 CSS animation instead of 8 --------------------
function StepBadge({ number, color }) {
  const colors = {
    blue:   { bg: 'from-blue-500 via-indigo-600 to-blue-700',   ring: 'rgba(59,130,246,0.3)',  glow: 'rgba(99,102,241,0.15)' },
    green:  { bg: 'from-emerald-500 via-teal-600 to-emerald-700', ring: 'rgba(16,185,129,0.3)', glow: 'rgba(20,184,166,0.15)' },
    violet: { bg: 'from-violet-500 via-purple-600 to-violet-700', ring: 'rgba(139,92,246,0.3)', glow: 'rgba(168,85,247,0.15)' },
    orange: { bg: 'from-orange-500 via-amber-600 to-orange-700',  ring: 'rgba(249,115,22,0.3)', glow: 'rgba(245,158,11,0.15)' },
  };
  const c = colors[color] || colors.blue;
  return (
    <div className="mb-5 flex justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Single subtle pulse ring */}
        <div
          className="absolute inset-0 rounded-full animate-pulseGlow"
          style={{ background: c.ring, transform: 'scale(1.5)', filter: 'blur(6px)' }}
        />
        {/* Badge */}
        <div
          className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center shadow-xl`}
          style={{ boxShadow: `0 8px 24px ${c.glow}` }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />
          <span className="relative text-2xl font-extrabold text-white drop-shadow">{number}</span>
        </div>
      </div>
    </div>
  );
}

const WHY_CARDS = [
  { icon: FiTrendingUp, title: 'Proven Track Record', desc: 'We have built a reputation as a trusted and reliable partner in achieving business success across 200+ brands.' },
  { icon: FiTarget, title: 'Tailored Solutions', desc: 'We offer personalized solutions tailored to your specific goals, audience, and industry for maximum impact.' },
  { icon: FiUsers, title: 'Client-Centric Focus', desc: 'Your success is our priority. We prioritize understanding your business goals before recommending any strategy.' },
  { icon: FiMessageSquare, title: 'Transparent Communication', desc: 'We believe in open and honest communication every step of the way - no surprises, no hidden agendas.' },
  { icon: FiHeadphones, title: 'Dedicated Support', desc: "Your success is our priority, and we're here to support you every step of the way with a dedicated team." },
  { icon: FiGlobe, title: 'Cross-Industry Expertise', desc: 'Our team has extensive experience working across various industries - from F&B to tech to wellness.' },
];

const FEATURES = [
  { icon: FiLayers, title: 'Franchise Expansion Strategy', desc: 'End-to-end franchise development roadmaps that scale your brand across markets with precision.', points: ['Market feasibility analysis', 'Territory mapping & planning', 'Franchise documentation'], iconBg: 'bg-indigo-600', accent: 'rgba(99,102,241,0.07)' },
  { icon: FiBarChart2, title: 'Investor-Ready Positioning', desc: 'Transform your business into an investment-grade opportunity that attracts serious capital.', points: ['Financial modelling & projections', 'Pitch deck creation', 'Due diligence preparation'], iconBg: 'bg-emerald-600', accent: 'rgba(5,150,105,0.07)' },
  { icon: FiZap, title: 'Lead Generation Systems', desc: 'High-conversion digital funnels that bring qualified franchise inquiries directly to your pipeline.', points: ['Multi-channel campaign setup', 'CRM integration & automation', 'Lead scoring & nurturing'], iconBg: 'bg-orange-500', accent: 'rgba(249,115,22,0.07)' },
  { icon: FiShield, title: 'Operational Scaling', desc: 'Build the systems, SOPs, and training infrastructure needed to replicate success at scale.', points: ['SOP development & documentation', 'Training program design', 'Quality control frameworks'], iconBg: 'bg-rose-500', accent: 'rgba(244,63,94,0.07)' },
];

const EXPANSION_CITIES = [
  { city: 'Mumbai', locations: 12, label: 'Active', progress: 85, bar: 'bg-emerald-500' },
  { city: 'Delhi NCR', locations: 10, label: 'Active', progress: 78, bar: 'bg-emerald-500' },
  { city: 'Bengaluru', locations: 9, label: 'Expanding', progress: 72, bar: 'bg-blue-500' },
  { city: 'Hyderabad', locations: 8, label: 'Expanding', progress: 68, bar: 'bg-blue-500' },
  { city: 'Pune', locations: 7, label: 'Pipeline', progress: 55, bar: 'bg-violet-500' },
  { city: 'Chennai', locations: 6, label: 'Pipeline', progress: 48, bar: 'bg-violet-500' },
];

const DASHBOARD_PILL_CLASS = {
  Active: 'dashboard-pill dashboard-pill--active',
  Expanding: 'dashboard-pill dashboard-pill--expanding',
  Pipeline: 'dashboard-pill dashboard-pill--pipeline',
};

function DashboardRupeeIcon({ className = '' }) {
  return (
    <span className={`inline-flex items-center justify-center font-bold leading-none ${className}`} aria-hidden>
      ₹
    </span>
  );
}

function dashboardPillClass(label) {
  return DASHBOARD_PILL_CLASS[label] || DASHBOARD_PILL_CLASS.Active;
}

function ExpansionCitiesPanel({ onHighlightChange }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const listRef = useRef(null);
  const rowRefs = useRef([]);

  const updateActiveFromScroll = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const viewportMid = list.scrollTop + list.clientHeight * 0.45;
    let next = 0;
    let best = Infinity;
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const rowMid = row.offsetTop + row.offsetHeight * 0.5;
      const dist = Math.abs(rowMid - viewportMid);
      if (dist < best) {
        best = dist;
        next = i;
      }
    });
    setActiveIdx((prev) => (prev === next ? prev : next));
  }, []);

  const onHighlightRef = useRef(onHighlightChange);
  onHighlightRef.current = onHighlightChange;

  useEffect(() => {
    onHighlightRef.current?.(EXPANSION_CITIES[activeIdx], activeIdx);
  }, [activeIdx]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    updateActiveFromScroll();
    list.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => list.removeEventListener('scroll', updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  const scrollToCity = (index) => {
    const row = rowRefs.current[index];
    const list = listRef.current;
    if (!row || !list) return;
    const top = row.offsetTop - list.clientHeight * 0.25;
    list.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setActiveIdx(index);
  };

  return (
    <div className="dashboard-surface-light rounded-lg border border-slate-200/80 bg-white p-3 shadow-lg">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <FiUsers className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
          <div className="min-w-0">
            <span className="dashboard-txt-title block text-xs font-bold">Active Cities</span>
            <span className="dashboard-txt-muted block text-[8px]">8 markets · 24 locations · swipe to browse</span>
          </div>
        </div>
        <span className="dashboard-pill dashboard-pill--pan shrink-0" title="Coverage across India">
          Pan India
        </span>
      </div>
      <ul
        ref={listRef}
        className="expansion-cities-scroll max-h-[6.5rem] space-y-1.5 overflow-y-auto overscroll-y-contain pr-1"
        role="listbox"
        aria-label="Active cities"
      >
        {EXPANSION_CITIES.map((row, i) => (
          <li
            key={row.city}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            role="option"
            aria-selected={i === activeIdx}
            tabIndex={0}
            onClick={() => scrollToCity(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToCity(i);
              }
            }}
            className={`expansion-cities-row cursor-pointer rounded-md border px-2 py-1.5 transition-all duration-200 ${
              i === activeIdx
                ? 'expansion-cities-row--active border-violet-300 bg-white shadow-md ring-2 ring-violet-400/50'
                : 'border-slate-100 bg-slate-50/95 hover:border-slate-200 hover:bg-white'
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="dashboard-txt-title truncate text-[10px] font-bold">{row.city}</span>
              <span className={dashboardPillClass(row.label)}>{row.label}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="dashboard-txt-muted text-[8px]">{row.locations} locations</span>
              <span className="dashboard-txt-muted text-[8px] font-semibold">{row.progress}%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-200">
              <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${row.progress}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Investor Dashboard Content Component with Filtering
const DASHBOARD_INDUSTRY_ICONS = {
  'Food & Beverage': FiCoffee,
  Retail: FiShoppingBag,
  Entertainment: FiActivity,
  'Health & Wellness': FiActivity,
  Technology: FiTool,
  Education: FiBookOpen,
  'Home Services': FiTool,
};

function InvestorDashboardBrandLogo({ opp }) {
  const [failed, setFailed] = useState(false);
  const src = opp.logo || opp.image;
  const FallbackIcon = opp.icon || DASHBOARD_INDUSTRY_ICONS[opp.category] || FiCoffee;
  const brandBg = opp.cardBackground || '#ffffff';
  const imgFit = opp.cardFit === 'fill' ? 'object-contain p-1' : 'object-cover';

  if (!src || failed) {
    return (
      <div
        className={`investor-dashboard-brand-logo investor-dashboard-brand-logo--fallback flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg ${opp.color}`}
      >
        <FallbackIcon className="h-4 w-4 text-white" aria-hidden />
      </div>
    );
  }

  return (
    <div
      className="investor-dashboard-brand-logo flex h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-slate-200/90 shadow-md"
      style={{ backgroundColor: brandBg }}
    >
      <img
        src={src}
        alt={`${opp.name} logo`}
        className={`h-full w-full ${imgFit}`}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget;
          if (opp.image && img.src !== opp.image) {
            img.src = opp.image;
            return;
          }
          setFailed(true);
        }}
      />
    </div>
  );
}

function InvestorDashboardContent({ navigateTo }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const allOpportunities = franchiseOpportunities.map((opp) => {
    const mapped = toInvestorDashboardOpportunity(opp);
    return {
      ...mapped,
      icon: DASHBOARD_INDUSTRY_ICONS[mapped.category] || FiCoffee,
    };
  });

  const featuredSet = getFeaturedOpportunities(3).map((opp) => {
    const mapped = toInvestorDashboardOpportunity(opp);
    return { ...mapped, icon: DASHBOARD_INDUSTRY_ICONS[mapped.category] || FiCoffee };
  });

  const filteredOpportunities =
    selectedFilter === 'all'
      ? featuredSet
      : allOpportunities.filter((opp) => opp.category === selectedFilter).slice(0, 3);

  return (
    <>
      {/* Filter Tags - Clickable and Functional (No Redirect) */}
      <div className="flex gap-1.5">
        {[
          { label: 'All', value: 'all' },
          { label: 'F&B', value: 'Food & Beverage' },
          { label: 'Retail', value: 'Retail' },
          { label: 'Tech', value: 'Technology' }
        ].map((tag) => (
          <button
            key={tag.value}
            onClick={() => setSelectedFilter(tag.value)}
            className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all cursor-pointer hover:scale-105 ${
              selectedFilter === tag.value
                ? 'bg-violet-600 text-white shadow-md'
                : 'dashboard-filter-btn border border-slate-200 bg-white text-slate-800 hover:border-violet-300 hover:text-violet-700'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Verified Opportunity Cards - Filtered */}
      <div className="space-y-1.5">
        {filteredOpportunities.map((opp) => (
          <button
            key={opp.id || opp.slug}
            onClick={() => navigateTo(opp.link)}
            className="dashboard-surface-light w-full rounded-lg border border-slate-200/80 bg-white p-2 shadow-md transition-all duration-300 cursor-pointer group hover:border-violet-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-2">
              <InvestorDashboardBrandLogo opp={opp} />
              <div className="flex-1 min-w-0 text-left">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <h4 className="dashboard-txt-title truncate text-[11px] font-bold">{opp.name}</h4>
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100">
                    <FiCheckCircle className="h-2.5 w-2.5 text-emerald-700" />
                  </div>
                </div>
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span className="dashboard-txt-muted text-[9px]">{opp.industry}</span>
                  <span className="dashboard-txt-muted text-[9px]">·</span>
                  <span className="dashboard-txt-accent text-[9px] font-semibold">{opp.roi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="dashboard-txt-body text-[9px] font-medium">{opp.investment}</span>
                  <FiArrowRight className="h-3 w-3 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Investment Analytics Panel - Real Market Intelligence Data */}
      <div className="services-dashboard-metrics grid grid-cols-3 gap-1.5">
        {[
          { icon: FiBarChart2, label: 'Avg ROI', value: '31%', color: 'from-violet-500 to-purple-600' },
          { icon: FiTrendingUp, label: 'CAGR', value: '~30%', color: 'from-blue-500 to-cyan-600' },
          { rupee: true, label: 'Min Inv', value: '₹95K', color: 'from-emerald-500 to-teal-600' }
        ].map((metric, i) => (
          <div
            key={i}
            className={`dashboard-metric-card rounded-lg bg-gradient-to-br ${metric.color} p-2 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            {metric.rupee ? (
              <DashboardRupeeIcon className="mb-0.5 text-xs text-white" />
            ) : (
              <metric.icon className="h-3 w-3 text-white mb-0.5" />
            )}
            <div className="text-sm font-bold text-white">{metric.value}</div>
            <div className="text-[8px] text-white">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Market Trends Chart - Larger & Better Visible */}
      <div className="dashboard-surface-light rounded-lg border border-slate-200/80 bg-white p-3 shadow-lg">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <FiActivity className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="dashboard-chart-title text-[11px] font-bold">Market Trends</span>
          </div>
          <div className="relative flex items-center gap-1">
            <div className="absolute h-1 w-1 rounded-full bg-emerald-500/200 animate-ping" />
            <div className="h-1 w-1 rounded-full bg-emerald-500/200" />
            <span className="dashboard-chart-live text-[8px] font-semibold">Live</span>
          </div>
        </div>
        
        {/* Chart with proper alignment */}
        <div className="relative">
          {/* Grid lines with percentage labels */}
          <div className="absolute left-7 right-0 top-0 bottom-6 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((val, i) => (
              <div key={i} className="relative h-px bg-slate-200">
                <span className="dashboard-chart-label absolute -left-7 -top-2 w-6 text-right text-[8px] font-medium">{val}%</span>
              </div>
            ))}
          </div>
          
          {/* Bar chart - Real Market Intelligence Data (Quarterly) */}
          <div className="relative flex items-end justify-between gap-1 h-20 pl-7 pb-6">
            {[
              { value: 38, label: 'Q1' },
              { value: 45, label: 'Q2' },
              { value: 52, label: 'Q3' },
              { value: 61, label: 'Q4' },
              { value: 58, label: 'Q1' },
              { value: 70, label: 'Q2' },
              { value: 78, label: 'Q3' },
              { value: 85, label: 'Q4' },
              { value: 95, label: 'Q1' }
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                <div
                  style={{ height: `${item.value}%` }}
                  className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-purple-500 shadow-md relative overflow-hidden flex flex-col items-center justify-between py-1"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                  
                  {/* Value inside bar for taller bars */}
                  {item.value >= 60 && (
                    <div className="relative mt-auto mb-0.5">
                      <span className="dashboard-chart-bar-label text-[7px] font-bold drop-shadow-sm">
                        {item.value}%
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Month label below */}
                <span className="dashboard-chart-label absolute mt-1 text-[7px] font-medium" style={{ bottom: 0 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// -- Process Steps - franchise expansion flow (titles only; clean mobile/desktop) ---
const PROCESS_STEPS = [
  {
    title: 'Understand Your Brand',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  },
  {
    title: 'Build the Foundation',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  },
  {
    title: 'Attract Investors',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
  },
  {
    title: 'Match & Onboard',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    title: 'Scale Across Markets',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
];

function useStepReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-24px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ProcessIcon({ step, size = 'md', isLight }) {
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-11 h-11';
  const shell = isLight
    ? `${dim} services-process-icon services-process-icon--light flex shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-md shadow-violet-500/30 ring-2 ring-violet-100`
    : `${dim} services-process-icon services-process-icon--dark flex shrink-0 items-center justify-center rounded-full bg-white text-violet-700 shadow-md shadow-black/25 ring-2 ring-white/50`;
  return (
    <div className={`${shell} [&_svg]:h-5 [&_svg]:w-5`}>
      {step.icon}
    </div>
  );
}

const SERVICES_BENEFIT_ICON_COLORS = {
  emerald: 'text-emerald-600',
  purple: 'text-violet-600',
  indigo: 'text-indigo-600',
  blue: 'text-blue-600',
  violet: 'text-violet-600',
  sky: 'text-sky-600',
  slate: 'text-slate-600',
  amber: 'text-amber-600',
  rose: 'text-rose-600',
};

function ServicesBenefitPillIcon({ Icon, colorKey, size = 'md' }) {
  const shell = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8';
  const iconDim = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const iconColor = SERVICES_BENEFIT_ICON_COLORS[colorKey] || 'text-violet-600';
  return (
    <span
      className={`services-benefit-pill-icon inline-flex ${shell} shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_4px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70`}
    >
      <Icon className={`${iconDim} ${iconColor}`} strokeWidth={2.25} aria-hidden />
    </span>
  );
}

const SERVICES_MOBILE_BENEFITS = [
  { title: 'Verified Franchise Listings', Icon: FiCheckCircle, color: 'emerald' },
  { title: 'Strategic Planning', Icon: FiTarget, color: 'purple' },
  { title: 'Data-Driven Insights', Icon: FiBarChart2, color: 'indigo' },
  { title: 'Growth & Expansion Support', Icon: FiTrendingUp, color: 'blue' },
  { title: 'Smart Investment Decisions', Icon: FiTarget, color: 'violet' },
  { title: 'Market Intelligence', Icon: FiActivity, color: 'sky' },
  { title: 'Real-Time Opportunity Updates', Icon: FiRefreshCw, color: 'blue' },
  { title: 'Transparent Deal Information', Icon: FiFileText, color: 'slate' },
  { title: 'Expert Guidance & Support', Icon: FiAward, color: 'amber' },
  { title: 'Investor-Centric Platform', Icon: FiUsers, color: 'rose' },
];

/** Mobile: row1 (1|2), row2 (3|4), row3 (5 center) — centered copy + interactive stepper */
function ProcessStepsMobile({ isLight }) {
  const [ref, visible] = useStepReveal();

  return (
    <div
      ref={ref}
      className={`services-process-mobile xl:hidden ${visible ? 'is-visible' : ''}`}
      aria-label="Franchise expansion process steps"
    >
      <div className="services-process-mobile__stepper" role="list" aria-label="Process progress">
        {PROCESS_STEPS.map((_, i) => (
          <Fragment key={`stepper-${i}`}>
            <span
              className="services-process-mobile__stepper-dot"
              role="listitem"
              aria-label={`Step ${i + 1}`}
              style={{
                transitionDelay: `${i * 0.12}s`,
                animationDelay: `${i * 0.35}s`,
              }}
            >
              {i + 1}
            </span>
            {i < PROCESS_STEPS.length - 1 && (
              <span
                className="services-process-mobile__stepper-seg"
                aria-hidden
                style={{ transitionDelay: `${i * 0.12 + 0.06}s` }}
              />
            )}
          </Fragment>
        ))}
      </div>

      <div className="services-process-mobile__bridge" aria-hidden>
        <span className="services-process-mobile__bridge-icon">↓</span>
      </div>

      <ol className="services-process-mobile__list">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.title} className="services-process-mobile__item">
            <div className="services-process-mobile__card">
              <ProcessIcon step={step} size="sm" isLight={isLight} />
              <span
                className={`services-process-mobile__label ${
                  isLight ? 'text-violet-600' : 'text-violet-200'
                }`}
              >
                Step {i + 1}
              </span>
              <p
                className={`services-process-mobile__title ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {step.title}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Tablet+: horizontal icons + short titles only */
function ProcessStepsDesktop({ isLight }) {
  const [ref, visible] = useStepReveal();

  return (
    <div ref={ref} className="hidden xl:flex items-start justify-between gap-2">
      {PROCESS_STEPS.map((step, i) => {
        const isLast = i === PROCESS_STEPS.length - 1;
        return (
          <div key={step.title} className="relative flex flex-1 min-w-0 flex-col items-center">
            {!isLast && (
              <div
                className={`absolute top-5 left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] z-0 h-px ${
                  isLight ? 'bg-violet-200' : 'bg-violet-500/30'
                }`}
                aria-hidden
              >
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    isLight ? 'bg-violet-500' : 'bg-violet-300'
                  }`}
                  style={{ width: visible ? '100%' : '0%', transitionDelay: `${i * 80 + 120}ms` }}
                />
              </div>
            )}
            <div
              className={`relative z-10 mb-3 transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <ProcessIcon step={step} isLight={isLight} />
            </div>
            <p
              className={`px-1 text-center text-sm font-bold leading-snug transition-all duration-300 md:text-[0.9375rem] ${
                isLight ? 'text-slate-900' : 'text-white'
              } ${visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${i * 50 + 80}ms` }}
            >
              {step.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ProcessSteps() {
  const { isLight } = useTheme();
  return (
    <>
      <ProcessStepsMobile isLight={isLight} />
      <ProcessStepsDesktop isLight={isLight} />
    </>
  );
}

export default function ServicesPage() {
  const { isLight } = useTheme();
  const pageRef = useRef(null);
  const [brandHighlightCity, setBrandHighlightCity] = useState(EXPANSION_CITIES[0]);

  const navigateTo = (path) => {
    spaNavigate(path);
  };

  const brandCityCards = useCallback(() => {
    const idx = EXPANSION_CITIES.findIndex((c) => c.city === brandHighlightCity.city);
    const primary = EXPANSION_CITIES[idx >= 0 ? idx : 0];
    const secondary = EXPANSION_CITIES[(idx + 1) % EXPANSION_CITIES.length];
    return [primary, secondary];
  }, [brandHighlightCity]);

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const run = () => scrollToHashSection();
    const t1 = window.setTimeout(run, 120);
    const t2 = window.setTimeout(run, 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <main ref={pageRef} className="services-page relative z-10 w-full max-w-full overflow-x-clip bg-transparent text-theme-primary">

      {/* HERO */}
      <section
        id="services-hero"
        className="page-hero-light services-hero relative z-10 flex flex-col items-center justify-center overflow-hidden bg-transparent px-5 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-9 lg:px-8 xl:min-h-[calc(100vh-80px)] xl:px-10 xl:py-16"
      >
        <div className="page-hero-light__bg pointer-events-none absolute inset-0" aria-hidden>
          <div className="page-hero-light__gradient absolute inset-0 bg-gradient-to-br from-violet-950/35 via-transparent to-indigo-950/30" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="services-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-hero-grid)" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/15 blur-[140px]"
          />
        </div>

        <div className="services-hero__content relative z-10 mx-auto flex w-full min-h-0 min-w-0 max-w-[900px] flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`services-hero-title ${heroDisplayClass(isLight)}`}
          >
            <span className="services-hero-title__line">Everything you need to</span>
            <span className="services-hero-title__line">launch, fund & scale franchises</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`services-hero-lead mx-auto max-w-[720px] text-base leading-relaxed sm:text-lg sm:leading-snug md:text-xl ${isLight ? 'text-slate-600' : 'text-white/90'}`}
          >
            <span className="services-hero-lead__line">
              iFranchise helps brands document their model, attract investors,
            </span>
            <span className="services-hero-lead__line">
              and expand with clarity—from first outlet to multi-city rollout.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="services-hero__cta-wrap"
          >
            <CtaButton
              type="button"
              arrowDirection="down"
              onClick={scrollToServicesOverview}
              aria-label="Scroll to our services section"
            >
              Explore our services
            </CtaButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="services-hero-social flex w-full max-w-full flex-col items-center gap-3"
          >
            <div className="services-hero-social__row flex w-full max-w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
              <ServicesHeroAvatars isLight={isLight} />
              <div className="services-hero-social__rating flex flex-col items-center justify-center text-center">
                <ServicesHeroStars isLight={isLight} />
                <p
                  className={`services-hero-social__review mt-1.5 max-w-[16rem] text-center text-sm font-medium leading-snug text-balance sm:max-w-none ${isLight ? 'text-slate-700' : 'text-white'}`}
                >
                  Over 15,725+ people gave us review
                </p>
              </div>
            </div>
            <p
              className={`services-hero-social__trust max-w-md text-center text-sm leading-relaxed ${isLight ? 'text-slate-500' : 'text-white/75'}`}
            >
              Trusted by founders, operators, and investors building franchise businesses across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES OVERVIEW — same layout as home Our Services */}
      <section id="services-overview" className="relative z-10 scroll-mt-24">
        <OurServicesSection isLight={isLight} />
      </section>

      {/* HOW IT WORKS - franchise expansion process flow */}
      <section className="services-process-section relative z-10 overflow-hidden py-12 sm:py-16">
        <div className="page-section-inner">

          <div className="section-header mb-8 sm:mb-10">
            <Reveal>
              <SectionPill className="mb-4">How It Works</SectionPill>
              <h2 className={sectionTitleClass(isLight, { tight: true })}>
                Our Franchise Expansion Process
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={sectionSubtitleClass(isLight, 'mx-auto max-w-lg')}>
                Five stages from brand audit to national scale.
              </p>
            </Reveal>
          </div>

          <ProcessSteps />

          <Reveal delay={0.35}>
            <div className={`${TYPE.mobileStatsGrid} mt-8 sm:mt-10 xl:grid-cols-4 xl:gap-4`}>
              {[
                { value: '30 Days', label: 'Franchise-ready' },
                { value: '90 Days', label: 'Investor matched' },
                { value: '6 Months', label: 'First unit live' },
                { value: '12 Months', label: 'Multi-city growth' },
              ].map((m) => (
                <div
                  key={m.label}
                  className={
                    isLight
                      ? 'rounded-xl border border-slate-200 bg-white px-3 py-3.5 text-center shadow-sm sm:py-4'
                      : 'rounded-xl border border-white/15 bg-white/10 px-3 py-3.5 text-center backdrop-blur-sm sm:py-4'
                  }
                >
                  <p className={`text-base font-extrabold tracking-tight sm:text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {m.value}
                  </p>
                  <p className={`mt-0.5 text-[11px] font-medium leading-snug sm:text-xs ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="services-section-cta mt-8 text-center sm:mt-10">
              <CtaButton
                type="button"
                size="lg"
                className="services-page-cta-btn"
                onClick={() => navigateTo('/contact')}
              >
                Start Your Expansion Journey
              </CtaButton>
            </div>
          </Reveal>

        </div>
      </section>

      {/* SERVICES FOR BRANDS */}
      <div className="services-audience-section relative z-10 overflow-hidden py-10 sm:py-12">
        <div className="page-section-inner">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="theme-section-on-light services-audience-copy mx-auto w-full min-w-0 max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <Reveal>
                <div className="services-audience-pill-wrap mb-5 flex justify-center lg:justify-start">
                  <SectionPill>For Brands</SectionPill>
                </div>
                <h2 className={`${sectionTitleClass(isLight)} mb-5`}>
                  Franchise Services for Brands Looking to Expand
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className={`services-audience-lead mx-auto mb-7 max-w-md text-base leading-relaxed sm:text-lg lg:mx-0 ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  We help businesses transform into scalable franchise models with the right structure, strategy, and investor network.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="services-audience-benefits mx-auto mb-8 flex w-full max-w-[18.5rem] flex-col gap-3.5 sm:max-w-xs lg:mx-0 lg:max-w-none">
                  {[
                    'Faster franchise expansion',
                    'Structured onboarding process',
                    'Investor acquisition support',
                    'Brand visibility improvement',
                    'Expansion planning & execution',
                  ].map((benefit) => (
                    <li key={benefit} className="services-audience-benefit flex items-center gap-3 text-left">
                      <div className="services-benefit-check flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600">
                        <FiCheck className="services-benefit-check__icon h-4 w-4 text-white" strokeWidth={3} />
                      </div>
                      <span className={`text-[0.9375rem] font-medium leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="services-audience-cta">
                  <CtaButton
                    type="button"
                    size="lg"
                    className="services-page-cta-btn"
                    onClick={() => navigateTo('/contact')}
                  >
                    Grow Your Brand with iFranchise
                  </CtaButton>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="services-dashboard-wrap relative mx-auto w-full min-w-0 max-w-md lg:mx-0">
                <div className="services-dashboard-panel theme-dark-surface relative w-full min-w-0 overflow-hidden rounded-2xl border border-violet-500/25 bg-[#12082a]/85 backdrop-blur-xl p-4 shadow-2xl sm:p-5" style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
                  
                  {/* Animated glow effects */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

                  {/* Dashboard Content */}
                  <div className="relative space-y-3">
                    
                    {/* Header - Brand Expansion Control Center */}
                    <div
                      className="dashboard-header-bar dashboard-header-bar--brand flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 shadow-lg"
                      style={{ color: '#ffffff' }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <FiTrendingUp className="dashboard-on-dark h-4 w-4" strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                          <div className="dashboard-header-bar__title text-xs font-bold leading-tight">
                            Brand Expansion Hub
                          </div>
                          <div className="dashboard-header-bar__subtitle text-[10px] leading-snug opacity-90">
                            Real-time Analytics
                          </div>
                        </div>
                      </div>
                      
                      {/* Live Pill with Breathing Animation */}
                      <div className="relative">
                        <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-2.5 py-1 animate-pulse">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping absolute left-2" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Live</span>
                        </div>
                      </div>
                    </div>

                    <div className="services-dashboard-metrics grid grid-cols-3 gap-2">
                      <div className="dashboard-metric-card rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiUsers className="dashboard-on-dark h-3.5 w-3.5 mb-1" />
                        <div className="dashboard-on-dark text-lg font-bold">24</div>
                        <div className="dashboard-on-dark text-[9px]">Locations</div>
                      </div>

                      <div className="dashboard-metric-card rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiTarget className="dashboard-on-dark h-3.5 w-3.5 mb-1" />
                        <div className="dashboard-on-dark text-lg font-bold">8</div>
                        <div className="dashboard-on-dark text-[9px]">Markets</div>
                      </div>

                      <div className="dashboard-metric-card rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <DashboardRupeeIcon className="dashboard-on-dark mb-1 text-base" />
                        <div className="dashboard-on-dark text-lg font-bold">₹6.8M</div>
                        <div className="dashboard-on-dark text-[9px]">Revenue</div>
                      </div>
                    </div>

                    <ExpansionCitiesPanel onHighlightChange={(city) => setBrandHighlightCity(city)} />

                    {/* Live Growth Chart - Properly Aligned Bars */}
                    <div className="dashboard-surface-light rounded-lg border border-slate-200/80 bg-white p-3 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <FiBarChart2 className="h-3 w-3 text-white" />
                          </div>
                          <span className="dashboard-chart-title text-xs font-bold">Growth Trajectory</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/200 animate-ping absolute" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/200" />
                          <span className="dashboard-chart-live text-[10px] font-semibold">+92% YoY</span>
                        </div>
                      </div>
                      
                      {/* Chart with proper alignment */}
                      <div className="relative">
                        {/* Grid lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between">
                          {[100, 75, 50, 25, 0].map((val, i) => (
                            <div key={i} className="relative h-px bg-slate-200">
                              <span className="dashboard-chart-label absolute -left-8 -top-2 w-6 text-right text-[7px] font-medium">{val}%</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Bar chart - Real Market Intelligence Data (Quarterly Growth) */}
                        <div className="relative flex items-end justify-between gap-1.5 h-20 pl-8">
                          {[
                            { value: 38, label: 'Q1' },
                            { value: 45, label: 'Q2' },
                            { value: 52, label: 'Q3' },
                            { value: 61, label: 'Q4' },
                            { value: 58, label: 'Q1' },
                            { value: 70, label: 'Q2' },
                            { value: 78, label: 'Q3' },
                            { value: 85, label: 'Q4' },
                            { value: 92, label: 'Q1' }
                          ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.value}%` }}
                                transition={{ 
                                  duration: 0.8, 
                                  delay: 0.5 + i * 0.1, 
                                  ease: [0.22, 1, 0.36, 1]
                                }}
                                className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-500 shadow-lg relative overflow-hidden cursor-pointer transition-all duration-300 hover:from-indigo-700 hover:to-purple-600 flex flex-col items-center justify-between py-1"
                              >
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                                
                                {/* Value inside bar for taller bars */}
                                {item.value >= 55 && (
                                  <div className="relative mt-auto mb-1">
                                    <span className="dashboard-chart-bar-label text-[7px] font-bold drop-shadow-sm">
                                      {item.value}%
                                    </span>
                                  </div>
                                )}
                              </motion.div>
                              
                              {/* Month label below */}
                              <span className="dashboard-chart-label mt-1.5 text-[8px] font-medium">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {brandCityCards().map((location, i) => (
                        <div
                          key={`${location.city}-${i}`}
                          className="dashboard-surface-light rounded-lg border border-slate-200/80 bg-white p-2 shadow-md"
                        >
                          <div className="mb-1 flex items-center justify-between gap-1">
                            <div className="flex min-w-0 items-center gap-1.5">
                              <FiMap className="h-2.5 w-2.5 shrink-0 text-indigo-500" />
                              <span className="dashboard-txt-title truncate text-[10px] font-bold">{location.city}</span>
                            </div>
                            <span className={dashboardPillClass(location.label)}>{location.label}</span>
                          </div>
                          <div className="dashboard-txt-body mb-1.5 text-[9px] font-medium">
                            {location.locations} locations
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-slate-200">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${location.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                              className={`h-full ${location.bar}`}
                            />
                          </div>
                          <div className="dashboard-txt-muted mt-0.5 text-[7px]">{location.progress}% market coverage</div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            </Reveal>

          </div>

        </div>
      </div>

      {/* SERVICES FOR INVESTORS */}
      <div className="services-audience-section relative z-10 overflow-hidden py-10 sm:py-12">
        <div className="page-section-inner">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            
            {/* LEFT: Premium Investor Intelligence Dashboard */}
            <div className="order-2 lg:order-1">
              <div className="services-dashboard-wrap relative mx-auto w-full min-w-0 max-w-md lg:mx-0">
                
                {/* Main dashboard container */}
                <div className="services-dashboard-panel theme-dark-surface relative w-full min-w-0 overflow-hidden rounded-2xl border border-violet-500/25 bg-[#12082a]/85 backdrop-blur-xl p-4 shadow-2xl sm:p-4" style={{ boxShadow: '0 8px 40px rgba(139,92,246,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>

                  {/* Dashboard Content */}
                  <div className="relative space-y-2.5">
                    
                    {/* Header - Opportunity Discovery with Live Pill */}
                    <div
                      className="dashboard-header-bar dashboard-header-bar--investor flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-800 to-purple-900 p-2.5 shadow-lg"
                      style={{ color: '#ffffff' }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <FiTarget className="dashboard-on-dark h-3.5 w-3.5" strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                          <div className="dashboard-header-bar__title text-[11px] font-bold leading-tight">
                            Opportunity Discovery
                          </div>
                          <div className="dashboard-header-bar__subtitle text-[9px] leading-snug opacity-90">
                            {franchiseOpportunities.length} Verified Franchises
                          </div>
                        </div>
                      </div>
                      
                      {/* Live Pill with Breathing Animation */}
                      <div className="relative flex items-center">
                        <div className="absolute inset-0 bg-emerald-400/30 rounded-full animate-breathePill" />
                        <div className="relative flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-2 py-0.5">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[8px] font-bold text-emerald-300 uppercase tracking-wider">Live</span>
                        </div>
                      </div>
                    </div>

                    {/* Filtered Dashboard Content */}
                    <InvestorDashboardContent navigateTo={navigateTo} />

                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT: Content */}
            <div className="order-1 mx-auto w-full min-w-0 max-w-xl text-center lg:order-2 lg:mx-0 lg:max-w-none lg:text-left theme-section-on-light services-audience-copy">
              <div className="services-audience-pill-wrap mb-5 flex justify-center lg:justify-start">
                <SectionPill>For Investors</SectionPill>
              </div>
              <h2 className={`${sectionTitleClass(isLight)} mb-5`}>
                Helping Investors Discover the Right Franchise Opportunities
              </h2>

              <p className={`services-audience-lead mx-auto mb-7 max-w-md text-base leading-relaxed lg:mx-0 ${isLight ? 'text-slate-700' : 'text-white'}`}>
                We help investors explore verified franchise opportunities across industries with transparent business information and structured support.
              </p>

              <ul className="services-audience-benefits mx-auto mb-8 flex w-full max-w-[18.5rem] flex-col gap-3.5 sm:max-w-xs lg:mx-0 lg:max-w-none">
                {[
                  'Verified franchise opportunities',
                  'Investment-focused discovery',
                  'Business model transparency',
                  'Industry-based opportunity matching',
                  'Investor onboarding support',
                ].map((benefit) => (
                  <li key={benefit} className="services-audience-benefit flex items-center gap-3 text-left">
                    <div className="services-benefit-check flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600">
                      <FiCheck className="services-benefit-check__icon h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                    <span className={`text-[0.9375rem] font-medium leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="services-audience-cta">
                <CtaButton
                  type="button"
                  size="lg"
                  className="services-page-cta-btn"
                  onClick={() => navigateTo('/franchise-opportunities')}
                >
                  Explore Franchise Opportunities
                </CtaButton>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* INDUSTRIES WE SUPPORT */}
      <div className="relative z-10 overflow-hidden py-10 sm:py-12">
        <div className="page-section-inner">
          

          {/* Section Header */}
          <div className="theme-section-on-light text-center mb-16">
            <Reveal>
              <SectionPill className="mb-5">Industries</SectionPill>
              <h2 className={`${sectionTitleClass(false)} mb-5`}>
                Industries We Help Scale Through Franchising
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto max-w-2xl text-base text-white leading-relaxed">
                Our franchise services are designed to support businesses across industries looking to expand through scalable franchise models.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.label} delay={i * 0.05} className="h-full">
                <IndustryCard
                  label={ind.label}
                  desc={ind.desc}
                  img={ind.img}
                  accent={ind.accent}
                  priority={i < 3}
                  onExplore={() => navigateTo('/franchise-opportunities')}
                />
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.6} className="text-center mt-16">
            <p className="text-sm text-white mb-4">
              Don't see your industry? We work with businesses across all sectors.
            </p>
            <CtaButton
              type="button"
              size="lg"
              className="services-page-cta-btn"
              onClick={() => navigateTo('/contact')}
            >
              Discuss Your Industry
            </CtaButton>
          </Reveal>

        </div>
      </div>

      {/* BENEFITS - More than just a franchise platform */}
      <section className="relative z-10 w-full overflow-hidden py-10 sm:py-12">
        <div className="page-section-inner w-full max-w-[1240px]">
          <div className="theme-section-on-light mx-auto max-w-[680px] text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3 }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              Benefits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}
              className={`${sectionTitleClass(false)} mb-6`}
            >
              More than just a franchise platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}
              className="text-base leading-relaxed text-white sm:text-lg"
            >
              iFranchise helps you discover verified opportunities, make confident investment decisions, and scale smarter with real data and insights.
            </motion.p>
          </div>

          {/* Desktop - Premium Strategic Ecosystem Layout */}
          <div className="relative mt-16 hidden lg:block" style={{ height: '480px' }}>

            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 rounded-3xl border border-slate-200/90 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)]" />
              <div className="absolute inset-0 opacity-[0.03] rounded-3xl" style={{
                backgroundImage: `linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)`,
                backgroundSize: '48px 48px'
              }} />
            </div>

            {/* Center orbit graphic - refined size for better balance */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 300, height: 300 }}>
              <svg viewBox="0 0 300 300" width="300" height="300">
                <circle cx="150" cy="150" r="140" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" fill="none" />
                <circle cx="150" cy="150" r="100" stroke="rgba(139,92,246,0.16)" strokeWidth="1.5" fill="none" strokeDasharray="5 8" />
                <circle cx="150" cy="150" r="65" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" fill="none" />
                <circle cx="150" cy="150" r="32" stroke="rgba(139,92,246,0.1)" strokeWidth="1.5" fill="none" />
              </svg>
              
              {/* Animated glow rings behind logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-violet-200/50 via-purple-200/40 to-indigo-200/50 blur-2xl animate-pulse-slow" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-purple-300/40 via-violet-300/30 to-indigo-300/40 blur-xl animate-pulse-glow" />
              
              {/* Center logo with purple background and animations */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.4),0_8px_32px_rgba(124,58,237,0.3)] flex items-center justify-center p-5 animate-logo-float">
                <img 
                  src={BrandLogo} 
                  alt="iFranchise Logo" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              
              {/* Rotating ring around logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-dashed border-purple-300/30 animate-spin-slow" />
              
              {/* Orbit dots */}
              <div className="benefits-orbit-ring absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
              </div>
              <div className="benefits-orbit-ring-reverse absolute left-1/2 top-1/2 h-[135px] w-[135px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.55)]" />
              </div>
            </div>

            {/* Premium Pills - Perfect Circular Arrangement (8 pills, 45 deg apart) */}
            
            {/* Position 1: TOP CENTER (0 deg) - Moved further left */}
            <motion.div className="absolute top-[6%] left-[40%]"
              initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.2 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiCheckCircle} colorKey="emerald" size="sm" />
                  <p className="text-sm font-medium text-white">Verified Franchise Listings</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 2: TOP RIGHT (45 deg) */}
            <motion.div className="absolute top-[16%] right-[12%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.25 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiBarChart2} colorKey="indigo" size="sm" />
                  <p className="text-sm font-medium text-white">Data-Driven Insights</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 3: MIDDLE RIGHT (90 deg) */}
            <motion.div className="absolute top-[50%] -translate-y-1/2 right-[6%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.3 }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiTarget} colorKey="violet" size="sm" />
                  <p className="text-sm font-medium text-white">Smart Investment Decisions</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 4: BOTTOM RIGHT (135 deg) */}
            <motion.div className="absolute bottom-[16%] right-[12%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.35 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiAward} colorKey="amber" size="sm" />
                  <p className="text-sm font-medium text-white">Expert Guidance & Support</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 5: BOTTOM CENTER (180 deg) - Moved further left */}
            <motion.div className="absolute bottom-[6%] left-[37%]"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.4 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiRefreshCw} colorKey="blue" size="sm" />
                  <p className="text-sm font-medium text-white">Real-Time Opportunity Updates</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 6: BOTTOM LEFT (225 deg) */}
            <motion.div className="absolute bottom-[16%] left-[12%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.45 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiFileText} colorKey="slate" size="sm" />
                  <p className="text-sm font-medium text-white">Transparent Deal Information</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 7: MIDDLE LEFT (270 deg) */}
            <motion.div className="absolute top-[50%] -translate-y-1/2 left-[6%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.5 }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiUsers} colorKey="rose" size="sm" />
                  <p className="text-sm font-medium text-white">Investor-Centric Platform</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 8: TOP LEFT (315 deg) */}
            <motion.div className="absolute top-[16%] left-[12%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.55 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
                className="whitespace-nowrap rounded-full theme-light-pill border border-slate-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]">
                <div className="flex items-center gap-2.5">
                  <ServicesBenefitPillIcon Icon={FiTarget} colorKey="purple" size="sm" />
                  <p className="text-sm font-medium text-white">Strategic Planning</p>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Mobile - grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
            {SERVICES_MOBILE_BENEFITS.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.02 }}
                className="theme-light-pill rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]"
              >
                <div className="flex items-center gap-3">
                  <ServicesBenefitPillIcon Icon={item.Icon} colorKey={item.color} />
                  <p className="text-sm font-medium text-white">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY iFRANCHISE - matches home page */}
      <WhyIFranchiseSection className="relative z-10" />

    </main>
  );
}

// -- Inlined section components --

/* WhyIFranchiseSection.jsx */
const WHY_IFRANCHISE_CARDS = [
  {
    title: 'Verified Opportunities',
    desc: 'Every opportunity is reviewed and structured to provide clarity and transparency.',
    delay: 0,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Faster Brand Expansion',
    desc: 'We help brands connect with the right investors to scale faster across markets.',
    delay: 0.07,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Investor-Focused Discovery',
    desc: 'Simplified franchise discovery experience designed around business goals and investment intent.',
    delay: 0.14,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Data-Driven Marketplace',
    desc: 'Industry-focused insights and structured business information help users make better decisions.',
    delay: 0.21,
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

function WhyIReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cinematic-scroll-reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function WhyIFranchiseCard({ card, isLight }) {
  const iconBase = isLight
    ? { background: 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%)', border: '1px solid #5b21b6', color: '#ffffff', boxShadow: '0 8px 24px rgba(109,40,217,0.25)' }
    : { background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', boxShadow: 'none' };

  return (
    <WhyIReveal delay={card.delay} className="h-full">
      <div
        className="theme-light-card group relative flex h-full flex-col overflow-hidden rounded-2xl"
        style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 20px 50px rgba(109,40,217,0.3)';
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.18)';
        }}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full rounded-2xl transition-transform duration-700 group-hover:translate-x-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
        />

        <div className="relative flex h-44 items-center justify-center overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
          />
          <div
            className="why-feature-icon relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 [&_svg]:text-current"
            style={iconBase}
          >
            {card.icon}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 pt-2">
          <h3 className="why-card-title mb-2 text-[1rem] font-bold leading-snug">{card.title}</h3>
          <p className="why-card-desc text-[0.8rem] leading-relaxed">{card.desc}</p>
        </div>
      </div>
    </WhyIReveal>
  );
}

function WhyIFranchiseSection({ className = '' }) {
  const { isLight } = useTheme();

  return (
    <section className={`why-ifranchise-section relative w-full overflow-hidden py-12 sm:py-16 lg:py-20 ${className}`.trim()}>
      <div className="section-container relative z-10">
        <div className="theme-section-on-light mb-8 text-center sm:mb-10">
          <SectionPill className="mb-4">Why iFranchise</SectionPill>
          <h2 className={`why-section-heading mx-auto mb-3 max-w-3xl ${TYPE.sectionBand} text-white`}>
            Why Investors and Brands Choose iFranchise
          </h2>
          <p className="why-section-subtitle mx-auto max-w-2xl text-sm leading-relaxed">
            Built to simplify franchise discovery, expansion, and investment through structured business intelligence.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_IFRANCHISE_CARDS.map((card) => (
            <WhyIFranchiseCard key={card.title} card={card} isLight={isLight} />
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <button
            type="button"
            onClick={() => {
              spaNavigate('/franchise-opportunities');
            }}
            className="why-section-cta group inline-flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)', boxShadow: '0 4px 20px rgba(109,40,217,0.35)' }}
          >
            Explore Franchise Opportunities
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

