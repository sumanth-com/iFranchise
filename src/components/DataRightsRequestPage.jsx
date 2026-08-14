import { HONEYPOT_FIELD, submitDataRightsRequest } from '@/lib/forms';
import { useFormSubmission, withHoneypot } from '@/hooks/useFormSubmission';
import HoneypotField from './forms/HoneypotField';
import ProcessingConsentField from './forms/ProcessingConsentField';
import FormSuccessState from './forms/FormSuccessState';
import { pageHeroClass } from '@/lib/cardThemeStyles';

const INITIAL_VALUES = withHoneypot({
  fullName: '',
  email: '',
  requestType: '',
  details: '',
  verificationAcknowledgment: false,
});

const REQUEST_TYPES = [
  ['access_information', 'Access / information about processing'],
  ['correction', 'Correction, completion or updating'],
  ['erasure', 'Erasure'],
  ['consent_withdrawal', 'Withdrawal of consent'],
  ['grievance', 'Privacy grievance'],
];

const inputClass =
  'site-form-field w-full rounded-xl border border-white/20 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/55 focus:border-violet-400';

export default function DataRightsRequestPage() {
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
    formKey: 'data_rights_request',
    initialValues: INITIAL_VALUES,
    onSubmit: (data, { signal }) =>
      submitDataRightsRequest(data, 'data_rights_request', { signal }),
  });

  return (
    <div className="relative z-10 min-h-screen text-white">
      <div className="border-b border-violet-500/20 card-premium-dark-inner rounded-none border-x-0 border-t-0">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-widest text-white/80">
            REQUIRES LEGAL REVIEW
          </span>
          <h1 className={`${pageHeroClass(false)} mb-5`}>Data Rights Request</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white sm:text-lg">
            Use this intake form to request access-related information, correction, erasure, consent
            withdrawal, or grievance review. Submission does not automatically disclose or change stored
            personal data.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="card-premium-dark rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:p-8 lg:p-12">
          {isSuccess ? (
            <FormSuccessState
              title="Request received"
              description="The request has been recorded for internal review. Identity or authority may need to be verified before action is taken."
              onReset={resetForm}
              variant="dark"
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <HoneypotField value={values[HONEYPOT_FIELD]} onChange={setField} />

              <p className="rounded-xl border border-amber-300/35 bg-amber-300/10 p-4 text-sm font-medium leading-relaxed text-amber-100">
                REQUIRES LEGAL REVIEW: Do not include passwords, payment information, identity-document
                numbers, or unrelated sensitive information. Provide enough context to identify the
                relevant form or enquiry.
              </p>

              <div>
                <label htmlFor="rights-full-name" className="mb-1.5 block text-sm font-semibold">
                  Full name
                </label>
                <input
                  id="rights-full-name"
                  className={inputClass}
                  value={values.fullName}
                  onChange={(event) => setField('fullName', event.target.value)}
                  autoComplete="name"
                  maxLength={100}
                  required
                />
                {fieldErrors.fullName ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.fullName}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="rights-email" className="mb-1.5 block text-sm font-semibold">
                  Email used for the relevant enquiry
                </label>
                <input
                  id="rights-email"
                  type="email"
                  className={inputClass}
                  value={values.email}
                  onChange={(event) => setField('email', event.target.value)}
                  autoComplete="email"
                  maxLength={254}
                  required
                />
                {fieldErrors.email ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="rights-request-type" className="mb-1.5 block text-sm font-semibold">
                  Request type
                </label>
                <div className="relative">
                  <select
                    id="rights-request-type"
                    className={`${inputClass} min-h-12 cursor-pointer appearance-none pr-12`}
                    value={values.requestType}
                    onChange={(event) => setField('requestType', event.target.value)}
                    required
                  >
                    <option value="">Select a request</option>
                    {REQUEST_TYPES.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-current opacity-70"
                  >
                    <path
                      d="m6 8 4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {fieldErrors.requestType ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.requestType}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="rights-details" className="mb-1.5 block text-sm font-semibold">
                  Request details
                </label>
                <textarea
                  id="rights-details"
                  rows={5}
                  className={`${inputClass} resize-y`}
                  value={values.details}
                  onChange={(event) => setField('details', event.target.value)}
                  maxLength={2000}
                  required
                  placeholder="Identify the form, approximate submission date, franchise or role, and the action requested."
                />
                {fieldErrors.details ? (
                  <p className="mt-1 text-xs text-red-400">{fieldErrors.details}</p>
                ) : null}
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-white/90">
                  <input
                    type="checkbox"
                    checked={values.verificationAcknowledgment === true}
                    onChange={(event) =>
                      setField('verificationAcknowledgment', event.target.checked)
                    }
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-violet-600"
                  />
                  <span>
                    <strong>REQUIRES LEGAL REVIEW:</strong> I understand that iFranchise may need to
                    verify my identity or authority before disclosing, correcting or erasing personal
                    data.
                  </span>
                </label>
                {fieldErrors.verificationAcknowledgment ? (
                  <p className="mt-1 text-xs text-red-400">
                    {fieldErrors.verificationAcknowledgment}
                  </p>
                ) : null}
              </div>

              <ProcessingConsentField
                value={values.privacyConsent}
                onChange={setField}
                purpose="receive, verify and respond to this data-principal request"
                error={fieldErrors.privacyConsent}
                variant="dark"
                id="data-rights-privacy-consent"
              />

              {submitError ? (
                <p className="text-sm font-medium text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting…' : 'Submit data rights request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
