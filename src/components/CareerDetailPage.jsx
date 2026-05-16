import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ROLES, DEPT_COLORS, MODE_COLORS, ROLE_TOOLS, HIRING_STEPS } from './careersData.jsx';
import { submitJobApplication } from '@/lib/forms';

const fmt = (d) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// ─── Application Form ─────────────────────────────────────────────────────────

function ApplicationForm({ roleTitle }) {
  const [form, setForm] = useState({ name: '', portfolio: '', resume: '', email: '', phone: '', linkedin: '', interest: '' });
  const [status, setStatus] = useState('idle');
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formDataWithRole = {
      ...form,
      roleId: roleTitle,
      roleTitle: roleTitle
    };
    
    const result = await submitJobApplication(formDataWithRole, 'career_detail');
    
    if (result.success) {
      setStatus('success');
    } else {
      console.error('[CareerDetailPage] Submission failed:', result.error);
      setStatus('idle');
      alert(result.error || 'Submission failed. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/35 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white mb-1.5">Application Submitted!</h3>
        <p className="text-sm text-violet-200 max-w-xs leading-relaxed">
          We'll review your application for <strong>{roleTitle}</strong> and get back within 5 business days.
        </p>
      </div>
    );
  }

  const inp = "w-full px-3.5 py-2.5 border border-violet-500/25 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white";
  const lbl = "block text-[10px] font-bold text-violet-300 mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div>
        <label className={lbl}>Full Name</label>
        <input name="name" value={form.name} onChange={set} required placeholder="Your full name" className={inp} />
      </div>
      <div>
        <label className={lbl}>Portfolio / Website URL</label>
        <input name="portfolio" value={form.portfolio} onChange={set} placeholder="https://yourportfolio.com" className={inp} />
      </div>
      <div>
        <label className={lbl}>Resume <span className="normal-case text-violet-400">(Google Drive URL)</span></label>
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
        <label className={lbl}>LinkedIn URL <span className="normal-case text-violet-400">(optional)</span></label>
        <input name="linkedin" value={form.linkedin} onChange={set} placeholder="https://linkedin.com/in/..." className={inp} />
      </div>
      <div>
        <label className={lbl}>Why are you interested in this role?</label>
        <textarea name="interest" value={form.interest} onChange={set} required rows={3} placeholder="Tell us what excites you about this opportunity..." className={`${inp} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold py-3 rounded-xl hover:bg-violet-700 transition-all duration-200 hover:shadow-md hover:shadow-violet-500/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {status === 'loading' ? (
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
      <div className="flex items-start gap-2 pt-0.5">
        <svg className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p className="text-[11px] text-violet-300/80 leading-relaxed">
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
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 text-white">
        <p className="text-violet-300 text-sm mb-4">Role not found.</p>
        <button onClick={() => navigateTo('/careers')} className="text-sm font-semibold text-white hover:underline">
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

  return (
    <div className="relative z-10 bg-transparent text-white min-h-screen pt-20">

      {/* Sticky top bar - Fixed to stay visible while scrolling */}
      <div className="sticky top-20 z-50 bg-[#0a0618]/92 backdrop-blur-md border-b border-violet-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 h-16 flex items-center gap-3">
          <button
            onClick={() => navigateTo('/careers')}
            className="flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white transition-colors group shrink-0"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Careers
          </button>
          <span className="text-violet-500/40 hidden sm:block">|</span>
          <span className="text-sm text-white/90 truncate hidden sm:block font-medium">{role.title}</span>
          <div className="ml-auto shrink-0">
            <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${DEPT_COLORS[role.dept] || 'bg-violet-500/15 text-white border border-violet-400/35'}`}>
              {role.dept}
            </span>
          </div>
        </div>
      </div>

      {/* Hero header */}
      <div
        className="relative border-b border-violet-500/20"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(167,139,250,0.2) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0618]/40 to-[#0a0618] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-10 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">{role.title}</h1>
            <p className="text-base sm:text-lg text-violet-200 max-w-2xl mb-7 leading-relaxed">{role.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {[
                { d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: `Posted: ${fmt(today)}` },
                { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: `Deadline: ${fmt(deadline)}` },
                { d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: role.location },
              ].map(({ d, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-violet-500/15 backdrop-blur-sm border border-violet-400/30 px-3 py-1.5 rounded-full shadow-sm">
                  <svg className="w-3.5 h-3.5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
                  {label}
                </span>
              ))}
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shadow-sm ${MODE_COLORS[role.mode]}`}>{role.mode}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-violet-500/20 backdrop-blur-sm border border-violet-400/35 px-3 py-1.5 rounded-full shadow-sm">{role.salary}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 xl:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="space-y-9"
          >
            {/* Quick Insights */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25">Quick Insights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickInsights.map(({ label, value }) => (
                  <div key={label} className="card-premium-dark-inner rounded-xl px-4 py-3 border border-violet-500/15">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300/80 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white leading-snug">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Join */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25">Why Join This Role?</h2>
              <div className="bg-violet-500/12 border border-violet-400/35 rounded-2xl p-5">
                <p className="text-[15px] text-white leading-relaxed">{role.whyJoin}</p>
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25">About the Role</h2>
              <p className="text-[15px] text-white/90 leading-relaxed">{role.about}</p>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25">Responsibilities</h2>
              <ul className="space-y-3">
                {role.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-white/90">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25">Requirements</h2>
              <ul className="space-y-3">
                {role.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-white/90">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Hiring Process */}
            <section>
              <h2 className="text-base font-bold text-white mb-5 pb-3 border-b border-violet-500/25">Hiring Process</h2>
              <div className="space-y-4">
                {HIRING_STEPS.map((s, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold">{s.step}</div>
                    <div className="pt-0.5">
                      <p className="text-sm font-bold text-white mb-0.5">{s.title}</p>
                      <p className="text-sm text-violet-200 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-b border-violet-500/25">Tools You'll Use</h2>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="text-sm font-medium text-white bg-violet-500/12 border border-violet-400/30 px-4 py-2 rounded-full hover:border-violet-300 hover:bg-violet-500/20 transition-all duration-200">
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Perks */}
            <section>
              <h2 className="text-base font-bold text-white mb-4 pb-3 border-violet-500/25 border-b">Perks & Benefits</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-sm text-white/95 card-premium-dark-inner rounded-xl px-3 py-2.5 border border-violet-500/15">
                    <svg className="w-3.5 h-3.5 text-violet-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
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
            <div className="card-premium-dark border border-violet-500/25 rounded-3xl p-6 shadow-[0_16px_48px_rgba(0,0,0,0.45)]">
              <div className="mb-5">
                <h3 className="text-base font-bold text-white mb-1">Apply for this role</h3>
                <p className="text-xs text-violet-300/80">Takes under 3 minutes · We read every application</p>
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
