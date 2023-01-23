/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dangerCustom: "#E94A47",
        greenCustom: "#00AE69",
        blueCustom: "#3366FC",
      },
      colors: {
        dangerCustom: "#E94A47",
        greenCustom: "#00AE69",
        blueCustom: "#3366FC",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
