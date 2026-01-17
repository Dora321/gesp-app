/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                bounceShort: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'bounce-short': 'bounceShort 0.5s ease-in-out',
            },
            colors: {
                brand: {
                    blue: '#2563EB',   // Royal Blue - Primary
                    orange: '#F97316', // Vibrant Orange - Accent
                    slate: '#1E293B',  // Slate - Neutral/Text
                }
            },
            fontFamily: {
                sans: ['"PingFang SC"', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
            },
        },
    },
    plugins: [],
}
