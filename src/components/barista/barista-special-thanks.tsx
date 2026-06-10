"use client";

import { Instagram, Globe } from "lucide-react";
import { FadeUp } from "@/components/ui/scroll-animate";

const CAFES = [
  {
    name: "Kissa Coffee",
    location: "福岡・薬院",
    instagram: "https://www.instagram.com/",
    website: "https://example.com/",
  },
  {
    name: "Nami Coffee Roasters",
    location: "東京・蔵前",
    instagram: "https://www.instagram.com/",
    website: "https://example.com/",
  },
  {
    name: "Shizuku Café",
    location: "京都・岡崎",
    instagram: "https://www.instagram.com/",
    website: "https://example.com/",
  },
];

const BARISTAS = [
  { name: "田中 雄太", role: "Head Barista", instagram: "https://www.instagram.com/" },
  { name: "木村 さやか", role: "Barista / Trainer", instagram: "https://www.instagram.com/" },
  { name: "中村 拓海", role: "Coffee Roaster", instagram: "https://www.instagram.com/" },
  { name: "林 美咲", role: "Café Owner / Barista", instagram: "https://www.instagram.com/" },
];

export function BaristaSpecialThanks() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-cafora">
        <FadeUp>
          <p className="text-left text-[10px] tracking-[0.5em] text-muted-foreground sm:text-center sm:text-xs">
            SPECIAL THANKS
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="mx-auto mt-8 flex flex-col items-start justify-center gap-10 sm:flex-row sm:gap-20 lg:gap-32">
            {/* Cafes */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground/60">
                CAFÉ
              </p>
              <ul className="flex flex-col gap-3">
                {CAFES.map((cafe) => (
                  <li key={cafe.name} className="flex flex-col gap-1">
                    <span className="text-sm font-medium tracking-wide text-foreground">
                      {cafe.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {cafe.location}
                    </span>
                    <div className="mt-0.5 flex items-center gap-2">
                      <a
                        href={cafe.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${cafe.name} Instagram`}
                        className="text-muted-foreground/50 transition-colors hover:text-foreground"
                      >
                        <Instagram className="size-3.5" />
                      </a>
                      <a
                        href={cafe.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${cafe.name} ウェブサイト`}
                        className="text-muted-foreground/50 transition-colors hover:text-foreground"
                      >
                        <Globe className="size-3.5" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Baristas */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground/60">
                BARISTA
              </p>
              <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
                {BARISTAS.map((barista) => (
                  <li key={barista.name} className="flex flex-col gap-1">
                    <span className="text-sm font-medium tracking-wide text-foreground">
                      {barista.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {barista.role}
                    </span>
                    <a
                      href={barista.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${barista.name} Instagram`}
                      className="mt-0.5 w-fit text-muted-foreground/50 transition-colors hover:text-foreground"
                    >
                      <Instagram className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
