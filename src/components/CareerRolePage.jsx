import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../lib/navigation';
import CareerApplyForm from './careers/CareerApplyForm';
import {
  DEPT_COLORS,
  DEPT_COLORS_DARK,
  HIRING_STEPS,
  MODE_COLORS,
  MODE_COLORS_DARK,
  getRoleById,
  getRoleIdFromPathname,
} from './careersData';
import { useTheme } from '../context/ThemeContext';

function HeroPill({ children, className = '' }) {
  return (
    <span
      className={`career-detail-hero-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

function SectionBlock({ title, children }) {
  return (
    <section className="career-detail-block">
      <h2 className="career-detail-section-title">{title}</h2>
      <div className="career-detail-prose">{children}</div>
    </section>
  );
}

function ListCheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.25}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="career-detail-list">
      {items.map((item) => (
        <li key={item} className="career-detail-list__item">
          <span className="career-detail-list__icon" aria-hidden>
            <ListCheckIcon />
          </span>
          <span className="career-detail-list__text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function QualGroup({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className="career-detail-qual-group">
      <h3 className="career-detail-qual-label">{label}</h3>
      <BulletList items={items} />
    </div>
  );
}

function partitionRequirements(requirements = []) {
  const required = [];
  const preferred = [];
  for (const item of requirements) {
    if (/\(preferred\)/i.test(item)) {
      preferred.push(item.replace(/\s*\(preferred\)\s*/gi, '').trim());
    } else {
      required.push(item);
    }
  }
  return { required, preferred };
}

function buildRoleIntro(role) {
  if (role.aboutRole) return role.aboutRole;
  if (role.about) return role.about;
  return '';
}

function buildCompanyLine(role) {
  if (!role.about || !role.aboutRole || role.about === role.aboutRole) return null;
  const firstSentence = role.about.trim().match(/^[^.!?]+[.!?]?/)?.[0]?.trim();
  return firstSentence || null;
}

function RoleSidebarExtras({ role }) {
  return (
    <div className="career-detail-extras mt-10 space-y-8 border-t border-slate-200 pt-8 lg:mt-12">
      {role.whyJoin ? (
        <section>
          <h2 className="career-detail-section-title">Why this role</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{role.whyJoin}</p>
        </section>
      ) : null}

      <section>
        <h2 className="career-detail-section-title">Hiring process</h2>
        <ol className="mt-4 space-y-3">
          {HIRING_STEPS.slice(0, 4).map((step) => (
            <li key={step.step} className="flex gap-3 text-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-800">
                {step.step}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{step.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function ApplyPanel({ role }) {
  return (
    <aside className="career-detail-form w-full lg:col-span-1 lg:max-w-[400px] lg:justify-self-end lg:self-stretch">
      <div className="career-detail-form-sticky career-detail-form-sticky--range lg:pt-4">
        <div className="career-detail-form-card career-detail-form-card--apply fd-dual-panel rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <CareerApplyForm role={role} />
        </div>
      </div>
    </aside>
  );
}

export default function CareerRolePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const roleId = getRoleIdFromPathname(
    typeof window !== 'undefined' ? window.location.pathname : '',
  );
  const role = useMemo(() => getRoleById(roleId), [roleId]);

  useEffect(() => {
    if (!role) {
      navigateTo('/careers', { replace: true });
    }
  }, [role]);

  const qualifications = useMemo(() => {
    if (!role) return { minimum: [], preferred: [] };
    const { required, preferred } = partitionRequirements(role.requirements);
    return {
      minimum: [...(role.keySkills || []), ...required],
      preferred,
    };
  }, [role]);

  if (!role || !role.active) {
    return null;
  }

  const deptClass = (isDark ? DEPT_COLORS_DARK : DEPT_COLORS)[role.dept] || DEPT_COLORS.Marketing;
  const modeClass = (isDark ? MODE_COLORS_DARK : MODE_COLORS)[role.mode] || MODE_COLORS.Remote;
  const roleIntro = buildRoleIntro(role);
  const companyLine = buildCompanyLine(role);

  const insights = [
    { label: 'Duration', value: role.duration },
    { label: 'Stipend', value: role.stipend },
    { label: 'Working days', value: role.workingDays },
    { label: 'Working hours', value: role.workingHours },
  ].filter((item) => item.value);

  const hasQualifications =
    qualifications.minimum.length > 0 || qualifications.preferred.length > 0;

  return (
    <div className="career-detail-page relative z-10 min-h-screen text-theme-primary">
      <div className="career-detail-hero border-b border-slate-200 bg-gradient-to-br from-violet-50/90 via-white to-indigo-50/50">
        <div className="career-detail-rail py-5 sm:py-12">
          <button
            type="button"
            onClick={() => navigateTo('/careers')}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 transition"
          >
            <span aria-hidden>←</span> Back to careers
          </button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <HeroPill className={deptClass}>{role.dept}</HeroPill>
              <HeroPill className="bg-slate-100 text-slate-800 border border-slate-200">{role.type}</HeroPill>
              <HeroPill className={`career-detail-mode-pill ${modeClass}`}>{role.mode}</HeroPill>
              <HeroPill className="hidden sm:inline-flex bg-emerald-100 text-emerald-800 border border-emerald-200">
                Open role
              </HeroPill>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {role.title}
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-slate-600 max-w-3xl leading-relaxed line-clamp-3 sm:line-clamp-none">
              {role.tagline}
            </p>

            {companyLine ? (
              <p className="career-detail-company-line mt-3 text-sm text-slate-600 max-w-3xl leading-relaxed hidden sm:block">
                {companyLine}{' '}
                <a
                  href="/about-us"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/about-us');
                  }}
                  className="career-detail-about-link font-semibold text-violet-700 hover:text-violet-900 transition hover:underline"
                >
                  About iFranchise →
                </a>
              </p>
            ) : null}

            <p className="career-detail-mobile-summary mt-3 text-xs text-slate-600 leading-snug sm:hidden">
              {role.location}
              {role.duration ? ` · ${role.duration}` : ''}
              {role.stipend ? ` · ${role.stipend}` : ''}
            </p>

            <div className="career-detail-insights-panel fd-hero-split mt-4 sm:mt-6 hidden sm:block w-full overflow-hidden rounded-2xl border border-slate-200 p-4 shadow-sm sm:p-5 lg:p-6">
              <div className="career-detail-insights fd-about-stats fd-hero-metrics grid w-full grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
                {insights.map((item) => (
                  <article
                    key={item.label}
                    className="career-detail-insight-card fd-stat-card fd-about-stat-card flex min-h-[92px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm"
                  >
                    <p className="fd-copy fd-field-label w-full text-[0.65rem] tracking-[0.12em]">
                      {item.label}
                    </p>
                    <p className="career-detail-insight-value fd-copy fd-body-text mt-1.5 w-full text-base leading-tight sm:text-lg">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-3 sm:mt-4 text-sm text-slate-600 hidden sm:block">
              <span className="font-semibold text-slate-800">Location:</span> {role.location}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="career-detail-body">
        <div className="career-detail-rail py-6 sm:py-14">
          <div className="career-detail-layout grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-stretch lg:gap-10 xl:gap-12">
            <div className="career-detail-content space-y-8 sm:space-y-10 min-w-0">
              {roleIntro ? (
                <SectionBlock title="About this role">
                  <p>{roleIntro}</p>
                </SectionBlock>
              ) : null}

              {role.responsibilities?.length > 0 ? (
                <SectionBlock title="What you’ll do">
                  <BulletList items={role.responsibilities} />
                </SectionBlock>
              ) : null}

              {hasQualifications ? (
                <SectionBlock title="What we’re looking for">
                  <QualGroup label="Minimum qualifications" items={qualifications.minimum} />
                  <QualGroup label="Preferred qualifications" items={qualifications.preferred} />
                </SectionBlock>
              ) : null}

              <RoleSidebarExtras role={role} />
            </div>

            <ApplyPanel role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}
