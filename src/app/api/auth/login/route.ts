import { NextRequest, NextResponse } from "next/server";
import { customerAccessTokenCreate } from "@/lib/shopify";

const TOKEN_COOKIE = "shopify_customer_token";

export async function POST(req: NextRequest) {
  let email: string, password: string;
  try {
    ({ email, password } = await req.json());
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: "メールアドレスとパスワードは必須です。" },
      { status: 400 },
    );
  }

  let result;
  try {
    result = await customerAccessTokenCreate(email, password);
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。しばらく後でお試しください。" },
      { status: 503 },
    );
  }

  if (result.customerUserErrors.length > 0 || !result.customerAccessToken) {
    return NextResponse.json(
      { error: "メールアドレスまたはパスワードが正しくありません。" },
      { status: 401 },
    );
  }

  const { accessToken, expiresAt } = result.customerAccessToken;
  const FALLBACK_MAX_AGE = 60 * 60 * 24 * 30;
  const expiresAtMs = new Date(expiresAt).getTime();
  const maxAge =
    Number.isFinite(expiresAtMs) && expiresAtMs > Date.now()
      ? Math.floor((expiresAtMs - Date.now()) / 1000)
      : FALLBACK_MAX_AGE;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });

  return res;
}
