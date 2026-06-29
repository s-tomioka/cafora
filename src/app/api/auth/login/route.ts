import { NextRequest, NextResponse } from "next/server";
import { customerAccessTokenCreate } from "@/lib/shopify";

const TOKEN_COOKIE = "shopify_customer_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30日

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "メールアドレスとパスワードは必須です。" },
      { status: 400 },
    );
  }

  const result = await customerAccessTokenCreate(email, password);

  if (result.customerUserErrors.length > 0 || !result.customerAccessToken) {
    return NextResponse.json(
      { error: "メールアドレスまたはパスワードが正しくありません。" },
      { status: 401 },
    );
  }

  const { accessToken } = result.customerAccessToken;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return res;
}
