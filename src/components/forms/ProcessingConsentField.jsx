import { PRIVACY_CONSENT_FIELD } from '@/lib/forms/privacyConsent';

export default function ProcessingConsentField({
  value,
  onChange,
  purpose,
  error,
  variant = 'light',
  id = PRIVACY_CONSENT_FIELD,
}) {
  const isDark = variant === 'dark';

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed ${
          isDark ? 'text-white/90' : 'text-slate-700'
        }`}
      >
        <input
          id={id}
          name={PRIVACY_CONSENT_FIELD}
          type="checkbox"
          checked={value === true}
          onChange={(event) => onChange?.(PRIVACY_CONSENT_FIELD, event.target.checked)}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-400 accent-violet-600"
        />
        <span>
          <strong>REQUIRES LEGAL REVIEW:</strong> I ask iFranchise to use my submitted details to {purpose},
          as described in the{' '}
          <a className="font-semibold underline" href="/privacy-policy" target="_blank" rel="noreferrer">
            Privacy Notice
          </a>
          .
        </span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
