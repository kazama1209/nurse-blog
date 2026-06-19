import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { type ReactNode } from "react";
import { Callout } from "./Callout";
import { MedicalNote } from "./MedicalNote";
import { AffiliateSlot } from "./AffiliateSlot";
import { Illust } from "./Illust";
import { PRBadge } from "../PRBadge";

/** 内部リンクは next/link、外部リンクは別タブで開く。 */
function SmartLink({ href = "", children }: { href?: string; children?: ReactNode }) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className="font-medium text-brand link-underline">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand link-underline"
    >
      {children}
    </a>
  );
}

const components = {
  a: SmartLink,
  Callout,
  MedicalNote,
  AffiliateSlot,
  Illust,
  PRBadge,
};

/** MDX本文をレンダリング（RSC）。記事ページから本文文字列を渡す。 */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral prose-headings:scroll-mt-24 max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
