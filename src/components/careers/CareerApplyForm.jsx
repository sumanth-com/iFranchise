import { useTheme } from '../../context/ThemeContext';
import { HONEYPOT_FIELD } from '@/lib/forms';
import { submitCareerApplication } from '@/lib/forms/submitters/careerApplicationSubmitter';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from '../forms/PhoneInput';
import { useFormSubmission, withHoneypot } from '@/hooks/useFormSubmission';
import HoneypotField from '../forms/HoneypotField';
import FormSuccessState from '../forms/FormSuccessState';

const inputBase =
  'career-apply-input w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2';

function fieldClass(hasError) {
  return hasError
    ? `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-500/25`
    : `${inputBase} border-slate-200 focus:border-violet-400 focus:ring-violet-500/25`;
}

function Label({ htmlFor, children, required = false }) {
  return (
    <label htmlFor={htmlFor} className="career-apply-label mb-1 block text-xs font-semibold text-slate-700">
      {children}
      {required ? (
        <span className="ml-0.5 text-red-500" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

function buildInitial(role) {
  return withHoneypot({
    fullName: '',
    contactNumber: createEmptyPhoneValue(),
    email: '',
    resumeLink: '',
    portfolioLink: '',
    message: '',
    roleId: role?.id || '',
    roleTitle: role?.title || '',
  });
}

export default function CareerApplyForm({ role }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const {
    values,
    setField,
    isSubmitting,
    isSuccess,
    submitError,
    fieldErrors,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formKey: `career_apply:${role?.id}`,
    initialValues: buildInitial(role),
    successTitle: 'Application received',
    successDescription: 'Thank you for applying. Our team will review your profile and get back to you soon.',
    onSubmit: (data, { signal }) =>
      submitCareerApplication(data, `careers_role_${role.id}`, { signal }),
  });

  if (!role) return null;

  return (
    <div className="career-apply-form">
      <p className="career-apply-kicker text-[11px] font-bold uppercase tracking-widest text-violet-700">
        Apply now
      </p>
      <h3 className="career-apply-title mt-1 text-base font-bold text-slate-900 sm:text-lg">
        Ready to create with us?
      </h3>

      {isSuccess ? (
        <div className="mt-4">
          <FormSuccessState
            variant="default"
            showTimeline={false}
            showBadge={false}
            title="Application received"
            description="We have your details. If your profile is a fit, we will reach out by email."
            completionNote={role.title}
            onReset={resetForm}
            resetLabel="Submit another response"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="career-apply-fields mt-3 space-y-2" autoComplete="off" noValidate>
          <HoneypotField value={values[HONEYPOT_FIELD]} onChange={setField} />

          <div className="career-apply-field">
            <Label htmlFor={`career-name-${role.id}`} required>
              Full name
            </Label>
            <input
              id={`career-name-${role.id}`}
              type="text"
              required
              minLength={2}
              value={values.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
              className={fieldClass(fieldErrors.fullName)}
              placeholder="Your full name"
              autoComplete="name"
            />
            {fieldErrors.fullName ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
            ) : null}
          </div>

          <div className="career-apply-field">
            <Label htmlFor={`career-phone-${role.id}`} required>
              Contact number
            </Label>
            <PhoneInput
              id={`career-phone-${role.id}`}
              required
              variant={isLight ? 'light' : 'dark'}
              value={values.contactNumber}
              onChange={(value) => setField('contactNumber', value)}
              error={fieldErrors.contactNumber}
            />
          </div>

          <div className="career-apply-field">
            <Label htmlFor={`career-email-${role.id}`} required>
              Email
            </Label>
            <input
              id={`career-email-${role.id}`}
              type="email"
              required
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              className={fieldClass(fieldErrors.email)}
              placeholder="you@email.com"
              autoComplete="email"
            />
            {fieldErrors.email ? <p className="mt-0.5 text-[11px] text-red-600">{fieldErrors.email}</p> : null}
          </div>

          <div className="career-apply-field">
            <Label htmlFor={`career-resume-${role.id}`} required>
              Resume (Google Drive)
            </Label>
            <input
              id={`career-resume-${role.id}`}
              type="url"
              required
              value={values.resumeLink}
              onChange={(e) => setField('resumeLink', e.target.value)}
              className={fieldClass(fieldErrors.resumeLink)}
              placeholder="https://drive.google.com/file/d/…"
              inputMode="url"
            />
            {!fieldErrors.resumeLink ? (
              <p className="mt-0.5 text-[10px] text-slate-500 leading-tight">
                Use a viewable Drive link (Anyone with the link).
              </p>
            ) : (
              <p className="mt-0.5 text-[11px] text-red-600">{fieldErrors.resumeLink}</p>
            )}
          </div>

          <div className="career-apply-field">
            <Label htmlFor={`career-portfolio-${role.id}`}>Portfolio (optional)</Label>
            <input
              id={`career-portfolio-${role.id}`}
              type="url"
              value={values.portfolioLink}
              onChange={(e) => setField('portfolioLink', e.target.value)}
              className={fieldClass(fieldErrors.portfolioLink)}
              placeholder="Behance, website, or Drive (optional)"
              inputMode="url"
            />
            {fieldErrors.portfolioLink ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.portfolioLink}</p>
            ) : null}
          </div>

          <div className="career-apply-field">
            <Label htmlFor={`career-message-${role.id}`} required>
              Message
            </Label>
            <textarea
              id={`career-message-${role.id}`}
              rows={2}
              required
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
              className={`${fieldClass(fieldErrors.message)} resize-none`}
              placeholder="Short intro or why you are a fit"
            />
            {fieldErrors.message ? (
              <p className="mt-0.5 text-[11px] text-red-600">{fieldErrors.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="career-apply-submit flex w-full shrink-0 items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending…' : 'Send application'}
          </button>

          {submitError ? <p className="text-center text-xs text-red-600">{submitError}</p> : null}
        </form>
      )}
    </div>
  );
}
