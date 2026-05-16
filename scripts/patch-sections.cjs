const fs = require('fs');

// Roadmap section
const convPath = 'src/components/sections/ListYourBrandConversionSections.jsx';
let conv = fs.readFileSync(convPath, 'utf8');
const roadmapStart = conv.indexOf('export function RoadmapTimelineSection()');
const roadmapEnd = conv.indexOf('\n}', conv.lastIndexOf('</section>', conv.length - 1)) + 2;
const newRoadmap = `function ColumnShell({ label, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full min-h-[380px] flex-col rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 via-[#0e0620]/80 to-[#0a0618]/90 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-5"
    >
      <motion.div className="mb-4 flex shrink-0 items-center justify-between border-b border-violet-500/20 pb-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-violet-300">{label}</p>
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-violet-400"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.div className="flex flex-1 flex-col gap-2.5">{children}</motion.div>
    </motion.div>
  );
}

export function RoadmapTimelineSection() {
  return (
    <section className={VIEWPORT_SECTION}>
      <motion.div className={\`\${LYB_CONTAINER} w-full\`}>
        <SectionHeader
          badge="Your path to scale"
          title="Roadmap & Timeline at a Glance"
          subtitle="Franchise-ready to investor conversations — typically within 30 days."
        />
        <motion.div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8">
          <ColumnShell label="Scaling roadmap" delay={0}>
            {ROADMAP.map((r, i) => (
              <motion.div
                key={r.phase}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.08, duration: 0.45 }}
                whileHover={{ x: 4 }}
                className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-xl border border-violet-500/20 bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-violet-400/35"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-violet-400 to-indigo-500"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                />
                <p className="text-[0.58rem] font-bold uppercase tracking-wider text-violet-400">{r.phase}</p>
                <h3 className="mt-0.5 text-sm font-extrabold text-white">{r.title}</h3>
                <p className="mt-1 text-[0.72rem] leading-snug text-violet-100/75">{r.items.join(' · ')}</p>
              </motion.div>
            ))}
          </ColumnShell>

          <ColumnShell label="Timeline" delay={0.1}>
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.week}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                whileHover={{ x: -4 }}
                className="relative flex flex-1 items-center gap-3 overflow-hidden rounded-xl border border-violet-500/20 bg-white/[0.04] px-3 py-3 transition-colors hover:border-violet-400/35"
              >
                <motion.span
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[0.65rem] font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, delay: 0.12 + i * 0.08 }}
                >
                  {i + 1}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-violet-300/50"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.span>
                <motion.div className="min-w-0 flex-1">
                  <p className="text-[0.58rem] font-bold uppercase tracking-wider text-violet-300">{t.week}</p>
                  <h3 className="text-sm font-extrabold text-white">{t.title}</h3>
                  <p className="text-[0.7rem] text-violet-100/75">{t.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </ColumnShell>
        </motion.div>
      </motion.div>
    </section>
  );
}
`;

if (roadmapStart === -1) throw new Error('RoadmapTimelineSection not found');
conv = conv.slice(0, roadmapStart) + newRoadmap;
fs.writeFileSync(convPath, conv);
console.log('roadmap patched');

// Problems section grid
const pagePath = 'src/components/ForBrandOwnersPage.jsx';
let page = fs.readFileSync(pagePath, 'utf8');
page = page.replace(
  'className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"',
  'className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10"'
);
page = page.replace(
  /className="space-y-2"\s*\n\s*>\s*\n\s*<p className="mb-4 shrink-0/,
  'className="flex min-h-[520px] flex-col"\n          >\n            <p className="mb-4 shrink-0'
);
fs.writeFileSync(pagePath, page);
console.log('problems patched');
