import Link from "next/link";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { CategoryPill } from "@/components/CategoryPill";
import { getAllPostMeta, getPostsByCategory } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const all = getAllPostMeta();
  const latest = all.slice(0, 6);

  return (
    <>
      {/* ヒーロー */}
      <section className="relative overflow-hidden">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="pill mb-5 bg-white/80 text-brand-dark ring-1 ring-pink-100">
              🌸 看護師のためのやさしいメモ帳
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              学校では教わらない、
              <br className="hidden sm:block" />
              <span className="text-brand">現場の逃げ道。</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-gray-600">
              {siteConfig.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/category/jitsumu" className="btn-primary">
                実務の小技を読む
              </Link>
              <Link href="/category/nayami" className="btn-soft">
                新人の悩みに寄り添う記事
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* カテゴリ案内 */}
      <Container className="pb-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="card card-hover flex flex-col gap-1 p-5"
            >
              <span className="text-2xl" aria-hidden>{c.emoji}</span>
              <span className="mt-1 font-bold text-brand-dark">{c.name}</span>
              <span className="text-xs leading-relaxed text-gray-500">{c.description}</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* 新着記事 */}
      <Container className="py-12">
        <div className="mb-7 flex items-end justify-between">
          <h2 className="heading-deco text-2xl font-bold text-ink">新着記事</h2>
          <span className="text-sm text-gray-400">全{all.length}記事</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <PostCard key={p.slug} post={p} priority={i < 3} />
          ))}
        </div>
      </Container>

      {/* カテゴリ別ピックアップ */}
      {categories.map((c) => {
        const posts = getPostsByCategory(c.slug).slice(0, 3);
        if (!posts.length) return null;
        return (
          <Container key={c.slug} className="py-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
                <span aria-hidden>{c.emoji}</span>
                {c.name}
              </h2>
              <Link href={`/category/${c.slug}`} className="text-sm font-semibold text-brand hover:underline">
                もっと見る →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        );
      })}

      {/* CTA 帯 */}
      <Container className="py-12">
        <div className="card flex flex-col items-center gap-4 bg-gradient-to-br from-brand-light to-pink-50 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-bold text-brand-dark">
            「今の働き方、しんどいかも」と思ったら
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-gray-600">
            辞める・辞めないの前に、まずは知ること。働き方やお金、職場選びの選択肢を、
            一次情報をもとに中立的にまとめています。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/category/hatarakikata" className="btn-soft">働き方・お金を知る</Link>
            <Link href="/category/tenshoku" className="btn-primary">転職・職場選びを読む</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
