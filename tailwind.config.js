/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        elza: ['elza-light', 'sans'],
        elza_medium: ['elza-medium', 'sans'],
        elza_bold: ['elza-bold', 'sans']
      }
    },
  },
  plugins: [],
}

