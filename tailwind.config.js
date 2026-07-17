/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#f5e1bf',
          200: '#c49241',
          300: '#f75828',
          400: '#e01b22',
          500: '#17100a',
        },
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        instrument: ['"Instrument Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
