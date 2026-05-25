import { motion } from 'framer-motion';
import { sectionTitleClass } from '../lib/cardThemeStyles';
import BrandLogo from '../assets/BrandLogo.png';
import abdulPhoto from '../assets/abdul.png';
import abrarPhoto from '../assets/abrar.png';

const FOUNDER_LINKEDIN = 'https://www.linkedin.com/in/syed-abdul-khader/';

function LeadershipLinkedIn3D({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="leadership-linkedin-3d"
      aria-label={label}
    >
      <span className="leadership-linkedin-3d__glare" aria-hidden />
      <svg className="leadership-linkedin-3d__icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  );
}

function LeadershipSection() {
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
            <h2 className={`mt-4 ${sectionTitleClass(false)}`}>
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
                      src={abdulPhoto}
                      alt="Syed Abdul Khader"
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
                    Hello, I'm Syed Abdul Khader
                  </p>

                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    I started iFranchise with a simple belief: every entrepreneur deserves a fair shot at building something extraordinary. Too many brilliant business ideas die not from lack of potential, but from lack of the right guidance, capital, and strategic support.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    We're not just connecting brands with investors - we're building dreams into empires. Every franchise we validate, every partnership we forge, and every expansion we architect is driven by one mission: turning your vision into a legacy that outlasts us all.
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
                        Syed Abdul Khader
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white">
                        Founder & Director
                      </p>
                    </div>
                  </div>
                  
                  <LeadershipLinkedIn3D
                    href={FOUNDER_LINKEDIN}
                    label="Syed Abdul Khader on LinkedIn"
                  />
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
                    Hello, I'm Mohammad Abrar
                  </p>

                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    I've spent over a decade watching businesses fail not because their ideas weren't good enough, but because they lacked the operational backbone to scale. That's what drives me every single day at iFranchise.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    Scaling isn't just about opening more locations. It's about building systems so strong that your brand can thrive in 100 cities without losing its soul. It's about creating frameworks that turn chaos into clarity, and ambition into achievement.
                  </p>
                  <p className="text-[14px] leading-[1.65] text-white lg:text-[15px] lg:leading-[1.7]">
                    We don't just advise - we roll up our sleeves and build alongside you. From market validation to operational excellence, we're in the trenches with every partner, ensuring no detail is overlooked and no opportunity is wasted.
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
                        Mohammad Abrar
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white">
                        Co-Founder
                      </p>
                    </div>
                  </div>
                  
                </motion.div>
              </div>

              {/* RIGHT - IMAGE CARD - MATCHES CONTENT HEIGHT */}
              <div className="relative order-1 lg:order-2 lg:w-[35%] flex-shrink-0">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[320px] lg:h-full lg:max-h-[480px]">
                  <div className="absolute -inset-4 bg-gradient-to-br from-indigo-300/30 via-blue-200/20 to-violet-300/30 blur-3xl opacity-60" />
                  
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950/50 to-slate-900/70">
                    <img
                      src={abrarPhoto}
                      alt="Mohammad Abrar"
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
    </>
  );
}

export default LeadershipSection;
