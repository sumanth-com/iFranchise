import FooterSocialButtons from './FooterSocialButtons';

/**
 * Shared “Follow Us” + brand social row (footer + contact).
 * @param {{ variant?: 'footer' | 'contact', className?: string, headingClassName?: string }} props
 */
export default function SocialFollowBlock({
  variant = 'footer',
  className = '',
  headingClassName = '',
}) {
  const headingClass = ['footer-follow-heading', headingClassName].filter(Boolean).join(' ');

  return (
    <div className={['footer-follow-block', className].filter(Boolean).join(' ')}>
      <p className={headingClass}>Follow Us</p>
      <FooterSocialButtons variant={variant} />
    </div>
  );
}
