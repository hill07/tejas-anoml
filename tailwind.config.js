/** @type {import('tailwindcss').Config} */
const hsl = (v) => `hsl(var(--${v}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: hsl('ivory'), deep: hsl('ivory-deep') },
        gold: { DEFAULT: hsl('gold'), light: hsl('gold-light'), deep: hsl('gold-deep') },
        maroon: { DEFAULT: hsl('maroon'), deep: hsl('maroon-deep') },
        rose: hsl('rose'),
        ink: hsl('ink'),
        muted: hsl('muted'),
      },
      fontFamily: {
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        heading: ['Cinzel', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px hsl(345 40% 18% / .35)',
        elegant: '0 30px 80px -20px hsl(345 60% 12% / .6)',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        rock: { '0%,100%': { transform: 'rotate(0)' }, '33%': { transform: 'rotate(2deg)' }, '66%': { transform: 'rotate(-2deg)' } },
        halo: { to: { transform: 'rotate(360deg)' } },
        breathe: { '0%,100%': { transform: 'scale(1)', opacity: '.7' }, '50%': { transform: 'scale(1.06)', opacity: '1' } },
        pop: { '0%': { transform: 'scale(.9)' }, '60%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
        shimmer: { from: { transform: 'translateX(-120%) skewX(-20deg)' }, to: { transform: 'translateX(420%) skewX(-20deg)' } },
      },
      animation: {
        rise: 'rise .9s cubic-bezier(.22,1,.36,1) both',
        rock: 'rock 6s ease-in-out infinite',
        halo: 'halo 14s linear infinite',
        breathe: 'breathe 3.2s ease-in-out infinite',
        pop: 'pop .6s ease-out both',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
