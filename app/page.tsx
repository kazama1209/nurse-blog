import Link from "next/link";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { ParallaxHero } from "@/components/ParallaxHero";
import { Reveal } from "@/components/Reveal";
import { Illustration } from "@/components/Illustration";
import { getAllPostMeta, getPostsByCategory } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { getMotif } from "@/lib/motifs";

const categoryIllust = {
  jitsumu: "drip",
  nayami: "heart-hands",
  hatarakikata: "wallet",
  tenshoku: "door",
} as const;

export default function HomePage() {
  const all = getAllPostMeta();
  const latest = all.slice(0, 6);

  return (
    <>
      <ParallaxHero />

      {/* カテゴリ案内 */}
      <Container className="pb-4 pt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link
                href={`/category/${c.slug}`}
                className="card card-hover flex h-full flex-col gap-2 p-5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light/70 p-2">
                  <Illustration name={categoryIllust[c.slug]} className="h-full w-full" />
                </div>
                <span className="mt-1 font-bold text-brand-dark">{c.name}</span>
                <span className="text-xs leading-relaxed text-gray-500">{c.description}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* 新着記事 */}
      <Container className="py-12">
        <Reveal>
          <div className="mb-7 flex items-end justify-between">
            <h2 className="heading-deco text-2xl font-bold text-ink">新着記事</h2>
            <span className="text-sm text-gray-400">全{all.length}記事</span>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* カテゴリ別ピックアップ */}
      {categories.map((c) => {
        const posts = getPostsByCategory(c.slug).slice(0, 3);
        if (!posts.length) return null;
        return (
          <Container key={c.slug} className="py-8">
            <Reveal>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
                  <span aria-hidden>{c.emoji}</span>
                  {c.name}
                </h2>
                <Link href={`/category/${c.slug}`} className="text-sm font-semibold text-brand hover:underline">
                  もっと見る →
                </Link>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        );
      })}

      {/* CTA 帯 */}
      <Container className="py-12">
        <Reveal>
          <div className="card relative overflow-hidden bg-gradient-to-br from-brand-light to-pink-50 p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-6 -top-6 hidden h-40 w-40 opacity-80 sm:block">
              <Illustration name="compass" className="h-full w-full" />
            </div>
            <div className="relative max-w-xl">
              <h2 className="font-display text-2xl font-bold text-brand-dark">
                「今の働き方、しんどいかも」と思ったら
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                辞める・辞めないの前に、まずは知ること。働き方やお金、職場選びの選択肢を、
                一次情報をもとに中立的にまとめています。
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/category/hatarakikata" className="btn-soft">働き方・お金を知る</Link>
                <Link href="/category/tenshoku" className="btn-primary">転職・職場選びを読む</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
