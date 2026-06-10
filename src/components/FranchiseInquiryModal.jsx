import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { SITE_CONTACT_WHATSAPP_URL } from '@/data/siteContact';
import { submitFranchiseInquiry } from '@/lib/forms/submitters/franchiseInquirySubmitter';
import { validateFranchiseInquiryForm } from '@/lib/forms/validators/franchiseInquiryValidator';
import { checkHoneypot, stripHoneypot } from '@/lib/forms/utils/honeypot';
import { createEmptyPhoneValue } from '@/lib/phoneInput';
import PhoneInput from './forms/PhoneInput';
import { HONEYPOT_FIELD } from '@/lib/forms';
import { useFormSubmission, withHoneypot } from '@/hooks/useFormSubmission';
import HoneypotField from './forms/HoneypotField';
import FormSuccessState from './forms/FormSuccessState';
import './franchise-inquiry-modal.css';

const FRANCHISE_TYPE_OPTIONS = [
  {
    value: 'Master Franchise',
    title: 'Master Franchise',
    description: 'Regional / multi-unit rights',
  },
  {
    value: 'Unit Franchise',
    title: 'Unit Franchise',
    description: 'Single outlet or first location',
  },
];

const INITIAL = withHoneypot({
  franchiseType: '',
  fullName: '',
  email: '',
  contactNumber: createEmptyPhoneValue(),
  city: '',
  message: '',
});

function filterFranchiseTypes(structure = []) {
  const normalized = (structure || []).map((s) => String(s).toLowerCase());
  const hasMaster = normalized.some((s) => s.includes('master'));
  const hasUnit = normalized.some((s) => s.includes('unit'));
  if (!structure?.length) return FRANCHISE_TYPE_OPTIONS;
  return FRANCHISE_TYPE_OPTIONS.filter((opt) => {
    if (opt.value === 'Master Franchise') return hasMaster;
    if (opt.value === 'Unit Franchise') return hasUnit;
    return true;
  });
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-0.5 text-[0.6875rem] font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

function FranchiseInquiryFormDisclaimer({ franchiseName }) {
  const brand = String(franchiseName || 'this brand').trim();

  return (
    <p className="franchise-inquiry-modal__legal">
      By submitting this form, you agree to our{' '}
      <a href="/privacy-policy">Privacy Policy</a> and{' '}
      <a href="/terms-and-conditions">Terms of Service</a>. iFranchise will review your enquiry for{' '}
      <strong>{brand}</strong> franchise opportunities in India, including your preferred city or region.
    </p>
  );
}

export default function FranchiseInquiryModal({
  franchise,
  franchiseStructure,
  onClose,
  variant = 'modal',
  lockScroll = true,
  onUserInput,
  showWhatsAppAction = false,
  whatsappUrl = SITE_CONTACT_WHATSAPP_URL,
}) {
  const typeOptions = filterFranchiseTypes(franchiseStructure);

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
    formKey: `franchise_inquiry:${franchise?.id}`,
    initialValues: INITIAL,
    successTitle: 'Request received',
    successDescription: 'Our franchise desk will contact you with next steps for this brand.',
    onSubmit: async (data, { signal }) => {
      if (!checkHoneypot(data).ok) {
        return { success: false, error: 'Submission rejected.', code: 'SPAM' };
      }

      const payload = {
        ...stripHoneypot(data),
        franchiseId: String(franchise.id),
        franchiseName: franchise.name,
      };

      const validation = validateFranchiseInquiryForm(payload);
      if (!validation.success) {
        return { success: false, errors: validation.errors };
      }

      const result = await submitFranchiseInquiry(validation.data, 'franchise_details_inquiry', {
        signal,
      });

      if (result?.success) {
        return result;
      }

      return {
        success: false,
        error: result?.error || 'Something went wrong. Please try again.',
      };
    },
  });

  useEffect(() => {
    if (!onUserInput) return undefined;

    const hasInput =
      Boolean(values.franchiseType) ||
      Boolean(values.fullName?.trim()) ||
      Boolean(values.email?.trim()) ||
      Boolean(values.city?.trim()) ||
      Boolean(values.message?.trim()) ||
      Boolean(values.contactNumber?.local?.trim?.());

    if (hasInput) onUserInput();
  }, [values, onUserInput]);

  useEffect(() => {
    const prev = lockScroll ? document.body.style.overflow : undefined;

    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    const onKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        if (isSuccess) resetForm();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      if (lockScroll) {
        document.body.style.overflow = prev;
      }
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, isSubmitting, isSuccess, resetForm, lockScroll]);

  if (!franchise) return null;

  const inputClass = (hasError) =>
    `franchise-inquiry-modal__input${hasError ? ' franchise-inquiry-modal__input--error' : ''}`;

  const isPanel = variant === 'panel' || variant === 'drawer';

  const panel = (
    <div
      className={`franchise-inquiry-modal relative z-10${
        isPanel ? ' franchise-inquiry-modal--drawer franchise-inquiry-modal--compact' : ''
      }${showWhatsAppAction ? ' franchise-inquiry-modal--mobile-actions' : ''}`}
    >
        <div className="franchise-inquiry-modal__handle" aria-hidden="true" />
        <div className="franchise-inquiry-modal__header flex items-start justify-between gap-3 pr-2">
          <div className="min-w-0">
            <p className="franchise-inquiry-modal__kicker">Franchise interest</p>
            <h2 id="franchise-inquiry-title" className="franchise-inquiry-modal__title">
              {franchise.logo ? (
                <img
                  src={franchise.logo}
                  alt=""
                  decoding="async"
                  className="franchise-inquiry-modal__brand-logo"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <span className="franchise-inquiry-modal__title-text">{franchise.name}</span>
            </h2>
            {!isPanel ? (
              <p className="franchise-inquiry-modal__subtitle">
                {isSuccess
                  ? 'We will be in touch shortly.'
                  : 'Choose your format and share your details — we respond within 1 business day.'}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => {
              if (isSuccess) resetForm();
              onClose();
            }}
            disabled={isSubmitting}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-white/80 text-slate-600 transition hover:bg-white disabled:opacity-50"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="franchise-inquiry-modal__body">
          {isSuccess ? (
            <FormSuccessState
              variant="default"
              showTimeline={false}
              showBadge={false}
              title="Thank you!"
              description="Your interest has been shared with our team. Expect a follow-up on franchise fit and next steps."
              onReset={() => {
                resetForm();
                onClose();
              }}
              resetLabel="Close"
            />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="franchise-inquiry-modal__form franchise-inquiry-modal__form--sticky-actions"
              autoComplete="off"
              noValidate
            >
              <HoneypotField value={values[HONEYPOT_FIELD]} onChange={setField} />

              <div className="franchise-inquiry-modal__fields">
              <fieldset className="border-0 p-0 m-0">
                <legend className="franchise-inquiry-modal__label mb-1.5">
                  I am interested in <span className="text-red-500">*</span>
                </legend>
                <div className="franchise-inquiry-modal__type-grid">
                  {typeOptions.map((opt) => {
                    const selected = values.franchiseType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setField('franchiseType', selected ? '' : opt.value)
                        }
                        className={`franchise-inquiry-modal__type-btn${
                          selected ? ' franchise-inquiry-modal__type-btn--selected' : ''
                        }`}
                        aria-pressed={selected}
                      >
                        <span className="franchise-inquiry-modal__type-title">{opt.title}</span>
                        <span className="franchise-inquiry-modal__type-desc">{opt.description}</span>
                      </button>
                    );
                  })}
                </div>
                <FieldError message={fieldErrors.franchiseType} />
              </fieldset>

              <div className={isPanel ? 'franchise-inquiry-modal__fields-row' : undefined}>
                <div>
                  <label htmlFor="fi-full-name" className="franchise-inquiry-modal__label">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fi-full-name"
                    type="text"
                    required
                    minLength={2}
                    value={values.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    className={inputClass(fieldErrors.fullName)}
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={Boolean(fieldErrors.fullName)}
                  />
                  <FieldError message={fieldErrors.fullName} />
                </div>

                <div>
                  <label htmlFor="fi-email" className="franchise-inquiry-modal__label">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fi-email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className={inputClass(fieldErrors.email)}
                    placeholder="you@email.com"
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  <FieldError message={fieldErrors.email} />
                </div>
              </div>

              <div>
                <label htmlFor="fi-phone" className="franchise-inquiry-modal__label">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  id="fi-phone"
                  required
                  variant="modal"
                  value={values.contactNumber}
                  onChange={(value) => setField('contactNumber', value)}
                  error={fieldErrors.contactNumber}
                />
              </div>

              <div>
                <label htmlFor="fi-city" className="franchise-inquiry-modal__label">
                  Preferred city / location
                </label>
                <input
                  id="fi-city"
                  type="text"
                  value={values.city}
                  onChange={(e) => setField('city', e.target.value)}
                  className={inputClass(fieldErrors.city)}
                  placeholder="e.g. Bengaluru or preferred area"
                  autoComplete="address-level2"
                />
                <FieldError message={fieldErrors.city} />
              </div>

              <div>
                <label htmlFor="fi-message" className="franchise-inquiry-modal__label">
                  Message <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  id="fi-message"
                  rows={1}
                  value={values.message}
                  onChange={(e) => setField('message', e.target.value)}
                  className={`${inputClass(fieldErrors.message)} franchise-inquiry-modal__textarea`}
                  placeholder="Timeline, budget, or questions"
                />
                <FieldError message={fieldErrors.message} />
              </div>

              {submitError ? (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}
              </div>

              <div className="franchise-inquiry-modal__form-footer">
                <div className="franchise-inquiry-modal__actions">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="franchise-inquiry-modal__submit"
                  >
                    {isSubmitting ? 'Sending…' : 'Send interest'}
                  </button>
                  {showWhatsAppAction ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="franchise-inquiry-modal__whatsapp-cta"
                      aria-label="Chat on WhatsApp"
                    >
                      <FaWhatsapp aria-hidden />
                    </a>
                  ) : null}
                </div>
                <FranchiseInquiryFormDisclaimer franchiseName={franchise.name} />
              </div>
            </form>
          )}
        </div>
      </div>
  );

  if (variant === 'panel') return panel;

  return createPortal(
    <div
      className={`fixed inset-0 z-[10050] flex ${
        variant === 'drawer'
          ? 'franchise-inquiry-overlay franchise-inquiry-overlay--drawer items-center justify-end p-3 pr-[52px] sm:p-4 sm:pr-[56px]'
          : 'items-center justify-center p-4 sm:p-6'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="franchise-inquiry-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting && !isSuccess) onClose();
      }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" aria-hidden />
      {panel}
    </div>,
    document.body,
  );
}
