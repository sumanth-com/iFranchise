import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitBrandApplication } from '../lib/forms';
import CtaButton from './ui/CtaButton';
import PremiumFAQItem from './ui/PremiumFAQItem';
import {
  franchiseOpportunities,
  getTotalCities,
  getAverageROI,
  calculateGrowthMetrics,
  getTopCities,
  getMarketTrends,
} from '../data/franchiseData';
import { FiArrowRight } from 'react-icons/fi';
import SectionPill from './ui/SectionPill';
import { BRAND_OWNERS_INDUSTRIES } from '../data/sectionImages';
import IndustryCard from './IndustryCard';

/** Shared layout — continuous dark page, minimal vertical gaps */
const LYB_SECTION = 'relative overflow-hidden bg-transparent py-10 lg:py-14';
const LYB_CONTAINER = 'relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10';
const VIEWPORT_SECTION = `${LYB_SECTION} lg:min-h-[min(100vh,900px)] flex items-center`;
const LYB_REVEAL_HERO_FORM = 'lyb-reveal-hero-form';

function scrollToHeroInquiry() {
  window.dispatchEvent(new CustomEvent(LYB_REVEAL_HERO_FORM));
  window.setTimeout(() => {
    document.getElementById('lyb-hero-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      const firstField = document.querySelector(
        '#hero-brand-inquiry input:not([type="hidden"]), #hero-brand-inquiry select, #hero-brand-inquiry textarea',
      );
      firstField?.focus({ preventScroll: true });
    }, 380);
  }, 120);
}

const HERO_VIEWPORT_H = 'calc(100vh - 80px)';
const LYB_EASE = [0.22, 1, 0.36, 1];
const LYB_ENTER = { duration: 0.42, ease: LYB_EASE };
const LYB_FAST = { duration: 0.28, ease: LYB_EASE };
const LYB_REVEAL = { duration: 0.36, ease: LYB_EASE };

const IcoUsers = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IcoTrend = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IcoShield = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IcoArrow = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>;

function HeroFormTeaser() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 18, scale: 0.98 }}
      transition={LYB_REVEAL}
      className="lyb-hero-form-teaser absolute inset-0 hidden h-full max-h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-violet-400/40 bg-violet-500/[0.08] px-8 py-8 text-center backdrop-blur-sm lg:flex"
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-violet-400/5"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ y: [0, -5, 0], opacity: 1 }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          opacity: { delay: 0.18, duration: 0.35 },
        }}
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/35 bg-violet-500/20 shadow-[0_0_24px_rgba(139,92,246,0.25)]"
      >
        <svg className="h-7 w-7 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, ...LYB_FAST }}
        className="relative text-base font-bold text-white"
      >
        Your listing form opens here
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, ...LYB_FAST }}
        className="lyb-hero-subtext relative mt-2 max-w-[260px] text-sm leading-relaxed"
      >
        Click <span className="font-semibold text-violet-200">Start Franchise Listing</span> on the left to reveal it.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.34, ...LYB_FAST }}
        className="relative mt-6 flex items-center gap-2 text-violet-300/90"
      >
        <motion.span
          animate={{ width: ['2rem', '2.75rem', '2rem'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-px bg-violet-400/50"
        />
        <motion.span
          animate={{ x: [-3, 0, -3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex rotate-180"
        >
          <IcoArrow />
        </motion.span>
        <span className="text-xs font-medium uppercase tracking-widest">Waiting for you</span>
      </motion.div>
    </motion.div>
  );
}

function ListYourBrandHeroSection() {
  const [formRevealed, setFormRevealed] = useState(false);

  useEffect(() => {
    const onReveal = () => setFormRevealed(true);
    window.addEventListener(LYB_REVEAL_HERO_FORM, onReveal);
    return () => window.removeEventListener(LYB_REVEAL_HERO_FORM, onReveal);
  }, []);

  const revealForm = () => {
    setFormRevealed(true);
    window.dispatchEvent(new CustomEvent(LYB_REVEAL_HERO_FORM));
  };

  return (
    <section
      id="lyb-hero-section"
      className={`lyb-hero-section ${LYB_SECTION} flex w-full flex-col justify-center overflow-hidden py-4 sm:py-5 lg:py-6`}
      style={{ height: HERO_VIEWPORT_H, minHeight: HERO_VIEWPORT_H, maxHeight: HERO_VIEWPORT_H }}
    >
      <div className="relative z-10 flex h-full min-h-0 w-full items-center">
        <motion.div className="mx-auto h-full max-h-full w-full min-h-0 max-w-[1320px] px-6 lg:px-10">
          <motion.div
            layout
            className={`grid h-full min-h-0 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(520px,620px)] lg:items-center lg:gap-8 xl:gap-12 ${
              formRevealed ? 'grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1' : ''
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={LYB_ENTER}
          >
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={LYB_ENTER}
              className={`lyb-hero-copy flex min-h-0 flex-col justify-center ${formRevealed ? 'gap-2' : 'gap-3 sm:gap-4'}`}
            >
              <span className="lyb-hero-badge inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/15 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-violet-100">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                For brand founders
              </span>
              <motion.h1
                layout
                transition={LYB_FAST}
                className={`lyb-hero-title max-w-lg font-extrabold leading-[1.08] tracking-tight ${
                  formRevealed ? 'text-2xl sm:text-3xl lg:text-[2rem]' : 'text-3xl sm:text-4xl lg:text-[2.5rem]'
                }`}
              >
                List your brand. Scale with capital.
              </motion.h1>
              <AnimatePresence initial={false}>
                {!formRevealed && (
                  <motion.div
                    key="hero-extra"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={LYB_FAST}
                  >
                    <p className="lyb-hero-subtext max-w-md text-sm leading-relaxed">
                      Investor-ready franchise listing — model design, verified capital, and multi-city rollout.
                    </p>
                    <ul className="lyb-hero-subtext mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem]">
                      <li className="flex items-center gap-1.5"><IcoUsers /><span>1,800+ investors</span></li>
                      <li className="flex items-center gap-1.5"><IcoShield /><span>SEBI-aligned</span></li>
                      <li className="flex items-center gap-1.5"><IcoTrend /><span>30-day readiness</span></li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              {!formRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...LYB_ENTER }}
                  className="mt-1 flex flex-col gap-2"
                >
                  <motion.button
                    type="button"
                    onClick={revealForm}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="lyb-hero-cta btn-purple-solid group relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-violet-900/30"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/0 via-violet-300/25 to-violet-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span className="relative">Start Franchise Listing</span>
                    <motion.span
                      className="relative inline-flex"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <IcoArrow />
                    </motion.span>
                  </motion.button>
                  <p className="lyb-hero-cta-hint hidden items-center gap-2 text-[0.7rem] font-medium text-violet-200/80 lg:flex">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                    Opens your live listing form on the right
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              layout
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...LYB_ENTER }}
              className={`relative min-h-0 w-full ${formRevealed ? 'block h-full max-h-full' : 'hidden lg:block lg:h-full'}`}
            >
              <AnimatePresence initial={false}>
                {formRevealed ? (
                  <HeroBrandInquiryForm key="form" id="hero-brand-inquiry" fitViewport />
                ) : (
                  <HeroFormTeaser key="teaser" />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ForBrandOwnersPage() {
  return (
    <main className="list-your-brand-page relative z-10 overflow-x-hidden bg-transparent text-white">
      <ListYourBrandHeroSection />

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
    <section className={`lyb-problems-section ${LYB_SECTION}`}>
      <div className={LYB_CONTAINER}>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lyb-problems-heading-wrap lyb-dark-heading mb-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <span className="lyb-section-badge inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              The Hard Truth
            </span>
          </div>
          <h2 className="lyb-page-h2 lyb-section-heading-on-dark text-xl sm:text-2xl lg:text-[2.1rem] font-extrabold tracking-tight leading-[1.15]">
            <span className="lyb-problems-heading bg-gradient-to-r from-white via-violet-100 to-indigo-200 bg-clip-text text-transparent">
              Why Most Brands Fail to Scale — and How iFranchise Fixes It
            </span>
          </h2>
          <p className="lyb-page-subtext mt-3 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-2xl mx-auto">
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
                className="theme-dark-surface card-premium-dark flex h-full flex-1 flex-col overflow-hidden rounded-2xl shadow-xl"
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

// ── Inlined section components ──

/* HeroBrandInquiryForm.jsx */
const HERO_FORM_INDUSTRIES = [
  'Food & Beverage', 'Health & Wellness', 'Education', 'Retail',
  'Technology', 'Home Services', 'Entertainment', 'Other',
];
const MODELS = ['FOFO', 'FOCO', 'FICO', 'Not Sure Yet'];
const BUDGETS = ['Under Rs.25L', 'Rs.25L - Rs.50L', 'Rs.50L - Rs.1Cr', 'Rs.1Cr - Rs.5Cr', 'Rs.5Cr+'];
const EXPANSION_GOALS = ['1-3 cities', '4-10 cities', '10-25 cities', '25+ cities'];

const inputClass =
  'lyb-form-field w-full min-h-[42px] rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-black placeholder:text-slate-500 placeholder:opacity-100 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25';
const inputClassCompact =
  'lyb-form-field w-full min-h-[38px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] leading-snug text-black placeholder:text-slate-500 placeholder:opacity-100 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25';
const selectClass = `${inputClassCompact} lyb-form-select cursor-pointer pr-9`;
const selectClassFull = `${inputClass} lyb-form-select cursor-pointer pr-10`;

function SelectChevron() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SelectField({ className, children, ...props }) {
  return (
    <div className="lyb-form-select-wrap relative">
      <select className={className} {...props}>
        {children}
      </select>
      <span className="lyb-form-select-chevron pointer-events-none absolute inset-y-0 right-2.5 flex items-center" aria-hidden>
        <SelectChevron />
      </span>
    </div>
  );
}

function Field({ label, required, children, className = '', compact = false }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label
        className={`lyb-form-label mb-1 block font-extrabold uppercase tracking-wide ${
          compact ? 'text-[0.62rem] leading-tight' : 'text-[0.65rem]'
        }`}
      >
        {label}
        {required && (
          <span className="lyb-form-required ml-0.5 inline-block text-[0.85em] font-black text-rose-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function HeroBrandInquiryForm({ id = 'hero-brand-inquiry', fitViewport = false }) {
  const fieldClass = fitViewport ? inputClassCompact : inputClass;
  const selectFieldClass = fitViewport ? selectClass : selectClassFull;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    brandName: '', name: '', email: '', phone: '',
    industry: '', outlets: '', budget: '', cityGoal: '', model: '', vision: '',
  });
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      timeline: '3-6 months',
      founded: '',
      hasSOPs: '',
      hasDocs: '',
      company: form.brandName,
    };
    const result = await submitBrandApplication(payload, 'list_your_brand_hero');
    setSubmitting(false);
    if (result.success) setSubmitted(true);
    else alert(result.error || 'Submission failed. Please try again.');
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 12, scale: 0.99 }}
      transition={LYB_REVEAL}
      className={`lyb-hero-form absolute inset-0 w-full justify-self-stretch lg:max-w-none ${fitViewport ? 'flex h-full max-h-full min-h-0 flex-col' : ''}`}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        className={`lyb-form-panel relative flex w-full flex-col overflow-hidden rounded-2xl border border-violet-400/40 bg-gradient-to-br from-white/[0.14] to-white/[0.07] shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl ${
          fitViewport ? 'h-full max-h-full min-h-0 px-4 pt-4 pb-3 sm:px-5 sm:pt-4 sm:pb-3' : 'p-6 sm:p-7 lg:p-8'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

        <div className={`shrink-0 border-b border-white/10 ${fitViewport ? 'mb-2.5 pb-2' : 'mb-4 pb-3'}`}>
          <p className="lyb-form-eyebrow text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white sm:text-[0.62rem]">Brand inquiry</p>
          <h2 className={`lyb-form-title font-extrabold text-white ${fitViewport ? 'text-base' : 'text-lg'}`}>Start Your Listing</h2>
        </div>

        <div className={fitViewport ? 'flex min-h-0 flex-1 flex-col' : ''}>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-bold text-white">Application received</p>
              <p className="mt-1 text-xs text-white">We&apos;ll contact you within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className={`flex min-h-0 flex-col ${fitViewport ? 'h-full flex-1' : 'gap-4'}`}
            >
              <div
                className={
                  fitViewport
                    ? 'lyb-hero-form-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pr-0.5'
                    : ''
                }
              >
                <div className={`grid shrink-0 grid-cols-1 sm:grid-cols-2 ${fitViewport ? 'gap-x-2.5 gap-y-2.5' : 'gap-4'}`}>
                  <Field label="Brand Name" required compact={fitViewport}>
                    <input
                      className={fieldClass}
                      value={form.brandName}
                      onChange={(e) => set('brandName', e.target.value)}
                      placeholder="e.g. Chai & Co"
                      required
                    />
                  </Field>
                  <Field label="Your Full Name" required compact={fitViewport}>
                    <input
                      className={fieldClass}
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      required
                    />
                  </Field>
                  <Field label="Email" required compact={fitViewport}>
                    <input
                      type="email"
                      className={fieldClass}
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="you@brand.com"
                      required
                    />
                  </Field>
                  <Field label="Phone" required compact={fitViewport}>
                    <input
                      type="tel"
                      className={fieldClass}
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </Field>
                  <Field label="Category" required compact={fitViewport}>
                    <SelectField className={selectFieldClass} value={form.industry} onChange={(e) => set('industry', e.target.value)} required>
                      <option value="">Select category</option>
                      {HERO_FORM_INDUSTRIES.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                  <Field label="Locations" compact={fitViewport}>
                    <input
                      className={fieldClass}
                      value={form.outlets}
                      onChange={(e) => set('outlets', e.target.value)}
                      placeholder="e.g. 12 outlets"
                    />
                  </Field>
                  <Field label="Investment" compact={fitViewport}>
                    <SelectField className={selectFieldClass} value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                      <option value="">Select range</option>
                      {BUDGETS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                  <Field label="Expansion Goal" required compact={fitViewport}>
                    <SelectField className={selectFieldClass} value={form.cityGoal} onChange={(e) => set('cityGoal', e.target.value)} required>
                      <option value="">Select goal</option>
                      {EXPANSION_GOALS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                  <Field label="Franchise Model" required compact={fitViewport} className="col-span-2">
                    <SelectField className={selectFieldClass} value={form.model} onChange={(e) => set('model', e.target.value)} required>
                      <option value="">Choose franchise model</option>
                      {MODELS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                </div>
                <Field
                  label="Expansion Vision"
                  compact={fitViewport}
                  className={fitViewport ? 'mt-2.5 flex min-h-[88px] flex-1 flex-col' : 'mt-4'}
                >
                  <textarea
                    className={`${fieldClass} resize-none ${fitViewport ? 'min-h-[88px] flex-1' : 'min-h-[88px]'}`}
                    value={form.vision}
                    onChange={(e) => set('vision', e.target.value)}
                    rows={fitViewport ? 4 : 3}
                    placeholder="Target cities, timeline, franchise goals, and how you want to scale…"
                  />
                </Field>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`lyb-hero-form-submit flex w-full shrink-0 items-center justify-center gap-2 rounded-xl font-bold shadow-lg transition disabled:opacity-60 ${
                  fitViewport ? 'mt-2 mb-0 py-2.5 text-[13px]' : 'mt-1 py-3 text-sm'
                }`}
              >
                {submitting ? 'Submitting…' : 'Submit Brand Inquiry'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ExpansionVisualPanel.jsx */
const TAGS = ['Investors', 'Territory', 'SOPs', 'Scale', 'Legal', 'ROI'];

const CAPABILITIES = [
  'Investor-ready matchmaking',
  'Franchise model & legal stack',
  'Territory & rollout intelligence',
  'Multi-city expansion playbooks',
];

const STEPS = ['Audit', 'Model', 'Match', 'Scale'];

function CursorIcon() {
  return (
    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 3l14 8.5L12 12l-1.5 7L5 3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpansionVisualPanel() {
  const [activeTag, setActiveTag] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeCap, setActiveCap] = useState(0);

  useEffect(() => {
    const tagId = setInterval(() => setActiveTag((t) => (t + 1) % TAGS.length), 2800);
    const stepId = setInterval(() => setActiveStep((s) => (s + 1) % STEPS.length), 2200);
    const capId = setInterval(() => setActiveCap((c) => (c + 1) % CAPABILITIES.length), 4000);
    return () => {
      clearInterval(tagId);
      clearInterval(stepId);
      clearInterval(capId);
    };
  }, []);

  return (
    <motion.div
      className="relative flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-violet-200/70 bg-white shadow-[0_24px_60px_rgba(88,28,135,0.12)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* soft top gradient wash */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-100/50 to-transparent"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* left-edge flow — stays in margin, never overlaps copy */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-[38%] text-violet-400"
        viewBox="0 0 160 520"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="expFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 4 120 Q 60 100, 90 180 T 70 320 Q 50 400, 100 450"
          fill="none"
          stroke="url(#expFlowGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="2.5"
            fill="#8b5cf6"
            animate={{
              cx: [8, 55, 75, 45, 8],
              cy: [140 + i * 70, 120 + i * 70, 200 + i * 50, 350, 140 + i * 70],
              opacity: [0, 0.65, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* corner rings — subtle, out of content zone */}
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-violet-200/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute -left-8 -bottom-8 h-28 w-28 rounded-full border border-violet-100/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      {/* main content */}
      <motion.div className="relative z-10 mx-auto flex h-full w-full max-w-[320px] flex-col items-center justify-center px-6 py-10 text-center">
        {/* cursor + soft pulse */}
        <motion.div
          className="relative mb-5"
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute -inset-2 rounded-2xl bg-violet-400/12 blur-lg"
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(109,40,217,0.1)]">
            <CursorIcon />
          </div>
          <motion.span
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {[0, 1].map((d) => (
            <motion.span
              key={d}
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-400"
              style={{ left: -10 - d * 12 }}
              animate={{ opacity: [0, 0.55, 0], x: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: d * 0.35 }}
            />
          ))}
        </motion.div>

        <h3 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
          Select a problem on the left
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white">
          See how iFranchise solves each failure point with structured expansion support.
        </p>

        {/* rotating capability line */}
        <div className="mt-4 h-5 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCap}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-xs font-semibold text-violet-600"
            >
              {CAPABILITIES[activeCap]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* cycling tags */}
        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {TAGS.map((label, i) => (
            <motion.span
              key={label}
              layout
              animate={{
                opacity: i === activeTag ? 1 : 0.5,
                y: i === activeTag ? -2 : 0,
                scale: i === activeTag ? 1.02 : 1,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-medium ${
                i === activeTag
                  ? 'border-violet-400 bg-violet-600 text-white shadow-[0_2px_12px_rgba(109,40,217,0.22)]'
                  : 'border-violet-100 bg-violet-50/80 text-violet-700'
              }`}
            >
              {label}
            </motion.span>
          ))}
        </div>

        {/* mini pipeline */}
        <div className="mt-6 w-full max-w-[260px]">
          <div className="relative flex items-start justify-between">
            <div
              className="absolute left-3 right-3 top-3 h-0.5 rounded-full bg-violet-100"
              aria-hidden
            />
            <motion.div
              className="absolute left-3 top-3 h-0.5 origin-left rounded-full bg-violet-500"
              initial={false}
              animate={{ scaleX: activeStep / (STEPS.length - 1) }}
              style={{ width: 'calc(100% - 1.5rem)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            {STEPS.map((step, i) => (
              <motion.div
                key={step}
                className="relative z-[1] flex flex-col items-center gap-1"
                animate={{ opacity: i <= activeStep ? 1 : 0.4 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.55rem] font-bold ${
                    i === activeStep
                      ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(109,40,217,0.35)]'
                      : i < activeStep
                        ? 'bg-violet-200 text-violet-700'
                        : 'bg-white text-violet-400 ring-1 ring-violet-200'
                  }`}
                  animate={i === activeStep ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  {i + 1}
                </motion.div>
                <span className="text-[0.58rem] font-medium text-white">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* footer hint */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-2 border-t border-violet-100/80 bg-violet-50/30 py-3.5"
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span
          className="flex gap-0.5 text-violet-400"
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {['‹', '‹', '‹'].map((c, i) => (
            <span key={i} className="text-sm font-light">
              {c}
            </span>
          ))}
        </motion.span>
        <span className="text-xs font-medium text-white">Pick a failure point to explore</span>
      </motion.div>
    </motion.div>
  );
}

/* BrandsSection.jsx */
function MiniBar({ value, max, color = 'violet', delay = 0, live = false }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-1.5">
      <div className="lyb-mini-bar-track h-1 flex-1 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${
            color === 'violet'  ? 'from-violet-400 to-indigo-400' :
            color === 'emerald' ? 'from-emerald-400 to-teal-400'  :
            'from-amber-400 to-orange-400'
          }`}
        />
      </div>
      <span className="lyb-mini-bar-pct w-6 text-right text-[0.58rem] font-bold tabular-nums">{pct}%</span>
    </div>
  );
}

const BRANDS_SECTION_BENEFITS = [
  { title: 'Franchise-Ready in 30 Days', stat: '30 days', desc: 'Complete model, docs & systems built fast.' },
  { title: 'Qualified Investor Pipeline', stat: '1,800+', desc: 'Only serious, capital-ready investors reach you.' },
  { title: 'Multi-City Expansion Roadmap', stat: '17+ cities', desc: 'Data-driven territory strategy for every market.' },
  { title: 'Ongoing Operational Support', stat: 'Always on', desc: 'We stay with you through every unit launch.' },
];

function LiveCounter({ display, className = '' }) {
  const match = String(display).match(/([\d.]+)(.*)/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : display;
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(eased * target);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const shown = Number.isInteger(target) ? Math.round(val) : val.toFixed(1);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {target ? shown : display}{suffix}
    </span>
  );
}

function BenefitCard({ benefit, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="lyb-benefit-card group relative flex h-full min-h-[140px] flex-col items-center justify-center gap-2.5 rounded-xl border border-violet-500/20 p-4 text-center shadow-sm transition-shadow hover:border-violet-400/35 hover:shadow-md"
    >
      <motion.div
        className="lyb-benefit-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/25"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35, ease: 'easeInOut' }}
      >
        <span className="lyb-benefit-icon-num text-sm font-extrabold leading-none text-white">{index + 1}</span>
      </motion.div>
      <p className="lyb-benefit-title text-[0.84rem] font-bold leading-snug sm:text-[0.9rem]">{benefit.title}</p>
      <p className="lyb-benefit-desc max-w-[200px] text-[0.72rem] leading-relaxed sm:text-[0.76rem]">{benefit.desc}</p>
      <span className="lyb-benefit-stat rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide">
        {benefit.stat}
      </span>
    </motion.div>
  );
}

const ONBOARDING = [
  { label: 'Brand Discovery & Audit',   status: 'live'     },
  { label: 'Franchise Model Design',    status: 'live'     },
  { label: 'Legal Documentation',       status: 'live'     },
  { label: 'Investor Deck Prep',        status: 'progress' },
  { label: 'Territory Mapping',         status: 'progress' },
  { label: 'Investor Outreach Launch',  status: 'pending'  },
];

const STATUS_COLOR = { live: 'bg-emerald-500', progress: 'bg-amber-400', pending: 'bg-slate-500' };
const STATUS_TEXT  = { live: 'text-emerald-400', progress: 'text-amber-400', pending: 'text-white' };
const STATUS_LABEL = { live: 'Live', progress: 'In Progress', pending: 'Pending' };

function LiveStatusDot({ status }) {
  const pulse = status === 'live' || status === 'progress';
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {pulse && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${STATUS_COLOR[status]}`} />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${STATUS_COLOR[status]}`} />
    </span>
  );
}

function BrandsSection() {
  const markets     = useMemo(() => getMarketTrends(), []);
  const topCities   = useMemo(() => getTopCities(4), []);
  const avgROI      = useMemo(() => getAverageROI(), []);
  const cityCount   = useMemo(() => getTotalCities(), []);
  const totalBrands = useMemo(() => franchiseOpportunities.length, []);
  const growth      = useMemo(() => calculateGrowthMetrics(), []);
  const maxCount    = useMemo(() => Math.max(...markets.map(m => m.count)), [markets]);

  return (
    <section className="lyb-brands-section relative overflow-hidden bg-transparent py-10 lg:py-14">
      <motion.div className={`${LYB_CONTAINER} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lyb-dark-heading lyb-brands-heading mb-8 text-center lg:mb-10"
        >
          <motion.div className="mb-4 flex justify-center">
            <span className="lyb-section-badge lyb-brands-badge inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              For Brand Owners
            </span>
          </motion.div>
          <h2 className="lyb-page-h2 lyb-section-heading-on-dark mx-auto max-w-3xl text-2xl font-extrabold leading-[1.1] tracking-tight sm:text-3xl lg:text-[2rem] xl:text-[2.3rem]">
            Everything Your Brand Needs to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Franchise at Scale
            </span>
          </h2>
          <p className="lyb-section-subtext mx-auto mt-3 max-w-2xl text-[0.88rem] leading-relaxed sm:text-[0.92rem]">
            From franchise model design to investor acquisition — we handle the full expansion infrastructure so you focus on building your brand.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full min-h-0 flex-col justify-between gap-6"
          >
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              {BRANDS_SECTION_BENEFITS.map((b, i) => (
                <BenefitCard key={b.title} benefit={b} index={i} />
              ))}
            </div>

            <motion.div className="flex justify-center pt-2">
              <CtaButton
                className="mx-auto"
                size="sm"
                type="button"
                onClick={scrollToHeroInquiry}
              >
                Begin Your Listing Application
              </CtaButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full min-h-0 flex-col"
          >
            <motion.div
              className="lyb-live-dashboard theme-dark-surface card-premium-dark relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl shadow-xl lg:min-h-0"
              animate={{ boxShadow: ['0 20px 50px rgba(109,40,217,0.15)', '0 24px 56px rgba(109,40,217,0.28)', '0 20px 50px rgba(109,40,217,0.15)'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <motion.div className="lyb-dash-header flex items-center justify-between border-b border-violet-500/25 px-4 py-2.5">
                <motion.div>
                  <p className="text-[0.72rem] font-bold text-white">Brand Expansion Dashboard</p>
                  <p className="text-[0.6rem] text-white">Operational intelligence · Live data</p>
                </motion.div>
                <motion.div className="lyb-live-pill flex items-center justify-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[0.58rem] font-bold uppercase tracking-wider text-emerald-400">Live</span>
                </motion.div>
              </motion.div>

              <motion.div className="flex flex-1 flex-col space-y-3 p-3">
                <motion.div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Active Brands', value: `${totalBrands}+`, color: 'text-violet-400' },
                    { label: 'Cities', value: `${cityCount}+`, color: 'text-indigo-400' },
                    { label: 'Avg ROI', value: `${avgROI}%`, color: 'text-emerald-400' },
                  ].map((k, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="lyb-dash-panel lyb-kpi-tile flex flex-col items-center justify-center rounded-xl border border-violet-500/25 py-3"
                    >
                      <p className={`text-lg font-extrabold ${k.color}`}>
                        <LiveCounter display={k.value} />
                      </p>
                      <p className="mt-0.5 text-center text-[0.58rem] text-white">{k.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className="grid grid-cols-2 gap-2">
                  <motion.div className="lyb-dash-panel rounded-xl border border-violet-500/25 p-2.5">
                    <p className="lyb-dash-panel-title mb-2 text-center text-[0.6rem] font-bold uppercase tracking-wider">Market Tracker</p>
                    <motion.div className="space-y-1.5">
                      {markets.slice(0, 4).map((m, i) => (
                        <motion.div key={i} className="space-y-0.5">
                          <motion.div className="flex items-center justify-between">
                            <span className="max-w-[80px] truncate text-[0.62rem] text-white">{m.industry}</span>
                            <span className="text-[0.58rem] text-white">{m.count}</span>
                          </motion.div>
                          <MiniBar value={m.count} max={maxCount} color={i % 2 === 0 ? 'violet' : 'emerald'} delay={i * 0.08} live />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div className="lyb-dash-panel rounded-xl border border-violet-500/25 p-2.5">
                    <p className="lyb-dash-panel-title mb-2 text-center text-[0.6rem] font-bold uppercase tracking-wider">Onboarding Pipeline</p>
                    <motion.div className="space-y-1.5">
                      {ONBOARDING.map((o, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left"
                        >
                          <span className="max-w-[90px] truncate text-[0.62rem] text-violet-100/80">{o.label}</span>
                          <div className="lyb-status-pill flex items-center justify-center gap-1.5">
                            <LiveStatusDot status={o.status} />
                            <span className={`text-[0.58rem] font-bold ${STATUS_TEXT[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div className="grid grid-cols-2 gap-2">
                  <motion.div className="lyb-dash-panel lyb-top-cities-panel rounded-xl border border-violet-500/25 p-2.5">
                    <p className="lyb-dash-panel-title mb-2 text-center text-[0.6rem] font-bold uppercase tracking-wider">Top Cities</p>
                    <motion.div className="space-y-1">
                      {topCities.map((c, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -4 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="lyb-top-cities-row flex items-center justify-between rounded-md px-2 py-1"
                        >
                          <span className="lyb-top-cities-city truncate text-[0.65rem] font-medium">{c.city}</span>
                          <motion.span
                            animate={{ opacity: [0.85, 1, 0.85] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            className="lyb-top-cities-count text-[0.6rem] font-bold tabular-nums"
                          >
                            {c.count}
                          </motion.span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div className="lyb-dash-panel flex flex-col gap-2 rounded-xl border border-violet-500/25 p-2.5">
                    <p className="lyb-dash-panel-title text-center text-[0.6rem] font-bold uppercase tracking-wider">Growth Analytics</p>
                    <motion.div className="flex flex-1 flex-col justify-center gap-2">
                      <motion.div className="lyb-dash-metric flex flex-col items-center justify-center rounded-lg p-2 text-center">
                        <LiveCounter display={`${growth.growthRate}%`} className="text-base font-extrabold text-emerald-400" />
                        <span className="lyb-dash-metric-label text-[0.58rem]">Growth Rate</span>
                      </motion.div>
                      <motion.div className="lyb-dash-metric flex flex-col items-center justify-center rounded-lg p-2 text-center">
                        <LiveCounter display={String(growth.recentCount)} className="text-base font-extrabold text-violet-400" />
                        <span className="lyb-dash-metric-label text-[0.58rem]">New This Quarter</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ServicesStyleIndustriesSection.jsx */
const navigateTo = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

function ServicesStyleIndustriesSection() {
  return (
    <section className="lyb-industries-section relative z-10 overflow-hidden py-10 lg:py-14">
      <motion.div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div className="lyb-dark-heading mb-10 text-center">
          <SectionPill className="mb-4">Industries</SectionPill>
          <h2 className="lyb-section-heading-on-dark mb-3 text-3xl font-extrabold text-white sm:text-4xl">
            Industries We Help Scale Through Franchising
          </h2>
          <p className="lyb-section-subtext mx-auto max-w-xl text-sm leading-relaxed sm:text-base">
            Franchise services built for brands across sectors ready to expand through scalable models.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_OWNERS_INDUSTRIES.map((ind) => (
            <IndustryCard
              key={ind.label}
              className="lyb-industry-card"
              label={ind.label}
              desc={ind.desc}
              img={ind.img}
              accent={ind.accent}
              mediaHeight="h-56"
              onExplore={() => navigateTo('/franchise-opportunities')}
            />
          ))}
        </motion.div>

        <motion.div className="mt-14 text-center">
          <p className="lyb-section-subtext mb-5 text-sm">
            Don&apos;t see your industry? We work with businesses across all sectors.
          </p>
          <CtaButton type="button" size="lg" onClick={() => navigateTo('/contact')}>
            Discuss Your Industry
          </CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* CaseStudiesSection.jsx */
const CASES = [
  {
    id: 1,
    brand: 'BurgerBlast',
    category: 'Food & Beverage',
    tagline: 'From 2 outlets to 18 cities in 14 months.',
    image: 'https://images.unsplash.com/photo-1568901346376-56c5276b45b0?auto=format&fit=crop&w=600&q=80',
    color: 'violet',
    before: {
      cities: 2, investors: 0, revenue: '₹40L/mo', units: 2,
      problems: ['No franchise model', 'Zero investor pipeline', 'Manual operations'],
    },
    after: {
      cities: 18, investors: 24, revenue: '₹4.2Cr/mo', units: 26,
      wins: ['Structured FOFO model', '24 verified investors onboarded', 'Centralized ops dashboard'],
    },
    timeline: '14 months',
    roiGrowth: '+940%',
    cityData: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Jaipur'],
    revenuePoints: [40, 65, 110, 180, 260, 340, 390, 420],
  },
  {
    id: 2,
    brand: 'FitLife Gym',
    category: 'Health & Wellness',
    tagline: 'Scaled from metro-only to 12 cities with FICO model.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    color: 'violet',
    before: {
      cities: 3, investors: 0, revenue: '₹80L/mo', units: 3,
      problems: ['No investor framework', 'Inconsistent unit quality', 'No expansion roadmap'],
    },
    after: {
      cities: 12, investors: 18, revenue: '₹3.1Cr/mo', units: 19,
      wins: ['FICO model with passive investor returns', '18 investors across 12 cities', 'Standardized quality audits'],
    },
    timeline: '11 months',
    roiGrowth: '+287%',
    cityData: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai'],
    revenuePoints: [80, 120, 160, 200, 240, 280, 300, 310],
  },
  {
    id: 3,
    brand: 'EcoClean Solutions',
    category: 'Home Services',
    tagline: 'Tier 2 & 3 city domination with asset-light FOCO.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    color: 'violet',
    before: {
      cities: 1, investors: 0, revenue: '₹12L/mo', units: 1,
      problems: ['Single city operation', 'No brand documentation', 'No investor awareness'],
    },
    after: {
      cities: 9, investors: 14, revenue: '₹1.4Cr/mo', units: 16,
      wins: ['FOCO model for Tier 2 markets', '14 city-level investors', 'Full SOP & training system'],
    },
    timeline: '10 months',
    roiGrowth: '+1066%',
    cityData: ['Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Chandigarh'],
    revenuePoints: [12, 28, 50, 75, 100, 120, 135, 140],
  },
];

const COLOR = {
  violet: { accent: 'text-violet-700', bg: 'bg-violet-100', border: 'border-violet-300', dot: 'bg-violet-500', tab: 'bg-violet-500' },
};
const CHART_GREEN = '#22c55e';

// Mini sparkline chart
function Sparkline({ points }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const h = 48;
  const w = 200;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = h - ((p - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  });
  const polyline = coords.join(' ');
  const area = `0,${h} ${polyline} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CHART_GREEN} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={CHART_GREEN} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark-green)"/>
      <motion.polyline
        points={polyline}
        fill="none"
        stroke={CHART_GREEN}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <circle
        cx={w}
        cy={h - ((points[points.length - 1] - min) / (max - min || 1)) * h}
        r="3.5"
        fill={CHART_GREEN}
      />
    </svg>
  );
}

// City expansion dots
function CityDots({ cities, color }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {cities.map((city, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="lyb-proven-city-pill flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5"
        >
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${COLOR[color].dot}`}
          />
          <span className="text-[0.62rem] font-medium text-slate-800">{city}</span>
        </motion.div>
      ))}
    </div>
  );
}

function CaseCard({ cs, isActive, onClick }) {
  const c = COLOR[cs.color];
  return (
    <button
      onClick={onClick}
      className={`lyb-proven-card w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        isActive
          ? `lyb-proven-card-active ${c.border} ${c.bg}`
          : 'border-slate-200 bg-white hover:border-violet-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={cs.image}
          alt={cs.brand}
          className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=80&q=80'; }}
        />
        <div className="flex-1 min-w-0">
          <p className="lyb-proven-card-title text-sm font-bold truncate">{cs.brand}</p>
          <p className="lyb-proven-card-meta text-[0.65rem]">{cs.category}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={`lyb-proven-card-stat text-sm font-extrabold ${isActive ? 'text-violet-700' : 'text-violet-600'}`}>{cs.roiGrowth}</p>
          <p className="lyb-proven-card-meta text-[0.6rem]">{cs.timeline}</p>
        </div>
      </div>
    </button>
  );
}

function CaseStudiesSection() {
  const [active, setActive] = useState(0);
  const cs = CASES[active];
  const c = COLOR[cs.color];

  return (
    <section className="lyb-proven-section relative overflow-hidden bg-transparent py-10 lg:py-14">


      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-8"
        >
          <span className="lyb-section-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[0.68rem] font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Proven Results
          </span>
          <h2 className="lyb-page-h2 lyb-section-heading-on-dark text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.1] mb-4">
            Franchise Transformations That{' '}
            <span className="lyb-gradient-heading bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Speak for Themselves
            </span>
          </h2>
          <p className="lyb-section-subtext text-base max-w-2xl mx-auto leading-relaxed">
            Real brands. Real numbers. Real expansion — powered by iFranchise systems.
          </p>
        </motion.div>

        {/* two-column layout */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* LEFT — case selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <p className="lyb-proven-sidebar-label mb-4 text-[0.65rem] font-bold uppercase tracking-widest">Select a Case Study</p>
            {CASES.map((c, i) => (
              <CaseCard key={c.id} cs={c} isActive={active === i} onClick={() => setActive(i)} />
            ))}

            {/* disclaimer */}
            <p className="lyb-proven-sidebar-note pt-2 text-[0.62rem] leading-relaxed">
              * Results are representative of brands that completed the full iFranchise expansion program.
            </p>
          </motion.div>

          {/* RIGHT — case detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {/* case header */}
              <div className="lyb-proven-detail flex items-center gap-4 rounded-2xl border border-slate-200 p-5 shadow-sm">
                <img
                  src={cs.image}
                  alt={cs.brand}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=80&q=80'; }}
                />
                <div className="flex-1">
                  <p className={`text-[0.65rem] font-bold uppercase tracking-wider ${c.accent} mb-0.5`}>{cs.category}</p>
                  <h3 className="lyb-proven-detail-title text-xl font-extrabold">{cs.brand}</h3>
                  <p className="lyb-proven-detail-body text-[0.78rem]">{cs.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-2xl font-extrabold ${c.accent}`}>{cs.roiGrowth}</p>
                  <p className="lyb-proven-detail-body text-[0.65rem]">Revenue Growth</p>
                  <p className="lyb-proven-detail-body text-[0.65rem]">in {cs.timeline}</p>
                </div>
              </div>

              {/* before vs after */}
              <div className="grid grid-cols-2 gap-3">
                {/* before */}
                <div className="lyb-proven-before-panel rounded-2xl border border-violet-200 bg-violet-50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-violet-600/60 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                    <p className="lyb-proven-panel-label text-[0.68rem] font-bold uppercase tracking-wider">Before iFranchise</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { label: 'Cities',    value: cs.before.cities    },
                      { label: 'Investors', value: cs.before.investors },
                      { label: 'Revenue',   value: cs.before.revenue   },
                      { label: 'Units',     value: cs.before.units     },
                    ].map((m, i) => (
                      <div key={i} className="lyb-proven-metric-tile flex flex-col rounded-lg border border-slate-200 bg-white p-2">
                        <span className="lyb-proven-metric-value text-sm font-extrabold">{m.value}</span>
                        <span className="lyb-proven-metric-label text-[0.6rem]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {cs.before.problems.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                        <span className="lyb-proven-list-item text-[0.68rem]">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* after */}
                <div className={`lyb-proven-after-panel rounded-2xl border p-4 ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-5 h-5 rounded-full ${c.dot} flex items-center justify-center`}>
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <p className="lyb-proven-panel-label text-[0.68rem] font-bold uppercase tracking-wider text-violet-700">After iFranchise</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { label: 'Cities',    value: cs.after.cities    },
                      { label: 'Investors', value: cs.after.investors },
                      { label: 'Revenue',   value: cs.after.revenue   },
                      { label: 'Units',     value: cs.after.units     },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.07 }}
                        className="lyb-proven-metric-tile flex flex-col rounded-lg border border-violet-200 bg-white p-2"
                      >
                        <span className="lyb-proven-metric-value text-sm font-extrabold text-violet-800">{m.value}</span>
                        <span className="lyb-proven-metric-label text-[0.6rem]">{m.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {cs.after.wins.map((w, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className={`w-1 h-1 rounded-full ${c.dot} shrink-0`} />
                        <span className="lyb-proven-list-item text-[0.68rem]">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* revenue chart + city expansion */}
              <div className="grid grid-cols-2 gap-3">

                {/* revenue growth chart */}
                <div className="lyb-proven-chart-panel rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="lyb-proven-chart-label text-[0.65rem] font-bold uppercase tracking-wider">Revenue Growth</p>
                    <span className={`text-[0.65rem] font-bold ${c.accent}`}>{cs.before.revenue} → {cs.after.revenue}</span>
                  </div>
                  <Sparkline points={cs.revenuePoints} />
                  <div className="flex items-center justify-between mt-2">
                    <span className="lyb-proven-chart-meta text-[0.6rem]">Month 1</span>
                    <span className="lyb-proven-chart-meta text-[0.6rem]">Month {cs.revenuePoints.length}</span>
                  </div>
                </div>

                {/* city expansion */}
                <div className="lyb-proven-chart-panel rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="lyb-proven-chart-label text-[0.65rem] font-bold uppercase tracking-wider">City Expansion</p>
                    <span className={`text-[0.65rem] font-bold ${c.accent}`}>{cs.before.cities} → {cs.after.cities} cities</span>
                  </div>
                  <CityDots cities={cs.cityData} color={cs.color} />
                  <div className="lyb-proven-chart-footer mt-3 flex items-center gap-2 border-t border-slate-200 pt-2">
                    <svg className="h-3 w-3 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    <span className="lyb-proven-chart-meta text-[0.62rem]">{cs.after.investors} investors across {cs.after.cities} cities</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="lyb-proven-footer-cta mb-5 text-sm">Ready to write your own success story?</p>
          <CtaButton
            onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Start Your Franchise Journey
          </CtaButton>
        </motion.div>

      </div>
    </section>
  );
}

/* ListYourBrandFAQSection.jsx */
const FAQ_ITEMS = [
  {
    question: 'What types of brands can list on iFranchise?',
    answer: 'Brands with a proven model and at least one operational unit — across F&B, wellness, education, retail, tech, and more.',
  },
  {
    question: 'How long does it take to become franchise-ready?',
    answer: 'Most brands are franchise-ready within 30 days including model design, legal docs, SOPs, and investor materials.',
  },
  {
    question: 'How does investor matching work?',
    answer: 'We match your opportunity to 1,800+ pre-screened investors filtered by sector, ticket size, geography, and intent.',
  },
  {
    question: 'What franchise models do you support?',
    answer: 'FOFO, FOCO, and FICO — we help you choose based on operations complexity and investor profile.',
  },
  {
    question: 'Is there support after launch?',
    answer: 'Yes — 90-day post-launch support plus ongoing advisory for multi-city expansion.',
  },
];

function ListYourBrandFAQSection() {
  return (
    <section className="lyb-faq-section w-full py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="lyb-page-h2 lyb-section-heading-on-dark mb-3 text-3xl font-bold lg:text-4xl">Frequently Asked Questions</h2>
          <p className="lyb-page-subtext lyb-section-subtext mx-auto max-w-2xl text-lg">
            Quick answers for brand founders exploring franchise expansion.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="card-premium-dark relative flex h-full flex-col justify-between rounded-2xl border border-violet-500/20 p-8 lg:p-9">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent opacity-70" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white mb-2">Get started</p>
                <h3 className="text-xl font-extrabold text-white mb-2">Ready to list your brand?</h3>
                <p className="text-sm text-violet-100/80 leading-relaxed mb-6">
                  Submit the hero form or speak with our expansion team for a confidential franchise readiness review.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={scrollToHeroInquiry}
                  className="lyb-faq-cta-primary w-full rounded-xl py-3 text-sm font-bold shadow-lg transition hover:bg-violet-700"
                >
                  Start Brand Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                  className="w-full rounded-xl border border-violet-500/40 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/60"
                >
                  Contact Expansion Team
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {FAQ_ITEMS.map((item, index) => (
              <PremiumFAQItem key={item.question} faq={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ListYourBrandConversionSections.jsx */
function SectionHeader({ badge, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`lyb-dark-heading mb-6 lg:mb-8 ${center ? 'mx-auto max-w-3xl text-center' : ''}`}
    >
      {badge && (
        <div className={center ? 'mb-3 flex justify-center' : 'mb-3'}>
          <span className="lyb-section-badge inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            {badge}
          </span>
        </div>
      )}
      <h2 className="lyb-section-heading-on-dark text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight text-white leading-[1.12]">{title}</h2>
      {subtitle && <p className="lyb-section-subtext mt-2 text-sm sm:text-base leading-relaxed text-violet-100/80">{subtitle}</p>}
    </motion.div>
  );
}

const PROCESS_STEPS = [
  { step: '01', title: 'Brand Audit', desc: 'Readiness, unit economics, documentation.' },
  { step: '02', title: 'Model Design', desc: 'FOFO / FOCO legal framework & territory.' },
  { step: '03', title: 'Investor Match', desc: 'Capital aligned to ticket & growth plan.' },
  { step: '04', title: 'Launch & Scale', desc: 'Onboarding, marketing, multi-city rollout.' },
];

function ExpansionProcessSection() {
  return (
    <section className={LYB_SECTION}>
      <div className={LYB_CONTAINER}>
        <SectionHeader
          badge="Expansion Process"
          title="From Brand Audit to National Scale"
          subtitle="Structured franchise expansion for investor-grade execution."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-premium-dark-inner rounded-xl p-4"
            >
              <span className="text-[0.65rem] font-bold text-violet-400">{s.step}</span>
              <h3 className="mt-1.5 text-sm font-extrabold text-white">{s.title}</h3>
              <p className="mt-1 text-[0.75rem] text-violet-100/70 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LYB_CONVERSION_BENEFITS = [
  { title: 'Investor-Grade Positioning', desc: 'Data rooms and narratives capital trusts.' },
  { title: 'Territory Intelligence', desc: 'City targeting and phased rollout maps.' },
  { title: 'Operational Playbooks', desc: 'SOPs, training, and unit-level KPIs.' },
  { title: 'Revenue Acceleration', desc: 'Pre-qualified investor pipelines.' },
];

const MATCH_FEATURES = [
  { label: 'Capital verified', value: '1,800+' },
  { label: 'Intent-matched', value: '94%' },
  { label: 'Close cycle', value: '21 days' },
  { label: 'Ticket size', value: 'Rs.25L–5Cr+' },
];

function GrowthInvestorSection() {
  return (
    <section className={`lyb-why-section ${VIEWPORT_SECTION}`}>
      <motion.div className={`${LYB_CONTAINER} w-full`}>
        <SectionHeader
          badge="Why iFranchise"
          title="Growth Infrastructure + Investor Capital"
          subtitle="Convert interest into signed agreements with verified investors — not cold leads."
        />
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LYB_CONVERSION_BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="lyb-feature-card card-premium-dark-inner rounded-xl border border-violet-500/20 p-4"
              >
                <span className="lyb-feature-card-index text-[0.6rem] font-bold text-violet-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lyb-feature-card-title mt-1 text-sm font-extrabold leading-snug text-white">{b.title}</h3>
                <p className="lyb-feature-card-body mt-1 text-[0.72rem] leading-snug text-violet-100/75">{b.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lyb-investor-panel card-premium-dark rounded-2xl border border-violet-500/25 p-5 flex flex-col justify-center"
          >
            <p className="lyb-investor-panel-title text-[0.65rem] font-bold uppercase tracking-widest text-white mb-3">Investor match</p>
            <div className="grid grid-cols-2 gap-3">
              {MATCH_FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="lyb-investor-stat rounded-xl border border-violet-500/30 bg-violet-500/10 p-3.5 text-center"
                >
                  <p className="lyb-investor-stat-value text-xl font-extrabold text-white">{f.value}</p>
                  <p className="lyb-investor-stat-label mt-0.5 text-[0.65rem] font-medium text-white">{f.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="lyb-investor-panel-note mt-3 text-xs text-violet-100/70">
              Filtered by sector, ticket size, geography, and operating appetite.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

const ROADMAP = [
  { phase: 'Phase 1', title: 'Foundation', items: ['Franchise audit', 'Legal & model', 'Unit economics'] },
  { phase: 'Phase 2', title: 'Market Entry', items: ['Investor outreach', 'Territory maps', 'Pilot launches'] },
  { phase: 'Phase 3', title: 'Scale', items: ['Multi-city rollout', 'Training', 'Dashboards'] },
];

const TIMELINE = [
  { week: 'Week 1', title: 'Discovery & audit', desc: 'Feasibility review.' },
  { week: 'Week 2–3', title: 'Model & materials', desc: 'Legal + investor deck.' },
  { week: 'Week 4–6', title: 'Investor activation', desc: 'Qualified intros.' },
  { week: 'Week 8+', title: 'Launch support', desc: 'Rollout & reporting.' },
];

function ColumnShell({ label, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="lyb-scale-column flex h-full min-h-[380px] flex-col rounded-2xl border border-slate-200 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-5"
    >
      <motion.div className="mb-4 flex shrink-0 items-center justify-between border-b border-slate-200 pb-3">
        <p className="lyb-scale-column-label text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-600">{label}</p>
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-violet-400"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.div className="flex flex-1 flex-col gap-2.5">{children}</motion.div>
    </motion.div>
  );
}

function RoadmapTimelineSection() {
  return (
    <section className={`lyb-scale-section ${VIEWPORT_SECTION}`}>
      <motion.div className={`${LYB_CONTAINER} w-full`}>
        <SectionHeader
          badge="Your path to scale"
          title="Roadmap & Timeline at a Glance"
          subtitle="Franchise-ready to investor conversations — typically within 30 days."
        />
        <motion.div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8">
          <ColumnShell label="Scaling roadmap" delay={0}>
            {ROADMAP.map((r, i) => (
              <motion.div
                key={r.phase}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.08, duration: 0.45 }}
                className="lyb-scale-card relative flex flex-1 flex-col justify-center overflow-hidden rounded-xl border border-slate-200 px-4 py-3.5"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-violet-400 to-indigo-500"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                />
                <p className="text-[0.58rem] font-bold uppercase tracking-wider text-violet-400">{r.phase}</p>
                <h3 className="lyb-scale-card-title mt-0.5 text-sm font-extrabold text-slate-900">{r.title}</h3>
                <p className="lyb-scale-card-body mt-1 text-[0.72rem] leading-snug text-slate-600">{r.items.join(' · ')}</p>
              </motion.div>
            ))}
          </ColumnShell>

          <ColumnShell label="Timeline" delay={0.1}>
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.week}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                className="lyb-scale-card relative flex flex-1 items-center gap-3 overflow-hidden rounded-xl border border-slate-200 px-3 py-3"
              >
                <motion.span
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[0.65rem] font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, delay: 0.12 + i * 0.08 }}
                >
                  {i + 1}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-violet-300/50"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.span>
                <motion.div className="min-w-0 flex-1">
                  <p className="lyb-scale-card-body text-[0.58rem] font-bold uppercase tracking-wider text-slate-600">{t.week}</p>
                  <h3 className="lyb-scale-card-title text-sm font-extrabold text-slate-900">{t.title}</h3>
                  <p className="lyb-scale-card-body text-[0.7rem] text-slate-600">{t.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </ColumnShell>
        </motion.div>
      </motion.div>
    </section>
  );
}

