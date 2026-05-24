import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import BrochureDownloadModal from './BrochureDownloadModal';

export default function BrochureDownloadButton({ franchise, brochureUrl, className = '' }) {
  const [open, setOpen] = useState(false);
  const hasBrochure = Boolean(brochureUrl);

  return (
    <>
      <button
        type="button"
        disabled={!hasBrochure}
        onClick={() => hasBrochure && setOpen(true)}
        className={
          className ||
          'btn-purple-solid group inline-flex w-fit items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 lg:w-auto'
        }
        title={hasBrochure ? 'Download brand brochure' : 'Brochure not available for this listing'}
      >
        <FiDownload
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          aria-hidden
        />
        {hasBrochure ? 'Download Brochure' : 'Brochure unavailable'}
      </button>

      {open && hasBrochure ? (
        <BrochureDownloadModal
          franchise={franchise}
          brochureUrl={brochureUrl}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
