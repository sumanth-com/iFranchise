const fs = require('fs');
const p = 'src/components/sections/ListYourBrandFAQSection.jsx';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  `              <motion.div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-violet-300 mb-2">Get started</p>
                <h3 className="text-xl font-extrabold text-white mb-2">Ready to list your brand?</h3>
                <p className="text-sm text-violet-100/80 leading-relaxed mb-6">
                  Submit the hero form or speak with our expansion team for a confidential franchise readiness review.
                </p>
              </div>`,
  `              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-violet-300 mb-2">Get started</p>
                <h3 className="text-xl font-extrabold text-white mb-2">Ready to list your brand?</h3>
                <p className="text-sm text-violet-100/80 leading-relaxed mb-6">
                  Submit the hero form or speak with our expansion team for a confidential franchise readiness review.
                </p>
              </motion.div>`
);
// fix mistaken close above - should be </motion.div> -> </div>
s = s.replace(
  `                </p>
              </motion.div>
              <div className="space-y-3">`,
  `                </p>
              </div>
              <div className="space-y-3">`
);
s = s.replace(
  `              </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}`,
  `              </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}`
);
// outer card: motion.div -> div at end
s = s.replace(
  `<motion.div className="card-premium-dark relative flex h-full flex-col justify-between rounded-2xl border border-violet-500/20 p-8 lg:p-9">`,
  `<div className="card-premium-dark relative flex h-full flex-col justify-between rounded-2xl border border-violet-500/20 p-8 lg:p-9">`
);
// close card before motion.div wrapper ends - find </div> before </motion.div> for left column
const marker = `                  Contact Expansion Team
                </button>
              </div>
            </div>`;
const fixed = `                  Contact Expansion Team
                </button>
              </motion.div>
            </motion.div>`;
if (s.includes(marker)) s = s.replace(marker, fixed);
fs.writeFileSync(p, s);
console.log('ok');
