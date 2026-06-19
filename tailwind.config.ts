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
      },
      maxWidth: {
        prose: "720px",
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
              marginTop: "2.4em",
              borderLeft: "5px solid #0f8a86",
              paddingLeft: "0.6em",
              lineHeight: "1.5",
            },
            h3: { marginTop: "1.8em" },
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
