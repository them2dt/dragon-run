const { fontFamily } = require('tailwindcss/defaultTheme');
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
      colors: {
        cA: '#ff6000',
        cB: '#ff3c00',
        cC: 'white',
        cD: '#ffa600',
        bg1: '#78777f',
        bg2: '#212121',
      },
    },
  },
  variants: {
    imageRendering: ['responsive'],
  },
  plugins: [require('tw-elements/dist/plugin'), require('tailwindcss-image-rendering')],
};
