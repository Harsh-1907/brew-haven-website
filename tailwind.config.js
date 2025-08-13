/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'the-coastal-free': ['the-coastal-free', 'sans-serif'],
      },
    },
  },
  plugins: [],
}