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
      },
      animation: {
        'mouse-anim': 'scroll 2500ms cubic-bezier(0.075, 0.82, 0.165, 1) infinite alternate backwards',
        'mouse-anim1': 'scroll 2500ms cubic-bezier(0.075, 0.82, 0.165, 1) 100ms infinite alternate backwards',
        'mouse-anim2': 'scroll 2500ms cubic-bezier(0.075, 0.82, 0.165, 1) 200ms infinite alternate backwards',
        'mouse-anim3': 'scroll 2500ms cubic-bezier(0.075, 0.82, 0.165, 1) 300ms infinite alternate backwards',
        'mouse-anim4': 'scroll 2500ms cubic-bezier(0.075, 0.82, 0.165, 1) 400ms infinite alternate backwards',
        'mouse-anim5': 'scroll 2500ms cubic-bezier(0.075, 0.82, 0.165, 1) 500ms infinite alternate backwards',
      },
      keyframes: {
        scroll: {
          '0%': { bottom: '60px' },
          '100%': { bottom: '100px' },
        }
      }
    },
  },
  plugins: [],
}

