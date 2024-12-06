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
          '@apply text-gray-500 flex justify-center p-4 rounded-tr-full rounded-br-full hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out': {},
        },
      });
    },
  ],
};
