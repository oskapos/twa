import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': 'rgba(3, 17, 38, 1)',
        'col-border': 'rgba(255, 255, 255, 0.3)',
        'col-footer-bg': 'rgba(0, 0, 0, 0.4)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        borderGradient: 'linear-gradient(90deg, #424697 0%, #7E3A51 100%)',
        darkGradient: 'linear-gradient(144.48deg, #1A3864 9.13%, #031126 62.89%)',
        cardGradient: 'radial-gradient(50% 50% at 50% 50%, #FBE218 0%, rgba(249, 226, 22, 0) 100%)',
        drawerGradient: "url('/drawer-bg.png'), linear-gradient(158.05deg, #3913A1 1.25%, #250C68 100%)",
        bottomGradient: "url('/glow-bottom.png'), linear-gradient(158.05deg, #3913A1 1.25%, #250C68 100%)",
        mainBtnGradient: 'linear-gradient(360deg, #FD8421 0%, #FA4DCF 100%)',
        pageGradient: "url('/glow-bottom.png'), radial-gradient(200% 20% at 50% 38%, #6116FF 0%, rgba(3, 17, 38, 0) 100%)",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
export default config;
