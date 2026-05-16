import { useState } from 'react';
import { motion } from 'framer-motion';
import CtaButton from '../ui/CtaButton';
import service2 from '../../assets/service2.png';

const SERVICES = [
  {
    id: 1,
    title: 'Franchise Onboarding',
    short: 'End-to-end onboarding systems that set every franchisee up for success from day one.',
    detail: 'We build complete onboarding playbooks, training modules, launch checklists, and operational SOPs tailored to your brand — so every new unit opens consistently and confidently.',
    color: 'violet',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Franchise Documentation',
    short: 'Legal-grade franchise agreements, disclosure documents, and compliance frameworks.',
    detail: 'From FDD preparation to franchise agreements, territory rights, and IP protection — we handle all documentation so your expansion is legally sound and investor-ready.',
    color: 'indigo',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Investor Acquisition',
    short: 'Structured funnels that attract, qualify, and convert high-intent franchise investors.',
    detail: 'We deploy performance-driven investor acquisition campaigns — targeted outreach, lead scoring, qualification calls, and conversion systems — delivering only serious, capital-ready investors.',
    color: 'emerald',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Franchise Branding & Positioning',
    short: 'Investor-grade brand identity and positioning that makes your franchise irresistible.',
    detail: 'We craft premium brand decks, investor pitch materials, visual identity systems, and market positioning strategies that communicate your brand\'s value with clarity and conviction.',
    color: 'pink',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Franchise Expansion Strategy',
    short: 'Data-driven territory planning and phased rollout maps for controlled, scalable growth.',
    detail: 'We analyse market demand, competitor density, and demographic data to build city-level expansion roadmaps — so every new territory you enter is a calculated, high-probability win.',
    color: 'amber',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Investor Onboarding Support',
    short: 'Structured post-match support that turns signed investors into successful operators.',
    detail: 'After investor matching, we manage the full onboarding journey — site selection guidance, setup support, operational handover, and 90-day performance monitoring — ensuring every unit launches strong.',
    color: 'teal',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
  },
];

const COLOR_MAP = {
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    icon: 'bg-violet-100 text-violet-600',
    iconHover: 'group-hover:bg-violet-600 group-hover:text-white',
    glow: 'group-hover:shadow-violet-100',
    tag: 'bg-violet-100 text-violet-700',
    gradient: 'from-violet-500 to-indigo-500',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: 'bg-indigo-100 text-indigo-600',
    iconHover: 'group-hover:bg-indigo-600 group-hover:text-white',
    glow: 'group-hover:shadow-indigo-100',
    tag: 'bg-indigo-100 text-indigo-700',
    gradient: 'from-indigo-500 to-violet-500',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'bg-emerald-100 text-emerald-600',
    iconHover: 'group-hover:bg-emerald-600 group-hover:text-white',
    glow: 'group-hover:shadow-emerald-100',
    tag: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-500 to-teal-500',
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    icon: 'bg-pink-100 text-pink-600',
    iconHover: 'group-hover:bg-pink-600 group-hover:text-white',
    glow: 'group-hover:shadow-pink-100',
    tag: 'bg-pink-100 text-pink-700',
    gradient: 'from-pink-500 to-rose-500',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'bg-amber-100 text-amber-600',
    iconHover: 'group-hover:bg-amber-600 group-hover:text-white',
    glow: 'group-hover:shadow-amber-100',
    tag: 'bg-amber-100 text-amber-700',
    gradient: 'from-amber-500 to-orange-500',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    icon: 'bg-teal-100 text-teal-600',
    iconHover: 'group-hover:bg-teal-600 group-hover:text-white',
    glow: 'group-hover:shadow-teal-100',
    tag: 'bg-teal-100 text-teal-700',
    gradient: 'from-teal-500 to-emerald-500',
  },
};

function ServiceCard({ svc, index }) {
  const [expanded, setExpanded] = useState(false);
  const c = COLOR_MAP[svc.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative bg-white rounded-2xl border ${c.border} shadow-sm hover:shadow-xl ${c.glow} transition-all duration-300 overflow-hidden cursor-pointer`}
      onClick={() => setExpanded(e => !e)}
    >
      {/* animated gradient top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.07 + 0.2 }}
        style={{ transformOrigin: 'left' }}
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.gradient}`}
      />

      {/* hover glow overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${c.bg} pointer-events-none`} />

      <div className="relative p-5">
        {/* icon + title row */}
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${c.icon} ${c.iconHover} transition-colors duration-300`}
          >
            {svc.icon}
          </motion.div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-[0.92rem] font-bold text-slate-900 leading-snug">{svc.title}</h3>
          </div>
          {/* expand chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 mt-1"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </motion.div>
        </div>

        {/* short description */}
        <p className="text-[0.8rem] text-white leading-relaxed mb-3">{svc.short}</p>

        {/* expandable detail */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className={`pt-3 border-t ${c.border} mt-1`}>
            <p className="text-[0.78rem] text-white leading-relaxed">{svc.detail}</p>
          </div>
        </motion.div>

        {/* bottom tag */}
        <div className="mt-3 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.62rem] font-bold uppercase tracking-wide ${c.tag}`}>
            <span className="w-1 h-1 rounded-full bg-current" />
            iFranchise Service
          </span>
          <span className="text-[0.65rem] text-white">{expanded ? 'Click to collapse' : 'Click to expand'}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesOverview() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">

      {/* service2.png background — matches ServicesPage "How It Works" */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={service2}
            alt=""
            className="w-full h-full"
            style={{ opacity: 0.65, filter: 'brightness(1.08)', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ff]/50 via-transparent to-[#eef4ff]/40" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f5f3ff] via-[#f5f3ff]/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#eef4ff] via-[#eef4ff]/90 to-transparent" />
        </div>
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-[0.68rem] font-bold uppercase tracking-widest text-violet-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            What We Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4">
            Complete Franchise Growth &{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Expansion Services
            </span>
          </h2>
          <p className="text-white text-base max-w-2xl mx-auto leading-relaxed">
            Every service is engineered to remove friction, attract the right investors, and build a franchise system that scales without breaking.
          </p>
        </motion.div>

        {/* 2-row 3-col responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <CtaButton
            onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Explore All Services
          </CtaButton>
        </motion.div>

      </div>
    </section>
  );
}
