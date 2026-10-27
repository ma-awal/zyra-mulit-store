/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Richer gold than the mockup yellow: better contrast, still warm and bright.
        gold: {
          DEFAULT: '#F2B01E',
          light: '#FFD35C',
          dark: '#C98A0B',
          deep: '#8A5A00',
          soft: '#FFF0C2',
        },
        cream: {
          DEFAULT: '#FFF8E8',
          50: '#FFFCF5',
          100: '#FFF5DF',
          200: '#F7E8C6',
          300: '#EAD6A6',
        },
        // Warm espresso instead of pure black: softer and more premium.
        espresso: {
          DEFAULT: '#1D1710',
          700: '#3A2F22',
          500: '#6B5D48',
          400: '#8A7B63',
        },
        night: '#111619',
        olive: '#4E6B3A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -14px rgba(138, 90, 0, 0.20)',
        lift: '0 26px 60px -22px rgba(138, 90, 0, 0.35)',
        glow: '0 10px 28px -8px rgba(242, 176, 30, 0.65)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        heroImg: {
          '0%': { opacity: '0', transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pageIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.5)' },
          '60%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, 18px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sheetIn: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        draw: {
          '0%': { strokeDashoffset: '60' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'hero-img': 'heroImg 1.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'page-in': 'pageIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 9s ease-in-out infinite',
        pop: 'pop 0.4s ease-out',
        'toast-in': 'toastIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.3s ease-out both',
        'sheet-in': 'sheetIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
        draw: 'draw 0.8s ease-out 0.2s both',
      },
    },
  },
  plugins: [],
};
