import { Illustration } from "./Illustration";
import { getCategory, type CategorySlug } from "@/lib/categories";
import { categoryGradient, getMotif, hashUnit, type IllustName } from "@/lib/motifs";

/**
 * 記事ごとの固有カバー画像（SVGベース・自作）。
 * カテゴリ配色のグラデ＋slug由来の装飾ブロブ＋トピックのモチーフイラスト。
 * 写真を使わず著作権リスクなしで「本格的な記事カバー」を全記事に付与する。
 */
export function CoverImage({
  slug,
  category,
  motif,
  variant = "card",
  className = "",
  showLabel = true,
}: {
  slug: string;
  category: CategorySlug;
  motif?: IllustName;
  variant?: "card" | "hero";
  className?: string;
  showLabel?: boolean;
}) {
  const g = categoryGradient[category];
  const cat = getCategory(category);
  const m = motif ?? getMotif(slug, category);

  // slug由来で装飾ブロブの位置・大きさを決定的に散らす
  const b1x = 12 + hashUnit(slug, 1) * 22;
  const b1y = 10 + hashUnit(slug, 2) * 30;
  const b2x = 64 + hashUnit(slug, 3) * 26;
  const b2y = 50 + hashUnit(slug, 4) * 35;
  const r1 = 24 + hashUnit(slug, 5) * 12;
  const r2 = 30 + hashUnit(slug, 6) * 16;

  const aspect = variant === "hero" ? "aspect-[16/7]" : "aspect-[16/9]";
  const panel = variant === "hero" ? "h-[72%]" : "h-[68%]";

  return (
    <div
      className={`relative w-full overflow-hidden ${aspect} ${className}`}
      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
      aria-hidden={false}
      role="img"
      aria-label={`${cat?.name ?? ""}の記事イメージ`}
    >
      {/* 装飾レイヤー（ブロブ＋ドット） */}
      <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`dots-${slug}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="0.9" fill="#ffffff" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100" height="56" fill={`url(#dots-${slug})`} />
        <circle cx={b1x} cy={b1y} r={r1} fill="#ffffff" opacity="0.14" />
        <circle cx={b2x} cy={b2y} r={r2} fill="#ffffff" opacity="0.10" />
        <circle cx={b2x - 6} cy={b2y - 4} r={r2 * 0.45} fill={g.from} opacity="0.18" />
      </svg>

      {/* 中央のモチーフ（白い角丸パネルに載せて“図版”らしく） */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className={`flex ${panel} aspect-[4/3] items-center justify-center rounded-2xl bg-white/85 p-2 shadow-sm backdrop-blur-[1px]`}>
          <Illustration name={m} title={cat?.name} className="h-full w-full" />
        </div>
      </div>

      {/* カテゴリラベル */}
      {showLabel && cat && (
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold shadow-sm"
          style={{ color: g.ink }}
        >
          <span aria-hidden>{cat.emoji}</span>
          {cat.shortName}
        </span>
      )}
    </div>
  );
}
