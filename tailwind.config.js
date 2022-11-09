/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: "#F4F4F4",
          DEFAULT: "#E1E1E1",
          dark: "#707070",
          darker: "#171717",
        },
      },
    },
  },
  plugins: [],
};
