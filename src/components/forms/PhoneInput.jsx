import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  PHONE_COUNTRIES,
  coercePhoneValue,
  createEmptyPhoneValue,
  getPhoneCountry,
  getPhonePlaceholder,
  getPhoneValidationError,
  isValidLocalPhone,
  parseInternationalInput,
  parseLocalPhoneInput,
} from '@/lib/phoneInput';
import './phone-input.css';

const VARIANT_CLASS = {
  default: 'phone-input--default',
  light: 'phone-input--light',
  dark: 'phone-input--dark',
  emerald: 'phone-input--emerald',
  modal: 'phone-input--modal',
  assistant: 'phone-input--assistant',
};

/** Must sit above modals (10050), assistant panel (10000), and navbar (9999). */
const PHONE_DROPDOWN_Z_INDEX = 10100;
const DROPDOWN_MAX_HEIGHT = 224;
const DROPDOWN_GAP = 6;

/**
 * @param {object} props
 * @param {import('@/lib/phoneInput').PhoneValue | string} [props.value]
 * @param {(value: import('@/lib/phoneInput').PhoneValue) => void} props.onChange
 * @param {string} [props.id]
 * @param {string} [props.name]
 * @param {boolean} [props.required]
 * @param {boolean} [props.disabled]
 * @param {string} [props.error]
 * @param {string} [props.className]
 * @param {string} [props.inputClassName]
 * @param {'default'|'light'|'dark'|'emerald'|'modal'|'assistant'} [props.variant]
 * @param {string} [props.ariaLabel]
 */
export default function PhoneInput({
  value,
  onChange,
  id,
  name,
  required = false,
  disabled = false,
  error,
  className = '',
  inputClassName = '',
  variant = 'default',
  ariaLabel = 'Phone number',
}) {
  const listId = useId();
  const rootRef = useRef(null);
  const countryBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const phone = coercePhoneValue(value);
  const country = getPhoneCountry(phone.countryCode);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState(null);
  const [dropdownFlipUp, setDropdownFlipUp] = useState(false);

  const showError =
    error || (touched && phone.local && !isValidLocalPhone(phone.local, phone.countryCode));

  const errorMessage =
    error ||
    (touched && phone.local ? getPhoneValidationError(phone.countryCode) : '');

  const computeDropdownPosition = useCallback(() => {
    const btn = countryBtnRef.current;
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    const viewportPadding = 8;
    const maxWidth = Math.min(280, window.innerWidth - viewportPadding * 2);
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - maxWidth - viewportPadding,
    );

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const flipUp =
      spaceBelow < DROPDOWN_MAX_HEIGHT + DROPDOWN_GAP &&
      spaceAbove > spaceBelow;

    setDropdownFlipUp(flipUp);

    const base = {
      position: 'fixed',
      left,
      width: maxWidth,
      zIndex: PHONE_DROPDOWN_Z_INDEX,
      maxHeight: DROPDOWN_MAX_HEIGHT,
    };

    if (flipUp) {
      return {
        ...base,
        top: 'auto',
        bottom: window.innerHeight - rect.top + DROPDOWN_GAP,
      };
    }

    return {
      ...base,
      top: rect.bottom + DROPDOWN_GAP,
      bottom: 'auto',
    };
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setDropdownStyle(null);
    setDropdownFlipUp(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (open) {
      closeDropdown();
      return;
    }
    const position = computeDropdownPosition();
    if (position) setDropdownStyle(position);
    setOpen(true);
  }, [open, closeDropdown, computeDropdownPosition]);

  useLayoutEffect(() => {
    if (!open) return undefined;

    const reposition = () => {
      const position = computeDropdownPosition();
      if (position) setDropdownStyle(position);
    };

    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open, computeDropdownPosition]);

  useEffect(() => {
    if (!open) return undefined;

    const onDocPointer = (event) => {
      const target = event.target;
      if (
        rootRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      closeDropdown();
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDropdown();
    };

    document.addEventListener('mousedown', onDocPointer);
    document.addEventListener('touchstart', onDocPointer);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onDocPointer);
      document.removeEventListener('touchstart', onDocPointer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeDropdown]);

  const handleDropdownWheel = useCallback((event) => {
    const el = dropdownRef.current;
    if (!el) return;

    event.stopPropagation();

    const { scrollTop, scrollHeight, clientHeight } = el;
    const goingUp = event.deltaY < 0;
    const goingDown = event.deltaY > 0;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if ((goingUp && atTop) || (goingDown && atBottom)) {
      event.preventDefault();
    }
  }, []);

  const emit = (nextCountryCode, nextLocal) => {
    onChange({
      countryCode: nextCountryCode,
      local: parseLocalPhoneInput(nextLocal, nextCountryCode),
    });
  };

  const handleCountrySelect = (code) => {
    closeDropdown();
    emit(code, phone.local);
  };

  const handleLocalChange = (raw) => {
    const parsed = parseInternationalInput(raw);
    if (parsed) {
      onChange(parsed);
      return;
    }
    emit(phone.countryCode, raw);
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData?.getData('text') ?? '';
    const parsed = parseInternationalInput(pasted);
    if (!parsed) return;
    event.preventDefault();
    onChange(parsed);
  };

  const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.default;
  const describedBy = showError && errorMessage ? `${id || listId}-error` : undefined;

  const dropdown = open && dropdownStyle
    ? createPortal(
        <ul
          ref={dropdownRef}
          id={listId}
          className={`phone-input__dropdown${dropdownFlipUp ? ' phone-input__dropdown--above' : ''}`}
          role="listbox"
          aria-label="Country code"
          style={dropdownStyle}
          onWheel={handleDropdownWheel}
        >
          {PHONE_COUNTRIES.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === phone.countryCode}>
              <button
                type="button"
                className={`phone-input__option${
                  item.code === phone.countryCode ? ' phone-input__option--active' : ''
                }`}
                onClick={() => handleCountrySelect(item.code)}
              >
                <span className="phone-input__option-code">{item.code}</span>
                <span className="phone-input__flag" aria-hidden>
                  {item.flag}
                </span>
                <span className="phone-input__option-name">{item.name}</span>
                <span className="phone-input__option-dial">+{item.dial}</span>
              </button>
            </li>
          ))}
        </ul>,
        document.body,
      )
    : null;

  return (
    <div
      ref={rootRef}
      className={`phone-input ${variantClass} ${className}`.trim()}
    >
      <div className={`phone-input__row ${showError ? 'phone-input__row--error' : ''}`}>
        <div className="phone-input__country">
          <button
            ref={countryBtnRef}
            type="button"
            className="phone-input__country-btn"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            disabled={disabled}
            onClick={toggleDropdown}
          >
            <span className="phone-input__flag" aria-hidden>
              {country.flag}
            </span>
            <span className="phone-input__dial">+{country.dial}</span>
            <span className="phone-input__chevron" aria-hidden>
              ▾
            </span>
          </button>
        </div>

        <input
          id={id}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className={`phone-input__number ${inputClassName}`.trim()}
          value={phone.local}
          required={required}
          disabled={disabled}
          maxLength={country.maxLength}
          placeholder={getPhonePlaceholder(phone.countryCode)}
          aria-label={ariaLabel}
          aria-invalid={Boolean(showError)}
          aria-describedby={describedBy}
          onBlur={() => setTouched(true)}
          onPaste={handlePaste}
          onChange={(e) => handleLocalChange(e.target.value)}
        />
      </div>

      {showError && errorMessage ? (
        <p id={describedBy} className="phone-input__error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {dropdown}

      <input type="hidden" name={`${name || 'phone'}_country`} value={country.name} readOnly />
      <input type="hidden" name={`${name || 'phone'}_dial`} value={`+${country.dial}`} readOnly />
    </div>
  );
}

export { createEmptyPhoneValue };
