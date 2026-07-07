/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        panel: "#111111",
        gold: {
          DEFAULT: "#c9a24b",
          light: "#e8cf8a",
          dark: "#a9822f",
        },
        cream: "#f5efe0",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        script: ["'Tangerine'", "'Great Vibes'", "cursive"],
        body: ["'Poppins'", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};
