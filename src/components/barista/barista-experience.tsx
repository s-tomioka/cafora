"use client";

import { FadeUp } from "@/components/ui/scroll-animate";
import { BASE_ITEMS } from "@/components/product/experience-chart";

export function BaristaExperience() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px]">

          {/* 見出し */}
          <FadeUp>
            <h2
              className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl"
              style={{ lineHeight: "1.8em" }}
            >
              CAFORAの器で出す、一杯の違い
            </h2>
          </FadeUp>

          {/* 本文 */}
          <FadeUp delay={120}>
            <p className="mt-10 text-[15px] leading-[2em] text-muted-foreground sm:text-base">
              同じレシピでも、器の形状によって一杯の印象は変わります。CAFORAは口当たりから香りの広がり方まで、形状が体験に与える影響を設計の出発点にしています。
            </p>
          </FadeUp>

          {/* 6項目 — 2カラムグリッド */}
          <FadeUp delay={200}>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {BASE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex gap-4">
                    {/* アイコン */}
                    <div className="shrink-0">
                      <Icon className="size-5" />
                    </div>
                    {/* テキスト */}
                    <div>
                      <p className="text-sm font-medium tracking-wide text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm" style={{ lineHeight: "1.8em" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
