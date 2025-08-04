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
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
