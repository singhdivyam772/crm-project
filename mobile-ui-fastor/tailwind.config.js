/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF5A00",
          light: "#FFE9DC",
          soft: "#FF8A5B",
        },
      },
      fontFamily: {
        sans: ["Mulish", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
