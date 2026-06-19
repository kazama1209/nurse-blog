import Link from "next/link";
import { type PostMeta } from "@/lib/posts";
import { PRBadge } from "./PRBadge";
import { CoverImage } from "./CoverImage";
import { formatDateJa, toDateOnly } from "@/lib/format";

/** 記事カード（カバー画像付き）。トップ・カテゴリ・関連記事で使用。 */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.04]">
            <CoverImage slug={post.slug} category={post.category} />
          </div>
          {post.isPR && (
            <span className="absolute right-3 top-3">
              <PRBadge />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <time dateTime={toDateOnly(post.date)}>{formatDateJa(post.date)}</time>
            <span aria-hidden>·</span>
            <span>📖 約{post.readingMinutes}分</span>
          </div>
          <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {post.description}
          </p>
          <span className="mt-auto pt-1 text-xs font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
            続きを読む →
          </span>
        </div>
      </Link>
    </article>
  );
}
