/** Production-safe logging. verbose output only in development. */

const isDev = import.meta.env.DEV;

function productionMessage(args) {
  const first = args.find((a) => typeof a === 'string');
  return first || 'Application error';
}

export const logger = {
  log: (...args) => {
    if (isDev) console.log(...args);
  },
  warn: (...args) => {
    if (isDev) console.warn(...args);
  },
  /** Critical errors. minimal message in production (no PII dumps). */
  error: (...args) => {
    if (isDev) {
      console.error(...args);
      return;
    }
    console.error(`[iFranchise] ${productionMessage(args)}`);
  },
};
