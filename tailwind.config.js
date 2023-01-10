/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        mediumBlue: "#B0C1CD",
        twitterBlue: "#1DA1F2",
        texasOrange: "#bf5700",
        darkBlue: "#30404F",
        red: "#FE1B1B",
        grey: "#919191",
      },
      fontFamily: {
        Oswald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
