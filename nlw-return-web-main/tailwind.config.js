module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#09090A',
          light: '#FFFFFF'
        },
    
        surface_primary: {
          light: '#FFFFFF',
          dark: '#18181B'
        },
        surface_secondary: {
          light: '#F4F4F5',
          dark: '#27272A'
        },
    
        text_primary: {
          light: '#27272A',
          dark: '#F4F4F5'
        },
        text_secondary: {
          light: '#71717A',
          dark: '#A1A1AA'
        },
        text_on_brand_color: '#FFFFFF',
        stroke: {
          light: '#D4D4D8',
          dark: '#52525B'
        },

        brand:{
          300: '#996DFF',
          500: '#8257e6'
        },
      },
      borderRadius: {
        md: '4px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
