import { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ_ITEMS = [
  {
    question: 'What types of brands can list on iFranchise?',
    answer: 'Brands with a proven model and at least one operational unit — across F&B, wellness, education, retail, tech, and more.',
  },
  {
    question: 'How long does it take to become franchise-ready?',
    answer: 'Most brands are franchise-ready within 30 days including model design, legal docs, SOPs, and investor materials.',
  },
  {
    question: 'How does investor matching work?',
    answer: 'We match your opportunity to 1,800+ pre-screened investors filtered by sector, ticket size, geography, and intent.',
  },
  {
    question: 'What franchise models do you support?',
    answer: 'FOFO, FOCO, and FICO — we help you choose based on operations complexity and investor profile.',
  },
  {
    question: 'Is there support after launch?',
    answer: 'Yes — 90-day post-launch support plus ongoing advisory for multi-city expansion.',
  },
];

export default function ListYourBrandFAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="w-full py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-white lg:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-lg text-white">
            Quick answers for brand founders exploring franchise expansion.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="card-premium-dark relative flex h-full flex-col justify-between rounded-2xl border border-violet-500/20 p-8 lg:p-9">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent opacity-70" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white mb-2">Get started</p>
                <h3 className="text-xl font-extrabold text-white mb-2">Ready to list your brand?</h3>
                <p className="text-sm text-violet-100/80 leading-relaxed mb-6">
                  Submit the hero form or speak with our expansion team for a confidential franchise readiness review.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => document.getElementById('hero-brand-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="w-full rounded-xl bg-white py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-violet-50"
                >
                  Start Brand Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
                  className="w-full rounded-xl border border-violet-500/40 bg-white/5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/60"
                >
                  Contact Expansion Team
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.button
                  key={item.question}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
                  className="text-left card-premium-dark rounded-xl p-5 transition hover:border-violet-500/45 hover:shadow-[0_12px_40px_rgba(109,40,217,0.2)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="pr-2 font-semibold text-white">{item.question}</p>
                    <span className="shrink-0 text-lg font-semibold text-white">{isOpen ? '−' : '+'}</span>
                  </div>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
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
  );
}
