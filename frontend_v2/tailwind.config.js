import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
      },
      maxWidth: {
        'prose': '65ch',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        background: 'var(--background-color)',
        text: 'var(--text-color)',
      },
      textColor: {
        primary: 'var(--text-primary-color)',
        secondary: 'var(--text-secondary-color)',
      },
      borderColor: {
        primary: 'var(--border-primary-color)',
        secondary: 'var(--border-secondary-color)',
      },
      ringColor: {
        primary: 'var(--ring-primary-color)',
      },
    },
  },
  plugins: [
    typography,
    ({ addBase }) => {
      addBase({
        ':root': {
          '--primary-color-opacity': '1',
          '--secondary-color-opacity': '1',
          '--accent-color-opacity': '1',
          '--background-color-opacity': '1',
          '--text-color-opacity': '1',
          '--text-primary-color-opacity': '1',
          '--text-secondary-color-opacity': '1',
          '--border-primary-color-opacity': '1',
          '--border-secondary-color-opacity': '1',
          '--ring-primary-color-opacity': '1',
        }
      })
    }
  ],
}
