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
        cA: '#132228',
        cB: '#ff7a14',
        cC: 'white',
        cD: '#fcba03',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
