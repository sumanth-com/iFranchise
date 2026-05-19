import { useState, useEffect, useCallback, useRef, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitChatbotLead, submitStrategyCall } from '../lib/forms';
import { PHONE_PLACEHOLDER, maskPhoneDisplay } from '@/lib/phoneInput';
import { navigateTo as spaNavigate } from '@/lib/navigation';

const STRATEGY_CAL_URL = 'https://cal.com/ifranchise/30min';

const PURPLE_ICON_GRADIENT = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 52%, #6366f1 100%)';
const PURPLE_ICON_SHADOW = '0 6px 16px rgba(124, 58, 237, 0.32)';
import { useTheme } from '../context/ThemeContext';
import AssistantBotIcon from './AssistantBotIcon';
import AssistantFlowSuccess from './forms/AssistantFlowSuccess';
import './assistant-panel.css';

const AssistantPaletteContext = createContext(null);

function getAssistantPalette(siteIsLight) {
  if (siteIsLight) {
    return {
      mode: 'dark',
      panel: '#0f172a',
      header: '#1e293b',
      text: '#f8fafc',
      textMuted: '#cbd5e1',
      mutedText: 'rgba(203,213,225,0.85)',
      border: 'rgba(255,255,255,0.12)',
      divider: 'rgba(255,255,255,0.1)',
      inputBg: 'rgba(255,255,255,0.08)',
      inputBorder: 'rgba(255,255,255,0.2)',
      inputFocusBorder: 'rgba(167,139,250,0.65)',
      inputFocusBg: 'rgba(124,58,237,0.18)',
      chipBg: 'rgba(255,255,255,0.06)',
      chipHoverBg: 'rgba(255,255,255,0.1)',
      chipBorder: 'rgba(255,255,255,0.16)',
      chipSelectedBg: 'rgba(124,58,237,0.35)',
      chipSelectedBorder: 'rgba(167,139,250,0.6)',
      chipText: '#e2e8f0',
      chipSelectedText: '#ede9fe',
      progressTrack: 'rgba(255,255,255,0.1)',
      btnDisabledBg: 'rgba(109,40,217,0.55)',
      btnDisabledText: '#f8fafc',
      btnEnabledBg: 'linear-gradient(135deg,#7c3aed,#6366f1)',
      btnEnabledText: '#fff',
      liveLabel: '#6d28d9',
      livePillBg: '#ffffff',
      livePillBorder: 'rgba(167,139,250,0.45)',
      dateColor: '#94a3b8',
      timeColor: '#e9d5ff',
      timePillBg: 'rgba(124,58,237,0.28)',
      timePillBorder: 'rgba(167,139,250,0.42)',
      globeTileBg: '#1e293b',
      globeTileBorder: 'rgba(167,139,250,0.45)',
      flowHeaderBg: '#1e293b',
      flowTitle: '#f8fafc',
      flowStepBg: 'rgba(255,255,255,0.08)',
      flowStepText: '#cbd5e1',
      flowBackBg: 'rgba(255,255,255,0.08)',
      flowBackBorder: 'rgba(255,255,255,0.14)',
      flowBackColor: '#cbd5e1',
      summaryBg: 'rgba(124,58,237,0.14)',
      summaryBorder: 'rgba(167,139,250,0.28)',
      summaryLabel: '#94a3b8',
      summaryValue: '#f1f5f9',
      summaryRowBorder: 'rgba(255,255,255,0.08)',
      questionColor: '#f8fafc',
      rowBg: 'rgba(255,255,255,0.06)',
      rowBgHover: 'rgba(124,58,237,0.14)',
      rowBorder: 'rgba(255,255,255,0.12)',
      rowBorderHover: 'rgba(167,139,250,0.45)',
      rowLabel: 'rgba(196,181,253,0.95)',
      rowTitle: '#f1f5f9',
      rowSecondaryBg: 'rgba(255,255,255,0.04)',
      rowSecondaryTitle: '#cbd5e1',
      welcomeTitle: '#f8fafc',
      welcomeBody: 'rgba(203,213,225,0.9)',
      linkBg: 'rgba(255,255,255,0.06)',
      linkBgHover: 'rgba(255,255,255,0.1)',
      linkBorder: 'rgba(255,255,255,0.12)',
      linkBorderHover: 'rgba(167,139,250,0.45)',
      linkTitle: '#f1f5f9',
      linkIconBg: 'rgba(255,255,255,0.08)',
      linkIconBorder: 'rgba(255,255,255,0.12)',
      linkIconColor: '#94a3b8',
      closeBg: 'rgba(255,255,255,0.08)',
      closeBorder: 'rgba(255,255,255,0.14)',
      closeColor: '#e2e8f0',
      panelShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25)',
    };
  }
  return {
    mode: 'light',
    panel: 'rgba(255,255,255,0.99)',
    header: 'rgba(248,249,252,1)',
    text: '#0f172a',
    textMuted: '#475569',
    mutedText: 'rgba(100,116,139,0.85)',
    border: 'rgba(0,0,0,0.08)',
    divider: 'rgba(226,232,240,1)',
    inputBg: '#f8fafc',
    inputBorder: 'rgba(0,0,0,0.14)',
    inputFocusBorder: 'rgba(124,58,237,0.5)',
    inputFocusBg: 'rgba(124,58,237,0.06)',
    chipBg: 'rgba(0,0,0,0.04)',
    chipHoverBg: 'rgba(0,0,0,0.07)',
    chipBorder: 'rgba(0,0,0,0.12)',
    chipSelectedBg: 'rgba(124,58,237,0.12)',
    chipSelectedBorder: 'rgba(124,58,237,0.45)',
    chipText: '#475569',
    chipSelectedText: '#5b21b6',
    progressTrack: 'rgba(0,0,0,0.08)',
    btnDisabledBg: '#8b5cf6',
    btnDisabledText: '#ffffff',
    btnEnabledBg: 'linear-gradient(135deg,#7c3aed,#6366f1)',
    btnEnabledText: '#fff',
      liveLabel: '#6d28d9',
      livePillBg: '#ffffff',
      livePillBorder: 'rgba(124,58,237,0.35)',
    dateColor: '#64748b',
    timeColor: '#5b21b6',
    timePillBg: 'rgba(124,58,237,0.1)',
    timePillBorder: 'rgba(124,58,237,0.25)',
    globeTileBg: '#fff',
    globeTileBorder: 'rgba(124,58,237,0.38)',
    flowHeaderBg: 'rgba(248,249,252,1)',
    flowTitle: 'rgba(15,23,42,0.92)',
    flowStepBg: 'rgba(0,0,0,0.05)',
    flowStepText: 'rgba(71,85,105,0.9)',
    flowBackBg: 'rgba(0,0,0,0.04)',
    flowBackBorder: 'rgba(0,0,0,0.1)',
    flowBackColor: 'rgba(71,85,105,0.75)',
    summaryBg: 'rgba(124,58,237,0.06)',
    summaryBorder: 'rgba(124,58,237,0.18)',
    summaryLabel: 'rgba(100,116,139,0.9)',
    summaryValue: 'rgba(15,23,42,0.92)',
    summaryRowBorder: 'rgba(0,0,0,0.07)',
    questionColor: 'rgba(15,23,42,0.92)',
    rowBg: 'rgba(255,255,255,0.94)',
      rowBgHover: 'rgba(124,58,237,0.07)',
      rowBorder: 'rgba(226,232,240,0.95)',
      rowBorderHover: 'rgba(167,139,250,0.45)',
    rowLabel: 'rgba(124,58,237,0.88)',
    rowTitle: 'rgba(15,23,42,0.92)',
    rowSecondaryBg: 'rgba(249,250,251,0.95)',
    rowSecondaryTitle: 'rgba(71,85,105,0.9)',
    welcomeTitle: '#0f172a',
    welcomeBody: 'rgba(71,85,105,0.9)',
    linkBg: '#fff',
      linkBgHover: 'rgba(124,58,237,0.06)',
    linkBorder: 'rgba(226,232,240,0.98)',
    linkBorderHover: 'rgba(196,181,253,0.55)',
    linkTitle: 'rgba(15,23,42,0.9)',
    linkIconBg: 'rgba(249,250,251,1)',
    linkIconBorder: 'rgba(226,232,240,1)',
    linkIconColor: 'rgba(100,116,139,0.8)',
    closeBg: '#fff',
    closeBorder: 'rgba(0,0,0,0.1)',
    closeColor: '#64748b',
    panelShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 20px 60px rgba(15,23,42,0.14), 0 4px 16px rgba(15,23,42,0.08)',
  };
}

function useAssistantPalette() {
  return useContext(AssistantPaletteContext) || getAssistantPalette(false);
}

// -- Navigation helper ---------------------------------------------------------
const navTo = (path, setIsOpen) => {
  spaNavigate(path);
  setIsOpen(false);
};

const PURPLE_BRAND = '#6d28d9';
const PURPLE_BRIGHT = '#7c3aed';

function formatDeskDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
}

function formatDeskTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

/** Live date (DD-MM-YYYY) and clock for panel header */
function AssistantDateTime() {
  const p = useAssistantPalette();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="assistant-desk-datetime-row">
      <span
        className="assistant-desk-date"
        style={{ color: p.dateColor, fontSize: 11, fontWeight: 600 }}
      >
        {formatDeskDate(now)}
      </span>
      <span
        className="assistant-desk-time-pill"
        style={{
          color: p.timeColor,
          background: p.timePillBg,
          border: `1px solid ${p.timePillBorder}`,
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 8px',
        }}
      >
        {formatDeskTime(now)}
      </span>
    </div>
  );
}

/** Panel header - line 1 title */
function AssistantDeskTitle() {
  const p = useAssistantPalette();
  return (
    <motion.div
      className="assistant-desk-title"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: PURPLE_BRAND,
        minWidth: 0,
      }}
    >
      <span className="assistant-home-welcome-dot" aria-hidden />
      <span style={{ color: p.text }}>Global franchise desk</span>
    </motion.div>
  );
}

function getAssistantFabTheme(isLight) {
  if (isLight) {
    return {
      background: 'transparent',
      border: 'none',
      boxShadow: '0 12px 32px rgba(49, 46, 129, 0.22), 0 0 20px rgba(56, 189, 248, 0.14)',
      hoverBorder: 'none',
      hoverShadow: '0 16px 40px rgba(49, 46, 129, 0.28), 0 0 28px rgba(56, 189, 248, 0.22)',
    };
  }
  return {
    background: 'transparent',
    border: 'none',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45), 0 0 22px rgba(56, 189, 248, 0.18)',
    hoverBorder: 'none',
    hoverShadow: '0 16px 44px rgba(0, 0, 0, 0.5), 0 0 30px rgba(56, 189, 248, 0.28)',
  };
}

/** Pulsing "live" cue for header status */
function LiveStatusPulse({ label = 'Live' }) {
  const p = useAssistantPalette();
  return (
    <div className="assistant-live-pill" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 999, background: p.livePillBg, border: `1px solid ${p.livePillBorder}` }}>
      <span style={{ position: 'relative', width: 12, height: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.span
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '50%',
            background: '#22c55e',
          }}
          animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
          transition={{ duration: 1.85, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '50%',
            border: '2px solid rgba(34,197,94,0.45)',
          }}
          animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
          transition={{ duration: 1.85, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
        />
        <motion.span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#16a34a',
            boxShadow: '0 0 0 2px rgba(255,255,255,1), 0 0 12px rgba(22,163,74,0.55)',
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      <motion.span
        style={{ color: p.liveLabel, fontSize: 10, fontWeight: 700, letterSpacing: '-0.01em' }}
        animate={{ opacity: [1, 0.72, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label}
      </motion.span>
    </div>
  );
}

/** Header - rounded-square bot, tight fit */
function AssistantGlyphTile({ dimension = 38, siteIsLight }) {
  const corner = Math.round(dimension * 0.24);
  return (
    <div
      className="assistant-glyph-tile"
      aria-hidden
      style={{
        width: dimension,
        height: dimension,
        borderRadius: corner,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <AssistantBotIcon size={dimension} variant={siteIsLight ? 'light' : 'dark'} animate className="assistant-bot-icon--fill" />
    </div>
  );
}

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

// -- Home row icons - white on unified purple tiles -----------------------------
const HOME_ICON = 17;

/** Franchise network - connected hubs */
const BrandIcon = () => (
  <svg width={HOME_ICON} height={HOME_ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="9" r="2.25" />
    <circle cx="18" cy="9" r="2.25" />
    <circle cx="12" cy="18" r="2.25" />
    <path d="M7.5 10.2 10.5 16M16.5 10.2 13.5 16M8 9h8" />
    <path d="M12 4.5v2.5" />
    <path d="M10.5 4.5h3" strokeWidth="2.2" />
  </svg>
);

/** Portfolio - briefcase + growth sparkline */
const InvestorIcon = () => (
  <svg width={HOME_ICON} height={HOME_ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h16v9H4z" />
    <path d="M8 10V8a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M7 16l2.5-3 2.5 1.5 3.5-4.5" />
    <circle cx="18" cy="6" r="2.25" />
    <path d="M18 4.2v3.6M16.2 6h3.6" strokeWidth="2" />
  </svg>
);

/** Strategy session - calendar + confirmed slot */
const CalendarIcon = () => (
  <svg width={HOME_ICON} height={HOME_ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="13" height="13" rx="2.25" />
    <path d="M7 4v3M12 4v3M3 11h13" />
    <path d="M7 14.5h2M11 14.5h2" />
    <circle cx="18.5" cy="16.5" r="3.25" />
    <path d="M17.2 16.5l1 1 2.6-2.6" strokeWidth="2" />
  </svg>
);

/** Support - dual chat with check */
const SupportIcon = () => (
  <svg width={HOME_ICON} height={HOME_ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17l-2 2v-4.5a5.5 5.5 0 019.2-4" />
    <path d="M13 7.5a5.5 5.5 0 015.5 5.5c0 1.2-.4 2.3-1 3.2L19 19l-2.8-1.2" />
    <path d="M11.5 9.5 13 11l3-3" strokeWidth="2.1" />
  </svg>
);

function PremiumRowIcon({ children, hovered }) {
  return (
    <div
      className="assistant-row-icon"
      style={{
        width: 38,
        height: 38,
        borderRadius: 11,
        background: PURPLE_ICON_GRADIENT,
        boxShadow: hovered
          ? `${PURPLE_ICON_SHADOW}, inset 0 1px 0 rgba(255,255,255,0.28)`
          : `${PURPLE_ICON_SHADOW}, inset 0 1px 0 rgba(255,255,255,0.22)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#fff',
        transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
      }}
    >
      {children}
    </div>
  );
}

const ClockMiniIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const RouteMiniIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h5.5a4 4 0 000-8H8M8 11V5" />
  </svg>
);

const UsersMiniIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="3" />
    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const HelpMiniIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 2-3 4" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const SearchMiniIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const StoreMiniIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l2-4h14l2 4" />
    <path d="M5 9v11h14V9" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

const MailMiniIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.4 4.6L18 8l-4.6 1.4L12 14l-1.4-4.6L6 8l4.6-1.4L12 2zM5 16l.8 2.6L8.5 19l-2.7.8L5 22.5l-.8-2.7L1.5 19l2.7-.8L5 16zm14 0l.8 2.6 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8.8-2.6z" />
  </svg>
);

const CONSULT_TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

// -- Chip Selector -------------------------------------------------------------
function ChipSelect({
  options,
  value,
  onChange,
  multi = false,
  otherKey,
  otherValue,
  onOtherChange,
  otherPlaceholder = 'Type your city...',
}) {
  const p = useAssistantPalette();
  const isSelected = (opt) => (multi ? (value || []).includes(opt) : value === opt);
  const showOther = otherKey && (multi ? (value || []).includes('Other') : value === 'Other');
  const handleClick = (opt) => {
    if (multi) {
      const current = value || [];
      onChange(current.includes(opt) ? current.filter(o => o !== opt) : [...current, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
      <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map((opt) => {
          const selected = isSelected(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleClick(opt)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                border: `1px solid ${selected ? p.chipSelectedBorder : p.chipBorder}`,
                background: selected ? p.chipSelectedBg : p.chipBg,
                color: selected ? p.chipSelectedText : p.chipText,
                cursor: 'pointer',
                transition: 'all 0.12s ease',
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = p.chipHoverBg; }}
              onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = p.chipBg; }}
            >
              {opt}
            </button>
          );
        })}
      </motion.div>
      {showOther && (
        <TextInput
          placeholder={otherPlaceholder}
          value={otherValue}
          onChange={onOtherChange}
        />
      )}
    </motion.div>
  );
}

function FormError({ message }) {
  if (!message) return null;
  return (
    <p style={{ color: '#f87171', fontSize: 12, margin: '8px 0 0', textAlign: 'center' }}>
      {message}
    </p>
  );
}

function ConsultationScheduleFields({ schedule, setSchedule }) {
  const p = useAssistantPalette();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: p.questionColor, marginBottom: 6 }}>Preferred date</div>
        <input
          type="date"
          min={today}
          value={schedule.preferredDate || ''}
          onChange={(e) => setSchedule(s => ({ ...s, preferredDate: e.target.value }))}
          className="ea-text-input w-full box-border rounded-[10px] px-[14px] py-2.5 text-[13px] outline-none"
          style={{ border: `1px solid ${p.inputBorder}`, background: p.inputBg, color: p.text }}
        />
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: p.questionColor, marginBottom: 6 }}>Preferred time</div>
        <ChipSelect
          options={CONSULT_TIME_SLOTS}
          value={schedule.preferredTime}
          onChange={(v) => setSchedule(s => ({ ...s, preferredTime: v }))}
        />
      </div>
      <TextInput
        placeholder="Email (optional)"
        type="email"
        value={schedule.email}
        onChange={(v) => setSchedule(s => ({ ...s, email: v }))}
      />
      <TextInput
        placeholder="Anything else we should know? (optional)"
        value={schedule.notes}
        onChange={(v) => setSchedule(s => ({ ...s, notes: v }))}
      />
    </div>
  );
}


// -- Text Input ----------------------------------------------------------------
function TextInput({ placeholder, value, onChange, type = 'text' }) {
  const p = useAssistantPalette();
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="ea-text-input mt-3.5 w-full box-border rounded-[10px] px-[14px] py-2.5 text-[13px] outline-none transition-all duration-150"
      style={{ border: `1px solid ${p.inputBorder}`, background: p.inputBg, color: p.text }}
      onFocus={(e) => { e.target.style.border = `1px solid ${p.inputFocusBorder}`; e.target.style.background = p.inputFocusBg; }}
      onBlur={(e) => { e.target.style.border = `1px solid ${p.inputBorder}`; e.target.style.background = p.inputBg; }}
    />
  );
}

// -- Progress Bar --------------------------------------------------------------
function ProgressBar({ current, total }) {
  const p = useAssistantPalette();
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ height: 2, background: p.progressTrack, borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg,#7c3aed,#818cf8)', borderRadius: 99 }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// -- Continue Button -----------------------------------------------------------
function ContinueBtn({ onClick, disabled, label = 'Continue' }) {
  const p = useAssistantPalette();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: 12,
        background: disabled ? p.btnDisabledBg : p.btnEnabledBg,
        color: disabled ? p.btnDisabledText : p.btnEnabledText,
        fontSize: 13.5,
        fontWeight: 600,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 4px 24px rgba(124,58,237,0.35), 0 1px 0 rgba(255,255,255,0.1) inset',
        transition: 'all 0.18s ease',
        letterSpacing: '-0.015em',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
      onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}
    >
      {label}
    </button>
  );
}

// -- Flow Header ---------------------------------------------------------------
function FlowHeader({ title, onBack, step, total }) {
  const p = useAssistantPalette();
  return (
    <div style={{ padding: '13px 14px 12px', borderBottom: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: p.flowHeaderBg }}>
      <button
        type="button"
        onClick={onBack}
        style={{ width: 30, height: 30, borderRadius: 9, background: p.flowBackBg, border: `1px solid ${p.flowBackBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.flowBackColor, cursor: 'pointer', transition: 'all 0.15s ease' }}
      >
        <ArrowLeft />
      </button>
      <span style={{ color: p.flowTitle, fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</span>
      {total ? (
        <span style={{ color: p.flowStepText, fontSize: 11, fontWeight: 600, background: p.flowStepBg, padding: '3px 8px', borderRadius: 20, border: `1px solid ${p.border}` }}>{step}/{total}</span>
      ) : (
        <div style={{ width: 30 }} />
      )}
    </div>
  );
}

// -- Summary Card --------------------------------------------------------------
function SummaryCard({ rows }) {
  const p = useAssistantPalette();
  return (
    <div style={{ background: p.summaryBg, border: `1px solid ${p.summaryBorder}`, borderRadius: 12, padding: 16 }}>
      {rows.map(({ label, value }, i) =>
        value && (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, paddingBottom: 6, borderBottom: i < rows.length - 1 ? `1px solid ${p.summaryRowBorder}` : 'none' }}>
            <span style={{ color: p.summaryLabel, fontSize: 11 }}>{label}</span>
            <span style={{ color: p.summaryValue, fontSize: 12, fontWeight: 500 }}>{value}</span>
          </div>
        ))}
    </div>
  );
}

// -- Home View -----------------------------------------------------------------
const PRIMARY_ROWS = [
  {
    id: 'brands',
    label: 'FOR BRANDS',
    title: 'Scale my brand through franchising',
    icon: <BrandIcon />,
  },
  {
    id: 'investors',
    label: 'FOR INVESTORS',
    title: 'Discover franchise opportunities',
    icon: <InvestorIcon />,
  },
  {
    id: 'strategy',
    label: 'STRATEGY CALL',
    title: 'Speak with expansion experts',
    icon: <CalendarIcon />,
  },
];

const SUPPORT_ROW = {
  id: 'support',
  label: 'SUPPORT',
  title: 'Navigate the platform & get help',
  icon: <SupportIcon />,
};

function ActionRow({ row, onClick, index, secondary = false }) {
  const p = useAssistantPalette();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      type="button"
      className={`assistant-action-row${secondary ? ' assistant-action-row--secondary' : ''}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: secondary ? '11px 14px' : '12px 14px',
        borderRadius: 14,
        background: hovered
          ? (secondary ? p.rowBgHover : p.rowBgHover)
          : (secondary ? p.rowSecondaryBg : p.rowBg),
        border: hovered
          ? `1px solid ${secondary ? p.rowBorderHover : p.rowBorderHover}`
          : `1px solid ${secondary ? p.rowBorder : p.rowBorder}`,
        cursor: 'pointer',
        textAlign: 'left',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        transition: 'all 0.18s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: hovered && !secondary ? '0 2px 12px rgba(124,58,237,0.1)' : 'none',
      }}
    >
      <PremiumRowIcon hovered={hovered}>
        {row.icon}
      </PremiumRowIcon>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: secondary ? p.textMuted : p.rowLabel,
          marginBottom: 3,
        }}>
          {row.label}
        </div>
        <div style={{
          fontSize: 13.5,
          fontWeight: 500,
          color: secondary ? p.rowSecondaryTitle : p.rowTitle,
          letterSpacing: '-0.015em',
          lineHeight: 1.3,
        }}>
          {row.title}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        color: hovered ? 'rgba(124,58,237,0.65)' : 'rgba(148,163,184,0.65)',
        flexShrink: 0,
        transition: 'color 0.15s ease, transform 0.18s ease',
        transform: hovered ? 'translateX(2px)' : 'translateX(0)',
      }}>
        <ChevronRight />
      </div>
    </motion.button>
  );
}

function HomeView({ setView, setIsOpen }) {
  const p = useAssistantPalette();
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Welcome */}
      <div className="assistant-home-shell">
        <div
          className="assistant-home-welcome"
        >
          <h3 className="assistant-home-welcome-title" style={{ color: p.welcomeTitle }}>
            How can we help you expand today?
          </h3>
          <p className="assistant-home-welcome-body" style={{ color: p.welcomeBody }}>
            Please select an option below to connect with our franchise advisory team.
          </p>
        </div>
      </div>

      {/* Action rows */}
      <div className="assistant-home-list">
        {PRIMARY_ROWS.map((row, i) => (
          <ActionRow key={row.id} row={row} onClick={() => setView(row.id)} index={i} />
        ))}

        <motion.div className="assistant-home-divider" style={{ background: `linear-gradient(90deg, transparent, ${p.divider}, transparent)` }} />

        <ActionRow
          row={SUPPORT_ROW}
          onClick={() => setView('support')}
          index={PRIMARY_ROWS.length}
          secondary
        />
      </div>
    </motion.div>
  );
}

// -- Brands Flow ---------------------------------------------------------------
const BRAND_STEPS = [
  { q: "What's your brand name?", type: 'text', key: 'brandName', placeholder: 'e.g. Chai Point, FitZone...' },
  { q: 'Which industry?', type: 'chips', key: 'industry', otherKey: 'industryOther', otherPlaceholder: 'Type your industry...', options: ['Food & Beverage', 'Health & Wellness', 'Education', 'Retail', 'Technology', 'Home Services', 'Other'] },
  { q: 'How many locations currently?', type: 'chips', key: 'locations', options: ['1', '2-5', '6-15', '15+'] },
  { q: 'Target expansion cities?', type: 'chips', key: 'cities', otherKey: 'citiesOther', otherPlaceholder: 'Enter your target city', options: ['3-5', '5-10', '10-20', '20+ (National)', 'Other'] },
  { q: 'Franchise investment range?', type: 'chips', key: 'investment', options: ['Under Rs.25L', 'Rs.25L-Rs.50L', 'Rs.50L-Rs.1Cr', 'Rs.1Cr+'] },
  { q: 'Your name & contact?', type: 'contact', key: 'contact' },
];

function BrandsView({ setView }) {
  const p = useAssistantPalette();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const current = BRAND_STEPS[step];
  const val = data[current?.key];
  const canContinue = (() => {
    if (current?.type === 'contact') {
      return Boolean(data.contactName?.trim() && data.contactPhone?.trim());
    }
    if (current?.type === 'chips' && val === 'Other' && current.otherKey) {
      return Boolean(data[current.otherKey]?.trim());
    }
    return Array.isArray(val) ? val.length > 0 : Boolean(val?.trim?.() ?? val);
  })();

  const handleContinue = () => {
    if (step < BRAND_STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');
    const result = await submitChatbotLead(data, 'brand', 'expansion_assistant_brand');
    setSubmitting(false);
    if (result.success) {
      setComplete(true);
    } else {
      setSubmitError(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (complete) {
    return (
      <motion.div
        key="brands-complete"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <FlowHeader title="Thank you" onBack={() => setView('home')} />
        <AssistantFlowSuccess
          iconStyle={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}
          titleStyle={{ fontSize: 15, fontWeight: 600, color: p.questionColor }}
          bodyStyle={{ color: p.mutedText, fontSize: 12, margin: 0, lineHeight: 1.5 }}
          title="Request received"
          description="Our expansion team will contact you within 24 hours."
        >
          <ContinueBtn onClick={() => setView('home')} label="Back to Home" />
        </AssistantFlowSuccess>
      </motion.div>
    );
  }

  if (done) {
    return (
      <motion.div
        key="brands-done"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <FlowHeader title="Your Summary" onBack={() => { setDone(false); setStep(BRAND_STEPS.length - 1); }} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard rows={[
            { label: 'Brand', value: data.brandName },
            { label: 'Industry', value: data.industry === 'Other' ? data.industryOther : data.industry },
            { label: 'Locations', value: data.locations },
            { label: 'Target Cities', value: data.cities === 'Other' ? data.citiesOther : data.cities },
            { label: 'Investment', value: data.investment },
            { label: 'Contact', value: data.contactName },
            { label: 'Phone', value: maskPhoneDisplay(data.contactPhone) },
          ]} />
          <FormError message={submitError} />
        </div>
        <div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
          <ContinueBtn
            onClick={handleSubmit}
            disabled={submitting}
            label={submitting ? 'Submitting…' : 'Submit'}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`brands-${step}`}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader
        title="For Brands"
        onBack={() => step === 0 ? setView('home') : setStep(s => s - 1)}
        step={step + 1}
        total={BRAND_STEPS.length}
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        <ProgressBar current={step + 1} total={BRAND_STEPS.length} />
        <div style={{ fontSize: 14, fontWeight: 600, color: p.questionColor, letterSpacing: '-0.02em', marginBottom: 4 }}>
          {current.q}
        </div>
        {current.type === 'text' && (
          <TextInput placeholder={current.placeholder} value={data[current.key]} onChange={v => setData(d => ({ ...d, [current.key]: v }))} />
        )}
        {current.type === 'chips' && (
          <ChipSelect
            options={current.options}
            value={data[current.key]}
            onChange={v => setData(d => ({ ...d, [current.key]: v }))}
            multi={current.multi}
            otherKey={current.otherKey}
            otherValue={current.otherKey ? data[current.otherKey] : undefined}
            onOtherChange={current.otherKey ? v => setData(d => ({ ...d, [current.otherKey]: v })) : undefined}
            otherPlaceholder={current.otherPlaceholder || 'Enter details...'}
          />
        )}
        {current.type === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TextInput placeholder="Your full name" value={data.contactName} onChange={v => setData(d => ({ ...d, contactName: v }))} />
            <TextInput placeholder={PHONE_PLACEHOLDER} value={data.contactPhone} onChange={v => setData(d => ({ ...d, contactPhone: v }))} type="tel" />
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
        <ContinueBtn
          onClick={handleContinue}
          disabled={!canContinue}
          label={step === BRAND_STEPS.length - 1 ? 'View Summary' : 'Continue'}
        />
      </div>
    </motion.div>
  );
}

// -- Investors Flow ------------------------------------------------------------
const INVESTOR_STEPS = [
  { q: 'Preferred industries?', type: 'chips', key: 'industries', multi: true, options: ['Food & Beverage', 'Health & Wellness', 'Education', 'Retail', 'Technology', 'Home Services', 'Other'] },
  { q: 'Investment budget?', type: 'chips', key: 'budget', options: ['Under Rs.25L', 'Rs.25L-Rs.50L', 'Rs.50L-Rs.1Cr', 'Rs.1Cr-Rs.5Cr', 'Rs.5Cr+'] },
  { q: 'Target cities?', type: 'chips', key: 'cities', otherKey: 'citiesOther', otherPlaceholder: 'Type your city...', options: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pan India', 'Other'] },
  { q: 'Investment timeline?', type: 'chips', key: 'timeline', options: ['Immediate', '3 months', '6 months', '12 months+'] },
];

function InvestorsView({ setView, setIsOpen }) {
  const p = useAssistantPalette();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);
  const submittedRef = useRef(false);

  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!done || submittedRef.current) return;
    submittedRef.current = true;
    (async () => {
      const result = await submitChatbotLead(data, 'investor', 'expansion_assistant_investor');
      if (!result?.success) {
        submittedRef.current = false;
        setSubmitError(result?.error || 'Could not save your preferences. Please try again.');
      }
    })();
  }, [done, data]);

  const current = INVESTOR_STEPS[step];
  const val = data[current?.key];
  const canContinue = (() => {
    if (current?.type === 'chips' && val === 'Other' && current.otherKey) {
      return Boolean(data[current.otherKey]?.trim());
    }
    return Array.isArray(val) ? val.length > 0 : Boolean(val);
  })();

  const handleContinue = () => {
    if (step < INVESTOR_STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <motion.div
        key="investors-done"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <FlowHeader title="Matching Opportunities" onBack={() => { setDone(false); setStep(INVESTOR_STEPS.length - 1); }} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard rows={[
            { label: 'Industries', value: Array.isArray(data.industries) ? data.industries.join(', ') : data.industries },
            { label: 'Budget', value: data.budget },
            { label: 'Cities', value: data.cities === 'Other' ? data.citiesOther : data.cities },
            { label: 'Timeline', value: data.timeline },
          ]} />
          <p style={{ color: p.mutedText, fontSize: 12, textAlign: 'center', margin: 0 }}>
            We have curated opportunities matching your profile.
          </p>
          {submitError ? (
            <p style={{ color: '#f87171', fontSize: 12, textAlign: 'center', margin: 0 }}>{submitError}</p>
          ) : null}
          <ContinueBtn onClick={() => navTo('/franchise-opportunities', setIsOpen)} label="Browse Matching Opportunities" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`investors-${step}`}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader
        title="For Investors"
        onBack={() => step === 0 ? setView('home') : setStep(s => s - 1)}
        step={step + 1}
        total={INVESTOR_STEPS.length}
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        <ProgressBar current={step + 1} total={INVESTOR_STEPS.length} />
        <div style={{ fontSize: 14, fontWeight: 600, color: p.questionColor, letterSpacing: '-0.02em', marginBottom: 4 }}>
          {current.q}
        </div>
        <ChipSelect
          options={current.options}
          value={data[current.key]}
          onChange={v => setData(d => ({ ...d, [current.key]: v }))}
          multi={current.multi}
          otherKey={current.otherKey}
          otherValue={current.otherKey ? data[current.otherKey] : undefined}
          onOtherChange={current.otherKey ? v => setData(d => ({ ...d, [current.otherKey]: v })) : undefined}
          otherPlaceholder={current.otherPlaceholder || 'Enter details...'}
        />
      </div>
      <motion.div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
        <ContinueBtn
          onClick={handleContinue}
          disabled={!canContinue}
          label={step === INVESTOR_STEPS.length - 1 ? 'View Matches' : 'Continue'}
        />
      </motion.div>
    </motion.div>
  );
}

// -- Strategy Call View --------------------------------------------------------
function StrategyView({ setView }) {
  const p = useAssistantPalette();
  const [ctaHover, setCtaHover] = useState(false);

  const perks = [
    { icon: <ClockMiniIcon />, title: '30-min discovery', desc: 'Speak with an expansion expert' },
    { icon: <RouteMiniIcon />, title: 'Growth roadmap', desc: 'Tailored plan for your brand' },
    { icon: <UsersMiniIcon />, title: 'Investor preview', desc: 'See matching opportunities' },
  ];

  const openCal = () => {
    const today = new Date().toISOString().slice(0, 10);
    submitStrategyCall(
      {
        name: 'Strategy call',
        phone: '0000000000',
        preferredDate: today,
        preferredTime: 'Cal.com booking',
        message: 'User opened external strategy calendar',
      },
      'expansion_assistant_strategy_calendar',
    );
    window.open(STRATEGY_CAL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      key="strategy"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}
    >
      <FlowHeader title="Book Strategy Call" onBack={() => setView('home')} />
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '10px 14px 14px', display: 'flex', flexDirection: 'column' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            padding: 14,
            background: 'linear-gradient(165deg, rgba(245,243,255,0.98) 0%, rgba(237,233,254,0.96) 45%, rgba(224,231,255,0.94) 100%)',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -24,
              right: -16,
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: PURPLE_ICON_GRADIENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0,
              boxShadow: PURPLE_ICON_SHADOW,
            }}>
              <CalendarIcon />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 9px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(139,92,246,0.18)',
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: '#7c3aed',
                marginBottom: 6,
              }}>
                <SparkleIcon />
                Free consultation
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: p.questionColor, letterSpacing: '-0.03em', lineHeight: 1.3 }}>
                Book a 30-min strategy session
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 12,
              padding: 12,
              background: '#fff',
              border: '1px solid rgba(226,232,240,0.95)',
              boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
            }}
          >
            <motion.button
              type="button"
              onClick={openCal}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '11px 14px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#fff',
                background: ctaHover
                  ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
                  : PURPLE_ICON_GRADIENT,
                boxShadow: '0 2px 8px rgba(124,58,237,0.22)',
                transition: 'background 0.2s ease',
              }}
            >
              Pick Your Time Slot
              <ExternalLinkIcon />
            </motion.button>

            <div style={{ marginTop: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {perks.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 4px',
                    borderTop: i > 0 ? '1px solid rgba(241,245,249,1)' : 'none',
                  }}
                >
                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: PURPLE_ICON_GRADIENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#fff',
                  }}>
                    {icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b', letterSpacing: '-0.02em', lineHeight: 1.25 }}>{title}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(71,85,105,0.78)', lineHeight: 1.35, marginTop: 1 }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// -- Services View -------------------------------------------------------------
const SERVICES_LIST = [
  {
    title: 'Franchise Onboarding',
    desc: 'End-to-end setup for new franchise partners',
    path: '/services',
    iconBg: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(99,102,241,0.2))',
    iconColor: 'rgba(167,139,250,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Investor Acquisition',
    desc: 'Connect with qualified franchise investors',
    path: '/franchise-opportunities',
    iconBg: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.15))',
    iconColor: 'rgba(52,211,153,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Expansion Strategy',
    desc: 'Data-driven roadmaps for national growth',
    path: '/services',
    iconBg: 'linear-gradient(135deg,rgba(245,158,11,0.25),rgba(217,119,6,0.15))',
    iconColor: 'rgba(251,191,36,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Brand Documentation',
    desc: 'FDD, operations manuals, and legal frameworks',
    path: '/services',
    iconBg: 'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(79,70,229,0.15))',
    iconColor: 'rgba(129,140,248,0.9)',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

function ServicesView({ setView, setIsOpen }) {
  return (
    <motion.div
      key="services"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader title="Our Services" onBack={() => setView('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {SERVICES_LIST.map((svc, i) => {
          const [hovered, setHovered] = useState(false);
          return (
            <motion.button
              key={svc.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              onClick={() => navTo(svc.path, setIsOpen)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                background: hovered ? 'rgba(248,250,252,1)' : 'rgba(255,255,255,1)',
                border: hovered ? '1px solid rgba(196,181,253,0.55)' : '1px solid rgba(226,232,240,0.98)',
                cursor: 'pointer',
                textAlign: 'left',
                transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: svc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: svc.iconColor }}>
                {svc.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(15,23,42,0.88)', letterSpacing: '-0.01em' }}>{svc.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(100,116,139,0.78)', marginTop: 2 }}>{svc.desc}</div>
              </div>
              <span style={{ color: 'rgba(148,163,184,0.82)', fontSize: 14, flexShrink: 0 }}>{'->'}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// -- Support View --------------------------------------------------------------
const SUPPORT_LINKS = [
  {
    title: 'How does iFranchise work?',
    desc: 'Platform overview & services',
    path: '/services',
    icon: <HelpMiniIcon />,
  },
  {
    title: 'Browse franchise opportunities',
    desc: 'Explore verified listings',
    path: '/franchise-opportunities',
    icon: <SearchMiniIcon />,
  },
  {
    title: 'List your brand',
    desc: 'Partner with our expansion desk',
    path: '/list-your-brand',
    icon: <StoreMiniIcon />,
  },
  {
    title: 'Contact our team',
    desc: 'Talk to franchise advisors',
    path: '/contact',
    icon: <MailMiniIcon />,
  },
];

function SupportLinkRow({ link, index, setIsOpen }) {
  const p = useAssistantPalette();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.22 }}
      onClick={() => navTo(link.path, setIsOpen)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 14px',
        borderRadius: 14,
        background: hovered ? p.linkBgHover : p.linkBg,
        border: hovered ? `1px solid ${p.linkBorderHover}` : `1px solid ${p.linkBorder}`,
        cursor: 'pointer',
        textAlign: 'left',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        boxShadow: hovered ? '0 6px 18px rgba(15,23,42,0.08)' : '0 1px 4px rgba(15,23,42,0.04)',
        transition: 'all 0.18s ease',
      }}
    >
      <div style={{
        width: 38,
        height: 38,
        borderRadius: 11,
        background: PURPLE_ICON_GRADIENT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#fff',
        boxShadow: PURPLE_ICON_SHADOW,
      }}>
        {link.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: p.linkTitle, letterSpacing: '-0.02em' }}>{link.title}</div>
        <div style={{ fontSize: 11, color: p.mutedText, marginTop: 2 }}>{link.desc}</div>
      </div>
      <div style={{
        width: 26,
        height: 26,
        borderRadius: 8,
        background: hovered ? 'rgba(124,58,237,0.12)' : 'rgba(148,163,184,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: hovered ? 'rgba(124,58,237,0.85)' : 'rgba(148,163,184,0.85)',
        transition: 'all 0.15s ease',
      }}>
        <ChevronRight />
      </div>
    </motion.button>
  );
}

function SupportView({ setView, setIsOpen }) {
  const p = useAssistantPalette();
  return (
    <motion.div
      key="support"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader title="Quick Support" onBack={() => setView('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '12px 14px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(148,163,184,0.12), rgba(100,116,139,0.06))',
            border: `1px solid ${p.linkBorder}`,
            marginBottom: 4,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: PURPLE_ICON_GRADIENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <SupportIcon />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: p.linkTitle, letterSpacing: '-0.02em' }}>Need a hand?</div>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: p.mutedText }}>Jump to the right place in one tap.</p>
            </div>
          </div>
        </motion.div>
        {SUPPORT_LINKS.map((link, i) => (
          <SupportLinkRow key={link.path} link={link} index={i} setIsOpen={setIsOpen} />
        ))}
      </div>
    </motion.div>
  );
}

const EA_FAB_SIZE = 56;
const EA_FAB_INSET = 24;
const EA_FAB_PANEL_GAP = 12;
/** Panel bottom offset: FAB inset + FAB height + gap above launcher */
const EA_PANEL_BOTTOM = EA_FAB_INSET + EA_FAB_SIZE + EA_FAB_PANEL_GAP;

// -- Main Component ------------------------------------------------------------
function AssistantFabLauncher({ isOpen, isLight, onOpen, onClose }) {
  const fab = useMemo(() => getAssistantFabTheme(isLight), [isLight]);

  return (
    <div
      className="assistant-fab-wrap"
      style={{
        '--ea-fab-size': `${EA_FAB_SIZE}px`,
        '--ea-fab-inset': `${EA_FAB_INSET}px`,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.button
          key={isOpen ? 'fab-open' : 'fab-closed'}
          type="button"
          onClick={isOpen ? onClose : onOpen}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? 'Close iFranchise assistant' : 'Open iFranchise assistant'}
          className="assistant-fab"
          style={{
            padding: 0,
            background: 'linear-gradient(165deg, #4f9cf9 0%, #3b82f6 42%, #2563eb 100%)',
            border: 'none',
            boxShadow: isOpen ? fab.hoverShadow : fab.boxShadow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = fab.hoverShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = isOpen ? fab.hoverShadow : fab.boxShadow;
          }}
        >
          <AssistantBotIcon
            size={EA_FAB_SIZE}
            variant={isLight ? 'light' : 'dark'}
            animate
            open={isOpen}
            className="assistant-bot-icon--fill"
          />
        </motion.button>
      </AnimatePresence>
    </div>
  );
}

export default function ExpansionAssistant() {
  const { isLight } = useTheme();
  const palette = useMemo(() => getAssistantPalette(isLight), [isLight]);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setView('home'), 300);
  }, []);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  const panelBase = {
    zIndex: 9999,
    background: palette.panel,
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: `1px solid ${palette.border}`,
    boxShadow: palette.panelShadow,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    color: palette.text,
  };

  const panelStyle = isMobile
    ? {
        ...panelBase,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '78vh',
        borderRadius: '20px 20px 0 0',
      }
    : {
        ...panelBase,
        position: 'fixed',
        bottom: EA_PANEL_BOTTOM,
        right: EA_FAB_INSET,
        width: 372,
        maxHeight: 540,
        borderRadius: 18,
      };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.28)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 9998 }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            className="assistant-panel"
            data-assistant-theme={palette.mode}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            style={panelStyle}
          >
            <AssistantPaletteContext.Provider value={palette}>
            <motion.div
              className="assistant-panel-header"
              style={{
                background: palette.header,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              <div className="assistant-header-layout">
                <div className="assistant-header-icon">
                  <AssistantGlyphTile dimension={32} siteIsLight={isLight} />
                </div>
                <div className="assistant-header-stack">
                  <div className="assistant-header-line1">
                    <AssistantDeskTitle />
                    <div className="assistant-header-line1-end">
                      <LiveStatusPulse />
                      <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close assistant"
                        className="assistant-header-close"
                        style={{
                          background: palette.closeBg,
                          border: `1px solid ${palette.closeBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: palette.closeColor,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="assistant-header-datetime">
                    <AssistantDateTime />
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {view === 'home' && <HomeView key="home" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'brands' && <BrandsView key="brands" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'investors' && <InvestorsView key="investors" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'strategy' && <StrategyView key="strategy" setView={setView} />}
                {view === 'support' && <SupportView key="support" setView={setView} setIsOpen={setIsOpen} />}
              </AnimatePresence>
            </div>
            </AssistantPaletteContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>

      <AssistantFabLauncher
        isOpen={isOpen}
        isLight={isLight}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </>
  );
}
