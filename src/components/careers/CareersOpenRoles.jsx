import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { navigateTo } from '../../lib/navigation';
import { sectionTitleClass } from '../../lib/cardThemeStyles';
import {
  CAREERS_APPLY_EMAIL,
  getOpenRoles,
  HIRING_ACTIVE,
} from '../careersData';

function SectionLabel({ text }) {
  return (
    <span className="careers-section-label inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
      <span className="careers-section-label-dot w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
      {text}
    </span>
  );
}

function RoleListingCard({ role, inView }) {
  const applyEmail = role.applyEmail || CAREERS_APPLY_EMAIL;
  const mailto = `mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;

  const primaryMeta = [role.location, role.type, role.mode].filter(Boolean);
  const secondaryMeta = [role.duration, role.stipend, `${role.workingDays} · ${role.workingHours}`].filter(
    Boolean,
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      className="careers-role-card careers-role-card--listing careers-role-card--pro"
    >
      <div className="careers-role-card__inner">
        <p className="careers-role-card__company">iFranchise · {role.dept}</p>
        <h3 className="careers-role-card__title">
          <button
            type="button"
            className="careers-role-card__title-link"
            onClick={() => navigateTo(`/careers/${role.id}`)}
          >
            {role.title}
          </button>
        </h3>

        {primaryMeta.length > 0 && (
          <p className="careers-role-card__meta-line">{primaryMeta.join(' · ')}</p>
        )}

        {secondaryMeta.length > 0 && (
          <p className="careers-role-card__meta-secondary">{secondaryMeta.join(' · ')}</p>
        )}

        {role.tagline ? <p className="careers-role-card__summary">{role.tagline}</p> : null}

        <div className="careers-role-card__actions">
          <button
            type="button"
            onClick={() => navigateTo(`/careers/${role.id}`)}
            className="careers-role-card__btn careers-role-card__btn--primary"
          >
            View job
          </button>
          <a href={mailto} className="careers-role-card__btn careers-role-card__btn--secondary">
            Apply
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function CareersOpenRoles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const openRoles = getOpenRoles();

  if (!HIRING_ACTIVE || openRoles.length === 0) return null;

  return (
    <section className="careers-open-roles careers-section">
      <div ref={ref} className="careers-content-rail max-w-4xl mx-auto w-full px-6 sm:px-8 xl:px-12 pt-10 pb-4 sm:pt-12 sm:pb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <div className="flex justify-center">
            <SectionLabel text="Open positions" />
          </div>
          <h2 className={`${sectionTitleClass(true)} mb-3`}>
            Current{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              openings
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Read the full role on the next page, then apply with your resume and portfolio.
          </p>
        </motion.div>

        <div className="careers-role-list space-y-4">
          {openRoles.map((role) => (
            <RoleListingCard key={role.id} role={role} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
