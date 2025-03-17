/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'secondary': '#ec4899',
        'dark': '#111827',
        'dark-700': '#374151',
        'dark-800': '#1f2937',
        'light': '#f9fafb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
