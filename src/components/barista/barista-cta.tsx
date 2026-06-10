import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/scroll-animate";

export function BaristatCTA() {
  return (
    <section className="bg-stone-900 py-24 text-white sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px] text-center">
          <FadeUp>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl" style={{ lineHeight: "1.8em" }}>
              共にこだわりの一杯を
              <br />
              目指しませんか？
            </h2>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="mt-10 space-y-5 text-[15px] leading-[2em] text-white/70 sm:text-base">
              <p>
                CAFORAは、バリスタと共に進化するプロダクトです。
              </p>
              <p>
                インタビュー・開発に参加いただけるカフェ関係者の方を募集しています。
                <br />
                現場の違和感や理想を、ぜひ聞かせてください。
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Link
                href="/faq?type=development#contact"
                className="inline-flex items-center justify-center bg-white px-10 py-4 text-sm font-medium text-stone-900 transition-colors duration-300 hover:bg-white/90 sm:text-base"
              >
                開発に参加する
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
