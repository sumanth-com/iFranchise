/**
 * Site-wide contact details — single source of truth.
 * Update here when phone, email, or office address changes.
 */

export const SITE_CONTACT_EMAIL = 'contact@ifranchise.in';

/** 10-digit Indian mobile (no country code) */
export const SITE_CONTACT_PHONE = '9129130303';

export const SITE_CONTACT_ADDRESS =
  'Innov8 Coworking Space Mantri Bellandur Outer Ring Road';

/** Shorter single-line label for compact legal / footer rows */
export const SITE_CONTACT_ADDRESS_COMPACT =
  'Innov8, Mantri Bellandur ORR';

export const SITE_CONTACT_PHONE_TEL = `+91${SITE_CONTACT_PHONE}`;

export const SITE_CONTACT_PHONE_DISPLAY = `+91 ${SITE_CONTACT_PHONE.slice(0, 5)} ${SITE_CONTACT_PHONE.slice(5)}`;

export const SITE_CONTACT_MAILTO = `mailto:${SITE_CONTACT_EMAIL}`;

export const SITE_CONTACT_MAPS_QUERY = `${SITE_CONTACT_ADDRESS}, Bengaluru, Karnataka, India`;

export const SITE_CONTACT_MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(SITE_CONTACT_MAPS_QUERY)}`;

export const SITE_CONTACT_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONTACT_MAPS_QUERY)}&hl=en&z=16&output=embed`;

/** Homepage / contact section rows */
export const SITE_CONTACT_ITEMS = [
  { title: 'Email us', value: SITE_CONTACT_EMAIL, href: SITE_CONTACT_MAILTO, icon: 'email' },
  {
    title: 'Call us',
    value: SITE_CONTACT_PHONE_DISPLAY,
    href: `tel:${SITE_CONTACT_PHONE_TEL}`,
    icon: 'phone',
  },
  {
    title: 'Our location',
    value: SITE_CONTACT_ADDRESS,
    href: SITE_CONTACT_MAPS_URL,
    external: true,
    icon: 'location',
  },
];
