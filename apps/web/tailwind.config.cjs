/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#0B0F19",
        cardDark: "#111827",
        primary: "#8b5cf6",
        secondary: "#6366f1",
      },
      backgroundImage: {
        starfield:
          "radial-gradient(circle at 20% 20%, rgba(80,80,130,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(80,80,130,0.3), transparent 40%)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
