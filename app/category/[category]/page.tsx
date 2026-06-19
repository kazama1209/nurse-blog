import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PostCard } from "@/components/PostCard";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { Illustration } from "@/components/Illustration";
import type { IllustName } from "@/lib/motifs";

const categoryIllust: Record<string, IllustName> = {
  jitsumu: "drip",
  nayami: "heart-hands",
  hatarakikata: "wallet",
  tenshoku: "door",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategory(params.category);
  if (!c) return {};
  return {
    title: `${c.name}の記事一覧`,
    description: c.description,
    alternates: { canonical: `/category/${c.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const c = getCategory(params.category);
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);

  return (
    <Container size="wide" className="max-w-feature py-8">
      <Breadcrumb
        crumbs={[
          { name: "ホーム", url: "/" },
          { name: c.name, url: `/category/${c.slug}` },
        ]}
      />

      <header className="mt-6 mb-10 flex items-center gap-6 border-b border-[color:var(--rule)] pb-8">
        <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-editorial border border-[color:var(--rule)] bg-brand-light/50 p-3 sm:flex md:h-28 md:w-28">
          <Illustration name={categoryIllust[c.slug] ?? "clipboard"} title={c.name} className="h-full w-full" />
        </div>
        <div className="flex-1">
          <span className="eyebrow">Section · {c.shortName}</span>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-4xl">
            {c.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">{c.description}</p>
          <p className="mt-3 text-xs tracking-wide text-gray-400">{posts.length}記事</p>
        </div>
      </header>

      {posts.length ? (
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-gray-400">この カテゴリの記事は準備中です。</p>
      )}
    </Container>
  );
}
