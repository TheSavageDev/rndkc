/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "350",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
    extend: {
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.8)",
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.8)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.8)",
      },
      fontFamily: {
        akshar: ["Akshar", "sans-serif"],
        khand: ["Khand", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        gemunuLibre: ["Gemunu Libre", "sans-serif"],
      },
      colors: {
        primary: "rgb(78,127,118)",
        primaryLight: "#50c2ae",
        tertiary: "#657170",
        gradientDark: "rgba(217,217,217,0)",
        blackTransparent: "rgba(0, 0, 0, 0.5)",
        blackSemiTransparent: "rgba(0, 0, 0, 0.8)",
        primaryDark: "rgb(45,67,68)",
        secondary: "#282828",
        accent: "#FF9D0B",
        text: "#A5A5A5",
        textDark: "#555555",
        light: "#fefefe",
        background: "rgb(103, 113, 112)",
        lightBg: "#e5e5e5",
      },
      backgroundImage: {
        car: "url('../public/img/car.jpg')",
        stang: "url('../public/img/stang.png')",
        "stang-skinny": "url('../public/img/stang-skinny.png')",
        camaroText: "url('../public/img/67Txt.svg')",
        contactBg: "url('../public/img/ContactBkgd.png')",
      },
    },
  },

  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
