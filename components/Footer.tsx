import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

/** フッター。ポリシー類への固定リンクを必ず置く（A8審査要件）。 */
export function Footer() {
  return (
    <footer className="mt-20 border-t border-[color:var(--rule)] bg-white/50">
      <div className="mx-auto max-w-feature px-5 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* ブランド */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-wide text-brand-dark">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              学校では習わない、現場で本当に役立つ看護の知恵を、一次情報をもとにやさしくお届けします。
            </p>
          </div>

          {/* カテゴリ */}
          <nav aria-label="カテゴリ">
            <h2 className="eyebrow mb-3 text-gray-500">カテゴリ</h2>
            <ul className="space-y-2 text-sm text-gray-500">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-brand">
                    {c.emoji} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* サイト情報 */}
          <nav aria-label="サイト情報">
            <h2 className="eyebrow mb-3 text-gray-500">サイト情報</h2>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-brand">運営者情報</Link></li>
              <li><Link href="/contact" className="hover:text-brand">お問い合わせ</Link></li>
            </ul>
          </nav>

          {/* ポリシー（審査必須リンク） */}
          <nav aria-label="ポリシー">
            <h2 className="eyebrow mb-3 text-gray-500">ポリシー</h2>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/privacy-policy" className="hover:text-brand">プライバシーポリシー</Link></li>
              <li><Link href="/disclaimer" className="hover:text-brand">免責事項・広告について</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-[color:var(--rule)] pt-6 text-center text-xs text-gray-400">
          <p>
            当サイトはアフィリエイト広告（PR）を含みます。医療・看護情報は一般的な情報提供であり、診断・治療を目的としたものではありません。
          </p>
          <p>© {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
