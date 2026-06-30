import { NextRequest, NextResponse } from "next/server";
import { customerCreate } from "@/lib/shopify";

const ERROR_MESSAGES: Record<string, string> = {
  EMAIL_TAKEN: "このメールアドレスはすでに登録されています。",
  BLANK: "入力必須の項目が空です。",
  INVALID: "入力内容が正しくありません。",
  TOO_SHORT: "パスワードは8文字以上で入力してください。",
  TOO_LONG: "入力文字数が上限を超えています。",
};

export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "メールアドレスとパスワードは必須です。" },
      { status: 400 },
    );
  }

  const result = await customerCreate({
    email,
    password,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
  });

  if (result.customerUserErrors.length > 0) {
    const code = result.customerUserErrors[0].code;
    const message = ERROR_MESSAGES[code] ?? result.customerUserErrors[0].message;
    return NextResponse.json({ error: message }, { status: 422 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
