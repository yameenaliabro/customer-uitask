/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind processes all files in the src directory
  ],
  theme: {
    screens: {
      'sm': '640px', // Small devices (phones)
      'md': '768px', // Medium devices (tablets)
      'lg': '1024px', // Large devices (small laptops)
      'xl': '1280px', // Extra large devices (laptops/desktops)
      '2xl': '1536px', // Extra large devices (large laptops/desktops)
      '1920': '1920px', // Custom size for 1920px width
    },
    extend: {
      backgroundColor: {
        "primary": "#015249",
        "primary-white": "#F3F3F3",
        "primary2": "#043933"
      }
    },
  },
  plugins: [],
}
