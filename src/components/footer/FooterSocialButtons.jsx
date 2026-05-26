import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../../constants/socialLinks';

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

const SOCIAL_BRAND_BG = {
  linkedin:
    'linear-gradient(145deg, #5eb0f4 0%, #2b8fd8 38%, #0a66c2 68%, #084d94 100%)',
  instagram:
    'linear-gradient(135deg, #f9ce34 0%, #f77737 22%, #e1306c 48%, #c13584 72%, #833ab4 100%)',
  facebook:
    'linear-gradient(145deg, #5ba3ff 0%, #3b8ef8 36%, #1877f2 68%, #125fd4 100%)',
};

const BUBBLE_SHADOW =
  '0 1px 0 rgba(255,255,255,0.42) inset, 0 -1px 0 rgba(0,0,0,0.12) inset, 0 5px 14px rgba(0,0,0,0.34)';

/** @param {{ variant?: 'footer' | 'contact', className?: string }} props */
export default function FooterSocialButtons({ variant = 'footer', className = '' }) {
  const isContact = variant === 'contact';
  const bubblePx = isContact ? 46 : 42;
  const gapPx = isContact ? 16 : 14;

  const rowClass = [
    'footer-social-3d-row',
    isContact && 'footer-social-3d-row--contact',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: gapPx,
    width: '100%',
  };

  return (
    <div className={rowClass} style={rowStyle} role="group" aria-label="Social media">
      {SOCIAL_LINKS.map((social) => {
        const Icon = SOCIAL_ICONS[social.id];
        const bubbleStyle = {
          width: bubblePx,
          height: bubblePx,
          minWidth: bubblePx,
          minHeight: bubblePx,
          borderRadius: '50%',
          background: SOCIAL_BRAND_BG[social.id],
          boxShadow: BUBBLE_SHADOW,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
          textDecoration: 'none',
          color: '#fff',
        };

        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={[
              'footer-social-3d',
              `footer-social-3d--${social.id}`,
              isContact && 'footer-social-3d--lg',
            ]
              .filter(Boolean)
              .join(' ')}
            style={bubbleStyle}
          >
            <span className="footer-social-3d__glare" aria-hidden />
            <Icon className="footer-social-3d__icon" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
