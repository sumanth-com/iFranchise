import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Magnetic button
function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22 });
  const sy = useSpring(y, { stiffness: 300, damping: 22 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      onClick={onClick} whileTap={{ scale: 0.97 }}
      className={className}>
      {children}
    </motion.button>
  );
}

export default function FinalCTA() {
  const nav = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">

      {/* white-only ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-white to-indigo-50/30" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.025]">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)"/>
        </svg>
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, 40, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-[100px]"
        />
        {/* light trails */}
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            animate={{ x: ['-100%', '200%'], opacity: [0, 0.3, 0] }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 2.5, ease: 'easeInOut' }}
            className="absolute h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent"
            style={{ top: `${28 + i * 22}%`, width: '60%', left: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6"
        >
          The Next Category-Defining{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Franchise Brand Could Be Yours.
          </span>
        </motion.h2>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-white text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          200+ brands have already started their franchise journey with iFranchise. The infrastructure, the investors, and the systems are ready. The only thing missing is your brand.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <MagneticButton
            onClick={() => nav('/contact')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white text-base font-bold shadow-xl shadow-slate-900/20 hover:bg-violet-700 hover:shadow-violet-200/50 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-3">
              Start Your Expansion Journey
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
                </svg>
              </span>
            </span>
          </MagneticButton>

          <MagneticButton
            onClick={() => nav('/franchise-opportunities')}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-slate-300 text-slate-700 text-base font-semibold hover:border-violet-400 hover:text-violet-700 transition-all duration-200 shadow-sm"
          >
            Browse Opportunities
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
            </svg>
          </MagneticButton>
        </motion.div>

        {/* trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '200+',  label: 'Brands Scaled'       },
            { value: '1800+', label: 'Investors Onboarded' },
            { value: '17+',   label: 'Cities Active'       },
            { value: '94%',   label: 'Engagement Rate'     },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl font-extrabold text-slate-900">{s.value}</span>
              <span className="text-[0.68rem] text-white mt-0.5">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
