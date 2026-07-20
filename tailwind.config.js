/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'rgb(var(--c-bg) / <alpha-value>)',
          surface: 'rgb(var(--c-surface) / <alpha-value>)',
          border: 'rgb(var(--c-border) / <alpha-value>)',
          text: 'rgb(var(--c-text) / <alpha-value>)',
          muted: 'rgb(var(--c-muted) / <alpha-value>)',
          primary: 'rgb(var(--c-primary) / <alpha-value>)',
          'primary-soft': 'rgb(var(--c-primary-soft) / <alpha-value>)',
          accent: 'rgb(var(--c-accent) / <alpha-value>)',
        },
      },
      keyframes: {
        'shatter-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.2) rotate(-8deg)',
            filter: 'blur(20px)',
            clipPath: 'polygon(0 0, 20% 0, 20% 25%, 0 25%, 0 60%, 30% 60%, 30% 100%, 0 100%, 0 0, 50% 0, 50% 40%, 100% 40%, 100% 0, 100% 100%, 70% 100%, 70% 70%, 100% 70%, 100% 100%)',
          },
          '40%': {
            opacity: '1',
            transform: 'scale(1.05) rotate(2deg)',
            filter: 'blur(0px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
          '70%': {
            transform: 'scale(0.98) rotate(-1deg)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
            filter: 'blur(0px)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
        },
        'crack-out': {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '30%': { transform: 'scale(1.15) skewX(-4deg)', filter: 'brightness(1.4)' },
          '60%': {
            transform: 'scale(0.6) skewX(8deg)',
            filter: 'brightness(2) blur(2px)',
            opacity: '0.4',
          },
          '100%': { transform: 'scale(0)', filter: 'blur(8px)', opacity: '0' },
        },
        'shard-fly': {
          '0%': { opacity: '0.9', transform: 'translate(0,0) scale(1) rotate(0deg)' },
          '100%': {
            opacity: '0',
            transform: 'translate(var(--tx), var(--ty)) scale(0.3) rotate(var(--tr))',
          },
        },
        'float-up': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'shatter-in': 'shatter-in 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'crack-out': 'crack-out 0.45s ease-in forwards',
        'shard-fly': 'shard-fly 0.7s ease-out forwards',
        'float-up': 'float-up 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};
