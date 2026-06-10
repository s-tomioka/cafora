import Image from "next/image";
import { FadeUp, FadeIn } from "@/components/ui/scroll-animate";

export function BaristaComparison() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px] grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image column */}
          <FadeIn>
            {/* TODO: Replace with actual comparison test / multiple bowls photo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <Image
                src="/images/product/kaku-1.png"
                alt="複数のラテボウルを用いた比較検証"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </FadeIn>

          {/* Text column */}
          <div>
            <FadeUp>
              <p className="text-[10px] tracking-[0.5em] text-muted-foreground sm:text-xs">
                Section 05 — 比較検証
              </p>
              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl" style={{ lineHeight: "1.8em" }}>
                他の器とも、
                <br />
                徹底的に比べる。
              </h2>
            </FadeUp>

            <FadeUp delay={120}>
              <div className="mt-10 space-y-6 text-sm leading-[2em] text-muted-foreground sm:text-base">
                <p>
                  複数のラテボウルを用いた試飲を重ね、
                  <br />
                  口当たり、流れ、香りの違いを検証しています。
                </p>
                <p>
                  同じレシピでも、
                  <br />
                  器によって印象がどう変わるのか。
                </p>
                <p>
                  その差が、体験として明確に出る形状だけを残しています。
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
