import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrendingUp, FiTarget, FiUsers, FiMessageSquare,
  FiHeadphones, FiGlobe, FiArrowRight, FiCheck,
  FiBarChart2, FiZap, FiShield, FiLayers,
  FiCheckCircle, FiRefreshCw, FiFileText, FiAward, FiActivity,
  FiDollarSign, FiUserCheck, FiBookOpen, FiUserPlus, FiCompass, FiMap,
  FiChevronDown, FiPlus, FiMinus, FiCoffee, FiTool, FiShoppingBag
} from 'react-icons/fi';
import BrandLogo from '../assets/BrandLogo.png';
import retailImg from '../assets/IndImgs/Retail & Jewelry.png';
import foodImg from '../assets/IndImgs/Food & Beverage.png';
import healthcareImg from '../assets/IndImgs/Healthcare & Wellness.png';
import educationImg from '../assets/IndImgs/Education & Training.png';
import beautyImg from '../assets/IndImgs/Beauty & Lifestyle.png';
import logisticsImg from '../assets/IndImgs/Logistics & Infrastructure.png';

function ServicesIndustryCardImg({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0618]" aria-hidden>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500/25 border-t-violet-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-contain object-center transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}

const SERVICES_INDUSTRIES = [
  { label: 'Retail & Jewelry', accent: '#f59e0b', desc: 'Scale your retail brand with proven franchise models', img: retailImg },
  { label: 'Food & Beverage', accent: '#f97316', desc: 'Expand your F&B concept across multiple locations', img: foodImg },
  { label: 'Healthcare & Wellness', accent: '#10b981', desc: 'Grow your wellness business with franchise support', img: healthcareImg },
  { label: 'Education & Training', accent: '#3b82f6', desc: 'Build an education empire through franchising', img: educationImg },
  { label: 'Beauty & Lifestyle', accent: '#ec4899', desc: 'Transform beauty concepts into franchise networks', img: beautyImg },
  { label: 'Logistics & Infrastructure', accent: '#94a3b8', desc: 'Scale logistics operations with franchise models', img: logisticsImg },
];

// â”€â”€ Lightweight CSS-only reveal â€” no framer-motion per element â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ Lightweight counter â€” uses rAF, no setInterval â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ Lightweight step badge â€” 1 CSS animation instead of 8 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  { icon: FiMessageSquare, title: 'Transparent Communication', desc: 'We believe in open and honest communication every step of the way â€” no surprises, no hidden agendas.' },
  { icon: FiHeadphones, title: 'Dedicated Support', desc: "Your success is our priority, and we're here to support you every step of the way with a dedicated team." },
  { icon: FiGlobe, title: 'Cross-Industry Expertise', desc: 'Our team has extensive experience working across various industries â€” from F&B to tech to wellness.' },
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

const FAQ_ITEMS = [
  {
    question: 'What franchise services does iFranchise provide?',
    answer: 'We provide franchise onboarding, documentation support, investor acquisition, branding, expansion strategy, and investor onboarding services.'
  },
  {
    question: 'How does iFranchise help brands expand?',
    answer: 'We help brands structure their franchise model, attract investors, and expand into new markets through a scalable growth process.'
  },
  {
    question: 'Do you help find franchise investors?',
    answer: 'Yes, we connect brands with qualified investors actively looking for franchise business opportunities.'
  },
  {
    question: 'What industries do you work with?',
    answer: 'We work with businesses across retail, food & beverage, healthcare, education, beauty, and infrastructure sectors.'
  },
  {
    question: 'Can investors discover opportunities through iFranchise?',
    answer: 'Yes, investors can explore verified franchise opportunities and connect directly with brands.'
  }
];

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm transition-all duration-300"
        animate={{
          borderColor: isOpen ? 'rgba(15, 23, 42, 0.2)' : 'rgba(148, 163, 184, 0.6)',
        }}
      >
        {/* Glowing active state */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/5 to-indigo-600/10 pointer-events-none"
          />
        )}

        {/* Question Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 transition-colors duration-300"
        >
          <span className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-white/90'
          }`}>
            {question}
          </span>
          
          {/* Animated Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
              isOpen 
                ? 'bg-slate-900 text-white' 
                : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
            }`}
          >
            <FiChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Answer with smooth animation */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                transition: {
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.25, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2 }
                }
              }}
              className="relative overflow-hidden"
            >
              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <div className="pt-2 border-t border-violet-500/20">
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mt-4">
                    {answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-200 group-hover:translate-x-full pointer-events-none" />
      </motion.div>
    </Reveal>
  );
}

// Investor Dashboard Content Component with Filtering
function InvestorDashboardContent({ navigateTo }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const allOpportunities = [
    { 
      name: 'Premium Coffee Chain',
      category: 'Food & Beverage',
      industry: 'F&B',
      roi: '+32% ROI',
      investment: 'Min: $250K',
      color: 'from-emerald-500 to-teal-600',
      icon: FiCoffee,
      link: '/franchise-opportunities'
    },
    { 
      name: 'Fitness Studio Network',
      category: 'Health & Wellness',
      industry: 'Wellness',
      roi: '+28% ROI',
      investment: 'Min: $180K',
      color: 'from-blue-500 to-cyan-600',
      icon: FiActivity,
      link: '/franchise-opportunities'
    },
    { 
      name: 'Tech Repair Franchise',
      category: 'Technology',
      industry: 'Technology',
      roi: '+36% ROI',
      investment: 'Min: $120K',
      color: 'from-violet-500 to-purple-600',
      icon: FiTool,
      link: '/franchise-opportunities'
    },
    { 
      name: 'Fashion Boutique',
      category: 'Retail',
      industry: 'Retail',
      roi: '+29% ROI',
      investment: 'Min: $150K',
      color: 'from-pink-500 to-rose-600',
      icon: FiShoppingBag,
      link: '/franchise-opportunities'
    }
  ];

  const filteredOpportunities = selectedFilter === 'all' 
    ? allOpportunities.slice(0, 3) 
    : allOpportunities.filter(opp => opp.category === selectedFilter).slice(0, 3);

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
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer hover:scale-105 ${
              selectedFilter === tag.value
                ? 'bg-violet-600 text-white shadow-md' 
                : 'bg-white/70 backdrop-blur-sm border border-slate-200/50 text-slate-600 hover:border-violet-300 hover:text-violet-400'
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
            className="w-full rounded-lg bg-white/90 backdrop-blur-sm p-2 shadow-md border border-slate-200/60 hover:shadow-lg hover:border-violet-300 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-2">
              <div className={`h-9 w-9 flex-shrink-0 rounded-lg bg-gradient-to-br ${opp.color} shadow-lg flex items-center justify-center`}>
                <opp.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">{opp.name}</h4>
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center">
                    <FiCheckCircle className="h-2.5 w-2.5 text-emerald-700" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] text-slate-500">{opp.industry}</span>
                  <span className="text-[9px] text-slate-300">Â·</span>
                  <span className="text-[9px] font-semibold text-emerald-400">{opp.roi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-600">{opp.investment}</span>
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
          { icon: FiDollarSign, label: 'Min Inv', value: 'â‚¹95K', color: 'from-emerald-500 to-teal-600' }
        ].map((metric, i) => (
          <div
            key={i}
            className={`rounded-lg bg-gradient-to-br ${metric.color} p-2 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <metric.icon className="h-3 w-3 text-white/80 mb-0.5" />
            <div className="text-sm font-bold text-white">{metric.value}</div>
            <div className="text-[8px] text-white/70">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Market Trends Chart - Larger & Better Visible */}
      <div className="rounded-lg bg-white/70 backdrop-blur-sm border border-slate-200/50/60 p-3 shadow-lg">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <FiActivity className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-[11px] font-bold text-slate-900">Market Trends</span>
          </div>
          <div className="relative flex items-center gap-1">
            <div className="absolute h-1 w-1 rounded-full bg-emerald-500/200 animate-ping" />
            <div className="h-1 w-1 rounded-full bg-emerald-500/200" />
            <span className="text-[8px] font-semibold text-emerald-400">Live</span>
          </div>
        </div>
        
        {/* Chart with proper alignment */}
        <div className="relative">
          {/* Grid lines with percentage labels */}
          <div className="absolute left-7 right-0 top-0 bottom-6 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((val, i) => (
              <div key={i} className="relative h-px bg-slate-200">
                <span className="absolute -left-7 -top-2 text-[8px] text-slate-400 font-medium w-6 text-right">{val}%</span>
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
                      <span className="text-[7px] font-bold text-white drop-shadow-sm">
                        {item.value}%
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Month label below */}
                <span className="text-[7px] text-slate-500 font-medium mt-1 absolute" style={{ bottom: 0 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Process Steps — franchise expansion flow ─────────────────────────────────
const PROCESS_STEPS = [
  {
    number: '01', title: 'Understand Your Brand', color: 'violet',
    desc: 'Deep-dive discovery — we map your business model, unit economics, target markets, and growth ambitions.',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  },
  {
    number: '02', title: 'Build Franchise Foundation', color: 'indigo',
    desc: 'We architect your franchise model — SOPs, legal docs, brand guidelines, and operational systems.',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  },
  {
    number: '03', title: 'Attract Investors', color: 'emerald',
    desc: 'Performance campaigns and lead qualification funnels bring capital-ready partners to your brand.',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
  },
  {
    number: '04', title: 'Match & Onboard', color: 'amber',
    desc: 'We match the right investor to the right territory, manage agreements, and execute structured onboarding.',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    number: '05', title: 'Scale Across Markets', color: 'teal',
    desc: 'With proven units live, we activate the next wave — new territories, new investors, compounding growth.',
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

function ProcessStepNode({ step, index, total }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2, rootMargin: '-40px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c = STEP_COLORS[step.color];
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="flex flex-col items-center flex-1 min-w-0 relative">
      {/* connector line */}
      {!isLast && (
        <div className="absolute top-[22px] left-[calc(50%+22px)] right-[calc(-50%+22px)] h-px z-0 overflow-hidden">
          <div className="absolute inset-0 bg-violet-500/30" />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${c.bar} transition-all duration-300`}
            style={{ width: visible ? '100%' : '0%', transitionDelay: `${index * 100 + 200}ms` }}
          />
          {/* travelling light */}
          {visible && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.8, delay: index * 0.18 + 0.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-1.5 rounded-full bg-white/80 blur-[2px]"
            />
          )}
        </div>
      )}

      {/* node */}
      <div
        className={`relative z-10 mb-4 transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        {visible && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className={`absolute inset-0 rounded-full ${c.bg} opacity-30`}
          />
        )}
        <div className={`relative w-11 h-11 rounded-full ${c.bg} flex items-center justify-center text-white shadow-lg ${c.glow} ring-2 ring-white`}>
          {step.icon}
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200/50 flex items-center justify-center shadow-sm">
          <span className={`text-[0.55rem] font-extrabold ${c.text}`}>{step.number}</span>
        </div>
      </div>

      {/* content */}
      <div
        className={`text-center px-2 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        style={{ transitionDelay: `${index * 80 + 100}ms` }}
      >
        <p className="text-[0.82rem] font-bold text-white mb-1.5 leading-snug">{step.title}</p>
        <p className="text-[0.72rem] text-white/85 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

function ProcessSteps() {
  return (
    <div className="flex items-start gap-0 lg:gap-2">
      {PROCESS_STEPS.map((step, i) => (
        <ProcessStepNode key={i} step={step} index={i} total={PROCESS_STEPS.length} />
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const pageRef = useRef(null);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div 
      ref={pageRef} 
      className="relative w-full" 
      style={{ 
        background: 'transparent',
        scrollBehavior: 'smooth',
        scrollPaddingTop: '80px'
      }}
    >

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0618] via-[#0f0a1e] to-[#0a0618]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-[900px] text-center">

          {/* Headline - shorter and clearer like home hero */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
            className="text-[clamp(2.75rem,8vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-6"
          >
            Franchise Growth Services
          </motion.h1>

          {/* Subtext - matching home style */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: 0.05, ease: [0.22,1,0.36,1] }}
            className="mx-auto max-w-[720px] text-lg sm:text-xl leading-relaxed text-white/70 mb-8"
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
            <button 
              type="button" 
              onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}
              className="group relative overflow-hidden rounded-2xl bg-violet-600 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-violet-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Consultation
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                  <FiArrowRight className="h-3 w-3" />
                </span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-200 group-hover:translate-x-full" />
            </button>
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
                <img 
                  src="https://i.pravatar.cc/40?img=12" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=18" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=26" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img 
                  src="https://i.pravatar.cc/40?img=32" 
                  alt="User" 
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
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
                <p className="text-sm font-medium text-white/50">From 150+ reviews</p>
              </div>
            </div>

            {/* Trust Text */}
            <p className="text-sm font-medium text-white/50">
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
        <div className="relative z-10 text-center mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              Our Services
            </span>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-5">
              Complete Franchise Growth & Expansion Services
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              We provide end-to-end franchise services designed to help businesses scale efficiently and connect with the right investors. Our process covers every stage of franchise growth â€” from strategy and documentation to investor onboarding and brand positioning.
            </p>
          </Reveal>
        </div>

        {/* Service Cards Grid - 3x2 on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CARDS.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)] hover:border-violet-200/70 h-full flex flex-col" style={{ boxShadow: '0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)' }}>
                
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
                  <h3 className="text-xl font-bold text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Service Points - flex-1 to push content to fill space */}
                  <ul className="space-y-3 flex-1">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">
                          <FiCheck className="h-4 w-4 text-emerald-400" />
                        </span>
                        <span className="text-white/80">
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
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="group inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_12px_40px_rgba(15,23,42,0.25)] hover:-translate-y-1"
          >
            <span>Get Started with Our Services</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
              <FiArrowRight className="h-3 w-3" />
            </span>
          </button>
        </Reveal>
        
        </div>
        {/* End Content Container */}
      </section>

      {/* HOW IT WORKS — franchise expansion process flow */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

          {/* header */}
          <div className="text-center mb-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                How It Works
              </span>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
                Our Franchise Expansion Process
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                A structured, repeatable system engineered to take your brand from concept to scaled franchise network.
              </p>
            </Reveal>
          </div>

          {/* horizontal process steps */}
          <ProcessSteps navigateTo={navigateTo} />

          {/* outcome strip */}
          <Reveal delay={0.5}>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '30 Days',   label: 'To Franchise-Ready'   },
                { value: '90 Days',   label: 'First Investor Matched'},
                { value: '6 Months',  label: 'First Unit Live'       },
                { value: '12 Months', label: 'Multi-City Expansion'  },
              ].map((m, i) => (
                <motion.div key={i} className="group flex flex-col items-center py-4 px-3 rounded-xl border border-white/20 bg-white/10 text-center backdrop-blur-sm transition-colors duration-200 hover:bg-white/15 hover:border-white/30">
                  <p className="text-lg font-extrabold text-white mb-0.5 group-hover:text-white">{m.value}</p>
                  <p className="text-[0.68rem] text-white/90 font-medium group-hover:text-white">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.6}>
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => navigateTo('/contact')}
                className="group relative overflow-hidden rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white hover:bg-violet-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Start Your Expansion Journey
                  <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* SERVICES FOR BRANDS */}
      <div className="relative z-10 overflow-hidden py-12">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* RIGHT: Content */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  For Brands
                </span>
                <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-6 leading-tight">
                  Franchise Services for Brands Looking to Expand
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="text-lg text-white/90 leading-relaxed mb-8">
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
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-base text-white">
                        {benefit}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTA */}
              <Reveal delay={0.4}>
                <button
                  type="button"
                  onClick={() => navigateTo('/contact')}
                  className="group relative overflow-hidden rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white hover:bg-violet-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Grow Your Brand with iFranchise
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </Reveal>
            </div>

            {/* RIGHT: Premium Franchise Expansion Dashboard */}
            <Reveal delay={0.2}>
              <div className="relative max-w-md mx-auto lg:mx-0">
                
                {/* Main dashboard container */}
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#12082a]/85 backdrop-blur-xl p-5 shadow-2xl" style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>
                  
                  {/* Animated glow effects */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

                  {/* Dashboard Content */}
                  <div className="relative space-y-3">
                    
                    {/* Header - Brand Expansion Control Center */}
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 shadow-lg">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <FiTrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Brand Expansion Hub</div>
                          <div className="text-[10px] text-slate-400">Real-time Analytics</div>
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
                      <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiUsers className="h-3.5 w-3.5 text-white/80 mb-1" />
                        <div className="text-lg font-bold text-white">24</div>
                        <div className="text-[9px] text-white/70">Locations</div>
                      </div>

                      <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiTarget className="h-3.5 w-3.5 text-white/80 mb-1" />
                        <div className="text-lg font-bold text-white">8</div>
                        <div className="text-[9px] text-white/70">Markets</div>
                      </div>

                      <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <FiDollarSign className="h-3.5 w-3.5 text-white/80 mb-1" />
                        <div className="text-lg font-bold text-white">â‚¹6.8M</div>
                        <div className="text-[9px] text-white/70">Revenue</div>
                      </div>
                    </div>

                    {/* Interactive City Expansion Map with Real Embedded Map */}
                    <div className="rounded-lg bg-white/70 backdrop-blur-sm p-3 shadow-lg border border-slate-200/60">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <FiMap className="h-3 w-3 text-indigo-400" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Franchise Locations</span>
                            <span className="text-[8px] text-slate-500">Active expansion cities</span>
                          </div>
                        </div>
                        
                        {/* City Dropdown */}
                        <select className="text-[10px] font-medium text-slate-600 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                          <option value="">View All (8)</option>
                          <option value="mumbai">Mumbai - 12 locations</option>
                          <option value="delhi">Delhi - 10 locations</option>
                          <option value="bengaluru">Bengaluru - 9 locations</option>
                          <option value="hyderabad">Hyderabad - 8 locations</option>
                          <option value="pune">Pune - 7 locations</option>
                          <option value="chennai">Chennai - 6 locations</option>
                          <option value="kolkata">Kolkata - 5 locations</option>
                          <option value="ahmedabad">Ahmedabad - 4 locations</option>
                        </select>
                      </div>
                      
                      {/* Real Google Maps Embed - Completely Clean (No Text, No Lines) */}
                      <div className="relative h-24 rounded-lg overflow-hidden border border-slate-200/40">
                        
                        <div className="map-container w-full h-full relative">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7500000!2d82.8!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin&disableDefaultUI=1&zoomControl=1&scrollwheel=1&gestureHandling=cooperative"
                            width="100%"
                            height="140%"
                            style={{ border: 0, display: 'block', marginTop: '-4px', marginBottom: '-20px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[30%] opacity-90"
                            title="India Expansion Map"
                          />
                          
                          {/* Seamless overlay to hide all Google text - matches map colors */}
                          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-10" 
                               style={{
                                 background: 'linear-gradient(to top, rgba(173, 216, 230, 0.9) 0%, rgba(173, 216, 230, 0.7) 40%, transparent 100%)'
                               }} 
                          />
                        </div>
                        
                        {/* Global CSS to hide ALL Google Maps UI elements */}
                        <style dangerouslySetInnerHTML={{__html: `
                          .map-container iframe {
                            pointer-events: auto !important;
                          }
                          .gm-style-cc,
                          .gm-style a,
                          .gm-style button,
                          .gm-style div[style*="cursor: pointer"],
                          .gmnoprint,
                          .gm-bundled-control,
                          .gm-svpc,
                          .gm-control-active,
                          .gm-style-mtc,
                          .gm-fullscreen-control,
                          a[href^="https://maps.google.com"],
                          a[href^="https://www.google.com/maps"],
                          a[title*="Google"],
                          a[title*="Terms"],
                          a[title*="Report"],
                          div[style*="font-family: Roboto"],
                          div[style*="color: rgb(0, 0, 0)"],
                          button[draggable="false"],
                          div[draggable="false"][style*="cursor"] {
                            display: none !important;
                            opacity: 0 !important;
                            visibility: hidden !important;
                            width: 0 !important;
                            height: 0 !important;
                            position: absolute !important;
                            left: -9999px !important;
                          }
                        `}} />
                        
                        {/* Overlay with city markers - All within India */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                          {[
                            { city: 'Mumbai', top: '60%', left: '32%', count: 12 },
                            { city: 'Delhi', top: '28%', left: '48%', count: 10 },
                            { city: 'Bengaluru', top: '72%', left: '50%', count: 9 },
                            { city: 'Hyderabad', top: '64%', left: '54%', count: 8 },
                            { city: 'Pune', top: '64%', left: '40%', count: 7 },
                            { city: 'Chennai', top: '76%', left: '56%', count: 6 },
                            { city: 'Kolkata', top: '50%', left: '70%', count: 5 },
                            { city: 'Ahmedabad', top: '50%', left: '36%', count: 4 },
                          ].map((location, i) => (
                            <div
                              key={location.city}
                              className="absolute group cursor-pointer pointer-events-auto"
                              style={{ top: location.top, left: location.left }}
                            >
                              {/* Pin */}
                              <div className="relative">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-lg border-2 border-white transition-transform duration-300 group-hover:scale-150" />
                                {/* Pulse ring */}
                                <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40" />
                                
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                  <div className="bg-slate-900 text-white text-[8px] font-medium px-1.5 py-0.5 rounded shadow-lg">
                                    <div className="font-bold">{location.city}</div>
                                    <div className="text-[7px] text-emerald-300">{location.count} franchise locations</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Growth Chart - Properly Aligned Bars */}
                    <div className="rounded-lg bg-white/70 backdrop-blur-sm border border-slate-200/50/60 p-3 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <FiBarChart2 className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-slate-900">Growth Trajectory</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/200 animate-ping absolute" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/200" />
                          <span className="text-[10px] font-semibold text-emerald-400">+92% YoY</span>
                        </div>
                      </div>
                      
                      {/* Chart with proper alignment */}
                      <div className="relative">
                        {/* Grid lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between">
                          {[100, 75, 50, 25, 0].map((val, i) => (
                            <div key={i} className="relative h-px bg-slate-200">
                              <span className="absolute -left-8 -top-2 text-[7px] text-slate-400 font-medium w-6 text-right">{val}%</span>
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
                                    <span className="text-[7px] font-bold text-white drop-shadow-sm">
                                      {item.value}%
                                    </span>
                                  </div>
                                )}
                              </motion.div>
                              
                              {/* Month label below */}
                              <span className="text-[8px] text-slate-500 font-medium mt-1.5">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Top Franchise Location Cards - Real Cities */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { city: 'Mumbai', status: '12 Locations', progress: 85, color: 'emerald', label: 'Active' },
                        { city: 'Bengaluru', status: '9 Locations', progress: 72, color: 'blue', label: 'Expanding' }
                      ].map((location, i) => (
                        <div
                          key={location.city}
                          className="rounded-lg bg-white/80 backdrop-blur-sm p-2 shadow-md border border-slate-200/60"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <FiMap className="h-2.5 w-2.5 text-slate-600" />
                              <span className="text-[10px] font-bold text-slate-800">{location.city}</span>
                            </div>
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-${location.color}-50 border border-${location.color}-200`}>
                              <div className={`h-1 w-1 rounded-full bg-${location.color}-500 animate-pulse`} />
                              <span className={`text-[7px] font-semibold text-${location.color}-700`}>{location.label}</span>
                            </div>
                          </div>
                          <div className="text-[9px] text-slate-600 font-medium mb-1.5">{location.status}</div>
                          <div className="h-1 rounded-full bg-slate-200 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${location.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                              className={`h-full bg-${location.color}-500`}
                            />
                          </div>
                          <div className="text-[7px] text-slate-400 mt-0.5">{location.progress}% market coverage</div>
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
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#12082a]/85 backdrop-blur-xl p-4 shadow-2xl" style={{ boxShadow: '0 8px 40px rgba(139,92,246,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}>

                  {/* Dashboard Content */}
                  <div className="relative space-y-2.5">
                    
                    {/* Header - Opportunity Discovery with Live Pill */}
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-800 to-purple-900 p-2.5 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <FiTarget className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Opportunity Discovery</div>
                          <div className="text-[9px] text-violet-300">24 Verified Franchises</div>
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
            <div className="order-1 lg:order-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  For Investors
                </span>
                <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-6 leading-tight">
                  Helping Investors<br />
                  Discover the Right<br />
                  Franchise Opportunities
                </h2>
              </div>
              
              <div>
                <p className="text-base text-white/70 leading-relaxed mb-8">
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
                ].map((benefit, index) => (
                  <div key={benefit}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                        <FiCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-base text-white">
                        {benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div>
                <button
                  type="button"
                  onClick={() => navigateTo('/franchise-opportunities')}
                  className="group relative overflow-hidden rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white hover:bg-violet-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore Franchise Opportunities
                    <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* INDUSTRIES WE SUPPORT */}
      <div className="relative z-10 overflow-hidden py-12">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          

          {/* Section Header */}
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                Industries
              </span>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-5">
                Industries We Help Scale Through Franchising
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto max-w-2xl text-base text-white/70 leading-relaxed">
                Our franchise services are designed to support businesses across industries looking to expand through scalable franchise models.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.label} delay={i * 0.05}>
                <div
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl"
                  style={{
                    background: 'linear-gradient(145deg, #12082a 0%, #0e0620 50%, #0a0618 100%)',
                    border: '1px solid rgba(139,92,246,0.18)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                    transition:
                      'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
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
                  onClick={() => navigateTo('/franchise-opportunities')}
                >
                  <div className="relative h-52 overflow-hidden bg-[#0a0618]">
                    <ServicesIndustryCardImg src={ind.img} alt={ind.label} />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0a0618]/90 to-transparent"
                      aria-hidden
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${ind.accent}, transparent)`,
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1.5 text-base font-bold leading-snug text-white">{ind.label}</h3>
                    <p className="flex-1 text-[0.78rem] leading-relaxed text-white">{ind.desc}</p>
                    <div
                      className="mt-3 flex items-center gap-1.5 text-[0.72rem] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ color: '#c4b5fd' }}
                    >
                      Explore opportunities <FiArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.6} className="text-center mt-16">
            <p className="text-sm text-white/50 mb-4">
              Don't see your industry? We work with businesses across all sectors.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white hover:bg-violet-500 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <span>Discuss Your Industry</span>
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </Reveal>

        </div>
      </div>

      {/* BENEFITS â€“ More than just a franchise platform */}
      <section className="relative z-10 w-full py-12 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[680px] text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3 }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
              Benefits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6"
            >
              More than just a franchise platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}
              className="text-base leading-relaxed text-white/65 sm:text-lg"
            >
              iFranchise helps you discover verified opportunities, make confident investment decisions, and scale smarter with real data and insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <button type="button" onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')}
                className="rounded-full btn-wave bg-[#0B1220] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.22)]">
                Book a Call
              </button>
              <button type="button" onClick={() => navigateTo('/franchise-opportunities')}
                className="rounded-full border border-violet-500/30 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/90 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)]">
                View More
              </button>
            </motion.div>
          </div>

          {/* Desktop â€” Premium Strategic Ecosystem Layout */}
          <div className="relative mt-16 hidden lg:block" style={{ height: '480px' }}>

            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 rounded-3xl border border-slate-200/90 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)]" />
              <div className="absolute inset-0 opacity-[0.03] rounded-3xl" style={{
                backgroundImage: `linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)`,
                backgroundSize: '48px 48px'
              }} />
            </div>

            {/* Center orbit graphic â€” refined size for better balance */}
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

            {/* Premium Pills â€” Perfect Circular Arrangement (8 pills, 45Â° apart) */}
            
            {/* Position 1: TOP CENTER (0Â°) - Moved further left */}
            <motion.div className="absolute top-[6%] left-[40%]"
              initial={{ opacity: 0, y: -12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.2 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                    <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Verified Franchise Listings</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 2: TOP RIGHT (45Â°) */}
            <motion.div className="absolute top-[16%] right-[12%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.25 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                    <FiBarChart2 className="h-3.5 w-3.5 text-indigo-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Data-Driven Insights</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 3: MIDDLE RIGHT (90Â°) */}
            <motion.div className="absolute top-[50%] -translate-y-1/2 right-[6%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.3 }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20">
                    <FiTarget className="h-3.5 w-3.5 text-violet-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Smart Investment Decisions</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 4: BOTTOM RIGHT (135Â°) */}
            <motion.div className="absolute bottom-[16%] right-[12%]"
              initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.35 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <FiAward className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Expert Guidance & Support</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 5: BOTTOM CENTER (180Â°) - Moved further left */}
            <motion.div className="absolute bottom-[6%] left-[37%]"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.4 }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <FiRefreshCw className="h-3.5 w-3.5 text-blue-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Real-Time Opportunity Updates</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 6: BOTTOM LEFT (225Â°) */}
            <motion.div className="absolute bottom-[16%] left-[12%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.45 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                    <FiFileText className="h-3.5 w-3.5 text-slate-300" />
                  </span>
                  <p className="text-sm font-medium text-white">Transparent Deal Information</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 7: MIDDLE LEFT (270Â°) */}
            <motion.div className="absolute top-[50%] -translate-y-1/2 left-[6%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.5 }}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-500/20">
                    <FiUsers className="h-3.5 w-3.5 text-rose-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Investor-Centric Platform</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Position 8: TOP LEFT (315Â°) */}
            <motion.div className="absolute top-[16%] left-[12%]"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.55 }}>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
                className="whitespace-nowrap rounded-full border border-slate-800/90 bg-slate-900 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <FiTarget className="h-3.5 w-3.5 text-purple-400" />
                  </span>
                  <p className="text-sm font-medium text-white">Strategic Planning</p>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Mobile â€” grid */}
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
                className="rounded-2xl border border-slate-800/90 bg-slate-900 px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:bg-slate-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
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

      {/* WHY CHOOSE iFRANCHISE */}
      <div className="relative z-10 w-full pt-8 pb-12 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center justify-center mb-6">
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  Why iFranchise
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-5 leading-tight">
                Why Businesses Choose iFranchise
              </h2>
            </Reveal>
          </div>

          {/* 4-Column Premium Enterprise Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            
            {/* Card 1: End-to-End Support */}
            <Reveal delay={0}>
              <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(99,102,241,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.3), inset 0 0 20px rgba(99,102,241,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(99,102,241,0.3)]">
                      <FiLayers className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-indigo-700">
                    End-to-End Support
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/85 leading-relaxed">
                    From onboarding to investor acquisition, we manage every stage of franchise growth.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-200 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

            {/* Card 2: Expansion-Focused Strategy */}
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(16,185,129,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(16,185,129,0.3), inset 0 0 20px rgba(16,185,129,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.3)]">
                      <FiTrendingUp className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-emerald-700">
                    Expansion-Focused Strategy
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/85 leading-relaxed">
                    Our approach is built around scalable business expansion and market reach.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-200 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

            {/* Card 3: Investor Network */}
            <Reveal delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(139,92,246,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(139,92,246,0.3)]">
                      <FiUsers className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-violet-700">
                    Investor Network
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/85 leading-relaxed">
                    Access investors actively searching for franchise business opportunities.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-200 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

            {/* Card 4: Structured Franchise Ecosystem */}
            <Reveal delay={0.3}>
              <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm p-8 transition-all duration-200 hover:-translate-y-3 hover:shadow-[0_24px_60px_rgba(249,115,22,0.15)] h-full flex flex-col">
                
                {/* Soft glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.3), inset 0 0 20px rgba(249,115,22,0.08)' }} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_12px_30px_rgba(249,115,22,0.3)]">
                      <FiShield className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-orange-700">
                    Structured Franchise Ecosystem
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/85 leading-relaxed">
                    Clear processes, transparent communication, and growth-focused execution.
                  </p>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-200 group-hover:translate-x-full pointer-events-none" />
              </div>
            </Reveal>

          </div>

        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="relative z-10 w-full py-12 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal>
              <div className="inline-flex items-center justify-center mb-6">
                <span className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  FAQ
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-5 leading-tight">
                Frequently Asked Questions
              </h2>
            </Reveal>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>

        </div>
      </div>


    </div>
  );
}


