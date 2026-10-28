/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#050b14',
          900: '#0a1220',
          850: '#0d1826',
          800: '#101f30',
          700: '#16283b',
          600: '#1f3a52',
        },
        cyan: {
          accent: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56, 189, 248, 0.15), 0 8px 30px -12px rgba(56, 189, 248, 0.25)',
      },
    },
  },
  plugins: [],
}
