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
      }
    },
  },
  variants: {},
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
  ],
}
