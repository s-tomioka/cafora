import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomer } from "@/lib/shopify";

const TOKEN_COOKIE = "shopify_customer_token";

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ customer: null, orders: [] });
  }

  try {
    const { customer, orders } = await getCustomer(token);
    if (!customer) {
      const res = NextResponse.json({ customer: null, orders: [] });
      res.cookies.delete(TOKEN_COOKIE);
      return res;
    }
    return NextResponse.json({ customer, orders });
  } catch {
    return NextResponse.json(
      { error: "認証情報の取得に失敗しました。" },
      { status: 500 },
    );
  }
}
