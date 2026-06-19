import Link from "next/link";
import { type PostMeta } from "@/lib/posts";
import { PRBadge } from "./PRBadge";
import { CoverImage } from "./CoverImage";
import { getCategory } from "@/lib/categories";
import { formatDateJa, toDateOnly } from "@/lib/format";

/** 記事カード（エディトリアル調）。トップ・カテゴリ・関連記事で使用。 */
export function PostCard({ post }: { post: PostMeta }) {
  const cat = getCategory(post.category);
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b border-[color:var(--rule)]">
          <div className="transition-transform duration-500 group-hover:scale-[1.03]">
            <CoverImage slug={post.slug} category={post.category} showLabel={false} />
          </div>
          {post.isPR && (
            <span className="absolute right-3 top-3">
              <PRBadge />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.12em] text-gray-400">
            <span className="font-semibold text-brand">{cat?.shortName}</span>
            <span aria-hidden className="text-gray-300">|</span>
            <time dateTime={toDateOnly(post.date)} className="not-uppercase tracking-normal">
              {formatDateJa(post.date)}
            </time>
          </div>
          <h3 className="line-clamp-2 min-h-[3.5rem] font-display text-[19px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-dark">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            {post.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold tracking-wide text-brand">
            続きを読む
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

/** トップの特集（最新1本を大判フィーチャー）。左に大きなカバー、右にカテゴリ＋大見出し＋リード。 */
export function PostCardFeatured({ post }: { post: PostMeta }) {
  const cat = getCategory(post.category);
  return (
    <article className="card group overflow-hidden">
      <div className="grid items-stretch md:grid-cols-2">
        <Link
          href={`/blog/${post.slug}`}
          className="relative block overflow-hidden border-b border-[color:var(--rule)] md:border-b-0 md:border-r"
          aria-label={post.title}
        >
          <div className="h-full transition-transform duration-700 group-hover:scale-[1.03]">
            <CoverImage slug={post.slug} category={post.category} variant="hero" showLabel={false} priority />
          </div>
          {post.isPR && (
            <span className="absolute right-4 top-4">
              <PRBadge />
            </span>
          )}
        </Link>

        <div className="flex flex-col justify-center gap-4 p-7 sm:p-9 lg:p-11">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Feature</span>
            <span aria-hidden className="h-px flex-1 bg-[color:var(--rule)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              {cat?.shortName}
            </span>
          </div>
          <h2 className="font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-brand-dark sm:text-[32px] sm:leading-[1.3]">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-[15px] leading-relaxed text-gray-600 line-clamp-4">
            {post.description}
          </p>
          <div className="mt-1 flex items-center gap-4 text-xs text-gray-400">
            <time dateTime={toDateOnly(post.date)}>{formatDateJa(post.date)}</time>
            <span aria-hidden>·</span>
            <span>約{post.readingMinutes}分</span>
          </div>
          <div className="mt-2">
            <Link href={`/blog/${post.slug}`} className="btn-primary text-sm">
              特集を読む →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** 目次風のナンバリング・リスト行（01 / 02 …＋細罫＋小サムネ＋カテゴリ＋日付）。 */
export function PostListRow({ post, index }: { post: PostMeta; index: number }) {
  const cat = getCategory(post.category);
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-center gap-4 py-5 sm:gap-6"
      >
        <span className="editorial-num w-9 shrink-0 text-xl sm:w-12 sm:text-2xl">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-sm border border-[color:var(--rule)] sm:block">
          <CoverImage slug={post.slug} category={post.category} showLabel={false} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.12em] text-gray-400">
            <span className="font-semibold text-brand">{cat?.shortName}</span>
            <span aria-hidden className="text-gray-300">|</span>
            <time dateTime={toDateOnly(post.date)} className="not-uppercase tracking-normal">
              {formatDateJa(post.date)}
            </time>
            {post.isPR && <PRBadge />}
          </div>
          <h3 className="truncate font-display text-base font-semibold text-ink transition-colors group-hover:text-brand-dark sm:text-lg">
            {post.title}
          </h3>
          <p className="mt-0.5 hidden truncate text-sm text-gray-500 sm:block">
            {post.description}
          </p>
        </div>

        <span
          aria-hidden
          className="hidden shrink-0 text-brand transition-transform group-hover:translate-x-0.5 sm:block"
        >
          →
        </span>
      </Link>
    </li>
  );
}
