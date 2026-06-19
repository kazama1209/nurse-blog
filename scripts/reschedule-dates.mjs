/**
 * 記事の公開日時を「週数回ペースで約10週運用してきた」風に散らす。
 * frontmatter の date / updated を下記マッピングで上書きする（動的な現在時刻は使わない）。
 *   node scripts/reschedule-dates.mjs
 *
 * 方針: 期間2026-04-06〜06-20、全50本を週3〜4本ペース運用してきた風に散らす。
 * 間隔は不規則（1〜4日空き・たまに同日近接・直近は少し密）。動的な現在時刻は使わずISO固定。
 * PR記事(C働き方/D転職)と非PR記事(A実務/B悩み)を全期間で交互配置し、
 * 新着（最新6本）が「PRばかり」にならないよう非PRを最低2〜3本混ぜる（最新=2026-06-20）。
 */
import fs from "node:fs";
import path from "node:path";

const POSTS = path.join(process.cwd(), "content", "posts");

// slug -> 公開日時(JST固定)。古い順に並べてある（PR/非PRが交互になるよう配置）。
const schedule = {
  // ── 4月（立ち上げ） ──
  "iv-pump-10x-mistake": "2026-04-06T21:40:00+09:00", // A実務
  "mae-zangyo": "2026-04-07T22:30:00+09:00", // C働き方(PR)
  "first-year-quit": "2026-04-09T21:15:00+09:00", // B悩み
  "night-shift-worth": "2026-04-10T23:05:00+09:00", // C働き方(PR)
  "patient-misidentification": "2026-04-13T20:05:00+09:00", // A実務
  "nurse-no-night-shift-jobs": "2026-04-14T22:40:00+09:00", // C働き方(PR)
  "kyuhen-respiratory-rate": "2026-04-16T21:30:00+09:00", // A実務
  "salary-not-rising": "2026-04-17T23:10:00+09:00", // C働き方(PR)
  "comparing-with-peers": "2026-04-20T22:50:00+09:00", // B悩み
  "job-posting-red-flags": "2026-04-21T20:20:00+09:00", // D転職(PR)
  "verbal-order-unit": "2026-04-24T23:25:00+09:00", // A実務
  "night-shift-allowance": "2026-04-25T21:00:00+09:00", // C働き方(PR)
  "first-night-shift": "2026-04-28T21:05:00+09:00", // B悩み
  "clinic-outpatient": "2026-04-29T22:45:00+09:00", // D転職(PR)
  // ── 5月 ──
  "insulin-unit-ml": "2026-05-02T22:40:00+09:00", // A実務
  "paid-leave": "2026-05-03T20:50:00+09:00", // C働き方(PR)
  "doctor-call-isbarc": "2026-05-06T23:15:00+09:00", // A実務
  "health-checkup-nurse": "2026-05-07T21:25:00+09:00", // C働き方(PR)
  "preceptor-mismatch": "2026-05-09T21:20:00+09:00", // B悩み
  "white-hospital-features": "2026-05-10T22:55:00+09:00", // D転職(PR)
  "blood-draw-tips": "2026-05-13T20:10:00+09:00", // A実務
  "take-home-pay": "2026-05-14T23:00:00+09:00", // C働き方(PR)
  "pain-assessment-scale": "2026-05-16T21:35:00+09:00", // A実務
  "biyo-clinic-transfer": "2026-05-17T22:20:00+09:00", // D転職(PR)
  "multitasking-priority": "2026-05-20T23:00:00+09:00", // B悩み
  "industrial-nurse": "2026-05-21T21:10:00+09:00", // C働き方(PR)
  "pay-vs-responsibility": "2026-05-23T20:30:00+09:00", // B悩み
  "motivation-letter-clinic": "2026-05-24T22:50:00+09:00", // D転職(PR)
  "handover-memo": "2026-05-27T22:20:00+09:00", // A実務
  "non-ward-options": "2026-05-28T21:40:00+09:00", // D転職(PR)
  "okyoku-relationship": "2026-05-30T20:45:00+09:00", // B悩み
  "crc-clinical-research": "2026-05-31T22:35:00+09:00", // C働き方(PR)
  // ── 6月（直近・少し密） ──
  "tube-feeding-position-check": "2026-06-02T23:05:00+09:00", // A実務
  "interview-questions-7": "2026-06-03T21:15:00+09:00", // D転職(PR)
  "pressure-ulcer-staging": "2026-06-05T20:25:00+09:00", // A実務
  "best-time-to-change": "2026-06-06T22:55:00+09:00", // D転職(PR)
  "incident-report-writing": "2026-06-08T21:00:00+09:00", // A実務
  "job-change-flow": "2026-06-09T22:40:00+09:00", // D転職(PR)
  "bp-measurement-errors": "2026-06-11T20:35:00+09:00", // A実務
  "resignation-how-to-say": "2026-06-12T22:15:00+09:00", // D転職(PR)
  "marriage-childbirth-worry": "2026-06-14T20:50:00+09:00", // B悩み
  "black-hospital-signs": "2026-06-15T22:10:00+09:00", // D転職(PR)
  "medication-6rights": "2026-06-16T21:30:00+09:00", // A実務（新着に非PR）
  "visiting-nurse": "2026-06-17T23:00:00+09:00", // D転職(PR)
  "fall-prevention": "2026-06-18T20:40:00+09:00", // A実務（新着に非PR）
  "breaking-point-signs": "2026-06-18T22:30:00+09:00", // B悩み（新着に非PR）
  "stopcock-iv-leak": "2026-06-19T21:05:00+09:00", // A実務（新着に非PR）
  "night-shift-aftermath": "2026-06-19T23:15:00+09:00", // B悩み（新着に非PR）
  "second-victim": "2026-06-20T20:20:00+09:00", // B悩み（新着に非PR）
  "nurse-job-agency-guide": "2026-06-20T22:30:00+09:00", // D転職(PR)本丸＝最新
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
