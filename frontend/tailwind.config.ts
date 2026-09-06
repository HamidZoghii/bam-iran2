import type { Config } from "tailwindcss";

// Bam Iran design tokens — from the brand brief.
// Gold is an accent only; it must never become a dominant fill color.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",      // primary — near-black, used for text/dark surfaces
        slate: "#374151",    // secondary — dark grey, supporting surfaces
        gold: "#C9A227",     // accent only — never a background fill
        paper: "#FAFAF9",    // background
        body: "#1F2937",     // body text
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        peyda: ["var(--font-peyda)", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
      letterSpacing: {
        tightish: "-0.01em",
      },
    },
  },
  plugins: [],
};

export default config;
