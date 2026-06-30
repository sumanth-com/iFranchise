import { FaWhatsapp } from 'react-icons/fa6';
import { buildFranchiseWhatsAppUrl } from '@/data/siteContact';

export default function FranchiseWhatsAppFab({ franchiseName }) {
  const brand = String(franchiseName || '').trim();
  if (!brand) return null;

  return (
    <div className="franchise-whatsapp-fab-wrap">
      <span className="franchise-whatsapp-fab__pulse" aria-hidden="true" />
      <span className="franchise-whatsapp-fab__pulse franchise-whatsapp-fab__pulse--delayed" aria-hidden="true" />
      <a
        href={buildFranchiseWhatsAppUrl(brand)}
        target="_blank"
        rel="noopener noreferrer"
        className="franchise-whatsapp-fab"
        aria-label={`Chat on WhatsApp about ${brand}`}
      >
        <FaWhatsapp className="franchise-whatsapp-fab__icon" aria-hidden />
      </a>
    </div>
  );
}
