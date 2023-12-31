/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffff',
        secondary: '#C44C48',
        bgPrimary: '#DB524C',
        bgSecondary: '#DF6560'
      }
    },
  },
  plugins: [],
}