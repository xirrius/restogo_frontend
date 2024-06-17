/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#767676",
        highlight: "#FF5555",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        beige: "#FFF3C6",
      },
      fontFamily: {
        jura: ["Jura", "sans-serif"],
        archivo: ["Archivo Black", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
