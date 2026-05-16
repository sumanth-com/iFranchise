import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  franchiseOpportunities,
  getTopOpportunitiesByROI,
  getAverageROI,
  getTotalMarkets,
  getMarketTrends,
  calculateGrowthMetrics,
} from '../../data/franchiseData';

const FALLBACKS = {
  'Food & Beverage':  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=80&q=80',
  'Health & Wellness':'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=80&q=80',
  'Home Services':    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=80&q=80',
  'Education':        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=80&q=80',
  'Technology':       'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=80&q=80',
  'Retail':           'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=80&q=80',
  'Entertainment':    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=80&q=80',
};

function OppCard({ opp, index }) {
  const [imgSrc, setImgSrc] = useState(opp.image);
  const roi = parseInt(opp.roi, 10);
  const roiColor = roi >= 40 ? 'text-emerald-400' : roi >= 30 ? 'text-amber-400' : 'text-blue-400';
  const badgeColor = opp.badge === 'HIGH ROI' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    : opp.badge === 'TRENDING'  ? 'bg-violet-500/20 text-white border-violet-500/30'
    : opp.badge === 'HOT MARKET'? 'bg-red-500/20 text-red-300 border-red-500/30'
    : 'bg-slate-500/20 text-white border-slate-500/30';

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={() => { window.history.pushState({}, '', `/franchise-details?id=${opp.id}`); window.dispatchEvent(new PopStateEvent('popstate')); }}
      className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 group"
    >
      <img
        src={imgSrc}
        alt={opp.brandName}
        onError={() => setImgSrc(FALLBACKS[opp.category] ?? FALLBACKS['Retail'])}
        className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-[0.78rem] font-bold text-white truncate">{opp.brandName}</p>
          <span className={`shrink-0 px-1.5 py-px rounded-full text-[0.55rem] font-bold border ${badgeColor}`}>{opp.badge}</span>
        </div>
        <p className="text-[0.65rem] text-white">{opp.category} · {opp.model}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-sm font-extrabold ${roiColor}`}>{opp.roi}</p>
        <p className="text-[0.6rem] text-white">ROI</p>
      </div>
      <svg className="w-3.5 h-3.5 text-white group-hover:text-violet-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </motion.button>
  );
}

export default function InvestorsSection() {
  const topOpps    = useMemo(() => getTopOpportunitiesByROI(6), []);
  const avgROI     = useMemo(() => getAverageROI(), []);
  const markets    = useMemo(() => getTotalMarkets(), []);
  const trends     = useMemo(() => getMarketTrends(), []);
  const growth     = useMemo(() => calculateGrowthMetrics(), []);
  const total      = useMemo(() => franchiseOpportunities.length, []);
  const maxTrend   = useMemo(() => Math.max(...trends.map(t => t.count)), [trends]);

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-28">

      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
          <defs>
            <pattern id="inv-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#inv-grid)"/>
        </svg>
        <motion.div
          animate={{ x: [0, -60, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-600/15 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-indigo-600/15 blur-[90px]"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — investor intelligence dashboard ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">

              {/* header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div>
                  <p className="text-[0.75rem] font-bold text-white">Investor Intelligence Hub</p>
                  <p className="text-[0.62rem] text-white">Live opportunity data · Auto-updated</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"/>
                  </span>
                  <span className="text-[0.6rem] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
                </div>
              </div>

              <div className="p-4 space-y-4">

                {/* summary KPIs */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Opportunities', value: `${total}+`,   color: 'text-violet-400'  },
                    { label: 'Avg ROI',        value: `${avgROI}%`, color: 'text-emerald-400' },
                    { label: 'Industries',     value: `${markets}`, color: 'text-indigo-400'  },
                  ].map((k, i) => (
                    <div key={i} className="flex flex-col items-center py-2.5 rounded-xl bg-white/5 border border-white/8">
                      <p className={`text-xl font-extrabold ${k.color}`}>{k.value}</p>
                      <p className="text-[0.6rem] text-white mt-0.5">{k.label}</p>
                    </div>
                  ))}
                </div>

                {/* verified opportunity cards */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white">Top Verified Opportunities</p>
                    <span className="text-[0.6rem] text-white">by ROI</span>
                  </div>
                  <div className="space-y-1.5">
                    {topOpps.map((opp, i) => <OppCard key={opp.id} opp={opp} index={i} />)}
                  </div>
                </div>

                {/* industry breakdown */}
                <div className="rounded-xl bg-white/5 border border-white/8 p-3">
                  <p className="text-[0.62rem] font-bold uppercase tracking-wider text-white mb-2.5">Industry Breakdown</p>
                  <div className="space-y-2">
                    {trends.slice(0, 4).map((t, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[0.65rem] text-white">{t.industry}</span>
                          <span className="text-[0.6rem] text-white">{t.avgROI}% avg ROI</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.round((t.count / maxTrend) * 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* growth insight */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-bold text-emerald-300">{growth.recentCount} new opportunities added this quarter</p>
                    <p className="text-[0.62rem] text-white">Platform growing at {growth.growthRate}% — more choices every month</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — investor content ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[0.68rem] font-bold uppercase tracking-widest text-emerald-300 mb-5 block w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                For Investors
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
                Invest in Proven Brands.{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Build Lasting Wealth.
                </span>
              </h2>
              <p className="text-white text-base leading-relaxed max-w-lg">
                Access India's most curated franchise investment marketplace — every opportunity is verified, every ROI is real, every brand is expansion-ready.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Verified Opportunities Only',    desc: 'Every brand is audited before listing — no noise, no risk.' },
                { title: 'Transparent ROI Data',           desc: 'Real unit economics, not marketing projections.' },
                { title: 'Expert Matching',                desc: 'We match you to brands that fit your budget and market.' },
                { title: 'End-to-End Onboarding',         desc: 'From signing to launch — we manage the full journey.' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors duration-200"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{b.title}</p>
                    <p className="text-[0.75rem] text-white">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => { window.history.pushState({}, '', '/franchise-opportunities'); window.dispatchEvent(new PopStateEvent('popstate')); }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-colors duration-200 shadow-lg shadow-emerald-900/40"
            >
              Browse All Opportunities
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
              </svg>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
