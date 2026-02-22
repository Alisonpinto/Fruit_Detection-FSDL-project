/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-green': '#1F6F43', // Deep Green
                'light-green': '#F3F7F4', // Light Background
                'accent-green': '#2E8B57', // Sea Green
                'soft-bg': '#F3F7F4', // Match light-green
                'dark-text': '#1C1C1C', // Almost Black
                'muted-text': '#6B7280', // Gray
                'card-bg': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem', // 16px
                '2xl': '1.25rem', // 20px
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            }
        },
    },
    plugins: [],
}
