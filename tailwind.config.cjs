/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1B",
        secondary: "#2F80ED",
        accent: "#FFFFFF",
        background: "#F7F8FA",
        text: "#343434",
        disabled: "#C5C5C5",
        border: "#E5E5E5",
        error: "#FF4136",
      },
    },
  },
  plugins: [],
};
