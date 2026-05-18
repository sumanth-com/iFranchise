import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { submitContactForm } from '@/lib/forms';
import { useTheme } from '../context/ThemeContext';
import FooterSocialButtons from './footer/FooterSocialButtons';

const FAQ_ITEMS = [
  {
    question: 'What is the typical investment range?',
    answer: 'Most opportunities on our platform start around â‚¹20L and can go beyond â‚¹2.5Cr depending on brand category and market potential.',
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
    value: 'hello@ifranchise.in',
    href: 'mailto:hello@ifranchise.in',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Call us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: 'Our location',
    value: 'Bangalore, Karnataka, India',
    href: 'https://maps.google.com/?q=Bangalore,Karnataka,India',
    external: true,
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
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
  'w-full rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2.5 text-sm text-white transition placeholder:text-white/35 focus:border-violet-400/45 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-violet-500/20';

const CONTACT_INPUT_LIGHT =
  'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/15';

function ContactField({ label, required, className = '', isLight, children }) {
  return (
    <div className={className}>
      <label
        className={`mb-1 block text-xs font-medium ${isLight ? 'text-slate-700' : 'text-white/75'}`}
      >
        {label}
        {required && <span className={isLight ? 'text-violet-600' : 'text-violet-300'}> *</span>}
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
      className="contact-hero-left lg:flex lg:max-h-full lg:flex-col lg:justify-center"
    >
      <h1
        className={`contact-hero-left__title mb-1.5 text-[1.75rem] font-extrabold tracking-tight sm:text-3xl lg:text-[2.15rem] lg:leading-[1.12] ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}
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

      <div className="space-y-2">
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
            className={`contact-hero-card group flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all duration-300 ${
              isLight
                ? 'border border-slate-200/90 bg-white shadow-sm hover:border-violet-300 hover:shadow-md'
                : 'border border-white/[0.12] bg-white/[0.06] backdrop-blur-md hover:border-violet-400/45 hover:bg-white/[0.1] hover:shadow-[0_12px_40px_rgba(109,40,217,0.18)]'
            }`}
          >
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-inner ${
                isLight
                  ? 'border border-violet-100 bg-violet-50 text-violet-700'
                  : 'border border-white/10 bg-gradient-to-br from-violet-500/20 to-white/5 text-white'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[13px] font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</p>
              <p className={`truncate text-xs ${isLight ? 'text-slate-500' : 'text-white/55'}`}>{item.value}</p>
            </div>
            <span
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isLight
                  ? 'border-slate-200 text-slate-500 group-hover:border-violet-300 group-hover:bg-violet-50 group-hover:text-violet-700'
                  : 'border-white/10 text-white/70 group-hover:border-violet-400/50 group-hover:bg-violet-500/20 group-hover:text-white'
              }`}
            >
              <ArrowUpRightIcon />
            </span>
          </motion.a>
        ))}
      </div>

      <div className="contact-hero-social mt-5 flex flex-col items-center text-center sm:mt-6">
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] ${
            isLight ? 'text-slate-500' : 'text-white/50'
          }`}
        >
          Follow us
        </p>
        <FooterSocialButtons variant="contact" className="justify-center gap-2.5" />
      </div>
    </motion.div>
  );
}

function ContactHeroForm({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  isSubmitted,
  submitError,
  isLight,
}) {
  const inputClass = isLight ? CONTACT_INPUT_LIGHT : CONTACT_INPUT_DARK;

  return (
    <div
      className={`contact-hero-form relative flex w-full max-h-full flex-col overflow-hidden rounded-2xl lg:max-h-full ${
        isLight
          ? 'border border-slate-200/90 bg-white shadow-lg shadow-slate-200/50'
          : 'border border-white/[0.12] bg-[#0c0816]/95 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl'
      }`}
    >
      <div className="flex flex-col p-5 sm:p-6">
        <div className="mb-4 shrink-0">
          <h2
            className={`text-xl font-bold tracking-tight sm:text-[1.35rem] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Send Message
          </h2>
          <p
            className={`mt-1 text-xs leading-relaxed sm:text-[13px] ${
              isLight ? 'text-slate-500' : 'text-white/55'
            }`}
          >
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${
                isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-400/30 bg-emerald-500/15'
              }`}
            >
              <svg
                className={`h-6 w-6 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Message sent</h3>
            <p className={`mt-1 text-sm ${isLight ? 'text-slate-500' : 'text-white/55'}`}>
              We&apos;ll be in touch within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <ContactField label="Full Name" required isLight={isLight}>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={inputClass}
                  placeholder="Enter your full name"
                />
              </ContactField>
              <ContactField label="Contact Number" required isLight={isLight}>
                <input
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className={inputClass}
                  placeholder="Enter your phone number"
                />
              </ContactField>
            </div>

            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <ContactField label="Email Address" required isLight={isLight}>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={inputClass}
                  placeholder="Enter your email"
                />
              </ContactField>
              <ContactField label="Website / Portfolio" isLight={isLight}>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className={inputClass}
                  placeholder="https://yourwebsite.com"
                />
              </ContactField>
            </div>

            <ContactField label="Company Name" className="shrink-0" isLight={isLight}>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={inputClass}
                placeholder="Enter your company name"
              />
            </ContactField>

            <ContactField label="Message" required isLight={isLight}>
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
              disabled={isSubmitting}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={`contact-send-btn w-full shrink-0 rounded-lg py-3 text-sm font-semibold shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                isLight
                  ? 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800'
                  : 'bg-white text-slate-900 shadow-black/20 hover:bg-white/90'
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

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    website: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    const result = await submitContactForm(formData, 'contact_page');

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error || 'Something went wrong. Please try again.');
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSubmitError('');
      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        website: '',
        company: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <main className="contact-page services-page relative z-10 bg-transparent text-theme-primary">
      {/* Hero â€” left contact links, right form */}
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

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-10">
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
                isSubmitted={isSubmitted}
                submitError={submitError}
                isLight={isLight}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="w-full py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <span className="services-faq-section__badge mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              Our Location
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white lg:text-4xl">Built in Bangalore. Scaling Across India.</h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/85">
              Strategically positioned in India&apos;s innovation capital to connect founders, investors, and franchise ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(139,92,246,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-500 hover:shadow-[0_24px_60px_rgba(109,40,217,0.2)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452148437!3d12.953945614117967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4aa0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[500px] w-full"
                title="Bangalore Location Map"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-violet-500/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ â€” after location, Services style */}
      <section className="services-faq-section relative w-full overflow-hidden py-12 md:py-16">
        <div className="relative z-10 mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="services-faq-section__badge mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                FAQ
              </span>
              <h2 className="services-faq-section__title mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
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
