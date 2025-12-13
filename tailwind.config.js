/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                medical: {
                    primary: '#0A2239', // Deep Medical Blue
                    secondary: '#14B8A6', // Soft Cyan / Teal
                    light: '#F5F7FA', // Light Grey Background
                    white: '#FFFFFF',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Plus Jakarta Sans', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(10, 34, 57, 0.08)',
                'hover': '0 10px 25px -3px rgba(10, 34, 57, 0.12)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                }
            }
        }
    },
    plugins: [],
}
