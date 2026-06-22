import { siteConfig, absoluteUrl } from "./site";
import type { PostMeta } from "./posts";

/** サイト全体（Organization + WebSite）。layout で出力。 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ja",
    description: siteConfig.description,
  };
}

/** 記事ページの Article 構造化データ。datePublished/dateModified は frontmatter を参照（動的時刻にしない）。 */
export function articleJsonLd(post: PostMeta) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
    image: absoluteUrl(post.ogImage ?? siteConfig.defaultOgImage),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "ja",
    keywords: (post.tags ?? []).join(", "),
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.url),
    })),
  };
}
