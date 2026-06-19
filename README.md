# ナースの逃げ道メモ 🌸

看護師（新人〜若手）向けの情報メディア。母体はTikTok「みき｜ナースの逃げ道メモ（[@nurse_miki_memo](https://www.tiktok.com/@nurse_miki_memo)）」。

「看護学校では習わないけれど、現場で本当に役立つ知恵」をコンセプトに、実務・メンタル・働き方・転職の情報を、一次情報をもとにやさしく届けます。本サイトはA8.net等ASPの媒体審査通過と、看護師転職アフィリエイトの土台づくりを目的としています。

## 技術スタック

- **Next.js 14（App Router）+ TypeScript**
- **Tailwind CSS**（`@tailwindcss/typography`）
- 記事は **MDX**（`content/posts/*.mdx`、`gray-matter` + `next-mdx-remote/rsc`）
- フォント：Zen Maru Gothic（見出し）/ Noto Sans JP（本文）
- デプロイ：**Vercel** ＋ 独自ドメイン

## セットアップ

```bash
npm install
cp .env.example .env.local   # 環境変数を設定
npm run dev                  # http://localhost:3000
```

### 主なコマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動（build後） |
| `npm run check:posts` | 記事の審査前セルフチェック（frontmatter・2000字・PR/出典） |
| `node scripts/fetch-photos.mjs` | 各記事のカバー写真を Pexels から取得し `public/images/posts/<slug>.jpg` に保存（`--force`で再取得） |

## 環境変数（`.env.local`）

| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | サイトの公開URL（独自ドメイン接続後に設定。末尾スラッシュなし） |
| `NEXT_PUBLIC_FORMSPREE_ID` | お問い合わせフォームのFormspree フォームID。未設定時は `/contact` がメール表示にフォールバック |
| `NEXT_PUBLIC_CONTACT_EMAIL` | フォールバック表示用の公開メール |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 測定ID（`G-XXXXXXXXXX`）。未設定なら読み込まない |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console の所有権確認コード（任意） |

---

## Vercelデプロイ手順

1. このリポジトリをGitHub（等）にpushする。
2. [Vercel](https://vercel.com/) にログイン →「Add New… → Project」→ 当リポジトリをImport。
3. Framework Preset は **Next.js** が自動検出される。ビルド設定はデフォルトのままでOK。
4. **Environment Variables** に `.env.example` の項目を設定（最低限 `NEXT_PUBLIC_SITE_URL`）。
5. 「Deploy」を押す。`https://<project>.vercel.app` で公開される。

## 独自ドメイン接続手順

1. お名前.com / Cloudflare Registrar 等でドメインを取得。
2. Vercelのプロジェクト → **Settings → Domains** → ドメインを追加。
3. 表示されるDNSレコードを、ドメイン側の管理画面に設定：
   - Apex（例 `example.com`）→ Aレコード `76.76.21.21`
   - `www` → CNAME `cname.vercel-dns.com`
   （Vercel画面の指示が正。最新の値に従う）
4. DNS反映後、VercelがHTTPS証明書を自動発行。
5. **`NEXT_PUBLIC_SITE_URL` を本番ドメインに更新**して再デプロイ（sitemap・OGP・canonical・JSON-LDが正しいURLになる）。
6. [Google Search Console](https://search.google.com/search-console) にドメインを登録し、`sitemap.xml` を送信。

---

## 記事の追加方法（MDX）

`content/posts/` に `<slug>.mdx` を作成します。ファイル名がそのままURL（`/blog/<slug>`）になります。

### frontmatter（必須項目）

```mdx
---
title: "記事タイトル（検索KWを含めつつクリックされる形）"
description: "120字前後の説明（検索結果・OGP・記事冒頭に表示）"
slug: "english-slug"
category: "jitsumu"   # jitsumu(実務) / nayami(悩み) / hatarakikata(働き方) / tenshoku(転職)
date: "2026-05-21T20:10:00+09:00"     # JST固定・ハードコード（動的時刻にしない）
updated: "2026-05-21T20:10:00+09:00"  # 基本は date と同じ
tags: ["タグ1", "タグ2"]
isPR: false           # アフィ/PRを含むなら true（C・D記事）
related: ["other-slug-1", "other-slug-2"]   # 関連記事（任意。無ければ同カテゴリ自動）
sources:              # 出典（数値・医療記述には必須）
  - label: "出典名"
    url: "https://..."
---
```

### 本文で使えるカスタムコンポーネント

| コンポーネント | 用途 |
|---|---|
| `<MedicalNote />` | 医療系記事の安全注記（施設ルール優先・診断治療でない旨） |
| `<Callout tone="point\|info\|warning\|tip" title="...">…</Callout>` | 強調ボックス |
| `<AffiliateSlot service="…" note="…" />` | 転職アフィのリンク枠（提携前はプレースホルダ表示）。使う記事は `isPR: true` 必須 |
| `<PRBadge />` / `<PRBadge variant="banner" />` | PR表記 |
| `<Illust name="…" caption="…" align="center\|left\|right" tone="teal\|pink\|warm\|violet" />` | 本文中の図版（自作SVGイラスト）。`name` は `lib/motifs.ts` の `IllustName`（drip / syringe / clock / wallet / heart-hands など22種） |

### カバー画像（写真 ＋ SVGフォールバック）

記事のカバー画像（一覧カード・記事冒頭ヒーロー・OGP）は `<CoverImage>` が次の優先順で表示します。

1. **実写真**：`public/images/posts/<slug>.jpg` があればそれ（[Pexels](https://www.pexels.com/) 由来。無料・帰属義務なしだが、記事下に撮影者クレジットを表示）
2. **SVGカバー**：写真が無ければ `lib/motifs.ts` の `slugMotif`（slug→モチーフ）からカテゴリ配色のSVGカバーを自動生成

新規記事の写真は `node scripts/fetch-photos.mjs` で取得します（クエリは `scripts/fetch-photos.mjs` の `queries` に slug 単位で定義。差し替えたい場合はクエリを編集して `--force`）。クレジットは `content/photo-credits.json` に保存され、記事ページに自動表示されます。**写真を置かない記事でも自作SVGカバーで成立する**ため、常に著作権クリアです。

記事本文中の図版は `<Illust>` の自作SVGイラスト（写真とSVGを併用するエディトリアル構成）。

内部リンクは Markdown の `[テキスト](/blog/other-slug)` でOK（自動で `next/link`）。外部リンクは別タブで開きます。

### 執筆ルール（コンプラ・厳守）

- **本文2000字以上**・独自テキスト（コピペ/自動生成丸出しNG）。見出し構造・箇条書き・冒頭結論。
- **虚偽体験談・具体成果の断言NG**（景表法・ステマ規制・ASP規約）。「情報提供・選び方の体」で書く。
- 医療・数値の主張は**一次情報（医療機能評価機構・厚労省・日看協・学会等）に基づき出典明記**。
- 医療系記事には `<MedicalNote />` を添える。
- アフィを含む記事（C・D）は **PR明示**（`isPR: true` ＋ `<PRBadge variant="banner" />` か `<AffiliateSlot />`）。提携前はリンク枠だけ用意。
- テーマは**看護師向けで一貫**。

追加後は `npm run check:posts` でセルフチェックしてください。

---

## ディレクトリ構成

```
app/
  layout.tsx              # 共通ヘッダ/フッタ・メタ既定・JSON-LD(Organization/WebSite)
  page.tsx                # トップ（ヒーロー＋新着＋カテゴリ別）
  blog/[slug]/page.tsx    # 記事（generateMetadata + Article/Breadcrumb JSON-LD）
  category/[category]/page.tsx
  about / privacy-policy / disclaimer / contact   # 固定ページ（審査必須）
  sitemap.ts / robots.ts
content/posts/*.mdx        # 記事
components/                # Header, Footer, PostCard, Breadcrumb, PRBadge, mdx/* など
lib/                       # posts(MDXローダー) / categories / site / jsonld / format
scripts/check-posts.ts     # 審査前セルフチェック
public/                    # favicon・logo・OGP
```

## 審査前チェックリスト（spec §6）

- [ ] 全ページ表示できる（404/未完成ページが無い）
- [ ] 記事10本以上（独自・2000字以上・テーマ一貫・出典あり）→ `npm run check:posts`
- [ ] /about・/privacy-policy・/disclaimer・/contact が機能する
- [ ] フッタにポリシー類への固定リンク
- [ ] sitemap.xml / robots.txt が有効・noindexでない
- [ ] favicon・サイト名・ロゴ・OGP設定済み
- [ ] スマホ表示が崩れていない
- [ ] アフィ記事にPR表記（提携前はリンク枠のみ）
