import { useState } from 'react';
import { motion } from 'framer-motion';
import contactImage2 from '../assets/contact2.png';
import { submitContactForm } from '@/lib/forms';
import FooterSocialButtons from './footer/FooterSocialButtons';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    website: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while one is in flight
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    const result = await submitContactForm(formData, 'contact_page');

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error || 'Something went wrong. Please try again.');
      return;
    }

    // Success — show the existing success UI then reset
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
        message: ''
      });
    }, 3000);
  };

  const FAQ_ITEMS = [
    {
      question: 'What is the typical investment range?',
      answer: 'Most opportunities on our platform start around ₹20L and can go beyond ₹2.5Cr depending on brand category and market potential.'
    },
    {
      question: 'How long does it take to break even?',
      answer: 'Break-even timelines vary by sector, but many franchise models we work with target 12 to 24 months with disciplined execution.'
    },
    {
      question: 'Do I need prior business experience?',
      answer: 'Not necessarily. Many successful partners are first-time operators and rely on structured onboarding, SOPs, and advisory support.'
    },
    {
      question: 'What support does iFranchise provide?',
      answer: 'We support brand matching, diligence, financial understanding, launch planning, and ongoing growth guidance after onboarding.'
    },
    {
      question: 'Can I operate multiple franchise units?',
      answer: 'Yes. Multi-unit expansion is available for many brands after performance milestones and market readiness checks are met.'
    }
  ];

  return (
    <main className="relative z-10 bg-transparent text-white">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO (CENTERED, CLEAN)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden bg-transparent" id="hero-section">

        {/* ── Background layer ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/35 via-transparent to-indigo-950/30" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.10, 0.20, 0.10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-400/15 blur-[140px]"
          />
        </div>

        {/* ── Centered content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/15 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
              India's Trusted Franchise Growth Platform
            </span>
          </motion.div>

          {/* Headline — strategic, multi-line */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl mb-4"
          >
            Build Smarter.{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Scale Faster.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-violet-400 to-indigo-400"
              />
            </span>
            <br />
            <span className="text-white">Win with Precision.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
            className="text-base sm:text-lg text-white max-w-xl leading-relaxed mb-8"
          >
            Strategic franchise intelligence for founders who think in systems, move with conviction, and build for legacy.
          </motion.p>

          {/* Creative animated down arrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            {/* Outer pulse rings */}
            <motion.span
              animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-violet-400/30 pointer-events-none"
            />
            <motion.span
              animate={{ scale: [1, 1.9, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              className="absolute inset-0 rounded-full bg-violet-300/20 pointer-events-none"
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll to contact form"
              className="relative group flex items-center gap-3 rounded-full bg-slate-900 pl-5 pr-4 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.22)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.35)] transition-all duration-300 hover:bg-slate-800"
            >
              {/* Label */}
              <span className="text-sm font-semibold text-white tracking-wide">Start the conversation</span>

              {/* Arrow circle */}
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden">
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <motion.svg
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Floating micro-stats below arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex items-center gap-6 text-center"
          >
            {[
              { value: '200+', label: 'Brands Scaled' },
              { value: '₹500Cr+', label: 'Capital Deployed' },
              { value: '15+', label: 'Industries' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs text-white font-medium mt-0.5">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - CONTACT FORM (FULL VIEWPORT FIT) */}
      <section className="w-full bg-transparent min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-8">
          <div id="contact-form" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Large Image + Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center order-last lg:order-first space-y-6"
            >
              {/* Image Container */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[400px] h-[400px] lg:w-[480px] lg:h-[480px] bg-gradient-to-br from-slate-100/40 via-purple-50/30 to-slate-100/40 rounded-[40%_60%_70%_30%] blur-sm"></div>
                </div>
                
                <div className="relative z-10">
                  <motion.img
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    src={contactImage2}
                    alt="Contact support"
                    className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-lg"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 lg:-top-12 lg:left-2/3 lg:-translate-x-1/2"
                  >
                    <div className="card-premium-dark-inner rounded-2xl px-5 py-3 shadow-xl relative">
                      <p className="text-base font-medium text-white">Let's Connect!</p>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[rgba(139,92,246,0.25)]" />
                    </div>
                  </motion.div>
                  
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-slate-200/30 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Premium Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex flex-col items-center space-y-4"
              >
                <p className="text-sm font-medium text-white">Connect with iFranchise</p>
                
                <FooterSocialButtons variant="contact" className="justify-center" />
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="order-first lg:order-last"
            >
              <div className="card-premium-dark rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:border-[rgba(139,92,246,0.45)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.25)]">
                <div className="absolute top-0 left-0 right-0 h-px opacity-60 pointer-events-none bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />
                <div className="mb-6 relative z-10">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    Send Message
                  </h2>
                  <p className="text-white leading-relaxed">
                    Ready to scale your business? Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-400/35">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Message Sent!</h3>
                    <p className="text-white text-sm">Thank you for reaching out. We'll be in touch soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">Contact Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">Website / Portfolio</label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 text-sm"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1">Message *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-3 focus:ring-purple-100 transition-all duration-300 bg-white/80 text-slate-900 placeholder-slate-500 resize-none text-sm"
                        placeholder="Tell us about your project and goals..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#0B1220] hover:bg-[#1a2332] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-white/10"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>

                    {/* Error message — only shown on submission failure, uses existing text styles */}
                    {submitError && (
                      <p className="text-sm text-red-600 text-center pt-1">{submitError}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - OUR LOCATION MAP (TIGHT SPACING) */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-4 border border-[rgba(139,92,246,0.35)] bg-[rgba(139,92,246,0.15)] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              OUR LOCATION
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Built in Bangalore. Scaling Across India.
            </h2>
            
            <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
              Strategically positioned in India's innovation capital to connect founders, investors, and franchise ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(139,92,246,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_60px_rgba(109,40,217,0.2)] transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085452148437!3d12.953945614117967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4aa0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[500px] transition-all duration-300"
                title="Bangalore Location Map"
              ></iframe>
              
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-violet-500/30 transition-all duration-300 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - FAQ WITH CONTACT CARD (BALANCED LAYOUT) */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Everything founders, investors, and franchise partners need to know.
            </p>
          </motion.div>

          {/* Two-column: Contact card left, FAQs right */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

            {/* LEFT — Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full"
            >
              <div className="relative group h-full">
                <div className="relative card-premium-dark rounded-2xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_50px_rgba(109,40,217,0.25)] transition-all duration-500 h-full flex flex-col justify-between border border-[rgba(139,92,246,0.18)]">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent opacity-70" aria-hidden />
                  <div className="space-y-2 relative z-10">
                    {/* Email */}
                    <motion.a href="mailto:hello@ifranchise.in" whileHover={{ x: 4 }} className="group/item cursor-pointer block">
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[rgba(139,92,246,0.35)]">
                        <div className="w-12 h-12 bg-[rgba(139,92,246,0.15)] rounded-lg flex items-center justify-center border border-[rgba(139,92,246,0.35)]">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white font-medium mb-0.5 uppercase tracking-wide">Email</p>
                          <p className="text-white font-semibold group-hover/item:text-white transition-colors duration-300">hello@ifranchise.in</p>
                        </div>
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a href="tel:+919876543210" whileHover={{ x: 4 }} className="group/item cursor-pointer block">
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[rgba(139,92,246,0.35)]">
                        <div className="w-12 h-12 bg-[rgba(139,92,246,0.15)] rounded-lg flex items-center justify-center border border-[rgba(139,92,246,0.35)]">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white font-medium mb-0.5 uppercase tracking-wide">Phone</p>
                          <p className="text-white font-semibold group-hover/item:text-white transition-colors duration-300">+91 98765 43210</p>
                        </div>
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    {/* Address */}
                    <motion.a href="https://maps.google.com/?q=Bangalore,Karnataka,India" target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }} className="group/item cursor-pointer block">
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[rgba(139,92,246,0.35)]">
                        <div className="w-12 h-12 bg-[rgba(139,92,246,0.15)] rounded-lg flex items-center justify-center border border-[rgba(139,92,246,0.35)]">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white font-medium mb-0.5 uppercase tracking-wide">Address</p>
                          <p className="text-white font-semibold group-hover/item:text-white transition-colors duration-300">Bangalore, Karnataka, India</p>
                        </div>
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    {/* Availability */}
                    <motion.div whileHover={{ x: 4 }} className="group/item">
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[rgba(139,92,246,0.35)]">
                        <div className="w-12 h-12 bg-[rgba(139,92,246,0.15)] rounded-lg flex items-center justify-center border border-[rgba(139,92,246,0.35)]">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white font-medium mb-0.5 uppercase tracking-wide">Availability</p>
                          <p className="text-white font-semibold">Monday to Saturday, 9 AM – 7 PM IST</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — FAQ accordion */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.button
                    key={item.question}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    onClick={() => setOpenFaq(prev => prev === index ? -1 : index)}
                    className="text-left card-premium-dark rounded-xl p-5 transition duration-300 hover:border-[rgba(139,92,246,0.45)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.2)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold text-white pr-2">{item.question}</p>
                      <span className="text-lg font-semibold text-white flex-shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    <div className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden">
                        <p className="text-sm leading-relaxed text-white">{item.answer}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default ContactPage;