const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        primary: '#30A8E6',
        primaryDark: '#2395ce',
        primaryDarker: '#1d8ec6',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          ...colors.gray,
          '950': '#0f131c',
          '1000': '#0c0f16'
        }
      },
      container: {
        padding: {
          default: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      fontFamily: {
        'title': ['Quicksand'],
        'body': ['Inter']
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'primary': '0 10px 15px -3px rgba(48, 168, 230, .3)'
      },
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' }
      }
    },
  },
  variants: {},
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
  ],
}
