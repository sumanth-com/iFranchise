import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ROLES, DEPT_COLORS, MODE_COLORS, ROLE_TOOLS, HIRING_STEPS } from './careersData.jsx';
import { submitJobApplication } from '@/lib/forms';
import { useFormSubmission, withHoneypot } from '../hooks/useFormSubmission';
import FormSuccessState from './forms/FormSuccessState';
import HoneypotField from './forms/HoneypotField';

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

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// ─── Application Form ─────────────────────────────────────────────────────────

function ApplicationForm({ roleTitle }) {
  const {
    values: form,
    setField,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    initialValues: JOB_APP_INITIAL,
    onSubmit: (data) =>
      submitJobApplication({ ...data, roleId: roleTitle, roleTitle }, 'career_detail'),
  });

  const set = (e) => setField(e.target.name, e.target.value);

  if (isSuccess) {
    return (
      <FormSuccessState
        title="Application submitted!"
        description={`We'll review your application for ${roleTitle} and get back within 5 business days.`}
        onReset={resetForm}
      />
    );
  }

  const inp = "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white";
  const lbl = "block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="relative space-y-3.5">
      <HoneypotField value={form._hp} onChange={setField} />
      <div>
        <label className={lbl}>Full Name</label>
        <input name="name" value={form.name} onChange={set} required placeholder="Your full name" className={inp} />
      </div>
      <div>
        <label className={lbl}>Portfolio / Website URL</label>
        <input name="portfolio" value={form.portfolio} onChange={set} placeholder="https://yourportfolio.com" className={inp} />
      </div>
      <div>
        <label className={lbl}>Resume <span className="normal-case text-violet-600">(Google Drive URL)</span></label>
        <input name="resume" value={form.resume} onChange={set} required placeholder="https://drive.google.com/..." className={inp} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Email</label>
          <input name="email" type="email" value={form.email} onChange={set} required placeholder="you@email.com" className={inp} />
        </div>
        <div>
          <label className={lbl}>Phone</label>
          <input name="phone" type="tel" value={form.phone} onChange={set} required placeholder="(+91) - *********" pattern="[\+]?[0-9\s\-\(\)]{10,20}" inputMode="tel" className={inp} />
        </div>
      </div>
      <div>
        <label className={lbl}>LinkedIn URL <span className="normal-case text-violet-600">(optional)</span></label>
        <input name="linkedin" value={form.linkedin} onChange={set} placeholder="https://linkedin.com/in/..." className={inp} />
      </div>
      <div>
        <label className={lbl}>Why are you interested in this role?</label>
        <textarea name="interest" value={form.interest} onChange={set} required rows={3} placeholder="Tell us what excites you about this opportunity..." className={`${inp} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-purple-solid w-full flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
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
        <p className="text-center text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}
      <div className="flex items-start gap-2 pt-0.5">
        <svg className="w-3.5 h-3.5 text-violet-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Your information is securely reviewed only by our hiring team.
        </p>
      </div>
    </form>
  );
}

// ─── Career Detail Page ───────────────────────────────────────────────────────

function CareerDetailPage({ roleId }) {
  const role = ROLES.find((r) => r.id === roleId);
  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(deadline.getDate() + 30);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [roleId]);

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

  const sectionTitle = 'text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200';
  const bodyText = 'text-[15px] text-slate-700 leading-relaxed';

  return (
    <div className="career-detail-page relative z-10 bg-white text-slate-900 min-h-screen pt-16">

      {/* Sticky top bar */}
      <div className="sticky top-20 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 h-16 flex items-center gap-3">
          <button
            onClick={() => navigateTo('/careers')}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-violet-700 transition-colors group shrink-0"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Careers
          </button>
          <span className="text-slate-300 hidden sm:block">|</span>
          <span className="text-sm text-slate-600 truncate hidden sm:block font-medium">{role.title}</span>
          <div className="ml-auto shrink-0">
            <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${DEPT_COLORS[role.dept] || 'bg-violet-100 text-violet-800 border border-violet-200'}`}>
              {role.dept}
            </span>
          </div>
        </div>
      </div>

      {/* Hero header */}
      <div className="relative border-b border-slate-200 bg-white">
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-10 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">{role.title}</h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-7 leading-relaxed">{role.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {[
                { d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: `Posted: ${fmt(today)}` },
                { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: `Deadline: ${fmt(deadline)}` },
                { d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: role.location },
              ].map(({ d, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
                  {label}
                </span>
              ))}
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${MODE_COLORS[role.mode]}`}>{role.mode}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-800 bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-full">{role.salary}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-8 sm:py-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="space-y-9"
          >
            <section>
              <h2 className={sectionTitle}>Quick Insights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickInsights.map(({ label, value }) => (
                  <div key={label} className="rounded-xl px-4 py-3 border border-slate-200 bg-slate-50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-slate-900 leading-snug">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Why Join This Role?</h2>
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
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
                      <p className="text-sm font-bold text-slate-900 mb-0.5">{s.title}</p>
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
                  <span key={tool} className="text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full hover:border-violet-300 hover:bg-violet-50 transition-all duration-200">
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Perks & Benefits</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-sm text-slate-700 rounded-xl px-3 py-2.5 border border-slate-200 bg-white">
                    <svg className="w-3.5 h-3.5 text-violet-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {perk}
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* RIGHT — Sticky form */}
          <div className="lg:sticky lg:top-[136px] self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
              <div className="mb-5">
                <h3 className="text-base font-bold text-slate-900 mb-1">Apply for this role</h3>
                <p className="text-xs text-slate-500">Takes under 3 minutes · We read every application</p>
              </div>
              <ApplicationForm roleTitle={role.title} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CareerDetailPage;
