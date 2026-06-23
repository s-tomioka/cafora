import { Resend } from "resend";
import {
  contactSchema,
  inquiryTypeLabel,
  type ContactFields,
} from "@/lib/contact-schema";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 改行を <br> に変換（本文表示用、エスケープ後に適用）
function nl2br(str: string): string {
  return escapeHtml(str).replace(/\r?\n/g, "<br>");
}

function buildShopHtml(c: ContactFields): string {
  return `
<h2>お問合せが届きました</h2>
<table style="border-collapse:collapse">
  <tr><th style="text-align:left;padding:4px 12px 4px 0">お名前</th><td>${escapeHtml(c.name)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">店舗名・会社名</th><td>${escapeHtml(c.company ?? "")}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">メールアドレス</th><td>${escapeHtml(c.email)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">お問合せ種別</th><td>${escapeHtml(inquiryTypeLabel(c.type))}</td></tr>
</table>
<h3 style="margin-top:16px">お問合せ内容</h3>
<p>${nl2br(c.message)}</p>
`.trim();
}

function buildCustomerHtml(c: ContactFields): string {
  return `
<p>${escapeHtml(c.name)} 様</p>
<p>この度は CAFORA へお問合せいただきありがとうございます。</p>
<p>以下の内容でお問合せを受け付けました。通常2〜3営業日以内にご返信いたします。</p>
<table style="border-collapse:collapse">
  <tr><th style="text-align:left;padding:4px 12px 4px 0">お問合せ種別</th><td>${escapeHtml(inquiryTypeLabel(c.type))}</td></tr>
</table>
<h3 style="margin-top:16px">お問合せ内容</h3>
<p>${nl2br(c.message)}</p>
<p>なお、本メールは送信専用です。ご返信は担当者よりあらためてご連絡いたします。</p>
<p>CAFORA</p>
`.trim();
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const result = contactSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 });
  }
  const contact = result.data;

  const shopEmail = process.env.SHOP_EMAIL!;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Resend SDK は API エラー時も例外を投げず error フィールドで返すため明示的に確認する
    const shopResult = await resend.emails.send({
      from,
      to: shopEmail,
      replyTo: contact.email,
      subject: `【CAFORA】お問合せ：${inquiryTypeLabel(contact.type)}`,
      html: buildShopHtml(contact),
    });
    if (shopResult.error) {
      console.error("[contact] shop email failed:", shopResult.error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    const customerResult = await resend.emails.send({
      from,
      to: contact.email,
      subject: "【お問合せ確認】CAFORA よりお問合せを受け付けました",
      html: buildCustomerHtml(contact),
    });
    if (customerResult.error) {
      console.error("[contact] customer email failed:", customerResult.error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (e) {
    console.error("[contact] unexpected error:", e);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
