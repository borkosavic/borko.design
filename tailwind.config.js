import { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'h1': '2.75rem',
        'h2': '1.875rem', 
        'h3': '1.25rem',
        'body': '1rem',
        'small': '0.875rem'
      },
      spacing: {
        'xs': '4px',
        'sm': '8px', 
        'md': '16px',
        'lg': '32px',
        'xl': '64px'
      },
      maxWidth: {
        'container': '1280px'
      },
      colors: {
        // Theme A: Modern Neutral
        'theme-a': {
          'bg-base': '#F9FAFB',
          'bg-alt': '#ECEFF1',
          'text-main': '#1F2937',
          'text-subtle': '#6B7280',
          'accent': '#D1D5DB'
        },
        // Theme B: Lemon & Graphite
        'theme-b': {
          'bg-base': '#1E1E1E',
          'bg-alt': '#2D2D2D',
          'text-main': '#FAFAFA',
          'text-subtle': '#9CA3AF',
          'accent': '#F4D35E'
        },
        // Theme C: Deep Blue & Yellow
        'theme-c': {
          'bg-base': '#0A0F1C',
          'text-main': '#F8FAFC',
          'text-subtle': '#64748B',
          'accent': '#FACC15',
          'border': '#1E293B'
        },
        // Theme D: Architectural Warm Gray
        'theme-d': {
          'bg-base': '#FAF9F7',
          'bg-alt': '#EDEAE3',
          'text-main': '#2E2E2E',
          'text-subtle': '#7C7C7C',
          'accent': '#BF360C'
        }
      },
      transitionDuration: {
        '500': '500ms'
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out'
      }
    },
  },
} satisfies Config