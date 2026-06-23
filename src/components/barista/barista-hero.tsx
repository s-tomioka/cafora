import Image from "next/image";
import { FadeUp, FadeIn } from "@/components/ui/scroll-animate";

export function BaristaHero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-stone-900">
      {/* Background image — SP / PC 出し分け */}
      <Image
        src="/images/Baristas/banner-sp.webp"
        alt="WITH BARISTAS - バリスタと共に、器をつくる"
        fill
        className="object-cover opacity-60 sm:hidden"
        sizes="100vw"
        priority
      />
      <Image
        src="/images/Baristas/banner-pc.webp"
        alt="WITH BARISTAS - バリスタと共に、器をつくる"
        fill
        className="hidden object-cover opacity-60 sm:block"
        sizes="100vw"
        priority
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[70vh] flex-col items-start justify-center px-4 text-left text-white sm:items-center sm:text-center">
        <FadeIn delay={200}>
          <p className="text-[10px] tracking-[0.6em] text-white/70 sm:text-xs">
            WITH BARISTAS
          </p>
        </FadeIn>
        <FadeUp delay={400}>
          <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            バリスタと共に、器をつくる
          </h1>
        </FadeUp>
        <FadeUp delay={600}>
          <p className="mt-6 max-w-lg text-[15px] leading-[2em] text-white/80 sm:mx-auto sm:text-base">
            「同じ淹れ方なのに、
            <br className="sm:hidden" />
            器によって味わいが変わる」
            <br />
            そんなバリスタの声から
            <br className="sm:hidden" />
            CAFORAの器づくりは始まりました。
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
