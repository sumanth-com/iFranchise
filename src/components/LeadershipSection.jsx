import { useState } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import React from 'react';
import BrandLogo from '../assets/BrandLogo.png';

function LeadershipSection() {
  const [founderModalOpen, setFounderModalOpen] = useState(false);
  const [cofounderModalOpen, setCofounderModalOpen] = useState(false);

  // Prevent body scroll when modal is open — also stops Lenis smooth scroll
  React.useEffect(() => {
    const isOpen = founderModalOpen || cofounderModalOpen;
    if (isOpen) {
      // Lock native scroll
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      // Pause Lenis if available
      if (window.__lenis) window.__lenis.stop();
    } else {
      // Restore native scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      // Resume Lenis
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
  }, [founderModalOpen, cofounderModalOpen]);

  return (
    <>
      {/* LEADERSHIP & VISION SECTION - REFINED & OPTIMIZED */}
      <section className="relative w-full overflow-hidden bg-transparent py-12 lg:py-16">
        {/* Atmospheric Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent" />
          
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[20%] top-[30%] h-32 w-32 rounded-full bg-violet-400/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 25, 0], opacity: [0.04, 0.09, 0.04] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute right-[15%] bottom-[40%] h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-8">
          {/* Section Header - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">From Our Founders</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              What iFranchise Means to Us
            </h2>
          </motion.div>

          {/* CARD 1: FOUNDER & DIRECTOR - OPTIMIZED HEIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="group relative mb-8 overflow-hidden rounded-[28px] card-premium-dark border border-violet-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_16px_60px_rgba(109,40,217,0.28)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />
            </div>

            <div className="relative flex flex-col lg:flex-row gap-6 p-6 lg:gap-8 lg:p-8">
              {/* LEFT - IMAGE CARD - MATCHES CONTENT HEIGHT */}
              <div className="relative lg:w-[35%] flex-shrink-0">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[320px] lg:h-full lg:max-h-[480px]">
                  <div className="absolute -inset-4 bg-gradient-to-br from-violet-300/30 via-purple-200/20 to-indigo-300/30 blur-3xl opacity-60" />
                  
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950/50 to-slate-900/70">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                      alt="Arjun Malhotra"
                      className="h-full w-full object-cover object-center brightness-105"
                      loading="eager"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                </div>
              </div>

              {/* RIGHT - CONTENT - COMPACT */}
              <div className="flex flex-col justify-between lg:flex-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* PERSONAL GREETING */}
                  <p className="text-lg font-bold text-white lg:text-xl">
                    Hello, I'm Arjun Malhotra
                  </p>

                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    I started iFranchise with a simple belief: every entrepreneur deserves a fair shot at building something extraordinary. Too many brilliant business ideas die not from lack of potential, but from lack of the right guidance, capital, and strategic support.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    We're not just connecting brands with investors — we're building dreams into empires. Every franchise we validate, every partnership we forge, and every expansion we architect is driven by one mission: turning your vision into a legacy that outlasts us all.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    Your success is our legacy. Let's build something India will remember.
                  </p>
                  
                  {/* PREMIUM QUOTE CARD */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-xl border border-violet-400/35 bg-violet-500/10 p-4 shadow-lg backdrop-blur-sm mt-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5" />
                    <div className="relative">
                      <svg className="mb-2 h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-[14px] font-semibold italic leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                        We're not building a marketplace. We're building the operating system for India's next generation of business empires.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* SIGNATURE + CTA ROW */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center justify-between border-t border-violet-500/25 pt-4 mt-4"
                >
                  <div className="flex items-center gap-3">
                    {/* iFranchise logo box */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 shadow-inner overflow-hidden">
                      <img src={BrandLogo} alt="iFranchise" className="h-9 w-9 object-contain" />
                    </div>
                    <div>
                      <p className="text-2xl text-white lg:text-[28px]" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                        Arjun Malhotra
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white">
                        Founder & Director
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:scale-110"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    
                    <button
                      onClick={() => setFounderModalOpen(true)}
                      className="btn-purple-solid group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      Explore His Journey
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
              <div className="absolute inset-0 rounded-[28px] border border-violet-200/50" />
            </div>
          </motion.div>

          {/* CARD 2: CO-FOUNDER - IMAGE RIGHT, CONTENT LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="group relative overflow-hidden rounded-[28px] card-premium-dark border border-violet-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_16px_60px_rgba(109,40,217,0.28)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />
            </div>

            <div className="relative flex flex-col lg:flex-row gap-6 p-6 lg:gap-8 lg:p-8">
              {/* LEFT - CONTENT */}
              <div className="flex flex-col justify-between order-2 lg:order-1 lg:flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* PERSONAL GREETING */}
                  <p className="text-lg font-bold text-white lg:text-xl">
                    Hello, I'm Daniel Reeves
                  </p>

                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    I've spent over a decade watching businesses fail not because their ideas weren't good enough, but because they lacked the operational backbone to scale. That's what drives me every single day at iFranchise.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    Scaling isn't just about opening more locations. It's about building systems so strong that your brand can thrive in 100 cities without losing its soul. It's about creating frameworks that turn chaos into clarity, and ambition into achievement.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    We don't just advise — we roll up our sleeves and build alongside you. From market validation to operational excellence, we're in the trenches with every partner, ensuring no detail is overlooked and no opportunity is wasted.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    Your growth is our obsession. Let's turn your brand into an unstoppable force.
                  </p>
                  
                  {/* PREMIUM QUOTE CARD */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-xl border border-violet-400/35 bg-violet-500/10 p-4 shadow-lg backdrop-blur-sm mt-4"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5" />
                    <div className="relative">
                      <svg className="mb-2 h-4 w-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-[14px] font-semibold italic leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                        Excellence isn't an accident. It's a system. And we're here to build that system with you.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* SIGNATURE + CTA ROW */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center justify-between border-t border-violet-500/25 pt-4 mt-4"
                >
                  <div className="flex items-center gap-3">
                    {/* iFranchise logo box */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 shadow-inner overflow-hidden">
                      <img src={BrandLogo} alt="iFranchise" className="h-9 w-9 object-contain" />
                    </div>
                    <div>
                      <p className="text-2xl text-white lg:text-[28px]" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                        Daniel Reeves
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white">
                        Co-Founder
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:scale-110"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    
                    <button
                      onClick={() => setCofounderModalOpen(true)}
                      className="btn-purple-solid group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      Explore His Journey
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT - IMAGE CARD - MATCHES CONTENT HEIGHT */}
              <div className="relative order-1 lg:order-2 lg:w-[35%] flex-shrink-0">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[320px] lg:h-full lg:max-h-[480px]">
                  <div className="absolute -inset-4 bg-gradient-to-br from-indigo-300/30 via-blue-200/20 to-violet-300/30 blur-3xl opacity-60" />
                  
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950/50 to-slate-900/70">
                    <img
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
                      alt="Daniel Reeves"
                      className="h-full w-full object-cover object-center brightness-105"
                      loading="eager"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                </div>
              </div>
            </div>

              <div className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
              <div className="absolute inset-0 rounded-[28px] border border-violet-400/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER MODAL */}
      {founderModalOpen && createPortal(
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setFounderModalOpen(false); }}
        >
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }} onClick={() => setFounderModalOpen(false)} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px', maxHeight: 'calc(100vh - 32px)', borderRadius: '24px', background: '#12082a', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', margin: 'auto', display: 'flex', flexDirection: 'column' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div style={{ background: 'linear-gradient(135deg,#7c3aed 0%,#6366f1 50%,#4f46e5 100%)', padding: '24px 24px 32px', position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => setFounderModalOpen(false)}
                style={{ position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
              <div style={{ paddingTop: 8 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>About The Founder</p>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Hello, I'm Arjun Malhotra</h3>
                <p style={{ margin: '6px 0 0', fontSize: 13, fontWeight: 600, color: '#e0e7ff' }}>Founder & Director</p>
              </div>
            </div>
            
            <div style={{ padding: 24, flex: 1, overflowY: 'auto', minHeight: 0, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-white">
                  I started iFranchise with a simple belief: every entrepreneur deserves a fair shot at building something extraordinary. Too many brilliant business ideas die not from lack of potential, but from lack of the right guidance, capital, and strategic support.
                </p>

                <p className="text-base leading-relaxed text-white">
                  Over the past 15+ years, I've had the privilege of transforming franchise ecosystems across India and Southeast Asia. My journey began when I witnessed firsthand how fragmented and opaque the franchise industry was — brilliant brands struggling to find the right investors, and passionate entrepreneurs unable to access verified opportunities.
                </p>

                <p className="text-base leading-relaxed text-white">
                  That's when I decided to build something different. Not just another listing platform, but a comprehensive intelligence system that brings transparency, data-driven insights, and strategic support to every stakeholder in the franchise ecosystem.
                </p>

                <div className="bg-violet-500/15 border-l-4 border-violet-400 p-4 rounded">
                  <p className="text-base italic text-white">
                    "We're not building a marketplace. We're building the operating system for India's next generation of business empires."
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Career Highlights</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Scaled 350+ brands across India and Southeast Asia</li>
                    <li>• Facilitated ₹500Cr+ in franchise capital deployment</li>
                    <li>• Expanded operations to 100+ cities in 8 countries</li>
                    <li>• Built network of 8,000+ verified investors</li>
                    <li>• Advised government bodies on franchise policy frameworks</li>
                    <li>• Keynote speaker at 50+ international franchise conferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Education & Certifications</h4>
                  <p className="text-sm text-white">MBA - IIM Ahmedabad | B.Tech - IIT Delhi</p>
                  <p className="text-sm text-white mt-2">Certified Franchise Executive (CFE) | Harvard Business School - Strategic Leadership Program</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Awards & Recognition</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Entrepreneur of the Year 2023 - Economic Times</li>
                    <li>• Top 40 Under 40 Business Leaders - Fortune India</li>
                    <li>• Excellence in Franchise Innovation Award</li>
                    <li>• Best Franchise Consultant - Asia Pacific Region</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Philosophy</h4>
                  <p className="text-base leading-relaxed text-white">
                    Success in franchising isn't about luck — it's about systems, data, and unwavering commitment to excellence. Every decision we make at iFranchise is guided by one principle: creating lasting value for our partners. Your success is our legacy.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setFounderModalOpen(false)}
                className="w-full mt-6 px-6 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold transition-all duration-300 hover:bg-violet-500"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* CO-FOUNDER MODAL */}
      {cofounderModalOpen && createPortal(
        <div 
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setCofounderModalOpen(false); }}
        >
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }} onClick={() => setCofounderModalOpen(false)} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px', maxHeight: 'calc(100vh - 32px)', borderRadius: '24px', background: '#12082a', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.35)', margin: 'auto', display: 'flex', flexDirection: 'column' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div style={{ background: 'linear-gradient(135deg,#4f46e5 0%,#6366f1 50%,#7c3aed 100%)', padding: '24px 24px 32px', position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => setCofounderModalOpen(false)}
                style={{ position: 'absolute', right: 16, top: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
              <div style={{ paddingTop: 8 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>About The Co-Founder</p>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Hello, I'm Daniel Reeves</h3>
                <p style={{ margin: '6px 0 0', fontSize: 13, fontWeight: 600, color: '#e0e7ff' }}>Co-Founder & Strategy Director</p>
              </div>
            </div>
            
            <div style={{ padding: 24, flex: 1, overflowY: 'auto', minHeight: 0, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-white">
                  I've spent over a decade watching businesses fail not because their ideas weren't good enough, but because they lacked the operational backbone to scale. That's what drives me every single day at iFranchise.
                </p>

                <p className="text-base leading-relaxed text-white">
                  My journey in franchise operations began in Singapore, where I helped build multi-country expansion frameworks for some of Asia's fastest-growing brands. I learned that scaling isn't just about replication — it's about creating systems so robust that your brand can thrive in 100 cities without losing its soul.
                </p>

                <p className="text-base leading-relaxed text-white">
                  When Arjun and I founded iFranchise, we shared a vision: to build the infrastructure that turns franchise opportunities into category-defining businesses. My role is to ensure that every operational detail, every process, and every system we create is designed for sustainable, profitable growth.
                </p>

                <div className="bg-violet-500/15 border-l-4 border-violet-400 p-4 rounded">
                  <p className="text-base italic text-white">
                    "Excellence isn't an accident. It's a system. And we're here to build that system with you."
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Career Highlights</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Engineered operational blueprints for 200+ franchise brands</li>
                    <li>• Expanded franchise networks across 25+ countries</li>
                    <li>• Reduced operational costs by 40% through process optimization</li>
                    <li>• Built 100+ strategic alliances with industry leaders</li>
                    <li>• Developed proprietary franchise performance tracking systems</li>
                    <li>• Trained 500+ franchise managers across Asia Pacific</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Education & Certifications</h4>
                  <p className="text-sm text-white">MBA - INSEAD, France | B.Eng - NUS Singapore</p>
                  <p className="text-sm text-white mt-2">Certified Franchise Operations Executive | MIT Sloan - Operations Management Program</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Awards & Recognition</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Operations Excellence Award - Franchise Asia 2023</li>
                    <li>• Top 50 Franchise Professionals - Global Franchise Magazine</li>
                    <li>• Innovation in Process Management Award</li>
                    <li>• Best COO - Emerging Markets Category</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Philosophy</h4>
                  <p className="text-base leading-relaxed text-white">
                    Great franchises are built on great systems. My approach combines data-driven decision making with hands-on operational expertise. We don't just advise — we roll up our sleeves and build alongside you, ensuring every detail is optimized for success.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setCofounderModalOpen(false)}
                className="w-full mt-6 px-6 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold transition-all duration-300 hover:bg-violet-500"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
}

export default LeadershipSection;
