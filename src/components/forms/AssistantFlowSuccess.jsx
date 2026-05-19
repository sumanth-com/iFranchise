import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { playFormSuccessSound } from '@/lib/playFormSuccessSound';
import {
  assistantSuccessRoot,
  assistantIcon,
  assistantText,
  assistantBtn,
} from './formSuccessMotion';
import './form-success-state.css';

/**
 * Animated thank-you for expansion assistant flows.
 * Preserves inline layout/styles; motion only.
 */
export default function AssistantFlowSuccess({
  iconStyle,
  titleStyle,
  bodyStyle,
  title,
  description,
  children,
  playSound = true,
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (playSound) playFormSuccessSound();
  }, [playSound]);

  const motionProps = reduceMotion
    ? { initial: false, animate: false }
    : { initial: 'hidden', animate: 'show' };

  return (
    <motion.div
      className="assistant-flow-success"
      variants={reduceMotion ? undefined : assistantSuccessRoot}
      {...motionProps}
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {!reduceMotion && (
        <>
          <span className="assistant-flow-success__ring" aria-hidden />
          <span className="assistant-flow-success__particle assistant-flow-success__particle--1" aria-hidden />
          <span className="assistant-flow-success__particle assistant-flow-success__particle--2" aria-hidden />
          <span className="assistant-flow-success__particle assistant-flow-success__particle--3" aria-hidden />
        </>
      )}

      <motion.div
        variants={reduceMotion ? undefined : assistantIcon}
        style={iconStyle}
        className="assistant-flow-success__icon"
      >
        <motion.span
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={reduceMotion ? false : { scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.35, type: 'spring', stiffness: 500, damping: 22 }}
        >
          ✓
        </motion.span>
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : assistantText} style={titleStyle}>
        {title}
      </motion.div>

      {description ? (
        <motion.p
          variants={reduceMotion ? undefined : assistantText}
          style={bodyStyle}
        >
          {description}
        </motion.p>
      ) : null}

      {children ? (
        <motion.div variants={reduceMotion ? undefined : assistantBtn} style={{ width: '100%' }}>
          {children}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
