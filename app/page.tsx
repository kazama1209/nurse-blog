import Link from "next/link";
import { Container } from "@/components/Container";
import { PostCard, PostCardFeatured, PostListRow } from "@/components/PostCard";
import { Reveal } from "@/components/Reveal";
import { Illustration } from "@/components/Illustration";
import { getAllPostMeta, getPostsByCategory } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

const categoryIllust = {
  jitsumu: "drip",
  nayami: "heart-hands",
  hatarakikata: "wallet",
  tenshoku: "door",
} as const;

export default function HomePage() {
  const all = getAllPostMeta();
  const featured = all[0];
  const recent = all.slice(1, 9); // 特集の次から目次リスト

  return (
    <>
      {/* マストヘッド帯：誌名・号数風のリード */}
      <Container size="wide" className="max-w-feature pt-10 sm:pt-12">
        <Reveal>
          <div className="flex flex-col items-center gap-3 border-b border-[color:var(--rule)] pb-8 text-center">
            <span className="eyebrow">Editorial for Nurses</span>
            <h1 className="font-display text-2xl font-semibold leading-snug text-ink sm:text-[34px]">
              学校では教わらない、現場の逃げ道。
            </h1>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-gray-600">
              {siteConfig.description}
            </p>
          </div>
        </Reveal>
      </Container>

      {/* 特集（最新1本を大判フィーチャー） */}
      {featured && (
        <Container size="wide" className="max-w-feature pt-10">
          <Reveal>
            <PostCardFeatured post={featured} />
          </Reveal>
        </Container>
      )}

      {/* 新着（雑誌の目次風ナンバリング・リスト） */}
      {recent.length > 0 && (
        <Container size="wide" className="max-w-feature py-14">
          <Reveal>
            <div className="mb-2 flex items-end justify-between heading-deco">
              <h2 className="font-display text-2xl font-semibold text-ink">
                新着記事
                <span className="ml-3 align-middle text-sm font-normal tracking-widest text-gray-400">
                  CONTENTS
                </span>
              </h2>
              <span className="pb-1 text-xs tracking-wide text-gray-400">全{all.length}記事</span>
            </div>
          </Reveal>
          <ol className="mt-2 divide-y divide-[color:var(--rule)]">
            {recent.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 5) * 50} as="div">
                <PostListRow post={p} index={i} />
              </Reveal>
            ))}
          </ol>
        </Container>
      )}

      {/* カテゴリ案内（罫線で区切る4枠） */}
      <Container size="wide" className="max-w-feature pb-6">
        <Reveal>
          <h2 className="heading-deco mb-8 font-display text-2xl font-semibold text-ink">
            カテゴリから探す
            <span className="ml-3 align-middle text-sm font-normal tracking-widest text-gray-400">
              SECTIONS
            </span>
          </h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-editorial border border-[color:var(--rule)] bg-[color:var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60} className="h-full">
              <Link
                href={`/category/${c.slug}`}
                className="group flex h-full flex-col gap-3 bg-white p-6 transition-colors hover:bg-brand-light/40"
              >
                <span className="editorial-num text-lg">0{i + 1}</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-brand-light/60 p-2">
                  <Illustration name={categoryIllust[c.slug]} className="h-full w-full" />
                </div>
                <span className="font-display text-lg font-semibold text-brand-dark">{c.name}</span>
                <span className="text-xs leading-relaxed text-gray-500">{c.description}</span>
                <span className="mt-auto pt-1 text-xs font-semibold tracking-wide text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  一覧を見る →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* カテゴリ別ピックアップ */}
      {categories.map((c) => {
        const posts = getPostsByCategory(c.slug).slice(0, 3);
        if (!posts.length) return null;
        return (
          <Container key={c.slug} size="wide" className="max-w-feature py-8">
            <Reveal>
              <div className="mb-6 flex items-center justify-between border-b border-[color:var(--rule)] pb-3">
                <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold text-ink">
                  <span className="eyebrow">{c.shortName}</span>
                  {c.name}
                </h2>
                <Link
                  href={`/category/${c.slug}`}
                  className="text-xs font-semibold tracking-wide text-brand hover:text-brand-dark"
                >
                  もっと見る →
                </Link>
              </div>
            </Reveal>
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 70}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        );
      })}

      {/* CTA 帯 */}
      <Container size="wide" className="max-w-feature py-12">
        <Reveal>
          <div className="card relative overflow-hidden p-8 sm:p-11">
            <div className="pointer-events-none absolute -right-6 -top-6 hidden h-40 w-40 opacity-70 sm:block">
              <Illustration name="compass" className="h-full w-full" />
            </div>
            <div className="relative max-w-xl">
              <span className="eyebrow">Column</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                「今の働き方、しんどいかも」と思ったら
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                辞める・辞めないの前に、まずは知ること。働き方やお金、職場選びの選択肢を、
                一次情報をもとに中立的にまとめています。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
