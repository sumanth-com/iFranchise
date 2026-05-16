const fs = require('fs');
const p = 'src/components/ForBrandOwnersPage.jsx';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);

const hero = `      <section
        className={\`\${LYB_SECTION} w-full flex flex-col justify-center py-6 lg:py-8 overflow-hidden\`}
        style={{ minHeight: 'calc(100vh - 80px)', maxHeight: 'calc(100vh - 80px)' }}
      >
        <motion.div className="relative z-10 flex h-full min-h-0 items-center">
          <motion.div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
            <motion.div
              className="grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] gap-6 xl:gap-10 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-violet-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                  For brand founders
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white max-w-lg">
                  List your brand.{' '}
                  <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                    Scale with capital.
                  </span>
                </h1>
                <p className="text-sm text-violet-100/85 leading-relaxed max-w-md">
                  Investor-ready franchise listing — model design, verified capital, and multi-city rollout.
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-violet-100/90">
                  <li className="flex items-center gap-1.5"><IcoUsers /><span>1,800+ investors</span></li>
                  <li className="flex items-center gap-1.5"><IcoShield /><span>SEBI-aligned</span></li>
                  <li className="flex items-center gap-1.5"><IcoTrend /><span>30-day readiness</span></li>
                </ul>
                <button
                  type="button"
                  onClick={scrollToInquiry}
                  className="group inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-violet-50"
                >
                  Start Franchise Listing
                  <IcoArrow />
                </button>
              </motion.div>
              <HeroBrandInquiryForm id="hero-brand-inquiry" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>`.split(/\r?\n/);

const s = lines.findIndex((l) => l.includes('LYB_SECTION') && l.includes('w-full flex flex-col justify-center'));
const e = lines.findIndex((l, i) => i > s && l.trim() === '</section>' && lines[i + 2]?.includes('TrustStrip'));
console.log('hero', s, e);
const newLines = [...lines.slice(0, s), ...hero, ...lines.slice(e + 1)];
fs.writeFileSync(p, newLines.join('\n'));
