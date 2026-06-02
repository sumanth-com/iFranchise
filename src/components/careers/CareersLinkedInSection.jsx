import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants/socialLinks';

const LINKEDIN = SOCIAL_LINKS.find((s) => s.id === 'linkedin');

function LinkedInIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function CareersLinkedInSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const href = LINKEDIN?.href || '#';

  return (
    <section className="careers-linkedin-section careers-section">
      <div ref={ref} className="careers-content-rail max-w-4xl mx-auto w-full px-6 sm:px-8 xl:px-12 pt-2 pb-8 sm:pt-3 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="careers-linkedin-card careers-growth-linkedin-cta flex w-full flex-col items-center gap-5 rounded-2xl px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left sm:px-8 sm:py-6"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="careers-linkedin-card__icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
              <LinkedInIcon className="h-6 w-6" />
            </div>
            <div className="careers-linkedin-card__copy min-w-0">
              <p className="careers-linkedin-card__title text-base font-bold">More roles coming soon</p>
              <p className="careers-linkedin-card__desc mt-1 text-sm leading-relaxed max-w-md">
                Follow iFranchise on LinkedIn for new openings, team updates, and franchise growth
                stories from our ecosystem.
              </p>
            </div>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="careers-growth-linkedin-btn inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#0A66C2] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#004182] hover:-translate-y-0.5 sm:w-auto"
          >
            <LinkedInIcon />
            Follow on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
