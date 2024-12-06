/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gatorsBlue: "#0021A5", // Custom Gators Blue color
        gatorsOrange: "#FA4616", // Custom UF Orange color
      },
    },
  },
  plugins: [],
};
