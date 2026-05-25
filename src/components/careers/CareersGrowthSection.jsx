import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sectionTitleClass } from '../../lib/cardThemeStyles';
import { SOCIAL_LINKS } from '../../constants/socialLinks';

const LINKEDIN_PROFILE = SOCIAL_LINKS.find((s) => s.id === 'linkedin');

const GROWTH_PILLARS = [
  {
    label: 'Brand partners',
    value: '50+',
    desc: 'Verified franchise opportunities across food, retail, wellness, and services.',
  },
  {
    label: 'Categories',
    value: '12+',
    desc: 'Structured sectors where we connect brands with serious investors.',
  },
  {
    label: 'Platform depth',
    value: '3×',
    desc: 'Product, data, and operations infrastructure for the next growth phase.',
  },
  {
    label: 'Talent wave',
    value: 'Soon',
    desc: 'Curated roles across strategy, product, growth, and operations as we scale.',
  },
];

const ROADMAP = [
  { phase: '01', title: 'Foundation', status: 'complete' },
  { phase: '02', title: 'Ecosystem scale', status: 'active' },
  { phase: '03', title: 'Platform & partnerships', status: 'upcoming' },
  { phase: '04', title: 'Team expansion', status: 'upcoming' },
];

function SectionLabel({ text, isDark }) {
  return (
    <span
      className={`careers-section-label inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-4 ${
        isDark ? 'text-violet-200' : 'text-slate-600'
      }`}
    >
      <span className="careers-section-label-dot w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
      {text}
    </span>
  );
}

function GrowthOrb({ isDark, reducedMotion }) {
  return (
    <div className="careers-growth-visual relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[320px]">
      <div
        className={`absolute inset-0 rounded-full blur-3xl ${
          isDark ? 'bg-violet-600/30' : 'bg-violet-400/25'
        }`}
        aria-hidden
      />
      {!reducedMotion && (
        <>
          <motion.div
            className={`absolute inset-[8%] rounded-full border ${
              isDark ? 'border-violet-400/35' : 'border-violet-300/50'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
          <motion.div
            className={`absolute inset-[18%] rounded-full border border-dashed ${
              isDark ? 'border-indigo-400/25' : 'border-indigo-300/40'
            }`}
            animate={{ rotate: -360 }}
            transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
        </>
      )}
      <div
        className={`relative z-[1] flex h-[72%] w-[72%] flex-col items-center justify-center rounded-full border px-4 text-center shadow-[0_20px_60px_rgba(109,40,217,0.2)] ${
          isDark
            ? 'border-violet-400/40 bg-gradient-to-br from-[#1a0f3d] via-[#140a2e] to-[#0f0618]'
            : 'border-violet-200 bg-gradient-to-br from-white via-violet-50/90 to-indigo-50/80'
        }`}
      >
        <svg
          className={`mb-2 h-9 w-9 ${isDark ? 'text-violet-300' : 'text-violet-600'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-violet-200' : 'text-violet-700'}`}>
          Growing
        </p>
        <p className={`mt-0.5 text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Ecosystem
        </p>
      </div>
      {!reducedMotion &&
        [0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className={`absolute h-2 w-2 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-500'}`}
            style={{
              top: `${50 + 38 * Math.sin((i * Math.PI) / 2)}%`,
              left: `${50 + 38 * Math.cos((i * Math.PI) / 2)}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
            aria-hidden
          />
        ))}
    </div>
  );
}

function LinkedInIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PillarCard({ pillar, index, isDark, inView }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + index * 0.07 }}
      className={`careers-growth-pillar rounded-2xl border p-5 text-center sm:text-left ${
        isDark
          ? 'border-violet-500/25 bg-[rgba(18,8,42,0.65)] shadow-[0_12px_40px_rgba(0,0,0,0.25)]'
          : 'border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]'
      }`}
    >
      <p className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {pillar.value}
      </p>
      <p className={`mt-1 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
        {pillar.label}
      </p>
      <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-white/75' : 'text-slate-600'}`}>{pillar.desc}</p>
    </motion.article>
  );
}

export default function CareersGrowthSection({ isDark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const headingClass = isDark ? 'text-white' : 'text-slate-900';
  const bodyClass = isDark ? 'text-white/80' : 'text-slate-600';

  return (
    <section className="careers-open-roles careers-growth-section careers-section border-y border-slate-200">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="flex justify-center">
            <SectionLabel text="Future Talent" isDark={isDark} />
          </div>
          <h2 className={`${sectionTitleClass(!isDark)} mb-3`}>
            We&apos;re building something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              bigger.
            </span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${bodyClass}`}>
            iFranchise is strengthening its franchise platform with deeper brand partnerships, sharper investor
            tools, and a stronger team behind the scenes. Meaningful career opportunities are coming soon.
          </p>
        </motion.div>

        <div
          className={`careers-growth-panel relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10 ${
            isDark
              ? 'border-violet-500/25 bg-gradient-to-br from-[#1a0f3d]/90 via-[#140a2e]/80 to-[#0f0618]/90'
              : 'border-slate-200 bg-gradient-to-br from-white via-violet-50/40 to-indigo-50/30 shadow-[0_20px_60px_rgba(109,40,217,0.08)]'
          }`}
        >
          <div
            className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl ${
              isDark ? 'bg-violet-600/20' : 'bg-violet-400/20'
            }`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full blur-3xl ${
              isDark ? 'bg-indigo-600/15' : 'bg-indigo-400/15'
            }`}
            aria-hidden
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
            <div className="order-2 lg:order-1">
              <p className={`text-xs font-bold uppercase tracking-[0.14em] ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
                Growth roadmap
              </p>
              <ul className="careers-growth-timeline mt-5 space-y-4">
                {ROADMAP.map((item, i) => (
                  <motion.li
                    key={item.phase}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        item.status === 'complete'
                          ? isDark
                            ? 'bg-violet-600/40 text-violet-100 ring-2 ring-violet-400/50'
                            : 'bg-violet-600 text-white'
                          : item.status === 'active'
                            ? isDark
                              ? 'bg-violet-500/30 text-white ring-2 ring-violet-400/60 animate-pulse'
                              : 'bg-violet-100 text-violet-800 ring-2 ring-violet-400/40'
                            : isDark
                              ? 'bg-white/5 text-white/50 ring-1 ring-violet-500/20'
                              : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                      }`}
                    >
                      {item.phase}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-bold ${headingClass}`}>{item.title}</p>
                      {item.status === 'active' && (
                        <p className={`mt-0.5 text-xs ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>
                          In progress: scaling the franchise ecosystem
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>

              <p className={`mt-6 text-sm leading-relaxed ${bodyClass}`}>
                We&apos;re assembling the teams, systems, and partnerships that will power the next era of
                franchise growth. Stay connected as roles open across strategy, product, growth, and operations.
              </p>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <GrowthOrb isDark={isDark} reducedMotion={reducedMotion} />
            </div>
          </div>

          <div className="relative mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {GROWTH_PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.label} pillar={pillar} index={i} isDark={isDark} inView={inView} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className={`careers-growth-cta mt-10 flex flex-col items-center gap-4 rounded-2xl border px-5 py-6 text-center sm:flex-row sm:justify-between sm:text-left ${
              isDark
                ? 'border-violet-500/30 bg-violet-500/10'
                : 'border-violet-200 bg-violet-50/80'
            }`}
          >
            <div>
              <p className={`text-sm font-bold ${headingClass}`}>Follow our growth journey</p>
              <p className={`mt-1 text-xs sm:text-sm ${bodyClass}`}>
                Follow us on LinkedIn for company updates and future role announcements.
              </p>
            </div>
            <a
              href={LINKEDIN_PROFILE?.href || '#'}
              target="_blank"
              rel="noreferrer"
              className="careers-growth-linkedin-btn inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#004182] hover:-translate-y-0.5 sm:w-auto"
            >
              <LinkedInIcon />
              Follow on LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
