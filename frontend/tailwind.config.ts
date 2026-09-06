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
        // Both of these are locale-aware: the [locale] layout sets
        // --font-heading/--font-body per locale (Playfair + Manrope for
        // English, Peyda for both roles in Persian — Peyda is the brief's
        // one Persian face; Playfair has no Persian/Arabic glyphs at all,
        // so using it directly on Persian text silently falls back to a
        // generic system font, which is the bug this fixes). "display" and
        // "sans" stay available as explicit escape hatches for anywhere
        // that specifically wants one face regardless of locale.
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
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
