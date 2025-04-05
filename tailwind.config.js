/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configure your template paths here
  content: [
    "./src/**/*.html",
    // Looks for classes in HTML files in the root directory
    // Add paths to any other files that use Tailwind classes
    // e.g., "./src/**/*.{html,js}"
  ],

  theme: {
    extend: {
      // Add your font family extension here
      fontFamily: {
        sora: ["Sora", "sans-serif"], // Add your custom font
      },
    },
  },
  plugins: [],
};
