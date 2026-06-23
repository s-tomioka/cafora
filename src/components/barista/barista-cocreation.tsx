import { FadeUp } from "@/components/ui/scroll-animate";

const GRID_IMAGES = [
  { src: "/images/Baristas/cocreation-grid-01.webp", alt: "試飲の様子 01" },
  { src: "/images/Baristas/cocreation-grid-02.webp", alt: "試飲の様子 02" },
  { src: "/images/Baristas/cocreation-grid-03.webp", alt: "試飲の様子 03" },
  { src: "/images/Baristas/cocreation-grid-04.webp", alt: "試飲の様子 04" },
];

export function BaristaCoCreation() {
  return (
    <section className="bg-stone-50/60 py-24 sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px]">

          {/* 見出し */}
          <FadeUp delay={80}>
            <h2
              className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl"
              style={{ lineHeight: "1.8em" }}
            >
              バリスタと共に
              <br className="hidden sm:inline" />
              試飲を繰り返す
            </h2>
          </FadeUp>

          {/* 本文 */}
          <FadeUp delay={160}>
            <div className="mt-10 space-y-6 text-[15px] leading-[2em] text-muted-foreground sm:text-base">
              <p>私たちは、バリスタと共に器をつくっています。</p>
              <p>
                実際にラテを注ぎ、飲み、違和感を言語化し、形を調整する。その繰り返しの中で、少しずつ理想に近づけていく。
              </p>
              <p>
                机上ではなく、現場の一杯の中で磨かれた形です。
              </p>
            </div>
          </FadeUp>

          {/* 下部 4枚 — 03と02を入れ替え */}
          <FadeUp delay={240}>
            {/* SP: 2×2 グリッド */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:hidden">
              {GRID_IMAGES.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            {/* PC: エディトリアルレイアウト */}
            <div className="mt-20 hidden items-start gap-4 overflow-hidden sm:flex">

              {/* 01 — 縦長ポートレート、アンカー */}
              <div className="relative aspect-[2/3] w-[26%] shrink-0 overflow-hidden bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GRID_IMAGES[0].src} alt={GRID_IMAGES[0].alt} className="h-full w-full object-cover" />
              </div>

              {/* 03（元02位置） — 正方形、やや下にオフセット */}
              <div className="relative mt-8 aspect-[1/1] w-[17%] shrink-0 overflow-hidden bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GRID_IMAGES[2].src} alt={GRID_IMAGES[2].alt} className="h-full w-full object-cover" />
              </div>

              {/* 02（元03位置） — 横長ランドスケープ、下にオフセット */}
              <div className="relative mt-16 aspect-[4/3] w-[34%] shrink-0 overflow-hidden bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GRID_IMAGES[1].src} alt={GRID_IMAGES[1].alt} className="h-full w-full object-cover" />
              </div>

              {/* 04 — 小さい縦長、大きく下にオフセット */}
              <div className="relative mt-28 aspect-[3/4] w-[13%] shrink-0 overflow-hidden bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GRID_IMAGES[3].src} alt={GRID_IMAGES[3].alt} className="h-full w-full object-cover" />
              </div>

            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
