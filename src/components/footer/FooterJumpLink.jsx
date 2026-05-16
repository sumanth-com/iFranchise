/** Footer nav link with per-letter jump on hover — stays white, no dimming */
export default function FooterJumpLink({ href, onClick, children, className = '' }) {
  const text = typeof children === 'string' ? children : null;

  if (!text) {
    return (
      <a href={href} onClick={onClick} className={`footer-jump-link ${className}`.trim()}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} onClick={onClick} className={`footer-jump-link ${className}`.trim()} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={`${char}-${i}`} style={{ '--footer-char-i': i }} aria-hidden>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </a>
  );
}
