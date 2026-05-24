import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  EASE_SMOOTH,
  successRoot,
  successCard,
  successStagger,
  successIconWrap,
  successBadge,
  successFadeUp,
  successTimeline,
  successResetBtn,
} from './formSuccessMotion';
import './form-success-state.css';

const CONFETTI_COUNT = 12;
const BURST_LINES = 8;

/**
 * Premium inline success state — same form area, no redirect.
 * Animation-only upgrades; layout & visual styles unchanged.
 */
export default function FormSuccessState({
  title = 'Thank you!',
  description = 'Your submission was received successfully. Our team will get back to you shortly.',
  resetLabel = 'Submit Another Response',
  onReset,
  variant = 'default',
  className = '',
  playSound = true,
  soundVariant = 'default',
  showTimeline = true,
  showBadge = true,
  badgeLabel = 'Success',
  completionNote = '',
}) {
  const reduceMotion = useReducedMotion();
  const isDownload = variant === 'download';
  const confettiCount = isDownload ? 6 : CONFETTI_COUNT;
  const variantClass =
    variant === 'dark' || variant === 'emerald' || isDownload
      ? `form-success-state--${variant}`
      : 'form-success-state--default';

  useEffect(() => {
    if (!playSound || soundVariant === 'none') return;
    let cancelled = false;
    import('@/lib/playFormSuccessSound')
      .then(({ playFormSuccessSound, playProfessionalSuccessSound, playClimbingSuccessSound }) => {
        if (cancelled) return;
        if (soundVariant === 'professional' || soundVariant === 'climbing') {
          playProfessionalSuccessSound();
        } else {
          playFormSuccessSound();
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [playSound, soundVariant]);

  const motionProps = reduceMotion
    ? { initial: false, animate: false }
    : {
        initial: 'hidden',
        animate: 'show',
      };

  return (
    <motion.div
      role="status"
      aria-live="polite"
      variants={reduceMotion ? undefined : successRoot}
      {...motionProps}
      className={`form-success-state ${variantClass} ${className}`.trim()}
    >
      <motion.div
        className="form-success-state__card"
        variants={reduceMotion ? undefined : successCard}
        {...motionProps}
      >
        <span className="form-success-state__aurora" aria-hidden />
        <span className="form-success-state__shimmer" aria-hidden />
        <span className="form-success-state__shimmer form-success-state__shimmer--second" aria-hidden />
        {!reduceMotion &&
          Array.from({ length: confettiCount }, (_, i) => (
            <span
              key={i}
              className={`form-success-state__confetti form-success-state__confetti--${(i % 12) + 1}`}
              aria-hidden
            />
          ))}
        {!reduceMotion &&
          !isDownload &&
          Array.from({ length: BURST_LINES }, (_, i) => (
            <span
              key={`burst-${i}`}
              className="form-success-state__burst-line"
              style={{ '--burst-i': i }}
              aria-hidden
            />
          ))}

        <motion.div
          className="form-success-state__glow"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          aria-hidden
        />
        {!isDownload && (
          <>
            <span className="form-success-state__spark form-success-state__spark--1" aria-hidden />
            <span className="form-success-state__spark form-success-state__spark--2" aria-hidden />
            <span className="form-success-state__spark form-success-state__spark--3" aria-hidden />
            <span className="form-success-state__spark form-success-state__spark--4" aria-hidden />
          </>
        )}

        <motion.div
          className="form-success-state__content"
          variants={reduceMotion ? undefined : successStagger}
          {...motionProps}
        >
          <motion.div
            className="form-success-state__icon-wrap"
            variants={reduceMotion ? undefined : successIconWrap}
          >
            <span className="form-success-state__ring" aria-hidden />
            {!isDownload && (
              <>
                <span className="form-success-state__ring form-success-state__ring--delayed" aria-hidden />
                <span className="form-success-state__ring form-success-state__ring--orbit" aria-hidden />
              </>
            )}
            <div className="form-success-state__icon">
              <svg className="form-success-state__check" viewBox="0 0 24 24" fill="none" aria-hidden>
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  animate={reduceMotion ? false : { pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12.5l2.5 2.5L16 9"
                  initial={reduceMotion ? false : { pathLength: 0, scale: 0.8 }}
                  animate={reduceMotion ? false : { pathLength: 1, scale: 1 }}
                  transition={{ delay: 0.28, duration: 0.45, ease: EASE_SMOOTH }}
                />
              </svg>
            </div>
          </motion.div>

          {showBadge && (
            <motion.span
              className="form-success-state__badge"
              variants={reduceMotion ? undefined : successBadge}
            >
              <span className="form-success-state__badge-dot" aria-hidden />
              {badgeLabel}
            </motion.span>
          )}

          <motion.h3 className="form-success-state__title" variants={reduceMotion ? undefined : successFadeUp}>
            {title}
          </motion.h3>

          <motion.p
            className="form-success-state__description"
            variants={reduceMotion ? undefined : successFadeUp}
          >
            {description}
          </motion.p>

          {completionNote ? (
            <motion.div
              className="form-success-state__complete-note"
              variants={reduceMotion ? undefined : successFadeUp}
            >
              <span className="form-success-state__complete-note-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-6Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                  <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </span>
              <span className="form-success-state__complete-note-text">
                <span className="form-success-state__complete-note-title">{completionNote}</span>
                <span className="form-success-state__complete-note-hint">Saved to your downloads folder</span>
              </span>
            </motion.div>
          ) : null}

          {showTimeline && (
            <motion.div
              className="form-success-state__timeline"
              variants={reduceMotion ? undefined : successTimeline}
              aria-hidden
            >
              <span className="form-success-state__timeline-step form-success-state__timeline-step--active">
                Received
              </span>
              <span className="form-success-state__timeline-sep">→</span>
              <span className="form-success-state__timeline-step form-success-state__timeline-step--reveal">
                Review
              </span>
              <span className="form-success-state__timeline-sep">→</span>
              <span className="form-success-state__timeline-step form-success-state__timeline-step--reveal form-success-state__timeline-step--reveal-late">
                We&apos;ll reply
              </span>
            </motion.div>
          )}

          {onReset && (
            <motion.button
              type="button"
              onClick={onReset}
              className="form-success-state__reset"
              variants={reduceMotion ? undefined : successResetBtn}
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              {resetLabel}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
