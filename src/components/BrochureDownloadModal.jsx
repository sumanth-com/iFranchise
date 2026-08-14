import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiDownload, FiX } from 'react-icons/fi';
import { submitBrochureDownload } from '@/lib/forms/submitters/brochureDownloadSubmitter';
import { validateBrochureDownloadForm } from '@/lib/forms/validators/brochureDownloadValidator';
import { checkHoneypot, stripHoneypot } from '@/lib/forms/utils/honeypot';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from './forms/PhoneInput';
import StateLocationFields from './forms/StateLocationFields';
import { triggerBrochureDownload } from '@/data/opportunities/brochurePdfs';
import { HONEYPOT_FIELD } from '@/lib/forms';
import { useFormSubmission, withHoneypot } from '@/hooks/useFormSubmission';
import HoneypotField from './forms/HoneypotField';
import FormSuccessState from './forms/FormSuccessState';
import ProcessingConsentField from './forms/ProcessingConsentField';

const INITIAL = withHoneypot({
  fullName: '',
  email: '',
  contactNumber: createEmptyPhoneValue(),
  state: '',
  city: '',
});

const inputBase =
  'brochure-modal-input site-form-field w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition';

function fieldClass(hasError) {
  return hasError
    ? `${inputBase} site-form-field--error border-red-400`
    : `${inputBase} border-slate-200`;
}

function RequiredLabel({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="brochure-modal-label mb-1 block text-xs font-semibold text-slate-700">
      {children}
      <span className="ml-0.5 text-red-500" aria-hidden>
        *
      </span>
    </label>
  );
}

export default function BrochureDownloadModal({ franchise, brochureUrl, onClose }) {
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
    formKey: `brochure_download:${franchise?.id}`,
    initialValues: INITIAL,
    successTitle: 'Download starting',
    successDescription: 'Your brochure should open or save momentarily. Our team may follow up with tailored franchise guidance.',
    onSubmit: async (data, { signal }) => {
      if (!checkHoneypot(data).ok) {
        return { success: false, error: 'Submission rejected.', code: 'SPAM' };
      }

      const payload = {
        ...stripHoneypot(data),
        franchiseId: String(franchise.id),
        franchiseName: franchise.name,
      };

      const validation = validateBrochureDownloadForm(payload);
      if (!validation.success) {
        return { success: false, errors: validation.errors };
      }

      const result = await submitBrochureDownload(validation.data, 'franchise_details_brochure', {
        signal,
      });

      if (!result?.success) return result;
      await triggerBrochureDownload(brochureUrl, franchise.slug);
      return result;
    },
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        if (isSuccess) resetForm();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, isSubmitting, isSuccess, resetForm]);

  if (!franchise || !brochureUrl) return null;

  return createPortal(
    <div
      className="brochure-modal-root fixed inset-0 z-[10050] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting && !isSuccess) onClose();
      }}
    >
      <div className="brochure-modal-backdrop absolute inset-0 bg-slate-900/78 sm:bg-slate-900/60 sm:backdrop-blur-sm" aria-hidden />

      <div className="brochure-download-modal relative z-10 flex w-full max-w-md max-h-[min(92dvh,640px)] flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="brochure-modal-kicker text-xs font-semibold uppercase tracking-wide text-violet-600">
              Download brochure
            </p>
            <h2 id="brochure-modal-title" className="brochure-modal-title mt-1 text-lg font-bold text-slate-900">
              {franchise.name}
            </h2>
            <p className="brochure-modal-subtitle mt-1 text-sm text-slate-600">
              {isSuccess
                ? 'Your brochure is ready.'
                : 'All fields are required to download the official brand brochure.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (isSuccess) resetForm();
              onClose();
            }}
            disabled={isSubmitting}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="brochure-modal-body min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          {isSuccess ? (
            <FormSuccessState
              variant="download"
              showTimeline={false}
              showBadge={false}
              title="Thank you!"
              description="Your brochure has been downloaded. If it did not open automatically, check your Downloads folder."
              completionNote="Brochure PDF"
              soundVariant="professional"
              onReset={() => {
                resetForm();
                onClose();
              }}
              resetLabel="Close"
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off" noValidate>
              <HoneypotField value={values[HONEYPOT_FIELD]} onChange={setField} />

              <div>
                <RequiredLabel htmlFor="brochure-full-name">Full name</RequiredLabel>
                <input
                  id="brochure-full-name"
                  type="text"
                  required
                  minLength={2}
                  value={values.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  className={fieldClass(fieldErrors.fullName)}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  aria-describedby={fieldErrors.fullName ? 'brochure-name-error' : undefined}
                />
                {fieldErrors.fullName ? (
                  <p id="brochure-name-error" className="mt-1 text-xs font-medium text-red-600" role="alert">
                    {fieldErrors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <RequiredLabel htmlFor="brochure-email">Email</RequiredLabel>
                <input
                  id="brochure-email"
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={fieldClass(fieldErrors.email)}
                  placeholder="you@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'brochure-email-error' : undefined}
                />
                {fieldErrors.email ? (
                  <p id="brochure-email-error" className="mt-1 text-xs font-medium text-red-600" role="alert">
                    {fieldErrors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <RequiredLabel htmlFor="brochure-phone">Mobile number</RequiredLabel>
                <PhoneInput
                  id="brochure-phone"
                  required
                  variant="modal"
                  value={values.contactNumber}
                  onChange={(value) => setField('contactNumber', value)}
                  error={fieldErrors.contactNumber}
                />
              </div>

              <StateLocationFields
                layout="stack"
                variant="light"
                className="gap-3"
                dropdownZIndex={10100}
                listPortalClassName="state-location-fields__list--modal"
                stateValue={values.state}
                cityValue={values.city}
                onStateChange={(v) => setField('state', v)}
                onCityChange={(v) => setField('city', v)}
                stateError={fieldErrors.state}
                cityError={fieldErrors.city}
                stateId="brochure-state"
                cityId="brochure-city"
                stateClassName={fieldClass(fieldErrors.state)}
                cityClassName={fieldClass(fieldErrors.city)}
                labelClassName="brochure-modal-label mb-1 block text-xs font-semibold text-slate-700"
              />

              <ProcessingConsentField
                value={values.privacyConsent}
                onChange={setField}
                purpose={`provide the requested ${franchise.name} brochure and respond to this franchise interest`}
                error={fieldErrors.privacyConsent}
                id="brochure-download-privacy-consent"
              />

              {submitError ? (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-purple-solid mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                <FiDownload className="h-4 w-4" aria-hidden />
                {isSubmitting ? 'Submitting…' : 'Submit & download brochure'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
