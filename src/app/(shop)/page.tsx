"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/top/hero-carousel";
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate";
// プレオープン中は非表示（Instagram 準備中）
// import { InstagramSection } from "@/components/sections/instagram-section";
import { AccordionItem } from "@/components/ui/accordion";
import { getProductImageSrc, LATTE_BOWL_PRODUCTS, formatProductDisplayName, formatLatteBowlPriceRange } from "@/constants";
function SplitButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center border border-foreground px-12 py-4 text-sm font-medium transition-colors duration-300 ease-in-out hover:bg-foreground hover:text-background"
    >
      {children}
    </Link>
  );
}

// ==========================================
// Products Section
// ==========================================
const PRODUCTS = [
  {
    slug: LATTE_BOWL_PRODUCTS.on.slug,
    name: LATTE_BOWL_PRODUCTS.on.name,
    nameEn: LATTE_BOWL_PRODUCTS.on.nameEn,
    tagline: "両手で包む、冬のひととき",
    description:
      "取っ手のないまるい器。両手で包むと、ラテの温もりがじんわり手のひらに伝わってくる。",
    image: "/images/home/latte-bowl-on.webp",
  },
  {
    slug: LATTE_BOWL_PRODUCTS.kaku.slug,
    name: LATTE_BOWL_PRODUCTS.kaku.name,
    nameEn: LATTE_BOWL_PRODUCTS.kaku.nameEn,
    tagline: "見惚れて、味わう",
    description:
      "広く開いた口に描かれるラテアート。口に運ぶと、この形でしか出ない口当たりに少し驚く。",
    image: "/images/home/latte-bowl-kaku.webp",
  },
] as const;

function ProductsSection() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="container-cafora">
        <FadeUp>
          <h2 className="text-center text-xl font-semibold tracking-wide sm:text-2xl">
            Our Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            一杯をもっと美しく。味わう時間をもっとやさしく。
            <br />
            そのために生まれたラテボウルです。
          </p>
        </FadeUp>

        {/* 2-Column Product Banners */}
        <StaggerChildren className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2" staggerDelay={150}>
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group relative flex flex-col overflow-hidden bg-[#FBFBFB]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2]">
                <Image
                  src={getProductImageSrc(product.image)}
                  alt={formatProductDisplayName(product.name)}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text Overlay */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-bold tracking-wide sm:text-3xl">
                      {formatProductDisplayName(product.name)}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground/80 sm:text-base">
                    {product.tagline}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <p className="text-lg font-semibold">
                    &yen;{formatLatteBowlPriceRange(product.slug)}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      税込
                    </span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                    詳しくみる
                    <ArrowRight className="size-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// InstagramSection は /components/sections/instagram-section.tsx に移動

// ==========================================
// Blog Section
// ==========================================
const BLOG_POSTS = [
  {
    title:
      "ブランドは口元で完成する。口当たり・縁の厚み・釉薬の艶が与える体験の差。",
    image: "/images/home/blog-1.svg",
    href: "/journal/brand-rim-experience",
  },
  {
    title:
      "開業30日前の決断 〜検討→注文→納品、\u201c間に合わせる段取り\u201dの全記録〜",
    image: "/images/home/blog-2.svg",
    href: "/journal/opening-30days",
  },
  {
    title: "【導入事例】小さな焙煎所が\u201c統一感\u201dで席単価を上げた話",
    image: "/images/home/blog-3.svg",
    href: "/journal/small-roastery-branding",
  },
] as const;

// プレオープン中は呼び出し箇所をコメントアウト（ジャーナル準備中）。準備完了後に復活させる。
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BlogSection() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="container-cafora">
        <FadeUp>
          <h2 className="text-center text-xl font-semibold tracking-wide sm:text-2xl">
            Journal
          </h2>
        </FadeUp>

        {/* PC: 3-column grid / SP: horizontal scroll */}
        <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <StaggerChildren className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0" staggerDelay={120}>
            {BLOG_POSTS.map((post, i) => (
              <a key={i} href={post.href} className="group flex w-[80vw] shrink-0 snap-start flex-col sm:w-auto">
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 80vw, 33vw"
                  />
                </div>

                {/* Title + Inline Link */}
                <div className="mt-3 flex flex-col gap-2">
                  <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {post.title}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                    読む
                    <ArrowRight className="size-3 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </StaggerChildren>
        </div>

        <FadeUp className="mt-6 flex justify-center sm:mt-8">
          <SplitButton href="/journal">もっとみる</SplitButton>
        </FadeUp>
      </div>
    </section>
  );
}

// ==========================================
// Barista CTA Section
// ==========================================
function BaristaSection() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="container-cafora">
        <FadeUp>
          <Link href="/barista" className="relative block aspect-[4/3] overflow-hidden sm:aspect-[16/7]">
            {/* 背景画像 */}
            <Image
              src="/images/Baristas/banner-pc.webp"
              alt="WITH BARISTAS"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 1200px"
            />
            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-black/40" />
            {/* テキスト */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <p className="text-[10px] tracking-[0.5em] opacity-80">WITH BARISTAS</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
                <span className="sm:hidden">バリスタと共に<br />器をつくる</span>
                <span className="hidden sm:inline">バリスタと共に、器をつくる</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed opacity-80 sm:text-sm">
                バリスタが本当にこだわる、<br />味・口当たり・余韻までを、器から設計しています。
              </p>
              <span className="mt-6 inline-flex items-center border border-white px-8 py-3 text-xs font-medium tracking-wide transition-colors duration-300 hover:bg-white hover:text-foreground sm:text-sm">
                詳しくみる
              </span>
            </div>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

// ==========================================
// Story Section
// ==========================================
function StorySection() {
  return (
    <section id="story" className="pt-16 sm:pt-24">
      <div className="container-cafora">
        <FadeUp>
          <h2 className="text-center text-xl font-semibold tracking-wide sm:text-2xl">
            CAFORAについて
          </h2>
        </FadeUp>

        <div className="mx-auto mt-8 max-w-3xl">
          <FadeUp>
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/About/story-main.webp"
                alt="陶器の製造工程"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </FadeUp>

          <FadeUp>
            <p className="mt-6 text-sm text-muted-foreground sm:text-base" style={{ lineHeight: "1.8em" }}>
              CAFORAは、器を起点にカフェという体験を設計するブランドです。
              口当たり、香りの広がり、温度の保ち方、それらすべては、器の形によって変わります。
              独自の3D陶器プリンター技術で試行を重ね、1000年の歴史を持つ瀬戸・美濃焼の技術で焼き上げる。
              その一杯に本当に必要な形を、私たちは設計しています。
            </p>
          </FadeUp>

          <FadeUp className="mt-6 flex justify-center">
            <SplitButton href="/brand">もっと知る</SplitButton>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}


// ==========================================
// FAQ Section
// ==========================================
const FAQS = [
  {
    question: "発注してからどのくらいで届きますか？",
    answer: "通常、ご注文確定後約4週間でお届けいたします。繁忙期には多少お時間をいただく場合がございます。",
  },
  {
    question: "最小発注数はいくつですか？",
    answer: "1デザインにつき30個からご注文いただけます。",
  },
  {
    question: "ロゴの入稿データはどのような形式に対応していますか？",
    answer: "PNG、JPEG、SVG形式に対応しております。より鮮明な仕上がりのため、高解像度のデータをお勧めします。",
  },
  {
    question: "食洗機や電子レンジは使用できますか？",
    answer: "はい、すべての商品が食洗機・電子レンジ対応です。業務用食洗機にも対応しています。",
  },
];

function FAQSection() {
  return (
    <section className="pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div className="container-cafora">
        <FadeUp>
          <h2 className="text-center text-xl font-semibold tracking-wide sm:text-2xl">
            よくあるご質問
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="mx-auto mt-8 max-w-2xl divide-y divide-border">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} title={faq.question}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="mt-8 flex justify-center">
          <SplitButton href="/faq">もっとみる</SplitButton>
        </FadeUp>
      </div>
    </section>
  );
}

// ==========================================
// Top Page
// ==========================================
export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ProductsSection />
      <BaristaSection />
      {/* プレオープン中は非表示（ジャーナル / Instagram 準備中） */}
      {/* <BlogSection /> */}
      {/* <InstagramSection /> */}
      <StorySection />
      <FAQSection />
    </>
  );
}
