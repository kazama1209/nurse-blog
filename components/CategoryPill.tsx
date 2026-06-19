import Link from "next/link";
import { getCategory } from "@/lib/categories";

const styles: Record<string, string> = {
  jitsumu: "bg-brand-light text-brand-dark",
  nayami: "bg-pink-100 text-pink-700",
  hatarakikata: "bg-amber-100 text-amber-700",
  tenshoku: "bg-violet-100 text-violet-700",
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
