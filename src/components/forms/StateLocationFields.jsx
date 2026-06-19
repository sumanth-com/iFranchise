import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { filterCitiesByState, INDIAN_STATES } from '@/data/indianStatesCities';
import './state-location-fields.css';

const LIST_MAX_HEIGHT = 176;
const LIST_MAX_HEIGHT_MOBILE = 148;
const LIST_GAP = 4;
const VIEWPORT_PAD = 8;

function getPreferredListMax() {
  if (typeof window === 'undefined') return LIST_MAX_HEIGHT;
  return window.innerWidth < 640 ? LIST_MAX_HEIGHT_MOBILE : LIST_MAX_HEIGHT;
}

function computeListPosition(anchor, preferredMax = getPreferredListMax()) {
  if (!anchor) return null;
  const rect = anchor.getBoundingClientRect();
  const edgePad = window.innerWidth < 640 ? 12 : VIEWPORT_PAD;
  const spaceBelow = window.innerHeight - rect.bottom - edgePad;
  const spaceAbove = rect.top - edgePad;
  const openUp = spaceBelow < 140 && spaceAbove > spaceBelow;
  const maxHeight = Math.min(preferredMax, Math.max(112, (openUp ? spaceAbove : spaceBelow) - LIST_GAP));
  const top = openUp ? rect.top - maxHeight - LIST_GAP : rect.bottom + LIST_GAP;
  const width = Math.min(rect.width, window.innerWidth - edgePad * 2);
  const left = Math.max(edgePad, Math.min(rect.left, window.innerWidth - width - edgePad));
  return { left, width, top, maxHeight };
}

function FieldShell({ label, required, htmlFor, error, hint, labelClassName = 'mb-1 block text-xs font-medium', className = '', children }) {
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={htmlFor} className={labelClassName}>
          {label}
          {required ? (
            <span className="ml-0.5 text-red-500" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="mt-0.5 text-[11px] font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="state-location-fields__hint">{hint}</p>
      ) : null}
    </div>
  );
}

/**
 * State select + city autocomplete (filtered by selected state).
 * Typing the first letter(s) narrows cities in that state.
 */
export default function StateLocationFields({
  stateValue = '',
  cityValue = '',
  onStateChange,
  onCityChange,
  stateError,
  cityError,
  required = true,
  stateId: stateIdProp,
  cityId: cityIdProp,
  stateLabel = 'State',
  cityLabel = 'City / Location',
  className = '',
  stateClassName = '',
  cityClassName = '',
  labelClassName = '',
  layout = 'grid',
  variant = 'default',
  disabled = false,
  showHint = false,
  dropdownZIndex = 10060,
  listPortalClassName = '',
  renderStateField,
  renderCityField,
}) {
  const uid = useId();
  const stateId = stateIdProp ?? `state-${uid}`;
  const cityId = cityIdProp ?? `city-${uid}`;
  const listId = `${cityId}-listbox`;

  const rootRef = useRef(null);
  const anchorRef = useRef(null);
  const listRef = useRef(null);
  const stateAnchorRef = useRef(null);
  const stateListRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [stateActiveIndex, setStateActiveIndex] = useState(-1);
  const [listPos, setListPos] = useState(null);
  const [stateListPos, setStateListPos] = useState(null);

  const suggestions = useMemo(
    () => filterCitiesByState(stateValue, cityValue, 20),
    [stateValue, cityValue],
  );

  const showList = open && stateValue && suggestions.length > 0;

  const updateListPosition = useCallback(() => {
    setListPos(computeListPosition(anchorRef.current, Math.min(LIST_MAX_HEIGHT, suggestions.length * 40 + 8)));
  }, [suggestions.length]);

  const updateStateListPosition = useCallback(() => {
    setStateListPos(computeListPosition(stateAnchorRef.current));
  }, []);

  useLayoutEffect(() => {
    if (!showList) {
      setListPos(null);
      return undefined;
    }
    updateListPosition();
    window.addEventListener('resize', updateListPosition);
    window.addEventListener('scroll', updateListPosition, true);
    return () => {
      window.removeEventListener('resize', updateListPosition);
      window.removeEventListener('scroll', updateListPosition, true);
    };
  }, [showList, updateListPosition, cityValue, stateValue]);

  useLayoutEffect(() => {
    if (!stateOpen) {
      setStateListPos(null);
      return undefined;
    }
    updateStateListPosition();
    window.addEventListener('resize', updateStateListPosition);
    window.addEventListener('scroll', updateStateListPosition, true);
    return () => {
      window.removeEventListener('resize', updateStateListPosition);
      window.removeEventListener('scroll', updateStateListPosition, true);
    };
  }, [stateOpen, updateStateListPosition]);

  const onListWheel = useCallback((e) => {
    e.stopPropagation();
    const el = e.currentTarget;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const goingUp = e.deltaY < 0;
    const goingDown = e.deltaY > 0;
    if ((goingUp && scrollTop <= 0) || (goingDown && scrollTop + clientHeight >= scrollHeight - 1)) {
      e.preventDefault();
    }
  }, []);

  const closeStateList = useCallback(() => {
    setStateOpen(false);
    setStateActiveIndex(-1);
  }, []);

  const closeList = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const onDocDown = (e) => {
      const target = e.target;
      if (rootRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      if (stateAnchorRef.current?.contains(target)) return;
      if (stateListRef.current?.contains(target)) return;
      closeList();
      closeStateList();
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [closeList, closeStateList]);

  const handleStateChange = (nextState) => {
    onStateChange?.(nextState);
    if (nextState !== stateValue) onCityChange?.('');
    closeList();
    closeStateList();
  };

  const pickState = (state) => {
    handleStateChange(state);
  };

  const onStateKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!stateOpen) setStateOpen(true);
      setStateActiveIndex((i) => Math.min(i + 1, INDIAN_STATES.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!stateOpen) setStateOpen(true);
      setStateActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && stateOpen && stateActiveIndex >= 0) {
      e.preventDefault();
      pickState(INDIAN_STATES[stateActiveIndex]);
    } else if (e.key === 'Escape') {
      closeStateList();
    } else if (e.key === ' ' || e.key === 'Enter') {
      if (!stateOpen) {
        e.preventDefault();
        closeList();
        setStateOpen(true);
      }
    }
  };

  const pickCity = (city) => {
    onCityChange?.(city);
    closeList();
  };

  const onCityKeyDown = (e) => {
    if (!stateValue) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && open && activeIndex >= 0) {
      e.preventDefault();
      pickCity(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      closeList();
    }
  };

  const variantClass =
    variant === 'dark' || variant === 'default'
      ? 'state-location-fields--dark'
      : variant === 'emerald'
        ? 'state-location-fields--emerald'
        : variant === 'light'
          ? ''
          : '';

  const layoutClass =
    layout === 'row'
      ? 'grid grid-cols-2 gap-3'
      : layout === 'grid'
        ? 'grid grid-cols-1 gap-3 sm:grid-cols-2'
        : 'flex flex-col gap-3';

  const fieldFocusClass =
    variant === 'light' ? 'site-form-field' : 'site-form-field site-form-field--on-dark';

  const defaultSelectClass =
    variant === 'light'
      ? `${fieldFocusClass} w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`
      : `${fieldFocusClass} w-full appearance-none rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-50`;
  const defaultInputClass =
    variant === 'light'
      ? `${fieldFocusClass} w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`
      : `${fieldFocusClass} w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2.5 text-sm text-white placeholder:text-white/45 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`;

  const stateListId = `${stateId}-listbox`;

  const stateSelect = renderStateField ? (
    renderStateField({
      id: stateId,
      value: stateValue,
      onChange: handleStateChange,
      disabled,
      required,
      states: INDIAN_STATES,
    })
  ) : (
  <div className="state-location-fields__state-wrap">
    <button
      type="button"
      id={stateId}
      ref={stateAnchorRef}
      role="combobox"
      aria-expanded={stateOpen}
      aria-controls={stateListId}
      aria-autocomplete="list"
      disabled={disabled}
      aria-invalid={Boolean(stateError)}
      className={`state-location-fields__state-trigger ${stateClassName || defaultSelectClass}`.trim()}
      onClick={() => {
        if (disabled) return;
        closeList();
        setStateOpen((v) => !v);
        setStateActiveIndex(-1);
      }}
      onKeyDown={onStateKeyDown}
    >
      <span className={stateValue ? '' : 'state-location-fields__state-placeholder'}>
        {stateValue || 'Select state'}
      </span>
      <span className="state-location-fields__chevron" aria-hidden />
    </button>
    {stateOpen && stateListPos && typeof document !== 'undefined'
      ? createPortal(
          <ul
            id={stateListId}
            ref={stateListRef}
            role="listbox"
            className={`state-location-fields__list state-location-fields__list--portal ${variantClass} ${listPortalClassName}`.trim()}
            style={{
              position: 'fixed',
              top: stateListPos.top,
              left: stateListPos.left,
              width: stateListPos.width,
              maxHeight: stateListPos.maxHeight,
              zIndex: dropdownZIndex,
            }}
            onWheel={onListWheel}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {INDIAN_STATES.map((state, index) => (
              <li key={state} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={stateValue === state || index === stateActiveIndex}
                  className={`state-location-fields__option${
                    stateValue === state || index === stateActiveIndex
                      ? ' state-location-fields__option--active'
                      : ''
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pickState(state)}
                >
                  {state}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )
      : null}
  </div>
  );

  const cityInput = renderCityField ? (
    renderCityField({
      id: cityId,
      value: cityValue,
      onChange: onCityChange,
      disabled: disabled || !stateValue,
      required,
      stateValue,
      suggestions,
      open: showList,
      onFocus: () => {
        closeStateList();
        if (stateValue) setOpen(true);
      },
      onKeyDown: onCityKeyDown,
    })
  ) : (
    <input
      id={cityId}
      type="text"
      role="combobox"
      aria-expanded={showList}
      aria-controls={listId}
      aria-autocomplete="list"
      value={cityValue}
      disabled={disabled || !stateValue}
      required={required}
      autoComplete="address-level2"
      placeholder={stateValue ? 'Type city name…' : 'Select state first'}
      className={cityClassName || defaultInputClass}
      aria-invalid={Boolean(cityError)}
      onChange={(e) => {
        onCityChange?.(e.target.value);
        setOpen(true);
        setActiveIndex(-1);
      }}
      onFocus={() => {
        closeStateList();
        if (stateValue) setOpen(true);
      }}
      onKeyDown={onCityKeyDown}
    />
  );

  return (
    <div className={`state-location-fields ${variantClass} ${layoutClass} ${className}`.trim()}>
      <FieldShell
        label={stateLabel}
        required={required}
        htmlFor={stateId}
        error={stateError}
        labelClassName={labelClassName}
      >
        {stateSelect}
      </FieldShell>

      <FieldShell
        label={cityLabel}
        required={required}
        htmlFor={cityId}
        error={cityError}
        hint={showHint && stateValue ? 'Start typing — matching cities in your state appear below' : undefined}
        labelClassName={labelClassName}
        className="state-location-fields__wrap"
      >
        <div ref={rootRef}>
          <div ref={anchorRef}>{cityInput}</div>
          {showList && listPos && typeof document !== 'undefined'
            ? createPortal(
                <ul
                  id={listId}
                  ref={listRef}
                  role="listbox"
                  className={`state-location-fields__list state-location-fields__list--portal ${variantClass} ${listPortalClassName}`.trim()}
                  style={{
                    position: 'fixed',
                    top: listPos.top,
                    left: listPos.left,
                    width: listPos.width,
                    maxHeight: listPos.maxHeight,
                    zIndex: dropdownZIndex,
                  }}
                  onWheel={onListWheel}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {suggestions.map((city, index) => (
                    <li key={city} role="presentation">
                      <button
                        type="button"
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`state-location-fields__option${
                          index === activeIndex ? ' state-location-fields__option--active' : ''
                        }`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => pickCity(city)}
                      >
                        {city}
                      </button>
                    </li>
                  ))}
                </ul>,
                document.body,
              )
            : null}
        </div>
      </FieldShell>
    </div>
  );
}
