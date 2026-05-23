import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CULTURE_MOMENTS, CULTURE_VALUES } from '@/data/cultureGallery';

function CultureCard({ moment, isDark }) {
  return (
    <figure
      className={`culture-gallery-card group relative shrink-0 overflow-hidden rounded-2xl border shadow-lg transition-shadow duration-300 hover:shadow-xl ${
        isDark
          ? 'border-violet-500/30 shadow-violet-950/40 hover:border-violet-400/50'
          : 'border-slate-200/80 shadow-slate-900/10 hover:border-violet-300'
      }`}
    >
      <img
        src={moment.src}
        alt={moment.alt}
        className="h-52 w-[260px] sm:h-60 sm:w-[300px] md:h-64 md:w-[340px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <figcaption className="culture-gallery-caption-wrap pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4 pb-4 pt-14">
        <span className="culture-gallery-caption text-sm font-semibold tracking-tight">{moment.caption}</span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ moments, direction = 'left', isDark, className = '' }) {
  const loop = [...moments, ...moments];
  const animClass = direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left';

  return (
    <div
      className={`culture-gallery-row overflow-hidden ${className}`}
      role="region"
      aria-label="Culture photo gallery row"
    >
      <div
        className={`culture-marquee-track flex w-max items-stretch gap-4 sm:gap-5 py-1 ${animClass}`}
        style={{ animationDuration: direction === 'right' ? '38s' : '32s' }}
      >
        {loop.map((moment, idx) => (
          <CultureCard key={`${moment.src}-${idx}`} moment={moment} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

export default function CultureScrollGallery({
  isDark = false,
  className = '',
  headingId = 'career-culture-heading',
  label = 'Our culture',
  title = 'Life at iFranchise',
  intro = 'Async-friendly, outcome-driven, and built for people who want to grow fast — with offsites, demo days, and real ownership from day one.',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const row1 = CULTURE_MOMENTS;
  const row2 = [...CULTURE_MOMENTS].reverse();

  const labelClass = isDark ? 'text-violet-300' : 'text-violet-700';
  const dotClass = isDark ? 'bg-violet-400' : 'bg-violet-600';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';
  const brandClass = isDark ? 'text-violet-300' : 'text-violet-600';
  const introClass = isDark ? 'text-white/80' : 'text-slate-600';
  const pillClass = isDark
    ? 'border-violet-400/35 bg-violet-500/12 hover:bg-violet-500/20'
    : 'border-violet-200 bg-violet-50 hover:bg-violet-100';
  const pillTitleClass = isDark ? 'text-white' : 'text-violet-900';
  const pillDescClass = isDark ? 'text-white/70' : 'text-violet-700';

  return (
    <section
      ref={ref}
      className={`career-culture-section border-t py-12 sm:py-16 ${isDark ? 'border-violet-500/20' : 'border-slate-200/80'} ${className}`}
      aria-labelledby={headingId}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl px-6 sm:px-8 text-center mb-8 sm:mb-10"
      >
        <span
          className={`culture-gallery-label inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mb-3 ${labelClass}`}
        >
          <span className={`culture-gallery-label-dot w-1.5 h-1.5 rounded-full ${dotClass}`} />
          {label}
        </span>
        <h2
          id={headingId}
          className={`culture-gallery-heading text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${headingClass}`}
        >
          {title.includes('iFranchise') ? (
            <>
              {title.split('iFranchise')[0]}
              <span className={`culture-gallery-brand ${brandClass}`}>iFranchise</span>
              {title.split('iFranchise')[1] || ''}
            </>
          ) : (
            title
          )}
        </h2>
        <p className={`culture-gallery-intro text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${introClass}`}>
          {intro}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CULTURE_VALUES.map(({ title: valueTitle, desc }) => (
            <span
              key={valueTitle}
              title={desc}
              className={`culture-gallery-value-pill inline-flex flex-col items-center rounded-2xl border px-4 py-2.5 text-center transition-colors min-w-[120px] sm:min-w-[140px] ${pillClass}`}
            >
              <span className={`culture-gallery-value-title text-xs font-bold leading-tight ${pillTitleClass}`}>
                {valueTitle}
              </span>
              <span className={`culture-gallery-value-desc text-[10px] mt-0.5 leading-tight ${pillDescClass}`}>
                {desc}
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="culture-gallery-marquee-group relative"
      >
        <p className="sr-only">Culture photos scroll automatically. Use horizontal scroll if motion is reduced.</p>
        <div className="culture-gallery-mask culture-gallery-mask--top">
          <MarqueeRow moments={row1} direction="left" isDark={isDark} />
        </div>
        <div className="culture-gallery-mask culture-gallery-mask--bottom mt-4 sm:mt-5">
          <MarqueeRow moments={row2} direction="right" isDark={isDark} />
        </div>
      </motion.div>
    </section>
  );
}
