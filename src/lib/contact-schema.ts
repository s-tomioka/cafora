import { z } from "zod";

// お問合せ種別（クライアントの select と API のラベル変換で共用）
export const INQUIRY_TYPES = [
  { value: "", label: "選択してください" },
  { value: "order", label: "ご注文・お見積もりについて" },
  { value: "customize", label: "カスタマイズについて" },
  { value: "delivery", label: "配送・納期について" },
  { value: "development", label: "開発への参加相談" },
  { value: "other", label: "その他" },
] as const;

export type InquiryTypeValue = (typeof INQUIRY_TYPES)[number]["value"];

// value -> label 変換（メール本文用）
export function inquiryTypeLabel(value: string): string {
  return INQUIRY_TYPES.find((t) => t.value === value)?.label ?? "未選択";
}

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .regex(/^[^\r\n]+$/, "お名前に改行を含めることはできません"),
  company: z
    .string()
    .regex(/^[^\r\n]*$/, "店舗名・会社名に改行を含めることはできません")
    .optional(),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  type: z.enum([
    "",
    "order",
    "customize",
    "delivery",
    "development",
    "other",
  ]),
  message: z.string().min(1, "お問合せ内容を入力してください"),
});

export type ContactFields = z.infer<typeof contactSchema>;
