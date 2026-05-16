import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CtaButton from '../ui/CtaButton';

const FAQS = [
  {
    question: 'What types of brands can list on iFranchise?',
    answer: 'We work with brands across all industries — Food & Beverage, Health & Wellness, Education, Retail, Technology, Home Services, and more. The key requirement is a proven business model with at least one operational unit and a clear value proposition for franchise investors.',
  },
  {
    question: 'How long does it take to become franchise-ready?',
    answer: 'Most brands are franchise-ready within 30 days of onboarding. This includes franchise model design, legal documentation, SOP development, and investor deck preparation. Complex brands may take 45–60 days.',
  },
  {
    question: 'What is the difference between FOFO, FOCO, and FICO models?',
    answer: 'FOFO means the investor owns and runs the unit. FOCO means the investor owns but our team operates. FICO means the investor provides capital and the company handles everything. We help you choose the right model based on your brand\'s operational complexity and investor profile.',
  },
  {
    question: 'How does iFranchise find and qualify investors?',
    answer: 'We maintain a network of 1800+ pre-screened investors across India. Every investor is verified for capital availability, investment intent, and market fit before being matched to a brand — no cold leads, no tyre-kickers.',
  },
  {
    question: 'What does the franchise documentation process include?',
    answer: 'Our documentation suite covers: Franchise Disclosure Document (FDD), Franchise Agreement, Territory Rights Agreement, Operations Manual, Brand Standards Guide, Training Curriculum, and Financial Projections — all customized for your brand.',
  },
  {
    question: 'Do you provide support after the franchise is launched?',
    answer: 'Yes. We provide 90-day post-launch support for every new franchise unit — covering operational setup, staff training, quality audits, and performance monitoring. We also offer ongoing advisory for multi-unit expansion planning.',
  },
  {
    question: 'What is the investment required to list on iFranchise?',
    answer: 'Our engagement model is structured around your expansion goals. We offer tiered packages based on the scope of services required — from documentation-only to full-service expansion management. Contact our team for a custom proposal.',
  },
  {
    question: 'How many cities can I expand to through iFranchise?',
    answer: 'There is no limit. We have successfully expanded brands from 1 city to 25+ cities within 18 months. Our territory planning system identifies the highest-potential markets and sequences expansion for maximum success probability.',
  },
];

function FAQItem({ question, answer, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-violet-500/25 bg-white/5 backdrop-blur-sm transition-all duration-300"
      style={{ borderColor: isOpen ? 'rgba(15,23,42,0.18)' : undefined }}
    >
      {/* active glow */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-violet-50/30 to-purple-50/50 pointer-events-none"
        />
      )}

      <button
        onClick={onToggle}
        className="relative w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 transition-colors duration-300"
      >
        <span className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
          isOpen ? 'text-white' : 'text-white'
        }`}>
          {question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
            isOpen
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-white group-hover:bg-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, delay: 0.08 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="relative px-6 pb-6 sm:px-8 sm:pb-7">
              <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300/50 to-transparent mb-4" />
              <p className="text-[0.88rem] text-white leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-transparent py-10 lg:py-14 pb-16">
      <div className="relative z-10 max-w-[860px] mx-auto px-6 lg:px-10">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-5">
            <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 mr-2 align-middle" />
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-extrabold tracking-tight text-white leading-[1.1] mb-3">
            Everything You Need to Know About{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Listing Your Brand
            </span>
          </h2>
          <p className="text-white text-base max-w-xl mx-auto leading-relaxed">
            Answers to the most common questions from brand owners exploring franchise expansion.
          </p>
        </motion.div>

        {/* accordion */}
        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-white text-sm mb-4">Still have questions? Our expansion team is ready to help.</p>
          <CtaButton
            size="sm"
            onClick={() => { window.history.pushState({}, '', '/contact'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          >
            Talk to an Expansion Expert
          </CtaButton>
        </motion.div>

      </div>
    </section>
  );
}
