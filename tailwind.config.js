/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          0: "#bdbdff",
          50: "#8888f7",
          100: "#6868ed",
          200: "#4e4ecc",
          300: "#3e3eab",
          400: "#363685",
          500: "#2f2f61",
          600: "#26264a",
          700: "#1f1f38",
          800: "#1b1b31",
          900: "#11111a",
          1000: "#0a0a0f",
          text: "#e4e4f5",
          error: "#F82174",
        },
      },
    },
  },
  plugins: [],
};
