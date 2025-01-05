/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        krem: "#F5EFE7",
        dkrem: "#D8C4B6",
        bkrem: "#CBA35C",
        bdkrem: "#754E1A",
      },
      fontFamily: {
        sans: ["Source Sans 3"],
      },
    },
  },
  plugins: [],
};
