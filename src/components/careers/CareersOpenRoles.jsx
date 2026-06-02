import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { navigateTo } from '../../lib/navigation';
import { sectionTitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import {
  CAREERS_APPLY_EMAIL,
  DEPT_COLORS,
  DEPT_COLORS_DARK,
  MODE_COLORS,
  MODE_COLORS_DARK,
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

function MetaItem({ icon, label, value }) {
  return (
    <div className="careers-role-card__meta">
      <span className="careers-role-card__meta-icon" aria-hidden>
        {icon}
      </span>
      <div className="careers-role-card__meta-text min-w-0">
        <p className="careers-role-card__meta-label">{label}</p>
        <p className="careers-role-card__meta-value">{value}</p>
      </div>
    </div>
  );
}

function RoleListingCard({ role, inView }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const deptClass = (isDark ? DEPT_COLORS_DARK : DEPT_COLORS)[role.dept] || (isDark ? DEPT_COLORS_DARK : DEPT_COLORS).Marketing;
  const modeClass = (isDark ? MODE_COLORS_DARK : MODE_COLORS)[role.mode] || (isDark ? MODE_COLORS_DARK : MODE_COLORS).Remote;
  const applyEmail = role.applyEmail || CAREERS_APPLY_EMAIL;
  const mailto = `mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      className="careers-role-card careers-role-card--listing"
    >
      <div className="careers-role-card__header">
        <div className="careers-role-card__header-main">
          <div className="careers-role-card__icon">{role.icon}</div>
          <div className="careers-role-card__header-copy min-w-0 flex-1">
            <p className="careers-role-card__eyebrow">iFranchise · {role.dept}</p>
            <h3 className="careers-role-card__title">{role.title}</h3>
            <div className="careers-role-card__tags">
              <span className={`careers-role-card__tag careers-role-card__tag--dept ${deptClass}`}>
                {role.dept}
              </span>
              <span className="careers-role-card__tag careers-role-card__tag--neutral">{role.type}</span>
              <span className={`careers-role-card__tag ${modeClass}`}>{role.mode}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="careers-role-card__body">
        <p className="careers-role-card__tagline">{role.tagline}</p>

        <div className="careers-role-card__facts">
          <div className="careers-role-card__meta-grid">
            <MetaItem icon="📍" label="Location" value={role.location} />
            <MetaItem icon="⏳" label="Duration" value={role.duration} />
            <MetaItem icon="💰" label="Stipend" value={role.stipend} />
            <MetaItem icon="🕙" label="Schedule" value={`${role.workingDays} · ${role.workingHours}`} />
          </div>
        </div>

        {role.keySkills?.length > 0 && (
          <div className="careers-role-card__skills careers-role-card__skills--listing">
            <p className="careers-role-card__skills-label">Key focus areas</p>
            <ul className="careers-role-card__skills-list">
              {role.keySkills.map((skill) => (
                <li key={skill} className="careers-role-card__skill">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="careers-role-card__actions">
          <button
            type="button"
            onClick={() => navigateTo(`/careers/${role.id}`)}
            className="careers-role-card__btn careers-role-card__btn--primary"
          >
            <span className="careers-role-card__btn-label careers-role-card__btn-label--short">View role</span>
            <span className="careers-role-card__btn-label careers-role-card__btn-label--full">
              View full job description
            </span>
            <span aria-hidden>→</span>
          </button>
          <a href={mailto} className="careers-role-card__btn careers-role-card__btn--secondary">
            Apply via email
          </a>
        </div>
        <p className="careers-role-card__apply-note careers-role-card__apply-note--full">
          Apply to{' '}
          <a href={mailto} className="careers-role-card__apply-link">
            {applyEmail}
          </a>{' '}
          with resume, portfolio, and your best content samples.
        </p>
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
    <section className="careers-open-roles careers-section border-y border-slate-200">
      <div ref={ref} className="max-w-4xl mx-auto px-6 sm:px-8 xl:px-12 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
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
            Real roles on our team today. Read the full description, then apply with your resume and
            creative work.
          </p>
        </motion.div>

        <div className="space-y-6">
          {openRoles.map((role) => (
            <RoleListingCard key={role.id} role={role} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
