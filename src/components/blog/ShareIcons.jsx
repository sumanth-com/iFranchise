import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const iconMap = {
  facebook: { label: 'Facebook', Icon: FaFacebookF, colorLight: 'hover:text-blue-600', colorDark: 'hover:text-sky-300' },
  instagram: { label: 'Instagram', Icon: FaInstagram, colorLight: 'hover:text-pink-600', colorDark: 'hover:text-pink-300' },
  linkedin: { label: 'LinkedIn', Icon: FaLinkedinIn, colorLight: 'hover:text-sky-700', colorDark: 'hover:text-sky-300' },
};

function encode(value) {
  return encodeURIComponent(value ?? '');
}

function buildShareUrl(platform, url, title) {
  const encodedUrl = encode(url);
  const encodedTitle = encode(title);
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'instagram':
      return `https://www.instagram.com/`;
    default:
      return encodedUrl;
  }
}

/** @param {{ url: string, title?: string, variant?: 'light' | 'dark', className?: string }} props */
function ShareIcons({ url, title, variant = 'light', className = '' }) {
  const isDark = variant === 'dark';

  const baseBtn = isDark
    ? 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-violet-400/40 bg-white/10 text-white transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-violet-300 hover:bg-white/20'
    : 'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-white transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-slate-300';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {Object.entries(iconMap).map(([key, value]) => (
        <a
          key={key}
          href={buildShareUrl(key, url, title)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${value.label}`}
          className={`${baseBtn} ${isDark ? value.colorDark : value.colorLight}`}
        >
          <value.Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export default ShareIcons;
