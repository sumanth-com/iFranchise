import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CtaButton from '../ui/CtaButton';
import '../../styles/about-hero.css';

const TYPE_MS = 28;
const TYPE_START_DELAY = 450;

/** Edit company hero copy here */
const COMPANY = {
  eyebrow: 'About iFranchise',
  title: 'A Franchise Growth Company',
  titleAccent: 'Built on Trust',
  lead:
    'We partner with brands and investors who want disciplined expansion — with the people, process, and conviction to build businesses that last.',
  mission:
    'Our work is to bring structure and transparency to franchise growth across India — so every brand and investor can move forward with confidence.',
  purposeLabel: 'Our purpose',
  values: [
    'Partnership over transactions',
    'Clarity in every engagement',
    'Growth built to last',
  ],
  storyCta: 'Read our story',
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
});

function useTypewriter(text, enabled) {
  const [output, setOutput] = useState(enabled ? '' : text);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setOutput(text);
      setDone(true);
      return undefined;
    }

    setOutput('');
    setDone(false);
    let index = 0;
    let intervalId;

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setOutput(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, TYPE_MS);
    }, TYPE_START_DELAY);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, enabled]);

  return { output, done };
}

export default function AboutHero() {
  const reduceMotion = useReducedMotion();
  const { output: typedMission, done: missionTyped } = useTypewriter(
    COMPANY.mission,
    !reduceMotion,
  );

  const scrollToStory = () => {
    document.getElementById('about-our-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="about-hero about-hero--viewport" aria-labelledby="about-hero-heading">
      <div className="about-hero__ambient" aria-hidden>
        <div className="about-hero__orb about-hero__orb--1" />
        <div className="about-hero__orb about-hero__orb--2" />
        <div className="about-hero__orb about-hero__orb--3" />
      </div>

      <div className="about-hero__shell">
        <div className="about-hero__split">
          <motion.div
            className="about-hero__intro"
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? false : 'show'}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.p className="about-hero__eyebrow" variants={fadeUp(0)}>
              <span className="about-hero__eyebrow-line" aria-hidden />
              {COMPANY.eyebrow}
            </motion.p>

            <motion.h1 id="about-hero-heading" className="about-hero__title" variants={fadeUp(0)}>
              {COMPANY.title}
              <br />
              <span className="about-hero__title-accent">{COMPANY.titleAccent}</span>
            </motion.h1>

            <motion.p className="about-hero__lead" variants={fadeUp(0)}>
              {COMPANY.lead}
            </motion.p>

            <motion.div variants={fadeUp(0)}>
              <CtaButton size="md" className="about-hero__cta" onClick={scrollToStory}>
                {COMPANY.storyCta}
              </CtaButton>
            </motion.div>
          </motion.div>

          <div className="about-hero__aside">
            <span className="about-hero__divider" aria-hidden />

            <blockquote className="about-hero__quote-frame">
              <span className="about-hero__corner about-hero__corner--tl" aria-hidden />
              <span className="about-hero__corner about-hero__corner--br" aria-hidden />
              <p
                className={`about-hero__quote-text ${missionTyped ? 'about-hero__quote-text--done' : ''}`}
                aria-live="polite"
              >
                {typedMission}
                {!missionTyped && (
                  <span className="about-hero__type-cursor" aria-hidden>
                    |
                  </span>
                )}
              </p>
              <span className="about-hero__sr-only">{COMPANY.mission}</span>
              <footer
                className={`about-hero__quote-foot ${missionTyped ? 'about-hero__quote-foot--visible' : ''}`}
              >
                <cite>{COMPANY.purposeLabel}</cite>
              </footer>
            </blockquote>

            <ul
              className={`about-hero__chips ${missionTyped ? 'about-hero__chips--visible' : ''}`}
              aria-label="What we stand for"
            >
              {COMPANY.values.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
