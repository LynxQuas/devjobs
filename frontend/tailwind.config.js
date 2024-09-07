/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "10%": {
            transform: "translateX(0)",
          },
        },

        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
          },
          "10%": {
            transform: "translateX(0%)",
          },
        },
      },

      animation: {
        slideInLeftAnimation: "slideInLeft 2s ease",
        slideInRightAnimation: "slideInRight 2s ease",
      },
    },
  },
  plugins: [],
};
