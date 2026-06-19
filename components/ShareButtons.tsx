import { absoluteUrl } from "@/lib/site";

/** SNSシェアボタン（X / LINE / コピー用URL表示）。サーバーコンポーネントで完結させるためリンクのみ。 */
export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = absoluteUrl(`/blog/${slug}`);
  const text = encodeURIComponent(`${title}｜ナースの逃げ道メモ`);
  const enc = encodeURIComponent(url);
  return (
    <div className="not-prose mt-10 flex flex-wrap items-center gap-3 border-t border-pink-100 pt-6">
      <span className="text-sm font-semibold text-gray-500">この記事をシェア</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${enc}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-soft text-sm"
      >
        Xでシェア
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${enc}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-soft text-sm"
      >
        LINEで送る
      </a>
    </div>
  );
}
