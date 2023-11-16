/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      textColor: {
        primary: "#2752f4"
      },
      backgroundColor: {
        primary: "#2752f4"
      },
      borderColor: {
        primary: "#2752f4"
      }
    }
  },
  plugins: [require("daisyui")]
}
