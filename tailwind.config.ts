import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          teal: "#0f766e",
          cyan: "#0891b2",
          mist: "#f4fbfb",
          slate: "#e2e8f0",
          ink: "#0f172a"
        }
      },
      boxShadow: {
        luxe: "0 32px 90px -36px rgba(15, 23, 42, 0.35)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(34, 211, 238, 0.24), transparent 38%), radial-gradient(circle at top right, rgba(15, 118, 110, 0.22), transparent 42%), linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(240, 249, 255, 0.92))"
      }
    }
  },
  plugins: []
};

export default config;
