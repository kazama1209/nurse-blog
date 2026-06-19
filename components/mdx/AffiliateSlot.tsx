import { PRBadge } from "../PRBadge";

/**
 * 転職アフィのリンク置き場。提携承認前は「リンク枠だけ」を用意する（spec準拠）。
 * 提携後は env もしくはこのコンポーネントを編集して実リンクに差し替える。
 * MDXから <AffiliateSlot service="看護師向け転職エージェント" /> で使う。
 */
export function AffiliateSlot({
  service = "看護師向け転職サービス",
  note,
}: {
  service?: string;
  note?: string;
}) {
  return (
    <div className="not-prose my-7 overflow-hidden rounded-editorial border border-violet-300 bg-violet-50/50 p-5 sm:p-6">
      <div className="mb-2 flex items-center gap-2 border-b border-violet-200 pb-2">
        <PRBadge />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">広告枠（提携準備中）</span>
      </div>
      <p className="mb-1 mt-3 font-display text-lg font-semibold text-ink">
        {service}を探している方へ
      </p>
      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {note ??
          "条件の合う求人や働き方は人それぞれ。気になる方は複数のサービスを比較して、自分に合うものを選びましょう。"}
        <br />
        <span className="text-xs text-gray-400">
          ※ 具体的なサービスの紹介リンクは、提携承認後にこちらに掲載します。
        </span>
      </p>
      <span
        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-editorial bg-violet-400 px-6 py-3 font-semibold text-white opacity-80"
        aria-disabled
      >
        おすすめの転職サービスはこちら（準備中）
      </span>
    </div>
  );
}
