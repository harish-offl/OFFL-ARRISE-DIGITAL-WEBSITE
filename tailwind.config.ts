import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F7F5",
        ink: "#111111",
        night: "#0D0D0D",
        "night-2": "#171717",
        surface: "#FFFFFF",
        muted: "#777777",
        line: "#E5E5E5",
        "line-dark": "#2A2A2A",
        lime: "#FF6B00",
        "lime-soft": "#FFF0E5",
        "lime-dark": "#E85D00",
        accent: "#FFB15C",
      },
      fontFamily: {
        sans: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
        serif: ["var(--font-bricolage-grotesque)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 9vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2.25rem, 6.2vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(1.9rem, 4.2vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        site: "1440px",
        prose: "68ch",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 4.5rem)",
        section: "clamp(3rem, 8vw, 6rem)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,107,0,0.2), 0 24px 70px -24px rgba(255,107,0,0.35)",
        "glow-lg": "0 0 90px -10px rgba(255,107,0,0.35)",
        float: "0 30px 70px -30px rgba(17,17,17,0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-50%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-18px,0) rotate(-1.2deg)" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(10px,-14px,0) rotate(2deg)" },
          "66%": { transform: "translate3d(-8px,-6px,0) rotate(-1.5deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        aurora: {
          "0%, 100%": { opacity: "0.75", transform: "translate3d(-2%,0,0) scale(1)" },
          "50%": { opacity: "1", transform: "translate3d(2%,-2%,0) scale(1.06)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 42s linear infinite",
        float: "float 9s ease-in-out infinite",
        "float-soft": "float-soft 7s ease-in-out infinite",
        drift: "drift 16s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

