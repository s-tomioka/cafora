"use client";

import { useEffect, useState } from "react";
import { FadeUp, FadeIn } from "@/components/ui/scroll-animate";

const SLIDE_IMAGES = [
  { src: "/images/Baristas/philosophy-01.png", alt: "器づくりの現場 01" },
  { src: "/images/Baristas/philosophy-02.png", alt: "器づくりの現場 02" },
  { src: "/images/Baristas/philosophy-03.png", alt: "器づくりの現場 03" },
  { src: "/images/Baristas/philosophy-04.png", alt: "器づくりの現場 04" },
  { src: "/images/Baristas/philosophy-05.png", alt: "器づくりの現場 05" },
  { src: "/images/Baristas/philosophy-06.png", alt: "器づくりの現場 06" },
];

function FastAutoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-[480px] overflow-hidden bg-stone-100">
      {SLIDE_IMAGES.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-300 ease-in-out"
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
              <span className="text-[10px] text-muted-foreground/40">
                {img.alt}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BaristaPhilosophy() {
  return (
    <section className="pt-48 pb-24 sm:pb-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px]">

          {/* 中央寄せ 16:9 フォトスライダー */}
          <FadeIn>
            <FastAutoSlider />
          </FadeIn>

          {/* 縦書きテキストエリア — SP:縦積み / PC:縦書き右→左 */}
          <FadeUp delay={200}>
            {/* SP: 横書き縦積み */}
            <div className="mt-24 sm:hidden">
              <h2
                className="text-xl font-bold tracking-[0.15em]"
                style={{ lineHeight: "1.8em" }}
              >
                器から味わいを設計する
              </h2>
              <div className="mt-10 space-y-6 text-[15px] leading-[2em] text-muted-foreground">
                <p>私たちは、器を「体験を決める要素」として捉えています。</p>
                <p>口当たり、流れ方、香りの広がり。それらを形状から設計し、一杯の印象を整えていく。</p>
                <p>抽出の先にある体験まで含めて、味をつくるという考え方です。</p>
              </div>
            </div>
            {/* PC: 縦書き */}
            <div className="mt-48 hidden flex-row-reverse items-start justify-center gap-10 overflow-x-auto sm:flex sm:gap-14">
              {/* 見出し（最右列） */}
              <h2
                className="shrink-0 text-xl font-bold tracking-[0.15em] sm:text-2xl"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  lineHeight: "1.8em",
                }}
              >
                器から
                <br />
                味わいを設計する
              </h2>

              {/* 本文 段落ごとに独立列 */}
              <p
                className="shrink-0 text-sm leading-[2.2em] text-muted-foreground sm:text-base"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                私たちは、<br />器を<br />「体験を決める要素」<br />として捉えています。
              </p>
              <p
                className="shrink-0 text-sm leading-[2.2em] text-muted-foreground sm:text-base"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                口当たり、<br />流れ方、<br />香りの広がり。<br />それらを形状から設計し、<br />一杯の印象を整えていく。
              </p>
              <p
                className="shrink-0 text-sm leading-[2.2em] text-muted-foreground sm:text-base"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                抽出の先にある体験まで含めて、<br />味をつくるという考え方です。
              </p>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
