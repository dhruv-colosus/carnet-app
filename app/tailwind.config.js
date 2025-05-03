/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["app/index.js",  "./app/**/*.{js,jsx,ts,tsx}",   "./components/**/*.{js,jsx,ts,tsx}"],

  presets: [require('nativewind/preset')],
  theme: {
   extend: {
      fontFamily: {
        'gilroy-bold': 'Gilroy-Bold',
        'gilroy-semibold': 'Gilroy-SemiBold',
        'gilroy-medium': 'Gilroy-Medium',
        'gilroy-regular': 'Gilroy-Regular',
        'gilroy-light': 'Gilroy-Light',
      },
    },
  },
  plugins: [],
};
