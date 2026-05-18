import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Premium inline success state — same form area, no redirect.
 */
export default function FormSuccessState({
  title = 'Thank you!',
  description = 'Your submission was received successfully. Our team will get back to you shortly.',
  resetLabel = 'Submit Another Response',
  onReset,
  variant = 'default',
  className = '',
}) {
  const isDark = variant === 'dark' || variant === 'emerald';

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`flex flex-col items-center justify-center py-8 text-center sm:py-10 ${className}`}
      style={{ willChange: 'opacity, transform' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border sm:h-14 sm:w-14 ${
          isDark
            ? 'border-emerald-400/30 bg-emerald-500/15'
            : 'border-emerald-200 bg-emerald-50'
        }`}
      >
        <svg
          className={`h-6 w-6 sm:h-7 sm:w-7 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h3
        className={`text-lg font-semibold tracking-tight sm:text-xl ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 max-w-sm text-sm leading-relaxed ${
          isDark ? 'text-white/60' : 'text-slate-600'
        }`}
      >
        {description}
      </p>

      {onReset && (
        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            isDark
              ? 'border border-white/20 bg-white/10 text-white hover:bg-white/15'
              : 'border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-violet-300 hover:bg-slate-50'
          }`}
        >
          {resetLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
