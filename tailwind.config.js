/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'clr-tx-white': '#F4F4F4',
        'clr-tx-yellow': '#D9C34C',
        'clr-tx-black': '#3A3937',
        'clr-tx-green': '#168B70',
        'clr-tx-gray': '#F7F7F7',
      },
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'],
      },
      maxWidth: {
        'max-custom': '1437px',
      },
      width: {
        '96vw': '96vw',
        '90vw': '90vw',
        '80vw': '80vw',
        '70vw': '70vw',
        '60vw': '60vw',
      },
      boxShadow: {
        boxShadow: '0 0px 35px 0px rgba(0, 0, 0, 0.7)',
        listShadow: '0 12px 24px rgba(0, 0, 0, 0.7)',
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        card2: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        'S-xl': '1600px',
        'S-1370': '1370px',
        'S-1080': '1080px',
        'S-950': '950px',
        'S-830': '830px',
        'S-730': '730px',
        'S-630': '630px',
        'S-550': '550px',
        'S-450': '450px',
        'S-375': '375px',
        'S-330': '330px',
      },
      zIndex: {
        75      : '75',
        100     : '100',
        150     : '150',
        200     : '200',
        250     : '250',
        500     : '500',
        1000    : '1000',
        10000   : '10000',
        100000  : '100000',
        1000000 : '1000000',
      },
    },
  },
  plugins: [],
}

