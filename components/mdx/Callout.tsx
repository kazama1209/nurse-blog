import { type ReactNode } from "react";

type Tone = "point" | "info" | "warning" | "tip";

const toneStyles: Record<Tone, { box: string; label: string; icon: string; title: string }> = {
  point: {
    box: "border-l-2 border-brand bg-brand-light/40",
    label: "text-brand-dark",
    icon: "🩺",
    title: "ポイント",
  },
  info: {
    box: "border-l-2 border-sky-400 bg-sky-50/70",
    label: "text-sky-700",
    icon: "📌",
    title: "メモ",
  },
  warning: {
    box: "border-l-2 border-rose-400 bg-rose-50/70",
    label: "text-rose-700",
    icon: "⚠️",
    title: "注意",
  },
  tip: {
    box: "border-l-2 border-accent bg-pink-50/60",
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
    <aside className={`not-prose my-6 rounded-r-editorial ${s.box} p-4 pl-5 sm:p-5 sm:pl-6`}>
      <p className={`mb-1 flex items-center gap-2 font-display font-semibold ${s.label}`}>
        <span aria-hidden>{s.icon}</span>
        {title ?? s.title}
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed text-ink [&_a]:text-brand [&_a]:underline">
        {children}
      </div>
    </aside>
  );
}
