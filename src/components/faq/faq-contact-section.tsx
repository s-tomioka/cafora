"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { FadeUp } from "@/components/ui/scroll-animate";
import {
  INQUIRY_TYPES,
  contactSchema,
  type ContactFields,
  type InquiryTypeValue,
} from "@/lib/contact-schema";

const VALID_TYPES = new Set(
  INQUIRY_TYPES.map((t) => t.value).filter(Boolean),
);

function FaqContactSectionInner() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLDivElement>(null);
  const typeParam = searchParams.get("type") ?? "";
  const defaultType = VALID_TYPES.has(
    typeParam as (typeof INQUIRY_TYPES)[number]["value"],
  )
    ? (typeParam as InquiryTypeValue)
    : "";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<InquiryTypeValue>(defaultType);
  const [message, setMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFields, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.location.hash !== "#contact" && typeParam !== "development") return;

    const timer = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [typeParam]);

  // URLパラメータが変わったら種別を追従（初期値同様の挙動）
  useEffect(() => {
    setType(defaultType);
  }, [defaultType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const values: ContactFields = { name, company, email, type, message };
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errs.name?.[0],
        company: errs.company?.[0],
        email: errs.email?.[0],
        type: errs.type?.[0],
        message: errs.message?.[0],
      });
      return;
    }
    setFieldErrors({});

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("company", company);
      fd.append("email", email);
      fd.append("type", type);
      fd.append("message", message);

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) throw new Error("送信に失敗しました");
      setDone(true);
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FadeUp className="mt-20 mb-8 max-w-2xl scroll-mt-24 border-t border-border pt-16 sm:mx-auto sm:mt-28 sm:mb-12 sm:pt-20">
      <div id="contact" ref={sectionRef} className="scroll-mt-24">
        <h2 className="text-lg font-semibold sm:text-xl">お問合せ</h2>

        {done ? (
          <div className="mt-8 flex flex-col items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Check className="size-5 text-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium">お問合せを受け付けました。</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              ご入力いただいたメールアドレスに確認メールをお送りしました。
              通常2〜3営業日以内にご返信いたします。
            </p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              ご不明な点やご相談がありましたら、下記フォームよりお気軽にお問合せください。
              通常2〜3営業日以内にご返信いたします。
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-wide text-muted-foreground">
                    お名前 <span className="text-foreground">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                    placeholder="山田 太郎"
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-600">{fieldErrors.name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-wide text-muted-foreground">
                    店舗名 / 会社名
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                    placeholder="〇〇カフェ"
                  />
                  {fieldErrors.company && (
                    <p className="text-xs text-red-600">{fieldErrors.company}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-wide text-muted-foreground">
                  メールアドレス <span className="text-foreground">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                  placeholder="your@email.com"
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-wide text-muted-foreground">
                  お問合せ種別
                </label>
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as InquiryTypeValue)
                  }
                  className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
                >
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t.value || "empty"} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-wide text-muted-foreground">
                  お問合せ内容 <span className="text-foreground">*</span>
                </label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
                  placeholder="ご質問・ご要望をご記入ください"
                />
                {fieldErrors.message && (
                  <p className="text-xs text-red-600">{fieldErrors.message}</p>
                )}
              </div>

              <div className="flex flex-col items-start gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-foreground px-12 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "送信中..." : "送信する"}
                </button>
                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
              </div>
            </form>
          </>
        )}
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
