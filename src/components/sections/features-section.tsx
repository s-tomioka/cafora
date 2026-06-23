"use client"

import Image from "next/image"
import { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react"
import { FadeUp } from "@/components/ui/scroll-animate"
import { ChevronLeft, ChevronRight } from "lucide-react"

const FEATURES = [
  {
    num: "01",
    title: "手になじむフォルム",
    desc: "取っ手のない丸みのある形状が、両手でやさしく包み込むような持ち心地を生む。",
    image: "/images/product/latte-bowl-on.webp",
  },
  {
    num: "02",
    title: "口当たりの追求",
    desc: "縁の薄さと角度を職人が調整。口に運ぶたびに、設計された口当たりのなめらかさを感じる。",
    image: "/images/product/latte-bowl-kaku.webp",
  },
  {
    num: "03",
    title: "ラテアートが映える口径",
    desc: "広く開いた口径は、ミルクの着地点を広げ、バリスタのアートをより美しく引き立てる。",
    image: "/images/product/latte-bowl-on.webp",
  },
  {
    num: "04",
    title: "職人による釉薬仕上げ",
    desc: "一つひとつ手作業で施された釉薬が、光の当たり方によって表情を変える艶と深みをつくる。",
    image: "/images/product/latte-bowl-kaku.webp",
  },
  {
    num: "05",
    title: "ロゴ転写技術",
    desc: "高精細な転写技術で、細かいロゴや文字も色褪せず鮮明に再現。ブランドの顔を食器に宿す。",
    image: "/images/product/latte-bowl-on.webp",
  },
  {
    num: "06",
    title: "6色のアクセントカラー",
    desc: "ベースホワイトに映える6色のカラーラインナップ。お店の世界観に合う一色を選んでほしい。",
    image: "/images/product/latte-bowl-kaku.webp",
  },
  {
    num: "07",
    title: "食洗機・電子レンジ対応",
    desc: "業務用食洗機にも対応した耐久設計。忙しい店内でも、安心して使い続けられる。",
    image: "/images/product/latte-bowl-on.webp",
  },
  {
    num: "08",
    title: "20個からのオーダー",
    desc: "小さな焙煎所から大型カフェまで。20個単位から自分たちだけのオリジナル食器を注文できる。",
    image: "/images/product/latte-bowl-kaku.webp",
  },
]

const CARD_WIDTH = 320 // px (w-80)
const CARD_GAP = 24   // gap-6

export function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // スクロール位置をリセット
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0
  }, [])

  // スクロール進捗を計算
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // 矢印スクロール
  const scrollBy = useCallback((dir: "prev" | "next") => {
    const el = scrollRef.current
    if (!el) return
    const amount = CARD_WIDTH + CARD_GAP
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" })
  }, [])

  return (
    <section className="pt-16 sm:pt-24">
      {/* ヘッダー行：見出し + 矢印 */}
      <div className="container-cafora flex items-end justify-between">
        <FadeUp>
          <h2 className="text-xl font-semibold tracking-wide sm:text-2xl">
            ラテ体験を追求した<br className="sm:hidden" />8つの特徴
          </h2>
        </FadeUp>

        {/* 矢印ナビゲーション */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy("prev")}
            aria-label="前へ"
            className="inline-flex size-9 items-center justify-center border border-border transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scrollBy("next")}
            aria-label="次へ"
            className="inline-flex size-9 items-center justify-center border border-border transition-colors hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* カードリスト */}
      <div className="mt-8">
        <div
          ref={scrollRef}
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ overflowAnchor: "none" }}
        >
        <div className="flex gap-6 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] pr-4 sm:pr-6 lg:pr-8 w-max">
          {FEATURES.map((feature, i) => (
            <FadeUp key={feature.num} delay={i * 120} className="w-72 shrink-0 sm:w-80">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="pt-5">
                <span className="text-[10px] tracking-[0.4em] text-muted-foreground">
                  {feature.num}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug sm:text-base">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {feature.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
        </div>
      </div>

      {/* スクロール進捗バー */}
      <div className="container-cafora mt-6">
        <div className="h-px w-full bg-border">
          <div
            className="h-px bg-foreground transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
