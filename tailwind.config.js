import {heroui} from '@heroui/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          'primary': '#0d0d0d',
          'secondary': '#1a1a1a',
          'accent': '#2a2a2a',
          'card': '#1e1e1e',
        },
        'seductive': {
          'purple': '#8b5cf6',
          'pink': '#ec4899',
          'red': '#dc2626',
          'dark-red': '#991b1b',
          'wine': '#7c2d12',
          'deep-purple': '#7c3aed',
          'magenta': '#be185d',
        },
        'glass': {
          'light': 'rgba(255, 255, 255, 0.03)',
          'medium': 'rgba(255, 255, 255, 0.05)',
          'dark': 'rgba(0, 0, 0, 0.4)',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #dc2626 0%, #7c2d12 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #be185d 100%)',
        'gradient-seductive': 'linear-gradient(135deg, #991b1b 0%, #450a0a 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e1e1e 0%, #0f0f0f 100%)',
        'gradient-cosmic': 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(124, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(153, 27, 27, 0.06) 0%, transparent 50%)',
        'gradient-midnight': 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0d0d0d 100%)',
        'gradient-wine': 'linear-gradient(135deg, #7c2d12 0%, #450a0a 100%)',
        'gradient-passion': 'linear-gradient(135deg, #ec4899 0%, #991b1b 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-seductive': 'pulse-seductive 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pulse-seductive': {
          '0%, 100%': { 
            opacity: '0.6',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)',
          },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon': '0 0 5px rgba(139, 92, 246, 0.4), 0 0 10px rgba(139, 92, 246, 0.3), inset 0 0 5px rgba(139, 92, 246, 0.1)',
        'neon-pink': '0 0 5px rgba(236, 72, 153, 0.4), 0 0 10px rgba(236, 72, 153, 0.3)',
        'neon-red': '0 0 5px rgba(220, 38, 38, 0.4), 0 0 10px rgba(220, 38, 38, 0.3)',
        'neon-seductive': '0 0 10px rgba(153, 27, 27, 0.5), 0 0 20px rgba(153, 27, 27, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      dark: {
        colors: {
          background: "#0d0d0d",
          foreground: "#f5f5f5",
          primary: {
            50: "#faf7ff",
            100: "#f4edff",
            200: "#e9dbff",
            300: "#d7bfff",
            400: "#c199ff",
            500: "#8b5cf6",
            600: "#7c3aed",
            700: "#6d28d9",
            800: "#5b21b6",
            900: "#4c1d95",
            DEFAULT: "#8b5cf6",
            foreground: "#ffffff",
          },
          secondary: {
            50: "#fdf2f8",
            100: "#fce7f3",
            200: "#fbcfe8",
            300: "#f9a8d4",
            400: "#f472b6",
            500: "#ec4899",
            600: "#db2777",
            700: "#be185d",
            800: "#9d174d",
            900: "#831843",
            DEFAULT: "#ec4899",
            foreground: "#ffffff",
          },
          danger: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#dc2626",
            600: "#b91c1c",
            700: "#991b1b",
            800: "#7f1d1d",
            900: "#7c2d12",
            DEFAULT: "#dc2626",
            foreground: "#ffffff",
          },
        },
      },
    },
  })],
}