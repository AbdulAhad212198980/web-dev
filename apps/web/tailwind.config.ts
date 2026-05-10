import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        primary: "hsl(var(--primary))",
        card: "hsl(var(--card))",
      },
      boxShadow: { glow: "0 24px 80px rgba(20, 184, 166, 0.24)" },
    },
  },
  plugins: [animate],
};

export default config;
