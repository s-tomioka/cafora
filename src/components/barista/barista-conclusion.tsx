import Image from "next/image";
import { FadeUp, FadeIn } from "@/components/ui/scroll-animate";

export function BaristaConclusion() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-40">
      {/* Background image with subtle overlay */}
      {/* TODO: Replace with actual product / atmosphere photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/Baristas/conclusion-bg-sp.png"
          alt="こだわりの一杯は器と共に実現する"
          fill
          className="object-cover opacity-30 sm:hidden"
          sizes="100vw"
        />
        <Image
          src="/images/Baristas/conclusion-bg.png"
          alt="こだわりの一杯は器と共に実現する"
          fill
          className="hidden object-cover opacity-30 sm:block"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-background/60" />

      <div className="container-cafora relative z-10">
        <div className="mx-auto max-w-[680px] text-center">
          <FadeUp>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl" style={{ lineHeight: "1.8em" }}>
              こだわりの一杯は
              <br />
              器と共に実現する
            </h2>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="mx-auto mt-12 max-w-lg space-y-6 text-[15px] leading-[2em] text-muted-foreground sm:text-base">
              <p>
                こだわって淹れた味わいは、
                <br />
                最後器によって昇華する。
              </p>
              <p>
                CAFORAはその最後の一手まで、
                <br />
                こだわりたい全てのカフェ関係者のための器です。
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
