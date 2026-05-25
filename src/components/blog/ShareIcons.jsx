import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

const PLATFORMS = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    Icon: FaWhatsapp,
    iconClass: 'h-3.5 w-3.5',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    Icon: FaFacebookF,
    iconClass: 'h-3.5 w-3.5',
  },
  {
    key: 'x',
    label: 'X',
    Icon: FaXTwitter,
    iconClass: 'h-3 w-3',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    Icon: FaInstagram,
    iconClass: 'h-3.5 w-3.5',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
    iconClass: 'h-3.5 w-3.5',
  },
];

function encode(value) {
  return encodeURIComponent(value ?? '');
}

function buildShareUrl(platform, url, title) {
  const encodedUrl = encode(url);
  const encodedTitle = encode(title);
  const text = title ? `${title} ${url}` : url;

  switch (platform) {
    case 'whatsapp':
      return `https://wa.me/?text=${encode(text)}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'x':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'instagram':
      return 'https://www.instagram.com/';
    default:
      return encodedUrl;
  }
}

/** @param {{ url: string, title?: string, variant?: 'light' | 'dark' | 'brand', className?: string }} props */
function ShareIcons({ url, title, variant = 'brand', className = '' }) {
  const isBrand = variant === 'brand' || variant === 'light';
  const isDark = variant === 'dark';

  if (isBrand) {
    return (
      <div className={`blog-share-3d-row flex items-center ${className}`}>
        {PLATFORMS.map((platform, index) => (
          <a
            key={platform.key}
            href={buildShareUrl(platform.key, url, title)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share on ${platform.label}`}
            data-share={platform.key}
            className={`blog-share-3d blog-share-3d--${platform.key}`}
            style={{ '--share-i': index }}
          >
            <span className="blog-share-3d__glare" aria-hidden />
            <platform.Icon className={`blog-share-3d__icon ${platform.iconClass}`} aria-hidden />
          </a>
        ))}
      </div>
    );
  }

  const baseBtn = isDark
    ? 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-violet-400/40 bg-white/10 text-white transition duration-200 hover:-translate-y-0.5 hover:scale-105'
    : 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:scale-105';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {PLATFORMS.map((platform) => (
        <a
          key={platform.key}
          href={buildShareUrl(platform.key, url, title)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${platform.label}`}
          className={`${baseBtn} text-slate-600`}
        >
          <platform.Icon className="h-4 w-4" aria-hidden />
        </a>
      ))}
    </div>
  );
}

export default ShareIcons;
