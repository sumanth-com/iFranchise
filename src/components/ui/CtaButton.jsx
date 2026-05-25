import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

const SIZE_CLASSES = {
  sm: 'site-cta--sm',
  md: 'site-cta--md',
  lg: 'site-cta--lg',
};

/**
 * Primary site CTA - violet pill, white label, arrow in frosted circle.
 * Excluded zones: home hero (.cinematic-hero), navbar (header), footer.
 */
export default function CtaButton({
  children,
  onClick,
  href,
  type = 'button',
  className = '',
  size = 'md',
  showArrow = true,
  arrowDirection = 'right',
  disabled = false,
  ...rest
}) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const classes = ['site-cta', 'group', sizeClass, className].filter(Boolean).join(' ');
  const ArrowIcon = arrowDirection === 'down' ? FiArrowDown : FiArrowRight;
  const iconClass =
    arrowDirection === 'down'
      ? 'site-cta__icon site-cta__icon--down relative z-[1]'
      : 'site-cta__icon relative z-[1]';

  const content = (
    <>
      <span className="site-cta__label relative z-[1]">{children}</span>
      {showArrow && (
        <span className={iconClass} aria-hidden>
          <ArrowIcon />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  );
}
