import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import SectionPill from '../ui/SectionPill';
import PremiumFAQItem from '../ui/PremiumFAQItem';
import CtaButton from '../ui/CtaButton';
import { navigateTo } from '../../lib/navigation';
import { sectionTitleClass } from '../../lib/cardThemeStyles';
import {
  LYB_AUDIENCE_CARDS,
  LYB_PROCESS_STEPS,
  LYB_TRUST_METRICS,
  LYB_WHY_CARDS,
  LIST_YOUR_BRAND_PAGE_FAQS,
} from '../../data/listYourBrandPageContent';

const LYB_SECTION = 'relative overflow-hidden bg-transparent py-12 lg:py-16';
const LYB_CONTAINER = 'relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10';
const LYB_EASE = [0.22, 1, 0.36, 1];
const LYB_PREMIUM_CARD =
  'lyb-premium-card relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-[#1a0f3d] via-[#12082a] to-[#0a0618] shadow-[0_16px_48px_rgba(0,0,0,0.35)]';

function LybPremiumCard({ children, className = '' }) {
  return (
    <div className={`${LYB_PREMIUM_CARD} ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,0.22),transparent)]"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionIntro({ pill, title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: LYB_EASE }}
      className={`mb-10 text-center lg:mb-12 ${className}`}
    >
      <SectionPill className="mb-4">{pill}</SectionPill>
      <h2 className={`lyb-section-heading-on-dark mx-auto max-w-3xl ${sectionTitleClass(false, { tight: true })}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="lyb-page-subtext lyb-section-subtext mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function WhyIcon({ type }) {
  const cls = 'h-5 w-5';
  if (type === 'leads') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  if (type === 'exposure') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (type === 'strategy') {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    );
  }
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.85} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

export function WhyListSection() {
  return (
    <section className={`lyb-why-section ${LYB_SECTION}`} aria-labelledby="lyb-why-heading">
      <div className={LYB_CONTAINER}>
        <SectionIntro
          pill="Why iFranchise"
          title="Why List Your Brand With iFranchise"
          subtitle="India's franchise listing platform for franchise development, franchise consulting, and franchise investor discovery."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {LYB_WHY_CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.42, delay: i * 0.06, ease: LYB_EASE }}
              whileHover={{ y: -4 }}
              className="lyb-benefit-card card-premium-dark group rounded-2xl border border-violet-500/15 p-6 transition-shadow duration-300 hover:border-violet-400/35 hover:shadow-[0_20px_48px_rgba(124,58,237,0.12)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/15 text-violet-200 transition-colors group-hover:border-violet-300/40 group-hover:bg-violet-500/25">
                <WhyIcon type={card.icon} />
              </div>
              <h3 className="mb-2 text-lg font-extrabold text-white">{card.title}</h3>
              <p className="text-sm leading-relaxed text-violet-100/75">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="lyb-process-section relative overflow-hidden bg-transparent py-10 lg:py-12" aria-labelledby="lyb-process-heading">
      <div className={LYB_CONTAINER}>
        <SectionIntro
          pill="How It Works"
          title="From Listing To Franchise Inquiries"
          subtitle="A clear franchise expansion process built for brand owners seeking franchise growth and franchise partner acquisition."
          className="mb-8 lg:mb-9"
        />
        <div className="relative mx-auto max-w-5xl">
          <div
            className="lyb-process-line pointer-events-none absolute left-6 top-6 z-[1] hidden h-[calc(100%-3rem)] w-[2px] lg:left-1/2 lg:-translate-x-px lg:block"
            aria-hidden
          />
          <ol className="space-y-4 lg:space-y-5">
            {LYB_PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: LYB_EASE }}
                className={`lyb-process-step relative grid items-center gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-8 ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className={`min-w-0 lg:px-4 ${i % 2 === 1 ? 'lg:text-right' : ''}`}>
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-violet-400">
                    Step {step.step}
                  </span>
                  <h3
                    id={i === 0 ? 'lyb-process-heading' : undefined}
                    className="mt-1 text-lg font-extrabold leading-snug text-white sm:text-xl"
                  >
                    {step.title}
                  </h3>
                </div>
                <LybPremiumCard className={`p-4 sm:p-5 ${i % 2 === 0 ? 'lg:mr-0' : 'lg:ml-0'}`}>
                  <p className="text-sm leading-relaxed text-violet-100/85">{step.description}</p>
                </LybPremiumCard>
                <span
                  className="lyb-process-dot absolute left-6 top-1/2 z-[2] hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-violet-500 bg-white lg:left-1/2 lg:block"
                  aria-hidden
                />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function WhoCanListSection() {
  return (
    <section className={`lyb-audience-section hidden md:block ${LYB_SECTION}`} aria-labelledby="lyb-audience-heading">
      <div className={LYB_CONTAINER}>
        <SectionIntro
          pill="Who It's For"
          title="Built For Ambitious Brands Ready To Scale"
          subtitle="Whether you are launching franchise expansion or accelerating nationwide brand growth — any industry with a scalable model belongs here."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {LYB_AUDIENCE_CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: LYB_EASE }}
              className="lyb-audience-card card-premium-dark flex flex-col rounded-2xl border border-violet-500/15 p-5 transition hover:border-violet-400/30"
            >
              <h3 id={i === 0 ? 'lyb-audience-heading' : undefined} className="mb-2 text-base font-extrabold text-white">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-violet-100/75">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCounter({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const tick = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - (1 - p) ** 3;
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export function WhyTrustSection() {
  return (
    <section className={`lyb-metrics-section ${LYB_SECTION}`} aria-labelledby="lyb-trust-heading">
      <div className={LYB_CONTAINER}>
        <SectionIntro
          pill="Trust & Scale"
          title="Why Brands Trust iFranchise"
          subtitle="Enterprise-grade franchise ecosystem metrics from India's franchise marketplace and franchise consulting network."
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-violet-500/20 lg:grid-cols-4">
          {LYB_TRUST_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="lyb-metric-card lyb-trust-stat-cell flex flex-col items-center justify-center px-4 py-8 text-center sm:py-10"
            >
              <p className="lyb-trust-stat-value mb-1 text-3xl font-extrabold sm:text-4xl">
                <MetricCounter target={m.value} suffix={m.suffix} />
              </p>
              <p id={i === 0 ? 'lyb-trust-heading' : undefined} className="lyb-trust-stat-label text-xs font-semibold uppercase tracking-wide sm:text-sm">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
        <ul className="lyb-trust-highlights mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-violet-100/70">
          {['Franchise consulting expertise', 'Verified investor network', 'Pan-India franchise marketplace', 'Structured franchise development'].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <FiCheck className="shrink-0 text-emerald-400" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ReadinessBannerSection() {
  return (
    <section className={`lyb-readiness-section ${LYB_SECTION} py-8 lg:py-10`}>
      <div className={LYB_CONTAINER}>
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lyb-readiness-banner card-premium-dark relative overflow-hidden rounded-2xl border border-violet-500/20 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-indigo-600/10" aria-hidden />
          <div className="relative max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Franchise Readiness</p>
            <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              Not Sure If Your Business Is Ready For Franchising?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/80">
              Assess your business, identify growth gaps, and discover your franchise expansion potential before you list.
            </p>
          </div>
          <CtaButton
            type="button"
            className="relative mt-5 shrink-0 sm:mt-0"
            onClick={() => navigateTo('/franchise-readiness-assessment')}
          >
            Check Readiness
          </CtaButton>
        </motion.aside>
      </div>
    </section>
  );
}

export function ListYourBrandFAQSection() {
  return (
    <section className="lyb-faq-section w-full py-12 lg:py-16" aria-labelledby="lyb-faq-heading">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionIntro
          pill="FAQ"
          title="Franchise Listing & Expansion Questions"
          subtitle="Clear answers on franchise development, franchise investors, franchise consulting, and listing your brand on iFranchise."
        />
        <h2 id="lyb-faq-heading" className="sr-only">
          Frequently asked questions about listing your brand
        </h2>
        <div className="services-faq-list flex flex-col gap-4">
          {LIST_YOUR_BRAND_PAGE_FAQS.map((faq, index) => (
            <PremiumFAQItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
        <p className="lyb-page-subtext mt-8 text-center text-sm">
          Explore our{' '}
          <button type="button" onClick={() => navigateTo('/services')} className="font-semibold text-violet-300 underline-offset-2 hover:underline">
            franchise consulting services
          </button>{' '}
          or{' '}
          <button type="button" onClick={() => navigateTo('/franchise-opportunities')} className="font-semibold text-violet-300 underline-offset-2 hover:underline">
            franchise opportunities marketplace
          </button>
          .
        </p>
      </div>
    </section>
  );
}

export function FinalCTASection({ onListBrand }) {
  return (
    <section className={`lyb-final-cta-section ${LYB_SECTION} pb-16 lg:pb-20`}>
      <div className={LYB_CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lyb-final-cta relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-[#1a0f3d] via-[#12082a] to-[#0a0618] px-6 py-12 text-center sm:px-10 sm:py-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,0.22),transparent)]" aria-hidden />
          <h2 className="relative text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Ready To Scale Your Brand Across India?
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-violet-100/85 sm:text-base">
            Join ambitious businesses using iFranchise to accelerate franchise growth, franchise lead generation, and
            connections with serious franchise investors.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={onListBrand}
              className="btn-purple-solid inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold sm:w-auto"
            >
              List Your Brand
              <FiArrowRight aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact-us')}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-violet-300/55 hover:bg-white/10 sm:w-auto"
            >
              Book Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
