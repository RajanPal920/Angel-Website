/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#D71920",
        "dark-blue": "#052A63",
        "primary-blue": "#0A3D91",
        silver: "#D9D9D9",
        "light-gray": "#F5F7FA",
      },
    },
  },
  plugins: [],
};
