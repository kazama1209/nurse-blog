import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "運営者情報",
  description: `${siteConfig.name}の運営者情報・運営方針・情報源の信頼性についてご案内します。`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container size="prose" className="py-8">
      <Breadcrumb crumbs={[{ name: "ホーム", url: "/" }, { name: "運営者情報", url: "/about" }]} />

      <div className="mt-6 flex items-center gap-3">
        <Logo className="h-12 w-12" />
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-dark">運営者情報</h1>
          <p className="text-sm text-gray-400">About us</p>
        </div>
      </div>

      <div className="prose prose-neutral mt-8 max-w-none">
        <h2>運営者</h2>
        <p>
          <strong>{siteConfig.author}</strong>
        </p>
        <p>
          本サイト「{siteConfig.name}」は、看護師向けTikTok「みき｜ナースの逃げ道メモ（
          <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer">
            {siteConfig.social.tiktokHandle}
          </a>
          ）」を母体に運営している、看護師向けの情報メディアです。
        </p>

        <h2>運営の目的・方針</h2>
        <p>
          「看護学校では習わないけれど、現場の実務で本当に役立つ知恵」をコンセプトに、
          新人〜若手の看護師さんが少しでもラクに、安全に働けるようサポートすることを目的としています。
        </p>
        <ul>
          <li>現場のミスを防ぐ実務の小技（医療安全）</li>
          <li>新人が抱えがちな悩み・メンタルとの向き合い方</li>
          <li>働き方・お金・権利といった、知らないと損をする情報</li>
          <li>後悔しない転職・職場選びの考え方</li>
        </ul>

        <h2>情報の信頼性について</h2>
        <p>
          本サイトの医療・実務に関する情報は、
          <strong>
            日本医療機能評価機構（医療安全情報）・厚生労働省・日本看護協会・各学会等が公開している一次情報やガイドライン
          </strong>
          に基づいて作成しています。数値や医療的な記述には、可能な限り出典を明記しています。
        </p>
        <p>
          ただし、本サイトの情報は一般的な情報提供を目的としたものであり、診断・治療を目的としたものではありません。
          実際の業務上の対応・確認方法は、必ず所属施設のルール・手順および主治医の指示に従ってください（詳しくは
          <Link href="/disclaimer">免責事項</Link>をご覧ください）。
        </p>

        <h2>広告（アフィリエイト）について</h2>
        <p>
          本サイトは、運営を継続するためにアフィリエイト広告（A8.net 等）を利用しています。
          広告（PR）を含む記事には、その旨を明示しています。詳しくは
          <Link href="/privacy-policy">プライバシーポリシー</Link>および
          <Link href="/disclaimer">免責事項</Link>をご覧ください。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          ご意見・ご指摘・取材や掲載に関するご相談は、
          <Link href="/contact">お問い合わせページ</Link>よりお気軽にご連絡ください。
          記載内容に誤りを見つけられた場合も、お知らせいただけると幸いです。
        </p>
      </div>
    </Container>
  );
}
