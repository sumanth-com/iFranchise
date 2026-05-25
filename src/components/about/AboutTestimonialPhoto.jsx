import { useState } from 'react';

/**
 * About page testimonial portrait with fallback if remote image fails.
 */
export default function AboutTestimonialPhoto({
  src,
  name,
  variant = 'card',
  className = '',
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isCard = variant === 'card';

  if (failed || !src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 font-bold text-white ${
          isCard ? 'h-14 w-14 rounded-xl text-sm ring-2 ring-white/20' : 'h-8 w-8 rounded-full border-2 border-violet-500/40 text-[10px]'
        } ${className}`.trim()}
        aria-hidden
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={isCard ? 56 : 32}
      height={isCard ? 56 : 32}
      className={`shrink-0 object-cover object-center ${
        isCard
          ? 'h-14 w-14 rounded-xl ring-2 ring-white/20'
          : 'h-8 w-8 rounded-full border-2 border-violet-500/40'
      } ${className}`.trim()}
      loading={isCard ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
