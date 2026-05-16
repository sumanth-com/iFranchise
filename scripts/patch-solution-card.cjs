const fs = require('fs');
const p = 'src/components/ForBrandOwnersPage.jsx';
let s = fs.readFileSync(p, 'utf8');

const oldBlock = `                <div className="p-5 space-y-4">
                  {/* problem recap pill */}
                  <motion.div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-400/30">
                    <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold text-red-200">{item.problem}</span>
                    <svg className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold text-violet-300">Fixed</span>
                  </motion.div>

                  {/* solution description */}
                  <p className="text-[0.88rem] text-slate-300 leading-relaxed">{item.solutionDesc}</p>

                  {/* outcome tags   unique per item */}
                  <motion.div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, t) => (
                      <span key={t} className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[0.68rem] font-semibold \${item.tagColor}\`}>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* progress + CTA */}
                  <motion.div className="flex items-center justify-between pt-2 border-t border-white/10">`;

// Try without motion.div if file uses div
const oldBlock2 = oldBlock
  .replace(/motion\.div/g, 'motion.div')
  .replace('<motion.div className="flex items-center gap-2', '<div className="flex items-center gap-2')
  .replace('</motion.div>\n\n                  {/* solution', '</div>\n\n                  {/* solution');

const newBlock = `                <div className="flex flex-1 flex-col space-y-4 p-5">
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2">
                    <svg className="h-3.5 w-3.5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span className="text-[0.72rem] font-semibold text-red-200">{item.problem}</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-[0.72rem] font-semibold text-violet-300">Fixed</span>
                  </div>

                  <p className="text-[0.9rem] font-medium leading-relaxed text-white/95">{item.solutionDesc}</p>
                  <p className="text-[0.8rem] leading-relaxed text-violet-100/75">{item.solutionDetail}</p>

                  <ul className="space-y-2 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3.5">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-[0.78rem] text-violet-100/90">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className={\`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold \${item.tagColor}\`}>
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-violet-300/90">{item.metric}</p>

                  <motion.div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">`;

const start = s.indexOf('<div className="p-5 space-y-4">');
const end = s.indexOf('{/* progress + CTA */}', start);
if (start === -1 || end === -1) throw new Error('block not found');
const endLine = s.indexOf('<div className="flex items-center justify-between pt-2 border-t border-white/10">', end);
if (endLine === -1) throw new Error('footer not found');
s = s.slice(0, start) + newBlock + s.slice(endLine);
fs.writeFileSync(p, s);
console.log('patched');
