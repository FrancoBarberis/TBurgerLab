/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'resident': ['Resident Evil Large', 'monospace'],
        'custom': ['3724-font', 'serif'],
      }
    },
  },
  plugins: [],
}

