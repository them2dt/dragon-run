const { fontFamily } = require('tailwindcss/defaultTheme');
const theme = require('./src/consts/theme/theme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Silkscreen', ...fontFamily.sans],
      },
      screens: {
        xs: '375px',
      },
      colors: theme.colors,
    },
  },
  variants: {
    imageRendering: ['responsive'],
  },
  plugins: [require('tw-elements/dist/plugin'), require('tailwindcss-image-rendering')],
};
