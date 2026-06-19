/**
 * PR表記バッジ。アフィ/広告を含む記事の冒頭・リンク周辺に明示する（ステマ規制・ASP規約対応）。
 * variant="banner" は記事冒頭の帯、variant="inline" はリンク周辺の小バッジ。
 */
export function PRBadge({ variant = "inline" }: { variant?: "inline" | "banner" }) {
  if (variant === "banner") {
    return (
      <div className="not-prose my-4 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
        <span className="pill bg-amber-400 text-white">PR</span>
        <span>
          この記事は<strong>アフィリエイト広告（プロモーション）</strong>を含みます。
        </span>
      </div>
    );
  }
  return (
    <span className="pill bg-amber-400 align-middle text-[10px] text-white" aria-label="広告（PR）">
      PR
    </span>
  );
}
