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
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dark": "linear-gradient(180deg, #2F3E46 0%, #4ABEFF 100%)",
      },
      colors: {
        primary: {
          DEFAULT: "#4ABEFF",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#4ABEFF",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
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
        accent: {
          DEFAULT: "#009CA6",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#009CA6",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        textLight: "#333333",
        bgLight: "#FDF6EC",
        textDark: "#F8F9FA",
        bgDark: "#2F3E46",
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
