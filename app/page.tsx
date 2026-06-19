import Link from "next/link";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { ParallaxHero } from "@/components/ParallaxHero";
import { Reveal } from "@/components/Reveal";
import { Illustration } from "@/components/Illustration";
import { ScrollScenes, type Scene } from "@/components/ScrollScenes";
import { getAllPostMeta, getPostsByCategory } from "@/lib/posts";
import { categories } from "@/lib/categories";

const scenes: Scene[] = [
  {
    href: "/category/jitsumu",
    kicker: "STEP 01 ｜ 現場の実務",
    emoji: "💉",
    illust: "drip",
    heading: "学校では習わない、現場の小技",
    text: "輸液ポンプの桁間違い、患者誤認、急変の前兆——医療安全の一次情報をもとに、ミスを防ぐ実務の知恵をまとめています。",
    from: "#13a7a2",
    to: "#7fd8d2",
    ink: "#0b6764",
  },
  {
    href: "/category/nayami",
    kicker: "STEP 02 ｜ 悩み・メンタル",
    emoji: "🌷",
    illust: "heart-hands",
    heading: "しんどい時、ひとりじゃない",
    text: "「辞めたい」「同期と比べてつらい」。新人〜若手が抱えがちな悩みに、先輩目線でそっと寄り添います。",
    from: "#f3899e",
    to: "#ffd2c2",
    ink: "#b5475e",
  },
  {
    href: "/category/hatarakikata",
    kicker: "STEP 03 ｜ 働き方・お金",
    emoji: "💴",
    illust: "wallet",
    heading: "知らないと損する、働き方とお金",
    text: "前残業・夜勤手当・有給・給料。知っておきたい権利とお金の話を、一次データをもとに中立的に整理します。",
    from: "#f0b450",
    to: "#ffe0a3",
    ink: "#a9701a",
  },
  {
    href: "/category/tenshoku",
    kicker: "STEP 04 ｜ 転職・職場選び",
    emoji: "🚪",
    illust: "door",
    heading: "後悔しない、職場選び",
    text: "ブラック病院の見抜き方から、美容・訪問・クリニックの実際、転職サービスの使い方まで。逃げ道は、ちゃんとあります。",
    from: "#8f7ce9",
    to: "#cfc1f7",
    ink: "#5a47a8",
  },
];

export default function HomePage() {
  const all = getAllPostMeta();
  const latest = all.slice(0, 6);

  return (
    <>
      <ParallaxHero />

      {/* ピン留めスクロールシーン（4カテゴリの紹介） */}
      <ScrollScenes scenes={scenes} />

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
