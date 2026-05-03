/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.njk", "./app/**/*.js", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
