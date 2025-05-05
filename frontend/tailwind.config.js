/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#6366F1",
                    dark: "#818CF8",
                },
                secondary: {
                    light: "#F59E0B",
                    dark: "#FBBF24",
                },
                background: {
                    light: "#F9FAFB",
                    dark: "#111827",
                },
                surface: {
                    light: "#FFFFFF",
                    dark: "#1F2937",
                },
                text: {
                    primary: {
                        light: "#111827",
                        dark: "#F9FAFB",
                    },
                    secondary: {
                        light: "#6B7280",
                        dark: "#9CA3AF",
                    },
                },
                success: {
                    light: "#10B981",
                    dark: "#34D399",
                },
                error: {
                    light: "#EF4444",
                    dark: "#F87171",
                },
            },
            backgroundImage: {
                "gradient-light": "linear-gradient(135deg, #6366F1 0%, #37CDBE 100%)",
                "gradient-dark": "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
                "card-gradient-light": "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(55, 205, 190, 0.1) 100%)",
                "card-gradient-dark": "linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(55, 205, 190, 0.1) 100%)",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#6366F1",
                    "secondary": "#F59E0B",
                    "accent": "#37CDBE",
                    "neutral": "#3D4451",
                    "base-100": "#F9FAFB",
                    "base-200": "#FFFFFF",
                    "base-300": "#F3F4F6",
                    "info": "#3ABFF8",
                    "success": "#10B981",
                    "warning": "#F59E0B",
                    "error": "#EF4444",
                },
                dark: {
                    "primary": "#818CF8",
                    "secondary": "#FBBF24",
                    "accent": "#37CDBE",
                    "neutral": "#3D4451",
                    "base-100": "#111827",
                    "base-200": "#1F2937",
                    "base-300": "#374151",
                    "info": "#3ABFF8",
                    "success": "#34D399",
                    "warning": "#FBBF24",
                    "error": "#F87171",
                },
            },
        ],
    },
} 