/** ブランドロゴ（ハート＋医療クロス）。インラインSVGで色はブランドカラー。 */
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="ナースの逃げ道 ロゴ"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f8a86" />
          <stop offset="1" stopColor="#13a7a2" />
        </linearGradient>
      </defs>
      <path
        d="M24 42S6 30.5 6 18.5C6 12.7 10.4 8.5 15.8 8.5c3.4 0 6.5 1.8 8.2 4.6 1.7-2.8 4.8-4.6 8.2-4.6C37.6 8.5 42 12.7 42 18.5 42 30.5 24 42 24 42Z"
        fill="url(#logoGrad)"
      />
      {/* 医療クロス（白抜き） */}
      <path
        d="M21 15h6v4h4v6h-4v4h-6v-4h-4v-6h4v-4Z"
        fill="#ffffff"
      />
    </svg>
  );
}
