"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * 商品詳細ストーリー挿絵（`StoryParallaxImage`）と同様、スクロールに応じて
 * 画像が縦方向にわずかに移動するパララックス。
 */
export function ChapterHeroParallax({
  src,
  className = "",
  priority = false,
}: {
  src: string;
  className?: string;
  /** 先頭チャプターの LCP 用 */
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        const progress =
          1 - (rect.top + rect.height) / (windowH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        setOffset((clamped - 0.5) * 40);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[240px] w-full overflow-hidden sm:min-h-[379px] ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.12)` }}
        sizes="(max-width: 768px) 100vw, 1136px"
        priority={priority}
      />
    </div>
  );
}
