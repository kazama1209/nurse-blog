import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryPill } from "@/components/CategoryPill";
import { PRBadge } from "@/components/PRBadge";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Sources } from "@/components/Sources";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";
import { CoverImage } from "@/components/CoverImage";
import { JsonLd } from "@/components/JsonLd";
import { getAllSlugs, getPostBySlug, getRelatedPosts, getAllPostMeta } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { articleJsonLd } from "@/lib/jsonld";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDateJa, toDateOnly } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const url = `/blog/${fm.slug}`;
  const ogImage = fm.ogImage ?? siteConfig.defaultOgImage;
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url: absoluteUrl(url),
      title: fm.title,
      description: fm.description,
      publishedTime: fm.date,
      modifiedTime: fm.updated ?? fm.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fm.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [ogImage],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const category = getCategory(fm.category);
  const meta = getAllPostMeta().find((p) => p.slug === fm.slug)!;
  const related = getRelatedPosts(fm.slug, 3);

  const crumbs = [
    { name: "ホーム", url: "/" },
    ...(category ? [{ name: category.name, url: `/category/${category.slug}` }] : []),
    { name: fm.title, url: `/blog/${fm.slug}` },
  ];

  return (
    <article>
      <JsonLd data={articleJsonLd(meta)} />

      <Container size="prose" className="pt-6">
        <Breadcrumb crumbs={crumbs} />
      </Container>

      {/* 記事ヘッダー */}
      <Container size="prose" className="pt-5">
        <header className="not-prose">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <CategoryPill category={fm.category} />
            {fm.isPR && <PRBadge />}
          </div>
          <h1 className="font-display text-2xl font-bold leading-snug text-ink sm:text-[28px]">
            {fm.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
            <time dateTime={toDateOnly(fm.date)}>公開: {formatDateJa(fm.date)}</time>
            {fm.updated && fm.updated !== fm.date && (
              <time dateTime={toDateOnly(fm.updated)}>更新: {formatDateJa(fm.updated)}</time>
            )}
            <span>📖 約{post.readingMinutes}分</span>
          </div>
          <p className="mt-4 rounded-2xl bg-white/70 p-4 text-[15px] leading-relaxed text-gray-600 ring-1 ring-pink-100">
            {fm.description}
          </p>
        </header>

        {/* ヒーローカバー画像（記事ごとに固有） */}
        <div className="not-prose mt-6 overflow-hidden rounded-3xl shadow-sm ring-1 ring-pink-100">
          <CoverImage slug={fm.slug} category={fm.category} variant="hero" showLabel={false} />
        </div>

        {fm.isPR && (
          <div className="not-prose">
            <PRBadge variant="banner" />
          </div>
        )}
      </Container>

      {/* 本文 */}
      <Container size="prose" className="py-8">
        <MdxContent source={post.content} />

        {/* タグ */}
        {fm.tags?.length ? (
          <div className="not-prose mt-10 flex flex-wrap gap-2">
            {fm.tags.map((t) => (
              <span key={t} className="pill bg-brand-light text-brand-dark">
                #{t}
              </span>
            ))}
          </div>
        ) : null}

        <Sources sources={fm.sources} />
        <ShareButtons slug={fm.slug} title={fm.title} />

        <div className="not-prose mt-8 text-center">
          {category && (
            <Link href={`/category/${category.slug}`} className="btn-soft">
              ← {category.name}の記事一覧へ
            </Link>
          )}
        </div>
      </Container>

      <Container className="pb-8">
        <RelatedPosts posts={related} />
      </Container>
    </article>
  );
}
