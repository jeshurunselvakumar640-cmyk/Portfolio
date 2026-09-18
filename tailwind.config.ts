import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#080a0f",
          card: "#0d1117",
          panel: "#161b22",
          border: "rgba(255, 255, 255, 0.08)",
          "border-bright": "rgba(255, 255, 255, 0.16)",
          muted: "#8b949e",
          text: "#f0f6fc",
        },
        cyan: {
          glow: "#00f0ff",
          dim: "#00b8c4",
          dark: "#00474f",
        },
        amber: {
          studio: "#f59e0b",
          dim: "#b45309",
        },
        signal: {
          green: "#10b981",
          dim: "#047857",
        },
        harmonic: {
          violet: "#8b5cf6",
          dim: "#6d28d9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "studio-gradient": "radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.07) 0%, rgba(8, 10, 15, 0.95) 75%)",
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 240, 255, 0.3)",
        "amber-glow": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "violet-glow": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "waveform": "waveform 1.2s ease-in-out infinite alternate",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        waveform: {
          "0%": { height: "15%" },
          "100%": { height: "95%" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
