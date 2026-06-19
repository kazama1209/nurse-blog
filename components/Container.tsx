import { type ReactNode } from "react";

/** ページ共通の左右パディング＋最大幅ラッパ。 */
export function Container({
  children,
  size = "wide",
  className = "",
}: {
  children: ReactNode;
  size?: "wide" | "prose";
  className?: string;
}) {
  const max = size === "prose" ? "max-w-prose" : "max-w-5xl";
  return <div className={`mx-auto w-full ${max} px-5 sm:px-6 ${className}`}>{children}</div>;
}
