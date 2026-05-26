/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: '#1A233A',
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        textMain: '#F8FAFC',
        textMuted: '#94A3B8',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B'
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
