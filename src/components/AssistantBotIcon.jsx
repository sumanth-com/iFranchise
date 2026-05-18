import { useEffect, useState } from 'react';
import './assistant-bot-icon.css';

/**
 * Premium SaaS chatbot glyph — pure CSS/SVG, no image assets.
 * `open` = panel open (FAB two-way state). Blink + glow when `animate`.
 */
export default function AssistantBotIcon({
  size = 48,
  variant = 'light',
  className = '',
  animate = true,
  open = false,
}) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!animate) return undefined;
    let blinkTimer;
    let closeTimer;
    let cancelled = false;

    const scheduleBlink = () => {
      const delay = 2400 + Math.random() * 3000;
      blinkTimer = window.setTimeout(() => {
        if (cancelled) return;
        setBlink(true);
        closeTimer = window.setTimeout(() => {
          if (!cancelled) setBlink(false);
          scheduleBlink();
        }, 280);
      }, delay);
    };

    scheduleBlink();
    return () => {
      cancelled = true;
      window.clearTimeout(blinkTimer);
      window.clearTimeout(closeTimer);
    };
  }, [animate]);

  return (
    <span
      className={[
        'assistant-bot-icon',
        `assistant-bot-icon--${variant}`,
        animate ? 'assistant-bot-icon--alive' : '',
        open ? 'assistant-bot-icon--open' : '',
        blink ? 'assistant-bot-icon--blink' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="assistant-bot-icon__frame">
        <span className="assistant-bot-icon__bg" aria-hidden />
        <span className="assistant-bot-icon__robot">
          <span className="assistant-bot-icon__band" aria-hidden />
          <span className="assistant-bot-icon__ear assistant-bot-icon__ear--l" aria-hidden />
          <span className="assistant-bot-icon__ear assistant-bot-icon__ear--r" aria-hidden />
          <span className="assistant-bot-icon__head">
            <span className="assistant-bot-icon__visor">
              <span className="assistant-bot-icon__eye assistant-bot-icon__eye--l" />
              <span className="assistant-bot-icon__eye assistant-bot-icon__eye--r" />
            </span>
            <svg className="assistant-bot-icon__smile" viewBox="0 0 24 8" fill="none" aria-hidden>
              <path
                d="M3 2.5C7 6.5 17 6.5 21 2.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="assistant-bot-icon__mic" aria-hidden>
            <span className="assistant-bot-icon__mic-arm" />
            <span className="assistant-bot-icon__mic-tip" />
          </span>
        </span>
        <span className="assistant-bot-icon__sheen" aria-hidden />
        <span className="assistant-bot-icon__ring" aria-hidden />
        <span className="assistant-bot-icon__pulse" aria-hidden />
      </span>
    </span>
  );
}
