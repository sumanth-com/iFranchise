import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitBrandApplication } from '../lib/forms';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from './forms/PhoneInput';
import { useFormSubmission, withHoneypot } from '../hooks/useFormSubmission';
import FormSuccessState from './forms/FormSuccessState';
import HoneypotField from './forms/HoneypotField';
import StateLocationFields from './forms/StateLocationFields';
import { navigateTo } from '@/lib/navigation';
import { useTheme } from '../context/ThemeContext';
import { TYPE } from '../lib/typography.js';
import SectionPill from './ui/SectionPill';
import { FiArrowRight } from 'react-icons/fi';
import {
  HowItWorksSection,
  ListYourBrandFAQSection,
  ReadinessBannerSection,
  WhoCanListSection,
  WhyListSection,
  WhyTrustSection,
} from './list-your-brand/ListYourBrandSections';

const BRAND_APP_INITIAL = withHoneypot({
  brandName: '',
  name: '',
  email: '',
  phone: createEmptyPhoneValue(),
  industry: '',
  state: '',
  city: '',
  outlets: '',
  vision: '',
});

const LYB_SECTION = 'relative overflow-hidden bg-transparent py-7 lg:py-9';
const HERO_VIEWPORT_H = 'calc(100vh - 80px)';
const LYB_EASE = [0.22, 1, 0.36, 1];
const LYB_ENTER = { duration: 0.42, ease: LYB_EASE };
const LYB_REVEAL = { duration: 0.36, ease: LYB_EASE };

function scrollToHeroInquiry() {
  document.getElementById('lyb-hero-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => {
    const firstField = document.querySelector(
      '#hero-brand-inquiry input:not([type="hidden"]), #hero-brand-inquiry select, #hero-brand-inquiry textarea',
    );
    firstField?.focus({ preventScroll: true });
  }, 420);
}

const LYB_MOBILE_MQ = '(max-width: 1023px)';

function ListYourBrandMobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const formEl = document.getElementById('hero-brand-inquiry');
    if (!formEl) return undefined;

    const mq = window.matchMedia(LYB_MOBILE_MQ);

    const updateVisibility = (isIntersecting) => {
      setVisible(mq.matches && !isIntersecting);
    };

    observerRef.current = new IntersectionObserver(
      ([entry]) => updateVisibility(entry.isIntersecting),
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' },
    );
    observerRef.current.observe(formEl);

    const onMqChange = () => {
      if (!mq.matches) setVisible(false);
    };
    mq.addEventListener('change', onMqChange);

    return () => {
      observerRef.current?.disconnect();
      mq.removeEventListener('change', onMqChange);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="lyb-mobile-sticky-cta"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: LYB_EASE }}
          className="lyb-mobile-sticky-cta fixed inset-x-0 top-16 z-[9998] flex items-center justify-center border-b border-violet-500/25 bg-[#0a0618]/95 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md lg:hidden"
          role="region"
          aria-label="List your brand"
        >
          <button
            type="button"
            onClick={scrollToHeroInquiry}
            className="lyb-mobile-sticky-cta-btn btn-purple-solid flex w-full max-w-[20rem] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-lg shadow-violet-900/30"
          >
            List Your Brand
            <FiArrowRight aria-hidden />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ListYourBrandHeroSection() {
  return (
    <section
      id="lyb-hero-section"
      className={`lyb-hero-section ${LYB_SECTION} flex w-full flex-col justify-center overflow-hidden py-6 sm:py-8 lg:py-6`}
      style={{ minHeight: HERO_VIEWPORT_H, maxHeight: HERO_VIEWPORT_H }}
    >
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col justify-center">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 xl:max-w-[1360px]">
          <div className="grid min-h-0 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(500px,600px)] lg:gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(540px,640px)] xl:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={LYB_ENTER}
              className="lyb-hero-copy flex max-w-md flex-col gap-4 lg:max-w-lg"
            >
              <SectionPill className="w-fit">For Brand Owners</SectionPill>

              <h1 className={`lyb-hero-title ${TYPE.pageHero} text-white lg:!text-[2.25rem] lg:!leading-[1.15]`}>
                Expand Your Brand Across India Through Franchising
              </h1>

              <p className="lyb-hero-subtext text-sm leading-relaxed sm:text-base">
                Reach serious franchise investors and expansion partners on India&apos;s franchise growth platform.
              </p>

              <div className="flex flex-col items-start gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('/contact-us')}
                  className="btn-purple-solid lyb-hero-cta inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-violet-900/25 sm:w-auto"
                >
                  Talk To Franchise Expert
                  <FiArrowRight aria-hidden />
                </button>
                <p className="lyb-hero-cta-hint text-xs text-violet-200/70">
                  Or submit the form to list your brand — reviewed within one business day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...LYB_ENTER }}
              className="lyb-hero-form-slot flex min-h-0 w-full"
            >
              <HeroBrandInquiryForm id="hero-brand-inquiry" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ForBrandOwnersPage() {
  return (
    <main className="list-your-brand-page relative z-10 overflow-x-hidden bg-transparent text-white">
      <ListYourBrandMobileStickyCta />
      <ListYourBrandHeroSection />
      <WhyListSection />
      <HowItWorksSection />
      <WhoCanListSection />
      <WhyTrustSection />
      <ReadinessBannerSection />
      <ListYourBrandFAQSection />
    </main>
  );
}

/* ——— Hero brand inquiry form (unchanged integration) ——— */

const HERO_FORM_INDUSTRIES = [
  'Food & Beverage', 'Health & Wellness', 'Education', 'Retail',
  'Technology', 'Home Services', 'Entertainment', 'Other',
];
const inputClass =
  'lyb-form-field site-form-field w-full min-h-[40px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-black placeholder:text-slate-400 shadow-sm transition';
const selectClass = `${inputClass} lyb-form-select cursor-pointer pr-10`;

function SelectChevron() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SelectField({ className, children, ...props }) {
  return (
    <div className="lyb-form-select-wrap relative">
      <select className={className} {...props}>
        {children}
      </select>
      <span className="lyb-form-select-chevron pointer-events-none absolute inset-y-0 right-2.5 flex items-center" aria-hidden>
        <SelectChevron />
      </span>
    </div>
  );
}

function Field({ label, required, children, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="lyb-form-label mb-1 block text-[0.68rem] font-bold uppercase tracking-wide">
        {label}
        {required && (
          <span className="lyb-form-required ml-0.5 inline-block text-[0.85em] font-black text-rose-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function HeroBrandInquiryForm({ id = 'hero-brand-inquiry' }) {
  const { theme } = useTheme();
  const {
    values: form,
    setField: set,
    isSubmitting: submitting,
    isSuccess: submitted,
    submitError,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formKey: 'list_your_brand_hero',
    initialValues: BRAND_APP_INITIAL,
    onSubmit: (formValues, { signal }) => {
      const payload = {
        ...formValues,
        timeline: '3-6 months',
        founded: '',
        hasSOPs: '',
        hasDocs: '',
        company: formValues.brandName,
      };
      return submitBrandApplication(payload, 'list_your_brand_hero', { signal });
    },
  });

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={LYB_REVEAL}
      className="lyb-hero-form relative flex min-h-0 w-full flex-1 flex-col"
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div className="lyb-form-panel relative flex max-h-[min(100%,calc(100dvh-6.5rem))] w-full flex-col overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-[#1a0f3d] via-[#12082a] to-[#0a0618] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45)] sm:p-5 lg:max-h-[calc(100dvh-7rem)] lg:p-5">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,0.22),transparent)]"
          aria-hidden
        />

        <div className="relative mb-3 shrink-0 border-b border-white/10 pb-3">
          <p className="lyb-form-eyebrow text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/90">Brand inquiry</p>
          <h2 className={`lyb-form-title mt-0.5 ${TYPE.formTitle} text-white`}>Start Your Listing</h2>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <FormSuccessState
              key="ok"
              title="Application received"
              description="We'll contact you within 24 hours."
              onReset={resetForm}
              variant={theme === 'light' ? 'default' : 'dark'}
              className="py-4"
            />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="relative flex min-h-0 flex-1 flex-col"
            >
              <HoneypotField value={form._hp} onChange={set} />
              <div className="lyb-hero-form-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                <Field label="Brand Name" required>
                  <input
                    className={inputClass}
                    value={form.brandName}
                    onChange={(e) => set('brandName', e.target.value)}
                    placeholder="e.g. Chai & Co"
                    required
                  />
                </Field>
                <Field label="Your Full Name" required>
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@brand.com"
                    required
                  />
                </Field>
                <Field label="Phone" required>
                  <PhoneInput
                    id="brand-owners-phone"
                    required
                    variant="default"
                    value={form.phone}
                    onChange={(value) => set('phone', value)}
                  />
                </Field>
                <Field label="Category" required>
                  <SelectField className={selectClass} value={form.industry} onChange={(e) => set('industry', e.target.value)} required>
                    <option value="">Select category</option>
                    {HERO_FORM_INDUSTRIES.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="No. of outlets">
                  <input
                    className={inputClass}
                    value={form.outlets}
                    onChange={(e) => set('outlets', e.target.value)}
                    placeholder="e.g. 12 outlets"
                  />
                </Field>
                <StateLocationFields
                  className="sm:col-span-2"
                  layout="row"
                  variant="light"
                  showHint={false}
                  stateValue={form.state}
                  cityValue={form.city}
                  onStateChange={(v) => set('state', v)}
                  onCityChange={(v) => set('city', v)}
                  stateClassName={selectClass}
                  cityClassName={inputClass}
                  labelClassName="lyb-form-label mb-1.5 block text-[0.68rem] font-bold uppercase tracking-wide text-white/90"
                />
                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    className={`${inputClass} lyb-form-message min-h-[3.75rem] resize-none py-2`}
                    value={form.vision}
                    onChange={(e) => set('vision', e.target.value)}
                    rows={2}
                    placeholder="Tell us about your brand and how you want to scale…"
                  />
                </Field>
                </div>
              </div>
              {submitError && (
                <p className="mt-2 text-center text-xs text-red-300" role="alert">
                  {submitError}
                </p>
              )}
              <div className="mt-3 shrink-0 border-t border-white/10 pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="lyb-hero-form-submit flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold shadow-lg transition disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit Brand Inquiry'}
              </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
