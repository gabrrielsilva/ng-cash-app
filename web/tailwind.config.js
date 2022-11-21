/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.tsx', './src/component/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#6bd968'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
