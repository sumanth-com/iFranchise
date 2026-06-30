import { useState, useEffect, useCallback, useRef, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBarChart2, FiCalendar, FiLayers } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { SITE_CONTACT_WHATSAPP_URL } from '@/data/siteContact';
import { navigateTo as spaNavigate, getLogicalPathname, NAVIGATE_EVENT } from '@/lib/navigation';

const STRATEGY_CAL_URL = 'https://cal.com/ifranchise.in/30min';

const PURPLE_ICON_GRADIENT = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 52%, #6366f1 100%)';
const PURPLE_ICON_SHADOW = '0 6px 16px rgba(124, 58, 237, 0.32)';
import { useTheme } from '../context/ThemeContext';
import AssistantBotIcon from './AssistantBotIcon';
import './assistant-panel.css';

const AssistantPaletteContext = createContext(null);

function getAssistantPalette() {
  return {
    mode: 'light',
    panel: '#ffffff',
    header: '#ffffff',
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
    strategyHeroBg: 'linear-gradient(165deg, #f5f3ff 0%, #ede9fe 46%, #e0e7ff 100%)',
    strategyHeroBorder: 'rgba(139, 92, 246, 0.2)',
    strategyHeroShadow: '0 4px 18px rgba(124, 58, 237, 0.1)',
    strategyHeroTitle: '#0f172a',
    strategyBadgeBg: 'rgba(255, 255, 255, 0.95)',
    strategyBadgeText: '#6d28d9',
    strategyBadgeBorder: 'rgba(139, 92, 246, 0.18)',
    strategyCardBg: '#ffffff',
    strategyCardBorder: 'rgba(226, 232, 240, 0.98)',
    strategyPerkTitle: '#1e1b4b',
    strategyPerkDesc: 'rgba(71, 85, 105, 0.78)',
    strategyDivider: 'rgba(241, 245, 249, 1)',
    strategyFlowBodyBg: 'rgba(248, 250, 252, 0.65)',
  };
}

function useAssistantPalette() {
  return useContext(AssistantPaletteContext) || getAssistantPalette();
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
      <span style={{ color: p.text }}>iFranchise assistant</span>
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

// -- Home row icons (Feather — clean, familiar strokes) -----------------------
const HOME_ICON_SIZE = 18;

const BrandIcon = () => <FiLayers size={HOME_ICON_SIZE} strokeWidth={2} aria-hidden />;
const InvestorIcon = () => <FiBarChart2 size={HOME_ICON_SIZE} strokeWidth={2} aria-hidden />;
const CalendarIcon = () => <FiCalendar size={HOME_ICON_SIZE} strokeWidth={2} aria-hidden />;

function PremiumRowIcon({ children, hovered }) {
  return (
    <div
      className="assistant-row-icon"
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        background: hovered ? 'rgba(124, 58, 237, 0.14)' : 'rgba(124, 58, 237, 0.09)',
        border: '1px solid rgba(124, 58, 237, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#7c3aed',
        transition: 'background 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {children}
    </div>
  );
}

// -- Home View -----------------------------------------------------------------
const HOME_ACTIONS = [
  {
    id: 'list-brand',
    label: 'FOR BRANDS',
    title: 'List your brand',
    icon: <BrandIcon />,
    path: '/list-your-brand',
  },
  {
    id: 'browse',
    label: 'FOR INVESTORS',
    title: 'Browse opportunities',
    icon: <InvestorIcon />,
    path: '/franchise-opportunities',
  },
  {
    id: 'book-call',
    label: 'FREE CALL',
    title: 'Book a strategy call',
    icon: <CalendarIcon />,
    href: STRATEGY_CAL_URL,
    external: true,
  },
];

function useLogicalPathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? getLogicalPathname() : '/',
  );

  useEffect(() => {
    const sync = () => setPathname(getLogicalPathname());
    window.addEventListener('popstate', sync);
    window.addEventListener(NAVIGATE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(NAVIGATE_EVENT, sync);
    };
  }, []);

  return pathname;
}

function getHomeActions(pathname) {
  if (pathname === '/list-your-brand') {
    return HOME_ACTIONS.filter((action) => action.id !== 'list-brand');
  }
  return HOME_ACTIONS;
}

function getHomeWelcomeCopy(pathname) {
  if (pathname === '/list-your-brand') {
    return {
      title: 'Explore opportunities or connect with us',
      body: 'Browse verified franchises, book a free strategy call, or chat on WhatsApp.',
    };
  }
  return {
    title: 'Expand your brand or invest in one',
    body: 'List on iFranchise, browse verified opportunities, or book a free strategy call with our team.',
  };
}

function AssistantWhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={SITE_CONTACT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="assistant-whatsapp-cta"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered
          ? '0 8px 22px rgba(37, 211, 102, 0.34)'
          : '0 6px 18px rgba(37, 211, 102, 0.28)',
      }}
    >
      <FaWhatsapp aria-hidden />
      <span>Chat on WhatsApp</span>
    </a>
  );
}

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
        padding: secondary ? '9px 12px' : '10px 12px',
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
          lineHeight: 1.28,
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

function HomeView({ setIsOpen, pathname }) {
  const p = useAssistantPalette();
  const actions = useMemo(() => getHomeActions(pathname), [pathname]);
  const welcome = useMemo(() => getHomeWelcomeCopy(pathname), [pathname]);

  const handleAction = (action) => {
    if (action.external && action.href) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action.path) navTo(action.path, setIsOpen);
  };

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="assistant-home-shell">
        <div className="assistant-home-welcome">
          <h3 className="assistant-home-welcome-title" style={{ color: p.welcomeTitle }}>
            {welcome.title}
          </h3>
          <p className="assistant-home-welcome-body" style={{ color: p.welcomeBody }}>
            {welcome.body}
          </p>
        </div>
      </div>

      <div className="assistant-home-list">
        {actions.map((action, i) => (
          <ActionRow key={action.id} row={action} onClick={() => handleAction(action)} index={i} />
        ))}
      </div>
      <div className="assistant-home-footer">
        <AssistantWhatsAppButton />
      </div>
    </motion.div>
  );
}

const EA_FAB_SIZE = 56;
const EA_FAB_INSET = 24;
const EA_FAB_PANEL_GAP = 20;
/** Panel bottom offset: FAB inset + FAB height + gap above launcher */
const EA_PANEL_BOTTOM = EA_FAB_INSET + EA_FAB_SIZE + EA_FAB_PANEL_GAP;
const EA_PANEL_MAX_HEIGHT = 380;

// -- Main Component ------------------------------------------------------------
function AssistantFabLauncher({ isLight, onOpen }) {
  const fab = useMemo(() => getAssistantFabTheme(isLight), [isLight]);

  return (
    <div
      className="assistant-fab-wrap"
      style={{
        '--ea-fab-size': `${EA_FAB_SIZE}px`,
        '--ea-fab-inset': `${EA_FAB_INSET}px`,
      }}
    >
        <motion.button
          type="button"
        onClick={onOpen}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
        aria-label="Open iFranchise assistant"
          className="assistant-fab"
          style={{
            padding: 0,
            background: 'linear-gradient(165deg, #4f9cf9 0%, #3b82f6 42%, #2563eb 100%)',
            border: 'none',
          boxShadow: fab.boxShadow,
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
          e.currentTarget.style.boxShadow = fab.boxShadow;
          }}
        >
          <AssistantBotIcon
            size={EA_FAB_SIZE}
            variant={isLight ? 'light' : 'dark'}
            animate
            className="assistant-bot-icon--fill"
          />
        </motion.button>
    </div>
  );
}

export default function ExpansionAssistant() {
  const { isLight } = useTheme();
  const pathname = useLogicalPathname();
  const palette = useMemo(() => getAssistantPalette(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    if (!isOpen || isMobile) return undefined;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (panelRef.current?.contains(target)) return;
      if (target.closest?.('.assistant-fab-wrap')) return;
      handleClose();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen, isMobile, handleClose]);

  const panelBase = {
    zIndex: 10000,
    background: palette.panel,
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
        height: 'auto',
        maxHeight: 'min(420px, calc(100vh - 72px))',
        borderRadius: '20px 20px 0 0',
      }
    : {
        ...panelBase,
        position: 'fixed',
        bottom: EA_FAB_INSET,
        right: EA_FAB_INSET,
        width: 336,
        height: 'auto',
        maxHeight: `min(${EA_PANEL_MAX_HEIGHT}px, calc(100vh - ${EA_FAB_INSET * 2 + 20}px))`,
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
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
            ref={panelRef}
            className={`assistant-panel${isMobile ? '' : ' assistant-panel--desktop'}`}
            data-assistant-theme={palette.mode}
            initial={
              isMobile
                ? { opacity: 0, y: '100%' }
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            animate={
              isMobile
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              isMobile
                ? { opacity: 0, y: 28 }
                : { opacity: 0, y: 6, scale: 0.99 }
            }
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...panelStyle, willChange: 'transform, opacity' }}
          >
            <AssistantPaletteContext.Provider value={palette}>
            <motion.div
              className="assistant-panel-header"
              style={{
                background: palette.header,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              <div className="assistant-header-actions">
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
              <div className="assistant-header-layout">
                <div className="assistant-header-icon">
                  <AssistantGlyphTile dimension={isMobile ? 40 : 36} siteIsLight={true} />
                  </div>
                <div className="assistant-header-brand">
                  <AssistantDeskTitle />
                    <AssistantDateTime />
                </div>
              </div>
            </motion.div>

            <div className="assistant-panel-body">
              <HomeView setIsOpen={setIsOpen} pathname={pathname} />
            </div>
            </AssistantPaletteContext.Provider>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen ? <AssistantFabLauncher isLight={isLight} onOpen={handleOpen} /> : null}
    </>
  );
}
