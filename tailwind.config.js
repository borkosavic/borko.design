/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./projects/*.html", 
    "./assets/js/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      colors: {
        'project-1': '#3B82F6',
        'project-2': '#10B981',
        'project-3': '#F59E0B', 
        'project-4': '#EF4444',
        'project-5': '#8B5CF6',
      }
    },
  },
  plugins: [],
}



