import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import BrochureDownloadModal from './BrochureDownloadModal';

export default function BrochureDownloadButton({ franchise, brochureUrl, className = '' }) {
  const [open, setOpen] = useState(false);
  const hasBrochure = Boolean(brochureUrl);

  if (!hasBrochure) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          'btn-purple-solid group inline-flex w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm lg:w-auto'
        }
        title="Download brand brochure"
      >
        <FiDownload
          className="hidden h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5 sm:block"
          aria-hidden
        />
        <span className="shrink-0 whitespace-nowrap leading-none tracking-tight">Download Brochure</span>
      </button>

      {open ? (
        <BrochureDownloadModal
          franchise={franchise}
          brochureUrl={brochureUrl}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
