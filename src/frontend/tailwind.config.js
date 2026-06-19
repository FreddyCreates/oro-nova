import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        gold: "oklch(var(--phi-gold))",
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        /* Clinical instrument shadows — minimal elevation */
        "instrument-subtle": "inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
        "instrument-raised": "0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        /* Phi-gold accent glow */
        "phi-glow": "0 0 16px rgba(235,179,72,0.2)",
        "phi-glow-intense": "0 0 24px rgba(235,179,72,0.35)",
        /* Coherence signals */
        "coherence-glow": "0 0 12px rgba(6,182,212,0.2)",
        "coherence-intense": "0 0 20px rgba(6,182,212,0.35)",
        /* Warning/critical */
        "critical-glow": "0 0 12px rgba(220,38,38,0.2)",
        /* Legacy */
        gold: "0 0 12px rgba(245,158,11,0.15)",
        cyan: "0 0 12px rgba(6,182,212,0.12)",
        teal: "0 0 12px rgba(20,184,166,0.12)",
        orange: "0 0 12px rgba(249,115,22,0.12)",
        purple: "0 0 12px rgba(139,92,246,0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(10px)" },
        },
        "data-pulse": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "50%":  { opacity: "1" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "penrose-rotate": {
          "0%": { transform: "perspective(2000px) rotateX(0deg) rotateY(0deg)" },
          "100%": { transform: "perspective(2000px) rotateX(1deg) rotateY(1deg)" },
        },
        "lattice-pulse": {
          "0%": { opacity: "0.1", transform: "scale(0.95)" },
          "50%": { opacity: "0.25", transform: "scale(1)" },
          "100%": { opacity: "0.1", transform: "scale(0.95)" },
        },
        "node-coherence": {
          "0%, 100%": { 
            boxShadow: "0 0 8px var(--primary), inset 0 0 4px var(--primary)"
          },
          "50%": { 
            boxShadow: "0 0 16px var(--primary), inset 0 0 8px var(--primary)"
          },
        },
        "light-sweep": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "wave-field": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "resonance-link": {
          "0%": { strokeOpacity: "0.3", strokeWidth: "1px" },
          "50%": { strokeOpacity: "0.7", strokeWidth: "2px" },
          "100%": { strokeOpacity: "0.3", strokeWidth: "1px" },
        },
        "node-bloom": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "family-cascade": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "data-pulse": "data-pulse 0.4s ease-out",
        "penrose-rotate": "penrose-rotate 45s linear infinite",
        "lattice-pulse": "lattice-pulse 8.73s ease-in-out infinite",
        "node-coherence": "node-coherence 0.873s ease-in-out infinite",
        "light-sweep": "light-sweep 2s ease-in-out",
        "wave-field": "wave-field 3s ease-in-out infinite",
        "resonance-link": "resonance-link 1.5s ease-in-out infinite",
        "node-bloom": "node-bloom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "family-cascade-1": "family-cascade 0.3s ease-out 0s",
        "family-cascade-2": "family-cascade 0.3s ease-out 0.075s",
        "family-cascade-3": "family-cascade 0.3s ease-out 0.15s",
        "family-cascade-4": "family-cascade 0.3s ease-out 0.225s",
        "family-cascade-5": "family-cascade 0.3s ease-out 0.3s",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
