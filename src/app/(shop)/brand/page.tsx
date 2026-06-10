import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ChapterHeroParallax } from "@/components/brand/chapter-hero-parallax";
import { BrandBookCTA } from "@/components/brand/brand-book-cta";
import { ScrollRevealText } from "@/components/brand/scroll-reveal-text";
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate";

/** Instagram グリッドのセル間ディレイに合わせたカラム用ディレイ（ms） */
const BRAND_COL_DELAY_MS = 60;

export const metadata: Metadata = {
  title: "CAFORAについて | CAFORA",
};

const NAV_LEFT = [
  { href: "#chapter-01", label: "器は、体験をつくる" },
  { href: "#chapter-02", label: "器は、舞台である" },
  { href: "#chapter-03", label: "技術が、体験を可能にする" },
] as const;

const NAV_RIGHT = [
  { href: "#chapter-04", label: "伝統の中で、形になる" },
  { href: "#chapter-05", label: "CAFORAという考え方" },
] as const;

type ImageLayout = "single" | "double";

type ChapterBlock = {
  id: string;
  chapterLabel: string;
  title: string;
  heroImage: string;
  english: string;
  japanese: string;
  imageLayout: ImageLayout;
  images: { src: string; alt: string }[];
};

const CHAPTERS: ChapterBlock[] = [
  {
    id: "chapter-01",
    chapterLabel: "Chapter 01",
    title: "器は、体験をつくる",
    heroImage: "/images/About/brand-hero-01.png",
    english:
      "CAFORA is not a tableware brand. It is a brand that designs the entire café experience, starting from the vessel. The temperature of the drink, how it feels on the lips, the weight in the hand. All of these shape how flavor is perceived. Even the same cup can feel different with a different vessel—how you feel it and its aftertaste really change. That difference is slight, yet it becomes a large gap as an experience. CAFORA aims to design that difference, and to make every cup’s moment a little better.",
    japanese:
      "CAFORAは、器をつくるブランドではありません。器を起点に、カフェという体験そのものを設計するブランドです。飲み物の温度、口に触れる感触、手に持ったときの重み。それらはすべて、味わいの印象をかたちづくる要素です。同じ一杯でも、器が変われば、感じ方や余韻は確かに変わっていく。その違いはわずかでありながら、体験としては大きな差になる。CAFORAは、その差を設計することで、一杯の時間そのものをより良くすることを目指しています。",
    imageLayout: "single",
    images: [{ src: "/images/About/brand-content-01.png", alt: "器は、体験をつくる" }],
  },
  {
    id: "chapter-02",
    chapterLabel: "Chapter 02",
    title: "器は、舞台である",
    heroImage: "/images/About/brand-hero-02.png",
    english:
      "If food and drink are the lead, we believe the vessel should be the stage that supports them. That stage affects not only appearance but how the whole experience is felt. Rim thickness alone changes how the lips meet the cup and shifts the impression of milk’s smoothness and cream. The inner curve and angle change how liquid moves—its speed and spread as it reaches the mouth. The opening’s width and shape guide how aroma rises and is perceived. Each is a small difference, yet together they reliably change the impression of a single cup. A vessel is not merely a holder—it exists to design how flavor is felt. Through such details, CAFORA supports the lead and refines the experience itself.",
    japanese:
      "料理や飲み物が主役であるならば、器はそれを支える舞台であるべきだと、私たちは考えています。その舞台は、見た目だけでなく、体験の感じ方そのものに影響します。例えば、飲み口の厚み。わずかに薄くするだけで、唇に触れたときの感触が変わり、ミルクのなめらかさやクリーム感の印象が大きく変わります。また、器の内側のカーブや角度は、液体の流れ方を変え、口に入るスピードや広がり方に影響します。さらに、開口部の広さや形状は、香りの立ち上がり方や感じ方を左右します。これらはすべて、わずかな違いでありながら、一杯の印象を確実に変えていく要素です。器は、ただ料理や飲み物を載せるためのものではなく、味わいの感じ方を設計するための存在です。CAFORAは、こうした細部の設計を通じて、主役を引き立てながら、体験そのものを整えています。",
    imageLayout: "double",
    images: [
      { src: "/images/About/brand-content-02a.png", alt: "器は、舞台である" },
      { src: "/images/About/brand-content-02b.png", alt: "器の設計" },
    ],
  },
  {
    id: "chapter-03",
    chapterLabel: "Chapter 03",
    title: "技術が、体験を可能にする",
    heroImage: "/images/About/brand-hero-03.png",
    english:
      "The vessel experience is decided in the details. Yet in traditional pottery, trying and verifying those small differences again and again was never easy. New shapes required plaster molds—costly and time-consuming to make. Revise a shape and try again: repeating that cycle was rarely practical. So it was hard to push every detail that touches the experience—mouthfeel, flow—to the limit. CAFORA uses proprietary 3D ceramic printing to change that constraint. Shape, pour a latte or coffee, taste, adjust—and repeat on a short cycle. That iteration optimizes not only looks but shapes that directly shape the experience. Technology is not only for forming clay—it is how we verify and refine experience. Through this process, CAFORA finds the shape a single cup truly needs.",
    japanese:
      "器の体験は、細部の設計によって決まります。しかしこれまでの陶器製作では、その細かな違いを何度も試し、検証していくことは簡単ではありませんでした。新しい形をつくるには石膏型が必要で、その製作にはコストと時間がかかる。一度つくった形を修正し、再び試す。そのサイクルを繰り返すことは、現実的には難しいものでした。そのため、口当たりや流れ方といった、体験に直結する部分まで徹底的に突き詰めることには限界がありました。CAFORAでは、独自の3D陶器プリンター技術を活用することで、この制約を大きく変えています。形をつくり、実際にラテやコーヒーを注ぎ、飲み、味わいを確かめ、再び調整する。そのサイクルを、短いスパンで何度でも繰り返すことができる。この反復によって、見た目だけでなく、体験に直結する形状の最適化が可能になりました。技術は、形をつくるためのものではなく、体験を検証し、磨き上げるための手段です。CAFORAは、このプロセスを通じて、一杯の体験に本当に必要な形を導き出しています。",
    imageLayout: "single",
    images: [{ src: "/images/About/brand-content-03.png", alt: "技術が、体験を可能にする" }],
  },
  {
    id: "chapter-04",
    chapterLabel: "Chapter 04",
    title: "伝統の中で、形になる",
    heroImage: "/images/About/brand-hero-04.png",
    english:
      "No matter how much we design, material and firing finally give experience its form. CAFORA pieces are fired in Seto–Mino, with a thousand years of history. Clay, glaze, and firing craft here have been honed and handed down over generations. However precisely we design a form, the final texture and character are decided in the kiln. From design through Seto–Mino processes, CAFORA carries the whole chain to raise not only shape but the completeness of the experience. Within an even form, slight variation appears—and that becomes the feel in the hand and the presence in the room. The form design reveals, and the reliable craft inherited over time: only when both meet does the vessel stand as part of the experience. CAFORA shapes vessels worthy of that experience by carrying both design and tradition in one line.",
    japanese:
      "どれだけ設計を重ねても、最終的に体験をかたちにするのは、素材と焼きです。CAFORAの器は、1000年の歴史を持つ瀬戸・美濃焼で焼かれています。この地で培われてきた土の扱い、釉薬の配合、焼成の技術は、長い年月の中で磨かれ、受け継がれてきたものです。どれだけ正確に形を設計しても、最終的な質感や表情は、焼きによって決まります。CAFORAでは、設計から瀬戸・美濃焼の工程までを一貫して担うことで、形だけでなく、体験としての完成度を高めています。均一に整えられた形の中に、わずかな揺らぎが生まれる。その揺らぎが、手に取ったときの質感や、空間に置かれたときの印象をつくります。設計によって導き出された形と、受け継がれてきた確かな技術。その両方が重なってはじめて、器は体験の一部として成立します。CAFORAは、設計と伝統、その両方を一貫して担うことで、体験にふさわしい器を形にしています。",
    imageLayout: "double",
    images: [
      { src: "/images/About/brand-content-04a.png", alt: "伝統の中で、形になる" },
      { src: "/images/About/brand-content-04b.png", alt: "瀬戸・美濃焼" },
    ],
  },
  {
    id: "chapter-05",
    chapterLabel: "Chapter 05",
    title: "CAFORAという考え方",
    heroImage: "/images/About/brand-hero-05.png",
    english:
      "The name CAFORA combines CAFE and AURA. We want to be more than a provider of vessels—to help shape the atmosphere that flows through a café. A drink does not end with taste alone. Space, time, gesture, and vessel overlap and stay in memory as experience. At the center, the vessel quietly steadies the whole without stealing the show. Through designed form, refined technique, and inherited firing, we keep shaping experience. CAFORA is a brand that designs experience—from the vessel outward.",
    japanese:
      "CAFORAという名前は、CAFEとAURAを組み合わせたものです。私たちは、器を提供するだけでなく、カフェという空間に流れる雰囲気そのものをかたちづくる存在でありたいと考えています。一杯の飲み物は、味だけで完結するものではありません。空間、時間、所作、そして器。それらが重なり合い、体験として記憶に残ります。器は、その中心にありながら、目立ちすぎることなく、体験全体を整えていく。設計された形、磨き上げられた技術、受け継がれてきた焼き。そのすべてを通して、私たちは体験をつくっています。CAFORAは、器から、体験を設計するブランドです。",
    imageLayout: "single",
    images: [{ src: "/images/About/brand-content-05.png", alt: "CAFORAという考え方" }],
  },
];

export default function BrandPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container-cafora">
        {/* SP: タイトルのみ左寄せ / PC: フルナビ */}
        <div className="py-12 sm:hidden">
          <FadeUp>
            <h1 className="text-lg tracking-[0.047em]">
              CAFORAについて
            </h1>
          </FadeUp>
        </div>
        <nav
          className="hidden sm:flex sm:flex-col sm:gap-10 sm:py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:py-16"
          aria-label="CAFORAについて セクション一覧"
        >
          <FadeUp>
            <ul className="flex flex-col gap-4 text-xs tracking-[0.071em]">
              {NAV_LEFT.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp
            delay={BRAND_COL_DELAY_MS}
            className="flex flex-col items-center"
          >
            <h1 className="text-center text-lg tracking-[0.047em] sm:[writing-mode:vertical-rl] sm:[text-orientation:upright]">
              CAFORAについて
            </h1>
          </FadeUp>
          <FadeUp
            delay={BRAND_COL_DELAY_MS * 2}
            className="flex flex-col gap-4 text-right text-xs tracking-[0.071em] lg:items-end"
          >
            <ul className="flex flex-col gap-4 lg:items-end">
              {NAV_RIGHT.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>
        </nav>
      </div>

      <div className="flex flex-col gap-32 sm:gap-40">
        {CHAPTERS.map((chapter) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className="scroll-mt-48"
          >
            <div className="mx-auto w-full max-w-[1200px]">
              <div className="mx-auto flex w-full max-w-[1136px] flex-col gap-20 sm:gap-24 lg:gap-32">
                <FadeUp className="order-2 sm:order-none">
                  <ChapterHeroParallax
                    src={chapter.heroImage}
                    priority={chapter.id === "chapter-01"}
                  />
                </FadeUp>

                <div
                  className={
                    chapter.id === "chapter-03" || chapter.id === "chapter-04"
                      ? "order-1 flex flex-col gap-20 px-4 pb-20 sm:order-none sm:gap-32 sm:px-[48px] sm:pb-24 lg:pb-24"
                      : "order-1 flex flex-col gap-20 px-4 pb-20 sm:order-none sm:gap-32 sm:px-[48px] sm:pb-24 lg:flex-row lg:items-stretch lg:justify-between lg:gap-48 lg:pb-24"
                  }
                >
                  {chapter.id === "chapter-03" ? (
                    <>
                      <div className="flex flex-col lg:hidden">
                        <FadeUp>
                          <p className="hidden text-xs leading-[1.8] text-muted-foreground sm:block">
                            {chapter.english}
                          </p>
                        </FadeUp>
                        <FadeUp
                          delay={BRAND_COL_DELAY_MS}
                          className="relative mt-10 aspect-[3/1] w-full overflow-hidden"
                        >
                          <Image
                            src={chapter.images[0].src}
                            alt={chapter.images[0].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 640px"
                          />
                        </FadeUp>
                        <FadeUp
                          delay={BRAND_COL_DELAY_MS * 2}
                          className="mt-[80px] flex flex-col text-left sm:text-right"
                        >
                          <ScrollRevealText
                            as="p"
                            text={chapter.chapterLabel}
                            className="mb-8 text-sm tracking-[0.061em] text-muted-foreground"
                            charDelayMs={24}
                          />
                          <ScrollRevealText
                            as="h2"
                            text={chapter.title}
                            className="mb-16 w-full text-2xl font-bold tracking-[0.035em]"
                            charDelayMs={20}
                          />
                          <p className="w-full text-left text-[15px] leading-[2em]">
                            {chapter.japanese}
                          </p>
                        </FadeUp>
                      </div>

                      <div className="hidden min-w-0 flex-1 flex-col gap-10 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-48">
                        <FadeUp className="flex min-w-0 max-w-[640px] flex-1 flex-col gap-10">
                          <p className="text-xs leading-[1.8] text-muted-foreground">
                            {chapter.english}
                          </p>
                          <div className="relative aspect-[3/1] w-full overflow-hidden">
                            <Image
                              src={chapter.images[0].src}
                              alt={chapter.images[0].alt}
                              fill
                              className="object-cover"
                              sizes="640px"
                            />
                          </div>
                        </FadeUp>
                        <FadeUp
                          delay={BRAND_COL_DELAY_MS}
                          className="mt-[80px] flex w-full min-w-0 shrink-0 flex-col text-right lg:max-w-[466px]"
                        >
                          <ScrollRevealText
                            as="p"
                            text={chapter.chapterLabel}
                            className="mb-8 text-sm tracking-[0.061em] text-muted-foreground"
                            charDelayMs={24}
                          />
                          <ScrollRevealText
                            as="h2"
                            text={chapter.title}
                            className="mb-16 w-full text-2xl font-bold tracking-[0.035em]"
                            charDelayMs={20}
                          />
                          <p className="w-full max-w-[466px] text-left text-[15px] leading-[2em]">
                            {chapter.japanese}
                          </p>
                        </FadeUp>
                      </div>
                    </>
                  ) : chapter.id === "chapter-04" ? (
                    <>
                      <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-48">
                        <FadeUp className="mx-auto hidden w-full max-w-[320px] shrink-0 sm:block lg:mx-0">
                          <p className="text-xs leading-[1.8] text-muted-foreground">
                            {chapter.english}
                          </p>
                        </FadeUp>
                        <FadeUp
                          delay={BRAND_COL_DELAY_MS}
                          className="flex min-h-0 min-w-0 flex-1 flex-col justify-center lg:max-w-[466px]"
                        >
                          <div className="flex flex-col text-left sm:text-right">
                            <ScrollRevealText
                              as="p"
                              text={chapter.chapterLabel}
                              className="mb-8 text-sm tracking-[0.061em] text-muted-foreground"
                              charDelayMs={24}
                            />
                            <ScrollRevealText
                              as="h2"
                              text={chapter.title}
                              className="mb-16 text-2xl font-bold tracking-[0.035em]"
                              charDelayMs={20}
                            />
                            <p className="w-full text-left text-[15px] leading-[2em] lg:max-w-[466px]">
                              {chapter.japanese}
                            </p>
                          </div>
                        </FadeUp>
                      </div>
                      <div className="ml-auto w-full max-w-[466px]">
                        <StaggerChildren
                          staggerDelay={BRAND_COL_DELAY_MS}
                          className="ml-auto flex w-fit max-w-full gap-[4px]"
                        >
                          {chapter.images.map((img) => (
                            <div
                              key={img.src}
                              className="relative aspect-square w-[calc(50%-2px)] min-w-0 max-w-[200px] shrink-0 overflow-hidden sm:w-[200px]"
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="200px"
                              />
                            </div>
                          ))}
                        </StaggerChildren>
                      </div>
                    </>
                  ) : (
                    <>
                      <FadeUp className="mx-auto flex w-full max-w-[320px] shrink-0 flex-col lg:mx-0">
                        {chapter.imageLayout === "single" ? (
                          <div className="relative aspect-square w-full overflow-hidden">
                            <Image
                              src={chapter.images[0].src}
                              alt={chapter.images[0].alt}
                              fill
                              className="object-cover"
                              sizes="320px"
                              priority={chapter.id === "chapter-01"}
                            />
                          </div>
                        ) : (
                          <div className="flex w-full gap-[4px]">
                            {chapter.images.map((img) => (
                              <div
                                key={img.src}
                                className="relative aspect-square min-h-0 min-w-0 max-w-[200px] flex-1 overflow-hidden"
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-cover"
                                  sizes="200px"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="mt-8 hidden text-xs leading-[1.8] text-muted-foreground sm:block">
                          {chapter.english}
                        </p>
                      </FadeUp>
                      <FadeUp
                        delay={BRAND_COL_DELAY_MS}
                        className="flex min-h-0 min-w-0 flex-1 flex-col justify-center lg:max-w-[466px]"
                      >
                        <div className="flex flex-col text-left sm:text-right">
                          <ScrollRevealText
                            as="p"
                            text={chapter.chapterLabel}
                            className="mb-8 text-sm tracking-[0.061em] text-muted-foreground"
                            charDelayMs={24}
                          />
                          <ScrollRevealText
                            as="h2"
                            text={chapter.title}
                            className="mb-16 text-2xl font-bold tracking-[0.035em]"
                            charDelayMs={20}
                          />
                          <p className="w-full text-left text-[15px] leading-[2em] lg:max-w-[466px]">
                            {chapter.japanese}
                          </p>
                        </div>
                      </FadeUp>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <BrandBookCTA />
    </div>
  );
}
