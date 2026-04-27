/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards',
        'scale-up': 'scaleUp 0.4s ease-out forwards',
        'scroll-highlight': 'highlight 0.3s ease-out',
        'marquee': 'marquee 20s linear infinite',
        'marquee-reverse': 'marqueeReverse 20s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(30px)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        highlight: {
          '0%': { opacity: '0.2', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        'geist': ['Geist', 'system-ui', 'sans-serif'],
      },
      backgroundSize: {
        '300%': '300%',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.2, 0.9, 0.4, 1.1)',
      },
    },
  },
  plugins: [],
}