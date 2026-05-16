/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
          background: 'linear-gradient(145deg, #12082a 0%, #0e0620 50%, #0a0618 100%)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(139,92,246,0.18)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          color: '#ffffff',
        },
        '.card-premium-dark-inner': {
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(139,92,246,0.22)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#ffffff',
        },
      });
    },
  ],
}

