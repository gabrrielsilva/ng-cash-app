/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.tsx', './src/component/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: '#1f2028',
        primary: '#6bd968'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
