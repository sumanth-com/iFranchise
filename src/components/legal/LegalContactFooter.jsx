import {
  SITE_CONTACT_ADDRESS,
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_MAILTO,
  SITE_CONTACT_MAPS_URL,
  SITE_CONTACT_PHONE_DISPLAY,
  SITE_CONTACT_PHONE_TEL,
} from '../../data/siteContact';

export default function LegalContactFooter() {
  return (
    <div className="mt-14 border-t border-violet-500/20 pt-10">
      <p className="mb-5 text-sm font-semibold text-white">Questions about this document?</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <a
          href={SITE_CONTACT_MAILTO}
          className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-white"
        >
          <svg className="h-4 w-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {SITE_CONTACT_EMAIL}
        </a>
        <a
          href={`tel:${SITE_CONTACT_PHONE_TEL}`}
          className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-white"
        >
          <svg className="h-4 w-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {SITE_CONTACT_PHONE_DISPLAY}
        </a>
        <a
          href={SITE_CONTACT_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-start gap-2 text-sm text-white transition-colors hover:text-white"
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{SITE_CONTACT_ADDRESS}</span>
        </a>
      </div>
    </div>
  );
}
