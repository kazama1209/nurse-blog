import Image from "next/image";
import { Illustration } from "./Illustration";
import { getCategory, type CategorySlug } from "@/lib/categories";
import { categoryGradient, getMotif, hashUnit, type IllustName } from "@/lib/motifs";
import { getPhoto } from "@/lib/photos";

/**
 * 記事ごとのカバー画像。
 * 1) public/images/posts/<slug>.jpg があれば実写真（Pexels）を next/image で表示
 * 2) 無ければカテゴリ配色のSVGカバー（自作モチーフ）にフォールバック
 * どちらも著作権クリア（Pexelsは無料・帰属義務なし／SVGは自作）。
 */
export function CoverImage({
  slug,
  category,
  motif,
  variant = "card",
  className = "",
  showLabel = true,
  priority = false,
}: {
  slug: string;
  category: CategorySlug;
  motif?: IllustName;
  variant?: "card" | "hero";
  className?: string;
  showLabel?: boolean;
  priority?: boolean;
}) {
  const g = categoryGradient[category];
  const cat = getCategory(category);
  const photo = getPhoto(slug);
  const aspect = variant === "hero" ? "aspect-[16/7]" : "aspect-[16/9]";

  const label = showLabel && cat && (
    <span
      className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold shadow-sm"
      style={{ color: g.ink }}
    >
      <span aria-hidden>{cat.emoji}</span>
      {cat.shortName}
    </span>
  );

  // --- 写真パターン ---
  if (photo) {
    const sizes = variant === "hero" ? "(max-width: 768px) 100vw, 720px" : "(max-width: 640px) 100vw, 400px";
    return (
      <div className={`relative w-full overflow-hidden ${aspect} ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt || `${cat?.name ?? ""}の記事イメージ`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {/* 下端の軽いスクリム（ラベルや角の馴染み用） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        {label}
      </div>
    );
  }

  // --- SVGカバー（フォールバック） ---
  const m = motif ?? getMotif(slug, category);
  const b1x = 12 + hashUnit(slug, 1) * 22;
  const b1y = 10 + hashUnit(slug, 2) * 30;
  const b2x = 64 + hashUnit(slug, 3) * 26;
  const b2y = 50 + hashUnit(slug, 4) * 35;
  const r1 = 24 + hashUnit(slug, 5) * 12;
  const r2 = 30 + hashUnit(slug, 6) * 16;
  const panel = variant === "hero" ? "h-[72%]" : "h-[68%]";

  return (
    <div
      className={`relative w-full overflow-hidden ${aspect} ${className}`}
      style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
      role="img"
      aria-label={`${cat?.name ?? ""}の記事イメージ`}
    >
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
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className={`flex ${panel} aspect-[4/3] items-center justify-center rounded-2xl bg-white/85 p-2 shadow-sm`}>
          <Illustration name={m} title={cat?.name} className="h-full w-full" />
        </div>
      </div>
      {label}
    </div>
  );
}
