/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#EFEFE1',
          raised: '#F8F7EC',
        },
        brand: {
          deep: '#0F4C2E',
          mid: '#1E7A45',
          bright: '#2F9E5A',
        },
        accent: {
          amber: '#E39A2E',
          'amber-deep': '#C97C16',
          red: '#C23B36',
        },
        ink: {
          DEFAULT: '#182619',
          soft: '#3f4f40',
        },
        line: '#c9c8b3',
      },
      fontFamily: {
        sans: ['Geist', '"Hind Siliguri"', 'Roboto', 'sans-serif'],
        heading: ['Geist', '"Baloo Da 2"', 'sans-serif'],
        bn: ['"Hind Siliguri"', 'Roboto', 'Arial', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        display: ['"Baloo Da 2"', '"Hind Siliguri"', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0 rgba(0,0,0,0.25)',
        'brutal-lg': '6px 6px 0 rgba(0,0,0,0.25)',
        'brutal-ink': '3px 3px 0 #182619',
        'brutal-ink-lg': '5px 5px 0 #182619',
      },
    },
  },
  plugins: [],
};
