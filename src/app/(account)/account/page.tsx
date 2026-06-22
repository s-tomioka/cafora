"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LATTE_BOWL_COLOR_OPTIONS, LOGO_SURCHARGE, IS_PRE_OPEN, formatProductDisplayName } from "@/constants";
import type { LatteBowlColorOption } from "@/constants";
import {
  TwoToneSwatch,
  getTwoToneSplitForProduct,
} from "@/components/ui/two-tone-swatch";
import {
  buildReorderHref,
  stashReorderLogo,
} from "@/lib/reorder";

// ─── 型定義 ───────────────────────────────────────────────
type OrderItem = {
  slug: "on" | "kaku";
  image: string;
  product: string;
  capacity: string;
  baseUnitPrice: number;
  logoUnitPrice: number;
  unitPrice: number;
  quantity: number;
  colorOption: Pick<
    LatteBowlColorOption,
    "name" | "nameEn" | "upperHex" | "lowerHex"
  >;
  hasLogo: boolean;
  logoPreviewUrl?: string | null;
};

type Order = {
  id: string;
  date: string;
  total: number;
  shipping: number;
  status: "製作中" | "発送済み" | "納品済み";
  items: OrderItem[];
};

type AuthState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "loggedIn"; email: string };

// ─── モックデータ ─────────────────────────────────────────
const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2025-001",
    date: "2025年1月20日（月）",
    total: 80000,
    shipping: 0,
    status: "納品済み",
    items: [
      {
        slug: "on",
        image: "/images/product/latte-bowl-on.png",
        product: "温（ON）",
        capacity: "240ml",
        baseUnitPrice: 2000,
        logoUnitPrice: LOGO_SURCHARGE,
        unitPrice: 2500,
        quantity: 20,
        colorOption: LATTE_BOWL_COLOR_OPTIONS[3],
        hasLogo: true,
      },
      {
        slug: "kaku",
        image: "/images/product/latte-bowl-kaku.png",
        product: "拡（KAKU）",
        capacity: "280ml",
        baseUnitPrice: 2000,
        logoUnitPrice: LOGO_SURCHARGE,
        unitPrice: 2500,
        quantity: 20,
        colorOption: LATTE_BOWL_COLOR_OPTIONS[3],
        hasLogo: true,
      },
    ],
  },
  {
    id: "ORD-2024-001",
    date: "2024年11月15日（金）",
    total: 60000,
    shipping: 0,
    status: "納品済み",
    items: [
      {
        slug: "on",
        image: "/images/product/latte-bowl-on.png",
        product: "温（ON）",
        capacity: "240ml",
        baseUnitPrice: 2000,
        logoUnitPrice: 0,
        unitPrice: 2000,
        quantity: 30,
        colorOption: LATTE_BOWL_COLOR_OPTIONS[0],
        hasLogo: false,
      },
    ],
  },
];

// ─── 注文カード ───────────────────────────────────────────
function OrderCard({ order }: { order: Order }) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + order.shipping;

  return (
    <div className="border border-border">
      {/* ── ヘッダー ── */}
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-xs text-muted-foreground">{order.date}</p>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <p className="text-base font-semibold">お支払い合計（税込）</p>
          <p className="text-xl font-semibold tabular-nums">
            ¥{total.toLocaleString()}
          </p>
        </div>
        <p className="mt-1 text-right text-xs text-muted-foreground">
          うち、配送料　¥{order.shipping.toLocaleString()}
        </p>
      </div>

      {/* ── 商品テーブル ── */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        {/* テーブルヘッダー */}
        <div className="grid grid-cols-[1fr_60px_80px] items-center gap-x-3 py-2 text-xs text-muted-foreground sm:grid-cols-[1fr_80px_100px]">
          <span>商品</span>
          <span className="text-right">数量</span>
          <span className="text-right">合計</span>
        </div>

        {/* 商品行 */}
        <div className="divide-y divide-border">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_60px_80px] items-start gap-x-3 py-4 sm:grid-cols-[1fr_80px_100px]"
            >
              {/* 商品情報 */}
              <div className="flex gap-3 sm:gap-4">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative size-16 shrink-0 overflow-hidden bg-muted transition-opacity hover:opacity-70 sm:size-20"
                >
                  <Image
                    src={item.image}
                    alt={formatProductDisplayName(item.product)}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm font-medium transition-opacity hover:opacity-70"
                  >
                    {formatProductDisplayName(item.product)}
                  </Link>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground/70">
                        カラー
                      </span>
                      <TwoToneSwatch
                        upperHex={item.colorOption.upperHex}
                        lowerHex={item.colorOption.lowerHex}
                        split={getTwoToneSplitForProduct(item.product)}
                        className="size-4 shadow-sm"
                      />
                      <span className="text-[11px] text-muted-foreground">
                        {item.colorOption.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground/70">
                        ロゴ
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {item.hasLogo
                          ? `有（+¥${item.logoUnitPrice.toLocaleString()}/個）`
                          : "無"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium">
                    ¥{item.unitPrice.toLocaleString()}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">税込</span>
                  </p>
                  {!IS_PRE_OPEN && (
                    <Link
                      href={buildReorderHref(item.slug, {
                        colorNameEn: item.colorOption.nameEn,
                        capacity: item.capacity,
                        hasLogo: item.hasLogo,
                      })}
                      onClick={() => {
                        if (item.hasLogo && item.logoPreviewUrl) {
                          stashReorderLogo(item.logoPreviewUrl);
                        }
                      }}
                      className="mt-1.5 inline-block text-xs underline underline-offset-4 transition-opacity hover:opacity-50"
                    >
                      再購入
                    </Link>
                  )}
                </div>
              </div>

              {/* 数量 */}
              <p className="text-right text-sm tabular-nums leading-5">
                {item.quantity}
              </p>

              {/* 合計 */}
              <p className="text-right text-sm font-medium tabular-nums leading-5">
                ¥{(item.unitPrice * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ログインフォーム ─────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    onLogin(email);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {error && (
        <p className="border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide text-muted-foreground">
          メールアドレス <span className="text-foreground">*</span>
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
          placeholder="your@email.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-wide text-muted-foreground">
          パスワード <span className="text-foreground">*</span>
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
          placeholder="••••••••"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="bg-foreground px-12 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50"
        >
          ログイン
        </button>
      </div>
      <p className="pt-2 text-xs text-muted-foreground">
        アカウントをお持ちでない方は{" "}
        <Link
          href="/account/register"
          className="text-foreground underline underline-offset-4"
        >
          こちら
        </Link>
      </p>
    </form>
  );
}

// ─── メインコンテンツ（useSearchParams使用） ──────────────
function AccountContent() {
  const searchParams = useSearchParams();
  const demoState = searchParams.get("state");

  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    if (demoState === "orders" || demoState === "empty") {
      setAuth({ status: "loggedIn", email: "demo@cafora.jp" });
      return;
    }
    if (demoState === "guest") {
      setAuth({ status: "guest" });
      return;
    }
    const stored = localStorage.getItem("cafora_auth");
    if (stored) {
      const { email } = JSON.parse(stored);
      setAuth({ status: "loggedIn", email });
    } else {
      setAuth({ status: "guest" });
    }
  }, [demoState]);

  const handleLogin = (email: string) => {
    localStorage.setItem("cafora_auth", JSON.stringify({ email }));
    setAuth({ status: "loggedIn", email });
  };

  const handleLogout = () => {
    localStorage.removeItem("cafora_auth");
    setAuth({ status: "guest" });
  };

  if (auth.status === "loading") return null;

  const orders = demoState === "empty" ? [] : MOCK_ORDERS;

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        {/* ページ見出し */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold sm:text-2xl">マイページ</h1>
          {auth.status === "loggedIn" && !demoState && (
            <button
              onClick={handleLogout}
              className="text-xs text-muted-foreground underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              ログアウト
            </button>
          )}
        </div>

        {/* 未ログイン */}
        {auth.status === "guest" && (
          <div className="mx-auto mt-12 max-w-md sm:mt-16">
            <LoginForm onLogin={handleLogin} />
          </div>
        )}

        {/* ログイン済み */}
        {auth.status === "loggedIn" && (
          <div className="mt-10 sm:mt-12">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="text-sm text-muted-foreground">
                  注文した履歴はありません。
                </p>
                <Link
                  href="/products"
                  className="mt-6 bg-foreground px-10 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-50"
                >
                  商品を見る
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── メインページ（Suspenseラッパー） ────────────────────
export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountContent />
    </Suspense>
  );
}
