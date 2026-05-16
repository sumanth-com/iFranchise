import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import CtaButton from '../ui/CtaButton';
import SectionPill from '../ui/SectionPill';
import retailImg from '../../assets/IndImgs/Retail & Jewelry.png';
import foodImg from '../../assets/IndImgs/Food & Beverage.png';
import healthcareImg from '../../assets/IndImgs/Healthcare & Wellness.png';
import educationImg from '../../assets/IndImgs/Education & Training.png';
import beautyImg from '../../assets/IndImgs/Beauty & Lifestyle.png';
import logisticsImg from '../../assets/IndImgs/Logistics & Infrastructure.png';

const navigateTo = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const INDUSTRIES = [
  { label: 'Retail & Jewelry', accent: '#f59e0b', desc: 'Scale your retail brand with proven franchise models', img: retailImg },
  { label: 'Food & Beverage', accent: '#f97316', desc: 'Expand your F&B concept across multiple locations', img: foodImg },
  { label: 'Healthcare & Wellness', accent: '#10b981', desc: 'Grow your wellness business with franchise support', img: healthcareImg },
  { label: 'Education & Training', accent: '#3b82f6', desc: 'Build an education empire through franchising', img: educationImg },
  { label: 'Beauty & Lifestyle', accent: '#ec4899', desc: 'Transform beauty concepts into franchise networks', img: beautyImg },
  { label: 'Logistics & Infrastructure', accent: '#94a3b8', desc: 'Scale logistics operations with franchise models', img: logisticsImg },
];

function IndustryCardImg({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100" aria-hidden>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}

export default function ServicesStyleIndustriesSection() {
  return (
    <section className="lyb-industries-section relative z-10 overflow-hidden py-10 lg:py-14">
      <motion.div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div className="theme-section-on-light mb-10 text-center">
          <SectionPill className="mb-4">Industries</SectionPill>
          <h2 className="lyb-section-heading mb-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Industries We Help Scale Through Franchising
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Franchise services built for brands across sectors ready to expand through scalable models.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="theme-light-card group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_20px_40px_rgba(109,40,217,0.14)]"
            >
              <motion.div className="industry-card-media relative h-56 overflow-hidden bg-slate-100">
                <IndustryCardImg src={ind.img} alt={ind.label} />
                <motion.div
                  className="industry-card-fade pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/95 to-transparent"
                  aria-hidden
                />
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${ind.accent}, transparent)` }}
                />
              </motion.div>
              <motion.div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1.5 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
                  {ind.label}
                </h3>
                <p className="flex-1 text-[0.78rem] leading-relaxed text-slate-600">{ind.desc}</p>
                <button
                  type="button"
                  className="industry-card-explore"
                  onClick={() => navigateTo('/franchise-opportunities')}
                >
                  Explore opportunities <FiArrowRight className="h-3 w-3" />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-14 text-center">
          <p className="mb-5 text-sm text-slate-600">
            Don&apos;t see your industry? We work with businesses across all sectors.
          </p>
          <CtaButton type="button" size="lg" onClick={() => navigateTo('/contact')}>
            Discuss Your Industry
          </CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
