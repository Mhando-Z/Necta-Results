/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1446px",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        action: ["Bebas Neue", "sans-serif"],
        scifi: ["Orbitron", "sans-serif"],
        fantasy: ["Almendra SC", "serif"],
        animation: ["Baloo Bhai 2", "sans-serif"],
        romance: ["Great Vibes", "cursive"],
        Raleway: ["Raleway", "sans-serif"],
      },
      fontWeight: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
};
