"use client";

import { useEffect, useState } from "react";
import { FadeUp } from "@/components/ui/scroll-animate";

const SLIDE_IMAGES = [
  { src: "/images/Baristas/problem-01.webp", alt: "ラテボウルの比較 01" },
  { src: "/images/Baristas/problem-02.webp", alt: "ラテボウルの比較 02" },
  { src: "/images/Baristas/problem-03.webp", alt: "ラテボウルの比較 03" },
];

function AutoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden bg-muted">
      {SLIDE_IMAGES.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {img.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-stone-100">
              <span className="text-xs text-muted-foreground/40">
                {img.alt}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDE_IMAGES.map((_, i) => (
          <span
            key={i}
            className="block h-px transition-all duration-500"
            style={{
              backgroundColor: i === current ? "#333" : "#bbb",
              width: i === current ? "24px" : "12px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function BaristarProblem() {
  return (
    <section className="bg-stone-50/60 py-24 sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px]">
          {/* 見出し — 全幅 */}
          <FadeUp>
            <h2
              className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl"
              style={{ lineHeight: "1.8em" }}
            >
              味は抽出だけで決まっているのか
            </h2>
          </FadeUp>

          {/* 本文 + 写真スライダー — 見出し下で2:1レイアウト */}
          <div className="mt-10 grid grid-cols-3 items-start gap-16 lg:gap-24">
            {/* 本文 — 2カラム分 */}
            <FadeUp delay={120} className="col-span-3 sm:col-span-2">
              <div className="space-y-6 text-[15px] leading-[2em] text-muted-foreground sm:text-base">
                <p>
                  同じ淹れ方でも、器によって一口目のミルクとエスプレッソの口当たりも、ラテアートの見え方も、香りの立ち方も大きく変わります。
                </p>
                <p>
                  それは器の厚み、形状、口径の違い、取っ手の持ちやすさ、飲む際のラテボウルの角度などいろんな要素によって、変化していきます。実際に同じ淹れ方で異なるラテボウルを試してみると素人でも変化がわかるほどです。
                </p>
                <p>
                  カップの種類はある。けれど自分が届けたい味わいに合わせて器を選べているかというと、そうではない。器はまだ、「味を設計するための選択肢」にはなっていません。
                </p>
              </div>
            </FadeUp>

            {/* 写真スライダー — 1カラム分 (9:16)、本文と上揃え */}
            <FadeUp delay={200} className="col-span-3 sm:col-span-1">
              <AutoSlider />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
