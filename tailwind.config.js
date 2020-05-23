module.exports = {
  purge: false,
  theme: {
    extend: {
      colors: {
        primary: '#30A8E6',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
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
      }
    },
  },
  variants: {},
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
  ],
}
