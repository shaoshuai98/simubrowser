/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-6',
    'gap-3',
    'gap-4',
    'gap-6',
    'gap-8',
    {
      pattern: /^(bg|text|border)-(gray|white|black)/,
      variants: ['hover', 'dark']
    }
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'landscape': { 'raw': '(orientation: landscape)' },
      'portrait': { 'raw': '(orientation: portrait)' },
      'short': { 'raw': '(max-height: 768px)' }
    },
    extend: {
      colors: {
        darkBg: '#0f1419',
        darkSecondary: '#1c2128',
        darkTertiary: '#2d333b',
        darkBorder: '#444c56',
        darkBorderLight: '#373e47',
        darkText: '#e6edf3',
        darkTextSecondary: '#adbac7',
        darkTextMuted: '#768390',
        lightBg: '#ffffff',
        lightSecondary: '#f6f8fa',
        lightTertiary: '#f0f3f6',
        lightBorder: '#d0d7de',
        lightBorderLight: '#e5e7eb',
        lightText: '#1f2328',
        lightTextSecondary: '#656d76',
        primary: {
          light: '#0969da',
          dark: '#4493f8'
        },
        secondary: {
          light: '#6e7781',
          dark: '#768390'
        },
        accent: {
          light: '#6639ba',
          dark: '#986ee2'
        },
        success: {
          light: '#1a7f37',
          dark: '#3fb950'
        },
        warning: {
          light: '#bf8700',
          dark: '#d29922'
        },
        danger: {
          light: '#d1242f',
          dark: '#f85149'
        }
      },
      spacing: {
        'screen-dynamic': 'var(--vh, 100vh)'
      },
      minHeight: {
        'screen-dynamic': 'var(--vh, 100vh)'
      }
    },
  },
  plugins: [],
};