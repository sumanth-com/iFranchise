import { useMemo } from 'react';
import { motion } from 'framer-motion';
import CtaButton from '../ui/CtaButton';
import {
  franchiseOpportunities,
  getTotalCities,
  getAverageROI,
  calculateGrowthMetrics,
  getTopCities,
  getMarketTrends,
} from '../../data/franchiseData';

function MiniBar({ value, max, color = 'violet', delay = 0 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
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
      <span className="text-[0.58rem] font-bold text-slate-900/50 w-6 text-right tabular-nums">{pct}%</span>
    </div>
  );
}

const BENEFITS = [
  { title: 'Franchise-Ready in 30 Days',   desc: 'Complete model, docs & systems built fast.' },
  { title: 'Qualified Investor Pipeline',  desc: 'Only serious, capital-ready investors reach you.' },
  { title: 'Multi-City Expansion Roadmap', desc: 'Data-driven territory strategy for every market.' },
  { title: 'Ongoing Operational Support',  desc: 'We stay with you through every unit launch.' },
];

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

export default function BrandsSection() {
  const markets     = useMemo(() => getMarketTrends(), []);
  const topCities   = useMemo(() => getTopCities(4), []);
  const avgROI      = useMemo(() => getAverageROI(), []);
  const cityCount   = useMemo(() => getTotalCities(), []);
  const totalBrands = useMemo(() => franchiseOpportunities.length, []);
  const growth      = useMemo(() => calculateGrowthMetrics(), []);
  const maxCount    = useMemo(() => Math.max(...markets.map(m => m.count)), [markets]);

  return (
    <section className="relative overflow-hidden bg-transparent py-10 lg:py-14">
      <div className="relative z-10">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* ── LEFT ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[0.65rem] font-bold uppercase tracking-widest text-white mb-4 block w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  For Brand Owners
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.3rem] font-extrabold text-white leading-[1.1] tracking-tight mb-3">
                  Everything Your Brand Needs to{' '}
                  <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Franchise at Scale
                  </span>
                </h2>
                <p className="text-violet-100/85 text-[0.88rem] leading-relaxed max-w-md">
                  From franchise model design to investor acquisition — we handle the full expansion infrastructure so you focus on building your brand.
                </p>
              </div>

              {/* benefit list — compact */}
              <div className="grid grid-cols-2 gap-2">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="card-premium-dark-inner flex items-start gap-2 p-3 rounded-xl"
                  >
                    <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[0.75rem] font-bold text-white leading-snug">{b.title}</p>
                      <p className="text-[0.65rem] text-white mt-0.5">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <CtaButton
                className="self-start"
                size="sm"
                onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
              >
                List Your Brand Today
              </CtaButton>
            </motion.div>

            {/* ── RIGHT — compact live dashboard ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="card-premium-dark rounded-2xl overflow-hidden shadow-xl">

                {/* header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-violet-500/25 bg-violet-950/40">
                  <div>
                    <p className="text-[0.72rem] font-bold text-white">Brand Expansion Dashboard</p>
                    <p className="text-[0.6rem] text-white">Operational intelligence · Live data</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"/>
                    </span>
                    <span className="text-[0.58rem] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
                  </div>
                </div>

                <div className="p-3 space-y-3">

                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Active Brands', value: `${totalBrands}+`, color: 'text-violet-400'  },
                      { label: 'Cities',         value: `${cityCount}+`,  color: 'text-indigo-400'  },
                      { label: 'Avg ROI',        value: `${avgROI}%`,     color: 'text-emerald-400' },
                    ].map((k, i) => (
                      <div key={i} className="flex flex-col items-center py-2 rounded-xl bg-violet-950/50 border border-violet-500/25">
                        <p className={`text-lg font-extrabold ${k.color} tabular-nums`}>{k.value}</p>
                        <p className="text-[0.58rem] text-white mt-0.5">{k.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* market tracker + onboarding side by side */}
                  <div className="grid grid-cols-2 gap-2">

                    {/* market tracker */}
                    <div className="rounded-xl bg-violet-950/50 border border-violet-500/25 p-2.5">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white/80 mb-2">Market Tracker</p>
                      <div className="space-y-1.5">
                        {markets.slice(0, 4).map((m, i) => (
                          <div key={i} className="space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[0.62rem] text-white truncate max-w-[80px]">{m.industry}</span>
                              <span className="text-[0.58rem] text-white">{m.count}</span>
                            </div>
                            <MiniBar value={m.count} max={maxCount} color={i % 2 === 0 ? 'violet' : 'emerald'} delay={i * 0.08} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* onboarding pipeline */}
                    <div className="rounded-xl bg-violet-950/50 border border-violet-500/25 p-2.5">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white/80 mb-2">Onboarding Pipeline</p>
                      <div className="space-y-1.5">
                        {ONBOARDING.map((o, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="flex items-center justify-between"
                          >
                            <span className="text-[0.62rem] text-violet-100/80 truncate max-w-[90px]">{o.label}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLOR[o.status]}`} />
                              <span className={`text-[0.58rem] font-bold ${STATUS_TEXT[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* city growth + analytics */}
                  <div className="grid grid-cols-2 gap-2">

                    {/* top cities */}
                    <div className="rounded-xl bg-violet-950/50 border border-violet-500/25 p-2.5">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white/80 mb-2">Top Cities</p>
                      <div className="space-y-1">
                        {topCities.map((c, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-[0.65rem] text-white truncate">{c.city}</span>
                            <span className="text-[0.6rem] font-bold text-violet-400">{c.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* growth analytics */}
                    <div className="rounded-xl bg-violet-950/50 border border-violet-500/25 p-2.5 flex flex-col gap-2">
                      <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white">Growth Analytics</p>
                      <div className="flex flex-col gap-2 flex-1 justify-center">
                        <div className="flex flex-col p-2 rounded-lg bg-violet-900/30">
                          <span className="text-base font-extrabold text-emerald-400 tabular-nums">{growth.growthRate}%</span>
                          <span className="text-[0.58rem] text-white">Growth Rate</span>
                        </div>
                        <div className="flex flex-col p-2 rounded-lg bg-violet-900/30">
                          <span className="text-base font-extrabold text-violet-400 tabular-nums">{growth.recentCount}</span>
                          <span className="text-[0.58rem] text-white">New This Quarter</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

