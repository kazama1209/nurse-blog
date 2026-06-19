import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f8a86", // ティール（看護・清潔感）
          dark: "#0b6764",
          light: "#e6f5f4",
        },
        accent: "#f4a8b8", // やわらかいピンク
        ink: "#1f2933",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Hiragino Mincho ProN",
          "Yu Mincho",
          "serif",
        ],
      },
      borderRadius: {
        editorial: "0.5rem",
      },
      maxWidth: {
        prose: "720px",
        feature: "1120px",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1f2933",
            "--tw-prose-headings": "#0b6764",
            "--tw-prose-links": "#0f8a86",
            maxWidth: "none",
            fontSize: "1.0625rem",
            lineHeight: "1.9",
            h2: {
              fontFamily: "var(--font-display), serif",
              fontWeight: "600",
              marginTop: "2.6em",
              paddingBottom: "0.35em",
              borderBottom: "1px solid rgba(15,138,134,0.28)",
              lineHeight: "1.45",
            },
            h3: {
              fontFamily: "var(--font-display), serif",
              fontWeight: "600",
              marginTop: "1.9em",
            },
            a: { textUnderlineOffset: "3px" },
            "ul > li::marker": { color: "#0f8a86" },
            blockquote: {
              borderLeftColor: "#f4a8b8",
              backgroundColor: "#fff6f8",
              fontStyle: "normal",
              padding: "0.6em 1em",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
