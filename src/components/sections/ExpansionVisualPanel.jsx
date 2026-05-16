import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ExpansionVisualPanel() {
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
