import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${siteConfig.name}における個人情報・アクセス情報の取扱い、アクセス解析・アフィリエイト広告の利用について定めます。`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Container size="prose" className="py-8">
      <Breadcrumb
        crumbs={[
          { name: "ホーム", url: "/" },
          { name: "プライバシーポリシー", url: "/privacy-policy" },
        ]}
      />
      <h1 className="mt-6 font-display text-2xl font-bold text-brand-dark">プライバシーポリシー</h1>

      <div className="prose prose-neutral mt-6 max-w-none">
        <p>
          当サイト「{siteConfig.name}」（以下「本サイト」）における個人情報・アクセス情報の取扱いについて、以下のとおり定めます。
        </p>

        <h2>1. アクセス解析ツールについて</h2>
        <p>
          本サイトは、サイトの利用状況を把握するために Google アナリティクス（GA4）を利用しています。
          これは Cookie を利用して匿名のトラフィックデータを収集します。お使いのブラウザ設定で Cookie を無効にすることで、収集を拒否することができます。
        </p>

        <h2>2. 広告（アフィリエイトプログラム）について</h2>
        <p>
          本サイトは、第三者が提供するアフィリエイトプログラムを利用しており、
          これらの広告配信事業者が Cookie 等を使用する場合があります。これにより、事業者がユーザーのアクセス情報を取得・利用することがあります。
          広告（PR）を含む記事には、その旨を表示します。
        </p>

        <h2>3. 個人情報の利用目的</h2>
        <p>
          お問い合わせの際に取得した情報（氏名・メールアドレス等）は、回答・連絡のためにのみ利用し、本人の同意なく第三者に開示しません。
        </p>

        <h2>4. 免責事項</h2>
        <p>
          本サイトの情報の正確性には努めますが、完全性・最新性を保証するものではありません（詳細は
          <Link href="/disclaimer">免責事項</Link>をご覧ください）。
        </p>

        <h2>5. ポリシーの変更</h2>
        <p>本ポリシーは予告なく変更されることがあります。</p>

        <hr />
        <p className="text-sm text-gray-500">
          制定日：2026年5月21日 ／ 運営者：{siteConfig.author}（お問い合わせは
          <Link href="/contact">こちら</Link>）
        </p>
      </div>
    </Container>
  );
}
