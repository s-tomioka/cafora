"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { FadeUp } from "@/components/ui/scroll-animate";

const INQUIRY_TYPES = [
  { value: "", label: "選択してください" },
  { value: "order", label: "ご注文・お見積もりについて" },
  { value: "customize", label: "カスタマイズについて" },
  { value: "delivery", label: "配送・納期について" },
  { value: "development", label: "開発への参加相談" },
  { value: "other", label: "その他" },
] as const;

const VALID_TYPES = new Set(
  INQUIRY_TYPES.map((t) => t.value).filter(Boolean),
);

function FaqContactSectionInner() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const typeParam = searchParams.get("type") ?? "";
  const defaultType = VALID_TYPES.has(typeParam as (typeof INQUIRY_TYPES)[number]["value"])
    ? typeParam
    : "";

  useEffect(() => {
    if (window.location.hash !== "#contact" && typeParam !== "development") return;

    const timer = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [typeParam]);

  return (
    <FadeUp
      className="mt-20 mb-8 max-w-2xl scroll-mt-24 border-t border-border pt-16 sm:mx-auto sm:mt-28 sm:mb-12 sm:pt-20"
    >
      <div id="contact" ref={sectionRef} className="scroll-mt-24">
        <h2 className="text-lg font-semibold sm:text-xl">お問合せ</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          ご不明な点やご相談がありましたら、下記フォームよりお気軽にお問合せください。
          通常2〜3営業日以内にご返信いたします。
        </p>

        <form className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-muted-foreground">
                お名前 <span className="text-foreground">*</span>
              </label>
              <input
                type="text"
                required
                className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                placeholder="山田 太郎"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-wide text-muted-foreground">
                店舗名 / 会社名
              </label>
              <input
                type="text"
                className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                placeholder="〇〇カフェ"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              メールアドレス <span className="text-foreground">*</span>
            </label>
            <input
              type="email"
              required
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              お問合せ種別
            </label>
            <select
              key={defaultType}
              defaultValue={defaultType}
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
            >
              {INQUIRY_TYPES.map((type) => (
                <option key={type.value || "empty"} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              お問合せ内容 <span className="text-foreground">*</span>
            </label>
            <textarea
              required
              rows={6}
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
              placeholder="ご質問・ご要望をご記入ください"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-foreground px-12 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50"
            >
              送信する
            </button>
          </div>
        </form>
      </div>
    </FadeUp>
  );
}

export function FaqContactSection() {
  return (
    <Suspense
      fallback={
        <div className="mt-20 mb-8 max-w-2xl border-t border-border pt-16 sm:mx-auto sm:mt-28 sm:mb-12 sm:pt-20">
          <div id="contact" className="scroll-mt-24">
            <h2 className="text-lg font-semibold sm:text-xl">お問合せ</h2>
          </div>
        </div>
      }
    >
      <FaqContactSectionInner />
    </Suspense>
  );
}
