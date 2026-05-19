/** Shared entrance motion — layout/styles unchanged; animation only */

export const EASE_SMOOTH = [0.22, 1, 0.36, 1];
export const EASE_SNAP = [0.34, 1.45, 0.64, 1];

export const successRoot = {
  hidden: { opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_SMOOTH },
  },
};

export const successCard = {
  hidden: { scale: 0.88, rotate: -2 },
  show: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.85 },
  },
};

export const successStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

export const successIconWrap = {
  hidden: { scale: 0.4, opacity: 0, rotate: -12 },
  show: {
    scale: [0.4, 1.12, 1],
    opacity: 1,
    rotate: [0, 6, 0],
    transition: { duration: 0.7, times: [0, 0.55, 1], ease: EASE_SNAP },
  },
};

export const successBadge = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: [0.85, 1.06, 1],
    transition: { duration: 0.5, ease: EASE_SNAP },
  },
};

export const successFadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_SMOOTH },
  },
};

export const successTimeline = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH, delay: 0.05 },
  },
};

export const successResetBtn = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

/** Compact assistant panel — same stagger feel, tighter timing */
export const assistantSuccessRoot = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const assistantIcon = {
  hidden: { scale: 0, rotate: -25, opacity: 0 },
  show: {
    scale: [0, 1.2, 1],
    rotate: [0, 10, 0],
    opacity: 1,
    transition: { duration: 0.65, times: [0, 0.6, 1], ease: EASE_SNAP },
  },
};

export const assistantText = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_SMOOTH },
  },
};

export const assistantBtn = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: EASE_SMOOTH },
  },
};
