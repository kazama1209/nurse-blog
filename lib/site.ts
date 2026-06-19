/**
 * サイト全体の基本設定。独自ドメイン接続後は .env の NEXT_PUBLIC_SITE_URL を差し替える。
 */
export const siteConfig = {
  name: "ナースの逃げ道メモ",
  shortName: "逃げ道メモ",
  // 末尾スラッシュなし。未設定時はローカル開発URLにフォールバック。
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurse-nigemichi.example.com").replace(/\/$/, ""),
  description:
    "看護学校では習わないけれど、現場で本当に役立つ知恵をまとめた看護師向けメディア。新人〜若手ナースの実務・メンタル・働き方・転職を、一次情報をもとにやさしく解説します。",
  tagline: "学校では教わらない、現場の逃げ道。",
  author: "みき｜ナースの逃げ道メモ 運営",
  // 運営母体のSNS
  social: {
    tiktok: "https://www.tiktok.com/@nurse_miki_memo",
    tiktokHandle: "@nurse_miki_memo",
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  // OGPの既定画像（public/og-default.svg を用意）
  defaultOgImage: "/og-default.svg",
  locale: "ja_JP",
} as const;

export type SiteConfig = typeof siteConfig;

/** 絶対URLを組み立てる */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
}
