/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        Gabarito:["Gabarito","serif"]},
      
        animation: {
          fadeIn: "fadeIn 2s ease-out forwards",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          // blinkCaret: {
          //   "50%": { borderColor: "transparent" },
          // }
        },
    },
  },
  plugins: [],
}

