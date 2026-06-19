"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/categories";
import { Logo } from "./Logo";

const navLinks = [
  ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name, emoji: c.emoji })),
  { href: "/about", label: "運営者情報", emoji: "💌" },
  { href: "/contact", label: "お問い合わせ", emoji: "✉️" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--rule)] bg-[var(--bg)]/92 backdrop-blur-md">
      {/* 上段：中央ロゴ（雑誌のマストヘッド） */}
      <div className="relative mx-auto flex max-w-feature items-center justify-center px-5 py-4 sm:px-8">
        {/* モバイル：左にメニューボタン（中央ロゴは維持） */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute left-4 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-editorial text-ink hover:bg-brand-light lg:hidden"
          aria-label="メニューを開閉"
          aria-expanded={open}
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>

        <Link
          href="/"
          className="flex flex-col items-center gap-1.5 text-center"
          aria-label={`${siteConfig.name} ホーム`}
        >
          <span className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-xl font-semibold tracking-wide text-brand-dark sm:text-2xl">
              {siteConfig.name}
            </span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-400">
            {siteConfig.tagline}
          </span>
        </Link>
      </div>

      {/* 下段：目次バー風の横一列ナビ（細罫で区切る） */}
      <nav className="hidden border-t border-[color:var(--rule)] lg:block" aria-label="メインナビ">
        <ul className="mx-auto flex max-w-feature items-center justify-center divide-x divide-[color:var(--rule)] px-5">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block whitespace-nowrap px-6 py-2.5 text-[13px] font-medium tracking-wide text-gray-600 transition-colors hover:text-brand-dark"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* モバイルナビ */}
      {open && (
        <nav className="border-t border-[color:var(--rule)] bg-white px-5 py-3 lg:hidden" aria-label="モバイルナビ">
          <ul className="flex flex-col divide-y divide-[color:var(--rule)]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-1 py-3 text-sm font-medium text-gray-700 hover:text-brand"
                >
                  <span aria-hidden>{l.emoji}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
