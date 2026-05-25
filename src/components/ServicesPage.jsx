import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrendingUp, FiTarget, FiUsers, FiMessageSquare,
  FiHeadphones, FiGlobe, FiArrowRight, FiCheck,
  FiBarChart2, FiZap, FiShield, FiLayers,
  FiCheckCircle, FiRefreshCw, FiFileText, FiAward, FiActivity,
  FiDollarSign, FiUserCheck, FiBookOpen, FiUserPlus, FiCompass, FiMap,
  FiCoffee, FiTool, FiShoppingBag
} from 'react-icons/fi';
import CtaButton from './ui/CtaButton';
import SectionPill from './ui/SectionPill';
import { useTheme } from '../context/ThemeContext';
import BrandLogo from '../assets/BrandLogo.png';
import { SERVICES_INDUSTRIES } from '../data/sectionImages';
import {
  franchiseOpportunities,
  getFeaturedOpportunities,
  toInvestorDashboardOpportunity,
} from '../data/franchiseData';
import { navigateTo as spaNavigate } from '@/lib/navigation';
import IndustryCard from './IndustryCard';
import { heroDisplayClass, sectionTitleClass } from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';
import { TESTIMONIAL_AVATAR_STRIP } from '../data/testimonials.js';

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

const SERVICE_CARDS = [
  {
    icon: FiUserCheck,
    title: 'Franchise Onboarding',
    points: [
      'Franchise business evaluation',
      'Franchise model setup',
      'Operational guidance',
      'Franchise readiness support'
    ],
    gradient: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(99, 102, 241, 0.15)'
  },
  {
    icon: FiBookOpen,
    title: 'Franchise Documentation',
    points: [
      'Franchise agreements',
      'Business documentation',
      'Investor presentations',
      'Brand process documentation'
    ],
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  {
    icon: FiUserPlus,
    title: 'Investor Acquisition',
    points: [
      'Investor lead generation',
      'Franchise investor outreach',
      'Qualified investor matching',
      'Investor onboarding support'
    ],
    gradient: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(139, 92, 246, 0.15)'
  },
  {
    icon: FiTarget,
    title: 'Franchise Branding & Positioning',
    points: [
      'Brand positioning',
      'Franchise marketing strategy',
      'Investor-focused branding',
      'Expansion communication strategy'
    ],
    gradient: 'from-orange-500 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.15)'
  },
  {
    icon: FiMap,
    title: 'Franchise Expansion Strategy',
    points: [
      'Market expansion planning',
      'Territory analysis',
      'Location targeting',
      'Expansion roadmap'
    ],
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.15)'
  },
  {
    icon: FiCompass,
    title: 'Investor Onboarding Support',
    points: [
      'Investor qualification',
      'Opportunity presentations',
      'Initial consultation support',
      'Investor journey management'
    ],
    gradient: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.15)'
  }
];

const EXPANSION_CITIES = [
  { city: 'Mumbai', locations: 12, label: 'Active', progress: 85, bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { city: 'Delhi NCR', locations: 10, label: 'Active', progress: 78, bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { city: 'Bengaluru', locations: 9, label: 'Expanding', progress: 72, bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { city: 'Hyderabad', locations: 8, label: 'Expanding', progress: 68, bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { city: 'Pune', locations: 7, label: 'Pipeline', progress: 55, bar: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200' },
  { city: 'Chennai', locations: 6, label: 'Pipeline', progress: 48, bar: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200' },
];

function ExpansionCitiesPanel() {
  return (
    <div className="dashboard-surface-light rounded-lg border border-slate-200/60 p-3 shadow-lg">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <FiUsers className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
          <div className="min-w-0">
            <span className="dashboard-txt-title block text-xs font-bold">Active Cities</span>
            <span className="dashboard-txt-muted block text-[8px]">8 markets · 24 locations</span>
          </div>
        </div>
        <span className="dashboard-txt-accent shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[8px] font-semibold">
          Pan India
        </span>
      </div>
      <ul className="max-h-[5.75rem] space-y-1.5 overflow-y-auto pr-0.5">
        {EXPANSION_CITIES.map((row) => (
          <li
            key={row.city}
            className="rounded-md border border-slate-100 bg-slate-50/95 px-2 py-1.5"
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="dashboard-txt-title truncate text-[10px] font-bold">{row.city}</span>
              <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[7px] font-semibold ${row.badge}`}>
                {row.label}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="dashboard-txt-muted text-[8px]">{row.locations} locations</span>
              <span className="dashboard-txt-muted text-[8px] font-medium">{row.progress}%</span>
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
        {filteredOpportunities.map((opp, i) => (
          <button
            key={i}
            onClick={() => navigateTo(opp.link)}
            className="dashboard-surface-light w-full rounded-lg bg-white/90 backdrop-blur-sm p-2 shadow-md border border-slate-200/60 hover:shadow-lg hover:border-violet-300 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-2">
              <div className={`h-9 w-9 flex-shrink-0 rounded-lg bg-gradient-to-br ${opp.color} shadow-lg flex items-center justify-center`}>
                <opp.icon className="h-4 w-4 text-white" />
              </div>
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
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: FiBarChart2, label: 'Avg ROI', value: '31%', color: 'from-violet-500 to-purple-600' },
          { icon: FiTrendingUp, label: 'CAGR', value: '~30%', color: 'from-blue-500 to-cyan-600' },
          { icon: FiDollarSign, label: 'Min Inv', value: 'Rs.95K', color: 'from-emerald-500 to-teal-600' }
        ].map((metric, i) => (
          <div
            key={i}
            className={`dashboard-metric-card rounded-lg bg-gradient-to-br ${metric.color} p-2 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <metric.icon className="h-3 w-3 text-white mb-0.5" />
            <div className="text-sm font-bold text-white">{metric.value}</div>
            <div className="text-[8px] text-white">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Market Trends Chart - Larger & Better Visible */}
      <div className="dashboard-surface-light rounded-lg bg-white/70 backdrop-blur-sm border border-slate-200/50/60 p-3 shadow-lg">
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
    color: 'violet',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  },
  {
    title: 'Build the Foundation',
    color: 'indigo',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  },
  {
    title: 'Attract Investors',
    color: 'emerald',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
  },
  {
    title: 'Match & Onboard',
    color: 'amber',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    title: 'Scale Across Markets',
    color: 'teal',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
];

const STEP_COLORS = {
  violet: { bg: 'bg-violet-600', ring: 'ring-violet-200', text: 'text-violet-400', bar: 'from-violet-400 to-indigo-400', glow: 'shadow-violet-500/30' },
  indigo: { bg: 'bg-indigo-600', ring: 'ring-indigo-200', text: 'text-indigo-400', bar: 'from-indigo-400 to-violet-400', glow: 'shadow-indigo-500/30' },
  emerald:{ bg: 'bg-emerald-600', ring: 'ring-emerald-200', text: 'text-emerald-400', bar: 'from-emerald-400 to-teal-400', glow: 'shadow-emerald-500/30' },
  amber:  { bg: 'bg-amber-500', ring: 'ring-amber-200', text: 'text-amber-400', bar: 'from-amber-400 to-orange-400', glow: 'shadow-amber-500/30' },
  teal:   { bg: 'bg-teal-600', ring: 'ring-teal-200', text: 'text-teal-600', bar: 'from-teal-400 to-cyan-400', glow: 'shadow-teal-500/30' },
};

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

function ProcessIcon({ step, size = 'md' }) {
  const c = STEP_COLORS[step.color];
  const dim = size === 'sm' ? 'w-10 h-10' : 'w-11 h-11';
  return (
    <div
      className={`${dim} rounded-full ${c.bg} flex shrink-0 items-center justify-center text-white shadow-md ${c.glow} ring-2 ring-white/90 [&_svg]:h-5 [&_svg]:w-5`}
    >
      {step.icon}
    </div>
  );
}

/** Mobile: centered vertical stepper. icon, label, title stacked in the middle */
function ProcessStepsMobile() {
  const [ref, visible] = useStepReveal();

  return (
    <div ref={ref} className={TYPE.mobileSteps}>
      <ol className={TYPE.mobileStepsList}>
        {PROCESS_STEPS.map((step, i) => {
          const isLast = i === PROCESS_STEPS.length - 1;
          return (
            <li
              key={step.title}
              className={`${TYPE.mobileStepsItem} transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <ProcessIcon step={step} size="sm" />
              <span className="type-caption mt-3 mb-1 font-bold uppercase tracking-wider text-violet-300">
                Step {i + 1}
              </span>
              <p className="max-w-[14rem] text-base font-bold leading-snug text-white text-balance">
                {step.title}
              </p>
              {!isLast && <div className={TYPE.mobileStepsConnector} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Tablet+: horizontal icons + short titles only */
function ProcessStepsDesktop() {
  const [ref, visible] = useStepReveal();

  return (
    <div ref={ref} className="hidden sm:flex items-start justify-between gap-1 md:gap-3">
      {PROCESS_STEPS.map((step, i) => {
        const c = STEP_COLORS[step.color];
        const isLast = i === PROCESS_STEPS.length - 1;
        return (
          <div key={step.title} className="relative flex flex-1 min-w-0 flex-col items-center">
            {!isLast && (
              <div
                className="absolute top-5 left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] z-0 h-px bg-violet-500/25"
                aria-hidden
              >
                <div
                  className={`h-full bg-gradient-to-r ${c.bar} transition-all duration-500 ease-out`}
                  style={{ width: visible ? '100%' : '0%', transitionDelay: `${i * 80 + 120}ms` }}
                />
              </div>
            )}
            <div
              className={`relative z-10 mb-3 transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <ProcessIcon step={step} />
            </div>
            <p
              className={`px-1 text-center text-sm font-bold leading-snug text-white transition-all duration-300 md:text-[0.9375rem] ${visible ? 'opacity-100' : 'opacity-0'}`}
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
  return (
    <>
      <ProcessStepsMobile />
      <ProcessStepsDesktop />
    </>
  );
}

export default function ServicesPage() {
  const { isLight } = useTheme();
  const pageRef = useRef(null);

  const navigateTo = (path) => {
    spaNavigate(path);
  };

  return (
    <main ref={pageRef} className="services-page relative z-10 w-full bg-transparent text-theme-primary">

      {/* HERO */}
      <section className="page-hero-light relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden bg-transparent px-4 pb-8 pt-8 sm:px-6 lg:px-8">
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

        <div className="relative z-10 mx-auto max-w-[900px] text-center">

          {/* Headline - shorter and clearer like home hero */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
            className={`${heroDisplayClass(isLight)} mb-6`}
          >
            Franchise Growth Services
          </motion.h1>

          {/* Subtext - matching home style */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: 0.05, ease: [0.22,1,0.36,1] }}
            className={`mx-auto max-w-[720px] text-lg sm:text-xl leading-relaxed mb-8 ${isLight ? 'text-slate-600' : 'text-white'}`}
          >
            End-to-end franchise expansion services for growing brands. From onboarding and documentation to investor acquisition and strategic scaling.
          </motion.p>

          {/* CTA Button - matching home style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: 0.1, ease: [0.22,1,0.36,1] }}
            className="mb-5"
          >
            <CtaButton type="button" onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}>
              Schedule a Consultation
            </CtaButton>
          </motion.div>

          {/* Trust Badge with Avatars and Reviews */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col items-center gap-2.5"
          >
            <div className="flex items-center gap-4">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2">
                {TESTIMONIAL_AVATAR_STRIP.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-white object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              {/* Stars and Review Count */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-white'}`}>From 150+ reviews</p>
              </div>
            </div>

            {/* Trust Text */}
            <p className={`text-sm font-medium ${isLight ? 'text-slate-600' : 'text-white'}`}>
              Helping brands expand and investors connect through a smarter franchise ecosystem
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="relative z-10 py-16">
        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="theme-section-on-light relative z-10 text-center mb-16">
          <Reveal>
            <SectionPill className="mb-5">Our Services</SectionPill>
            <h2 className={`${sectionTitleClass(false)} mb-5`}>
              Complete Franchise Growth & Expansion Services
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white sm:text-lg">
              We provide end-to-end franchise services designed to help businesses scale efficiently and connect with the right investors. Our process covers every stage of franchise growth - from strategy and documentation to investor onboarding and brand positioning.
            </p>
          </Reveal>
        </div>

        {/* Service Cards Grid - 3x2 on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CARDS.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 theme-light-card bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)] hover:border-violet-200/70 h-full flex flex-col" style={{ boxShadow: '0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)' }}>
                
                {/* Animated line background - flows on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {/* Horizontal lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" />
                  <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-lineFlow" style={{ animationDelay: '0.9s' }} />
                  
                  {/* Vertical lines */}
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" />
                  <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent animate-lineFlowVertical" style={{ animationDelay: '0.9s' }} />
                </div>
                
                {/* Subtle gradient overlay on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.glowColor}, transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Area with gradient background */}
                  <div className="mb-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`${TYPE.cardTitle} text-white mb-4`}>
                    {service.title}
                  </h3>

                  {/* Service Points - flex-1 to push content to fill space */}
                  <ul className="space-y-3 flex-1">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">
                          <FiCheck className="h-4 w-4 text-emerald-400" />
                        </span>
                        <span className="text-white">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-200 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.5} className="text-center mt-12">
          <CtaButton type="button" onClick={() => navigateTo('/contact')}>
            Get Started with Our Services
          </CtaButton>
        </Reveal>
        
        </div>
        {/* End Content Container */}
      </section>

      {/* HOW IT WORKS - franchise expansion process flow */}
      <section className="services-process-section relative z-10 overflow-hidden py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

          <div className="section-header mb-8 sm:mb-10">
            <Reveal>
              <SectionPill className="mb-4">How It Works</SectionPill>
              <h2 className={`${sectionTitleClass(false)} section-title--tight`}>
                Our Franchise Expansion Process
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="section-subtitle mx-auto max-w-lg text-white/75">
                Five stages from brand audit to national scale.
              </p>
            </Reveal>
          </div>

          <ProcessSteps />

          <Reveal delay={0.35}>
            <div className={`${TYPE.mobileStatsGrid} mt-8 sm:mt-10 sm:grid-cols-4 sm:gap-4`}>
              {[
                { value: '30 Days', label: 'Franchise-ready' },
                { value: '90 Days', label: 'Investor matched' },
                { value: '6 Months', label: 'First unit live' },
                { value: '12 Months', label: 'Multi-city growth' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/15 bg-white/10 px-3 py-3.5 text-center backdrop-blur-sm sm:py-4"
                >
                  <p className="text-base font-extrabold tracking-tight text-white sm:text-lg">{m.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium leading-snug text-white/70 sm:text-xs">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-8 text-center sm:mt-10">
              <CtaButton type="button" size="lg" onClick={() => navigateTo('/contact')}>
                Start Your Expansion Journey
              </CtaButton>
            </div>
          </Reveal>

        </div>
      </section>

      {/* SERVICES FOR BRANDS */}
      <div className="relative z-10 overflow-hidden py-12">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* RIGHT: Content */}
            <div className="theme-section-on-light services-audience-copy">
              <Reveal>
                <SectionPill className="mb-6">For Brands</SectionPill>
                <h2 className={`${sectionTitleClass(isLight)} mb-6`}>
                  Franchise Services for Brands Looking to Expand
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className={`text-lg leading-relaxed mb-8 ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  We help businesses transform into scalable franchise models with the right structure, strategy, and investor network.
                </p>
              </Reveal>

              {/* Key Benefits - Simple checkmark list */}
              <div className="space-y-4 mb-10">
                {[
                  'Faster franchise expansion',
                  'Structured onboarding process',
                  'Investor acquisition support',
                  'Brand visibility improvement',
                  'Expansion planning & execution'
                ].map((benefit, index) => (
                  <Reveal key={benefit} delay={0.15 + index * 0.05}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-600">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className={`text-base font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {benefit}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTA */}
              <Reveal delay={0.4}>
                <CtaButton type="button" size="lg" onClick={() => navigateTo('/contact')}>
                  Grow Your Brand with iFranchise
                </CtaButton>
              </Reveal>
            </div>

            {/* RIGHT: Premium Franchise Expansion Dashboard */}
            <Reveal delay={0.2}>
              <div className="relative max-w-md mx-auto lg:mx-0">
                
                {/* Main dashboard container */}
                <div className="services-dashboard-panel theme-dark-surface relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#12082a]/85 backdrop-blur-xl p-5 shadow-2xl" style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
                  
                  {/* Animated glow effects */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

                  {/* Dashboard Content */}
                  <div className="relative space-y-3">
                    
                    {/* Header - Brand Expansion Control Center */}
                    <div className="dashboard-header-bar flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 shadow-lg">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <FiTrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Brand Expansion Hub</div>
                          <div className="text-[10px] text-white">Real-time Analytics</div>
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

                    {/* Growth Metrics Cards - Real Data (No Floating) */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="dashboard-metric-card rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiUsers className="h-3.5 w-3.5 text-white mb-1" />
                        <div className="text-lg font-bold text-white">24</div>
                        <div className="text-[9px] text-white">Locations</div>
                      </div>

                      <div className="dashboard-metric-card rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiTarget className="h-3.5 w-3.5 text-white mb-1" />
                        <div className="text-lg font-bold text-white">8</div>
                        <div className="text-[9px] text-white">Markets</div>
                      </div>

                      <div className="dashboard-metric-card rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiDollarSign className="h-3.5 w-3.5 text-white mb-1" />
                        <div className="text-lg font-bold text-white">Rs.6.8M</div>
                        <div className="text-[9px] text-white">Revenue</div>
                      </div>
                    </div>

                    <ExpansionCitiesPanel />

                    {/* Live Growth Chart - Properly Aligned Bars */}
                    <div className="dashboard-surface-light rounded-lg bg-white/70 backdrop-blur-sm border border-slate-200/50/60 p-3 shadow-lg">
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
                      {[
                        { city: 'Mumbai', status: '12 Locations', progress: 85, bar: 'bg-emerald-500', label: 'Active', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                        { city: 'Bengaluru', status: '9 Locations', progress: 72, bar: 'bg-blue-500', label: 'Expanding', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
                      ].map((location, i) => (
                        <div
                          key={location.city}
                          className="dashboard-surface-light rounded-lg border border-slate-200/60 p-2 shadow-md"
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <FiMap className="h-2.5 w-2.5 shrink-0 text-indigo-500" />
                              <span className="dashboard-txt-title text-[10px] font-bold">{location.city}</span>
                            </div>
                            <span className={`rounded-full border px-1.5 py-0.5 text-[7px] font-semibold ${location.badge}`}>
                              {location.label}
                            </span>
                          </div>
                          <div className="dashboard-txt-body mb-1.5 text-[9px] font-medium">{location.status}</div>
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
      <div className="relative z-10 overflow-hidden py-12">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Premium Investor Intelligence Dashboard */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:mx-0">
                
                {/* Main dashboard container */}
                <div className="services-dashboard-panel theme-dark-surface relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#12082a]/85 backdrop-blur-xl p-4 shadow-2xl" style={{ boxShadow: '0 8px 40px rgba(139,92,246,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>

                  {/* Dashboard Content */}
                  <div className="relative space-y-2.5">
                    
                    {/* Header - Opportunity Discovery with Live Pill */}
                    <div className="dashboard-header-bar flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-800 to-purple-900 p-2.5 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <FiTarget className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Opportunity Discovery</div>
                          <div className="text-[9px] text-white">{franchiseOpportunities.length} Verified Franchises</div>
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
            <div className="order-1 lg:order-2 theme-section-on-light services-audience-copy">
              <div>
                <SectionPill className="mb-6">For Investors</SectionPill>
                <h2 className={`${sectionTitleClass(isLight)} mb-6`}>
                  Helping Investors<br />
                  Discover the Right<br />
                  Franchise Opportunities
                </h2>
              </div>
              
              <div>
                <p className={`text-base leading-relaxed mb-8 ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  We help investors explore verified franchise opportunities across industries with transparent business information and structured support.
                </p>
              </div>

              {/* Key Benefits - Simple checkmark list */}
              <div className="space-y-4 mb-10">
                {[
                  'Verified franchise opportunities',
                  'Investment-focused discovery',
                  'Business model transparency',
                  'Industry-based opportunity matching',
                  'Investor onboarding support'
                ].map((benefit) => (
                  <div key={benefit}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-600">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className={`text-base font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div>
                <CtaButton type="button" size="lg" onClick={() => navigateTo('/franchise-opportunities')}>
                  Explore Franchise Opportunities
                </CtaButton>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* INDUSTRIES WE SUPPORT */}
      <div className="relative z-10 overflow-hidden py-12">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          

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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.label} delay={i * 0.05}>
                <IndustryCard
                  label={ind.label}
                  desc={ind.desc}
                  img={ind.img}
                  accent={ind.accent}
                  mediaHeight="h-56"
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
            <CtaButton type="button" size="lg" onClick={() => navigateTo('/contact')}>
              Discuss Your Industry
            </CtaButton>
          </Reveal>

        </div>
      </div>

      {/* BENEFITS - More than just a franchise platform */}
      <section className="relative z-10 w-full py-12 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                    <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                    <FiBarChart2 className="h-3.5 w-3.5 text-indigo-400" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                    <FiTarget className="h-3.5 w-3.5 text-violet-400" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <FiAward className="h-3.5 w-3.5 text-amber-400" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <FiRefreshCw className="h-3.5 w-3.5 text-blue-400" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                    <FiFileText className="h-3.5 w-3.5 text-white" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-500/20">
                    <FiUsers className="h-3.5 w-3.5 text-rose-400" />
                  </span>
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
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <FiTarget className="h-3.5 w-3.5 text-purple-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Strategic Planning</p>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Mobile - grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
            {[
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
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.02 }}
                className="theme-light-pill rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(124,58,237,0.12)]"
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-50`}>
                    <item.Icon className={`h-4 w-4 text-${item.color}-600`} />
                  </span>
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
          <h2 className={`why-section-heading mx-auto mb-3 max-w-3xl px-4 ${TYPE.sectionBand} text-white`}>
            Why Investors and Brands Choose iFranchise
          </h2>
          <p className="why-section-subtitle mx-auto max-w-2xl px-4 text-sm leading-relaxed">
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
            className="why-section-cta group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
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

