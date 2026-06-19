/**
 * 各記事のカバー写真を Pexels から取得して public/images/posts/<slug>.jpg に保存する。
 * Pex: 無料・帰属義務なし（ただし credit は推奨 → content/photo-credits.json に保存）。
 *
 * 使い方:
 *   PEXELS_API_KEY=xxxx node scripts/fetch-photos.mjs
 *   （キー未指定時は ~/Workspace/ai-video-pipeline/backend/.env から読む）
 *   再取得: node scripts/fetch-photos.mjs --force
 *
 * 画像は自前で public/ に保存・コミットするため、実行後はAPIキー不要。
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "images", "posts");
const CREDITS = path.join(ROOT, "content", "photo-credits.json");
const FORCE = process.argv.includes("--force");

function loadKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY.trim();
  const envPath = path.join(os.homedir(), "Workspace", "ai-video-pipeline", "backend", ".env");
  try {
    const txt = fs.readFileSync(envPath, "utf8");
    const m = txt.match(/^PEXELS_API_KEY\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {}
  return null;
}

// slug -> Pexels 検索クエリ（記事テーマに沿った写真）
const queries = {
  "iv-pump-10x-mistake": "iv drip infusion hospital",
  "patient-misidentification": "nurse patient hospital care",
  "kyuhen-respiratory-rate": "patient vital signs monitor",
  "verbal-order-unit": "nurses talking hospital",
  "doctor-call-isbarc": "nurse phone call hospital",
  "insulin-unit-ml": "insulin syringe injection",
  "tube-feeding-position-check": "hospital patient bed care",
  "handover-memo": "nurse writing notes clipboard",
  "blood-draw-tips": "blood test nurse arm",
  "incident-report-writing": "nurse writing document desk",
  "fall-prevention": "hospital bed elderly care",
  "stopcock-iv-leak": "intravenous line drip hospital",
  "first-year-quit": "tired stressed woman window",
  "comparing-with-peers": "nurses team hospital",
  "first-night-shift": "hospital corridor night",
  "preceptor-mismatch": "two nurses talking",
  "multitasking-priority": "busy nurse hospital hallway",
  "second-victim": "woman comforting support",
  "mae-zangyo": "clock morning office",
  "night-shift-worth": "hospital night light",
  "salary-not-rising": "calculator money desk",
  "paid-leave": "calendar planner desk",
  "job-posting-red-flags": "job search laptop woman",
  "take-home-pay": "saving coins money jar",
  "black-hospital-signs": "hospital building exterior",
  "biyo-clinic-transfer": "beauty clinic skincare woman",
  "visiting-nurse": "home care nurse elderly",
  "clinic-outpatient": "clinic reception medical",
  "non-ward-options": "business woman office japan",
  "nurse-job-agency-guide": "career consultation meeting desk",
};

async function searchPhoto(key, query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query,
  )}&orientation=landscape&size=large&per_page=6`;
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = await res.json();
  const photo = (data.photos ?? []).find((p) => p.width >= p.height) ?? data.photos?.[0];
  return photo ?? null;
}

async function download(urlStr, dest) {
  const res = await fetch(urlStr);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  const key = loadKey();
  if (!key) {
    console.error("✗ PEXELS_API_KEY が見つかりません。環境変数で渡すか backend/.env を確認してください。");
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const credits = fs.existsSync(CREDITS) ? JSON.parse(fs.readFileSync(CREDITS, "utf8")) : {};

  const slugs = Object.keys(queries);
  let ok = 0;
  for (const slug of slugs) {
    const dest = path.join(OUT_DIR, `${slug}.jpg`);
    if (!FORCE && fs.existsSync(dest) && credits[slug]) {
      console.log(`· skip ${slug}（既存）`);
      ok++;
      continue;
    }
    try {
      const p = await searchPhoto(key, queries[slug]);
      if (!p) {
        console.warn(`⚠ ${slug}: 写真なし（クエリ: ${queries[slug]}）`);
        continue;
      }
      const src = p.src.landscape ?? p.src.large ?? p.src.original;
      const bytes = await download(src, dest);
      credits[slug] = {
        photographer: p.photographer,
        photographerUrl: p.photographer_url,
        url: p.url,
        alt: p.alt || queries[slug],
        source: "Pexels",
      };
      ok++;
      console.log(`✓ ${slug}  (${Math.round(bytes / 1024)}KB)  by ${p.photographer}`);
      await new Promise((r) => setTimeout(r, 250));
    } catch (e) {
      console.warn(`⚠ ${slug}: ${e.message}`);
    }
  }
  fs.writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + "\n");
  console.log(`\n完了: ${ok}/${slugs.length} 件。credits → ${path.relative(ROOT, CREDITS)}`);
}

main();
