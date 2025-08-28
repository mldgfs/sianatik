/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#60a5fa',
        dark: '#1e293b',
        light: '#f1f5f9',
      },
      fontFamily: {
        arabic: [
          'Tahoma', 'Arial', 'Helvetica', 'sans-serif'
        ],
        arabicLight: [
          'Tahoma', 'Arial', 'Helvetica', 'sans-serif'
        ],
        arabicBold: [
          'Tahoma', 'Arial', 'Helvetica', 'sans-serif'
        ],
      },
      direction: {
        rtl: 'rtl',
        ltr: 'ltr',
      },
      textDirection: {
        rtl: 'rtl',
        ltr: 'ltr',
      },
    },
  },
  plugins: [],
}