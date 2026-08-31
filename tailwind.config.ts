import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          light: 'var(--bg-light)',
          surface: 'var(--surface)',
        },
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        gold: {
          DEFAULT: 'var(--accent-gold)',
          light: 'var(--accent-gold-light)',
          champagne: 'var(--accent-champagne)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        site: '1380px',
      },
      letterSpacing: {
        label: '0.18em',
        'label-lg': '0.22em',
        display: '-0.02em',
        headline: '-0.015em',
      },
      lineHeight: {
        display: '0.92',
        headline: '1.05',
        body: '1.72',
      },
      transitionTimingFunction: {
        'power3-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
}
export default config
