/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      screens: {
        xl: '1800px',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
