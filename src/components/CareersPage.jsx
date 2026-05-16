import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import careerImage from '../assets/carrer.png';
import { ROLES, DEPT_COLORS, MODE_COLORS } from './careersData.jsx';

// ─── Data ────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Competitive Salary',
    desc: 'Market-leading compensation with performance bonuses and equity participation for senior roles.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Creativity First',
    desc: 'A culture that rewards bold ideas, original thinking, and the courage to challenge the status quo.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Team Events',
    desc: 'Quarterly offsites, team dinners, hackathons, and culture-building experiences that actually matter.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Learning & Growth',
    desc: 'Annual learning budget, conference access, mentorship programs, and structured career progression.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Health & Wellness',
    desc: 'Comprehensive health coverage, mental wellness support, and gym reimbursement for the whole team.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Flexible Time Off',
    desc: 'Unlimited PTO policy, flexible working hours, and a results-driven culture that respects your time.',
  },
];

const FAQS = [
  {
    q: 'What kind of talent thrives at iFranchise?',
    a: 'People who are self-driven, curious, and care deeply about outcomes. We value ownership over titles — if you see a problem, you fix it. We look for builders, not passengers. If you want to grow fast and work on things that matter, you\'ll fit right in.',
  },
  {
    q: 'Is remote or hybrid work available?',
    a: 'Yes. Several roles are fully remote, and most others are hybrid. We care about the quality of your work, not where your desk is. Our async-first culture means you can do your best work from anywhere in India.',
  },
  {
    q: 'What does the hiring process look like?',
    a: 'Our process is fast and transparent: (1) Application review within 5 business days, (2) Intro call with the hiring manager — 20 minutes, (3) A skills assessment or portfolio review, (4) Final leadership round. No ghosting, no endless rounds. You\'ll always know where you stand.',
  },
  {
    q: 'Are internships available?',
    a: 'Absolutely. We run structured internship programs every quarter across design, growth, and content. Exceptional interns are regularly converted to full-time roles. Watch this page for openings or email careers@ifranchise.in.',
  },
  {
    q: 'What growth opportunities exist inside iFranchise?',
    a: 'We are a fast-scaling company — which means roles evolve quickly. Most of our team leads were individual contributors 12–18 months ago. We promote from within aggressively and invest in your career trajectory with learning budgets and mentorship.',
  },
  {
    q: 'What tools does the team use?',
    a: 'We run on Notion, Figma, Slack, Linear, HubSpot, and Google Workspace. Our tech stack is modern and we are always open to adopting better tools. We believe great tooling is part of great culture.',
  },
  {
    q: 'How quickly will I hear back after applying?',
    a: 'We review every application within 5 business days. If your profile is a strong match, you\'ll receive a calendar invite for an intro call. If it\'s not the right fit right now, we\'ll let you know — no black holes.',
  },
];

// ─── Reusable animated section wrapper ───────────────────────────────────────

function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label pill ───────────────────────────────────────────────────────

function SectionLabel({ text }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
      {text}
    </span>
  );
}

// ─── Benefit Card — center aligned ───────────────────────────────────────────

function BenefitCard({ icon, title, desc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="group rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center text-center gap-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_40px_rgba(109,40,217,0.12)] hover:-translate-y-1 hover:border-violet-200 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Role Card — premium large card ──────────────────────────────────────────

function RoleCard({ role, index, onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="careers-role-card group rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(109,40,217,0.14)] hover:-translate-y-1 hover:border-violet-200 transition-all duration-300 cursor-pointer"
      onClick={() => onApply(role)}
    >
      {/* Top row: icon + dept badge */}
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-700 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300 border border-violet-200">
          {role.icon}
        </div>
        <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${DEPT_COLORS[role.dept] || 'bg-violet-100 text-violet-800 border border-violet-200'}`}>
          {role.dept}
        </span>
      </div>

      {/* Title + tagline */}
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors duration-200 leading-tight">
          {role.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">{role.tagline}</p>
      </div>

      {/* Meta chips */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
          {role.type}
        </span>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${MODE_COLORS[role.mode]}`}>
          {role.mode}
        </span>
        <span className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {role.location}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Salary + CTA */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-0.5">Salary</p>
          <p className="text-base font-bold text-slate-900">{role.salary}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onApply(role); }}
          className="btn-purple-solid group/btn flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          Apply Now
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ─── FAQ Item — premium centered accordion ────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${open ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-white hover:border-violet-200'}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${open ? 'text-slate-900' : 'text-slate-800 group-hover:text-violet-700'}`}>
          {q}
        </span>
        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-violet-600 text-white rotate-45' : 'bg-slate-100 text-slate-600 group-hover:bg-violet-100 group-hover:text-violet-700'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-600 leading-relaxed px-6 pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page Entry Curtain Animation ─────────────────────────────────────────────

function PageCurtain({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0618] origin-top"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      onAnimationComplete={onDone}
    />
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function CareersPage() {
  const [curtainDone, setCurtainDone] = useState(false);
  const heroRef = useRef(null);

  const handleApply = (role) => {
    window.history.pushState({}, '', `/careers/${role.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="careers-page relative z-10 bg-white text-slate-900 min-h-screen">
      {/* Page-entry curtain */}
      <PageCurtain onDone={() => setCurtainDone(true)} />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-white">
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 pt-12 pb-0 sm:pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={curtainDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
              We're Hiring
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-4">
              Be part of<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                something bold.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
              At iFranchise, we build category-defining growth systems, creative ecosystems, and careers that matter.
            </p>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={curtainDone ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.12)] border border-slate-200 bg-white">
              <img
                src={careerImage}
                alt="iFranchise Careers"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-b from-violet-600/25 to-transparent blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-14 sm:py-20 bg-white">
        <RevealSection className="text-center mb-10">
          <div className="flex justify-center">
            <SectionLabel text="Benefits" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            This is the vibe that drives us.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Performance, ownership, growth, creativity, and balance — not just words on a wall.
          </p>
        </RevealSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} {...b} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="careers-open-roles border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-14 sm:py-20">
          <RevealSection className="text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel text="Open Roles" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              Join the Creative Force.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              {ROLES.length} open positions across design, growth, and strategy.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ROLES.map((role, i) => (
              <RoleCard key={role.id} role={role} index={i} onApply={handleApply} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <RevealSection className="text-center mb-8">
            <div className="flex justify-center">
              <SectionLabel text="FAQ" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              Got a question?{' '}
              <span className="text-slate-600 font-semibold">We've got answers.</span>
            </h2>
            <p className="text-sm text-slate-600">
              Still unsure? Email{' '}
              <a href="mailto:careers@ifranchise.in" className="text-violet-700 hover:text-violet-900 hover:underline font-medium">
                careers@ifranchise.in
              </a>
            </p>
          </RevealSection>

          <RevealSection delay={0.08} className="space-y-2">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </RevealSection>
        </div>
      </section>

    </div>
  );
}

export default CareersPage;
