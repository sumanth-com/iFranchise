import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiClipboard } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { SITE_CONTACT_WHATSAPP_URL } from '@/data/siteContact';
import FranchiseInquiryModal from './FranchiseInquiryModal';
import './franchise-inquiry-icon.css';

const COMPACT_SHEET_MQ = '(max-width: 1023px)';

function subscribeCompactSheet(callback) {
  const mq = window.matchMedia(COMPACT_SHEET_MQ);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getCompactSheetSnapshot() {
  return window.matchMedia(COMPACT_SHEET_MQ).matches;
}

function getCompactSheetServerSnapshot() {
  return false;
}

function useCompactInquirySheet() {
  return useSyncExternalStore(subscribeCompactSheet, getCompactSheetSnapshot, getCompactSheetServerSnapshot);
}

function ClosedToggle({ onOpen, franchiseName }) {
  return (
    <div className="franchise-inquiry-rail franchise-inquiry-rail--closed">
      <aside className="franchise-inquiry-rail__strip" aria-label="Open franchise enquiry">
        <div className="franchise-inquiry-rail__toggle-wrap">
          <button
            type="button"
            onClick={onOpen}
            className="franchise-inquiry-rail__toggle"
            aria-label={`Connect with franchise experts about ${franchiseName}`}
            aria-expanded={false}
          >
            <FiChevronLeft aria-hidden size={18} strokeWidth={2.75} />
          </button>
        </div>
      </aside>
    </div>
  );
}

function MobileInquiryRail({
  expanded,
  franchiseName,
  onExpand,
  onCollapse,
  onOpenForm,
  heroHidden = false,
}) {
  const handleExpand = (e) => {
    e?.stopPropagation?.();
    onExpand();
  };

  return (
    <div
      className={`franchise-inquiry-rail franchise-inquiry-rail--mobile-tab${
        expanded ? ' franchise-inquiry-rail--mobile-tab--expanded' : ' franchise-inquiry-rail--mobile-tab--collapsed'
      }${heroHidden ? ' franchise-inquiry-rail--hero-hidden' : ''}`}
      onMouseEnter={!expanded ? handleExpand : undefined}
      aria-hidden={heroHidden || undefined}
    >
      <aside className="franchise-inquiry-rail__strip" aria-label="Franchise enquiry">
        <div
          className={`franchise-inquiry-rail__mobile-unit${
            expanded ? ' franchise-inquiry-rail__mobile-unit--expanded' : ''
          }`}
        >
          <div className="franchise-inquiry-rail__toggle-wrap">
            <button
              type="button"
              onClick={expanded ? onCollapse : handleExpand}
              className="franchise-inquiry-rail__toggle"
              aria-label={
                expanded
                  ? `Close enquiry options for ${franchiseName}`
                  : `Tap for help — talk to experts about ${franchiseName}`
              }
              title={expanded ? 'Close' : 'Tap for help'}
              aria-expanded={expanded}
              tabIndex={heroHidden ? -1 : undefined}
            >
              {expanded ? (
                <FiChevronRight aria-hidden size={18} strokeWidth={2.75} />
              ) : (
                <FiChevronLeft aria-hidden size={18} strokeWidth={2.75} />
              )}
            </button>
          </div>
          {expanded ? (
            <button
              type="button"
              onClick={onOpenForm}
              className="franchise-inquiry-rail__chip franchise-inquiry-rail__chip--cta franchise-inquiry-rail__chip--mobile-expert"
              aria-label={`Tap to talk to experts about ${franchiseName}`}
              tabIndex={heroHidden ? -1 : undefined}
            >
              <span className="franchise-inquiry-rail__chip-label">Talk to Experts</span>
              <span className="franchise-inquiry-rail__tap-cue" aria-hidden>
                <span className="franchise-inquiry-rail__tap-cue-text">Tap</span>
              </span>
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function InquiryRailTab({ onClose, franchiseName, whatsappUrl = SITE_CONTACT_WHATSAPP_URL }) {
  return (
    <aside className="franchise-inquiry-rail__stack" aria-label="Franchise enquiry">
      <button
        type="button"
        onClick={onClose}
        className="franchise-inquiry-rail__chip franchise-inquiry-rail__chip--close"
        aria-label={`Close enquiry for ${franchiseName}`}
        aria-expanded
      >
        <FiChevronRight aria-hidden />
      </button>

      <div className="franchise-inquiry-rail__chip franchise-inquiry-rail__chip--cta" aria-hidden="true">
        <FiClipboard className="franchise-inquiry-rail__chip-icon" aria-hidden />
        <span className="franchise-inquiry-rail__chip-label">Show interest</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="franchise-inquiry-rail__chip franchise-inquiry-rail__chip--whatsapp"
        aria-label="Chat on WhatsApp"
        onClick={(e) => e.stopPropagation()}
      >
        <FaWhatsapp aria-hidden />
      </a>
    </aside>
  );
}

export default function FranchiseInquiryLauncher({
  franchise,
  franchiseStructure,
  className = '',
  open: controlledOpen,
  onOpenChange,
  hideOnDesktop = false,
  hideSideRail = false,
  whatsappUrl = SITE_CONTACT_WHATSAPP_URL,
}) {
  const [phase, setPhase] = useState('rail');
  const [pinned, setPinned] = useState(false);
  const leaveTimerRef = useRef(null);
  const isCompactSheet = useCompactInquirySheet();
  const isControlled = typeof controlledOpen === 'boolean' && typeof onOpenChange === 'function';
  const franchiseKey = franchise?.id || franchise?.name || '';

  const notifyOpen = useCallback(
    (isOpen) => {
      if (isControlled) onOpenChange(isOpen);
    },
    [isControlled, onOpenChange],
  );

  const goClosed = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    setPhase('closed');
    setPinned(false);
    notifyOpen(false);
  }, [notifyOpen]);

  const goRail = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    setPhase('rail');
    setPinned(false);
  }, []);

  const handleUserInput = useCallback(() => {
    setPinned(true);
    setPhase('form');
    notifyOpen(true);
  }, [notifyOpen]);

  useEffect(() => {
    if (!franchiseKey) return;
    clearTimeout(leaveTimerRef.current);
    setPhase('rail');
    setPinned(false);
  }, [franchiseKey]);

  useEffect(() => {
    if (!isControlled || !controlledOpen) return;
    setPhase('form');
    setPinned(true);
  }, [controlledOpen, isControlled]);

  useEffect(
    () => () => {
      clearTimeout(leaveTimerRef.current);
    },
    [],
  );

  const showForm = phase === 'form';

  useEffect(() => {
    if (phase === 'closed') {
      document.body.classList.remove('franchise-inquiry-open');
      document.body.classList.remove('franchise-inquiry-open--blur');
      return undefined;
    }
    if (showForm) {
      document.body.classList.add('franchise-inquiry-open');
      document.body.classList.add('franchise-inquiry-open--blur');
    } else if (!isCompactSheet) {
      document.body.classList.add('franchise-inquiry-open');
      document.body.classList.remove('franchise-inquiry-open--blur');
    } else {
      document.body.classList.remove('franchise-inquiry-open');
      document.body.classList.remove('franchise-inquiry-open--blur');
    }
    return () => {
      document.body.classList.remove('franchise-inquiry-open');
      document.body.classList.remove('franchise-inquiry-open--blur');
    };
  }, [phase, showForm, isCompactSheet]);

  if (!franchise?.id || !franchise?.name) return null;

  if (!isCompactSheet && hideOnDesktop) return null;

  const handleDockEnter = () => {
    clearTimeout(leaveTimerRef.current);
    if (phase === 'rail' || phase === 'form') setPhase('form');
  };

  const handleDockLeave = () => {
    if (pinned) return;
    clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setPhase('rail');
    }, 120);
  };

  const handleCloseForm = () => {
    if (pinned) {
      goClosed();
      return;
    }
    goRail();
  };

  if (isCompactSheet) {
    const mobileOpen = phase === 'form';
    const mobileRailExpanded = phase === 'rail';

    const openForm = () => {
      setPhase('form');
      setPinned(true);
      notifyOpen(true);
    };

    return (
      <>
        {phase === 'closed' || phase === 'rail'
          ? createPortal(
              <div className={className}>
                <MobileInquiryRail
                  expanded={mobileRailExpanded}
                  franchiseName={franchise.name}
                  onExpand={goRail}
                  onCollapse={goClosed}
                  onOpenForm={openForm}
                  heroHidden={hideSideRail}
                />
              </div>,
              document.body,
            )
          : null}

        {mobileOpen
          ? createPortal(
              <div
                className="franchise-inquiry-sheet franchise-inquiry-sheet--mobile"
                role="dialog"
                aria-modal="true"
                aria-labelledby="franchise-inquiry-title"
              >
                <button
                  type="button"
                  className="franchise-inquiry-sheet__backdrop"
                  aria-label="Close franchise interest form"
                  onClick={goClosed}
                />
                <div className="franchise-inquiry-sheet__inner">
                  <FranchiseInquiryModal
                    franchise={franchise}
                    franchiseStructure={franchiseStructure}
                    variant="panel"
                    lockScroll
                    showWhatsAppAction
                    whatsappUrl={whatsappUrl}
                    onClose={goClosed}
                    onUserInput={handleUserInput}
                  />
                </div>
              </div>,
              document.body,
            )
          : null}
      </>
    );
  }

  return (
    <>
      {phase === 'closed' ? (
        <div className={className}>
          <ClosedToggle onOpen={goRail} franchiseName={franchise.name} />
        </div>
      ) : null}

      {phase !== 'closed'
        ? createPortal(
            <div
              className={`franchise-inquiry-dock${
                showForm ? ' franchise-inquiry-dock--form' : ' franchise-inquiry-dock--rail'
              }${pinned ? ' franchise-inquiry-dock--pinned' : ''}`}
              onMouseEnter={handleDockEnter}
              onMouseLeave={handleDockLeave}
              onFocusCapture={handleDockEnter}
              onBlurCapture={(e) => {
                if (pinned) return;
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  handleDockLeave();
                }
              }}
            >
              {showForm && pinned ? (
                <button
                  type="button"
                  className="franchise-inquiry-sheet__backdrop franchise-inquiry-sheet__backdrop--pinned"
                  aria-label="Close franchise interest form"
                  onClick={goClosed}
                />
              ) : null}

              <div
                className="franchise-inquiry-dock__form"
                aria-hidden={!showForm}
              >
                <FranchiseInquiryModal
                  franchise={franchise}
                  franchiseStructure={franchiseStructure}
                  variant="panel"
                  lockScroll={pinned}
                  onClose={handleCloseForm}
                  onUserInput={handleUserInput}
                />
              </div>

              <InquiryRailTab onClose={goClosed} franchiseName={franchise.name} whatsappUrl={whatsappUrl} />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
