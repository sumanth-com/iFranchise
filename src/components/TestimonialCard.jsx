function TestimonialCard({ quote, author, className = '' }) {
  return (
    <article
      className={`w-52 rounded-2xl border border-white/70 bg-white/70 p-5 text-left text-sm text-white shadow-soft backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:opacity-95 hover:shadow-[0_14px_28px_rgba(15,23,42,0.18)] ${className}`}
    >
      <p className="mb-4 leading-relaxed">"{quote}"</p>
      <p className="text-xs font-medium text-white">- {author}</p>
    </article>
  );
}

export default TestimonialCard;
