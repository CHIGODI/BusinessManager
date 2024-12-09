/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.links': {
          '@apply text-[#001F3F] text-base w-[90%] ml-[2%] p-4 rounded-tr-full rounded-br-full hover:bg-[#F1EAFF] transition duration-300 ease-in-out': {},
        },
        '.cards': {
          '@apply bg-white rounded-lg p-6 h-[40%] w-[30%] border': {},
        },
      });
    },
  ],
};
