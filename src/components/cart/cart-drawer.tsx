"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import {
  MIN_ORDER_QUANTITY,
  FREE_SHIPPING_QUANTITY,
  alertMinOrderQuantity,
  getMinOrderQuantityMessage,
  formatProductDisplayName,
} from "@/constants";
import { TwoToneSwatch, getTwoToneSplitForProduct } from "@/components/ui/two-tone-swatch";

function formatPrice(n: number) {
  return `¥${n.toLocaleString("ja-JP")}`;
}

// ─── 数量ステッパー ───────────────────────────────────────────
function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [quantityError, setQuantityError] = useState(false);

  return (
    <div className="w-max">
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            if (value <= MIN_ORDER_QUANTITY) {
              setQuantityError(true);
              alertMinOrderQuantity();
            } else {
              setQuantityError(false);
              onChange(value - 1);
            }
          }}
          className="inline-flex size-7 items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="数量を減らす"
        >
          <Minus className="size-3" />
        </button>
        <input
          type="number"
          min={MIN_ORDER_QUANTITY}
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) {
              onChange(val);
              setQuantityError(val < MIN_ORDER_QUANTITY);
            }
          }}
          onBlur={() => {
            if (value < MIN_ORDER_QUANTITY) {
              alertMinOrderQuantity();
              onChange(MIN_ORDER_QUANTITY);
              setQuantityError(false);
            }
          }}
          className="w-10 bg-transparent text-center text-sm font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={() => {
            setQuantityError(false);
            onChange(value + 1);
          }}
          className="inline-flex size-7 items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="数量を増やす"
        >
          <Plus className="size-3" />
        </button>
      </div>
      {quantityError && (
        <p className="mt-2 text-xs text-red-500">
          {getMinOrderQuantityMessage()}
        </p>
      )}
    </div>
  );
}

// ─── カートドロワー ───────────────────────────────────────────
export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, checkoutUrl } =
    useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee =
    totalQuantity >= FREE_SHIPPING_QUANTITY || subtotal === 0 ? 0 : 0;
  const total = subtotal + shippingFee;

  // ESC キーで閉じる
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDrawerOpen, closeDrawer]);

  // ドロワー表示中はbodyスクロールを止める
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* バックドロップ（ヘッダー下から） */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 sm:top-16 ${
          isDrawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* ドロワーパネル — SP:下から半モーダル / PC:右からスライド */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="カート"
        className={`fixed z-40 flex flex-col overflow-hidden bg-background shadow-2xl transition-transform duration-300 ease-in-out
          inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl sm:inset-x-auto sm:right-0 sm:top-16 sm:bottom-0 sm:max-h-none sm:w-full sm:max-w-[440px] sm:rounded-none
          ${isDrawerOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}
        `}
      >
        {/* ─── ヘッダー ─── */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-xl font-semibold">カート</h2>
          <button
            onClick={closeDrawer}
            className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="カートを閉じる"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ─── 合計・CTAボタン ─── */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              お支払い合計（税込）
            </span>
            <span className="text-2xl font-semibold">
              {formatPrice(total)}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex items-center justify-center border border-foreground py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              カートの確認
            </Link>
            {checkoutUrl?.startsWith("https://") ? (
              <a
                href={checkoutUrl}
                onClick={closeDrawer}
                className="flex items-center justify-center bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-70"
              >
                購入手続き
              </a>
            ) : (
              <button
                disabled
                className="flex cursor-not-allowed items-center justify-center bg-foreground/40 py-3 text-sm font-medium text-background"
              >
                購入手続き
              </button>
            )}
          </div>
        </div>

        {/* ─── 商品リスト ─── */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm text-muted-foreground">
                カートに商品がありません。
              </p>
              <Link
                href="/products"
                onClick={closeDrawer}
                className="mt-6 bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-70"
              >
                商品を見る
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <div key={item.id} className="px-6 py-5">
                  <div className="flex gap-4">
                    <Link
                      href={/^[a-z0-9-]+$/.test(item.slug) ? `/products/${item.slug}` : "/products"}
                      onClick={closeDrawer}
                      className="relative size-20 shrink-0 overflow-hidden bg-muted transition-opacity hover:opacity-70"
                    >
                      <Image
                        src={item.image}
                        alt={formatProductDisplayName(item.name)}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>

                    {/* 商品情報 */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeDrawer}
                        className="text-sm font-medium leading-snug transition-opacity hover:opacity-70"
                      >
                        {formatProductDisplayName(item.name)}
                        {item.capacity && (
                          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                            （{item.capacity}）
                          </span>
                        )}
                      </Link>
                      <p className="mt-1 text-sm">
                        {formatPrice(item.unitPrice)}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          税込
                        </span>
                      </p>
                      {item.logoUnitPrice > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          本体 {formatPrice(item.baseUnitPrice)} + ロゴ転写 {formatPrice(item.logoUnitPrice)}
                        </p>
                      )}

                      {/* カスタマイズ情報 */}
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {/* カラー */}
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
                        {/* ロゴ */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground/70">ロゴ</span>
                          <span className="text-[11px] text-muted-foreground">
                            {item.hasLogo ? `有（+${formatPrice(item.logoUnitPrice)}/個）` : "無"}
                          </span>
                        </div>
                      </div>

                      {/* 数量・削除 */}
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(v) => updateQuantity(item.id, v)}
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500 underline-offset-2 transition-colors hover:underline"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
