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

  const result = await customerAccessTokenCreate(email, password);

  if (result.customerUserErrors.length > 0 || !result.customerAccessToken) {
    return NextResponse.json(
      { error: "メールアドレスまたはパスワードが正しくありません。" },
      { status: 401 },
    );
  }

  const { accessToken, expiresAt } = result.customerAccessToken;
  const maxAge = Math.max(
    0,
    Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
  );

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
