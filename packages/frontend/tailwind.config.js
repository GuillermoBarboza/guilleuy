/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      width: {
        80: "80vw",
      },
    },
  },
  plugins: [],
};
