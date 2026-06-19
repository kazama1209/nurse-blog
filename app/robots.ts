import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

/** allow: / ＋ sitemap参照。審査・インデックスのため noindex にしない。 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
