const flowbite = require("flowbite/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{jsx,js}",
    "./node_modules/flowbite-react/**/*.js", // Tambahkan ini
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Perbaiki ini
  ],
}