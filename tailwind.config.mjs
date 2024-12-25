/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
      backgroundImage: {
        'belimo-gradient': 'linear-gradient(to right, #333C4D, #4D5769)',
        'sciprofiles-gradient': 'linear-gradient(to right, #205561, #366A74)',
        'homerules-gradient': 'linear-gradient(to right, #0E4B3A, #236558)',
        'fxtrading-gradient': 'linear-gradient(to right, #690000, #800000)',
        'act2access-gradient': 'linear-gradient(to right, #003D69, #1A527F)',
      },
      colors: {
        belimo: {
          primary: '#333C4D',
          secondary: '#667384',
          light: '#99ABBA',
          bg: '#F1F1F5',
          'bg-light': '#FAFAFC',
        },
        sciprofiles: {
          primary: '#205561',
          secondary: '#4C7F87',
          light: '#78AAA8',
          bg: '#CCF3F5',
          'bg-light': '#E6FBFC',
        },
        homerules: {
          primary: '#0E4B3A',
          secondary: '#387F76',
          light: '#62B3A0',
          bg: '#B3F6E7',
          'bg-light': '#D9FBF2',
        },
        fxtrading: {
          primary: '#690000',
          secondary: '#990000',
          light: '#CC0000',
          bg: '#FF4D4D',
          'bg-light': '#FF6666',
        },
        act2access: {
          primary: '#003D69',
          secondary: '#336694',
          light: '#669FCC',
          bg: '#CCEDF4',
          'bg-light': '#E6F6FA',
        },
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}