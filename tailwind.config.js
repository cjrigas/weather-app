/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mag-glass-icon': "url('./src/assets/icons/magnifying-glass-icon.svg')",
      },
    },
  },
  plugins: [],
}

