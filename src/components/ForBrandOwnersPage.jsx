import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBrandInquiryForm from './sections/HeroBrandInquiryForm';
import ExpansionVisualPanel from './sections/ExpansionVisualPanel';
import BrandsSection from './sections/BrandsSection';
import ServicesStyleIndustriesSection from './sections/ServicesStyleIndustriesSection';
import CaseStudiesSection from './sections/CaseStudiesSection';
import ListYourBrandFAQSection from './sections/ListYourBrandFAQSection';
import {
  GrowthInvestorSection,
  RoadmapTimelineSection,
} from './sections/ListYourBrandConversionSections';

/** Shared layout — continuous dark page, minimal vertical gaps */
const LYB_SECTION = 'relative overflow-hidden bg-transparent py-10 lg:py-14';
const LYB_CONTAINER = 'relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10';

const IcoUsers = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IcoTrend = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IcoShield = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IcoArrow = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>;

export default function ForBrandOwnersPage() {
  const scrollToInquiry = () => {
    document.getElementById('hero-brand-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main className="relative z-10 overflow-x-hidden bg-transparent text-white">
      <section
        className={`${LYB_SECTION} w-full flex flex-col justify-center py-6 lg:py-8 overflow-hidden`}
        style={{ minHeight: 'calc(100vh - 80px)', maxHeight: 'calc(100vh - 80px)' }}
      >
        <motion.div className="relative z-10 flex h-full min-h-0 items-center">
          <motion.div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
            <motion.div
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                  For brand founders
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white max-w-lg">
                  List your brand.{' '}
                  <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                    Scale with capital.
                  </span>
                </h1>
                <p className="text-sm text-violet-100/85 leading-relaxed max-w-md">
                  Investor-ready franchise listing — model design, verified capital, and multi-city rollout.
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-violet-100/90">
                  <li className="flex items-center gap-1.5"><IcoUsers /><span>1,800+ investors</span></li>
                  <li className="flex items-center gap-1.5"><IcoShield /><span>SEBI-aligned</span></li>
                  <li className="flex items-center gap-1.5"><IcoTrend /><span>30-day readiness</span></li>
                </ul>
                <button
                  type="button"
                  onClick={scrollToInquiry}
                  className="group inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-violet-50"
                >
                  Start Franchise Listing
                  <IcoArrow />
                </button>
              </motion.div>
              <HeroBrandInquiryForm id="hero-brand-inquiry" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <TrustStrip />
      
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 3 â€" BRAND EXPANSION PROBLEMS
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <ProblemsSection />

      <GrowthInvestorSection />
      <BrandsSection />

      {/* â"€â"€ separator â"€â"€ */}
      
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SECTION 8 â€" INDUSTRIES WE SUPPORT
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <ServicesStyleIndustriesSection />

      <RoadmapTimelineSection />
      <CaseStudiesSection />
      <ListYourBrandFAQSection />

    </main>
  );
}

// â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
// SECTION 2 â€" TRUST & SCALE STRIP
// â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const TRUST_STATS = [
  { value: 200,  suffix: '+', label: 'Brands Scaled'           },
  { value: 1800, suffix: '+', label: 'Investors Onboarded'     },
  { value: 17,   suffix: '+', label: 'Cities Covered'          },
  { value: 24,   suffix: '+', label: 'Active Opportunities'    },
  { value: 94,   suffix: '%', label: 'Investor Engagement Rate'},
];

const PARTNER_LOGOS = [
  'BurgerBlast', 'FitLife Gym', 'EcoClean', 'TechTutor',
  'CoffeeHaven', 'YogaZen', 'CodeAcademy', 'FreshMart',
];

function TrustCounter({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const tick = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function TrustStrip() {
  return (
    <section className={LYB_SECTION}>
      <motion.div className={LYB_CONTAINER}>

        {/* section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[0.7rem] font-bold uppercase tracking-widest text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Trusted by India&apos;s Fastest-Growing Brands
          </span>
        </motion.div>

        {/* animated stat counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-violet-500/20 mb-8">
          {TRUST_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-premium-dark-inner flex flex-col items-center justify-center py-7 px-4 transition-colors duration-300 hover:border-violet-400/35"
            >
              <p className="text-3xl font-extrabold text-white mb-1">
                <TrustCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[0.7rem] font-medium text-white text-center">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* investor trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          {[
            { icon: null, text: 'SEBI Compliant Framework'     },
            { icon: null, text: 'Verified Investor Network'    },
            { icon: null, text: 'Structured Due Diligence'     },
            { icon: null, text: 'Transparent ROI Reporting'    },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/25 bg-white/5">
              <span className="text-emerald-600 text-xs font-bold">{t.icon}</span>
              <span className="text-[0.75rem] font-semibold text-white">{t.text}</span>
            </div>
          ))}
        </motion.div>

        {/* scrolling marquee of partner logos */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0618] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0618] to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max"
          >
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
              <div
                key={i}
                className="card-premium-dark-inner flex items-center justify-center px-6 py-3 rounded-xl min-w-[140px]"
              >
                <span className="text-[0.75rem] font-bold text-white whitespace-nowrap">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

// SECTION 3 — PROBLEMS â€" PROBLEMS vs SOLUTIONS  (user-driven, continuous flow)
// â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const TAG_STYLE = 'bg-amber-500/10 border-amber-400/35 text-amber-200';

const ITEMS = [
  {
    problem: 'Weak Onboarding Systems',
    problemDesc: 'No SOPs or training. Franchisees fail from day one.',
    solution: 'Structured SOP Frameworks',
    solutionDesc: 'We build franchise-ready onboarding so every new unit launches with the same standards as your best location.',
    solutionDetail: 'Includes role-based training paths, launch QA checklists, and handover templates your team can run without constant founder involvement.',
    outcomes: ['Unit launch playbook (30–45 day rollout)', 'Trainer kits + franchisee certification flow', 'Quality gates before go-live'],
    metric: 'Typical delivery: 2–3 weeks',
    tags: ['SOP Library', 'Training Modules', 'Launch Checklist'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  },
  {
    problem: 'Poor Franchise Architecture',
    problemDesc: 'Expanding without a model causes unit failures and legal gaps.',
    solution: 'Scalable Franchise Model Design',
    solutionDesc: 'We design the right FOFO, FOCO, or FICO structure based on your operations, capital needs, and expansion goals.',
    solutionDetail: 'Covers franchise agreement frameworks, fee architecture, territory rights, and investor-facing unit economics — ready for legal review.',
    outcomes: ['Model comparison & recommendation memo', 'Franchise disclosure–ready documentation pack', 'Multi-unit expansion blueprint'],
    metric: 'Investor-grade legal stack',
    tags: ['Legal Framework', 'Model Design', 'Multi-Unit Ready'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  },
  {
    problem: 'Low-Quality Investor Pipeline',
    problemDesc: 'Unqualified leads waste months and drain marketing budgets.',
    solution: 'Verified Investor Network',
    solutionDesc: 'Access 1,800+ pre-screened investors filtered by ticket size, sector, geography, and operating appetite — not cold lists.',
    solutionDetail: 'We qualify intent before intro, align capital range to your model, and support you through discovery calls to term discussions.',
    outcomes: ['Investor shortlist matched to your profile', 'Capital-range & geography filtering', 'Warm introductions with context briefs'],
    metric: '1,800+ verified investors',
    tags: ['Capital Verified', 'Intent Matched', 'Warm Intros'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    problem: 'No Expansion Strategy',
    problemDesc: 'Reactive growth with no territory planning leads to chaos.',
    solution: 'Data-Driven Territory Planning',
    solutionDesc: 'Market analysis, phased rollout maps, and city-level targeting so you expand in the right sequence — not everywhere at once.',
    solutionDetail: 'Uses saturation mapping, competitor density, and ticket-size fit to prioritize cities and protect franchisee ROI.',
    outcomes: ['Tier-1 / Tier-2 city rollout map', 'Territory exclusivity recommendations', 'Phased launch calendar (6–18 months)'],
    metric: '17+ cities mapped',
    tags: ['Territory Maps', 'Market Analysis', 'Phased Rollout'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>,
  },
  {
    problem: 'Inconsistent Operations',
    problemDesc: 'Every unit runs differently. Brand equity erodes fast.',
    solution: 'Centralized Operations Systems',
    solutionDesc: 'Unified quality controls, audits, and live dashboards so every franchisee runs to the same standard.',
    solutionDetail: 'Track unit KPIs, flag underperformance early, and give franchise partners clear accountability — without micromanaging daily ops.',
    outcomes: ['Brand consistency audit scorecard', 'Unit-level KPI dashboard', 'Escalation & remediation playbooks'],
    metric: 'Real-time ops visibility',
    tags: ['Quality Audits', 'Live Dashboards', 'Standardized Ops'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    problem: 'Weak Brand Positioning',
    problemDesc: 'Failing to communicate value. Investors look elsewhere.',
    solution: 'Premium Brand Storytelling',
    solutionDesc: 'Investor-grade decks, data rooms, and positioning that communicate unit economics, moat, and growth narrative clearly.',
    solutionDetail: 'We translate your brand story into materials capital understands — from one-pagers to full franchise opportunity presentations.',
    outcomes: ['Investor deck + franchise opportunity PDF', 'Brand narrative & differentiation framework', 'Due-diligence data room structure'],
    metric: 'Pitch-ready in ~10 days',
    tags: ['Investor Decks', 'Pitch Materials', 'Brand Strategy'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>,
  },
  {
    problem: 'Random Lead Generation',
    problemDesc: 'No funnel means wasted spend and zero qualified pipeline.',
    solution: 'Performance Investor Acquisition',
    solutionDesc: 'Structured funnels that attract serious franchise investors — with tracking from first touch to signed agreement.',
    solutionDetail: 'Combines listing optimization, outreach sequences, and conversion analytics so you know what’s working and what to scale.',
    outcomes: ['Qualified investor funnel setup', 'Listing + outreach conversion tracking', 'Monthly pipeline & ROI reporting'],
    metric: '94% intent-matched leads',
    tags: ['Lead Funnels', 'ROI Tracking', 'Conversion Systems'],
    tagColor: TAG_STYLE,
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>,
  },
];

function ProblemsSection() {
  const [active, setActive] = useState(null);
  const item = active !== null ? ITEMS[active] : null;

  return (
    <section className={LYB_SECTION}>
      <div className={LYB_CONTAINER}>

        {/* â"€â"€ section header â€" same style as home sections â"€â"€ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-400/40 bg-red-500/10 text-[0.68rem] font-bold uppercase tracking-widest text-red-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            The Hard Truth
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[2.1rem] font-extrabold tracking-tight leading-[1.15]">
            <span className="bg-gradient-to-r from-white via-violet-100 to-indigo-200 bg-clip-text text-transparent">
              Why Most Brands Fail to Scale — and How iFranchise Fixes It
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white leading-relaxed line-clamp-2 max-w-2xl mx-auto">
            Select any failure point to see our franchise operating system — investor match, model design, and rollout intelligence.
          </p>
        </motion.div>

        {/* â"€â"€ two-column body â"€â"€ */}
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">

          {/* LEFT â€" 7 problem rows */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[520px] flex-col"
          >
            <p className="mb-4 shrink-0 text-[0.65rem] font-bold uppercase tracking-widest text-white/80">7 Common Failure Points</p>
            <div className="flex flex-1 flex-col justify-between gap-2">
            {ITEMS.map((it, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(active === i ? null : i)}
                whileHover={{ x: active === i ? 0 : 4 }}
                transition={{ duration: 0.15 }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  active === i
                    ? 'border-red-400/50 bg-red-500/15 shadow-sm'
                    : 'card-premium-dark-inner hover:border-red-400/40 hover:bg-red-500/10'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                  active === i ? 'bg-red-500 text-white' : 'bg-white/10 text-white'
                }`}>
                  {it.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
                    active === i ? 'text-red-200' : 'text-white'
                  }`}>{it.problem}</p>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="text-[0.72rem] text-red-500/80 mt-0.5 leading-snug overflow-hidden"
                    >
                      {it.problemDesc}
                    </motion.p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: active === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <svg className={`w-4 h-4 transition-colors duration-200 ${active === i ? 'text-red-400' : 'text-white'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </motion.button>
            ))}
            </div>
          </motion.div>

          {/* RIGHT — solution panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[520px] flex-col"
          >
            <AnimatePresence mode="wait">
            {item === null ? (
              <motion.div
                key="visual"
                className="h-full flex-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <ExpansionVisualPanel />
              </motion.div>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card-premium-dark flex h-full flex-1 flex-col overflow-hidden rounded-2xl shadow-xl"
              >
                {/* card header */}
                <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-violet-600 to-indigo-600">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white">iFranchise Solution</p>
                    <p className="text-base font-extrabold text-white leading-tight">{item.solution}</p>
                  </div>
                  <div className="ml-auto w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>

                <motion.div className="flex flex-1 flex-col space-y-4 p-5">
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2">
                    <svg className="h-3.5 w-3.5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold text-red-200">{item.problem}</span>
                    <span className="text-white">→</span>
                    <span className="text-[0.72rem] font-semibold text-white">Fixed</span>
                  </div>

                  <p className="text-[0.9rem] font-medium leading-relaxed text-white">{item.solutionDesc}</p>
                  <p className="text-[0.8rem] leading-relaxed text-violet-100/75">{item.solutionDetail}</p>

                  <ul className="space-y-2 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3.5">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-[0.78rem] text-violet-100/90">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${item.tagColor}`}>
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-white/90">{item.metric}</p>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1.5">
                      {ITEMS.map((_, i) => (
                        <button key={i} onClick={() => setActive(i)}
                          className={`rounded-full transition-all duration-200 ${
                            i === active ? 'w-4 h-1.5 bg-violet-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/35'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                      className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[0.78rem] font-semibold text-white transition hover:bg-white/20"
                    >
                      Get This Solution
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



