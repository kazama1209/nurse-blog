"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/** Formspree へ送信する問い合わせフォーム。formId 未設定時は親がメール表示にフォールバックする。 */
export function ContactForm({ formId }: { formId: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = `https://formspree.io/f/${formId}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center">
        <p className="text-3xl">🌸</p>
        <h2 className="mt-3 font-display text-xl font-bold text-brand-dark">送信しました</h2>
        <p className="mt-2 text-sm text-gray-600">
          お問い合わせありがとうございます。内容を確認のうえ、必要に応じてご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700">
          お名前（ニックネーム可）
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-pink-100 bg-white px-4 py-2.5 text-sm outline-none ring-brand/30 focus:border-brand focus:ring-2"
          placeholder="山田 花子"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-pink-100 bg-white px-4 py-2.5 text-sm outline-none ring-brand/30 focus:border-brand focus:ring-2"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-gray-700">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-xl border border-pink-100 bg-white px-4 py-2.5 text-sm outline-none ring-brand/30 focus:border-brand focus:ring-2"
          placeholder="ご意見・ご指摘・掲載に関するご相談など"
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
          送信に失敗しました。お手数ですが時間をおいて再度お試しください。
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-60">
        {status === "submitting" ? "送信中…" : "送信する"}
      </button>
      <p className="text-center text-xs text-gray-400">
        送信いただいた情報はお問い合わせ対応にのみ利用します（
        <a href="/privacy-policy" className="underline">プライバシーポリシー</a>）。
      </p>
    </form>
  );
}
