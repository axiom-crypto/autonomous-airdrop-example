/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: "680px",
      lg: "1040px",
    },
    colors: {
      "white": "#ffffff",
      "black": "#000000",
      "highlight": "#ffffe6",
      "orange": "#fb5012",
      "text": "#99998a",
      "midgray": "#99998a",
      "darkline": "#33332e",
      "darkgrey": "#1e1e1e",
      "background": "#10100e",
      "bg-fade": "#fda788",
      "buttonbg": "#2e2e2e",
      "buttonbg-hover": "#232321",
      "container": {
        "main": "#1c1c1a",
        "main-selected": "#282826",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'md': '12px 20px 0px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: ['var(--font-satoshi)'],
        mono: ['var(--font-source-code-pro)'],
      },
      animation: {
        'pulse-click': 'pulse 1.2s cubic-bezier(0.25, 0, 0.75, 1) infinite',
      },
    },
  },
  plugins: [],
}