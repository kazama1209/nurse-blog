/**
 * 記事の審査前セルフチェック（spec §6 のチェックリストを機械的に検証）。
 *   npm run check:posts
 * - frontmatter 必須項目
 * - 本文2000字以上
 * - カテゴリの妥当性
 * - PR記事に isPR フラグ
 * - 出典の有無（A/Cの医療・数値記事は推奨）
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const VALID_CATEGORIES = ["jitsumu", "nayami", "hatarakikata", "tenshoku"];

let errors = 0;
let warnings = 0;

function err(file: string, msg: string) {
  console.error(`  ✗ [${file}] ${msg}`);
  errors++;
}
function warn(file: string, msg: string) {
  console.warn(`  ⚠ [${file}] ${msg}`);
  warnings++;
}

const files = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
  : [];

console.log(`\n📋 ${files.length} 記事をチェックします...\n`);

const seenSlugs = new Set<string>();

for (const file of files) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Record<string, unknown>;

  for (const key of ["title", "description", "slug", "category", "date"]) {
    if (!fm[key]) err(file, `frontmatter に "${key}" がありません`);
  }
  if (fm.slug) {
    if (seenSlugs.has(fm.slug as string)) err(file, `slug が重複: ${fm.slug}`);
    seenSlugs.add(fm.slug as string);
  }
  if (fm.category && !VALID_CATEGORIES.includes(fm.category as string)) {
    err(file, `不正な category: ${fm.category}`);
  }
  const charCount = content.replace(/\s/g, "").length;
  if (charCount < 2000) err(file, `本文が${charCount}字（2000字未満）`);

  const isPR = fm.isPR === true;
  const isAffiliateCat = ["hatarakikata", "tenshoku"].includes(fm.category as string);
  if (content.includes("AffiliateSlot") && !isPR) {
    err(file, "AffiliateSlot を使っているのに isPR: true がありません");
  }
  if (fm.category === "tenshoku" && !isPR) {
    warn(file, "転職カテゴリですが isPR が立っていません（PR明示を確認）");
  }
  if ((fm.category === "jitsumu" || isAffiliateCat) && !(fm.sources as unknown[])?.length) {
    warn(file, "出典(sources)が空です（数値・医療記述には出典を推奨）");
  }
}

console.log(`\n結果: エラー ${errors} 件 / 警告 ${warnings} 件\n`);
if (errors > 0) process.exit(1);
