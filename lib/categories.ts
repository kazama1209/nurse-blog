/**
 * カテゴリ定義。frontmatter の `category` はここの `slug` を使う。
 * A/B はアフィ無（信頼を貯める柱）、C/D は転職アフィの導線（PR明示）。
 */
export type CategorySlug = "jitsumu" | "nayami" | "hatarakikata" | "tenshoku";

export interface Category {
  slug: CategorySlug;
  /** 記事案でのラベル（A/B/C/D） */
  group: "A" | "B" | "C" | "D";
  name: string;
  shortName: string;
  emoji: string;
  description: string;
  /** このカテゴリの記事にアフィリンク枠を置いてよいか */
  allowsAffiliate: boolean;
}

export const categories: Category[] = [
  {
    slug: "jitsumu",
    group: "A",
    name: "現場の実務・小技",
    shortName: "実務",
    emoji: "💉",
    description:
      "学校では習わないけれど、現場のミスを防ぎ仕事をラクにする実務の知恵。医療安全情報など一次情報をもとにまとめています。",
    allowsAffiliate: false,
  },
  {
    slug: "nayami",
    group: "B",
    name: "新人の悩み・メンタル",
    shortName: "悩み",
    emoji: "🌷",
    description:
      "「辞めたい」「同期と比べてしんどい」——新人〜若手ナースが抱えがちな悩みに、先輩目線でそっと寄り添います。",
    allowsAffiliate: false,
  },
  {
    slug: "hatarakikata",
    group: "C",
    name: "働き方・お金・権利",
    shortName: "働き方",
    emoji: "💴",
    description:
      "前残業・夜勤手当・有給・給料——知らないと損する看護師の働き方とお金の話。一次データをもとに現実を整理します。",
    allowsAffiliate: true,
  },
  {
    slug: "tenshoku",
    group: "D",
    name: "転職・職場選び",
    shortName: "転職",
    emoji: "🚪",
    description:
      "ブラック病院の見抜き方から美容・訪問・クリニックまで。後悔しない職場選びと転職サービスの使い方を解説します。",
    allowsAffiliate: true,
  },
];

export const categoryMap: Record<CategorySlug, Category> = categories.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);

export function getCategory(slug: string): Category | undefined {
  return categoryMap[slug as CategorySlug];
}
