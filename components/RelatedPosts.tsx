import { type PostMeta } from "@/lib/posts";
import { PostCard } from "./PostCard";

/** 記事下部の関連記事（内部リンク回遊：実務→悩み→転職）。 */
export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="related-heading" className="not-prose mt-14">
      <h2 id="related-heading" className="heading-deco mb-6 text-xl font-bold text-brand-dark">
        あわせて読みたい
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
