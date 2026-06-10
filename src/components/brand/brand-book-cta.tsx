import { FadeUp } from "@/components/ui/scroll-animate";
import { MaterialIcon } from "@/components/ui/material-icon";

export function BrandBookCTA() {
  return (
    <section className="bg-stone-900 py-24 text-white sm:py-32">
      <div className="container-cafora">
        <div className="mx-auto max-w-[680px] text-center">
          <FadeUp>
            <p className="text-[10px] tracking-[0.3em] text-white/50">
              Brand Book
            </p>
            <h2
              className="mt-4 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl"
              style={{ lineHeight: "1.8em" }}
            >
              バリスタの理想を、
              <br />
              形にする。
            </h2>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="mt-10 text-[15px] leading-[2em] text-white/70 sm:text-base">
              <p>
                一杯のコーヒーに宿る理想——香り、余韻、過ごす時間。
                <br />
                Brand bookでは、もっと詳しくCAFORAを知ることができます。
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <a
                href="https://caforabrand.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-10 py-4 text-sm font-medium text-stone-900 transition-colors duration-300 hover:bg-white/90 sm:text-base"
              >
                CAFORA&apos;S Brand Book
                <MaterialIcon icon="open_in_new" />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
