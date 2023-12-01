 /** @type {import('tailwindcss').Config} */


const plugin = require("tailwindcss/plugin")

 

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'link-color': '#287FB8',
        'link-dark': '#2371A3',
        'button-hover': '#3E99D5',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}