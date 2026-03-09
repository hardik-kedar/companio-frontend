import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",      // warm cream
        card: "#F3EDE4",            // light beige
        primary: "#3E2C23",         // deep warm brown
        accent: "#C2A98A",          // soft brown accent
        muted: "#6B5E55",           // soft text brown
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      }
    },
  },
  plugins: [],
};

export default config;
