/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#FFF6F1",100:"#FCEADF",200:"#F6CDBB",300:"#EEAB8F",400:"#E18663",
          500:"#CF6E3A", /* terracota */
          600:"#B25831",700:"#8D452A",800:"#5B2F22",900:"#2B1A16" /* cacao oscuro */
        },
        cream:"#FAF5EF",
        sand:"#E7D7C9"
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
