"use client";

import { cn } from "@/lib/utils";

export type TwoToneSplit = "diagonal" | "horizontal";

const CLIP_PATHS: Record<TwoToneSplit, string> = {
  diagonal: "polygon(0 62%, 100% 36%, 100% 100%, 0 100%)",
  horizontal: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
};

type Props = {
  upperHex: string;
  lowerHex: string;
  className?: string;
  split?: TwoToneSplit;
};

export function TwoToneSwatch({
  upperHex,
  lowerHex,
  className,
  split = "diagonal",
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border border-border/70 bg-background",
        className,
      )}
      style={{ backgroundColor: upperHex }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: lowerHex,
          clipPath: CLIP_PATHS[split],
        }}
      />
    </div>
  );
}

export function getTwoToneSplitForProduct(name: string): TwoToneSplit {
  return name.includes("KAKU") ? "horizontal" : "diagonal";
}
