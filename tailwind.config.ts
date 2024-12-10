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
          DEFAULT: "var(--primary)",
          foreground: "var(--text-primary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--text-heading)",
        },
        neon: {
          cyan: "var(--neon-cyan)",
          pink: "var(--neon-pink)",
          purple: "var(--neon-purple)",
        },
        admin: {
          dark: "#151A24",
          medium: "#373840",
          light: "#5C596C",
          green: "#26c766",
          pink: "#c726b2",
          purple: "#8000ff",
        },
        cyber: {
          yellow: "#FFE29F",
          green: "#7FFF00",
          pink: "#FF1493",
          purple: "#9932CC",
          neon: "#41f0db"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        'glass-hover': 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
        'admin-gradient': 'linear-gradient(135deg, #151A24, #373840, #5C596C)',
        'admin-card': 'linear-gradient(135deg, rgba(38,199,102,0.05), rgba(199,38,178,0.05))',
        'admin-hover': 'linear-gradient(135deg, rgba(38,199,102,0.15), rgba(199,38,178,0.15))',
        'cyber-texture': "url('/textures/cyber-grid.png')",
        'scratch-overlay': "url('/textures/scratches.png')"
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
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "text-glow": {
          "0%, 100%": {
            textShadow: "0 0 10px currentColor"
          },
          "50%": {
            textShadow: "0 0 20px currentColor"
          }
        },
        "cyber-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 10px var(--cyber-glow)",
            transform: "scale(1)"
          },
          "50%": { 
            textShadow: "0 0 20px var(--cyber-glow), 0 0 30px var(--cyber-glow)",
            transform: "scale(1.05)"
          }
        },
        "menu-wave": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "gradient-flow": "gradient-flow 15s ease infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "cyber-pulse": "cyber-pulse 2s ease-in-out infinite",
        "menu-wave": "menu-wave 15s ease infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
