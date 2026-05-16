import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CtaButton from '../ui/CtaButton';

const STEPS = [
  {
    number: '01',
    title: 'Understand Your Brand',
    desc: 'Deep-dive discovery session — we map your business model, unit economics, target markets, and growth ambitions.',
    color: 'violet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Build Franchise Foundation',
    desc: 'We architect your franchise model — SOPs, legal docs, brand guidelines, and operational systems.',
    color: 'indigo',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Attract Investors',
    desc: 'Performance campaigns, investor outreach, and lead qualification funnels bring capital-ready partners to your brand.',
    color: 'emerald',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Match & Onboard',
    desc: 'We match the right investor to the right territory, manage agreements, and execute a structured onboarding.',
    color: 'amber',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Scale Across Markets',
    desc: 'With proven units live, we activate the next wave — new territories, new investors, compounding growth.',
    color: 'teal',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
];

const STEP_COLORS = {
  violet: { ring: 'ring-violet-400', bg: 'bg-violet-600', text: 'text-violet-600', light: 'bg-violet-50', border: 'border-violet-200', glow: 'shadow-violet-500/30' },
  indigo: { ring: 'ring-indigo-400', bg: 'bg-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200', glow: 'shadow-indigo-500/30' },
  emerald:{ ring: 'ring-emerald-400', bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', glow: 'shadow-emerald-500/30' },
  amber:  { ring: 'ring-amber-400', bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200', glow: 'shadow-amber-500/30' },
  teal:   { ring: 'ring-teal-400', bg: 'bg-teal-600', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200', glow: 'shadow-teal-500/30' },
};

function StepNode({ step, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const c = STEP_COLORS[step.color];
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="flex flex-col items-center flex-1 min-w-0 relative">

      {/* connector line — between nodes */}
      {!isLast && (
        <div className="absolute top-[22px] left-[calc(50%+22px)] right-[calc(-50%+22px)] h-px z-0 overflow-hidden">
          {/* base line */}
          <div className="absolute inset-0 bg-slate-200" />
          {/* animated fill */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.18 + 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400"
          />
          {/* travelling light dot */}
          {inView && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.8, delay: index * 0.18 + 1, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-1.5 rounded-full bg-white/80 blur-[2px]"
            />
          )}
        </div>
      )}

      {/* node circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.45, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-4"
      >
        {/* outer pulse ring */}
        {inView && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
            className={`absolute inset-0 rounded-full ${c.bg} opacity-30`}
          />
        )}
        {/* main circle */}
        <div className={`relative w-11 h-11 rounded-full ${c.bg} flex items-center justify-center text-white shadow-lg ${c.glow} ring-2 ring-white`}>
          {step.icon}
        </div>
        {/* step number badge */}
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
          <span className={`text-[0.55rem] font-extrabold ${c.text}`}>{step.number}</span>
        </div>
      </motion.div>

      {/* step content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, delay: index * 0.18 + 0.15 }}
        className="text-center px-2"
      >
        <p className="text-[0.82rem] font-bold text-slate-900 mb-1.5 leading-snug">{step.title}</p>
        <p className="text-[0.72rem] text-white leading-relaxed">{step.desc}</p>
      </motion.div>

    </div>
  );
}

export default function ProcessFlow() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">

      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/60 to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-violet-100/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-[0.68rem] font-bold uppercase tracking-widest text-violet-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4">
            Our Franchise{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Expansion Process
            </span>
          </h2>
          <p className="text-white text-base max-w-xl mx-auto leading-relaxed">
            A structured, repeatable system engineered to take your brand from concept to scaled franchise network.
          </p>
        </motion.div>

        {/* horizontal process flow */}
        <div className="flex items-start gap-0 lg:gap-2">
          {STEPS.map((step, i) => (
            <StepNode key={i} step={step} index={i} total={STEPS.length} />
          ))}
        </div>

        {/* bottom outcome strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '30 Days', label: 'To Franchise-Ready' },
            { value: '90 Days', label: 'First Investor Matched' },
            { value: '6 Months', label: 'First Unit Live' },
            { value: '12 Months', label: 'Multi-City Expansion' },
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center py-4 px-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-lg font-extrabold text-slate-900 mb-0.5">{m.value}</p>
              <p className="text-[0.68rem] text-white font-medium">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <CtaButton
            onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Start Your Expansion Journey
          </CtaButton>
        </motion.div>

      </div>
    </section>
  );
}
