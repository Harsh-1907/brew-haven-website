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
      colors: {
        'brew-primary': '#D97706',   // warm orange
        'brew-primary-dark': '#B45309',
        'brew-neutral': '#1F2937',   // gray-900
        'brew-neutral-light': '#4B5563',
        'brew-accent': '#FBBF24',    // yellow highlight
        'brew-accent-dark': '#F59E0B',
        'brew-footer': '#111827',
        'brew-footer-text': '#9CA3AF',
      },
    },
  },
  plugins: [],
}
