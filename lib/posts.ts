import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { type CategorySlug, getCategory } from "./categories";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostSource {
  /** 表示名（例: 日本医療機能評価機構 医療安全情報 No.173） */
  label: string;
  /** 出典URL */
  url: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: CategorySlug;
  /** ISO文字列（JST固定・ハードコード）。例: 2026-05-21T20:10:00+09:00 */
  date: string;
  updated?: string;
  tags?: string[];
  ogImage?: string;
  /** アフィ/PRを含む記事は true */
  isPR?: boolean;
  sources?: PostSource[];
  /** 関連記事の slug を明示指定（無ければ同カテゴリから自動） */
  related?: string[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  /** 読了時間（分） */
  readingMinutes: number;
}

export interface PostMeta extends PostFrontmatter {
  readingMinutes: number;
  categoryName: string;
}

function readAllFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseFile(file: string): Post {
  const full = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  if (!fm.slug) fm.slug = file.replace(/\.mdx$/, "");
  // 日本語の読了時間は文字数ベースで概算（約500字/分）
  const charCount = content.replace(/\s/g, "").length;
  const minutes = Math.max(1, Math.round(charCount / 500));
  return {
    frontmatter: fm,
    content,
    readingMinutes: minutes || Math.ceil(readingTime(content).minutes),
  };
}

let _cache: Post[] | null = null;

function loadAll(): Post[] {
  // 本番ビルド時のみキャッシュ（30ファイルの再読込を避ける）。
  // 開発時はキャッシュせず毎回読み直し、frontmatter（日付など）の編集を即反映する。
  const useCache = process.env.NODE_ENV === "production";
  if (useCache && _cache) return _cache;

  const posts = readAllFiles().map(parseFile);
  // 公開日時の新しい順（降順）。同日時はslugで安定ソート。
  posts.sort((a, b) => {
    const diff =
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    return diff !== 0 ? diff : a.frontmatter.slug.localeCompare(b.frontmatter.slug);
  });

  if (useCache) _cache = posts;
  return posts;
}

export function getAllPosts(): Post[] {
  return loadAll();
}

export function getAllPostMeta(): PostMeta[] {
  return loadAll().map((p) => toMeta(p));
}

function toMeta(p: Post): PostMeta {
  return {
    ...p.frontmatter,
    readingMinutes: p.readingMinutes,
    categoryName: getCategory(p.frontmatter.category)?.name ?? p.frontmatter.category,
  };
}

export function getPostBySlug(slug: string): Post | undefined {
  return loadAll().find((p) => p.frontmatter.slug === slug);
}

export function getAllSlugs(): string[] {
  return loadAll().map((p) => p.frontmatter.slug);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostMeta().filter((p) => p.category === category);
}

/**
 * 関連記事を返す。frontmatter.related があればそれを優先、
 * 無ければ同カテゴリ→他カテゴリの順で新着から補完。
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPostMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const result: PostMeta[] = [];
  const pushUnique = (p: PostMeta) => {
    if (p.slug !== slug && !result.some((r) => r.slug === p.slug)) result.push(p);
  };

  if (current.related?.length) {
    current.related.forEach((rs) => {
      const found = all.find((p) => p.slug === rs);
      if (found) pushUnique(found);
    });
  }
  // 同カテゴリで補完
  all.filter((p) => p.category === current.category).forEach(pushUnique);
  // それでも足りなければ全体から補完
  all.forEach(pushUnique);

  return result.slice(0, limit);
}

/** タグ一覧（記事数つき） */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  getAllPostMeta().forEach((p) => {
    (p.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));
  });
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
