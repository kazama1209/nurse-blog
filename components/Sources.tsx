import { type PostSource } from "@/lib/posts";

/** 出典リスト（一次情報の明示。E-E-A-T／審査対応）。 */
export function Sources({ sources }: { sources?: PostSource[] }) {
  if (!sources?.length) return null;
  return (
    <section aria-labelledby="sources-heading" className="not-prose mt-12 rounded-2xl bg-white/70 p-5 sm:p-6 ring-1 ring-pink-100">
      <h2 id="sources-heading" className="mb-3 flex items-center gap-2 text-base font-bold text-brand-dark">
        <span aria-hidden>📚</span>出典・参考
      </h2>
      <ul className="space-y-2 text-sm">
        {sources.map((s) => (
          <li key={s.url} className="flex gap-2">
            <span aria-hidden className="text-brand">›</span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-gray-600 underline decoration-pink-200 underline-offset-2 hover:text-brand"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-400">
        ※ 数値・医療的記述は上記の一次情報・公開資料に基づいて作成しています（公開時点）。
      </p>
    </section>
  );
}
