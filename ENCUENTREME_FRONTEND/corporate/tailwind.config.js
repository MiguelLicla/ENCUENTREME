/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A1B1",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
