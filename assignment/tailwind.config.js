// tailwind.config.js
module.exports = {
content: ['./src/**/*.{js,ts,jsx,tsx}'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
      extend: {
          colors: {
              "light-blue": "#f5f9ff",
              "blue": "#3371f5",
              "yellow": "#e8c06b",
              "navy": "#273347",
              "gray": "#797f8a"
          }
    },
  },
  plugins: [],
}