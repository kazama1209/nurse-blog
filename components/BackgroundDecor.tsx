/**
 * 全ページ共通の固定背景装飾（エディトリアル＝罫線基調）。
 * .bg-decor（温かいオフホワイト＋極薄の縦グリッド罫）の上に、
 * 余白に薄い水平ヘアラインと小さなティック（目盛り）を控えめに重ねる。
 * すべて低不透明度で content の可読性を損なわない。
 */

const TEAL = "#0f8a86";
const INK = "#1f2933";

// 1440x900 のキャンバス上に手配置した水平ヘアライン（左右端から短く伸びる罫）
const rules: { x1: number; y: number; w: number; c: string; o: number }[] = [
  { x1: 0, y: 150, w: 120, c: INK, o: 0.06 },
  { x1: 1340, y: 230, w: 100, c: TEAL, o: 0.08 },
  { x1: 0, y: 430, w: 90, c: INK, o: 0.05 },
  { x1: 1360, y: 560, w: 80, c: INK, o: 0.05 },
  { x1: 0, y: 720, w: 110, c: TEAL, o: 0.07 },
  { x1: 1330, y: 800, w: 110, c: INK, o: 0.05 },
];

// 目盛りティック（細い縦線の連なり）を上下端の余白に
function ticks(x: number, y: number, n: number, gap: number, c: string, o: number) {
  return Array.from({ length: n }).map((_, i) => (
    <line
      key={`${x}-${y}-${i}`}
      x1={x + i * gap}
      y1={y}
      x2={x + i * gap}
      y2={y + 8}
      stroke={c}
      strokeWidth="1"
      opacity={o}
    />
  ));
}

export function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-decor">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {rules.map((r, i) => (
          <line
            key={i}
            x1={r.x1}
            y1={r.y}
            x2={r.x1 + r.w}
            y2={r.y}
            stroke={r.c}
            strokeWidth="1"
            opacity={r.o}
          />
        ))}
        {ticks(60, 70, 10, 16, TEAL, 0.1)}
        {ticks(60, 824, 10, 16, INK, 0.07)}
        {ticks(1220, 70, 10, 16, INK, 0.07)}
      </svg>
    </div>
  );
}
