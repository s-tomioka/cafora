"use client"

// ─────────────────────────────────────────────────────────────
// UIライブラリ / デザインシステム
// CAFORA 開発者・デザイナー確認用ページ
// ─────────────────────────────────────────────────────────────

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AccordionItem } from "@/components/ui/accordion"
import { CaforaLogo } from "@/components/ui/cafora-logo"
import { MaterialIcon } from "@/components/ui/material-icon"
import { FadeIn, FadeUp, StaggerChildren } from "@/components/ui/scroll-animate"
import { DEFAULT_COLORS, MIN_ORDER_QUANTITY, getMinOrderQuantityMessage } from "@/constants"
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Upload,
  User,
  X,
} from "lucide-react"

// ─────────────────────────────────────────
// レイアウトユーティリティ
// ─────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 mt-14">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {children}
      </h2>
      <Separator className="mt-2" />
    </div>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
      {children}
    </p>
  )
}

function Row({
  label,
  note,
  children,
}: {
  label?: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6">
      {label && (
        <div className="mb-3 flex items-baseline gap-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          {note && <p className="text-[10px] text-muted-foreground/60">{note}</p>}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────
// CTAボタン（border スタイル）
// 使用箇所: page.tsx SplitButton / CtaButton
// ─────────────────────────────────────────
function CtaButton({ children = "詳しくみる" }: { children?: string }) {
  return (
    <button className="inline-flex items-center justify-center border border-foreground px-12 py-4 text-sm font-medium transition-colors duration-300 ease-in-out hover:bg-foreground hover:text-background">
      {children}
    </button>
  )
}

// ─────────────────────────────────────────
// カラースウォッチ（丸、インタラクティブ）
// 使用箇所: product-detail.tsx ColorSwatches
// ─────────────────────────────────────────
function DemoColorSwatches() {
  const [selected, setSelected] = useState<string | null>(DEFAULT_COLORS[0].nameEn)
  return (
    <div className="flex flex-wrap gap-2">
      {/* なし オプション */}
      <button
        onClick={() => setSelected(null)}
        title="なし"
        aria-label="なし"
        className="relative size-9 rounded-full border transition-all duration-200"
        style={{
          backgroundColor: "#ffffff",
          borderColor: selected === null ? "#1a1a1a" : "#d1d5db",
        }}
      >
        <svg viewBox="0 0 36 36" className="absolute inset-0 size-full p-1" aria-hidden="true">
          <line x1="6" y1="30" x2="30" y2="6" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {selected === null && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Check className="size-3.5 text-foreground drop-shadow-sm" />
          </span>
        )}
      </button>
      {DEFAULT_COLORS.map((color) => (
        <button
          key={color.nameEn}
          onClick={() => setSelected(color.nameEn)}
          title={color.name}
          aria-label={color.name}
          className="relative size-9 rounded-full border transition-all duration-200"
          style={{
            backgroundColor: color.hexCode,
            borderColor: selected === color.nameEn ? "#1a1a1a" : "#d1d5db",
          }}
        >
          {selected === color.nameEn && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Check
                className="size-3.5 drop-shadow-sm"
                style={{
                  color: color.hexCode === "#F5F5F0" ? "#1a1a1a" : "#ffffff",
                  filter: color.hexCode === "#F5F5F0" ? "none" : "drop-shadow(0 1px 1px rgba(0,0,0,0.4))",
                }}
              />
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────
// カスタムチェックボックス（ロゴ有無）
// 使用箇所: product-detail.tsx
// ─────────────────────────────────────────
function DemoCheckbox() {
  const [checked, setChecked] = useState(false)
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span
        className={`inline-flex size-4 shrink-0 items-center justify-center border transition-colors ${
          checked ? "border-foreground bg-foreground" : "border-border bg-background"
        }`}
      >
        {checked && <Check className="size-2.5 text-background" />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm text-muted-foreground">ロゴをつける</span>
    </label>
  )
}

// ─────────────────────────────────────────
// 数量ステッパー
// 使用箇所: product-detail.tsx / cart-drawer.tsx / cart-view.tsx
// ─────────────────────────────────────────
function DemoQuantityStepper() {
  const [qty, setQty] = useState(MIN_ORDER_QUANTITY)
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="inline-flex size-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
        aria-label="数量を減らす"
      >
        <Minus className="size-3.5" />
      </button>
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (!isNaN(v) && v >= 1) setQty(v)
        }}
        className="w-12 bg-transparent text-center text-base font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        onClick={() => setQty((q) => q + 1)}
        className="inline-flex size-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
        aria-label="数量を増やす"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────
// カテゴリフィルター
// 使用箇所: journal/page.tsx
// ─────────────────────────────────────────
function DemoCategoryFilter() {
  const categories = ["すべて", "導入事例", "食器のこと", "開業準備", "カフェ運営"]
  const [active, setActive] = useState("すべて")
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
            active === cat
              ? "bg-foreground text-background"
              : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────
// ロゴアップロードエリア
// 使用箇所: product-detail.tsx
// ─────────────────────────────────────────
function DemoLogoUpload() {
  return (
    <label
      className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-1.5 border border-dashed border-border bg-muted/30 px-4 py-6 text-center transition-colors hover:bg-muted/60"
      htmlFor="demo-logo-upload"
    >
      <input type="file" id="demo-logo-upload" className="sr-only" />
      <Upload className="size-5 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">ロゴデータをアップロード</span>
      <span className="text-xs text-muted-foreground/70">（EPS・SVG形式推奨）</span>
    </label>
  )
}

// ─────────────────────────────────────────
// スクロール進捗バー
// 使用箇所: features-section.tsx / product-detail.tsx FeatureGalleryScroll
// ─────────────────────────────────────────
function DemoScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-px w-full bg-border">
      <div className="h-px bg-foreground transition-all duration-100" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

// ─────────────────────────────────────────
// ツールチップ
// 使用箇所: cart-view.tsx 配送料Info
// ─────────────────────────────────────────
function DemoTooltip() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative inline-flex items-center gap-1">
      <span className="text-sm text-muted-foreground">配送料</span>
      <button
        onClick={() => setShow((v) => !v)}
        className="text-muted-foreground transition-opacity hover:opacity-70"
        aria-label="配送料の詳細"
      >
        <Info className="size-3.5" />
      </button>
      {show && (
        <div className="absolute bottom-full right-0 z-10 mb-2 w-64 border border-border bg-background px-3 py-2.5 text-xs leading-relaxed text-muted-foreground shadow-sm">
          送料は配送エリア・配送数量・配送先数によって異なります。30個（最低納品数）ご注文時の目安送料はよくあるご質問をご確認ください。
          <button onClick={() => setShow(false)} className="ml-1 underline underline-offset-2">
            閉じる
          </button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// ページ本体
// ─────────────────────────────────────────
export default function DesignPage() {
  // Semantic colors
  const semanticColors = [
    { name: "Background", bg: "bg-background", hex: "#ffffff", border: true },
    { name: "Foreground", bg: "bg-foreground", hex: "#1a1a1a" },
    { name: "Primary", bg: "bg-primary", hex: "#1a1a1a" },
    { name: "Primary FG", bg: "bg-primary-foreground", hex: "#ffffff", border: true },
    { name: "Muted", bg: "bg-muted", hex: "#f5f5f0" },
    { name: "Muted FG", bg: "bg-muted-foreground", hex: "#777777" },
    { name: "Destructive", bg: "bg-destructive", hex: "#dc2626" },
    { name: "Border", bg: "bg-border", hex: "#e5e5e5" },
  ]

  const icons = [
    { Icon: ArrowRight, name: "ArrowRight" },
    { Icon: ArrowUp, name: "ArrowUp" },
    { Icon: Check, name: "Check" },
    { Icon: ChevronLeft, name: "ChevronLeft" },
    { Icon: ChevronRight, name: "ChevronRight" },
    { Icon: ExternalLink, name: "ExternalLink" },
    { Icon: Info, name: "Info" },
    { Icon: Menu, name: "Menu" },
    { Icon: Minus, name: "Minus" },
    { Icon: Plus, name: "Plus" },
    { Icon: ShoppingBag, name: "ShoppingBag" },
    { Icon: Upload, name: "Upload" },
    { Icon: User, name: "User" },
    { Icon: X, name: "X" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* ページヘッダー */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            UIライブラリ / デザインシステム
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            CAFORA コンポーネント集（開発者・デザイナー確認用）
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            フォント: Noto Serif JP &nbsp;|&nbsp; Tailwind CSS v4 &nbsp;|&nbsp; Base UI
          </p>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 1. COLOR — セマンティックカラー         */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>01 · Color — Semantic</SectionTitle>
        {/* 使用箇所: globals.css CSS変数。全ページで使用。 */}
        <div className="mb-6 flex flex-wrap gap-5">
          {semanticColors.map((c) => (
            <div key={c.name} className="flex flex-col gap-1.5">
              <div className={`h-14 w-24 ${c.bg} ${c.border ? "border border-border" : ""}`} />
              <p className="text-xs font-medium">{c.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{c.hex}</p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 2. COLOR — プロダクトアクセントカラー  */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>02 · Color — Product Accent</SectionTitle>
        {/* 使用箇所: constants/index.ts DEFAULT_COLORS / product-detail.tsx ColorSwatches / products/page.tsx スウォッチオーバーレイ */}
        <div className="mb-6 flex flex-wrap gap-5">
          {DEFAULT_COLORS.map((c) => (
            <div key={c.nameEn} className="flex flex-col gap-1.5">
              <div
                className="h-14 w-24 border border-border"
                style={{ backgroundColor: c.hexCode }}
              />
              <p className="text-xs font-medium">{c.name}</p>
              <p className="text-[10px] text-muted-foreground">{c.nameEn}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{c.hexCode}</p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 3. TYPOGRAPHY                          */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>03 · Typography</SectionTitle>
        {/* 使用箇所: 各ページの見出し・本文・キャプション */}
        <div className="mb-6 space-y-6">
          {[
            {
              label: "Page H1",
              spec: "text-xl font-semibold sm:text-2xl",
              text: "商品を探す",
              desc: "各ページのタイトル（商品一覧、カート、マイページなど）",
              cls: "text-xl font-semibold sm:text-2xl",
            },
            {
              label: "Section H2",
              spec: "text-xl font-semibold sm:text-2xl",
              text: "Our Products",
              desc: "トップページのセクション見出し（中央揃え）",
              cls: "text-xl font-semibold sm:text-2xl",
            },
            {
              label: "Sub H2",
              spec: "text-lg font-semibold sm:text-xl",
              text: "商品情報",
              desc: "商品詳細・ブランドページの中見出し",
              cls: "text-lg font-semibold sm:text-xl",
            },
            {
              label: "Chapter H2",
              spec: "text-2xl font-bold tracking-[0.035em]",
              text: "器は、体験をつくる",
              desc: "brand/page.tsx のチャプター見出し（ScrollRevealText）",
              cls: "text-2xl font-bold tracking-tight",
            },
            {
              label: "Product Name H3",
              spec: "text-2xl font-bold sm:text-3xl",
              text: "温（ON）",
              desc: "商品名（トップページカード・商品一覧・他商品リンク）",
              cls: "text-2xl font-bold sm:text-3xl",
            },
            {
              label: "Barista H1",
              spec: "text-3xl font-bold tracking-tight sm:text-5xl",
              text: "バリスタと共に、器をつくる",
              desc: "barista/page.tsx ページヘッダー（最大サイズ）",
              cls: "text-3xl font-bold tracking-tight",
            },
            {
              label: "Body",
              spec: "text-sm leading-relaxed sm:text-base",
              text: "一杯をもっと美しく。味わう時間をもっとやさしく。",
              desc: "説明文・ストーリーテキスト",
              cls: "text-sm leading-relaxed sm:text-base",
            },
            {
              label: "Body Long",
              spec: "text-[15px] leading-[2em]",
              text: "CAFORAは、器をつくるブランドではありません。器を起点に、カフェという体験そのものを設計するブランドです。",
              desc: "brand/page.tsx 本文（和文長文）",
              cls: "text-[15px] leading-[2em]",
            },
            {
              label: "Feature Card Title",
              spec: "text-sm font-semibold sm:text-base",
              text: "手になじむフォルム",
              desc: "features-section.tsx / FeatureGalleryScroll カードタイトル",
              cls: "text-sm font-semibold",
            },
            {
              label: "Small Label",
              spec: "text-xs font-medium",
              text: "アクセントカラー",
              desc: "フォームラベル・補足項目名",
              cls: "text-xs font-medium",
            },
            {
              label: "Tracking Label",
              spec: "text-[10px] tracking-[0.4em] text-muted-foreground",
              text: "WITH BARISTAS",
              desc: "セクション章番号・タグ（barista / feature card）",
              cls: "text-[10px] tracking-[0.4em] text-muted-foreground",
            },
            {
              label: "Caption",
              spec: "text-xs text-muted-foreground",
              text: "税込 / 280ml",
              desc: "メタ情報・補足テキスト・価格サフィックス",
              cls: "text-xs text-muted-foreground",
            },
          ].map(({ label, spec, text, desc, cls }) => (
            <div key={label} className="grid grid-cols-[180px_1fr] gap-4">
              <div>
                <p className="text-xs font-medium">{label}</p>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{spec}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground/70">{desc}</p>
              </div>
              <p className={cls}>{text}</p>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 4. BUTTON                              */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>04 · Button</SectionTitle>

        {/* --- Button コンポーネント（Base UI ベース） --- */}
        {/* 使用箇所: product-detail.tsx カートに追加ボタン / 汎用CTAなど */}
        <SubTitle>Button コンポーネント（src/components/ui/button.tsx）</SubTitle>

        <Row label="Variant">
          <Button variant="default">default</Button>
          <Button variant="outline">outline</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="link">link</Button>
        </Row>

        <Row label="Size">
          <Button size="lg">lg</Button>
          <Button size="default">default</Button>
          <Button size="sm">sm</Button>
          <Button size="xs">xs</Button>
        </Row>

        <Row label="Icon Size">
          <Button size="icon-lg" variant="outline"><Plus /></Button>
          <Button size="icon" variant="outline"><Plus /></Button>
          <Button size="icon-sm" variant="outline"><Plus /></Button>
          <Button size="icon-xs" variant="outline"><Plus /></Button>
        </Row>

        <Row label="Disabled">
          <Button disabled>disabled default</Button>
          <Button variant="outline" disabled>disabled outline</Button>
        </Row>

        <Row
          label="CTA Fill — カートに追加 / 購入手続き"
          note="h-auto w-full rounded-none py-4 — product-detail.tsx / cart-view.tsx"
        >
          <Button className="h-auto rounded-none px-12 py-4 text-sm font-medium transition-all duration-300 ease-in-out hover:opacity-50">
            カートに追加
          </Button>
          <Button className="h-auto rounded-none px-12 py-4 text-sm font-medium transition-all duration-300 ease-in-out hover:opacity-50">
            購入手続き
          </Button>
        </Row>

        {/* --- CTA border スタイル --- */}
        {/* 使用箇所: page.tsx SplitButton / CtaButton (詳しくみる・もっとみる) */}
        <SubTitle>CTA Border スタイル（SplitButton / CtaButton — インライン実装）</SubTitle>
        <Row label="詳しくみる / もっとみる / もっと商品を探す">
          <CtaButton>詳しくみる</CtaButton>
          <CtaButton>もっとみる</CtaButton>
          <CtaButton>もっと知る</CtaButton>
        </Row>

        {/* --- カートドロワー内 CTAリンクボタン --- */}
        {/* 使用箇所: cart-drawer.tsx */}
        <SubTitle>カートドロワー内 CTA リンク（インライン実装）</SubTitle>
        <Row>
          <Link
            href="#"
            className="flex items-center justify-center border border-foreground px-8 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            カートの確認
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-70"
          >
            購入手続き
          </Link>
        </Row>

        {/* --- 空カート・空注文 CTA --- */}
        {/* 使用箇所: cart-drawer.tsx / cart-view.tsx / account/page.tsx 空状態 */}
        <SubTitle>空状態 CTA（インライン実装）</SubTitle>
        <Row>
          <Link
            href="#"
            className="bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-70"
          >
            商品を見る
          </Link>
        </Row>

        {/* --- テキストリンク / インラインリンク --- */}
        {/* 使用箇所: products/page.tsx・page.tsx 詳しくみる / journal記事カード */}
        <SubTitle>テキストリンク / インラインリンク</SubTitle>

        <Row label="詳しくみる リンク（商品カード）">
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            詳しくみる
            <ArrowRight className="size-3.5 transition-transform duration-500 ease-out hover:translate-x-1" />
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            読む
            <ArrowRight className="size-3 transition-transform duration-500 ease-out" />
          </Link>
        </Row>

        <Row label="ナビゲーションリンク（ヘッダー・フッター）">
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            商品を探す
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            CAFORAについて
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            よくあるご質問・お問合せ
          </Link>
        </Row>

        <Row label="ブランドページ内アンカーリンク（brand/page.tsx）">
          <Link
            href="#"
            className="text-xs text-foreground tracking-[0.071em] transition-opacity hover:opacity-70"
          >
            器は、体験をつくる
          </Link>
          <Link
            href="#"
            className="text-xs text-foreground tracking-[0.071em] transition-opacity hover:opacity-70"
          >
            技術が、体験を可能にする
          </Link>
        </Row>

        <Row label="アカウント内テキストリンク（下線付き）">
          <Link href="#" className="text-xs text-foreground underline underline-offset-4">
            ログイン
          </Link>
          <Link href="#" className="text-xs text-foreground underline underline-offset-4">
            こちら
          </Link>
          <button className="text-xs text-muted-foreground underline underline-offset-4 transition-opacity hover:opacity-50">
            ログアウト
          </button>
          <Link href="#" className="text-xs underline underline-offset-4 transition-opacity hover:opacity-50">
            再購入
          </Link>
        </Row>

        {/* フッター上のリンク */}
        <Row label="フッターリンク（bg-foreground 上）">
          <div className="flex flex-wrap gap-6 bg-foreground px-6 py-4">
            {["ホーム", "CAFORAについて", "ジャーナル", "よくある質問", "プライバシーポリシー"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-sm text-background/70 transition-colors hover:text-background"
              >
                {label}
              </Link>
            ))}
          </div>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 5. BADGE / TAG                         */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>05 · Badge / Tag</SectionTitle>

        {/* --- Badge コンポーネント（Base UI ベース） --- */}
        {/* 使用箇所: 将来的な SOLD OUT / NEW などのステータス表示 */}
        <SubTitle>Badge コンポーネント（src/components/ui/badge.tsx）</SubTitle>
        <Row label="Variant">
          <Badge variant="default">default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="ghost">ghost</Badge>
          <Badge variant="link">link</Badge>
        </Row>

        {/* --- カテゴリフィルタータグ --- */}
        {/* 使用箇所: journal/page.tsx カテゴリフィルター */}
        <SubTitle>カテゴリフィルタータグ（journal/page.tsx — インライン実装）</SubTitle>
        <Row>
          <DemoCategoryFilter />
        </Row>

        {/* --- ジャーナルカードのカテゴリラベル --- */}
        {/* 使用箇所: journal/page.tsx 記事カード内 / barista/page.tsx タグ */}
        <SubTitle>記事カード カテゴリラベル（テキスト + 日付）</SubTitle>
        <Row>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">食器のこと</span>
            <span className="text-xs text-muted-foreground/60">2025.12.10</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground">導入事例</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground">器の知識</span>
          </div>
        </Row>

        {/* --- 注文ステータスバッジ --- */}
        {/* 使用箇所: account/page.tsx OrderCard（将来的なステータス表示想定） */}
        <SubTitle>注文ステータス（account/page.tsx OrderCard）</SubTitle>
        <Row>
          {["製作中", "発送済み", "納品済み"].map((status) => (
            <span
              key={status}
              className="border border-border px-2.5 py-1 text-[10px] tracking-wide text-muted-foreground"
            >
              {status}
            </span>
          ))}
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 6. FORM / INPUT                        */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>06 · Form / Input</SectionTitle>

        {/* --- テキストインプット --- */}
        {/* 使用箇所: faq/page.tsx お問合せフォーム / account/page.tsx ログインフォーム / account/register/page.tsx */}
        <SubTitle>テキストインプット（faq/page.tsx・account — インライン実装）</SubTitle>
        <Row>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              メールアドレス <span className="text-foreground">*</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              パスワード <span className="text-foreground">*</span>
            </label>
            <input
              type="password"
              placeholder="8文字以上"
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              お名前 <span className="text-foreground">*</span>
            </label>
            <input
              type="text"
              placeholder="山田 太郎"
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
            />
          </div>
        </Row>

        {/* --- セレクト --- */}
        {/* 使用箇所: faq/page.tsx お問合せ種別 */}
        <SubTitle>セレクト（faq/page.tsx — インライン実装）</SubTitle>
        <Row>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">お問合せ種別</label>
            <select className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground">
              <option value="">選択してください</option>
              <option value="order">ご注文・お見積もりについて</option>
              <option value="customize">カスタマイズについて</option>
              <option value="delivery">配送・納期について</option>
              <option value="other">その他</option>
            </select>
          </div>
        </Row>

        {/* --- テキストエリア --- */}
        {/* 使用箇所: faq/page.tsx お問合せ内容 */}
        <SubTitle>テキストエリア（faq/page.tsx — インライン実装）</SubTitle>
        <Row>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-wide text-muted-foreground">
              お問合せ内容 <span className="text-foreground">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="ご質問・ご要望をご記入ください"
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
            />
          </div>
        </Row>

        {/* --- カスタムチェックボックス --- */}
        {/* 使用箇所: product-detail.tsx ロゴ有無チェック */}
        <SubTitle>カスタムチェックボックス（product-detail.tsx — インライン実装）</SubTitle>
        <Row>
          <DemoCheckbox />
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 7. QUANTITY STEPPER                    */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>07 · Quantity Stepper</SectionTitle>
        {/* 使用箇所: product-detail.tsx・cart-drawer.tsx・cart-view.tsx — インライン実装 */}
        <p className="mb-4 text-xs text-muted-foreground">
          最低注文数量制限（MIN_ORDER_QUANTITY = {MIN_ORDER_QUANTITY}）あり。各ファイルにインライン実装（共通コンポーネント化未対応）。
        </p>
        <SubTitle>商品詳細（size-8）</SubTitle>
        <Row>
          <DemoQuantityStepper />
        </Row>
        <SubTitle>カートドロワー（size-7）</SubTitle>
        <Row>
          <div className="flex items-center gap-1">
            <button className="inline-flex size-7 items-center justify-center border border-border transition-colors hover:bg-muted" aria-label="数量を減らす">
              <Minus className="size-3" />
            </button>
            <input type="number" value={MIN_ORDER_QUANTITY} readOnly className="w-10 bg-transparent text-center text-sm font-medium [appearance:textfield]" />
            <button className="inline-flex size-7 items-center justify-center border border-border transition-colors hover:bg-muted" aria-label="数量を増やす">
              <Plus className="size-3" />
            </button>
          </div>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 8. COLOR SWATCH                        */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>08 · Color Swatch</SectionTitle>

        {/* --- 丸スウォッチ（選択用） --- */}
        {/* 使用箇所: product-detail.tsx ColorSwatches */}
        <SubTitle>丸スウォッチ（選択インタラクション付き、nullable対応）— product-detail.tsx</SubTitle>
        <Row label="食器カラー / アクセントカラー選択（クリックで切り替え）">
          <DemoColorSwatches />
        </Row>

        {/* --- 商品カードスウォッチオーバーレイ --- */}
        {/* 使用箇所: products/page.tsx・page.tsx 商品カード画像オーバーレイ */}
        <SubTitle>カードオーバーレイ スウォッチ（size-3 — products/page.tsx・page.tsx）</SubTitle>
        <Row label="商品画像の下部に表示するカラーインジケーター">
          <div className="flex gap-1.5 rounded border border-border bg-muted/30 px-3 py-2">
            {DEFAULT_COLORS.map((color) => (
              <span
                key={color.nameEn}
                className="size-3 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              />
            ))}
          </div>
        </Row>

        {/* --- 丸スウォッチ表示（情報表示用） --- */}
        {/* 使用箇所: cart-drawer.tsx・cart-view.tsx・account/page.tsx カスタマイズ情報 */}
        <SubTitle>インライン カスタマイズ表示（size-4 — cart-drawer.tsx・cart-view.tsx・account/page.tsx）</SubTitle>
        <Row label="食器カラー / アクセントカラー / ロゴ有無の横並び表示">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/70">食器カラー</span>
              <div
                className="size-4 rounded-full border-2 border-border shadow-sm"
                style={{ backgroundColor: DEFAULT_COLORS[4].hexCode }}
                title={DEFAULT_COLORS[4].name}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/70">アクセントカラー</span>
              <span className="text-[11px] text-muted-foreground">なし</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/70">ロゴ</span>
              <span className="text-[11px] text-muted-foreground">有</span>
            </div>
          </div>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 9. LOGO UPLOAD                         */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>09 · Logo Upload</SectionTitle>
        {/* 使用箇所: product-detail.tsx ロゴアップロードエリア */}
        <p className="mb-4 text-xs text-muted-foreground">
          EPS・SVG形式推奨。ドロップゾーン表示→ファイル選択後にプレビューへ切り替わる。
        </p>
        <Row label="アップロード前（空状態）">
          <div className="w-full max-w-xs">
            <DemoLogoUpload />
          </div>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 10. ACCORDION                          */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>10 · Accordion</SectionTitle>
        {/* 使用箇所: product-detail.tsx 商品情報 / page.tsx FAQ / faq/page.tsx */}
        <p className="mb-4 text-xs text-muted-foreground">
          <code>AccordionItem</code>（<code>src/components/ui/accordion.tsx</code>）。
          add / remove アイコン切り替えとグリッドアニメーションで展開。
        </p>
        <div className="mb-6 max-w-xl divide-y divide-border">
          {["サイズ、素材、生産地", "食洗機・電子レンジの使用について", "お届け日、お支払い方法", "取扱い上の注意"].map((q) => (
            <AccordionItem key={q} title={q}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                詳細テキストがここに入ります。
              </p>
            </AccordionItem>
          ))}
        </div>

        {/* FAQ ページ セクションヘッダー付き */}
        <SubTitle>FAQ ページ セクション見出し（faq/page.tsx）</SubTitle>
        <div className="mb-6 max-w-xl">
          <h2 className="text-[10px] tracking-[0.3em] text-muted-foreground">ご注文について</h2>
          <div className="mt-4 divide-y divide-border">
            {["最低注文数量はありますか？", "注文後のキャンセル・変更はできますか？"].map((q) => (
              <AccordionItem key={q} title={q}>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  詳細テキストがここに入ります。
                </p>
              </AccordionItem>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 11. CARD                               */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>11 · Card</SectionTitle>

        {/* --- 商品カード（縦型） --- */}
        {/* 使用箇所: products/page.tsx・page.tsx ProductsSection・product-detail.tsx 他商品リンク */}
        <SubTitle>商品カード — 縦型（products/page.tsx・page.tsx）</SubTitle>
        <Row>
          <div className="group relative flex flex-col overflow-hidden bg-[#FBFBFB] w-72">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">商品画像</span>
              </div>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {DEFAULT_COLORS.map((color) => (
                  <span
                    key={color.nameEn}
                    className="size-3 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: color.hexCode }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl font-bold tracking-wide">温</h3>
                  <span className="text-sm font-medium tracking-widest text-muted-foreground">ON</span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground/80">両手で包む、冬のひととき</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">取っ手のないまるい器。両手で包むと、ラテの温もりがじんわり手のひらに伝わってくる。</p>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <p className="text-lg font-semibold">
                  ¥1,980〜
                  <span className="ml-1 text-xs font-normal text-muted-foreground">税込</span>
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60">
                  詳しくみる
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Row>

        {/* --- ブログ記事カード --- */}
        {/* 使用箇所: journal/page.tsx・barista/page.tsx・page.tsx BlogSection */}
        <SubTitle>ブログ記事カード（journal/page.tsx・barista/page.tsx）</SubTitle>
        <Row>
          <div className="group flex flex-col w-56">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">サムネイル</span>
            </div>
            <div className="mt-4 flex flex-1 flex-col">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground">食器のこと</span>
                <span className="text-xs text-muted-foreground/60">2025.12.10</span>
              </div>
              <h2 className="mt-2 text-sm font-semibold leading-relaxed text-foreground">ブランドは口元で完成する。</h2>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">カフェで出会う一杯の印象は、コーヒーの味だけで決まらない。</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/60">
                読む
                <ArrowRight className="size-3" />
              </span>
            </div>
          </div>
        </Row>

        {/* --- 注文カード --- */}
        {/* 使用箇所: account/page.tsx OrderCard */}
        <SubTitle>注文カード（account/page.tsx OrderCard）</SubTitle>
        <div className="mb-6 max-w-xl border border-border">
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-xs text-muted-foreground">2025年1月20日（月）</p>
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <p className="text-base font-semibold">お支払い合計（税込）</p>
              <p className="text-xl font-semibold tabular-nums">¥80,000</p>
            </div>
            <p className="mt-1 text-right text-xs text-muted-foreground">うち、配送料　¥0</p>
          </div>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="grid grid-cols-[1fr_60px_80px] py-2 text-xs text-muted-foreground">
              <span>商品</span>
              <span className="text-center">数量</span>
              <span className="text-right">合計</span>
            </div>
            <div className="divide-y divide-border">
              <div className="grid grid-cols-[1fr_60px_80px] items-start gap-x-3 py-4">
                <div className="flex gap-3">
                  <div className="size-16 shrink-0 bg-muted flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">画像</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">ラテボウル ON</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        <div className="size-3.5 rounded-full border border-border/60" style={{ backgroundColor: DEFAULT_COLORS[4].hexCode }} />
                        <span className="text-xs text-muted-foreground">{DEFAULT_COLORS[4].name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">ロゴ　あり</span>
                    </div>
                    <p className="mt-2 text-sm font-medium">¥2,000</p>
                    <span className="mt-1.5 text-xs underline underline-offset-4">再購入</span>
                  </div>
                </div>
                <p className="pt-1 text-center text-sm tabular-nums">{MIN_ORDER_QUANTITY}</p>
                <p className="pt-1 text-right text-sm font-medium tabular-nums">¥60,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 12. CART / DRAWER                      */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>12 · Cart / Drawer</SectionTitle>

        {/* --- カート小計サマリー --- */}
        {/* 使用箇所: cart-drawer.tsx・cart-view.tsx */}
        <SubTitle>カート小計サマリー（cart-drawer.tsx・cart-view.tsx）</SubTitle>
        <div className="mb-6 max-w-xs rounded border border-border bg-background p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">お支払い合計（税込）</span>
            <span className="text-2xl font-semibold">¥40,000</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center border border-foreground py-3 text-sm font-medium transition-colors hover:bg-muted">
              カートの確認
            </button>
            <button className="flex items-center justify-center bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-70">
              購入手続き
            </button>
          </div>
        </div>

        {/* --- 空カート状態 --- */}
        {/* 使用箇所: cart-drawer.tsx・cart-view.tsx */}
        <SubTitle>空カート状態（cart-drawer.tsx・cart-view.tsx）</SubTitle>
        <div className="mb-6 flex flex-col items-center py-12 text-center border border-border max-w-xs">
          <p className="text-sm text-muted-foreground">カートに商品がありません。</p>
          <Link
            href="#"
            className="mt-6 bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-70"
          >
            商品を見る
          </Link>
        </div>

        {/* --- カート送料サマリー --- */}
        {/* 使用箇所: cart-view.tsx */}
        <SubTitle>カートページ 送料サマリー（cart-view.tsx）</SubTitle>
        <div className="mb-6 flex flex-col items-end gap-2 border border-border p-5 max-w-sm">
          <p className="rounded-none bg-muted px-3 py-1.5 text-xs text-muted-foreground">
            同一配送先60個以上で送料無料
          </p>
          <div className="flex items-center gap-3 text-sm">
            <DemoTooltip />
            <span className="tabular-nums">¥0</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-sm text-muted-foreground">お支払い合計（税込）</span>
            <span className="text-2xl font-semibold tabular-nums">¥40,000</span>
          </div>
          <button className="mt-3 bg-foreground px-16 py-4 text-sm font-medium text-background transition-opacity hover:opacity-50">
            購入手続き
          </button>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 13. SCROLL ANIMATION                   */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>13 · Scroll Animation</SectionTitle>
        {/* 使用箇所: 各ページで FadeIn / FadeUp / StaggerChildren を広く使用 */}
        <p className="mb-6 text-xs text-muted-foreground">
          <code>src/components/ui/scroll-animate.tsx</code>。
          IntersectionObserver ベース。3バリアント。
        </p>

        <SubTitle>FadeIn — ふわっとフェードイン（product-detail.tsx 画像ギャラリー）</SubTitle>
        <FadeIn className="mb-6">
          <div className="border border-border bg-muted/20 px-6 py-5 text-sm text-muted-foreground">
            FadeIn: <code>opacity 0 → 1</code>（0.8s ease）
          </div>
        </FadeIn>

        <SubTitle>FadeUp — 下から浮き上がりフェードイン（商品詳細・FAQなど）</SubTitle>
        <FadeUp className="mb-6">
          <div className="border border-border bg-muted/20 px-6 py-5 text-sm text-muted-foreground">
            FadeUp: <code>opacity + translateY(48px → 0)</code>（0.8s ease）
          </div>
        </FadeUp>

        <SubTitle>StaggerChildren — 子要素を時間差フェードアップ（商品カード一覧・ブロググリッド）</SubTitle>
        <StaggerChildren className="mb-6 grid grid-cols-3 gap-3" staggerDelay={120}>
          {["カード 1", "カード 2", "カード 3"].map((label) => (
            <div key={label} className="border border-border bg-muted/20 px-4 py-5 text-center text-sm text-muted-foreground">
              {label}
            </div>
          ))}
        </StaggerChildren>

        {/* ══════════════════════════════════════ */}
        {/* 14. SCROLL PROGRESS BAR                */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>14 · Scroll Progress Bar</SectionTitle>
        {/* 使用箇所: features-section.tsx・product-detail.tsx FeatureGalleryScroll */}
        <p className="mb-4 text-xs text-muted-foreground">
          水平スクロールカルーセルの進捗を示す1pxライン。
        </p>
        <div className="mb-6 max-w-md space-y-4">
          <DemoScrollProgressBar progress={0} />
          <DemoScrollProgressBar progress={0.3} />
          <DemoScrollProgressBar progress={0.6} />
          <DemoScrollProgressBar progress={1} />
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 15. CAROUSEL NAVIGATION                */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>15 · Carousel Navigation</SectionTitle>
        {/* 使用箇所: hero-carousel.tsx ストーリー進捗バー / features-section.tsx 矢印ナビ */}
        <SubTitle>矢印ナビゲーションボタン（features-section.tsx・product-detail.tsx FeatureGalleryScroll）</SubTitle>
        <Row>
          <button
            className="inline-flex size-9 items-center justify-center border border-border transition-colors hover:bg-muted"
            aria-label="前へ"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            className="inline-flex size-9 items-center justify-center border border-border transition-colors hover:bg-muted"
            aria-label="次へ"
          >
            <ChevronRight className="size-4" />
          </button>
        </Row>

        <SubTitle>ヒーローカルーセル ストーリー進捗バー（hero-carousel.tsx）</SubTitle>
        <Row label="アクティブバー（アニメーション中）/ 完了 / 未到達">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-[3px] w-[80px] overflow-hidden rounded-full bg-white/30 border border-border"
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                  style={{ width: i === 0 ? "100%" : i === 1 ? "60%" : "0%" }}
                />
              </div>
            ))}
          </div>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 16. HEADER / NAVIGATION                */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>16 · Header / Navigation</SectionTitle>
        {/* 使用箇所: layout/header.tsx */}
        <p className="mb-4 text-xs text-muted-foreground">
          <code>src/components/layout/header.tsx</code>。sticky top-0 z-50 / backdrop-blur。デスクトップ Nav + モバイルハンバーガー。
        </p>

        <SubTitle>ヘッダーバー</SubTitle>
        <div className="mb-6 w-full border border-border bg-background">
          <div className="flex h-14 items-center justify-between px-6">
            <button className="lg:hidden text-foreground p-1">
              <Menu className="size-5" />
            </button>
            <CaforaLogo className="h-5 w-auto text-foreground" />
            <nav className="hidden items-center gap-8 lg:flex">
              {["商品を探す", "WITH BARISTAS", "CAFORAについて", "ジャーナル"].map((label) => (
                <span key={label} className="text-sm font-medium text-foreground/80 hover:text-foreground cursor-pointer">
                  {label}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-1">
              <button className="inline-flex items-center justify-center rounded-full p-2 text-foreground/80 hover:bg-muted hover:text-foreground">
                <User className="size-5" />
              </button>
              <button className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground/80 hover:bg-muted hover:text-foreground">
                <ShoppingBag className="size-5" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
              </button>
            </div>
          </div>
        </div>

        <SubTitle>カートバッジ（itemCount &gt; 0 時に赤ドット）</SubTitle>
        <Row>
          <div className="relative inline-flex items-center justify-center rounded-full p-2 border border-border">
            <ShoppingBag className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
          </div>
          <span className="text-xs text-muted-foreground">赤ドット（bg-red-500 / size-2）= カートに1件以上</span>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 17. FOOTER                             */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>17 · Footer</SectionTitle>
        {/* 使用箇所: layout/footer.tsx */}
        <div className="mb-6 bg-foreground text-background px-6 py-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <CaforaLogo className="h-6 w-auto text-white" />
            <nav className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {["ホーム", "CAFORAについて", "ジャーナル", "よくある質問", "プライバシーポリシー"].map((label) => (
                <span key={label} className="text-sm text-background/70 transition-colors hover:text-background cursor-pointer">
                  {label}
                </span>
              ))}
            </nav>
          </div>
          <div className="mt-8 border-t border-background/10 pt-6">
            <p className="text-xs text-background/50">Copyright &copy; 2025 CAFORA. All rights reserved.</p>
          </div>
          <button
            className="mt-4 inline-flex size-10 items-center justify-center rounded-full border border-background/20 text-background/60 transition-colors hover:bg-background/10 hover:text-background"
            aria-label="ページトップへ"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 18. CAFORA LOGO                        */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>18 · Logo</SectionTitle>
        {/* 使用箇所: layout/header.tsx・layout/footer.tsx */}
        <p className="mb-4 text-xs text-muted-foreground">
          <code>src/components/ui/cafora-logo.tsx</code>。SVG fill="currentColor"。親のテキスト色を継承。
        </p>
        <Row label="サイズバリエーション（h-5 / h-6 / h-8）">
          <div className="flex flex-col gap-4">
            <CaforaLogo className="h-5 w-auto text-foreground" />
            <CaforaLogo className="h-6 w-auto text-foreground" />
            <CaforaLogo className="h-8 w-auto text-foreground" />
          </div>
        </Row>
        <Row label="フッター（dark bg 上）">
          <div className="bg-foreground px-6 py-4">
            <CaforaLogo className="h-6 w-auto text-white" />
          </div>
        </Row>

        {/* ══════════════════════════════════════ */}
        {/* 19. ICONS                              */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>19 · Icons</SectionTitle>

        {/* --- Lucide React --- */}
        {/* 使用箇所: 各コンポーネント全般 */}
        <SubTitle>Lucide React（使用中のみ）</SubTitle>
        <div className="mb-6 flex flex-wrap gap-6">
          {icons.map(({ Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center border border-border">
                <Icon className="size-5" />
              </div>
              <span className="text-[10px] text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>

        {/* --- Material Symbols --- */}
        {/* 使用箇所: accordion.tsx (add/remove) / instagram-section.tsx (add/open_in_new) */}
        <SubTitle>Material Symbols Outlined（src/components/ui/material-icon.tsx）</SubTitle>
        <p className="mb-4 text-xs text-muted-foreground">
          wght@200 / FILL@0 / opsz@24。AccordionItem の開閉アイコン・InstagramSection のロードモアアイコン。
        </p>
        <div className="mb-6 flex flex-wrap gap-6">
          {[
            { icon: "add", label: "add" },
            { icon: "remove", label: "remove" },
            { icon: "open_in_new", label: "open_in_new" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center border border-border">
                <MaterialIcon icon={icon} />
              </div>
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 20. SEPARATOR / DIVIDER                */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>20 · Separator / Divider</SectionTitle>
        {/* 使用箇所: separator.tsx / divide-y divide-border / border-t border-border */}

        <SubTitle>Separator コンポーネント（horizontal）</SubTitle>
        <div className="mb-6 max-w-sm space-y-4">
          <Separator />
          <p className="text-xs text-muted-foreground">上記: <code>Separator</code>（<code>src/components/ui/separator.tsx</code>）</p>
        </div>

        <SubTitle>divide-y divide-border（商品テーブル行・アコーディオンリスト）</SubTitle>
        <div className="mb-6 max-w-sm divide-y divide-border border border-border">
          {["商品行 1", "商品行 2", "商品行 3"].map((row) => (
            <div key={row} className="px-4 py-3 text-sm text-muted-foreground">{row}</div>
          ))}
        </div>

        <SubTitle>border-t border-border（セクション区切り）</SubTitle>
        <div className="mb-6 max-w-sm border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">border-t border-border — product-detail.tsx カスタマイズエリア区切りなど</p>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 21. FEEDBACK / EMPTY STATE / ERROR     */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>21 · Feedback / Empty State / Error</SectionTitle>

        {/* --- エラーメッセージ --- */}
        {/* 使用箇所: account/page.tsx LoginForm・register/page.tsx */}
        <SubTitle>エラーメッセージ（account/page.tsx・register/page.tsx）</SubTitle>
        <Row>
          <div className="border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive max-w-sm">
            メールアドレスとパスワードを入力してください。
          </div>
        </Row>

        {/* --- 数量エラー --- */}
        {/* 使用箇所: product-detail.tsx 最低注文数量 */}
        <SubTitle>インラインエラー（product-detail.tsx 数量）</SubTitle>
        <Row>
          <p className="text-xs text-red-500">
            {getMinOrderQuantityMessage()}
          </p>
        </Row>

        {/* --- 空状態 --- */}
        {/* 使用箇所: cart-view.tsx / account/page.tsx / journal/page.tsx */}
        <SubTitle>空状態 — カート（cart-view.tsx）</SubTitle>
        <div className="mb-6 flex flex-col items-center py-16 text-center border border-border max-w-xs">
          <p className="text-sm text-muted-foreground">カートに商品がありません。</p>
          <Link
            href="#"
            className="mt-6 bg-foreground px-10 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-50"
          >
            商品を見る
          </Link>
        </div>

        <SubTitle>空状態 — 注文履歴（account/page.tsx）</SubTitle>
        <div className="mb-6 flex flex-col items-center py-16 text-center border border-border max-w-xs">
          <p className="text-sm text-muted-foreground">注文した履歴はありません。</p>
          <Link
            href="#"
            className="mt-6 bg-foreground px-10 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-50"
          >
            商品を見る
          </Link>
        </div>

        <SubTitle>空状態 — ジャーナル（journal/page.tsx）</SubTitle>
        <div className="mb-6 py-8 text-center text-sm text-muted-foreground border border-border max-w-xs">
          該当する記事はまだありません。
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 22. FEATURE GALLERY CARD               */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>22 · Feature Gallery Card</SectionTitle>
        {/* 使用箇所: features-section.tsx（トップページ）/ product-detail.tsx FeatureGalleryScroll */}
        <p className="mb-4 text-xs text-muted-foreground">
          水平スクロールカルーセル内の縦長カード。番号 + 画像 + タイトル + 説明文。
        </p>
        <div className="mb-6 flex gap-6 overflow-x-auto pb-4">
          {[
            { num: "01", title: "手になじむフォルム", desc: "取っ手のない丸みのある形状が、両手でやさしく包み込むような持ち心地を生む。" },
            { num: "02", title: "口当たりの追求", desc: "縁の薄さと角度を職人が調整。口に運ぶたびに、設計された口当たりのなめらかさを感じる。" },
            { num: "03", title: "ラテアートが映える口径", desc: "広く開いた口径は、ミルクの着地点を広げ、バリスタのアートをより美しく引き立てる。" },
          ].map((f) => (
            <div key={f.num} className="w-64 shrink-0 sm:w-72">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">画像エリア</span>
              </div>
              <div className="pt-5">
                <p className="text-[10px] tracking-[0.4em] text-muted-foreground">{f.num}</p>
                <h4 className="mt-2 text-sm font-semibold leading-snug sm:text-base">{f.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <DemoScrollProgressBar progress={0.4} />

        {/* ══════════════════════════════════════ */}
        {/* 23. EXPERIENCE CHART                   */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>23 · Experience Chart</SectionTitle>
        {/* 使用箇所: product-detail.tsx ExperienceChart（src/components/product/experience-chart.tsx）*/}
        <p className="mb-4 text-xs text-muted-foreground">
          <code>src/components/product/experience-chart.tsx</code>。
          5段階ドット＋ラインスライダーで体験指標を表示。ホバーで説明文展開。
        </p>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 max-w-xl">
          {[
            { label: "口当たり", labelA: "シャープ", labelB: "まろやか", position: 4 },
            { label: "香り", labelA: "集中", labelB: "広がる", position: 3 },
            { label: "温度", labelA: "すぐ飲み頃", labelB: "温かさが続く", position: 4 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-3 border border-border/50 p-4">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-center text-sm font-medium tracking-wide">{item.label}</p>
              </div>
              <div className="flex w-full items-center">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-1 items-center last:flex-none">
                    <span
                      className={`relative z-10 block shrink-0 rounded-full ${
                        step === item.position ? "size-2.5 bg-foreground" : "size-1.5 bg-border"
                      }`}
                    />
                    {step !== 5 && <span className="h-px flex-1 bg-border" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{item.labelA}</span>
                <span className="text-[10px] text-muted-foreground">{item.labelB}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 24. BARISTA CTA BANNER                 */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>24 · Barista CTA Banner</SectionTitle>
        {/* 使用箇所: page.tsx BaristaSection */}
        <p className="mb-4 text-xs text-muted-foreground">
          フルワイド画像オーバーレイ + テキスト中央配置 + border ボタン。
        </p>
        <div className="mb-6 relative aspect-[16/7] overflow-hidden bg-foreground max-w-2xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <p className="text-[10px] tracking-[0.5em] opacity-80">WITH BARISTAS</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">バリスタと共に、器をつくる</h2>
            <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed opacity-80">
              バリスタが本当にこだわる、味・口当たり・余韻までを、器から設計しています。
            </p>
            <span className="mt-6 inline-flex items-center border border-white px-8 py-3 text-xs font-medium tracking-wide transition-colors duration-300 hover:bg-white hover:text-foreground">
              詳しくみる
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* 25. BRAND PAGE COMPONENTS              */}
        {/* ══════════════════════════════════════ */}
        <SectionTitle>25 · Brand Page Components</SectionTitle>
        {/* 使用箇所: brand/page.tsx / components/brand/ */}

        <SubTitle>ChapterHeroParallax（src/components/brand/chapter-hero-parallax.tsx）</SubTitle>
        <p className="mb-4 text-xs text-muted-foreground">
          スクロールパララックス画像コンテナ。min-h-[240px] sm:min-h-[379px]。フルワイド。
        </p>
        <div className="mb-6 relative min-h-[120px] w-full overflow-hidden bg-muted flex items-center justify-center border border-border max-w-2xl">
          <span className="text-xs text-muted-foreground">ChapterHeroParallax: スクロール連動パララックス画像（実際の表示は brand/page.tsx）</span>
        </div>

        <SubTitle>ScrollRevealText（src/components/brand/scroll-reveal-text.tsx）</SubTitle>
        <p className="mb-4 text-xs text-muted-foreground">
          1文字ずつ opacity フェードイン。<code>as="h2" | "p" | "span"</code>。
          ブランドページ チャプター見出しに使用。
        </p>
        <div className="mb-6 border border-border bg-muted/20 px-6 py-5 max-w-sm">
          <p className="text-sm text-muted-foreground">
            <code>ScrollRevealText</code>: 文字単位 opacity アニメーション
            （実際のアニメーションは brand/page.tsx でスクロール後に発火）
          </p>
        </div>

        <SubTitle>ブランドナビゲーション（brand/page.tsx 縦書きタイトル）</SubTitle>
        <div className="mb-6 border border-border p-6 max-w-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-lg tracking-[0.047em]">CAFORAについて</h1>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">（PCでは sm:[writing-mode:vertical-rl] sm:[text-orientation:upright]）</p>
        </div>

        {/* フッター */}
        <Separator className="my-12" />
        <p className="text-center text-xs text-muted-foreground">
          CAFORA UIライブラリ / デザインシステム &mdash; Noto Serif JP + Tailwind CSS v4 + Base UI
        </p>
      </div>
    </main>
  )
}
