import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
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
  {
    label: 'Retail & Jewelry',
    accent: '#f59e0b',
    desc: 'Scale your retail brand with proven franchise models',
    img: retailImg,
  },
  {
    label: 'Food & Beverage',
    accent: '#f97316',
    desc: 'Expand your F&B concept across multiple locations',
    img: foodImg,
  },
  {
    label: 'Healthcare & Wellness',
    accent: '#10b981',
    desc: 'Grow your wellness business with franchise support',
    img: healthcareImg,
  },
  {
    label: 'Education & Training',
    accent: '#3b82f6',
    desc: 'Build an education empire through franchising',
    img: educationImg,
  },
  {
    label: 'Beauty & Lifestyle',
    accent: '#ec4899',
    desc: 'Transform beauty concepts into franchise networks',
    img: beautyImg,
  },
  {
    label: 'Logistics & Infrastructure',
    accent: '#94a3b8',
    desc: 'Scale logistics operations with franchise models',
    img: logisticsImg,
  },
];

function IndustryCardImg({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0618]" aria-hidden>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500/25 border-t-violet-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-contain object-center transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}

export default function ServicesStyleIndustriesSection() {
  return (
    <section className="relative z-10 overflow-hidden py-10 lg:py-14">
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white"
            style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Industries
          </span>
          <h2 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">
            Industries We Help Scale Through Franchising
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white sm:text-base">
            Franchise services built for brands across sectors ready to expand through scalable models.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, #12082a 0%, #0e0620 50%, #0a0618 100%)',
                border: '1px solid rgba(139,92,246,0.18)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                transition:
                  'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(109,40,217,0.3)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.18)';
              }}
              onClick={() => navigateTo('/franchise-opportunities')}
            >
              <div className="relative h-52 overflow-hidden bg-[#0a0618]">
                <IndustryCardImg src={ind.img} alt={ind.label} />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0a0618]/90 to-transparent"
                  aria-hidden
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${ind.accent}, transparent)`,
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1.5 text-base font-bold leading-snug text-white">{ind.label}</h3>
                <p className="flex-1 text-[0.78rem] leading-relaxed text-white">{ind.desc}</p>
                <div
                  className="mt-3 flex items-center gap-1.5 text-[0.72rem] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ color: '#c4b5fd' }}
                >
                  Explore opportunities <FiArrowRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 text-sm text-white">
            Don&apos;t see your industry? We work with businesses across all sectors.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('/contact')}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl"
          >
            <span>Discuss Your Industry</span>
            <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
