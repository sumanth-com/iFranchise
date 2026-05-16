import CtaButton from './ui/CtaButton';

function Button({ children, variant = 'primary', icon = false, className = '', onClick, ...rest }) {
  if (variant === 'primary') {
    return (
      <CtaButton onClick={onClick} className={className} showArrow={icon} {...rest}>
        {children}
      </CtaButton>
    );
  }

  const baseClasses =
    'inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition duration-300 hover:scale-[1.03] active:scale-[0.97]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} border border-slate-200 bg-white text-[#0b0f19] shadow-soft hover:bg-slate-100 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
