/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          DEFAULT: '#10B981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        lightGray: '#F3F4F6',
        darkGray: '#1F2937',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(79, 70, 229, 0.1)',
        'glow': '0 0 20px 0 rgba(79, 70, 229, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      ringColor: {
        primary: '#4F46E5', // Extender ringColor para usar primary
      },
    },
  },
  plugins: [],
};
