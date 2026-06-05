import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { navigateTo } from '../../lib/navigation';
import { sectionTitleClass } from '../../lib/cardThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import { SOCIAL_LINKS } from '../../constants/socialLinks';
import {
  DEPT_COLORS,
  DEPT_COLORS_DARK,
  getOpenRoles,
  HIRING_ACTIVE,
  MODE_COLORS,
  MODE_COLORS_DARK,
} from '../careersData';
import { CAREERS_LISTING_ICONS } from './careersListingIcons';

const LINKEDIN = SOCIAL_LINKS.find((s) => s.id === 'linkedin');

function SectionLabel({ text }) {
  return (
    <span className="careers-section-label inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">
      <span className="careers-section-label-dot w-1.5 h-1.5 rounded-full bg-violet-600 inline-block" />
      {text}
    </span>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LinkedInIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function roleLocationLabel(location = '') {
  const first = location.split(',')[0]?.trim();
  return first || location;
}

function RoleListingCard({ role, index, inView, isDark }) {
  const deptClass = (isDark ? DEPT_COLORS_DARK : DEPT_COLORS)[role.dept] || DEPT_COLORS.Sales;
  const modeClass = (isDark ? MODE_COLORS_DARK : MODE_COLORS)[role.mode] || MODE_COLORS.Remote;
  const locationLabel = roleLocationLabel(role.location);
  const listingIcon = CAREERS_LISTING_ICONS[role.dept] || CAREERS_LISTING_ICONS.Sales;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.04 + index * 0.05 }}
      className="careers-role-card careers-role-card--listing careers-role-card--v2"
    >
      <div className="careers-role-card__inner">
        <div className="careers-role-card__head">
          <div className="careers-role-card__icon-wrap" aria-hidden>
            {listingIcon}
          </div>
          <span className={`careers-role-card__dept ${deptClass}`}>{role.dept}</span>
        </div>

        <div className="careers-role-card__body">
          <h3 className="careers-role-card__title">
            <button
              type="button"
              className="careers-role-card__title-link"
              onClick={() => navigateTo(`/careers/${role.id}`)}
            >
              {role.title}
            </button>
          </h3>

          <p className="careers-role-card__summary">{role.tagline || '\u00A0'}</p>

          <div className="careers-role-card__pills">
            {role.type ? (
              <span className="careers-role-card__pill careers-role-card__pill--neutral">{role.type}</span>
            ) : null}
            {role.mode ? (
              <span className={`careers-role-card__pill careers-role-card__pill--mode ${modeClass}`}>
                {role.mode}
              </span>
            ) : null}
            {locationLabel ? (
              <span className="careers-role-card__pill careers-role-card__pill--neutral careers-role-card__pill--location">
                <MapPinIcon />
                {locationLabel}
              </span>
            ) : null}
          </div>
        </div>

        <div className="careers-role-card__footer careers-role-card__footer--apply-only">
          <button
            type="button"
            onClick={() => navigateTo(`/careers/${role.id}`)}
            className="careers-role-card__apply careers-cta-pill careers-cta-pill--primary bg-violet-600 hover:bg-violet-700 text-white"
          >
            Apply Now
            <ArrowIcon />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function RolesComingSoonBanner({ inView, index }) {
  const href = LINKEDIN?.href || '#';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.04 + index * 0.05 }}
      className="careers-role-card careers-role-soon careers-role-card--listing careers-role-card--v2"
    >
      <div className="careers-role-soon__inner">
        <div className="careers-role-soon__icon-wrap" aria-hidden>
          <BellIcon />
        </div>

        <div className="careers-role-soon__copy">
          <h3 className="careers-role-soon__title">More roles coming soon</h3>
          <p className="careers-role-soon__desc">
            Follow iFranchise on LinkedIn for new openings and team updates.
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="careers-role-soon__cta careers-cta-pill careers-cta-pill--linkedin"
        >
          <LinkedInIcon className="h-4 w-4" />
          Follow on LinkedIn
          <ArrowIcon />
        </a>
      </div>
    </motion.article>
  );
}

export default function CareersOpenRoles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const openRoles = getOpenRoles();

  if (!HIRING_ACTIVE || openRoles.length === 0) return null;

  const deptList = [...new Set(openRoles.map((r) => r.dept))].join(', ');

  return (
    <section id="open-roles" className="careers-open-roles careers-section scroll-mt-24">
      <div
        ref={ref}
        className="careers-open-roles-rail pt-10 pb-10 sm:pt-12 sm:pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="flex justify-center">
            <SectionLabel text="Open positions" />
          </div>
          <h2 className={`careers-open-roles__title ${sectionTitleClass(!isDark)} mb-3`}>
            Current openings
          </h2>
          <p className="careers-open-roles__subtitle text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {openRoles.length} open {openRoles.length === 1 ? 'position' : 'positions'} across {deptList}.
          </p>
        </motion.div>

        <div className="careers-role-list">
          {openRoles.map((role, index) => (
            <RoleListingCard key={role.id} role={role} index={index} inView={inView} isDark={isDark} />
          ))}
          <RolesComingSoonBanner inView={inView} index={openRoles.length} />
        </div>
      </div>
    </section>
  );
}
