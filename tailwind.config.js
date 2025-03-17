/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0066cc',
        'secondary': '#ac39ff',
        'dark': '#000000',
        'dark-700': '#1d1d1f',
        'dark-800': '#121214',
        'light': '#fbfbfd',
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
