"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { getProductImageSrc } from "@/constants";

type HeroSlide = {
  srcPc: string;
  srcSp: string;
  alt: string;
  href: string;
  pcClassName?: string;
  spClassName?: string;
  pcUnoptimized?: boolean;
  spUnoptimized?: boolean;
};

const SLIDES: HeroSlide[] = [
  {
    srcPc: "/images/home/slide-barista-pc.png",
    srcSp: "/images/home/slide-barista-sp.png",
    alt: "バリスタのための器",
    href: "/barista",
    pcUnoptimized: true,
    spUnoptimized: true,
  },
  {
    srcPc: "/images/home/slide-seto-pc.png",
    srcSp: "/images/home/slide-seto-sp.png",
    alt: "瀬戸・美濃焼の技術で生まれたCAFORAの器",
    href: "/brand",
    pcUnoptimized: true,
    spUnoptimized: true,
  },
  {
    srcPc: "/images/home/slide-main-pc.png",
    srcSp: "/images/home/slide-main-sp.png",
    alt: "CAFORA - ON & KAKU ラテボウル",
    href: "/products",
    pcClassName: "brightness-[0.94] contrast-[1.06]",
    spClassName: "brightness-[0.94] contrast-[1.06]",
    pcUnoptimized: true,
    spUnoptimized: true,
  },
];

const SLIDE_COUNT = SLIDES.length;
const EXTENDED_SLIDES: HeroSlide[] = [
  SLIDES[SLIDE_COUNT - 1],
  ...SLIDES,
  SLIDES[0],
];

const AUTO_PLAY_INTERVAL = 7000;
const SLIDE_DURATION = 700;
const SLIDE_GAP_MOBILE = 8;
const SLIDE_GAP_DESKTOP = 24;
const SIDE_OPACITY = 0.4;
const DRAG_THRESHOLD = 40;
const DRAG_AXIS_LOCK = 8;
/** 格納画像（slide-*-pc.png）2560×1097 */
const HERO_PC_HEIGHT_RATIO = 1097 / 2560;
/** 格納画像（slide-*-sp.png）1125×1500 */
const HERO_SP_HEIGHT_RATIO = 1500 / 1125;

function getSlideHeight(slideWidth: number, viewportWidth: number): number {
  if (slideWidth <= 0) return 0;
  return viewportWidth >= 640
    ? slideWidth * HERO_PC_HEIGHT_RATIO
    : slideWidth * HERO_SP_HEIGHT_RATIO;
}

function getSlideGap(viewportWidth: number): number {
  return viewportWidth >= 640 ? SLIDE_GAP_DESKTOP : SLIDE_GAP_MOBILE;
}

/** container-cafora のコンテンツ幅（max-w + px）に合わせる */
function getContainerCaforaContentWidth(viewportWidth: number): number {
  const containerWidth = Math.min(viewportWidth, 1200);
  const horizontalPadding =
    viewportWidth >= 1024 ? 32 : viewportWidth >= 640 ? 24 : 16;
  return containerWidth - horizontalPadding * 2;
}

function HeroSlideImage({
  slide,
  priority,
}: {
  slide: HeroSlide;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={getProductImageSrc(slide.srcSp)}
        alt={slide.alt}
        fill
        className={cn("object-cover sm:hidden", slide.spClassName)}
        priority={priority}
        loading="eager"
        sizes="100vw"
        unoptimized={slide.spUnoptimized === true}
        draggable={false}
      />
      <Image
        src={getProductImageSrc(slide.srcPc)}
        alt={slide.alt}
        fill
        className={cn("hidden object-cover sm:block", slide.pcClassName)}
        priority={priority}
        loading="eager"
        sizes="100vw"
        unoptimized={slide.pcUnoptimized === true}
        draggable={false}
      />
    </>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    axis: "none" | "horizontal" | "vertical";
  } | null>(null);
  const hasDraggedRef = useRef(false);
  const goNextRef = useRef<() => void>(() => {});
  const goPrevRef = useRef<() => void>(() => {});
  const resetTimerRef = useRef<() => void>(() => {});

  const slideWidth =
    viewportWidth > 0 ? getContainerCaforaContentWidth(viewportWidth) : 0;
  const slideHeight =
    viewportWidth > 0 ? getSlideHeight(slideWidth, viewportWidth) : 0;
  const slideGap =
    viewportWidth > 0 ? getSlideGap(viewportWidth) : SLIDE_GAP_MOBILE;
  const translateX =
    viewportWidth > 0
      ? (viewportWidth - slideWidth) / 2 -
        trackIndex * (slideWidth + slideGap) +
        dragOffset
      : 0;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateLayout = () => {
      setViewportWidth(viewport.clientWidth);
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(viewport);
    window.addEventListener("resize", updateLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const snapTrackIfNeeded = useCallback(() => {
    setIsAnimating(false);

    if (trackIndex === SLIDE_COUNT + 1) {
      setDisableTransition(true);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false));
      });
      return;
    }

    if (trackIndex === 0) {
      setDisableTransition(true);
      setTrackIndex(SLIDE_COUNT);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDisableTransition(false));
      });
    }
  }, [trackIndex]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goNextRef.current(), AUTO_PLAY_INTERVAL);
  }, []);

  goNextRef.current = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTrackIndex((index) => index + 1);
    setCurrent((index) => (index + 1) % SLIDE_COUNT);
  };

  goPrevRef.current = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTrackIndex((index) => index - 1);
    setCurrent((index) => (index - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  };

  resetTimerRef.current = resetTimer;

  const goTo = useCallback(
    (target: number) => {
      if (isAnimating || target === current) return;
      setIsAnimating(true);
      setTrackIndex(target + 1);
      setCurrent(target);
    },
    [current, isAnimating],
  );

  useEffect(() => {
    timerRef.current = setInterval(() => goNextRef.current(), AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const handleBarClick = (index: number) => {
    goTo(index);
    resetTimer();
  };

  const handleTrackTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.propertyName !== "transform") return;
    snapTrackIfNeeded();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isAnimating) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      axis: "none",
    };
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.axis === "none") {
      if (
        Math.abs(deltaX) < DRAG_AXIS_LOCK &&
        Math.abs(deltaY) < DRAG_AXIS_LOCK
      ) {
        return;
      }

      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        drag.axis = "vertical";
        dragRef.current = null;
        return;
      }

      drag.axis = "horizontal";
      setIsDragging(true);
      pauseTimer();
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (drag.axis !== "horizontal") return;

    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }

    setDragOffset(deltaX);
  };

  const finishPointerDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
    setIsDragging(false);

    if (drag.axis === "horizontal") {
      const offset = event.clientX - drag.startX;

      if (offset < -DRAG_THRESHOLD) {
        setDragOffset(0);
        goNextRef.current();
        resetTimerRef.current();
      } else if (offset > DRAG_THRESHOLD) {
        setDragOffset(0);
        goPrevRef.current();
        resetTimerRef.current();
      } else {
        setDragOffset(0);
        resetTimerRef.current();
      }
      return;
    }

    resetTimerRef.current();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    finishPointerDrag(event);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    finishPointerDrag(event);
    setDragOffset(0);
    setIsDragging(false);
    dragRef.current = null;
  };

  const handleActiveSlideClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasDraggedRef.current) {
      event.preventDefault();
    }
  };

  const handleSlideClick = (extendedIndex: number) => {
    if (extendedIndex === trackIndex || isAnimating) return;

    const logicalIndex =
      extendedIndex === 0
        ? SLIDE_COUNT - 1
        : extendedIndex === SLIDE_COUNT + 1
          ? 0
          : extendedIndex - 1;

    goTo(logicalIndex);
    resetTimer();
  };

  return (
    <section className="mt-4 w-full sm:mt-8">
      <div
        ref={viewportRef}
        className={cn(
          "overflow-hidden touch-pan-y select-none sm:cursor-grab",
          isDragging && "sm:cursor-grabbing",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          className="relative w-full"
          style={slideHeight > 0 ? { height: slideHeight } : undefined}
        >
          {slideHeight === 0 && (
            <div className="aspect-[1125/1500] w-full sm:aspect-[2560/1097]" aria-hidden />
          )}
          <div
            ref={trackRef}
            className={cn(
              "absolute inset-0 flex items-stretch",
              !disableTransition && !isDragging && "transition-transform ease-in-out",
            )}
            style={{
              transform: `translateX(${translateX}px)`,
              transitionDuration:
                disableTransition || isDragging ? "0ms" : `${SLIDE_DURATION}ms`,
            }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {EXTENDED_SLIDES.map((slide, i) => {
              const isActive = i === trackIndex;
              const slideStyle = {
                width: slideWidth > 0 ? `${slideWidth}px` : "100%",
                height: slideHeight > 0 ? `${slideHeight}px` : "100%",
                marginRight: `${slideGap}px`,
              };

              if (isActive) {
                return (
                  <Link
                    key={`${slide.href}-${i}`}
                    href={slide.href}
                    onClick={handleActiveSlideClick}
                    draggable={false}
                    className="relative shrink-0 overflow-hidden transition-opacity ease-in-out"
                    style={{
                      ...slideStyle,
                      opacity: 1,
                      transitionDuration: `${SLIDE_DURATION}ms`,
                    }}
                    aria-label={slide.alt}
                  >
                    <HeroSlideImage slide={slide} priority={i === 1} />
                  </Link>
                );
              }

              return (
                <button
                  key={`${slide.href}-${i}`}
                  type="button"
                  onClick={() => handleSlideClick(i)}
                  aria-label={`${slide.alt}を表示`}
                  className="relative shrink-0 overflow-hidden transition-opacity ease-in-out"
                  style={{
                    ...slideStyle,
                    opacity: SIDE_OPACITY,
                    transitionDuration: `${SLIDE_DURATION}ms`,
                  }}
                >
                  <HeroSlideImage slide={slide} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-5 sm:py-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleBarClick(i)}
            aria-label={`スライド ${i + 1} に移動`}
            aria-current={i === current ? "true" : undefined}
            className={cn(
              "transition-all duration-300",
              i === current
                ? "h-1 w-8 bg-primary"
                : "size-1 bg-primary/20 hover:bg-primary/35",
            )}
          />
        ))}
      </div>
    </section>
  );
}
