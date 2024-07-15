/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'show': 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
      },
      boxShadow: {
        '3xl': '0px 0px 12px 4px #0000001A'
      },
      screens:{
        sm: '576px',
        md: '768px',
        lg: '1024px'
      },
      colors: {
        mBlack: '#110E0E',
        mDarkBlue: '#262F40',
        mDarkGrey: '#4E4E4E',
        mGrey: '#808080',
        mLigthGrey: '#C1C1C1',
        mWhite: '#FCFCFC',
        mLime: '#2FDA7A',
        mLigthLime: '#D1FAEB',
        gFromColor: '#fcfcfc',
        gMidleColor: '#f8f8f8',
        gToColor: '#f0f0f0',
        test: 'linear-gradient(90deg, rgba(97,225,153,0.05926120448179273) 0%, rgba(255,255,255,0.9108018207282913) 49%, rgba(255,255,255,1) 89%)',
        gButtonFrom: '#7DEBB8',
        gButtonTo: '#61E199',

        'scrollbar-thumb': '#808080',
        'scrollbar-thumb-hover': '#808080',
        'scrollbar-track': '#808080'
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'secondary': ['Outfit', 'sans-serif'],
        'firsty': ['Montserrat', 'sans-serif'],
        'oxanium': ['Oxanium', 'sans-serif']
      },
      width: {
        464: '464px',
        xxl: '1440px'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#808080 #E6E6E6'
        },
        '.scrollbar::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
          'border-radius': '3px'
        },
        '.no-scrollbar-arrows::-webkit-scrollbar-button': {
          display: 'none'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
