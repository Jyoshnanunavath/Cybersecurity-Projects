/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#0A0F1A',
          surface: '#111827',
          raised: '#151F32',
          border: '#232E45',
          borderMuted: '#1A2438',
        },
        ink: {
          primary: '#E7ECF5',
          secondary: '#94A1B8',
          muted: '#5C6882',
        },
        signal: {
          amber: '#F2A93B',
          amberDim: '#7A5A22',
          teal: '#2BB3A3',
          tealDim: '#175C54',
          pass: '#3DDC97',
          warn: '#F2A93B',
          fail: '#FF5C5C',
          info: '#5B8DEF',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 12px 30px -18px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
