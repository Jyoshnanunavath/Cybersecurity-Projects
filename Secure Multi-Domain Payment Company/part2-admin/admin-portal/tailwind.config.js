/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B1016",
        surface: "#121922",
        elevated: "#182129",
        border: "#232D38",
        muted: "#8B98A6",
        ink: "#E7EDF3",
        signal: {
          DEFAULT: "#2FB9A8",
          dim: "#1E8577"
        },
        risk: {
          low: "#3FB950",
          medium: "#D8A22B",
          high: "#E5534B",
          critical: "#FF6B63"
        }
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"]
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "5px"
      }
    }
  },
  plugins: []
};
