import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Home-style FAQ accordion card - white surface, dark text (both themes).
 */
export default function PremiumFAQItem({ faq, index = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const number = faq.number ?? String(index + 1).padStart(2, '0');
  const question = faq.question ?? faq.q;
  const answer = faq.answer ?? faq.a;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className={`home-faq-item group overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
        isOpen ? 'border-slate-300/80 shadow-lg' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-slate-50/50"
      >
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0b0f19] to-slate-700 text-sm font-bold text-white shadow-sm">
            {number}
          </div>
          <h3 className="pr-2 text-sm font-semibold leading-tight text-[#0b0f19]">{question}</h3>
        </div>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
          <svg
            className={`h-4 w-4 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-48 pb-4' : 'max-h-0'
        }`}
      >
        <div className="px-4">
          <div className="pl-11 pr-2">
            <p className="text-xs leading-relaxed text-slate-600">{answer}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
