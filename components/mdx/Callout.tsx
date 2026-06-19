import { type ReactNode } from "react";

type Tone = "point" | "info" | "warning" | "tip";

const toneStyles: Record<Tone, { box: string; label: string; icon: string; title: string }> = {
  point: {
    box: "border-brand/30 bg-brand-light/60",
    label: "text-brand-dark",
    icon: "🩺",
    title: "ポイント",
  },
  info: {
    box: "border-sky-200 bg-sky-50",
    label: "text-sky-700",
    icon: "📌",
    title: "メモ",
  },
  warning: {
    box: "border-rose-200 bg-rose-50",
    label: "text-rose-700",
    icon: "⚠️",
    title: "注意",
  },
  tip: {
    box: "border-pink-200 bg-pink-50",
    label: "text-pink-700",
    icon: "💡",
    title: "先輩のひとこと",
  },
};

/**
 * 記事内の強調ボックス。MDXから <Callout tone="warning" title="...">本文</Callout> で使う。
 */
export function Callout({
  children,
  tone = "point",
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  title?: string;
}) {
  const s = toneStyles[tone];
  return (
    <aside className={`not-prose my-6 rounded-2xl border ${s.box} p-4 sm:p-5`}>
      <p className={`mb-1 flex items-center gap-2 font-bold ${s.label}`}>
        <span aria-hidden>{s.icon}</span>
        {title ?? s.title}
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed text-ink [&_a]:text-brand [&_a]:underline">
        {children}
      </div>
    </aside>
  );
}
