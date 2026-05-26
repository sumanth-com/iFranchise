import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../../constants/socialLinks';

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

/** @param {{ variant?: 'footer' | 'contact', className?: string }} props */
export default function FooterSocialButtons({ variant = 'footer', className = '' }) {
  const isContact = variant === 'contact';
  const rowClass = [
    'footer-social-3d-row',
    isContact && 'footer-social-3d-row--contact',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rowClass} role="list">
      {SOCIAL_LINKS.map((social, index) => {
        const Icon = SOCIAL_ICONS[social.id];
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            role="listitem"
            className={`footer-social-3d footer-social-3d--${social.id}${isContact ? ' footer-social-3d--lg' : ''}`}
            style={{ '--social-i': index }}
          >
            <span className="footer-social-3d__glare" aria-hidden />
            <Icon className="footer-social-3d__icon" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
