import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "免責事項・広告について",
  description: `${siteConfig.name}の医療・健康情報の取扱い、情報の正確性、アフィリエイト広告（PR）、外部リンクに関する免責事項です。`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <Container size="prose" className="py-8">
      <Breadcrumb
        crumbs={[
          { name: "ホーム", url: "/" },
          { name: "免責事項・広告について", url: "/disclaimer" },
        ]}
      />
      <h1 className="mt-6 font-display text-2xl font-bold text-brand-dark">免責事項・広告について</h1>

      <div className="prose prose-neutral mt-6 max-w-none">
        <h2>1. 医療・健康情報について</h2>
        <p>
          本サイト「{siteConfig.name}」の医療・看護・健康に関する情報は、一般的な情報提供を目的としたものであり、
          診断・治療・特定の行為を推奨するものではありません。
          実際の業務上の対応・確認方法は、
          <strong>必ず所属施設のルール・手順および主治医の指示に従ってください</strong>。
          記載内容を参照したことによる結果について、運営者は一切の責任を負いません。
        </p>

        <h2>2. 情報の正確性</h2>
        <p>
          掲載情報は公開時点の一次情報・公開資料に基づき正確性に努めていますが、その完全性・最新性・有用性を保証するものではありません。
        </p>

        <h2>3. 広告について</h2>
        <p>
          本サイトはアフィリエイト広告（PR）を含みます。広告を含む記事には「PR」「広告を含みます」と明示しています。
          掲載しているサービスの提供条件等は、各公式サイトでご確認ください。
        </p>

        <h2>4. 外部リンク</h2>
        <p>外部サイトの内容について、運営者は責任を負いません。</p>

        <hr />
        <p className="text-sm text-gray-500">
          本免責事項に関するお問い合わせは<Link href="/contact">こちら</Link>。あわせて
          <Link href="/privacy-policy">プライバシーポリシー</Link>もご確認ください。
        </p>
      </div>
    </Container>
  );
}
