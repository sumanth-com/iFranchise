import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiDownload, FiX } from 'react-icons/fi';
import { submitBrochureDownload } from '@/lib/forms/submitters/brochureDownloadSubmitter';
import { digitsOnlyPhone, phoneInputProps } from '@/lib/phoneInput';
import { triggerBrochureDownload } from '@/data/opportunities/brochurePdfs';
import { useFormSubmission, withHoneypot } from '@/hooks/useFormSubmission';
import HoneypotField from './forms/HoneypotField';
import FormSuccessState from './forms/FormSuccessState';

const INITIAL = withHoneypot({
  fullName: '',
  email: '',
  contactNumber: '',
});

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/25';

export default function BrochureDownloadModal({ franchise, brochureUrl, onClose }) {
  const {
    values,
    setField,
    isSubmitting,
    isSuccess,
    submitError,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formKey: `brochure_download:${franchise?.id}`,
    initialValues: INITIAL,
    successTitle: 'Download starting',
    successDescription: 'Your brochure should open or save momentarily. Our team may follow up with tailored franchise guidance.',
    onSubmit: async (data, { signal }) => {
      const payload = {
        ...data,
        franchiseId: String(franchise.id),
        franchiseName: franchise.name,
      };
      const result = await submitBrochureDownload(payload, 'franchise_details_brochure', { signal });
      if (result?.success) {
        triggerBrochureDownload(brochureUrl, franchise.name);
        window.setTimeout(() => onClose(), 1200);
      }
      return result;
    },
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, isSubmitting]);

  if (!franchise || !brochureUrl) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" aria-hidden />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Download brochure</p>
            <h2 id="brochure-modal-title" className="mt-1 text-lg font-bold text-slate-900">
              {franchise.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Share your details to download the official brand brochure.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          {isSuccess ? (
            <FormSuccessState
              title="Thank you!"
              description="Your brochure download is starting. Check your downloads folder if it does not open automatically."
              onReset={() => {
                resetForm();
                onClose();
              }}
              resetLabel="Close"
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <HoneypotField value={values._hp} onChange={setField} />

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Full name</label>
                <input
                  type="text"
                  required
                  value={values.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  className={inputClass}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className={inputClass}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Mobile number</label>
                <input
                  required
                  value={values.contactNumber}
                  onChange={(e) => setField('contactNumber', digitsOnlyPhone(e.target.value))}
                  className={inputClass}
                  {...phoneInputProps()}
                />
              </div>

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
