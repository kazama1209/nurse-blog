import { Illustration } from "../Illustration";
import type { IllustName } from "@/lib/motifs";

/**
 * 記事本文中に挿入する図版（自作SVGイラスト＋任意キャプション）。
 * MDXから <Illust name="syringe" caption="採血は“触れる血管”を選ぶ" /> のように使う。
 * align="center"(既定) は中央の帯、align="right"/"left" は本文に回り込む小さめ配置。
 */
export function Illust({
  name,
  caption,
  align = "center",
  tone = "teal",
}: {
  name: IllustName;
  caption?: string;
  align?: "center" | "left" | "right";
  tone?: "teal" | "pink" | "warm" | "violet";
}) {
  const tones: Record<string, string> = {
    teal: "from-brand-light to-teal-50",
    pink: "from-pink-50 to-rose-50",
    warm: "from-amber-50 to-orange-50",
    violet: "from-violet-50 to-purple-50",
  };

  if (align !== "center") {
    const float = align === "right" ? "sm:float-right sm:ml-5" : "sm:float-left sm:mr-5";
    return (
      <figure className={`not-prose my-4 w-full sm:w-56 ${float} mb-4`}>
        <div className={`flex aspect-[4/3] items-center justify-center rounded-editorial bg-gradient-to-br ${tones[tone]} p-3 ring-1 ring-[color:var(--rule)]`}>
          <Illustration name={name} title={caption} className="h-full w-full" />
        </div>
        {caption && <figcaption className="mt-2 text-center text-xs text-gray-500">{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="not-prose my-7">
      <div className={`flex items-center justify-center rounded-editorial bg-gradient-to-br ${tones[tone]} p-6 ring-1 ring-[color:var(--rule)]`}>
        <div className="aspect-[5/3] w-full max-w-sm">
          <Illustration name={name} title={caption} className="h-full w-full" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">{caption}</figcaption>
      )}
    </figure>
  );
}
