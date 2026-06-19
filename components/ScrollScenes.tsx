"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Illustration } from "./Illustration";
import type { IllustName } from "@/lib/motifs";

export interface Scene {
  href: string;
  kicker: string;
  emoji: string;
  illust: IllustName;
  heading: string;
  text: string;
  from: string;
  to: string;
  ink: string;
}

/**
 * ピン留めスクロールシーン。
 * デスクトップ＆モーション許可時のみ：セクションを画面に固定し、スクロール量に応じて
 * シーンを静かにクロスフェードで切り替える（上品・控えめ／スクロールジャックなし）。
 * モバイル / prefers-reduced-motion 時は通常の縦積みカードにフォールバック（SEO安全）。
 */
export function ScrollScenes({ scenes }: { scenes: Scene[] }) {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  // 有効条件（lg以上＋モーション許可）を判定
  useEffect(() => {
    const mqWide = window.matchMedia("(min-width: 1024px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqWide.matches && !mqReduce.matches);
    update();
    mqWide.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqWide.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  // スクロール進捗 → アクティブシーン
  useEffect(() => {
    if (!enabled) return;
    const el = outerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        const idx = Math.min(scenes.length - 1, Math.floor(p * scenes.length));
        setActive((prev) => (prev !== idx ? idx : prev));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, scenes.length]);

  const scrollToScene = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + (total * (i + 0.5)) / scenes.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // --- フォールバック（モバイル / reduced-motion）：通常の縦積みカード ---
  if (!enabled) {
    return (
      <section aria-label="カテゴリ紹介" className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {scenes.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card card-hover flex items-center gap-4 p-5"
              style={{ background: `linear-gradient(135deg, ${s.from}22, ${s.to}22)` }}
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/80 p-2">
                <Illustration name={s.illust} className="h-full w-full" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest" style={{ color: s.ink }}>
                  {s.kicker}
                </p>
                <h3 className="font-display text-lg font-bold text-ink">{s.heading}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{s.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // --- ピン留めシーン（デスクトップ） ---
  const cur = scenes[active];
  return (
    <section
      ref={outerRef}
      aria-label="カテゴリ紹介"
      style={{ height: `${scenes.length * 85}vh` }}
      className="relative"
    >
      <div
        className="sticky top-16 flex h-[calc(100vh-4rem)] items-center overflow-hidden transition-[background] duration-700"
        style={{ background: `linear-gradient(135deg, ${cur.from}14, ${cur.to}1f)` }}
      >
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 items-center gap-10 px-6">
          {/* テキスト側（クロスフェード） */}
          <div className="relative min-h-[320px]">
            {scenes.map((s, i) => (
              <div
                key={s.href}
                aria-hidden={i !== active}
                className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "none" : `translateY(${i > active ? 18 : -18}px)`,
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <p className="text-xs font-bold tracking-[0.2em]" style={{ color: s.ink }}>
                  {s.emoji} {s.kicker}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink xl:text-4xl">
                  {s.heading}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-600">{s.text}</p>
                <Link
                  href={s.href}
                  className="btn-primary mt-7 w-fit"
                  style={{ background: s.from }}
                >
                  記事を読む →
                </Link>
              </div>
            ))}
          </div>

          {/* ビジュアル側（クロスフェード＋淡い拡縮） */}
          <div className="relative aspect-square">
            {scenes.map((s, i) => (
              <div
                key={s.href}
                aria-hidden={i !== active}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(0.94)",
                }}
              >
                <div
                  className="flex h-4/5 w-4/5 items-center justify-center rounded-[2rem] bg-white/70 p-8 shadow-sm"
                  style={{ boxShadow: `0 24px 60px -28px ${s.from}88` }}
                >
                  <Illustration name={s.illust} className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 進捗ドット（クリックでそのシーンへ） */}
        <ul className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          {scenes.map((s, i) => (
            <li key={s.href}>
              <button
                type="button"
                onClick={() => scrollToScene(i)}
                aria-label={`${s.heading}へ`}
                aria-current={i === active}
                className="block rounded-full transition-all"
                style={{
                  width: i === active ? 10 : 8,
                  height: i === active ? 28 : 8,
                  background: i === active ? s.from : "#d8d2d2",
                }}
              />
            </li>
          ))}
        </ul>

        {/* 下端の進捗バー */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/5">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${((active + 1) / scenes.length) * 100}%`, background: cur.from }}
          />
        </div>
      </div>
    </section>
  );
}
