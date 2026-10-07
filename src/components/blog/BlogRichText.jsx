/** Render plain text with **bold** segments and [label](https://...) links. */
const INLINE_TOKEN = /(\*\*[^*]+\*\*|\[[^\]\n]+\]\(https?:\/\/[^)\s]+\))/g;

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
