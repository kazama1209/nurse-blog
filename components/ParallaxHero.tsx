"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";
import { Illustration } from "./Illustration";
import type { IllustName } from "@/lib/motifs";

type FloatItem = {
  name: IllustName;
  className: string; // 位置・サイズ
  depth: number; // パララックス係数（大きいほどよく動く）
  bg: string;
};

const floats: FloatItem[] = [
  { name: "heart-hands", className: "left-[4%] top-[18%] h-20 w-20 sm:h-24 sm:w-24", depth: 0.22, bg: "bg-pink-100" },
  { name: "drip", className: "right-[6%] top-[10%] h-16 w-16 sm:h-20 sm:w-20", depth: 0.4, bg: "bg-brand-light" },
  { name: "moon", className: "right-[12%] bottom-[14%] h-16 w-16 sm:h-20 sm:w-20", depth: 0.3, bg: "bg-violet-100" },
  { name: "clipboard", className: "left-[10%] bottom-[10%] h-14 w-14 sm:h-16 sm:w-16", depth: 0.5, bg: "bg-amber-100" },
  { name: "vitals", className: "left-[44%] top-[4%] h-12 w-12 sm:h-14 sm:w-14", depth: 0.6, bg: "bg-teal-100" },
];

/** トップのパララックス・ヒーロー。スクロール量とマウス位置で装飾レイヤーを多層に動かす。 */
export function ParallaxHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    let mx = 0;
    let my = 0;
    let raf = 0;

    const apply = () => {
      const scrollY = window.scrollY;
      for (const el of layers) {
        const depth = Number(el.dataset.depth ?? 0);
        const ty = scrollY * depth * 0.4 + my * depth * 18;
        const tx = mx * depth * 22;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      raf = 0;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onScroll = () => schedule();
    const onMouse = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      schedule();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("mousemove", onMouse);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("mousemove", onMouse);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      {/* 背景の大きな浮遊ブロブ */}
      <div
        data-depth="0.15"
        className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl will-change-transform"
      />
      <div
        data-depth="0.25"
        className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-brand-light/60 blur-3xl will-change-transform"
      />

      {/* 浮遊するイラスト（多層パララックス） */}
      {floats.map((f, i) => (
        <div
          key={i}
          data-depth={f.depth}
          className={`pointer-events-none absolute hidden rounded-2xl ${f.bg} p-2.5 shadow-sm ring-1 ring-white/60 will-change-transform sm:block ${f.className}`}
          style={{ animation: `floaty ${5 + i}s ease-in-out ${i * 0.4}s infinite` }}
          aria-hidden
        >
          <Illustration name={f.name} className="h-full w-full" />
        </div>
      ))}

      {/* ヒーロー本文 */}
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
        <span className="pill mb-5 bg-white/80 text-brand-dark ring-1 ring-pink-100">
          🌸 看護師のためのやさしいメモ帳
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
          学校では教わらない、
          <br />
          <span className="bg-gradient-to-r from-brand to-pink-400 bg-clip-text text-transparent">
            現場の逃げ道。
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-gray-600 sm:text-base">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/category/jitsumu" className="btn-primary">
            実務の小技を読む
          </Link>
          <Link href="/category/nayami" className="btn-soft">
            新人の悩みに寄り添う記事
          </Link>
        </div>
      </div>

      {/* 下端の波（セクション区切り） */}
      <svg className="block w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0 40c180-40 360-40 540-12s360 40 540 12 360-40 360-40v68H0Z" fill="#ffffff" fillOpacity="0.6" />
      </svg>
    </section>
  );
}
