import Link from "next/link";
import { getCategory } from "@/lib/categories";

const styles: Record<string, string> = {
  jitsumu: "border border-brand/40 text-brand-dark bg-white/70",
  nayami: "border border-pink-300 text-pink-700 bg-white/70",
  hatarakikata: "border border-amber-300 text-amber-700 bg-white/70",
  tenshoku: "border border-violet-300 text-violet-700 bg-white/70",
};

export function CategoryPill({
  category,
  asLink = true,
}: {
  category: string;
  asLink?: boolean;
}) {
  const c = getCategory(category);
  if (!c) return null;
  const cls = `pill ${styles[c.slug] ?? "bg-gray-100 text-gray-700"}`;
  const label = (
    <>
      <span aria-hidden>{c.emoji}</span>
      {c.shortName}
    </>
  );
  if (!asLink) return <span className={cls}>{label}</span>;
  return (
    <Link href={`/category/${c.slug}`} className={`${cls} transition-opacity hover:opacity-80`}>
      {label}
    </Link>
  );
}
