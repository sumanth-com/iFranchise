import { navigateTo } from '@/lib/navigation';

/** Render plain text with **bold** segments, [label](https://...) and [label](/internal-path) links. */
const INLINE_TOKEN = /(\*\*[^*]+\*\*|\[[^\]\n]+\]\((?:https?:\/\/|\/)[^)\s]*\))/g;

export default function BlogRichText({ text, className = '' }) {
  if (!text) return null;
  const parts = text.split(INLINE_TOKEN);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-inherit">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const internal = part.match(/^\[([^\]\n]+)\]\((\/[^)\s]*)\)$/);
        if (internal) {
          return (
            <a
              key={i}
              href={internal[2]}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(internal[2]);
              }}
              className="internal-content-link internal-content-link--inline"
            >
              {internal[1]}
            </a>
          );
        }

        const link = part.match(/^\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)$/);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="internal-content-link internal-content-link--inline"
            >
              {link[1]}
            </a>
          );
        }

        return part;
      })}
    </span>
  );
}
