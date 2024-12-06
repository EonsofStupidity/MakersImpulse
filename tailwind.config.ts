import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7FFFD4",
          foreground: "#1A1F2C",
        },
        secondary: {
          DEFAULT: "#FFB6C1",
          foreground: "#1A1F2C",
        },
        accent: {
          DEFAULT: "#E6E6FA",
          foreground: "#1A1F2C",
        },
        neon: {
          cyan: "#41f0db",
          pink: "#ff0abe",
          purple: "#8000ff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "neon-line": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "gradient-flow": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "neon-pulse": {
          "0%, 100%": {
            "box-shadow": "0 0 5px #41f0db, 0 0 10px #41f0db, 0 0 15px #41f0db",
          },
          "50%": {
            "box-shadow": "0 0 10px #41f0db, 0 0 20px #41f0db, 0 0 30px #41f0db",
          },
        },
        "neon-glow": {
          "0%, 100%": {
            "text-shadow": "0 0 5px #ff0abe, 0 0 10px #ff0abe, 0 0 15px #ff0abe",
          },
          "50%": {
            "text-shadow": "0 0 10px #ff0abe, 0 0 20px #ff0abe, 0 0 30px #ff0abe",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        "neon-line": "neon-line 0.3s ease-out forwards",
        "gradient-flow": "gradient-flow 3s ease infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "neon-glow": "neon-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;