/** Footer nav link with per-letter jump on hover - stays white, no dimming */
export default function FooterJumpLink({ href, onClick, children, className = '' }) {
  const text = typeof children === 'string' ? children : null;

  if (!text) {
    return (
      <a href={href} onClick={onClick} className={`footer-jump-link ${className}`.trim()}>
        {children}
      </a>
    );
  }

  let charIndex = 0;

  return (
    <a href={href} onClick={onClick} className={`footer-jump-link ${className}`.trim()} aria-label={text}>
      {text.split(' ').map((word, wordIndex, words) => (
        <span key={`${word}-${wordIndex}`} className="footer-jump-link__word" aria-hidden>
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
    </a>
  );
}
