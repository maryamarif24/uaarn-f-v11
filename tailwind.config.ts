import type { Config } from "tailwindcss";

const config: Config = {
  darkMode : "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
            colors: {
                lightHover: "#fcf4ff",
                darkHover: "#2a004a",
                darkTheme: "#11001F",
            },
            fontFamily: {
                Outfit: ["Outfit", "sans-serif"],
                Ovo: ["Ovo", "serif"]
            },
        },
  },
  plugins: [],
};

export default config;