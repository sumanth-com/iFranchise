import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitBrandApplication } from '../../lib/forms';

const INDUSTRIES = [
  'Food & Beverage', 'Health & Wellness', 'Education', 'Retail',
  'Technology', 'Home Services', 'Entertainment', 'Other',
];
const MODELS = ['FOFO', 'FOCO', 'FICO', 'Not Sure Yet'];
const BUDGETS = ['Under Rs.25L', 'Rs.25L - Rs.50L', 'Rs.50L - Rs.1Cr', 'Rs.1Cr - Rs.5Cr', 'Rs.5Cr+'];
const EXPANSION_GOALS = ['1-3 cities', '4-10 cities', '10-25 cities', '25+ cities'];

const inputClass =
  'lyb-form-field w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-black placeholder:text-slate-400 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25';
const labelClass = 'mb-1 block text-[0.62rem] font-bold uppercase tracking-wider';

function Field({ label, required, children, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={labelClass}>
        {label}
        {required && <span className="ml-0.5 text-violet-600">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function HeroBrandInquiryForm({ id = 'hero-brand-inquiry' }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    brandName: '', name: '', email: '', phone: '',
    industry: '', outlets: '', budget: '', cityGoal: '', model: '', vision: '',
  });
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      timeline: '3-6 months',
      founded: '',
      hasSOPs: '',
      hasDocs: '',
      company: form.brandName,
    };
    const result = await submitBrandApplication(payload, 'list_your_brand_hero');
    setSubmitting(false);
    if (result.success) setSubmitted(true);
    else alert(result.error || 'Submission failed. Please try again.');
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="lyb-hero-form w-full justify-self-end lg:max-w-[480px]"
    >
      <motion.div className="lyb-form-panel relative flex w-full flex-col overflow-hidden rounded-2xl border border-violet-400/40 bg-gradient-to-br from-white/[0.14] to-white/[0.07] p-5 sm:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

        <div className="mb-4 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <p className="lyb-form-eyebrow text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white">Brand inquiry</p>
            <h2 className="lyb-form-title text-lg font-extrabold text-white">Start Your Listing</h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-1 text-[0.58rem] font-bold uppercase text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-bold text-white">Application received</p>
              <p className="mt-1 text-xs text-white">We&apos;ll contact you within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Brand Name" required>
                  <input className={inputClass} value={form.brandName} onChange={(e) => set('brandName', e.target.value)} required />
                </Field>
                <Field label="Founder" required>
                  <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} required />
                </Field>
                <Field label="Email" required>
                  <input type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} required />
                </Field>
                <Field label="Phone" required>
                  <input type="tel" className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91" required />
                </Field>
                <Field label="Category" required>
                  <select className={inputClass} value={form.industry} onChange={(e) => set('industry', e.target.value)} required>
                    <option value="">Select</option>
                    {INDUSTRIES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Locations">
                  <input className={inputClass} value={form.outlets} onChange={(e) => set('outlets', e.target.value)} placeholder="e.g. 12" />
                </Field>
                <Field label="Investment">
                  <select className={inputClass} value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                    <option value="">Range</option>
                    {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Expansion Goal" required>
                  <select className={inputClass} value={form.cityGoal} onChange={(e) => set('cityGoal', e.target.value)} required>
                    <option value="">Goal</option>
                    {EXPANSION_GOALS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Franchise Model" required className="col-span-2">
                  <select className={inputClass} value={form.model} onChange={(e) => set('model', e.target.value)} required>
                    <option value="">Select model</option>
                    {MODELS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Expansion vision" className="col-span-2">
                  <textarea
                    className={`${inputClass} min-h-[52px] resize-none`}
                    value={form.vision}
                    onChange={(e) => set('vision', e.target.value)}
                    rows={2}
                    placeholder="Target cities, timeline, goals…"
                  />
                </Field>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="lyb-hero-form-submit mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-lg transition disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit Brand Inquiry'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
