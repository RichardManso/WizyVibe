/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#151518", // Dark surface for Navbar & Cards
        accent: "#6366F1", // Indigo base for accents
        background: "#F8F9FA", // Light background
        dark: "#111827", // Dark text on light backgrounds
        surface: "#1C1C21", // Slightly lighter dark for inner cards
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
