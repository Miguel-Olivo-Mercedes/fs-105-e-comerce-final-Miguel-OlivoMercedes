/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend:{
      colors:{
        ink:  'rgb(var(--ink)  / <alpha-value>)',
        bone: 'rgb(var(--bone) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        mist: 'rgb(var(--mist) / <alpha-value>)',
        ash:  'rgb(var(--ash)  / <alpha-value>)',
      },

      colors: {
        /* verdes salvia/mate + neutros suaves */
        sage: {
          50:"#F2F5F2", 100:"#E7EEE7", 200:"#D7E4D8", 300:"#C6D9C9",
          400:"#B3CCB7", 500:"#9BBBA0", 600:"#7FA386", 700:"#637E6B",
          800:"#4C6255", 900:"#394B43"
        },
        moss:    "#6B8F79",
        cream:   "#F5F3EF",
        stone:   { 700:"#2A2D2B", 800:"#222524", 900:"#1B1D1C" },  // gris oscuro
      },
      backgroundImage: {
        /* fondo principal tipo foto: luz central + gradiente salvia */
        'hero-sage':
          'radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #E7EEE7 0%, #D7E4D8 45%, #C6D9C9 100%)',
      },
      container: { center: true, padding: '1rem' },
      fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
      boxShadow: { soft: "0 10px 25px -10px rgba(0,0,0,.15)" }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
