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
                sans: ['Manrope', 'sans-serif'],
                heading: ['Manrope', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.05)', // Ambient float
                'hover': '0 20px 40px -5px rgba(10, 34, 57, 0.1)', // High lift
                'glow': '0 0 20px rgba(20, 184, 166, 0.3)', // Subtle teal glow
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
