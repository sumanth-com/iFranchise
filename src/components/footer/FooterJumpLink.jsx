import { navigateTo } from '../../lib/navigation';

/** Footer nav link — letter jump on fine pointer; plain label on touch for reliable taps */
export default function FooterJumpLink({ href, onClick, children, className = '' }) {
  const text = typeof children === 'string' ? children : null;
  const path = href || '#';

  const handleActivate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(e);
      return;
    }
    if (href) navigateTo(href);
  };

  const baseClass = ['footer-jump-link', 'touch-manipulation', className].filter(Boolean).join(' ');

  if (!text) {
    return (
      <a href={path} className={baseClass} onClick={handleActivate}>
        {children}
      </a>
    );
  }

  let charIndex = 0;

  return (
    <a href={path} className={baseClass} onClick={handleActivate}>
      <span className="footer-jump-link__label">{text}</span>
      <span className="footer-jump-link__chars" aria-hidden="true">
        {text.split(' ').map((word, wordIndex, words) => (
          <span key={`${word}-${wordIndex}`} className="footer-jump-link__word">
            {word.split('').map((char) => {
              const i = charIndex;
              charIndex += 1;
              return (
                <span key={`${char}-${i}`} className="footer-jump-link__char" style={{ '--footer-char-i': i }}>
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 ? (
              <span className="footer-jump-link__char footer-jump-link__space" style={{ '--footer-char-i': charIndex++ }}>
                {'\u00A0'}
              </span>
            ) : null}
          </span>
        ))}
      </span>
    </a>
  );
}
