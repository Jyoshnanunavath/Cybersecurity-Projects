/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101826',
        paper: '#F6F7F9',
        line: '#D8DCE3',
        muted: '#5C6577',
        trust: {
          DEFAULT: '#2454FF',
          dim: '#1B3FC4',
          tint: '#E9EEFF',
        },
        secure: {
          DEFAULT: '#157A5E',
          tint: '#E4F3EE',
        },
        alert: {
          DEFAULT: '#B5730A',
          tint: '#FBF0DD',
        },
        danger: {
          DEFAULT: '#B0292F',
          tint: '#FBE9E9',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
