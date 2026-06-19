"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

const navLinks = [
  ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name, emoji: c.emoji })),
  { href: "/about", label: "運営者情報", emoji: "💌" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-pink-100/70 bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${siteConfig.name} ホーム`}>
          <Logo className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold text-brand-dark">{siteConfig.name}</span>
            <span className="mt-0.5 hidden text-[10px] tracking-wide text-gray-400 sm:block">{siteConfig.tagline}</span>
          </span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-brand-light hover:text-brand-dark xl:px-3"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-soft ml-1 whitespace-nowrap text-sm">
            お問い合わせ
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-brand-dark hover:bg-brand-light lg:hidden"
          aria-label="メニューを開閉"
          aria-expanded={open}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* モバイルナビ */}
      {open && (
        <nav className="border-t border-pink-100 bg-white/95 px-5 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-brand-light"
                >
                  <span aria-hidden>{l.emoji}</span>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-brand-light"
              >
                <span aria-hidden>✉️</span>お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
