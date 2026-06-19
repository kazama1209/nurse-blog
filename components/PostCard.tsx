import Link from "next/link";
import { type PostMeta } from "@/lib/posts";
import { CategoryPill } from "./CategoryPill";
import { PRBadge } from "./PRBadge";
import { formatDateJa, toDateOnly } from "@/lib/format";

/** 記事カード。トップ・カテゴリ・関連記事で使用。 */
export function PostCard({ post, priority = false }: { post: PostMeta; priority?: boolean }) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryPill category={post.category} asLink={false} />
            {post.isPR && <PRBadge />}
            <time
              dateTime={toDateOnly(post.date)}
              className="ml-auto text-xs text-gray-400"
            >
              {formatDateJa(post.date)}
            </time>
          </div>
          <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {post.description}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-gray-400">
            <span>📖 約{post.readingMinutes}分</span>
            <span className="ml-auto font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
              続きを読む →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
