import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { submitContactForm } from '@/lib/forms';
import { digitsOnlyPhone, isContactFormReady } from '@/lib/contactForm';
import { phoneInputProps } from '@/lib/phoneInput';
import { useTheme } from '../context/ThemeContext';
import { useFormSubmission, withHoneypot } from '../hooks/useFormSubmission';
import FormSuccessState from './forms/FormSuccessState';
import HoneypotField from './forms/HoneypotField';
import SocialFollowBlock from './footer/SocialFollowBlock';
import { sectionTitleClass } from '../lib/cardThemeStyles';
import { TYPE } from '../lib/typography.js';
import {
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONE_DISPLAY,
  SITE_CONTACT_PHONE_TEL,
  SITE_CONTACT_MAILTO,
} from '../data/siteContact';

const CONTACT_FORM_INITIAL = withHoneypot({
  fullName: '',
  contactNumber: '',
  email: '',
  company: '',
  message: '',
});

const FAQ_ITEMS = [
  {
    question: 'What is the typical investment range?',
    answer: 'Most opportunities on our platform start around Rs.20L and can go beyond Rs.2.5Cr depending on brand category and market potential.',
  },
  {
    question: 'How long does it take to break even?',
    answer: 'Break-even timelines vary by sector, but many franchise models we work with target 12 to 24 months with disciplined execution.',
  },
  {
    question: 'Do I need prior business experience?',
    answer: 'Not necessarily. Many successful partners are first-time operators and rely on structured onboarding, SOPs, and advisory support.',
  },
  {
    question: 'What support does iFranchise provide?',
    answer: 'We support brand matching, diligence, financial understanding, launch planning, and ongoing growth guidance after onboarding.',
  },
  {
    question: 'Can I operate multiple franchise units?',
    answer: 'Yes. Multi-unit expansion is available for many brands after performance milestones and market readiness checks are met.',
  },
];

const CONTACT_LINKS = [
  {
    title: 'Email us',
    value: SITE_CONTACT_EMAIL,
    href: SITE_CONTACT_MAILTO,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Call us',
    value: SITE_CONTACT_PHONE_DISPLAY,
    href: `tel:${SITE_CONTACT_PHONE_TEL}`,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
];

function ContactFAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className={`services-faq-item group relative overflow-hidden rounded-2xl border border-violet-500/20 theme-light-card bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm transition-all duration-300 ${isOpen ? 'is-open' : ''}`}
    >
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/5 to-indigo-600/10"
        />
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 sm:px-6 sm:py-5"
      >
        <span className="services-faq-question text-sm font-bold text-white transition-colors duration-300 sm:text-base">
          {question}
        </span>
        <span className={`services-faq-toggle flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'is-open' : ''}`}>
          <FiChevronDown className={`services-faq-toggle-icon h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
              },
            }}
            className="relative overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="border-t border-violet-500/20 pt-2">
                <p className="services-faq-answer mt-3 text-sm leading-relaxed text-white sm:text-[15px]">
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-200 group-hover:translate-x-full" />
    </motion.div>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  );
}

const CONTACT_INPUT_DARK =
  'contact-hero-form__input w-full rounded-lg border px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2';

const CONTACT_INPUT_LIGHT =
  'contact-hero-form__input w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/15';

function ContactField({ label, required, className = '', children }) {
  return (
    <div className={className}>
      <label className="contact-hero-form__label mb-1 block text-xs font-medium">
        {label}
        {required && <span className="contact-hero-form__required"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ContactLeftPanel({ isLight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="contact-hero-left w-full lg:flex lg:max-h-full lg:flex-col lg:justify-center"
    >
      <h1
        className={`contact-hero-left__title mb-1.5 ${TYPE.pageHero} ${isLight ? 'text-violet-900' : 'text-white'}`}
      >
        Get in touch
      </h1>
      <p
        className={`contact-hero-left__subtitle mb-4 max-w-md text-[13px] leading-relaxed sm:text-sm lg:mb-5 ${
          isLight ? 'text-slate-600' : 'text-white/70'
        }`}
      >
        Questions about franchise expansion? Our advisory team responds within one business day.
      </p>

      <div className="contact-hero-card-list w-full space-y-3">
        {CONTACT_LINKS.map((item, i) => (
          <motion.a
            key={item.title}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.08, duration: 0.45 }}
            whileHover={{ x: 4 }}
            className={`contact-hero-card group flex w-full items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
              isLight
                ? 'contact-hero-card--light border border-slate-200/90 bg-white shadow-sm hover:border-violet-300 hover:shadow-md'
                : 'contact-hero-card--dark'
            }`}
          >
            <div className="contact-hero-card__icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg shadow-inner">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="contact-hero-card__text contact-hero-card__title font-bold">{item.title}</p>
              <p className="contact-hero-card__text contact-hero-card__value truncate font-bold">{item.value}</p>
            </div>
            <span className="contact-hero-card__arrow flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300">
              <ArrowUpRightIcon />
            </span>
          </motion.a>
        ))}
      </div>

      <SocialFollowBlock
        variant="contact"
        className="contact-hero-social mt-5 sm:mt-6"
        headingClassName={isLight ? 'footer-follow-heading--on-light' : ''}
      />
    </motion.div>
  );
}

function ContactHeroForm({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  isSuccess,
  submitError,
  onResetSuccess,
  isLight,
}) {
  const inputClass = isLight ? CONTACT_INPUT_LIGHT : CONTACT_INPUT_DARK;
  const canSend = isContactFormReady(formData);

  return (
    <div
      className={`contact-hero-form relative flex w-full max-h-full flex-col overflow-hidden rounded-2xl lg:max-h-full ${
        isLight
          ? 'contact-hero-form--light border border-slate-200/90 bg-white shadow-lg shadow-slate-200/50'
          : 'contact-hero-form--dark'
      }`}
    >
      <div className="flex flex-col p-5 sm:p-6">
        <div className="mb-4 shrink-0">
          <h2 className={`contact-hero-form__title ${TYPE.formTitle}`}>
            Send Message
          </h2>
          <p className="contact-hero-form__subtitle mt-1 text-xs leading-relaxed sm:text-[13px]">
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {isSuccess ? (
          <FormSuccessState
            title="Message sent"
            description="We'll be in touch within 24 hours."
            onReset={onResetSuccess}
            variant={isLight ? 'default' : 'dark'}
          />
        ) : (
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
            <HoneypotField value={formData._hp} onChange={handleInputChange} />
            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <ContactField label="Full Name" required>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={inputClass}
                  placeholder="Enter your full name"
                />
              </ContactField>
              <ContactField label="Contact Number" required>
                <input
                  required
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', digitsOnlyPhone(e.target.value))}
                  className={inputClass}
                  {...phoneInputProps()}
                />
              </ContactField>
            </div>

            <ContactField label="Email Address" required className="shrink-0">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={inputClass}
                placeholder="Enter your email"
              />
            </ContactField>

            <ContactField label="Company Name" className="shrink-0">
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={inputClass}
                placeholder="Enter your company name"
              />
            </ContactField>

            <ContactField label="Message" required>
              <textarea
                rows={2}
                required
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`${inputClass} min-h-[4.5rem] resize-none py-2.5`}
                placeholder="Tell us about your project..."
              />
            </ContactField>

            <motion.button
              type="submit"
              disabled={isSubmitting || !canSend}
              whileHover={canSend && !isSubmitting ? { scale: 1.02, y: -1 } : undefined}
              whileTap={canSend && !isSubmitting ? { scale: 0.98 } : undefined}
              className={`contact-send-btn w-full shrink-0 rounded-lg py-3 text-sm font-semibold shadow-lg transition-all duration-300 disabled:cursor-not-allowed ${
                canSend && !isSubmitting ? 'contact-send-btn--ready' : 'contact-send-btn--disabled'
              }`}
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </motion.button>

            {submitError && (
              <p className={`shrink-0 text-center text-sm ${isLight ? 'text-red-600' : 'text-red-400'}`}>
                {submitError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}


function ContactPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const {
    values: formData,
    setField: handleInputChange,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formKey: 'contact_page',
    initialValues: CONTACT_FORM_INITIAL,
    onSubmit: (data, { signal }) => submitContactForm(data, 'contact_page', { signal }),
    successTitle: 'Message sent',
    successDescription: "We'll be in touch within 24 hours.",
  });

  return (
    <main className="contact-page services-page relative z-10 bg-transparent text-theme-primary">
      {/* Hero - left contact links, right form */}
      <section
        id="contact-form"
        className={`page-hero-light relative flex w-full items-center bg-transparent py-8 sm:py-10 lg:h-[calc(100dvh-4rem)] lg:max-h-[calc(100dvh-4rem)] lg:min-h-0 lg:overflow-hidden lg:py-5 ${!isLight ? 'contact-hero-dark' : ''}`}
      >
        <div className="page-hero-light__bg pointer-events-none absolute inset-0">
          <motion.div className="page-hero-light__gradient absolute inset-0 bg-gradient-to-br from-violet-950/45 via-transparent to-indigo-950/30" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className={isLight ? 'text-slate-300/60' : 'text-white/20'}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-hero-grid)" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-20 top-1/4 h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-[100px] lg:h-[380px] lg:w-[380px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute right-0 top-0 h-[260px] w-[260px] rounded-full bg-emerald-500/10 blur-[80px] lg:h-[300px] lg:w-[300px]"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="contact-page-hero-grid grid items-start gap-6 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-10">
            <ContactLeftPanel isLight={isLight} />

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex w-full lg:justify-center"
            >
              <ContactHeroForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isSuccess={isSuccess}
                submitError={submitError}
                onResetSuccess={resetForm}
                isLight={isLight}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="services-faq-section relative w-full overflow-hidden py-12 md:py-16">
        <div className="relative z-10 mx-auto max-w-[900px] px-5 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="services-faq-section__badge mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" />
                FAQ
              </span>
              <h2 className={`services-faq-section__title mb-5 ${sectionTitleClass(false)}`}>
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-xl text-base text-white/75 sm:text-lg">
                Everything founders, investors, and franchise partners need to know.
              </p>
            </motion.div>
          </div>

          <div className="services-faq-list space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <ContactFAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
