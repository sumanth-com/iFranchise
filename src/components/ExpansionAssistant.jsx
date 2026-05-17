import { useState, useEffect, useCallback, useRef, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitChatbotLead } from '../lib/forms';
import { useTheme } from '../context/ThemeContext';
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
      liveLabel: '#e2e8f0',
      livePillBg: 'rgba(34,197,94,0.14)',
      livePillBorder: 'rgba(34,197,94,0.32)',
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
    liveLabel: '#334155',
    livePillBg: 'rgba(34,197,94,0.1)',
    livePillBorder: 'rgba(34,197,94,0.28)',
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
    rowBgHover: 'rgba(248,246,255,0.98)',
    rowBorder: 'rgba(237,233,254,0.95)',
    rowBorderHover: 'rgba(167,139,250,0.5)',
    rowLabel: 'rgba(124,58,237,0.88)',
    rowTitle: 'rgba(15,23,42,0.92)',
    rowSecondaryBg: 'rgba(249,250,251,0.95)',
    rowSecondaryTitle: 'rgba(71,85,105,0.9)',
    welcomeTitle: '#0f172a',
    welcomeBody: 'rgba(71,85,105,0.9)',
    linkBg: '#fff',
    linkBgHover: 'rgba(248,250,252,1)',
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

// ── Navigation helper ─────────────────────────────────────────────────────────
const navTo = (path, setIsOpen) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
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

/** Fixed shell — 3D Earth surface rotates inside like the real planet */
function RotatingGlobeIcon({ size = 22, className = '' }) {
  return (
    <span
      className={`assistant-globe-frame ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="assistant-globe-halo" />
      <span className="assistant-globe-orbit" />
      <span className="assistant-globe-sphere">
        <span className="assistant-globe-surface-track" aria-hidden />
        <span className="assistant-globe-shade" />
        <span className="assistant-globe-sheen" />
      </span>
    </span>
  );
}

/** Pulsing “live” cue for header status */
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

/** Header tile — static shell, rotating globe inside */
function AssistantGlyphTile({ dimension = 34 }) {
  const p = useAssistantPalette();
  const glyph = Math.round(dimension * 0.58);
  return (
    <div
      className="assistant-globe-tile"
      aria-hidden
      style={{
        width: dimension,
        height: dimension,
        borderRadius: Math.max(9, Math.round(dimension * 0.31)),
        color: PURPLE_BRAND,
        ['--ea-globe-tile-bg']: p.globeTileBg,
        ['--ea-globe-tile-border']: p.globeTileBorder,
      }}
    >
      <RotatingGlobeIcon size={glyph} />
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

// ── Row icons ─────────────────────────────────────────────────────────────────
const BrandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const InvestorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
  </svg>
);

const HelpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ── Chip Selector ─────────────────────────────────────────────────────────────
function ChipSelect({ options, value, onChange, multi = false }) {
  const p = useAssistantPalette();
  const isSelected = (opt) => multi ? (value || []).includes(opt) : value === opt;
  const handleClick = (opt) => {
    if (multi) {
      const current = value || [];
      onChange(current.includes(opt) ? current.filter(o => o !== opt) : [...current, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
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
    </div>
  );
}

// ── Text Input ────────────────────────────────────────────────────────────────
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

// ── Progress Bar ──────────────────────────────────────────────────────────────
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

// ── Continue Button ───────────────────────────────────────────────────────────
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

// ── Flow Header ───────────────────────────────────────────────────────────────
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

// ── Summary Card ──────────────────────────────────────────────────────────────
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

// ── Home View ─────────────────────────────────────────────────────────────────
const PRIMARY_ROWS = [
  {
    id: 'brands',
    label: 'FOR BRANDS',
    title: 'Scale my brand through franchising',
    iconBg: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(99,102,241,0.2))',
    iconColor: 'rgba(167,139,250,0.9)',
    icon: <BrandIcon />,
  },
  {
    id: 'investors',
    label: 'FOR INVESTORS',
    title: 'Discover franchise opportunities',
    iconBg: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.15))',
    iconColor: 'rgba(52,211,153,0.9)',
    icon: <InvestorIcon />,
  },
  {
    id: 'strategy',
    label: 'STRATEGY CALL',
    title: 'Speak with expansion experts',
    iconBg: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(37,99,235,0.15))',
    iconColor: 'rgba(96,165,250,0.9)',
    icon: <PhoneIcon />,
  },
];

const SUPPORT_ROW = {
  id: 'support',
  label: 'SUPPORT',
  title: 'Navigate the platform & get help',
  iconBg: 'linear-gradient(135deg,rgba(148,163,184,0.22),rgba(100,116,139,0.12))',
  iconColor: 'rgba(100,116,139,0.88)',
  icon: <HelpIcon />,
};

function ActionRow({ row, onClick, index, secondary = false }) {
  const p = useAssistantPalette();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
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
        gap: 14,
        padding: secondary ? '10px 13px' : '11px 13px',
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
        boxShadow: hovered && !secondary ? '0 2px 14px rgba(139,92,246,0.12)' : 'none',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: secondary ? 'rgba(0,0,0,0.04)' : row.iconBg,
        border: secondary ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: secondary ? 'rgba(100,116,139,0.75)' : row.iconColor,
        transition: 'transform 0.18s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }}>
        {row.icon}
      </div>

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
      <div style={{ padding: '12px 12px 6px', flexShrink: 0 }}>
        <div
          className="assistant-home-welcome"
          style={{
            padding: '14px 14px 12px',
            borderRadius: 14,
            background: 'linear-gradient(145deg, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.05) 45%, rgba(255,255,255,0.6) 100%)',
            border: '1px solid rgba(237,233,254,0.95)',
            boxShadow: '0 2px 12px rgba(124,58,237,0.06)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 8,
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: PURPLE_BRAND,
            }}
          >
            <span className="assistant-home-welcome-dot" />
            Global franchise desk
          </div>
          <div
            style={{
              fontSize: 15.5,
              fontWeight: 700,
              color: p.welcomeTitle,
              letterSpacing: '-0.03em',
              lineHeight: 1.35,
            }}
          >
            How can we help you expand today?
          </div>
          <p
            style={{
              marginTop: 6,
              fontSize: 12,
              lineHeight: 1.45,
              color: p.welcomeBody,
              letterSpacing: '-0.01em',
            }}
          >
            Please select an option below to connect with our franchise advisory team.
          </p>
        </div>
      </div>

      {/* Action rows */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 10px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {PRIMARY_ROWS.map((row, i) => (
          <ActionRow key={row.id} row={row} onClick={() => setView(row.id)} index={i} />
        ))}

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${p.divider}, transparent)`, margin: '4px 2px' }} />

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

// ── Brands Flow ───────────────────────────────────────────────────────────────
const BRAND_STEPS = [
  { q: "What's your brand name?", type: 'text', key: 'brandName', placeholder: 'e.g. Chai Point, FitZone...' },
  { q: 'Which industry?', type: 'chips', key: 'industry', options: ['Food & Beverage', 'Health & Wellness', 'Education', 'Retail', 'Technology', 'Home Services', 'Other'] },
  { q: 'How many locations currently?', type: 'chips', key: 'locations', options: ['1', '2–5', '6–15', '15+'] },
  { q: 'Target expansion cities?', type: 'chips', key: 'cities', options: ['3–5', '5–10', '10–20', '20+ (National)'] },
  { q: 'Franchise investment range?', type: 'chips', key: 'investment', options: ['Under ₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr+'] },
  { q: 'Your name & contact?', type: 'contact', key: 'contact' },
];

function BrandsView({ setView, setIsOpen }) {
  const p = useAssistantPalette();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (!done || submittedRef.current) return;
    submittedRef.current = true;
    submitChatbotLead(data, 'brand', 'expansion_assistant_brand');
  }, [done, data]);

  const current = BRAND_STEPS[step];
  const val = data[current?.key];
  const canContinue = current?.type === 'contact'
    ? (data.contactName?.trim() && data.contactPhone?.trim())
    : (Array.isArray(val) ? val.length > 0 : Boolean(val?.trim?.() ?? val));

  const handleContinue = () => {
    if (step < BRAND_STEPS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };

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
        <FlowHeader title="Your Summary" onBack={() => { submittedRef.current = false; setDone(false); setStep(0); setData({}); setView('home'); }} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard rows={[
            { label: 'Brand', value: data.brandName },
            { label: 'Industry', value: data.industry },
            { label: 'Locations', value: data.locations },
            { label: 'Target Cities', value: data.cities },
            { label: 'Investment', value: data.investment },
            { label: 'Contact', value: data.contactName },
            { label: 'Phone', value: data.contactPhone },
          ]} />
          <p style={{ color: p.mutedText, fontSize: 12, textAlign: 'center', margin: 0 }}>
            Our expansion team will reach out within 24 hours.
          </p>
          <ContinueBtn onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')} label="Schedule Expansion Consultation" />
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
          <ChipSelect options={current.options} value={data[current.key]} onChange={v => setData(d => ({ ...d, [current.key]: v }))} />
        )}
        {current.type === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <TextInput placeholder="Your full name" value={data.contactName} onChange={v => setData(d => ({ ...d, contactName: v }))} />
            <TextInput placeholder="Phone number" value={data.contactPhone} onChange={v => setData(d => ({ ...d, contactPhone: v }))} type="tel" />
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

// ── Investors Flow ────────────────────────────────────────────────────────────
const INVESTOR_STEPS = [
  { q: 'Preferred industries?', type: 'chips', key: 'industries', multi: true, options: ['Food & Beverage', 'Health & Wellness', 'Education', 'Retail', 'Technology', 'Home Services', 'Other'] },
  { q: 'Investment budget?', type: 'chips', key: 'budget', options: ['Under ₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr–₹5Cr', '₹5Cr+'] },
  { q: 'Target cities?', type: 'chips', key: 'cities', options: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pan India'] },
  { q: 'Expected ROI?', type: 'chips', key: 'roi', options: ['20–30%', '30–40%', '40%+'] },
  { q: 'Investment timeline?', type: 'chips', key: 'timeline', options: ['Immediate', '3 months', '6 months', '12 months+'] },
];

function InvestorsView({ setView, setIsOpen }) {
  const p = useAssistantPalette();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (!done || submittedRef.current) return;
    submittedRef.current = true;
    submitChatbotLead(data, 'investor', 'expansion_assistant_investor');
  }, [done, data]);

  const current = INVESTOR_STEPS[step];
  const val = data[current?.key];
  const canContinue = Array.isArray(val) ? val.length > 0 : Boolean(val);

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
        <FlowHeader title="Matching Opportunities" onBack={() => { submittedRef.current = false; setDone(false); setStep(0); setData({}); setView('home'); }} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard rows={[
            { label: 'Industries', value: Array.isArray(data.industries) ? data.industries.join(', ') : data.industries },
            { label: 'Budget', value: data.budget },
            { label: 'Cities', value: data.cities },
            { label: 'Expected ROI', value: data.roi },
            { label: 'Timeline', value: data.timeline },
          ]} />
          <p style={{ color: p.mutedText, fontSize: 12, textAlign: 'center', margin: 0 }}>
            We have curated opportunities matching your profile.
          </p>
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
        />
      </div>
      <div style={{ padding: '12px 16px 16px', flexShrink: 0 }}>
        <ContinueBtn
          onClick={handleContinue}
          disabled={!canContinue}
          label={step === INVESTOR_STEPS.length - 1 ? 'View Matches' : 'Continue'}
        />
      </div>
    </motion.div>
  );
}

// ── Strategy Call View ────────────────────────────────────────────────────────
function StrategyView({ setView, setIsOpen }) {
  const features = [
    { label: '30', text: '30-min discovery call with an expansion expert' },
    { label: '→', text: 'Custom expansion roadmap tailored to your brand' },
    { label: '★', text: 'Investor matching preview for your opportunity' },
  ];

  return (
    <motion.div
      key="strategy"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <FlowHeader title="Book Strategy Call" onBack={() => setView('home')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(37,99,235,0.82)', marginBottom: 10 }}>
            Strategy Consultation
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(15,23,42,0.9)', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Book a Strategy Consultation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map(({ label, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  <span style={{ color: 'rgba(37,99,235,0.88)', fontSize: 9, fontWeight: 700 }}>{label}</span>
                </div>
                <p style={{ color: 'rgba(71,85,105,0.88)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(226,232,240,0.9)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} />
            <span style={{ color: 'rgba(52,211,153,0.95)', fontSize: 11, fontWeight: 500 }}>Response within 24 hours</span>
          </div>
        </div>
        <button
          onClick={() => window.open('https://cal.com/ifranchise/30min', '_blank')} style={{
            width: '100%',
            padding: '11px',
            borderRadius: 10,
            background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
            color: 'white',
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
            letterSpacing: '-0.01em',
            transition: 'filter 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
        >
          Schedule Now
        </button>
        <p style={{ color: 'rgba(100,116,139,0.75)', fontSize: 12, textAlign: 'center', margin: 0 }}>
          Or call us directly:{' '}
          <a href="tel:+919876543210" style={{ color: 'rgba(15,23,42,0.75)', textDecoration: 'none', fontWeight: 500 }}>
            +91 98765 43210
          </a>
        </p>
      </div>
    </motion.div>
  );
}

// ── Services View ─────────────────────────────────────────────────────────────
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
              <span style={{ color: 'rgba(148,163,184,0.82)', fontSize: 14, flexShrink: 0 }}>→</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Support View ──────────────────────────────────────────────────────────────
const SUPPORT_LINKS = [
  {
    title: 'How does iFranchise work?',
    path: '/services',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Browse franchise opportunities',
    path: '/franchise-opportunities',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: 'List your brand',
    path: '/list-your-brand',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: 'Contact our team',
    path: '/contact',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
];

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
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ color: p.mutedText, fontSize: 12, margin: '4px 2px 8px', letterSpacing: '-0.01em' }}>
          Where would you like to go?
        </p>
        {SUPPORT_LINKS.map((link, i) => {
          const [hovered, setHovered] = useState(false);
          return (
            <motion.button
              key={link.path}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              onClick={() => navTo(link.path, setIsOpen)}
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
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(249,250,251,1)', border: '1px solid rgba(226,232,240,1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'rgba(100,116,139,0.78)' }}>
                {link.icon}
              </div>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'rgba(15,23,42,0.88)', letterSpacing: '-0.01em' }}>{link.title}</span>
              <span style={{ color: 'rgba(148,163,184,0.82)', fontSize: 14, flexShrink: 0 }}>→</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
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
        bottom: 80,
        right: 24,
        width: 360,
        maxHeight: 520,
        borderRadius: 16,
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
            <div
              style={{
                padding: '12px 14px 11px',
                flexShrink: 0,
                background: palette.header,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              <div className="assistant-header-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <AssistantGlyphTile dimension={34} />
                  <AssistantDateTime />
                </div>
                <div className="assistant-header-actions">
                  <LiveStatusPulse />
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close assistant"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
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
            </div>

            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence mode="wait">
                {view === 'home' && <HomeView key="home" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'brands' && <BrandsView key="brands" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'investors' && <InvestorsView key="investors" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'strategy' && <StrategyView key="strategy" setView={setView} setIsOpen={setIsOpen} />}
                {view === 'support' && <SupportView key="support" setView={setView} setIsOpen={setIsOpen} />}
              </AnimatePresence>
            </div>
            </AssistantPaletteContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="launcher"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              style={{ position: 'relative' }}
            >
              {/* Live pulse halo around launcher */}
              <motion.div
                aria-hidden
                animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.12, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: 24,
                  background: `radial-gradient(circle at 50% 50%, ${PURPLE_BRIGHT}22 0%, transparent 72%)`,
                  pointerEvents: 'none',
                }}
              />
              <motion.span
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: 20,
                  border: `2px solid ${PURPLE_BRIGHT}`,
                  pointerEvents: 'none',
                  opacity: 0.55,
                }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.48, 0.12, 0.48] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.button
                onClick={handleOpen}
                animate={{ scale: [1, 1.025, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open iFranchise assistant"
                style={{
                  position: 'relative',
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: 'linear-gradient(180deg,#ffffff 0%,#faf8ff 100%)',
                  border: `1.5px solid rgba(124,58,237,0.42)`,
                  boxShadow:
                    '0 8px 28px rgba(124,58,237,0.22), 0 2px 8px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(109,40,217,0.65)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 36px rgba(124,58,237,0.32), 0 2px 10px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.42)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 28px rgba(124,58,237,0.22), 0 2px 8px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,1)';
                }}
              >
                <RotatingGlobeIcon size={24} className="assistant-fab-globe" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="close-fab"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              onClick={handleClose}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close iFranchise assistant"
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: 'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)',
                border: '1px solid rgba(148,163,184,0.38)',
                boxShadow: '0 6px 20px rgba(15,23,42,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(71,85,105,0.9)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
