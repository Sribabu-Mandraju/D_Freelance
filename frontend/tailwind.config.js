/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // optional if you use JS/TS
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // example custom color
        secondary: '#F43F5E',
        'neon-bg': '#000814',
        'neon-primary': '#00B4D8',
        'neon-secondary': '#8338EC',
        'neon-accent': '#FFD166',
        'dark-bg': '#030712',
        'dark-card': '#111827',
        'gray-border': '#374151',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
