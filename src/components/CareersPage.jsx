import { useEffect, useRef, useState } from 'react';
import { scrollToHashSection } from '../lib/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SITE_IMAGES } from '../data/siteImageManifest.js';
import { useTheme } from '../context/ThemeContext';
import CultureScrollGallery from './careers/CultureScrollGallery';
import CareersOpenRoles from './careers/CareersOpenRoles';
import { CAREERS_APPLY_EMAIL, HIRING_ACTIVE } from './careersData';
import { heroDisplayClass, sectionTitleClass } from '../lib/cardThemeStyles';

const BENEFITS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Ownership',
    desc: 'Clear outcomes, real responsibility, and room to lead projects that move the business forward.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Learning',
    desc: 'Mentorship, skill-building, and exposure across brand partnerships, product, and growth.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Team culture',
    desc: 'Collaborative, respectful, and built for people who care about doing great work together.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible work',
    desc: 'Remote and hybrid options where the role allows, with an async-friendly way of working.',
  },
];

const FAQS = [
  {
    q: 'What kind of people do well at iFranchise?',
    a: 'Self-driven builders who care about outcomes. If you like ownership, clear communication, and work that connects brands with serious investors, you will fit our culture.',
  },
  {
    q: 'Is remote or hybrid work available?',
    a: 'Yes, for many future roles. We focus on quality of work and clear collaboration, not where your desk sits.',
  },
  {
    q: 'What roles are open right now?',
    a: 'We are hiring for Social Media & Content Creator Intern, Business Development Trainee (6-month internship), and Asst. Business Development Manager (Franchise Expansion). View each role on our careers page and apply with your resume.',
  },
  {
    q: 'How do I apply?',
    a: `Use the apply form on each role page, or email ${CAREERS_APPLY_EMAIL} with your resume and a short introduction. Include relevant samples or portfolio links where applicable.`,
  },
  {
    q: 'What growth looks like here',
    a: 'We are a growing company, so responsibilities evolve quickly. We promote from within where it makes sense and invest in people who want to build with us long term.',
  },
];

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

function SectionLabel({ text }) {
  return (
    <span className="careers-section-label inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
      <span className="careers-section-label-dot w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
      {text}
    </span>
  );
}

function BenefitCard({ icon, title, desc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="careers-benefit-card group rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center text-center gap-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_40px_rgba(109,40,217,0.12)] hover:-translate-y-1 hover:border-violet-200 transition-all duration-300"
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

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`careers-faq-item rounded-2xl border transition-all duration-300 ${open ? 'is-open border-violet-300 bg-violet-50' : 'border-slate-200 bg-white hover:border-violet-200'}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="careers-faq-question text-[15px] font-semibold leading-snug text-slate-800 transition-colors duration-200">
          {q}
        </span>
        <span
          className={`careers-faq-toggle shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'is-open' : ''}`}
          aria-hidden
        >
          <span className={`careers-faq-toggle-icon block text-[1.35rem] font-bold leading-none transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
            +
          </span>
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
            <p className="careers-faq-answer text-sm text-slate-600 leading-relaxed px-6 pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CareersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const heroRef = useRef(null);

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const run = () => scrollToHashSection();
    const t1 = window.setTimeout(run, 120);
    const t2 = window.setTimeout(run, 400);
    const t3 = window.setTimeout(run, 800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <div className="careers-page relative z-10 min-h-screen bg-transparent text-theme-primary">
      <section ref={heroRef} className="careers-hero-section careers-section relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 pt-12 pb-0 sm:pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="careers-hero-label careers-section-label inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
              <span className="careers-section-label-dot w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
              Building Forward
            </span>

            <h1 className={`careers-hero-title ${heroDisplayClass(true)} mb-4`}>
              Be part of<br />
              <span className="careers-hero-gradient text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                something bold.
              </span>
            </h1>

            <p className="careers-hero-lead text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
              {HIRING_ACTIVE
                ? 'At iFranchise we build franchise growth systems and meaningful careers. We have open roles—come build with us.'
                : 'At iFranchise we build franchise growth systems and meaningful careers. Our next team expansion is on the way.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="careers-hero-image-frame rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.12)] border border-slate-200 bg-white">
              <img
                src={SITE_IMAGES.careersHero}
                alt="Join iFranchise careers team — franchise growth platform India"
                title="Careers at iFranchise"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-b from-violet-600/25 to-transparent blur-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="careers-benefits-section careers-section careers-page-rail py-10 sm:py-12">
        <RevealSection className="text-center mb-10">
          <div className="flex justify-center">
            <SectionLabel text="Benefits" />
          </div>
          <h2 className={`${sectionTitleClass(true)} mb-3`}>
            This is the vibe that drives us.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            How we work today, and what we aim to offer as the team grows.
          </p>
        </RevealSection>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} {...b} delay={i * 0.05} />
          ))}
        </div>
      </section>

      <CareersOpenRoles />

      <CultureScrollGallery
        isDark={isDark}
        className="careers-culture-section careers-section"
        intro="A collaborative, outcome-driven culture. We value clear communication, ownership, and people who want to grow with the company."
      />

      <section className="careers-faq-section careers-section py-10 sm:py-12">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <RevealSection className="text-center mb-8">
            <div className="flex justify-center">
              <SectionLabel text="FAQ" />
            </div>
            <h2 className={`careers-faq-heading ${sectionTitleClass(true)} mb-3`}>
              Questions?{' '}
              <span className="careers-faq-subtitle text-slate-600 font-semibold">Here are answers.</span>
            </h2>
            <p className="careers-faq-intro text-sm text-slate-600">
              Email{' '}
              <a href={`mailto:${CAREERS_APPLY_EMAIL}`} className="careers-faq-email text-violet-700 hover:text-violet-900 hover:underline font-medium">
                {CAREERS_APPLY_EMAIL}
              </a>{' '}
              for anything else.
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
