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
import { getPhoto } from "@/lib/photos";
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
  const ogImage = fm.ogImage ?? getPhoto(fm.slug)?.src ?? siteConfig.defaultOgImage;
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
  meta.ogImage = meta.ogImage ?? getPhoto(fm.slug)?.src ?? siteConfig.defaultOgImage;
  const related = getRelatedPosts(fm.slug, 3);

  const crumbs = [
    { name: "ホーム", url: "/" },
    ...(category ? [{ name: category.name, url: `/category/${category.slug}` }] : []),
    { name: fm.title, url: `/blog/${fm.slug}` },
  ];

  return (
    <article>
      <JsonLd data={articleJsonLd(meta)} />

      <Container size="wide" className="max-w-feature pt-6">
        <Breadcrumb crumbs={crumbs} />
      </Container>

      {/* 記事ヘッダー：カバー写真の上にタイトルをセンタリングで重ねるエディトリアル版面 */}
      <Container size="wide" className="max-w-feature pt-5">
        <header className="not-prose relative overflow-hidden rounded-editorial border border-[color:var(--rule)]">
          <CoverImage slug={fm.slug} category={fm.category} variant="hero" showLabel={false} priority />
          {/* 可読性のためのオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 p-6 text-center sm:p-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <CategoryPill category={fm.category} />
              {fm.isPR && <PRBadge />}
            </div>
            <h1 className="mx-auto max-w-3xl font-display text-2xl font-semibold leading-snug text-white drop-shadow-sm sm:text-4xl sm:leading-[1.3]">
              {fm.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/85">
              <time dateTime={toDateOnly(fm.date)}>公開: {formatDateJa(fm.date)}</time>
              {fm.updated && fm.updated !== fm.date && (
                <time dateTime={toDateOnly(fm.updated)}>更新: {formatDateJa(fm.updated)}</time>
              )}
              <span>約{post.readingMinutes}分</span>
            </div>
          </div>
        </header>
        {(() => {
          const photo = getPhoto(fm.slug);
          if (!photo) return null;
          return (
            <p className="not-prose mt-1.5 text-right text-[11px] text-gray-400">
              Photo:{" "}
              <a href={photo.photographerUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-brand">
                {photo.photographer}
              </a>{" "}
              /{" "}
              <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-brand">
                {photo.source}
              </a>
            </p>
          );
        })()}
      </Container>

      {/* リード（大きめ・センタリング）＋PR帯 */}
      <Container size="prose" className="pt-8">
        <p className="not-prose mx-auto max-w-2xl text-center font-display text-lg leading-relaxed text-ink/85 sm:text-xl">
          {fm.description}
        </p>
        <hr className="hairline mx-auto mt-8 w-24" />
        {fm.isPR && (
          <div className="not-prose mt-6">
            <PRBadge variant="banner" />
          </div>
        )}
      </Container>

      {/* 本文 */}
      <Container size="prose" className="py-6">
        <MdxContent source={post.content} />

        {/* タグ */}
        {fm.tags?.length ? (
          <div className="not-prose mt-10 flex flex-wrap gap-2">
            {fm.tags.map((t) => (
              <span key={t} className="pill border border-brand/30 text-brand-dark">
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
