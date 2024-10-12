/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './vueform.config.js', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  theme: {
   
    extend: {
       colors:{
      'BLUE': '#4F81C7',
      'YELLOW': '#F0D78C',
      'WHITE': '#FCFAFA',
      'BLACKTEXT': '#343434',
      'DARKYELLOW': '#96844E',
      
    }
    },
  },
  plugins: [
    require('@vueform/vueform/tailwind'),
  ],
}