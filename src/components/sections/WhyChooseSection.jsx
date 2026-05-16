import { useState } from 'react';
import { motion } from 'framer-motion';

const BLOCKS = [
  {
    id: 1,
    title: 'End-to-End Support',
    tagline: 'From day one to multi-city scale.',
    desc: 'Every brand gets a dedicated expansion manager, full documentation suite, and 90-day post-launch support — all under one roof.',
    color: 'violet',
    stat: { value: '90', unit: 'days', label: 'Post-launch support' },
    points: ['Dedicated expansion manager', 'Full documentation suite', '90-day post-launch support'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Expansion-Focused Strategy',
    tagline: 'Every decision is built to scale.',
    desc: 'Territory maps, investor profiles, and pricing models — all engineered for multi-city, multi-unit expansion from the very start.',
    color: 'indigo',
    stat: { value: '25+', unit: '', label: 'Cities covered' },
    points: ['Data-driven territory planning', 'Phased rollout roadmaps', 'Market demand analysis'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Verified Investor Network',
    tagline: 'Only serious capital reaches you.',
    desc: 'Pre-screened, capital-verified, intent-qualified investors — matched to your model, market, and investment range. No tyre-kickers.',
    color: 'emerald',
    stat: { value: '1800+', unit: '', label: 'Verified investors' },
    points: ['1800+ verified investors', 'Intent-qualified matching', 'Capital-range filtering'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Structured Franchise Ecosystem',
    tagline: 'Systems that run without you.',
    desc: 'SOPs, quality controls, reporting systems, and performance dashboards — so your network runs consistently at 3 units or 300.',
    color: 'amber',
    stat: { value: '200+', unit: '', label: 'Brands scaled' },
    points: ['Centralized SOP library', 'Performance dashboards', 'Quality audit systems'],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
      </svg>
    ),
  },
];

const C = {
  violet: { icon: 'bg-violet-100 text-violet-600', border: 'border-violet-200', hover: 'hover:border-violet-300 hover:shadow-violet-100/60', bar: 'from-violet-500 to-indigo-500', stat: 'text-violet-600', dot: 'bg-violet-500', tag: 'bg-violet-50 text-violet-700 border-violet-200' },
  indigo: { icon: 'bg-indigo-100 text-indigo-600', border: 'border-indigo-200', hover: 'hover:border-indigo-300 hover:shadow-indigo-100/60', bar: 'from-indigo-500 to-violet-500', stat: 'text-indigo-600', dot: 'bg-indigo-500', tag: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  emerald:{ icon: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-200', hover: 'hover:border-emerald-300 hover:shadow-emerald-100/60', bar: 'from-emerald-500 to-teal-500', stat: 'text-emerald-600', dot: 'bg-emerald-500', tag: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  amber:  { icon: 'bg-amber-100 text-amber-600', border: 'border-amber-200', hover: 'hover:border-amber-300 hover:shadow-amber-100/60', bar: 'from-amber-500 to-orange-500', stat: 'text-amber-600', dot: 'bg-amber-500', tag: 'bg-amber-50 text-amber-700 border-amber-200' },
};

function WhyCard({ block, index }) {
  const [hovered, setHovered] = useState(false);
  const c = C[block.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative card-premium-dark rounded-2xl border ${c.border} ${c.hover} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    >
      {/* animated top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
        style={{ transformOrigin: 'left' }}
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.bar}`}
      />

      {/* travelling light on hover */}
      <motion.div
        animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
        className={`absolute top-0 left-0 right-0 h-[2px] w-1/3 bg-gradient-to-r ${c.bar} blur-[2px] opacity-70`}
      />

      <div className="p-6 flex flex-col h-full">

        {/* icon + stat row */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            animate={hovered ? { rotate: [0, -8, 8, 0], scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon} transition-colors duration-300`}
          >
            {block.icon}
          </motion.div>
          <div className="text-right">
            <p className={`text-xl font-extrabold ${c.stat}`}>{block.stat.value}<span className="text-sm">{block.stat.unit}</span></p>
            <p className="text-[0.6rem] text-white">{block.stat.label}</p>
          </div>
        </div>

        {/* title + tagline */}
        <h3 className="text-base font-extrabold text-white mb-0.5 leading-snug">{block.title}</h3>
        <p className={`text-[0.7rem] font-semibold uppercase tracking-wider mb-3 ${c.stat}`}>{block.tagline}</p>

        {/* description */}
        <p className="text-[0.8rem] text-white leading-relaxed mb-5 flex-1">{block.desc}</p>

        {/* bullet points */}
        <div className="space-y-1.5 pt-4 border-t border-slate-100">
          {block.points.map((pt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.06 + 0.3 }}
              className="flex items-center gap-2"
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
              <span className="text-[0.75rem] text-white font-medium">{pt}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-10 lg:py-14">
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

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
            Why iFranchise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-extrabold tracking-tight text-white leading-[1.1] mb-3">
            The Strategic Advantage That{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Sets Us Apart
            </span>
          </h2>
          <p className="text-white text-base max-w-xl mx-auto leading-relaxed">
            We're not a listing platform. We're the operating system behind India's fastest-growing franchise brands.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOCKS.map((block, i) => (
            <WhyCard key={block.id} block={block} index={i} />
          ))}
        </div>

        {/* bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-violet-500/20"
        >
          {[
            { value: '200+',  label: 'Brands Scaled'        },
            { value: '1800+', label: 'Investors Onboarded'  },
            { value: '17+',   label: 'Cities Active'        },
            { value: '94%',   label: 'Investor Engagement'  },
          ].map((s, i) => (
            <div key={i} className="card-premium-dark-inner flex flex-col items-center py-6 transition-colors duration-200 hover:border-violet-400/35">
              <p className="text-2xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-[0.7rem] text-white">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
