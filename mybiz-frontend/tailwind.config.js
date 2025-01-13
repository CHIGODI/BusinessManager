/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'right-sm': '0.5px 0 1px 0 rgba(0, 0, 0, 0.05)',
      },
      scrollbar: ['rounded'], // Move this to `extend` for styling scrollbar states
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addComponents }) {
      addComponents({
        '.links': {
          '@apply text-[#001F3F] text-base w-[90%] ml-[2%] my-4 p-4 transition duration-300 ease-in-out': {},
        },
        '.cards': {
          '@apply bg-white p-6 h-[50%] md:h-[50%] w-[80%] border shadow-sm lg:w-[30%]': {},
        },
      });
    },
  ],
};
