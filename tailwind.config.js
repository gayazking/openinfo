/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#05060a",
          800: "#0a0b12",
          700: "#0f111b",
          600: "#161927",
          500: "#1d2133",
        },
        neon: {
          cyan: "#22d3ee",
          blue: "#3b82f6",
          violet: "#a855f7",
          fuchsia: "#d946ef",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(34, 211, 238, 0.45)",
        "glow-violet": "0 0 40px -10px rgba(168, 85, 247, 0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.15)", opacity: "0" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        // Transform-only drift — runs on the compositor thread, zero repaints
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(6rem,3rem,0) scale(1.12)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-5rem,4rem,0) scale(0.95)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(0.95)" },
          "50%": { transform: "translate3d(4rem,-4rem,0) scale(1.1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        shimmer: "shimmer 8s ease infinite",
        "pulse-ring": "pulse-ring 3s ease-out infinite",
        aurora: "aurora 26s ease-in-out infinite",
        "aurora-2": "aurora-2 32s ease-in-out infinite",
        "aurora-3": "aurora-3 24s ease-in-out infinite",
        marquee: "marquee 36s linear infinite",
      },
    },
  },
  plugins: [],
};
