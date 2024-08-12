/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        15: "0.9375rem", // 15px
      },
      textColor: {
        "defaultDark": "var(--upsun-colors-neutral-light-white, #FFF)",
        default: "var(--upsun-colors-ebony, #302f45)",
      },
      colors: {
        "upsun-black-900": "var(--upsun-colors-black-900)",
        "upsun-black-800": "var(--upsun-colors-black-800)",
        "upsun-violet-600": "var(--upsun-colors-violet-600)",
        "upsun-violet-900": "var(--upsun-colors-violet-900)",
        "upsun-yellow-400": "var(--upsun-colors-yellow-400)",
        "upsun-neutral-300": "var(--upsun-colors-neutral-300)",
        "upsun-neutral-weak": "var(--upsun-colors-neutral-weak)",
        "upsun-ebony": "var(--upsun-colors-ebony)",
      },
      fontFamily: {
        "sans-strong": [
          "Space Grotesk",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        "sans-soft": ["Open Sans", "sans-serif"],
        mono: ['"Overpass Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
