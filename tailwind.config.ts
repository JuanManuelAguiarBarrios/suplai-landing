import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Canela", "Playfair Display", "serif"],
      },
    },
  },
};

export default config;
