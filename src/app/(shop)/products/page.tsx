import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate";
import { getProductImageSrc, LATTE_BOWL_PRODUCTS, formatProductDisplayName } from "@/constants";

export const metadata: Metadata = {
  title: "商品を探す",
};

const PRODUCTS = [
  {
    slug: LATTE_BOWL_PRODUCTS.on.slug,
    name: LATTE_BOWL_PRODUCTS.on.name,
    nameEn: LATTE_BOWL_PRODUCTS.on.nameEn,
    tagline: "両手で包む、冬のひととき",
    description:
      "取っ手のないまるい器。両手で包むと、ラテの温もりがじんわり手のひらに伝わってくる。",
    capacity: "280ml",
    price: 2000,
    image: "/images/home/latte-bowl-on.png",
  },
  {
    slug: LATTE_BOWL_PRODUCTS.kaku.slug,
    name: LATTE_BOWL_PRODUCTS.kaku.name,
    nameEn: LATTE_BOWL_PRODUCTS.kaku.nameEn,
    tagline: "見惚れて、味わう",
    description:
      "広く開いた口に描かれるラテアート。口に運ぶと、この形でしか出ない口当たりに少し驚く。",
    capacity: "280ml",
    price: 2000,
    image: "/images/home/latte-bowl-kaku.png",
  },
];

export default function ProductsPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <FadeUp>
          <h1 className="text-xl font-semibold sm:text-2xl">商品を探す</h1>
        </FadeUp>

        {/* Latte Bowl ラインナップ */}
        <section className="mt-8">
          <FadeUp>
            <h2 className="text-lg font-semibold">ラテボウル</h2>
          </FadeUp>
          <StaggerChildren staggerDelay={120} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
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
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
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
                      &yen;{product.price.toLocaleString()}
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
        </section>
      </div>
    </div>
  );
}
