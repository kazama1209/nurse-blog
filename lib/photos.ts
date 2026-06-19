import credits from "@/content/photo-credits.json";

export interface PhotoCredit {
  photographer: string;
  photographerUrl: string;
  url: string;
  alt: string;
  source: string;
}

export interface Photo extends PhotoCredit {
  src: string;
}

const map = credits as Record<string, PhotoCredit>;

/** 記事slugのカバー写真（public/images/posts/<slug>.jpg）。無ければnull→SVGカバーにフォールバック。 */
export function getPhoto(slug: string): Photo | null {
  const c = map[slug];
  if (!c) return null;
  return { src: `/images/posts/${slug}.jpg`, ...c };
}

export function hasPhoto(slug: string): boolean {
  return Boolean(map[slug]);
}
