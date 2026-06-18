import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { linkifyContent } from '../../lib/linkifyContent';

/**
 * Site-wide FAQ accordion — matches Contact / Services dark premium card style.
 */
export default function PremiumFAQItem({ faq, question: questionProp, answer: answerProp, index = 0, skipLinks = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const question = questionProp ?? faq?.question ?? faq?.q;
  const answer = answerProp ?? faq?.answer ?? faq?.a;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className={`services-faq-item group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12082a] via-[#0e0620] to-[#0a0618] backdrop-blur-sm transition-all duration-300 ${
        isOpen ? 'is-open' : ''
      }`}
    >
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/5 to-indigo-600/10"
        />
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 sm:px-6 sm:py-5"
      >
        <span className="services-faq-question text-sm font-bold text-white transition-colors duration-300 sm:text-base">
          {linkifyContent(question, { skip: skipLinks })}
        </span>
        <span
          className={`services-faq-toggle flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? 'is-open' : ''
          }`}
        >
          <FiChevronDown
            className={`services-faq-toggle-icon h-4 w-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
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
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
              },
            }}
            className="relative overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="border-t border-violet-500/20 pt-2">
                <p className="services-faq-answer mt-3 text-sm leading-relaxed text-white sm:text-[15px]">
                  {linkifyContent(answer, { skip: skipLinks })}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-200 group-hover:translate-x-full" />
    </motion.div>
  );
}
