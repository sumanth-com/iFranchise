import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CtaButton from '../ui/CtaButton';

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
          ? `${c.border} ${c.bg}`
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

export default function CaseStudiesSection() {
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
              <div className="lyb-proven-detail flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
                <div className="lyb-proven-chart-panel rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
                <div className="lyb-proven-chart-panel rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
