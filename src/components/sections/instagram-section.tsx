"use client"

import { useState } from "react"
import Image from "next/image"
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate"
import { MaterialIcon } from "@/components/ui/material-icon"

// プレースホルダー画像は ig-1〜ig-4 をローテーション
const TOTAL_ITEMS = 12
const INITIAL_COUNT = 4
const LOAD_MORE_COUNT = 4

const ITEMS = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  src: `/images/home/ig-${(i % 4) + 1}.svg`,
  alt: `Instagram投稿 ${i + 1}`,
}))

export function InstagramSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const hasMore = visibleCount < TOTAL_ITEMS

  return (
    <section className="pt-16 sm:pt-24">
      <div className="container-cafora">
        <FadeUp>
          <h2 className="text-center text-xl font-semibold tracking-wide sm:text-2xl">
            Instagram
          </h2>
        </FadeUp>

        {/* Instagram Grid */}
        <StaggerChildren staggerDelay={120} className="mt-8 grid grid-cols-2 gap-0.5 sm:grid-cols-4">
          {ITEMS.slice(0, visibleCount).map((item, i) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden bg-muted"
              style={{
                animation: i >= INITIAL_COUNT && i >= visibleCount - LOAD_MORE_COUNT
                  ? "ig-fadein 0.4s ease both"
                  : undefined,
                animationDelay: i >= INITIAL_COUNT && i >= visibleCount - LOAD_MORE_COUNT
                  ? `${(i - (visibleCount - LOAD_MORE_COUNT)) * 60}ms`
                  : undefined,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </StaggerChildren>

        {/* ロードモア / 外部リンク */}
        <FadeUp className="mt-8 flex justify-center">
          {hasMore ? (
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, TOTAL_ITEMS))}
              className="group inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {visibleCount === INITIAL_COUNT ? "もっとみる" : "もっともっとみる"}
              <MaterialIcon icon="add" className="transition-transform duration-300 group-hover:rotate-90" />
            </button>
          ) : (
            <a
              href="https://www.instagram.com/caforajp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Instagramでもっとみる
              <MaterialIcon icon="open_in_new" />
            </a>
          )}
        </FadeUp>
      </div>

      <style>{`
        @keyframes ig-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
