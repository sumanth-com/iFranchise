import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { TYPE } from '../lib/typography.js';
import { FiArrowRight, FiCheckCircle, FiEdit3, FiSearch, FiZap } from 'react-icons/fi';

const STEPS = [
  {
    number: '01',
    title: 'Apply',
    desc: 'Share your profile, investment range, and preferred city. Takes under 5 minutes.',
    icon: FiEdit3,
    time: '~5 min',
  },
  {
    number: '02',
    title: 'Evaluation',
    desc: 'Our team reviews fit, territory potential, and readiness with a quick discovery call.',
    icon: FiSearch,
    time: '7-14 days',
  },
  {
    number: '03',
    title: 'Approval',
    desc: 'Finalize terms, sign the franchise agreement, and secure your territory.',
    icon: FiCheckCircle,
    time: '2-4 weeks',
  },
  {
    number: '04',
    title: 'Launch',
    desc: 'Complete training, set up your unit, and open with full launch support.',
    icon: FiZap,
    time: 'Go live',
  },
];

const EASE = [0.22, 1, 0.36, 1];

function StepCard({ step, index, total, reduceMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = step.icon;
  const isLast = index === total - 1;
  const delay = reduceMotion ? 0 : index * 0.1;

  return (
    <div ref={ref} className="fd-gs-step relative flex min-w-0 flex-1 flex-col">
      {!isLast && (
        <div className="fd-gs-connector absolute top-8 left-[calc(50%+32px)] right-[calc(-50%+32px)] hidden h-px overflow-hidden lg:block">
          <div className="absolute inset-0 bg-slate-200" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.65, delay: delay + 0.3, ease: EASE }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-0 bg-violet-400/80"
          />
        </div>
      )}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay, ease: EASE }}
        className="fd-gs-card group relative flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] sm:p-6"
      >
        {!isLast && <div className="absolute -bottom-3 left-8 top-full h-6 w-px bg-slate-200 lg:hidden" aria-hidden />}

        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-violet-100 bg-violet-50/80 text-violet-700">
            <Icon className="h-5 w-5" aria-hidden />
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[0.6rem] font-bold text-black shadow-sm">
              {index + 1}
            </span>
          </div>
          <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-black">
            {step.time}
          </span>
        </div>

        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-black/45">Step {step.number}</p>
        <h4 className="mt-1 text-lg font-bold tracking-tight text-black sm:text-xl">{step.title}</h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-black">{step.desc}</p>
      </motion.div>
    </div>
  );
}

export default function FranchiseGetStartedSection({ onStartApply }) {
  const sectionRef = useRef(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  const handleCta = () => {
    if (onStartApply) {
      onStartApply();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="fd-get-started relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10"
      aria-labelledby="fd-get-started-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white" aria-hidden />

      <div className="relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
          className="mb-8 text-center lg:mb-10"
        >
          <h3 id="fd-get-started-heading" className={`${TYPE.subsection} text-black`}>
            How to Get Started
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-black sm:text-base">
            Four clear steps from first click to launch. No guesswork between milestones.
          </p>
        </motion.div>

        <div className="fd-gs-timeline flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} total={STEPS.length} reduceMotion={reduceMotion} />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-3 border-t border-slate-100 pt-8 sm:flex-row sm:justify-center sm:gap-6"
        >
          <button
            type="button"
            onClick={handleCta}
            className="btn-purple-solid inline-flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Start your application
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="text-center text-xs text-black sm:text-left">
            <span className="font-semibold">Typical timeline:</span> 8-12 weeks from apply to launch
          </p>
        </motion.div>
      </div>
    </section>
  );
}
