import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${siteConfig.name}へのお問い合わせ・ご相談はこちらから。ご意見・ご指摘・掲載に関するご相談をお受けしています。`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasForm = Boolean(siteConfig.formspreeId);
  return (
    <Container size="prose" className="py-8">
      <Breadcrumb crumbs={[{ name: "ホーム", url: "/" }, { name: "お問い合わせ", url: "/contact" }]} />

      <header className="mt-6 mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-dark">お問い合わせ</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          記事へのご意見・ご指摘、掲載や取材に関するご相談などをお受けしています。
          内容を確認のうえ、必要に応じてご返信いたします。
        </p>
      </header>

      {hasForm ? (
        <ContactForm formId={siteConfig.formspreeId} />
      ) : (
        <div className="card p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-gray-600">
            現在、お問い合わせフォームを準備中です。お急ぎの場合は、下記メールアドレスまでご連絡ください。
          </p>
          <p className="mt-4 rounded-xl bg-brand-light px-4 py-3 text-center font-semibold text-brand-dark">
            {siteConfig.contactEmail}
          </p>
          <p className="mt-4 text-xs text-gray-400">
            ※ フォームを有効にするには、環境変数 <code>NEXT_PUBLIC_FORMSPREE_ID</code> に Formspree のフォームIDを設定してください（README参照）。
          </p>
        </div>
      )}
    </Container>
  );
}
