/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          100: 'var(--base-100)',
          200: 'var(--base-200)',
          300: 'var(--base-300)',
          400: 'var(--base-400)',
          500: 'var(--base-500)',
        },
      },
      fontFamily: {
        barlow: ['PestoFresco Regular', 'sans-serif'],
        instrument: ['"Inter Tight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
