import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaButton from "../ui/CtaButton";

const STEPS = [
  {
    id: 1,
    title: "Your Brand",
    subtitle: "Tell us who you are",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Readiness",
    subtitle: "Your current infrastructure",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Growth Goals",
    subtitle: "Where you want to go",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Contact",
    subtitle: "How to reach you",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const WHAT_NEXT = [
  { step: "01", title: "Application Review",  desc: "Our team reviews your submission within 24 hours.",         time: "24 hrs"   },
  { step: "02", title: "Strategy Call",        desc: "A dedicated expansion manager schedules a discovery call.", time: "48 hrs"   },
  { step: "03", title: "Franchise Audit",      desc: "We assess your brand readiness in detail.",                time: "5-7 days" },
  { step: "04", title: "Expansion Proposal",   desc: "You receive a custom franchise expansion roadmap.",         time: "10 days"  },
];

const INDUSTRIES = ["Food & Beverage","Health & Wellness","Education","Retail","Technology","Home Services","Entertainment","Other"];
const MODELS     = ["FOFO - Franchise Owned & Operated","FOCO - Franchise Owned, Company Operated","FICO - Franchise Invested, Company Operated","Not Sure Yet"];
const TIMELINES  = ["Within 3 months","3-6 months","6-12 months","12+ months"];
const BUDGETS    = ["Under Rs.25L","Rs.25L - Rs.50L","Rs.50L - Rs.1Cr","Rs.1Cr - Rs.5Cr","Rs.5Cr+"];
const CITY_GOALS = ["1-3 cities","4-10 cities","10-25 cities","25+ cities (National)"];

function InputField({ label, type = "text", placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.7rem] font-bold uppercase tracking-wider text-white">
        {label}{required && <span className="text-violet-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
      />
    </div>
  );
}

function SelectField({ label, options, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.7rem] font-bold uppercase tracking-wider text-white">
        {label}{required && <span className="text-violet-500 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200 appearance-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
      >
        <option value="">Select an option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ChipSelect({ label, options, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.7rem] font-bold uppercase tracking-wider text-white">
        {label}{required && <span className="text-violet-500 ml-0.5">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold border transition-all duration-150 ${
              value === o
                ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                : "bg-white border-slate-200 text-white hover:border-violet-300 hover:text-violet-700"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BrandApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    brandName: "", industry: "", founded: "", outlets: "",
    model: "", hasSOPs: "", hasDocs: "",
    cityGoal: "", timeline: "", budget: "", vision: "",
    name: "", email: "", phone: "", company: "",
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 1) return form.brandName.trim() && form.industry;
    if (step === 2) return !!form.model;
    if (step === 3) return form.cityGoal && form.timeline;
    if (step === 4) return form.name.trim() && form.email.trim() && form.phone.trim();
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const result = await submitBrandApplication(form, 'brand_owners_page');
    
    setSubmitting(false);
    
    if (result.success) {
      setSubmitted(true);
    } else {
      console.error('[BrandApplicationForm] Submission failed:', result.error);
      alert(result.error || 'Submission failed. Please try again.');
    }
  };

  if (submitted) {
    return (
      <section className="relative overflow-hidden bg-transparent py-10 lg:py-14">
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-200">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-white mb-3">Application Received</motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white text-base mb-10 leading-relaxed">
            Thank you, <span className="text-slate-900 font-semibold">{form.name}</span>. Our expansion team will review{" "}
            <span className="text-violet-600 font-semibold">{form.brandName}</span> and reach out within 24 hours.
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WHAT_NEXT.map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-[0.6rem] font-bold text-violet-500 uppercase tracking-wider mb-1">{w.time}</span>
                <span className="text-[0.78rem] font-bold text-slate-900 mb-0.5">{w.title}</span>
                <span className="text-[0.68rem] text-white leading-snug">{w.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-transparent py-10 lg:py-14">
      <motion.div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[0.68rem] font-bold uppercase tracking-widest text-white mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Brand Application
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.1] mb-3">
            List Your Brand on{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">iFranchise</span>
          </h2>
          <p className="text-white text-base max-w-xl mx-auto leading-relaxed">
            Complete this 4-step application. Our expansion team reviews every submission personally.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">

              {/* icon step indicator */}
              <div className="px-6 pt-6 pb-5 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center justify-between relative">
                  {/* connecting line */}
                  <div className="absolute top-5 left-5 right-5 h-px bg-slate-200 z-0" />
                  <motion.div
                    className="absolute top-5 left-5 h-px bg-gradient-to-r from-violet-500 to-indigo-500 z-0"
                    animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {STEPS.map((s, i) => {
                    const done = i < step - 1;
                    const active = step === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => done && setStep(s.id)}
                        className="relative z-10 flex flex-col items-center gap-2 group"
                        style={{ cursor: done ? "pointer" : "default" }}
                      >
                        <motion.div
                          animate={{
                            backgroundColor: active ? "#7c3aed" : done ? "#10b981" : "#f1f5f9",
                            scale: active ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.25 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-2 border-white"
                        >
                          {done ? (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                          ) : (
                            <span className={active ? "text-white" : "text-white"}>{s.icon}</span>
                          )}
                        </motion.div>
                        <div className="text-center hidden sm:block">
                          <p className={`text-[0.65rem] font-bold transition-colors duration-200 ${active ? "text-violet-700" : done ? "text-emerald-600" : "text-white"}`}>
                            {s.title}
                          </p>
                          <p className="text-[0.58rem] text-white">{s.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* step content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={step}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-5">

                    {step === 1 && <>
                      <div>
                        <p className="text-lg font-extrabold text-slate-900 mb-0.5">Tell us about your brand</p>
                        <p className="text-[0.78rem] text-white">Basic information to understand your business.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Brand Name" placeholder="e.g. BurgerBlast" value={form.brandName} onChange={v => set("brandName", v)} required />
                        <SelectField label="Industry" options={INDUSTRIES} value={form.industry} onChange={v => set("industry", v)} required />
                        <InputField label="Year Founded" type="number" placeholder="e.g. 2019" value={form.founded} onChange={v => set("founded", v)} />
                        <InputField label="Current Outlets" type="number" placeholder="e.g. 3" value={form.outlets} onChange={v => set("outlets", v)} />
                      </div>
                    </>}

                    {step === 2 && <>
                      <div>
                        <p className="text-lg font-extrabold text-slate-900 mb-0.5">Expansion readiness</p>
                        <p className="text-[0.78rem] text-white">Help us understand your current franchise infrastructure.</p>
                      </div>
                      <ChipSelect label="Preferred Franchise Model" options={MODELS} value={form.model} onChange={v => set("model", v)} required />
                      <ChipSelect label="Do you have documented SOPs?" options={["Yes, fully documented","Partially documented","Not yet"]} value={form.hasSOPs} onChange={v => set("hasSOPs", v)} />
                      <ChipSelect label="Legal franchise documents ready?" options={["Yes","In progress","Not started"]} value={form.hasDocs} onChange={v => set("hasDocs", v)} />
                    </>}

                    {step === 3 && <>
                      <div>
                        <p className="text-lg font-extrabold text-slate-900 mb-0.5">Your growth goals</p>
                        <p className="text-[0.78rem] text-white">Define your expansion ambitions so we can build the right strategy.</p>
                      </div>
                      <ChipSelect label="Target city expansion" options={CITY_GOALS} value={form.cityGoal} onChange={v => set("cityGoal", v)} required />
                      <ChipSelect label="Expansion timeline" options={TIMELINES} value={form.timeline} onChange={v => set("timeline", v)} required />
                      <ChipSelect label="Franchise investment range" options={BUDGETS} value={form.budget} onChange={v => set("budget", v)} />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.7rem] font-bold uppercase tracking-wider text-white">Brand Vision <span className="text-white normal-case tracking-normal font-normal">(optional)</span></label>
                        <textarea rows={3} placeholder="Describe your long-term franchise vision..."
                          value={form.vision} onChange={e => set("vision", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200 resize-none" />
                      </div>
                    </>}

                    {step === 4 && <>
                      <div>
                        <p className="text-lg font-extrabold text-slate-900 mb-0.5">Contact & consultation</p>
                        <p className="text-[0.78rem] text-white">Your dedicated expansion manager will reach out within 24 hours.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Full Name" placeholder="Your name" value={form.name} onChange={v => set("name", v)} required />
                        <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={v => set("phone", v)} required />
                        <InputField label="Email Address" type="email" placeholder="you@brand.com" value={form.email} onChange={v => set("email", v)} required />
                        <InputField label="Company / Brand Entity" placeholder="Legal entity name" value={form.company} onChange={v => set("company", v)} />
                      </div>
                      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-violet-50 border border-violet-200">
                        <svg className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <p className="text-[0.72rem] text-violet-700 leading-relaxed">Your information is confidential and only shared with our expansion team.</p>
                      </div>
                    </>}

                  </motion.div>
                </AnimatePresence>

                {/* navigation */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                  <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-white text-sm font-semibold hover:bg-slate-200 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    Back
                  </button>

                  {/* step dots */}
                  <div className="flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <span key={i} className={`rounded-full transition-all duration-300 ${
                        i === step - 1 ? "w-5 h-2 bg-violet-600" :
                        i < step - 1 ? "w-2 h-2 bg-emerald-400" :
                        "w-2 h-2 bg-slate-200"
                      }`} />
                    ))}
                  </div>

                  {step < STEPS.length ? (
                    <CtaButton
                      size="sm"
                      onClick={() => canNext() && setStep((s) => s + 1)}
                      disabled={!canNext()}
                    >
                      Continue
                    </CtaButton>
                  ) : (
                    <CtaButton
                      size="sm"
                      onClick={handleSubmit}
                      disabled={!canNext() || submitting}
                      showArrow={!submitting}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Submitting...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
                    </CtaButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* WHAT HAPPENS NEXT */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} className="space-y-3 lg:sticky lg:top-28">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white mb-4">What Happens Next</p>
            {WHAT_NEXT.map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-200">
                {i < WHAT_NEXT.length - 1 && (
                  <div className="absolute left-[27px] top-[52px] bottom-[-12px] w-px bg-gradient-to-b from-violet-300/60 to-transparent" />
                )}
                <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                  <span className="text-[0.6rem] font-extrabold text-violet-600">{w.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-[0.78rem] font-bold text-slate-900">{w.title}</p>
                    <span className="text-[0.6rem] font-semibold text-violet-500 shrink-0">{w.time}</span>
                  </div>
                  <p className="text-[0.7rem] text-white leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="text-[0.68rem] text-emerald-700 font-medium">200+ brands have started their journey this way.</p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
