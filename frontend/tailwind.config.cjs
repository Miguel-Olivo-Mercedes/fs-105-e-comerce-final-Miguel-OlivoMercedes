const forms = require('@tailwindcss/forms')
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        bone:"#F6F5F2", mist:"#EEF3EE",
        tea:{50:"#F2F6F2",100:"#E6F0E6",200:"#CFE3D1",300:"#B8D6BD",400:"#9EC7A6",500:"#79A88C",600:"#5E8D73",700:"#3F6F57",800:"#2A5946"},
        pine:"#1F4B3F", ink:"#1B1F22", gold:"#D9B26E",
      },
      borderRadius:{ xl2:'1.25rem' },
      boxShadow:{ soft:"0 10px 25px -10px rgba(0,0,0,.15)" },
      fontFamily:{ sans:['Inter','system-ui','sans-serif'] },
    },
  },
  plugins:[forms],
}
