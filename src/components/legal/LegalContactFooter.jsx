import {
  SITE_CONTACT_ADDRESS_COMPACT,
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_MAILTO,
  SITE_CONTACT_MAPS_URL,
  SITE_CONTACT_PHONE_DISPLAY,
  SITE_CONTACT_PHONE_TEL,
} from '../../data/siteContact';

const ICON_EMAIL = (
  <svg className="h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ICON_PHONE = (
  <svg className="h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const ICON_LOCATION = (
  <svg className="h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CONTACT_ITEMS = [
  {
    key: 'email',
    href: SITE_CONTACT_MAILTO,
    label: SITE_CONTACT_EMAIL,
    icon: ICON_EMAIL,
    external: false,
  },
  {
    key: 'phone',
    href: `tel:${SITE_CONTACT_PHONE_TEL}`,
    label: SITE_CONTACT_PHONE_DISPLAY,
    icon: ICON_PHONE,
    external: false,
  },
  {
    key: 'address',
    href: SITE_CONTACT_MAPS_URL,
    label: SITE_CONTACT_ADDRESS_COMPACT,
    icon: ICON_LOCATION,
    external: true,
  },
];

export default function LegalContactFooter() {
  return (
    <div className="legal-contact-footer mt-14 w-full border-t border-violet-500/20 pt-10 [container-type:inline-size]">
      <p className="legal-contact-footer__title mb-4 text-sm font-semibold sm:mb-5">
        Questions about this document?
      </p>
      <ul className="legal-contact-footer__list m-0 flex list-none flex-col gap-3 p-0">
        {CONTACT_ITEMS.map((item) => (
          <li key={item.key} className="legal-contact-footer__item shrink-0">
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="legal-contact-footer__link inline-flex max-w-full items-center gap-2 text-[0.8125rem] leading-snug transition-colors hover:text-violet-600 sm:text-sm"
            >
              {item.icon}
              <span className="legal-contact-footer__text whitespace-nowrap">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
