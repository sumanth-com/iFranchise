import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiMail } from 'react-icons/fi';
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

function InquiryRail({ open, onToggle, franchiseName, className = '' }) {
  return (
    <aside
      className={`franchise-inquiry-rail__strip ${className}`.trim()}
      aria-label="Franchise interest actions"
    >
      <button
        type="button"
        onClick={onToggle}
        className="franchise-inquiry-rail__toggle"
        aria-label={open ? 'Close enquiry form' : `Enquire now about ${franchiseName}`}
        aria-expanded={open}
      >
        {open ? <FiChevronRight aria-hidden /> : <FiChevronLeft aria-hidden />}
      </button>
      {open ? (
        <>
          <div className="franchise-inquiry-rail__cta" aria-hidden>
            <FiMail className="franchise-inquiry-rail__cta-icon" aria-hidden />
            <span className="franchise-inquiry-rail__cta-label">Enquire now</span>
          </div>
          <a
            href={SITE_CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="franchise-inquiry-rail__whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp aria-hidden />
          </a>
        </>
      ) : null}
    </aside>
  );
}

export default function FranchiseInquiryLauncher({
  franchise,
  franchiseStructure,
  className = '',
  open: controlledOpen,
  onOpenChange,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isCompactSheet = useCompactInquirySheet();
  const isControlled = typeof controlledOpen === 'boolean' && typeof onOpenChange === 'function';
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

  if (!franchise?.id || !franchise?.name) return null;

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove('franchise-inquiry-open');
      return undefined;
    }
    document.body.classList.add('franchise-inquiry-open');
    return () => document.body.classList.remove('franchise-inquiry-open');
  }, [open]);

  return (
    <>
      {!open ? (
        <div className={`franchise-inquiry-rail franchise-inquiry-rail--closed ${className}`.trim()}>
          <InquiryRail open={false} onToggle={toggle} franchiseName={franchise.name} />
        </div>
      ) : null}

      {open
        ? createPortal(
            <div
              className={`franchise-inquiry-sheet${
                isCompactSheet ? ' franchise-inquiry-sheet--mobile' : ''
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="franchise-inquiry-title"
            >
              <button
                type="button"
                className="franchise-inquiry-sheet__backdrop"
                aria-label="Close franchise interest form"
                onClick={close}
              />
              <div className="franchise-inquiry-sheet__inner">
                <FranchiseInquiryModal
                  franchise={franchise}
                  franchiseStructure={franchiseStructure}
                  variant="panel"
                  onClose={close}
                  mobileWhatsAppFooter={isCompactSheet}
                />
                {!isCompactSheet ? (
                  <InquiryRail
                    open
                    onToggle={toggle}
                    franchiseName={franchise.name}
                    className="franchise-inquiry-rail--sheet-adjunct"
                  />
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
