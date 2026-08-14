import { HONEYPOT_FIELD } from '@/lib/forms';

/**
 * Hidden honeypot. bots often fill visible text fields; browsers must not autofill this.
 */
export default function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name={HONEYPOT_FIELD}
      id={HONEYPOT_FIELD}
      value={value ?? ''}
      onChange={(e) => onChange?.(HONEYPOT_FIELD, e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      data-lpignore="true"
      data-1p-ignore
      data-bwignore
      data-protonpass-ignore="true"
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      onFocus={(e) => e.target.blur()}
    />
  );
}
