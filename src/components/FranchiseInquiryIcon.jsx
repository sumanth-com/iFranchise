import { useEffect, useState } from 'react';
import './franchise-inquiry-icon.css';

/** Friendly face with periodic blink — for left franchise-interest rail. */
export default function FranchiseInquiryIcon({ size = 52, animate = true, className = '' }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!animate) return undefined;
    let blinkTimer;
    let closeTimer;
    let cancelled = false;

    const scheduleBlink = () => {
      const delay = 2200 + Math.random() * 2800;
      blinkTimer = window.setTimeout(() => {
        if (cancelled) return;
        setBlink(true);
        closeTimer = window.setTimeout(() => {
          if (!cancelled) setBlink(false);
          scheduleBlink();
        }, 260);
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
        'franchise-inquiry-icon',
        animate ? 'franchise-inquiry-icon--alive' : '',
        blink ? 'franchise-inquiry-icon--blink' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: Math.round(size * 1.12) }}
      aria-hidden
    >
      {animate ? (
        <>
          <span className="franchise-inquiry-icon__spark franchise-inquiry-icon__spark--a" />
          <span className="franchise-inquiry-icon__spark franchise-inquiry-icon__spark--b" />
        </>
      ) : null}
      <span className="franchise-inquiry-icon__core">
        <span className="franchise-inquiry-icon__face">
          <span className="franchise-inquiry-icon__eyes">
            <span className="franchise-inquiry-icon__eye franchise-inquiry-icon__eye--l" />
            <span className="franchise-inquiry-icon__eye franchise-inquiry-icon__eye--r" />
          </span>
          <span className="franchise-inquiry-icon__smile" />
        </span>
      </span>
    </span>
  );
}
