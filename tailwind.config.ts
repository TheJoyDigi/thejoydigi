import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Lora",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "serif",
      ],
      heading: ["Raleway", "sans-serif"],
      logo: ["Quicksand", "sans-serif"],
      body: ["Inter", "sans-serif"],
      display: ["var(--font-display)", "Georgia", "serif"],
      bungee: ["var(--font-bungee)", "Impact", "sans-serif"],
      // DM Sans: UI, body and card titles; Bungee owns display.
      ui: ["var(--font-body)", "system-ui", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dark": "linear-gradient(180deg, #0B0B0C 0%, #1B140D 100%)",
        // P7 medallion ripple order; signature accents only (header rule, hover flourishes).
        spectrum:
          "linear-gradient(90deg, #FF2E88, #E64A00, #FFC94A, #14A03A, #0A86B0, #5A189A, #C8106E)",
      },
      colors: {
        // Sun gold: primary action fill. Use 800 (deep gold) for small text on sand.
        primary: {
          DEFAULT: "#FFC94A",
          50: "#FFFBEB",
          100: "#FFF3CC",
          200: "#FFE699",
          300: "#FFD86B",
          400: "#FFCF5A",
          500: "#FFC94A",
          600: "#F2B731",
          700: "#C28A12",
          800: "#8F6300",
          900: "#6B4A00",
          950: "#3D2A00",
        },
        secondary: {
          DEFAULT: "#FDF6EC",
          50: "#fefefe",
          100: "#FDF6EC",
          200: "#fbecdb",
          300: "#f6d8b5",
          400: "#f1bb87",
          500: "#e89f57",
          600: "#df8232",
          700: "#be6a22",
          800: "#9a551f",
          900: "#7d461e",
          950: "#432310",
        },
        // Spectrum magenta; the one spectrum hue that holds 4.5:1 as text on sand.
        accent: {
          DEFAULT: "#C8106E",
          50: "#FFF0F7",
          100: "#FFE0EF",
          200: "#FFC2DF",
          300: "#FF8FC2",
          400: "#FF2E88",
          500: "#C8106E",
          600: "#A80D5C",
          700: "#870A4A",
          800: "#66083A",
          900: "#4A062A",
          950: "#2B0318",
        },
        spectrum: {
          pink: "#FF2E88",
          magenta: "#C8106E",
          orange: "#E64A00",
          green: "#14A03A",
          cyan: "#0A86B0",
          violet: "#5A189A",
        },
        ink: "#1B140D",
        muted: "#6B5D4F",
        night: "#0B0B0C",
        sand: "#FDF6EC",
        textLight: "#1B140D",
        bgLight: "#FDF6EC",
        textDark: "#FDF6EC",
        bgDark: "#0B0B0C",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      boxShadow: {
        DEFAULT: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
