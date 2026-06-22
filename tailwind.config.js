/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./app/**/*.njk",
    "./app/**/*.js",
    "./app/**/*.json",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
