import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/jsonld";

/** パンくず（表示＋BreadcrumbList JSON-LD）。crumbs は Home から末尾（現在地）まで。 */
export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="パンくず" className="not-prose text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={c.url} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="font-medium text-gray-700" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.url} className="hover:text-brand">
                    {c.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden className="text-gray-300">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
