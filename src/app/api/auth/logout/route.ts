import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { customerAccessTokenDelete } from "@/lib/shopify";

const TOKEN_COOKIE = "shopify_customer_token";

export async function POST(_req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (token) {
    await customerAccessTokenDelete(token).catch(() => {});
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.delete(TOKEN_COOKIE);
  return res;
}
