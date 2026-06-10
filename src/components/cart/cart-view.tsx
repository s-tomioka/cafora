"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Info } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { MIN_ORDER_QUANTITY, formatProductDisplayName } from "@/constants";
import { TwoToneSwatch, getTwoToneSplitForProduct } from "@/components/ui/two-tone-swatch";

const FREE_SHIPPING_THRESHOLD = 100000;

// ─── 数量ステッパー ───────────────────────────────────────
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
            } else {
              setQuantityError(false);
              onChange(value - 1);
            }
          }}
          className="inline-flex size-8 items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="数量を減らす"
        >
          <Minus className="size-3.5" />
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
              onChange(MIN_ORDER_QUANTITY);
              setQuantityError(false);
            }
          }}
          className="w-12 bg-transparent text-center text-sm font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={() => {
            setQuantityError(false);
            onChange(value + 1);
          }}
          className="inline-flex size-8 items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="数量を増やす"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
      {quantityError && (
        <p className="mt-2 text-xs text-red-500">
          最小注文ロット数は{MIN_ORDER_QUANTITY}個になります。
        </p>
      )}
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────────
export function CartView() {
  // CartContext から実際のカートデータを取得
  const { items, updateQuantity, removeItem } = useCart();
  const [showTooltip, setShowTooltip] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 0; // 現在は常に0
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="py-8 sm:py-12">
        <div className="container-cafora">
          <h1 className="text-xl font-semibold sm:text-2xl">カート</h1>
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-sm text-muted-foreground">
              カートに商品がありません。
            </p>
            <Link
              href="/products"
              className="mt-6 bg-foreground px-10 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-50"
            >
              商品を見る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <h1 className="text-xl font-semibold sm:text-2xl">カート</h1>

        {/* ── 商品テーブル ── */}
        <div className="mt-8 border border-border">
          {/* テーブルヘッダー（PCのみ） */}
          <div className="hidden grid-cols-[1fr_100px_110px] px-6 py-2 text-xs text-muted-foreground sm:grid">
            <span>商品</span>
            <span className="text-right">数量</span>
            <span className="text-right">合計</span>
          </div>

          {/* 商品行 */}
          <div className="divide-y divide-border">
            {items.map((item) => (
              <div key={item.id} className="px-5 py-5 sm:px-6">
                {/* PC: 3カラムグリッド */}
                <div className="hidden sm:grid sm:grid-cols-[1fr_100px_110px] sm:items-start sm:gap-x-3">
                  <div className="flex gap-4">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative size-20 shrink-0 overflow-hidden bg-muted transition-opacity hover:opacity-70"
                    >
                      <Image src={item.image} alt={formatProductDisplayName(item.name)} fill sizes="80px" className="object-cover" />
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
                              <span className="text-[11px] text-muted-foreground">{item.colorOption.name}</span>
                            </>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">なし</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground/70">ロゴ</span>
                          <span className="text-[11px] text-muted-foreground">
                            {item.hasLogo ? `有（+¥${item.logoUnitPrice.toLocaleString()}/個）` : "無"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        ¥{item.unitPrice.toLocaleString()}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">税込</span>
                      </p>
                      {item.logoUnitPrice > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          本体 ¥{item.baseUnitPrice.toLocaleString()} + ロゴ転写 ¥{item.logoUnitPrice.toLocaleString()}
                        </p>
                      )}
                      <button onClick={() => removeItem(item.id)} className="mt-1.5 text-xs text-red-500 underline-offset-2 transition-colors hover:underline">削除</button>
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <QuantityStepper value={item.quantity} onChange={(v) => updateQuantity(item.id, v)} />
                  </div>
                  <p className="pt-1 text-right text-sm font-medium tabular-nums">¥{(item.unitPrice * item.quantity).toLocaleString()}</p>
                </div>

                {/* SP: 縦積みレイアウト */}
                <div className="flex flex-col gap-4 sm:hidden">
                  <div className="flex gap-3">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative size-16 shrink-0 overflow-hidden bg-muted transition-opacity hover:opacity-70"
                    >
                      <Image src={item.image} alt={formatProductDisplayName(item.name)} fill sizes="64px" className="object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
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
                              <span className="text-[11px] text-muted-foreground">{item.colorOption.name}</span>
                            </>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">なし</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground/70">ロゴ</span>
                          <span className="text-[11px] text-muted-foreground">
                            {item.hasLogo ? `有（+¥${item.logoUnitPrice.toLocaleString()}/個）` : "無"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-medium">
                        ¥{item.unitPrice.toLocaleString()}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">税込</span>
                      </p>
                      {item.logoUnitPrice > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          本体 ¥{item.baseUnitPrice.toLocaleString()} + ロゴ転写 ¥{item.logoUnitPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantityStepper value={item.quantity} onChange={(v) => updateQuantity(item.id, v)} />
                    <p className="text-sm font-medium tabular-nums">¥{(item.unitPrice * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 underline-offset-2 transition-colors hover:underline">削除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── サマリー ── */}
        <div className="mt-6 flex flex-col items-end gap-2">
          {/* 送料無料ラベル */}
          <p className="rounded-none bg-muted px-3 py-1.5 text-xs text-muted-foreground">
            ¥{FREE_SHIPPING_THRESHOLD.toLocaleString()}以上で送料無料
          </p>

          {/* 配送料 */}
          <div className="flex items-center gap-3 text-sm">
            <div className="relative flex items-center gap-1">
              <span className="text-muted-foreground">配送料</span>
              <button
                onClick={() => setShowTooltip((v) => !v)}
                className="text-muted-foreground transition-opacity hover:opacity-70"
              >
                <Info className="size-3.5" />
              </button>
              {showTooltip && (
                <div className="absolute bottom-full right-0 mb-2 w-64 border border-border bg-background px-3 py-2.5 text-xs leading-relaxed text-muted-foreground shadow-sm">
                  一部地域（北海道・沖縄・離島）へのお届けには追加送料が発生する場合がございます。
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="ml-1 underline underline-offset-2"
                  >
                    閉じる
                  </button>
                </div>
              )}
            </div>
            <span className="tabular-nums">¥{shippingFee.toLocaleString()}</span>
          </div>

          {/* 合計 */}
          <div className="flex items-baseline gap-4">
            <span className="text-sm text-muted-foreground">お支払い合計（税込）</span>
            <span className="text-2xl font-semibold tabular-nums">
              ¥{total.toLocaleString()}
            </span>
          </div>

          {/* 購入ボタン */}
          <button className="mt-3 bg-foreground px-16 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50">
            購入手続き
          </button>
        </div>
      </div>
    </div>
  );
}
