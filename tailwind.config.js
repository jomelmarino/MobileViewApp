/** @type {import('tailwindcss').Config} */
export default {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          10: '#107DAC',
          20: '#ffffffff',
          30: '#005073',

        },
        secondary: {
          10: '#005073',
          20: '#000000ff',
        },
      },
    },
  },
  plugins: [],
};
