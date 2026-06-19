import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

/** 全記事＋固定ページ＋カテゴリページを出力。lastModified は frontmatter を参照（動的時刻にしない）。 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();

  const staticPages = ["/", "/about", "/privacy-policy", "/disclaimer", "/contact"].map((p) => ({
    url: absoluteUrl(p),
    lastModified: new Date("2026-06-19T22:10:00+09:00"),
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : 0.5,
  }));

  const categoryPages = categories.map((c) => ({
    url: absoluteUrl(`/category/${c.slug}`),
    lastModified: new Date("2026-06-19T22:10:00+09:00"),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const postPages = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...postPages];
}
