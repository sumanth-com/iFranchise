import { motion } from 'framer-motion';

const LYB_SECTION = 'relative overflow-hidden bg-transparent py-10 lg:py-14';
const LYB_CONTAINER = 'relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10';
const VIEWPORT_SECTION = `${LYB_SECTION} lg:min-h-[min(100vh,900px)] flex items-center`;

function SectionHeader({ badge, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-6 lg:mb-8 ${center ? 'text-center mx-auto max-w-3xl' : ''}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[0.68rem] font-bold uppercase tracking-widest text-white mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight text-white leading-[1.12]">{title}</h2>
      {subtitle && <p className="mt-2 text-violet-100/80 text-sm sm:text-base leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

const PROCESS_STEPS = [
  { step: '01', title: 'Brand Audit', desc: 'Readiness, unit economics, documentation.' },
  { step: '02', title: 'Model Design', desc: 'FOFO / FOCO legal framework & territory.' },
  { step: '03', title: 'Investor Match', desc: 'Capital aligned to ticket & growth plan.' },
  { step: '04', title: 'Launch & Scale', desc: 'Onboarding, marketing, multi-city rollout.' },
];

export function ExpansionProcessSection() {
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

const BENEFITS = [
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

export function GrowthInvestorSection() {
  return (
    <section className={VIEWPORT_SECTION}>
      <motion.div className={`${LYB_CONTAINER} w-full`}>
        <SectionHeader
          badge="Why iFranchise"
          title="Growth Infrastructure + Investor Capital"
          subtitle="Convert interest into signed agreements with verified investors — not cold leads."
        />
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-premium-dark-inner rounded-xl p-4"
              >
                <span className="text-[0.6rem] font-bold text-violet-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 text-sm font-extrabold text-white leading-snug">{b.title}</h3>
                <p className="mt-1 text-[0.72rem] text-violet-100/75 leading-snug">{b.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-premium-dark rounded-2xl p-5 flex flex-col justify-center"
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white mb-3">Investor match</p>
            <div className="grid grid-cols-2 gap-3">
              {MATCH_FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3.5 text-center"
                >
                  <p className="text-xl font-extrabold text-white">{f.value}</p>
                  <p className="mt-0.5 text-[0.65rem] font-medium text-white">{f.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-3 text-xs text-violet-100/70">
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
      className="flex h-full min-h-[380px] flex-col rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-[#0e0620]/80 to-[#0a0618]/90 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-5"
    >
      <motion.div className="mb-4 flex shrink-0 items-center justify-between border-b border-violet-500/20 pb-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">{label}</p>
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

export function RoadmapTimelineSection() {
  return (
    <section className={VIEWPORT_SECTION}>
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
                whileHover={{ x: 4 }}
                className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-xl border border-violet-500/20 bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-violet-400/35"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-violet-400 to-indigo-500"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                />
                <p className="text-[0.58rem] font-bold uppercase tracking-wider text-violet-400">{r.phase}</p>
                <h3 className="mt-0.5 text-sm font-extrabold text-white">{r.title}</h3>
                <p className="mt-1 text-[0.72rem] leading-snug text-violet-100/75">{r.items.join(' · ')}</p>
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
                whileHover={{ x: -4 }}
                className="relative flex flex-1 items-center gap-3 overflow-hidden rounded-xl border border-violet-500/20 bg-white/[0.04] px-3 py-3 transition-colors hover:border-violet-400/35"
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
                  <p className="text-[0.58rem] font-bold uppercase tracking-wider text-white">{t.week}</p>
                  <h3 className="text-sm font-extrabold text-white">{t.title}</h3>
                  <p className="text-[0.7rem] text-violet-100/75">{t.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </ColumnShell>
        </motion.div>
      </motion.div>
    </section>
  );
}
