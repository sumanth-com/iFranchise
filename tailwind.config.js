/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
      },
      scale: {
        '98': '0.98',
      },
      animation: {
        'marquee-right': 'marquee-right 40s linear infinite',
        'marquee-left': 'marquee-left 40s linear infinite',
        'scroll-up': 'scroll-up 20s linear infinite',
        'scroll-down': 'scroll-down 20s linear infinite',
        'dot-pulse': 'dot-pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'marquee-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scroll-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'scroll-down': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
      addComponents({
        /* Homepage dark grid cards — reuse site-wide */
        '.card-premium-dark': {
          background: 'var(--theme-card-gradient)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--theme-border)',
          boxShadow: 'var(--theme-shadow-md)',
          color: 'var(--theme-text-primary)',
        },
        '.card-premium-dark-inner': {
          background: 'var(--theme-bg-surface)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--theme-border-strong)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: 'var(--theme-text-primary)',
        },
      });
    },
  ],
}

