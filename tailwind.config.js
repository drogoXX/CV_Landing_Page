/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lambo: {
          black: '#000000',
          iron: '#181818',
          charcoal: '#202020',
          gold: '#FFC000',
          goldDark: '#917300',
          white: '#FFFFFF',
          smoke: '#F5F5F5',
          ash: '#7D7D7D',
          steel: '#969696',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display1: ['7.5rem', { lineHeight: '0.92' }],
        display2: ['5rem', { lineHeight: '1.13' }],
        section: ['3.375rem', { lineHeight: '1.19' }],
        subsection: ['2.5rem', { lineHeight: '1.15' }],
        feature: ['1.6875rem', { lineHeight: '1.37' }],
        'body-lg': ['1.125rem', { lineHeight: '1.56' }],
        micro: ['0.625rem', { lineHeight: '1', letterSpacing: '0.225px' }],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        toggle: '20px',
      },
    },
  },
  plugins: [],
};
