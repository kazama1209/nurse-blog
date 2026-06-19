import type { CategorySlug } from "./categories";

/** イラスト名（components/Illustration.tsx の name と対応） */
export type IllustName =
  | "drip"
  | "wristband"
  | "vitals"
  | "chat"
  | "phone"
  | "syringe"
  | "stomach"
  | "clipboard"
  | "bed"
  | "heart-hands"
  | "two-people"
  | "moon"
  | "tasks"
  | "clock"
  | "wallet"
  | "calendar"
  | "magnifier"
  | "building"
  | "house"
  | "compass"
  | "door"
  | "beauty";

/** 記事slug → モチーフ（カバー画像・記事内イラストの中心図）。テーマに合うものを割り当て。 */
export const slugMotif: Record<string, IllustName> = {
  "iv-pump-10x-mistake": "drip",
  "patient-misidentification": "wristband",
  "kyuhen-respiratory-rate": "vitals",
  "verbal-order-unit": "chat",
  "doctor-call-isbarc": "phone",
  "insulin-unit-ml": "syringe",
  "tube-feeding-position-check": "stomach",
  "handover-memo": "clipboard",
  "blood-draw-tips": "syringe",
  "incident-report-writing": "clipboard",
  "fall-prevention": "bed",
  "stopcock-iv-leak": "drip",
  "first-year-quit": "heart-hands",
  "comparing-with-peers": "two-people",
  "first-night-shift": "moon",
  "preceptor-mismatch": "two-people",
  "multitasking-priority": "tasks",
  "second-victim": "heart-hands",
  "mae-zangyo": "clock",
  "night-shift-worth": "moon",
  "salary-not-rising": "wallet",
  "paid-leave": "calendar",
  "job-posting-red-flags": "magnifier",
  "take-home-pay": "wallet",
  "black-hospital-signs": "building",
  "biyo-clinic-transfer": "beauty",
  "visiting-nurse": "house",
  "clinic-outpatient": "building",
  "non-ward-options": "compass",
  "nurse-job-agency-guide": "door",
};

const fallbackByCategory: Record<CategorySlug, IllustName> = {
  jitsumu: "clipboard",
  nayami: "heart-hands",
  hatarakikata: "wallet",
  tenshoku: "door",
};

export function getMotif(slug: string, category: CategorySlug): IllustName {
  return slugMotif[slug] ?? fallbackByCategory[category];
}

/** カテゴリ配色（カバー画像のグラデーション）。 */
export const categoryGradient: Record<CategorySlug, { from: string; to: string; ink: string }> = {
  jitsumu: { from: "#13a7a2", to: "#7fd8d2", ink: "#0b6764" },
  nayami: { from: "#f4a8b8", to: "#ffd2c2", ink: "#b5475e" },
  hatarakikata: { from: "#f0b450", to: "#ffe0a3", ink: "#a9701a" },
  tenshoku: { from: "#9b8cf0", to: "#cfc1f7", ink: "#5a47a8" },
};

/** slugから決定的な擬似乱数（0..1）を作る。装飾の配置を記事ごとに変えるため。 */
export function hashUnit(seed: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 0..1
  return ((h >>> 0) % 100000) / 100000;
}
