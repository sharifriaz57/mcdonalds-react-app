/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightYellow: '#ffbc0d',
        darkTeal: '#006778',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
