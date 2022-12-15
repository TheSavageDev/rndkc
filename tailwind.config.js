/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        akshar: ["Akshar", "sans-serif"],
      },
      colors: {
        primary: "rgb(78,127,118)",
        primaryLight: "#50c2ae",
        tertiary: "#657170",
        gradientDark: "rgba(217,217,217,0)",
        primaryDark: "rgb(45,67,68)",
        secondary: "#282828",
        accent: "#FF9D0B",
        text: "#A5A5A5",
      },
      backgroundImage: {
        car: "url('../public/img/car.jpg')",
        stang: "url('../public/img/stang.png')",
        "stang-skinny": "url('../public/img/stang-skinny.png')",
      },
    },
  },

  plugins: [],
};
