import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ROLES, HIRING_ACTIVE, DEPT_COLORS, DEPT_COLORS_DARK, MODE_COLORS, MODE_COLORS_DARK, ROLE_TOOLS, HIRING_STEPS } from './careersData.jsx';
import { digitsOnlyPhone, phoneInputProps } from '@/lib/phoneInput';
import { submitJobApplication } from '@/lib/forms';
import { useTheme } from '../context/ThemeContext';
import { useFormSubmission, withHoneypot } from '../hooks/useFormSubmission';
import FormSuccessState from './forms/FormSuccessState';
import HoneypotField from './forms/HoneypotField';
import { navigateTo } from '@/lib/navigation';
import { TYPE } from '../lib/typography.js';

const JOB_APP_INITIAL = withHoneypot({
  name: '',
  portfolio: '',
  resume: '',
  email: '',
  phone: '',
  linkedin: '',
  interest: '',
});

const fmt = (d) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

// --- Application Form ---------------------------------------------------------

function ApplicationForm({ roleTitle, isDark }) {
  const {
    values: form,
    setField,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formKey: `career_detail:${roleTitle}`,
    initialValues: JOB_APP_INITIAL,
    onSubmit: (data, { signal }) =>
      submitJobApplication({ ...data, roleId: roleTitle, roleTitle }, 'career_detail', { signal }),
  });

  const set = (e) => {
    const { name, value } = e.target;
    setField(name, name === 'phone' ? digitsOnlyPhone(value) : value);
  };

  if (isSuccess) {
    return (
      <FormSuccessState
        title="Application submitted!"
        description={`We'll review your application for ${roleTitle} and get back within 5 business days.`}
        onReset={resetForm}
      />
    );
  }

  const inp = isDark
    ? 'career-detail-form-input w-full px-3 py-2 border border-violet-500/30 rounded-lg text-sm text-white placeholder-violet-300/45 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-[rgba(15,10,35,0.85)]'
    : 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white';
  const lbl = isDark
    ? 'block text-[10px] font-bold text-white mb-1 uppercase tracking-wider'
    : 'block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider';
  const hint = isDark ? 'normal-case text-violet-300 font-normal' : 'normal-case text-violet-600';

  return (
    <form onSubmit={handleSubmit} className="career-detail-form flex flex-col gap-2.5">
      <HoneypotField value={form._hp} onChange={setField} />
      <div>
        <label className={lbl}>Full Name</label>
        <input name="name" value={form.name} onChange={set} required placeholder="Your full name" className={inp} />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className={lbl}>Email</label>
          <input name="email" type="email" value={form.email} onChange={set} required placeholder="you@email.com" className={inp} />
        </div>
        <div>
          <label className={lbl}>Phone</label>
          <input name="phone" value={form.phone} onChange={set} required className={inp} {...phoneInputProps()} />
        </div>
      </div>
      <div>
        <label className={lbl}>Portfolio / Website URL</label>
        <input name="portfolio" value={form.portfolio} onChange={set} placeholder="https://yourportfolio.com" className={inp} />
      </div>
      <div>
        <label className={lbl}>Resume <span className={hint}>(Google Drive URL)</span></label>
        <input name="resume" value={form.resume} onChange={set} required placeholder="https://drive.google.com/..." className={inp} />
      </div>
      <div>
        <label className={lbl}>LinkedIn <span className={hint}>(optional)</span></label>
        <input name="linkedin" value={form.linkedin} onChange={set} placeholder="linkedin.com/in/..." className={inp} />
      </div>
      <div>
        <label className={lbl}>Why are you interested in this role?</label>
        <textarea
          name="interest"
          value={form.interest}
          onChange={set}
          required
          rows={3}
          placeholder="Tell us what excites you about this opportunity..."
          className={`${inp} resize-none min-h-[4.5rem] leading-relaxed`}
        />
      </div>
      <div className="flex flex-col gap-2 pt-0.5">
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-purple-solid w-full flex items-center justify-center gap-2 text-sm font-bold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M8 12h9" />
            </svg>
          </>
        )}
      </button>
      {submitError && (
        <p className="text-center text-xs text-red-400" role="alert">
          {submitError}
        </p>
      )}
        <p className={`flex items-center gap-1.5 text-[11px] leading-snug m-0 ${isDark ? 'text-white/65' : 'text-slate-500'}`}>
          <svg className="w-3.5 h-3.5 text-violet-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Your information is securely reviewed only by our hiring team.
        </p>
      </div>
    </form>
  );
}

// --- Career Detail Page -------------------------------------------------------

function CareerDetailPage({ roleId }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const role = ROLES.find((r) => r.id === roleId);
  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(deadline.getDate() + 30);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [roleId]);

  useEffect(() => {
    if (!HIRING_ACTIVE) {
      navigateTo('/careers');
    }
  }, []);

  if (!HIRING_ACTIVE) {
    return null;
  }

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-white text-slate-900">
        <p className="text-slate-600 text-sm mb-4">Role not found.</p>
        <button onClick={() => navigateTo('/careers')} className="text-sm font-semibold text-violet-700 hover:underline">
          Back to Careers
        </button>
      </div>
    );
  }

  const tools = ROLE_TOOLS[role.dept] || ROLE_TOOLS.Design;
  const perks = ['Competitive Salary', 'Flexible Hours', 'Remote Options', 'Learning Budget', 'Health Coverage', 'Team Offsites'];
  const quickInsights = [
    { label: 'Department', value: role.dept },
    { label: 'Reports To', value: role.reportsTo },
    { label: 'Experience', value: role.experience },
    { label: 'Work Model', value: role.mode },
    { label: 'Open Positions', value: role.openings },
    { label: 'Joining', value: role.joining },
    { label: 'Interview Rounds', value: role.rounds },
    { label: 'Employment', value: role.type },
    { label: 'Location', value: role.location },
  ];

  const sectionTitle = isDark
    ? 'career-detail-section-title text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25'
    : 'career-detail-section-title text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200';
  const bodyText = isDark
    ? 'career-detail-prose text-[15px] text-white leading-relaxed'
    : 'career-detail-prose text-[15px] text-slate-700 leading-relaxed';
  const mutedText = isDark ? 'text-white/90' : 'text-slate-600';
  const cardValueText = isDark ? 'text-white' : 'text-slate-900';
  const cardLabelText = isDark ? 'text-white/80' : 'text-slate-500';
  const pageBg = isDark ? 'bg-transparent' : 'bg-white';
  const sectionBg = isDark ? 'bg-transparent' : 'bg-white';
  const sectionBorder = isDark ? 'border-violet-500/20' : 'border-slate-200';

  return (
    <div className={`career-detail-page relative z-10 min-h-screen pt-16 ${pageBg} ${isDark ? 'text-white' : 'text-slate-900'}`}>

      {/* Hero header */}
      <div className={`career-detail-hero relative border-b ${sectionBorder} ${sectionBg} text-center`}>
        <div className="relative mx-auto max-w-4xl px-6 sm:px-8 xl:px-12 py-10 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center">
            <div className="mb-3">
              <span className={`career-detail-hero-pill inline-flex text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${isDark ? (DEPT_COLORS_DARK[role.dept] || 'bg-violet-500/30 text-violet-100 border-violet-400/45') : (DEPT_COLORS[role.dept] || 'bg-violet-100 text-violet-800 border border-violet-200')}`}>
                {role.dept}
              </span>
            </div>
            <h1 className={`${TYPE.heroListing} mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{role.title}</h1>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-7 leading-relaxed ${mutedText}`}>{role.tagline}</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: `Posted: ${fmt(today)}` },
                { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: `Deadline: ${fmt(deadline)}` },
                { d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: role.location },
              ].map(({ d, label }) => (
                <span key={label} className={`career-detail-hero-pill inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${isDark ? 'text-white bg-violet-500/25 border-violet-400/45' : 'text-slate-700 bg-slate-100 border-slate-200'}`}>
                  <svg className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-violet-300' : 'text-violet-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
                  {label}
                </span>
              ))}
              <span className={`career-detail-hero-pill career-detail-mode-pill inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${isDark ? MODE_COLORS_DARK[role.mode] : MODE_COLORS[role.mode]}`}>{role.mode}</span>
              <span className={`career-detail-hero-pill inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-violet-600/35 text-violet-100 border-violet-400/50' : 'text-violet-800 bg-violet-100 border-violet-200'}`}>{role.salary}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Two-column body */}
      <div className={`career-detail-body max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 py-8 sm:py-12 ${sectionBg}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(520px,580px)] gap-8 lg:gap-10 xl:gap-12 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="career-detail-content space-y-9"
          >
            <section>
              <h2 className={sectionTitle}>Quick Insights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickInsights.map(({ label, value }) => (
                  <div key={label} className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${cardLabelText}`}>{label}</p>
                    <p className={`career-detail-insight-value text-sm font-semibold leading-snug ${cardValueText}`}>{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Why Join This Role?</h2>
              <div className="career-detail-highlight bg-violet-50 border border-violet-200 rounded-2xl p-5">
                <p className={bodyText}>{role.whyJoin}</p>
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>About the Role</h2>
              <p className={bodyText}>{role.about}</p>
            </section>

            <section>
              <h2 className={sectionTitle}>Responsibilities</h2>
              <ul className="space-y-3">
                {role.responsibilities.map((r, i) => (
                  <li key={i} className={`flex items-start gap-3 ${bodyText}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={sectionTitle}>Requirements</h2>
              <ul className="space-y-3">
                {role.requirements.map((r, i) => (
                  <li key={i} className={`flex items-start gap-3 ${bodyText}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={sectionTitle}>Hiring Process</h2>
              <div className="space-y-4">
                {HIRING_STEPS.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold">{s.step}</div>
                    <div className="pt-0.5">
                      <p className={`text-sm font-bold mb-0.5 ${cardValueText}`}>{s.title}</p>
                      <p className={`text-sm ${bodyText}`}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Tools You'll Use</h2>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${isDark ? 'text-white/90 bg-violet-500/15 border border-violet-500/25 hover:border-violet-400/45 hover:bg-violet-500/25' : 'text-slate-700 bg-slate-100 border border-slate-200 hover:border-violet-300 hover:bg-violet-50'}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Perks & Benefits</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {perks.map((perk) => (
                  <div key={perk} className={`flex items-center gap-2 text-sm rounded-xl px-3 py-2.5 border ${isDark ? 'text-white/90 border-violet-500/25 bg-violet-500/10' : 'text-slate-700 border-slate-200 bg-white'}`}>
                    <svg className="w-3.5 h-3.5 text-violet-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {perk}
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* RIGHT - Sticky form */}
          <motion.div
            id="career-apply"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="career-detail-form-sticky lg:sticky lg:top-20 self-start lg:-mt-2 scroll-mt-24"
          >
            <div className={`career-detail-form-card h-fit w-full rounded-2xl border px-5 py-5 sm:px-6 sm:py-5 shadow-[0_16px_48px_rgba(15,23,42,0.08)] ${isDark ? 'border-violet-500/25 bg-[#12082a]' : 'border-slate-200 bg-white'}`}>
              <div className="mb-3">
                <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Apply for this role</h3>
                <p className={`text-xs leading-snug ${isDark ? 'text-white/70' : 'text-slate-500'}`}>Takes under 3 minutes - We read every application</p>
              </div>
              <ApplicationForm roleTitle={role.title} isDark={isDark} />
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}

export default CareerDetailPage;
