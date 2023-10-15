/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      nunito: ["Nunito Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "d-bg": "#202c37",
        "d-ele": "#2b3945",
        "d-text": "#ffffff",
        "l-bg": "#fafafa",
        "l-ele": "#ffffff",
        "l-text": "#111517",
        "l-inp": "#858585",
      },
    },
  },
  plugins: [],
};
