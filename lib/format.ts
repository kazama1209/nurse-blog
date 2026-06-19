/** ISO文字列（JST）を「2026年5月21日」形式に整形。動的な現在時刻は使わない。 */
export function formatDateJa(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}年${m}月${day}日`;
}

/** machine向けの日付（YYYY-MM-DD）。<time dateTime> 用。 */
export function toDateOnly(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}
