/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "grayLight":"#EAEAEA",
        "grayDark":"#E7E7E7"
      }
    },
  },
  plugins: [],
}

