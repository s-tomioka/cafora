import Image from "next/image"
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate"
import { MaterialIcon } from "@/components/ui/material-icon"

const INITIAL_COUNT = 4

const ITEMS = Array.from({ length: INITIAL_COUNT }, (_, i) => ({
  id: i + 1,
  src: `/images/home/ig-${(i % 4) + 1}.svg`,
  alt: `Instagram投稿 ${i + 1}`,
}))

export function InstagramSection() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="container-cafora">
        <FadeUp>
          <h2 className="text-center text-xl font-semibold tracking-wide sm:text-2xl">
            Instagram
          </h2>
        </FadeUp>

        <StaggerChildren staggerDelay={120} className="mt-8 grid grid-cols-2 gap-0.5 sm:grid-cols-4">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden bg-muted"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </StaggerChildren>

        <FadeUp className="mt-8 flex justify-center">
          <a
            href="https://www.instagram.com/caforajp/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Instagramでもっとみる
            <MaterialIcon icon="open_in_new" />
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
