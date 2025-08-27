import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(
    {
      "themes": {
        "light": {
          "colors": {
            "primary": {
              "50": "#eee4f8",
              "100": "#d7bfef",
              "200": "#bf99e5",
              "300": "#a773db",
              "400": "#904ed2",
              "500": "#7828c8",
              "600": "#6321a5",
              "700": "#4e1a82",
              "800": "#39135f",
              "900": "#240c3c",
              "foreground": "#fff",
              "DEFAULT": "#7828c8"
            },
            "secondary": {
              "50": "#ffe9f9",
              "100": "#ffcaf0",
              "200": "#ffabe7",
              "300": "#ff8cdf",
              "400": "#ff6dd6",
              "500": "#ff4ecd",
              "600": "#d240a9",
              "700": "#a63385",
              "800": "#792561",
              "900": "#4d173e",
              "foreground": "#000",
              "DEFAULT": "#ff4ecd"
            }
          }
        },
        "dark": {
          "colors": {
            "primary": {
              "50": "#240c3c",
              "100": "#39135f",
              "200": "#4e1a82",
              "300": "#6321a5",
              "400": "#7828c8",
              "500": "#904ed2",
              "600": "#a773db",
              "700": "#bf99e5",
              "800": "#d7bfef",
              "900": "#eee4f8",
              "foreground": "#fff",
              "DEFAULT": "#7828c8"
            },
            "secondary": {
              "50": "#4d173e",
              "100": "#792561",
              "200": "#a63385",
              "300": "#d240a9",
              "400": "#ff4ecd",
              "500": "#ff6dd6",
              "600": "#ff8cdf",
              "700": "#ffabe7",
              "800": "#ffcaf0",
              "900": "#ffe9f9",
              "foreground": "#000",
              "DEFAULT": "#ff4ecd"
            }
          }
        }
      }
    }
  )],
}

module.exports = config;
