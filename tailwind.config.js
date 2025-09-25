/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#4CAF50',
          orange: '#FF6F3B',
          blue: '#2196F3',
          
        },
        bgcolor: '#F9F4E2',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'rubik': ['Rubik', 'system-ui', 'sans-serif'],
        'rubik-bold': ['Rubik-Bold', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 