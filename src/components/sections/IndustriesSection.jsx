import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { franchiseOpportunities } from '../../data/franchiseData';
import CtaButton from '../ui/CtaButton';

const INDUSTRIES = [
  {
    id: 1,
    name: 'Retail & Jewelry',
    key: 'Retail',
    tagline: 'High-footfall, high-margin franchise models.',
    insight: 'Retail franchises benefit from India\'s booming consumer market. Jewelry and lifestyle retail see 25–40% margins with strong repeat customer bases.',
    stats: { brands: 0, avgROI: '33%', growth: '+18%' },
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Food & Beverage',
    key: 'Food & Beverage',
    tagline: 'India\'s fastest-growing franchise category.',
    insight: 'QSR and café franchises dominate India\'s franchise landscape. Low setup costs, high throughput, and proven demand across Tier 1–3 cities.',
    stats: { brands: 0, avgROI: '31%', growth: '+24%' },
    color: 'orange',
    gradient: 'from-orange-500/20 to-red-500/10',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Healthcare & Wellness',
    key: 'Health & Wellness',
    tagline: 'Recession-proof, high-demand sector.',
    insight: 'Wellness franchises — clinics, gyms, yoga studios — are among the most resilient. India\'s health awareness boom is creating massive expansion opportunities.',
    stats: { brands: 0, avgROI: '38%', growth: '+31%' },
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Education & Training',
    key: 'Education',
    tagline: 'Scalable, asset-light, high-impact models.',
    insight: 'EdTech and coaching franchises thrive in India\'s education-obsessed market. Low capex, recurring revenue, and strong parent-driven demand.',
    stats: { brands: 0, avgROI: '32%', growth: '+22%' },
    color: 'blue',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Beauty & Lifestyle',
    key: 'Retail',
    tagline: 'Premium experiences with loyal customer bases.',
    insight: 'Salon, spa, and beauty franchises command premium pricing and strong repeat visits. India\'s beauty market is growing at 15% CAGR with massive whitespace.',
    stats: { brands: 0, avgROI: '35%', growth: '+19%' },
    color: 'pink',
    gradient: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Logistics & Infrastructure',
    key: 'Home Services',
    tagline: 'B2B franchise models with enterprise contracts.',
    insight: 'Last-mile delivery, facility management, and infrastructure services are exploding with India\'s e-commerce and smart city boom. High-volume, contract-based revenue.',
    stats: { brands: 0, avgROI: '40%', growth: '+28%' },
    color: 'violet',
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    glow: 'shadow-violet-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
      </svg>
    ),
  },
];

// inject live brand counts from data
INDUSTRIES.forEach(ind => {
  ind.stats.brands = franchiseOpportunities.filter(o => o.industry === ind.key).length;
});

const COLOR_TEXT = {
  amber:   'text-amber-400',
  orange:  'text-orange-400',
  emerald: 'text-emerald-400',
  blue:    'text-blue-400',
  pink:    'text-pink-400',
  violet:  'text-violet-400',
};
const COLOR_BG = {
  amber:   'bg-amber-500',
  orange:  'bg-orange-500',
  emerald: 'bg-emerald-500',
  blue:    'bg-blue-500',
  pink:    'bg-pink-500',
  violet:  'bg-violet-500',
};
const COLOR_RING = {
  amber:   'ring-amber-500/40',
  orange:  'ring-orange-500/40',
  emerald: 'ring-emerald-500/40',
  blue:    'ring-blue-500/40',
  pink:    'ring-pink-500/40',
  violet:  'ring-violet-500/40',
};

function IndustryCard({ ind, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative rounded-2xl border ${ind.border} card-premium-dark overflow-hidden cursor-pointer group transition-all duration-300 ${
        hovered ? `shadow-2xl ${ind.glow} -translate-y-2` : 'shadow-sm'
      }`}
      style={{ transform: hovered ? 'translateY(-8px)' : 'translateY(0)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      {/* animated gradient background on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-br ${ind.gradient} pointer-events-none`}
      />

      {/* animated motion graphic — floating orb */}
      <motion.div
        animate={hovered
          ? { scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }
          : { scale: 1, opacity: 0 }
        }
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
        className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${COLOR_BG[ind.color]} blur-[40px] pointer-events-none`}
      />

      <div className="relative p-5">
        {/* icon + name */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 rounded-xl ${COLOR_BG[ind.color]} flex items-center justify-center text-white shadow-lg ring-2 ring-white ${COLOR_RING[ind.color]}`}
          >
            {ind.icon}
          </motion.div>
          {/* live brand count badge */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 border border-slate-200`}>
            <span className={`text-[0.6rem] font-bold ${COLOR_TEXT[ind.color]}`}>{ind.stats.brands}</span>
            <span className="text-[0.58rem] text-white">brands</span>
          </div>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 mb-1">{ind.name}</h3>
        <p className="text-[0.75rem] text-white mb-4 leading-snug">{ind.tagline}</p>

        {/* stats row */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex flex-col p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className={`text-sm font-extrabold ${COLOR_TEXT[ind.color]}`}>{ind.stats.avgROI}</span>
            <span className="text-[0.6rem] text-white">Avg ROI</span>
          </div>
          <div className="flex flex-col p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-sm font-extrabold text-emerald-600">{ind.stats.growth}</span>
            <span className="text-[0.6rem] text-white">YoY Growth</span>
          </div>
        </div>

        {/* strategic insight — expands on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-[0.72rem] text-white leading-relaxed border-t border-slate-200 pt-3 mb-3">
                {ind.insight}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.6 }}
          className="flex items-center gap-1.5"
        >
          <span className={`text-[0.7rem] font-bold ${COLOR_TEXT[ind.color]}`}>Explore opportunities</span>
          <motion.svg
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
            className={`w-3.5 h-3.5 ${COLOR_TEXT[ind.color]}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-10 lg:py-14">
      <motion.div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[0.68rem] font-bold uppercase tracking-widest text-white mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Industries We Support
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.1] mb-4">
            Franchise Expansion Across{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Every High-Growth Sector
            </span>
          </h2>
          <p className="text-white text-base max-w-2xl mx-auto leading-relaxed">
            We operate across India's most dynamic industries — each with proven franchise models, qualified investors, and structured expansion systems.
          </p>
        </motion.div>

        {/* 3-col responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.id} ind={ind} index={i} />
          ))}
        </div>

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-white text-sm mb-5">Don't see your industry? We work across all sectors.</p>
          <CtaButton
            onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Discuss Your Industry
          </CtaButton>
        </motion.div>

      </motion.div>
    </section>
  );
}
