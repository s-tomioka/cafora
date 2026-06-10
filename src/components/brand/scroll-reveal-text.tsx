"use client";

import { useEffect, useRef, useState } from "react";

type Tag = "p" | "h2" | "span";

/**
 * スクロールでビューに入ったあと、1文字ずつ opacity でふわっと表示。
 * 見出し・本文などに利用（長文は charDelayMs をやや大きくすると負荷が下がる）。
 */
export function ScrollRevealText({
  text,
  className = "",
  as: TagName = "p",
  charDelayMs = 12,
  /** 長文で遅延が長くなりすぎないよう上限（ms） */
  maxStaggerMs = 4000,
}: {
  text: string;
  className?: string;
  as?: Tag;
  charDelayMs?: number;
  maxStaggerMs?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const chars = Array.from(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = TagName;

  return (
    <Comp ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {chars.map((ch, i) => {
          const delay = Math.min(i * charDelayMs, maxStaggerMs);
          return (
            <span
              key={`${i}-${ch}`}
              className="inline-block transition-[opacity,transform] duration-500 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(0.25em)",
                transitionDelay: visible ? `${delay}ms` : "0ms",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </span>
    </Comp>
  );
}
