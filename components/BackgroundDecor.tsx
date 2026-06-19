/**
 * 全ページ共通の固定背景装飾。
 * テーマ配色のにじみ＋微細ドット（CSS: .bg-decor）の上に、
 * 看護モチーフの小アイコン（医療クロス／ハート／キラキラ／しずく／リング）を
 * 控えめに散りばける。すべて自作SVG・低不透明度で content の邪魔をしない。
 */

type IconType = "cross" | "heart" | "sparkle" | "drop" | "ring";

interface Deco {
  x: number;
  y: number;
  s: number;
  r: number;
  type: IconType;
  c: string;
  o: number;
}

const TEAL = "#0f8a86";
const PINK = "#f3899e";
const WARM = "#f6b756";
const VIOLET = "#8f7ce9";

// 1440x900 のキャンバス上に手配置（中央の本文帯は薄め、周縁を多めに）
const decos: Deco[] = [
  // 上部
  { x: 90, y: 90, s: 1.6, r: -12, type: "cross", c: TEAL, o: 0.1 },
  { x: 300, y: 150, s: 1.1, r: 8, type: "sparkle", c: WARM, o: 0.12 },
  { x: 560, y: 70, s: 1.3, r: 0, type: "heart", c: PINK, o: 0.1 },
  { x: 820, y: 130, s: 1.0, r: 18, type: "drop", c: TEAL, o: 0.1 },
  { x: 1090, y: 80, s: 1.5, r: -8, type: "ring", c: VIOLET, o: 0.1 },
  { x: 1320, y: 160, s: 1.2, r: 14, type: "cross", c: PINK, o: 0.1 },
  { x: 1180, y: 280, s: 0.9, r: 0, type: "sparkle", c: TEAL, o: 0.1 },
  // 左縁
  { x: 60, y: 360, s: 1.2, r: 10, type: "heart", c: PINK, o: 0.1 },
  { x: 130, y: 540, s: 1.0, r: -14, type: "drop", c: VIOLET, o: 0.1 },
  { x: 50, y: 700, s: 1.5, r: 6, type: "cross", c: TEAL, o: 0.1 },
  { x: 170, y: 820, s: 1.1, r: 20, type: "sparkle", c: WARM, o: 0.12 },
  // 右縁
  { x: 1370, y: 360, s: 1.3, r: -10, type: "sparkle", c: PINK, o: 0.1 },
  { x: 1300, y: 540, s: 1.1, r: 12, type: "heart", c: VIOLET, o: 0.1 },
  { x: 1395, y: 700, s: 1.0, r: -6, type: "drop", c: TEAL, o: 0.1 },
  { x: 1280, y: 830, s: 1.4, r: 8, type: "cross", c: WARM, o: 0.1 },
  // 下部
  { x: 300, y: 820, s: 1.2, r: -16, type: "ring", c: TEAL, o: 0.1 },
  { x: 560, y: 770, s: 1.0, r: 4, type: "cross", c: VIOLET, o: 0.1 },
  { x: 820, y: 840, s: 1.3, r: 12, type: "heart", c: PINK, o: 0.1 },
  { x: 1050, y: 790, s: 1.1, r: -8, type: "sparkle", c: WARM, o: 0.12 },
  // 中央寄り（薄め・少なめ）
  { x: 440, y: 320, s: 0.9, r: 0, type: "drop", c: PINK, o: 0.07 },
  { x: 1000, y: 320, s: 0.9, r: 14, type: "cross", c: TEAL, o: 0.07 },
  { x: 520, y: 600, s: 0.8, r: -10, type: "sparkle", c: VIOLET, o: 0.07 },
  { x: 950, y: 620, s: 0.9, r: 8, type: "heart", c: WARM, o: 0.07 },
];

function shape(type: IconType, c: string) {
  switch (type) {
    case "cross":
      return <path d="M-3-8h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill={c} />;
    case "heart":
      return (
        <path
          d="M0 8C-7 2-10-3-6-7c2.5-2.5 5-1 6 1 1-2 3.5-3.5 6-1 4 4 1 9-6 15Z"
          fill={c}
        />
      );
    case "sparkle":
      return <path d="M0-10C0-3 3 0 10 0 3 0 0 3 0 10 0 3-3 0-10 0-3 0 0-3 0-10Z" fill={c} />;
    case "drop":
      return <path d="M0-9C5-2 7 1 7 4a7 7 0 1 1-14 0c0-3 2-6 7-13Z" fill={c} />;
    case "ring":
      return <circle r="7" fill="none" stroke={c} strokeWidth="2.6" />;
  }
}

export function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-decor">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {decos.map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.s}) rotate(${d.r})`} opacity={d.o}>
            {shape(d.type, d.c)}
          </g>
        ))}
      </svg>
    </div>
  );
}
