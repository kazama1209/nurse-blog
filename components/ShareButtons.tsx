import { absoluteUrl } from "@/lib/site";

/** SNSシェアボタン（X / LINE / Facebook）。ブランドカラーのアイコン付き。サーバーコンポーネントで完結。 */
export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = absoluteUrl(`/blog/${slug}`);
  const text = encodeURIComponent(`${title}｜ナースの逃げ道`);
  const enc = encodeURIComponent(url);

  const shares = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${enc}`,
      className: "bg-[#000000] hover:bg-[#000000]/85",
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
    },
    {
      label: "LINE",
      href: `https://social-plugins.line.me/lineit/share?url=${enc}`,
      className: "bg-[#06C755] hover:bg-[#06C755]/85",
      icon: (
        <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314M7.85 13.509H5.464a.628.628 0 01-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.63m2.466-.629a.627.627 0 01-.627.629.628.628 0 01-.631-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63zm5.741 0c0 .27-.174.51-.432.596a.65.65 0 01-.199.031.626.626 0 01-.51-.25l-2.443-3.317v2.94a.627.627 0 01-.631.629.628.628 0 01-.626-.629V8.108c0-.27.173-.51.43-.595a.633.633 0 01.194-.033c.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63zm3.855-2.385a.628.628 0 01-.63.631H17.61v1.125h1.756c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.627.627 0 01-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.756c.348 0 .629.281.629.63" />
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      className: "bg-[#1877F2] hover:bg-[#1877F2]/85",
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073" />
      ),
    },
  ];

  return (
    <div className="not-prose mt-10 flex flex-wrap items-center gap-3 border-t border-[color:var(--rule)] pt-6">
      <span className="text-sm font-semibold text-gray-500">この記事をシェア</span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.label}でシェア`}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 ${s.className}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
            {s.icon}
          </svg>
          {s.label}
        </a>
      ))}
    </div>
  );
}
