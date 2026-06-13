import { useState } from 'react';
import { motion } from 'framer-motion';
import { linkifyContent } from '../../lib/linkifyContent';

/**
 * Home-style FAQ accordion card - white surface, dark text (both themes).
 */
export default function PremiumFAQItem({ faq, index = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
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
        className="home-faq-item__trigger flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-slate-50/50"
      >
        <h3 className="home-faq-item__question flex-1 pr-2 text-sm font-semibold leading-tight text-[#0b0f19]">
          {linkifyContent(question)}
        </h3>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
          <svg
            className="home-faq-item__icon h-4 w-4 text-slate-600 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="px-4">
          <div className="home-faq-item__answer-wrap pr-2">
            <p className="home-faq-item__answer text-sm leading-relaxed text-slate-700">
              {linkifyContent(answer)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
