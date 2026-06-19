/**
 * 医療系記事の安全注記（施設ルール優先・診断治療でない旨）。
 * 実務・転職どちらの医療記述にも添えられる。MDXから <MedicalNote /> で使う。
 */
export function MedicalNote() {
  return (
    <aside className="not-prose my-6 rounded-2xl border border-teal-200 bg-teal-50/70 p-4 sm:p-5 text-sm leading-relaxed text-teal-900">
      <p className="mb-1 flex items-center gap-2 font-bold">
        <span aria-hidden>🏥</span>この記事の医療情報について
      </p>
      <p>
        本記事は一般的な情報提供を目的としたもので、診断・治療・特定の手技を推奨するものではありません。
        実際の確認方法や対応は<strong>所属施設のルール・手順、主治医の指示が最優先</strong>です。
        判断に迷ったら必ず先輩・上司に確認してください。詳しくは
        <a href="/disclaimer" className="underline">免責事項</a>をご覧ください。
      </p>
    </aside>
  );
}
