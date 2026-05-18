import { HONEYPOT_FIELD } from '@/lib/forms';

/**
 * Hidden honeypot — bots often fill this; humans never see it.
 */
export default function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name={HONEYPOT_FIELD}
      value={value ?? ''}
      onChange={(e) => onChange?.(HONEYPOT_FIELD, e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
    />
  );
}
