import Image from "next/image";
import { FadeUp } from "@/components/ui/scroll-animate";

export function BaristaEmpathy() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px]">
          <FadeUp>
            <h2
              className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl"
              style={{ lineHeight: "1.8em" }}
            >
              一杯にこだわるほど
              <br className="hidden sm:inline" />
              違和感が残る
            </h2>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="mt-10 space-y-6 text-[15px] leading-[2em] text-muted-foreground sm:text-base">
              <p>
                ミルクの質感、エスプレッソのバランス、抽出の精度。細部まで突き詰めているのに、最後に使う器で味わいが変わっていく。
              </p>
              <p>
                多く流通している球を半分に切ったような口径の大きいラテボウルは香り、対流、アート、温度、口当たりなどラテに重要な要素を全て損なわない形状になっています。ゆえに何かに特化したラテを淹れると特化した部分が目立たなくなる傾向があります。
              </p>
              <p>
                もっとバリスタが目指す飲み心地に特化したラテボウルがデザインできないか。と考え、私たちは一杯に情熱を注いで淹れるバリスタのために新たなラテ体験を生む手助けをしたいと考えています。
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="relative mt-14 aspect-[3/1] w-full overflow-hidden">
              <Image src="/images/Baristas/empathy-photo.png" alt="一杯にこだわるほど違和感が残る" fill className="object-cover" sizes="(max-width: 768px) 100vw, 680px" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
