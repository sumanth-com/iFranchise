import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TAGS = ['Investors', 'Territory', 'SOPs', 'Scale'];

const CAPABILITIES = [
  'Investor-ready matchmaking',
  'Franchise model & legal stack',
  'Territory & rollout intelligence',
  'Multi-city expansion playbooks',
];

const STEPS = ['Audit', 'Model', 'Match', 'Scale'];

export default function LybExpansionVisualPanel({ className = '' }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeCap, setActiveCap] = useState(0);

  useEffect(() => {
    const stepId = setInterval(() => setActiveStep((s) => (s + 1) % STEPS.length), 2400);
    const capId = setInterval(() => setActiveCap((c) => (c + 1) % CAPABILITIES.length), 3800);
    return () => {
      clearInterval(stepId);
      clearInterval(capId);
    };
  }, []);

  return (
    <motion.div
      className={`lyb-exp-visual-panel relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-2xl border lg:min-h-[440px] ${className}`.trim()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="lyb-exp-visual-mesh pointer-events-none absolute inset-0" aria-hidden>
        <span className="lyb-exp-visual-mesh-blob lyb-exp-visual-mesh-blob--a" />
        <span className="lyb-exp-visual-mesh-blob lyb-exp-visual-mesh-blob--b" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-5 py-6 sm:px-6">
        <p className="lyb-exp-visual-kicker mb-4 text-center text-[0.62rem] font-bold uppercase tracking-[0.14em]">
          Franchise operating system
        </p>

        <div className="lyb-exp-visual-diagram relative mx-auto mb-5 aspect-[5/3] w-full max-w-[300px]">
          <svg className="h-full w-full" viewBox="0 0 300 180" fill="none" aria-hidden>
            <defs>
              <linearGradient id="lybExpBridge" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="var(--lyb-exp-chaos)" />
                <stop offset="50%" stopColor="var(--lyb-exp-mid)" />
                <stop offset="100%" stopColor="var(--lyb-exp-growth)" />
              </linearGradient>
            </defs>
            {[28, 52, 76].map((y, i) => (
              <motion.circle
                key={`chaos-${y}`}
                cx={42 + (i % 2) * 14}
                cy={y}
                r="5"
                className="lyb-exp-visual-chaos-dot"
                animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
              />
            ))}
            <motion.path
              d="M 72 90 C 110 70, 130 70, 150 90 C 170 110, 190 110, 228 90"
              stroke="url(#lybExpBridge)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 8"
              animate={{ strokeDashoffset: [0, -28] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              cx="150"
              cy="90"
              r="22"
              className="lyb-exp-visual-hub-ring"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="150" cy="90" r="16" className="lyb-exp-visual-hub-fill" />
            <path
              d="M150 82v16M142 90h16"
              className="lyb-exp-visual-hub-icon"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {[62, 90, 118].map((y, i) => (
              <motion.rect
                key={`growth-${y}`}
                x={228}
                y={y - 8}
                width="16"
                height="16"
                rx="4"
                className="lyb-exp-visual-growth-node"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 + i * 0.25 }}
              />
            ))}
          </svg>
          <span className="lyb-exp-visual-diagram-label lyb-exp-visual-diagram-label--left">Chaos</span>
          <span className="lyb-exp-visual-diagram-label lyb-exp-visual-diagram-label--center">iFranchise</span>
          <span className="lyb-exp-visual-diagram-label lyb-exp-visual-diagram-label--right">Scale</span>
        </div>

        <h3 className="lyb-exp-visual-title text-center text-base font-bold tracking-tight sm:text-lg">
          Select a failure point on the left
        </h3>
        <p className="lyb-exp-visual-sub mt-1.5 text-center text-xs leading-relaxed sm:text-sm">
          See how we turn fragmented expansion into investor-ready growth.
        </p>

        <div className="mt-3 h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCap}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="lyb-exp-visual-cap text-center text-xs font-semibold"
            >
              {CAPABILITIES[activeCap]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {TAGS.map((label) => (
            <span key={label} className="lyb-exp-visual-tag rounded-full px-2.5 py-1 text-[0.6rem] font-medium">
              {label}
            </span>
          ))}
        </div>

        <div className="lyb-exp-visual-pipeline mt-5 w-full max-w-[260px] self-center">
          <div className="relative flex items-start justify-between">
            <div className="lyb-exp-visual-pipeline-track absolute left-3 right-3 top-3 h-0.5 rounded-full" aria-hidden />
            <motion.div
              className="lyb-exp-visual-pipeline-fill absolute left-3 top-3 h-0.5 origin-left rounded-full"
              initial={false}
              animate={{ scaleX: activeStep / (STEPS.length - 1) }}
              style={{ width: 'calc(100% - 1.5rem)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            {STEPS.map((step, i) => (
              <motion.div
                key={step}
                className="relative z-[1] flex flex-col items-center gap-1"
                animate={{ opacity: i <= activeStep ? 1 : 0.45 }}
              >
                <motion.div
                  className={`lyb-exp-visual-step-dot flex h-6 w-6 items-center justify-center rounded-full text-[0.55rem] font-bold ${
                    i === activeStep ? 'lyb-exp-visual-step-dot--active' : i < activeStep ? 'lyb-exp-visual-step-dot--done' : ''
                  }`}
                  animate={i === activeStep ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  {i + 1}
                </motion.div>
                <span className="lyb-exp-visual-step-label text-[0.58rem] font-medium">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="lyb-exp-visual-footer relative z-10 flex items-center justify-center gap-2 border-t px-4 py-3">
        <span className="lyb-exp-visual-footer-arrow text-sm font-light" aria-hidden>
          ‹ ‹ ‹
        </span>
        <span className="lyb-exp-visual-footer-text text-xs font-medium">Pick a failure point to explore</span>
      </div>
    </motion.div>
  );
}
