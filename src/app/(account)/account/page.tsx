"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { IS_PRE_OPEN, formatProductDisplayName } from "@/constants";
import {
  TwoToneSwatch,
  getTwoToneSplitForProduct,
} from "@/components/ui/two-tone-swatch";
import { buildReorderHref, stashReorderLogo } from "@/lib/reorder";
import { useCustomer } from "@/hooks/use-customer";
import type { AppOrder, AppOrderItem } from "@/lib/shopify/types";

const PRODUCT_IMAGE: Record<string, string> = {
  on: "/images/product/latte-bowl-on.webp",
  kaku: "/images/product/latte-bowl-kaku.webp",
};

// ─── 注文明細行 ───────────────────────────────────────────
function OrderItemRow({ item }: { item: AppOrderItem }) {
  return (
    <div className="grid grid-cols-[1fr_60px_80px] items-start gap-x-3 py-4 sm:grid-cols-[1fr_80px_100px]">
      <div className="flex gap-3 sm:gap-4">
        <Link
          href={`/products/${item.slug}`}
          className="relative size-16 shrink-0 overflow-hidden bg-muted transition-opacity hover:opacity-70 sm:size-20"
        >
          <Image
            src={PRODUCT_IMAGE[item.slug] ?? "/images/product/latte-bowl-on.webp"}
            alt={formatProductDisplayName(item.name)}
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
            {formatProductDisplayName(item.name)}（{item.capacity}）
          </Link>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/70">カラー</span>
              {item.colorOption ? (
                <>
                  <TwoToneSwatch
                    upperHex={item.colorOption.upperHex}
                    lowerHex={item.colorOption.lowerHex}
                    split={getTwoToneSplitForProduct(item.name)}
                    className="size-4 shadow-sm"
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {item.colorOption.name}
                  </span>
                </>
              ) : (
                <span className="text-[11px] text-muted-foreground">なし</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/70">ロゴ</span>
              <span className="text-[11px] text-muted-foreground">
                {item.hasLogo ? "有" : "無"}
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm font-medium">
            ¥{item.unitPrice.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-muted-foreground">税込</span>
          </p>
          {!IS_PRE_OPEN && item.colorOption && (
            <Link
              href={buildReorderHref(item.slug, {
                colorNameEn: item.colorOption.nameEn,
                capacity: item.capacity,
                hasLogo: item.hasLogo,
              })}
              onClick={() => {
                if (item.hasLogo && item.logoUrl) {
                  stashReorderLogo(item.logoUrl);
                }
              }}
              className="mt-1.5 inline-block text-xs underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              再購入
            </Link>
          )}
        </div>
      </div>

      <p className="text-right text-sm tabular-nums leading-5">{item.quantity}</p>
      <p className="text-right text-sm font-medium tabular-nums leading-5">
        ¥{(item.unitPrice * item.quantity).toLocaleString()}
      </p>
    </div>
  );
}

// ─── 注文カード ───────────────────────────────────────────
function OrderCard({ order }: { order: AppOrder }) {
  return (
    <div className="border border-border">
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-xs text-muted-foreground">{order.processedAt}</p>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <p className="text-base font-semibold">お支払い合計（税込）</p>
          <p className="text-xl font-semibold tabular-nums">
            ¥{order.totalAmount.toLocaleString()}
          </p>
        </div>
        <p className="mt-1 text-right text-xs text-muted-foreground">
          注文番号: {order.orderNumber}
        </p>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="grid grid-cols-[1fr_60px_80px] items-center gap-x-3 py-2 text-xs text-muted-foreground sm:grid-cols-[1fr_80px_100px]">
          <span>商品</span>
          <span className="text-right">数量</span>
          <span className="text-right">合計</span>
        </div>
        <div className="divide-y divide-border">
          {order.items.map((item, i) => (
            <OrderItemRow key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ログインフォーム ─────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "ログインに失敗しました。");
        return;
      }
      onSuccess();
    } catch {
      setError("通信エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
          className="bg-foreground px-12 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? "ログイン中..." : "ログイン"}
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

// ─── メインコンテンツ ─────────────────────────────────────
function AccountContent() {
  const { customer, orders, isLoading, isLoggedIn, logout, refetch } =
    useCustomer();

  if (isLoading) return null;

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold sm:text-2xl">マイページ</h1>
          {isLoggedIn && (
            <button
              onClick={logout}
              className="text-xs text-muted-foreground underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              ログアウト
            </button>
          )}
        </div>

        {!isLoggedIn && (
          <div className="mx-auto mt-12 max-w-md sm:mt-16">
            <LoginForm onSuccess={refetch} />
          </div>
        )}

        {isLoggedIn && (
          <div className="mt-10 sm:mt-12">
            {customer && (
              <p className="mb-6 text-sm text-muted-foreground">
                {customer.firstName && `${customer.firstName} `}
                {customer.lastName} 様（{customer.email}）
              </p>
            )}
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

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountContent />
    </Suspense>
  );
}
