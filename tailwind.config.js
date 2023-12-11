/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "20px",
      "2xl": "28px",
      "3xl": "38px",
      "4xl": "48px",
      "5xl": "58px",
      "6xl": "68px",
    },
    extend: {
      colors: {
        "gold-primary": "#efd99d",
        "gold-secondary": "#BBAB7F",
        "green-primary": "#2b534e",
        "green-secondary": "#5d7d73",
        "green-tertiary": "#A3B3AC",
        "green-quaternary": "#7D8786",
        "green-quinary": "#1D2A26",
        "green-white": "#ebede3",
        "green-table": "#2B615240",
        "gray-primary": "#F5F5F5",
        "gray-secondary": "#A7ADA9",
        "gray-tertiary": "#eeeeee",
        "gray-disable": "#E7E7E7",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
