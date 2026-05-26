import { motion, useReducedMotion } from 'framer-motion';
import CtaButton from '../ui/CtaButton';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/about-hero.css';

const PATHWAYS = [
  {
    id: 'brands',
    label: 'For brands',
    title: 'Scale nationwide',
    desc: 'List your franchise, reach serious investors, and grow with structured expansion support.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m2-16h10M9 7h1m-1 4h1m4-4h1m-1 4h1" />
      </svg>
    ),
  },
  {
    id: 'investors',
    label: 'For investors',
    title: 'Invest with clarity',
    desc: 'Compare verified opportunities, see real numbers, and choose franchises that fit your goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'platform',
    label: 'What we do',
    title: 'Match & support',
    desc: 'We bring transparency, data, and guidance so every franchise decision is confident, not guesswork.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: '100+', label: 'Franchise brands' },
  { value: '10K+', label: 'Investors guided' },
  { value: 'Pan-India', label: 'Market coverage' },
];

const fade = (delay = 0, reduceMotion) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 16 },
  animate: reduceMotion ? false : { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutHero() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToIfranchise = () => {
    document.getElementById('about-ifranchise')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className={`about-hero ${isDark ? 'about-hero--dark' : 'about-hero--light'}`}
      aria-labelledby="about-hero-heading"
    >
      <div className="about-hero__bg" aria-hidden>
        <div className="about-hero__grid" />
        <div className="about-hero__glow about-hero__glow--1" />
        <div className="about-hero__glow about-hero__glow--2" />
      </div>

      <div className="about-hero__inner">
        <motion.div className="about-hero__head" {...fade(0, reduceMotion)}>
          <h1 id="about-hero-heading" className="about-hero__title">
            We make franchise growth{' '}
            <span className="about-hero__title-highlight">simple to understand</span>
          </h1>

          <p className="about-hero__subtitle">
            iFranchise is the platform where brands find investors, investors find verified franchises,
            and everyone grows with data, not confusion.
          </p>
        </motion.div>

        <motion.ul
          className="about-hero__pathways"
          aria-label="Who we help"
          {...fade(0.08, reduceMotion)}
        >
          {PATHWAYS.map((item, idx) => (
            <motion.li
              key={item.id}
              className="about-hero__pathway"
              {...fade(0.12 + idx * 0.06, reduceMotion)}
            >
              <div className="about-hero__pathway-icon">{item.icon}</div>
              <span className="about-hero__pathway-label">{item.label}</span>
              <h2 className="about-hero__pathway-title">{item.title}</h2>
              <p className="about-hero__pathway-desc">{item.desc}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="about-hero__footer" {...fade(0.28, reduceMotion)}>
          <ul className="about-hero__stats" aria-label="Company highlights">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>

          <CtaButton
            size="md"
            className="about-hero__cta"
            arrowDirection="down"
            onClick={scrollToIfranchise}
          >
            Discover IFRANCHISE
          </CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
