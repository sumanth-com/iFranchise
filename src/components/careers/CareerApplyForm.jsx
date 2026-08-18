import { HONEYPOT_FIELD } from '@/lib/forms';
import { submitCareerApplication } from '@/lib/forms/submitters/careerApplicationSubmitter';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from '../forms/PhoneInput';
import StateLocationFields from '../forms/StateLocationFields';
import { useFormSubmission, withHoneypot } from '@/hooks/useFormSubmission';
import HoneypotField from '../forms/HoneypotField';
import FormSuccessState from '../forms/FormSuccessState';
import ProcessingConsentField from '../forms/ProcessingConsentField';

const inputBase =
  'career-apply-input site-form-field w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition';

function fieldClass(hasError) {
  return hasError
    ? `${inputBase} site-form-field--error border-red-400`
    : `${inputBase} border-slate-200`;
}

function Label({ htmlFor, children, required = false }) {
  return (
    <label htmlFor={htmlFor} className="career-apply-label mb-1 block text-sm font-semibold text-slate-700">
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
    state: '',
    city: '',
    roleId: role?.id || '',
    roleTitle: role?.title || '',
  });
}

export default function CareerApplyForm({ role }) {
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
      <h3 className="career-apply-title mt-0.5 text-base font-bold text-slate-900 lg:text-[1.0625rem]">
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
        <form onSubmit={handleSubmit} className="career-apply-fields mt-2 space-y-1.5 lg:space-y-1" autoComplete="off" noValidate>
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
              variant="light"
              className="career-apply-phone"
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

          <div className="career-apply-field w-full min-w-0">
            <StateLocationFields
              layout="row"
              className="w-full gap-2 sm:gap-3"
              variant="light"
              stateValue={values.state}
              cityValue={values.city}
              onStateChange={(v) => setField('state', v)}
              onCityChange={(v) => setField('city', v)}
              stateError={fieldErrors.state}
              cityError={fieldErrors.city}
              stateId={`career-state-${role.id}`}
              cityId={`career-city-${role.id}`}
              stateClassName={fieldClass(fieldErrors.state)}
              cityClassName={fieldClass(fieldErrors.city)}
              labelClassName="career-apply-label mb-1 block text-sm font-semibold text-slate-700"
            />
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
              placeholder="Drive link (Anyone with the link)"
              title="Use a viewable Google Drive link"
              inputMode="url"
            />
            {!fieldErrors.resumeLink ? (
              <p className="career-apply-resume-hint mt-1 text-[10px] leading-snug text-slate-500">
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
              rows={1}
              required
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
              className={`${fieldClass(fieldErrors.message)} min-h-[2.5rem] resize-none py-2`}
              placeholder="Short intro or why you are a fit"
            />
            {fieldErrors.message ? (
              <p className="mt-0.5 text-[11px] text-red-600">{fieldErrors.message}</p>
            ) : null}
          </div>

          <div className="career-apply-form-footer mt-2 space-y-3 border-t border-slate-100 pt-3">
            <ProcessingConsentField
              value={values.privacyConsent}
              onChange={setField}
              purpose={`evaluate this application for the ${role.title} role and respond`}
              error={fieldErrors.privacyConsent}
              id={`career-privacy-consent-${role.id}`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="career-apply-submit flex w-full shrink-0 items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 lg:py-2"
            >
              {isSubmitting ? 'Sending…' : 'Send application'}
            </button>

            {submitError ? <p className="mt-2 text-center text-xs text-red-600">{submitError}</p> : null}
          </div>
        </form>
      )}
    </div>
  );
}
