import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../lib/navigation';
import {
  CAREERS_APPLY_EMAIL,
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

function SectionBlock({ title, children, highlight = false }) {
  return (
    <section
      className={
        highlight
          ? 'career-detail-highlight rounded-2xl border border-violet-200 bg-violet-50/80 p-6 sm:p-7'
          : ''
      }
    >
      <h2 className="career-detail-section-title text-lg font-bold text-slate-900 mb-3">{title}</h2>
      <div className="career-detail-prose text-[15px] text-slate-700 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ApplyPanel({ role }) {
  const email = role.applyEmail || CAREERS_APPLY_EMAIL;
  const subject = encodeURIComponent(`Application: ${role.title}`);
  const mailto = `mailto:${email}?subject=${subject}`;

  return (
    <aside className="career-detail-form lg:col-span-1">
      <div className="career-detail-form-sticky lg:sticky lg:top-24">
        <div className="career-detail-form-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Apply now</p>
          <h3 className="mt-2 text-lg font-bold text-slate-900">Ready to create with us?</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{role.applyNote}</p>

          <a
            href={mailto}
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-violet-700"
          >
            Email {email}
          </a>

          <p className="mt-4 text-center text-xs text-slate-500">
            Include resume, portfolio, social handles, and your best content samples.
          </p>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Hiring process</p>
            <ol className="space-y-3">
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
          </div>
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

  if (!role || !role.active) {
    return null;
  }

  const deptClass = (isDark ? DEPT_COLORS_DARK : DEPT_COLORS)[role.dept] || DEPT_COLORS.Marketing;
  const modeClass = (isDark ? MODE_COLORS_DARK : MODE_COLORS)[role.mode] || MODE_COLORS.Remote;

  const insights = [
    { label: 'Duration', value: role.duration },
    { label: 'Stipend', value: role.stipend },
    { label: 'Working days', value: role.workingDays },
    { label: 'Working hours', value: role.workingHours },
  ].filter((item) => item.value);

  return (
    <div className="career-detail-page relative z-10 min-h-screen text-theme-primary">
      <div className="career-detail-hero border-b border-slate-200 bg-gradient-to-br from-violet-50/90 via-white to-indigo-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-12 py-5 sm:py-12">
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

            <p className="career-detail-mobile-summary mt-3 text-xs text-slate-600 leading-snug sm:hidden">
              {role.location}
              {role.duration ? ` · ${role.duration}` : ''}
              {role.stipend ? ` · ${role.stipend}` : ''}
            </p>

            <div className="career-detail-insights mt-4 sm:mt-6 hidden sm:grid sm:grid-cols-4 gap-3">
              {insights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
                  <p className="career-detail-insight-value mt-1 text-sm font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3 sm:mt-4 text-sm text-slate-600 hidden sm:block">
              <span className="font-semibold text-slate-800">Location:</span> {role.location}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="career-detail-body max-w-6xl mx-auto px-4 sm:px-8 xl:px-12 py-6 sm:py-14">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12">
          <div className="career-detail-content space-y-7 sm:space-y-10">
            <SectionBlock title="About iFranchise">
              <p>{role.about}</p>
            </SectionBlock>

            <SectionBlock title="The opportunity" highlight>
              {role.opportunityPrompts?.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {role.opportunityPrompts.map((prompt) => (
                    <li key={prompt} className="font-medium text-slate-800">
                      {prompt}
                    </li>
                  ))}
                </ul>
              )}
              <p>{role.aboutRole}</p>
            </SectionBlock>

            {role.keySkills?.length > 0 && (
              <SectionBlock title="What we’re looking for">
                <BulletList items={role.keySkills} />
              </SectionBlock>
            )}

            <SectionBlock title="What you’ll be doing">
              <BulletList items={role.responsibilities} />
            </SectionBlock>

            <SectionBlock title="You’re a great fit if you…">
              <BulletList items={role.requirements} />
            </SectionBlock>

            <SectionBlock title="Why join iFranchise?">
              <p>{role.whyJoin}</p>
            </SectionBlock>
          </div>

          <ApplyPanel role={role} />
        </div>
      </div>
    </div>
  );
}
