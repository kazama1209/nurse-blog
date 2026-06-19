/**
 * 記事の公開日時を「週数回ペースで約10週運用してきた」風に散らす。
 * frontmatter の date / updated を下記マッピングで上書きする（動的な現在時刻は使わない）。
 *   node scripts/reschedule-dates.mjs
 *
 * 方針: 期間2026-04-06〜06-19、間隔は不規則（同日2本/GW前後クラスタ/数日空き）。
 * PR記事(C働き方/D転職)と非PR記事(A実務/B悩み)を全期間で交互配置し、
 * 新着（最新6本）が「PRばかり」にならないよう散らす（最新は転職本丸 agency-guide）。
 */
import fs from "node:fs";
import path from "node:path";

const POSTS = path.join(process.cwd(), "content", "posts");

// slug -> 公開日時(JST固定)。古い順に並べてある（PR/非PRが交互になるよう配置）。
const schedule = {
  "iv-pump-10x-mistake": "2026-04-06T21:40:00+09:00", // A実務
  "first-year-quit": "2026-04-08T22:15:00+09:00", // B悩み
  "patient-misidentification": "2026-04-11T20:05:00+09:00", // A実務
  "mae-zangyo": "2026-04-14T23:10:00+09:00", // C働き方(PR)
  "kyuhen-respiratory-rate": "2026-04-16T21:30:00+09:00", // A実務
  "comparing-with-peers": "2026-04-19T22:50:00+09:00", // B悩み
  "night-shift-worth": "2026-04-21T20:20:00+09:00", // C働き方(PR)
  "verbal-order-unit": "2026-04-25T23:25:00+09:00", // A実務
  "first-night-shift": "2026-04-28T21:05:00+09:00", // B悩み
  "insulin-unit-ml": "2026-05-02T22:40:00+09:00", // A実務
  "salary-not-rising": "2026-05-05T20:50:00+09:00", // C働き方(PR)
  "doctor-call-isbarc": "2026-05-06T23:15:00+09:00", // A実務
  "preceptor-mismatch": "2026-05-09T21:20:00+09:00", // B悩み
  "paid-leave": "2026-05-12T22:35:00+09:00", // C働き方(PR)
  "blood-draw-tips": "2026-05-15T20:10:00+09:00", // A実務
  "multitasking-priority": "2026-05-17T23:00:00+09:00", // B悩み
  "job-posting-red-flags": "2026-05-20T21:45:00+09:00", // C働き方(PR)
  "handover-memo": "2026-05-23T22:20:00+09:00", // A実務
  "biyo-clinic-transfer": "2026-05-26T20:35:00+09:00", // D転職(PR)
  "tube-feeding-position-check": "2026-05-28T23:05:00+09:00", // A実務
  "take-home-pay": "2026-05-31T21:15:00+09:00", // C働き方(PR)
  "incident-report-writing": "2026-06-02T20:25:00+09:00", // A実務
  "non-ward-options": "2026-06-02T22:50:00+09:00", // D転職(PR)
  "clinic-outpatient": "2026-06-06T23:20:00+09:00", // D転職(PR)
  "fall-prevention": "2026-06-09T21:35:00+09:00", // A実務（新着に非PR）
  "black-hospital-signs": "2026-06-11T22:10:00+09:00", // D転職(PR)
  "stopcock-iv-leak": "2026-06-13T20:40:00+09:00", // A実務（新着に非PR）
  "visiting-nurse": "2026-06-15T23:00:00+09:00", // D転職(PR)
  "second-victim": "2026-06-17T21:50:00+09:00", // B悩み（新着に非PR）
  "nurse-job-agency-guide": "2026-06-19T22:10:00+09:00", // D転職(PR)本丸＝最新
};

let changed = 0;
let missing = [];

for (const [slug, iso] of Object.entries(schedule)) {
  const file = path.join(POSTS, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    missing.push(slug);
    continue;
  }
  let raw = fs.readFileSync(file, "utf8");
  // frontmatter内の date: / updated: 行のみを置換（本文に同形の行は無い）
  raw = raw.replace(/^date:\s*".*"$/m, `date: "${iso}"`);
  raw = raw.replace(/^updated:\s*".*"$/m, `updated: "${iso}"`);
  fs.writeFileSync(file, raw);
  changed++;
  console.log(`✓ ${slug.padEnd(28)} ${iso}`);
}

if (missing.length) console.warn(`\n⚠ 見つからないslug: ${missing.join(", ")}`);
console.log(`\n完了: ${changed}件 更新`);
