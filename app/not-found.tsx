import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-5xl">🩹</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-brand-dark">
        ページが見つかりませんでした
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        お探しのページは移動または削除された可能性があります。
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link href="/" className="btn-primary">トップへ戻る</Link>
        <Link href="/category/jitsumu" className="btn-soft">実務の記事を見る</Link>
      </div>
    </Container>
  );
}
