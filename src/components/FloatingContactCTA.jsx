import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhoneCall } from 'react-icons/fi';
import brandLogo from '../assets/BrandNav.png';
import { submitFranchiseInquiry } from '@/lib/forms';

export default function FloatingContactCTA({ franchiseName = 'this opportunity' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    investmentRange: '',
    state: '',
    city: '',
    website: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscape);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitFranchiseInquiry(formData, 'floating_cta');
    
    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          investmentRange: '',
          state: '',
          city: '',
          website: '',
          message: '',
        });
      }, 3000);
    } else {
      console.error('[FloatingContactCTA] Submission failed:', result.error);
      alert(result.error || 'Submission failed. Please try again.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  // Debug logging + body scroll lock — also stops Lenis
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      if (window.__lenis) window.__lenis.stop();
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      if (window.__lenis) window.__lenis.start();
    };
  }, [isOpen]);

  return (
    <>
      {/* Premium Floating Contact Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleButtonClick}
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '28px',
              zIndex: 999999,
              pointerEvents: 'auto',
            }}
            aria-label="Talk to Franchise Strategist"
          >
            {/* Ripple rings — staggered, fade out */}
            {[0, 0.6, 1.2].map((delay, i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-xl bg-violet-500"
                animate={{ scale: [1, 1.7], opacity: [0.28, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay }}
                style={{ pointerEvents: 'none' }}
              />
            ))}

            {/* Main pill */}
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 shadow-[0_8px_24px_rgba(99,102,241,0.45)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(99,102,241,0.55)]">
              {/* Shimmer sweep */}
              <motion.span
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{ pointerEvents: 'none' }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ['-100%', '200%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
                />
              </motion.span>

              {/* Logo image */}
              <motion.div
                animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img 
                  src={brandLogo} 
                  alt="iFranchise" 
                  className="h-8 w-8 rounded-lg"
                />
              </motion.div>
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              whileHover={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-xl lg:block"
            >
              Talk to Franchise Strategist
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 bg-slate-900" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal Popup - REACT PORTAL TO BODY */}
      {isOpen && createPortal(
        <AnimatePresence>
          <div style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
            {/* Backdrop - Subtle Dim Only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/40"
              style={{ zIndex: 999999 }}
            />

            {/* Modal Content - Crystal Clear */}
            <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center sm:p-6" style={{ zIndex: 1000000 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.28)]"
                style={{ maxHeight: 'calc(100vh - 48px)', display: 'flex', flexDirection: 'column' }}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Scrollable Content */}
                <div
                  className="overflow-y-auto p-6 sm:p-8 lg:p-10"
                  style={{ flex: 1, minHeight: 0, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
                >
                  {!isSubmitted ? (
                    <>
                      {/* Header */}
                      <div className="mb-6 text-center">
                        <div className="mb-4 inline-flex rounded-2xl bg-violet-50 p-3.5 border border-violet-100">
                          <FiPhoneCall className="h-7 w-7 text-violet-600" strokeWidth={2} />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                          Talk to a Franchise Strategist
                        </h3>
                        <p className="mt-2 text-sm text-white">
                          Get personalised guidance about {franchiseName}
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name row */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="firstName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Rahul"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Sharma"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        {/* Phone + Email row */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="rahul@example.com"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        {/* Investment Range */}
                        <div>
                          <label htmlFor="investmentRange" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                            Investment Range <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="investmentRange"
                            name="investmentRange"
                            required
                            value={formData.investmentRange}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                          >
                            <option value="">Select investment range</option>
                            <option value="under-25l">Under ₹25 Lakhs</option>
                            <option value="25l-50l">₹25L – ₹50 Lakhs</option>
                            <option value="50l-1cr">₹50L – ₹1 Crore</option>
                            <option value="1cr-5cr">₹1 Crore – ₹5 Crore</option>
                            <option value="5cr+">₹5 Crore+</option>
                          </select>
                        </div>

                        {/* State + City row */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="state" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                              State <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="state"
                              name="state"
                              type="text"
                              required
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="Maharashtra"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                            />
                          </div>
                          <div>
                            <label htmlFor="city" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="city"
                              name="city"
                              type="text"
                              required
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Mumbai"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                            />
                          </div>
                        </div>

                        {/* Website (optional) */}
                        <div>
                          <label htmlFor="website" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                            Website <span className="text-white normal-case tracking-normal font-normal">(Optional)</span>
                          </label>
                          <input
                            id="website"
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white">
                            Message <span className="text-white normal-case tracking-normal font-normal">(Optional)</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your interest in this franchise opportunity..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100 resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25"
                        >
                          Submit Request
                        </button>

                        <p className="text-center text-xs text-white">
                          Our franchise strategist will reach out within 24 hours.
                        </p>
                      </form>
                    </>
                  ) : (
                    /* Success State */
                    <div className="py-16 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                        className="mb-6 inline-flex rounded-full bg-emerald-100 p-5"
                      >
                        <svg className="h-14 w-14 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-slate-900">Request Submitted!</h3>
                      <p className="mt-4 text-base text-white">
                        Thank you for your interest. Our franchise strategist will contact you shortly.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
