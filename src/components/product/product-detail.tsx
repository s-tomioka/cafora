"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Minus, Plus, ArrowRight, Check, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeUp, FadeIn } from "@/components/ui/scroll-animate";
import { TwoToneSwatch, type TwoToneSplit } from "@/components/ui/two-tone-swatch";
import {
  getLatteBowlColorDetailImagePath,
  getLatteBowlGalleryImagePath,
  getProductImageSrc,
  LATTE_BOWL_COLOR_OPTIONS,
  LATTE_BOWL_SIZE_OPTIONS,
  formatLatteBowlPriceRange,
  getLatteBowlSizePrice,
  LOGO_SURCHARGE,
  MIN_ORDER_QUANTITY,
  alertMinOrderQuantity,
  getMinOrderQuantityMessage,
  formatProductDisplayName,
  DELIVERY_LEAD_TIME_TEXT,
  PAYMENT_METHOD_TEXT,
  PRODUCTION_AREA,
  DISHWASHER_MICROWAVE_INFO,
  HANDLING_CAUTION_NOTES,
  getLatteBowlSizeSpec,
  LOGO_FORMAT_LABEL,
  LOGO_ACCEPT_ATTRIBUTE,
  type LatteBowlProductSlug,
} from "@/constants";
import { useCart } from "@/contexts/cart-context";
import { consumeReorderLogo } from "@/lib/reorder";
import { ExperienceChart, ON_POSITIONS, KAKU_POSITIONS } from "@/components/product/experience-chart";
import { AI_VISUALIZER_ENABLED, AiVisualizer } from "@/components/product/ai-visualizer";

type StoryImage = {
  src: string;
  alt: string;
  afterParagraph: number;
};

type FeatureImage = {
  src: string;
  alt: string;
  size: "sm" | "lg";
  title: string;
  description: string;
};

type Props = {
  slug: string;
  name: string;
  nameEn: string;
  capacity: string;
  description: string;
  images: string[];
  featureImages: FeatureImage[];
  storyLabel: string;
  storyHeading: string;
  story: string[];
  storyImages: StoryImage[];
  otherSlug: string;
  otherName: string;
  otherNameEn: string;
  otherTagline: string;
  otherDescription: string;
  otherImage: string;
};

const LOGO_CROP_ASPECT_RATIO = 16 / 9;
const LOGO_CROP_OUTPUT_WIDTH = 512;
const LOGO_CROP_OUTPUT_HEIGHT = Math.round(LOGO_CROP_OUTPUT_WIDTH / LOGO_CROP_ASPECT_RATIO);
const LOGO_CROP_MIN_ZOOM = 0.4;
const LOGO_CROP_MAX_ZOOM = 4;
const LOGO_CROP_ZOOM_STEP = 0.15;
const LOGO_CROP_VIEWPORT_WIDTH = 320;

function getLogoFitScale(
  imageSize: { width: number; height: number },
  viewportW: number,
  viewportH: number,
) {
  return Math.min(viewportW / imageSize.width, viewportH / imageSize.height);
}

function computeLogoPanForZoomChange(
  imageSize: { width: number; height: number },
  fitScale: number,
  currentZoom: number,
  nextZoom: number,
  panX: number,
  panY: number,
) {
  const oldScale = fitScale * currentZoom;
  const newScale = fitScale * nextZoom;
  const centerX = panX + (imageSize.width * oldScale) / 2;
  const centerY = panY + (imageSize.height * oldScale) / 2;

  return {
    panX: centerX - (imageSize.width * newScale) / 2,
    panY: centerY - (imageSize.height * newScale) / 2,
  };
}

function captureLogoViewportImage(
  src: string,
  imageSize: { width: number; height: number },
  viewportW: number,
  viewportH: number,
  panX: number,
  panY: number,
  displayScale: number,
) {
  return new Promise<string>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = LOGO_CROP_OUTPUT_WIDTH;
      canvas.height = LOGO_CROP_OUTPUT_HEIGHT;

      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("ロゴ画像のトリミングに失敗しました。"));
        return;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const srcX = -panX / displayScale;
      const srcY = -panY / displayScale;
      const srcW = viewportW / displayScale;
      const srcH = viewportH / displayScale;

      context.drawImage(
        image,
        srcX,
        srcY,
        srcW,
        srcH,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error("ロゴ画像のトリミングに失敗しました。"));
    image.src = src;
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("ロゴ画像の読み込みに失敗しました。"));
    reader.readAsDataURL(file);
  });
}

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => reject(new Error("ロゴ画像の読み込みに失敗しました。"));
    image.src = src;
  });
}

function SizeOptionSelector({
  options,
  selected,
  onSelect,
}: {
  options: readonly string[];
  selected: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {options.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          aria-pressed={selected === size}
          className={`inline-flex min-w-[4.5rem] items-center justify-center border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
            selected === size
              ? "border-foreground bg-foreground text-background"
              : "border-border text-foreground hover:bg-muted"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

function ColorOptionSelector({
  selected,
  onSelect,
  split,
}: {
  selected: string;
  onSelect: (nameEn: string) => void;
  split: TwoToneSplit;
}) {
  return (
    <div className="flex items-center gap-4">
      {LATTE_BOWL_COLOR_OPTIONS.map((color) => (
        <button
          key={color.nameEn}
          type="button"
          onClick={() => onSelect(color.nameEn)}
          title={color.name}
          aria-label={color.name}
          className="group relative inline-flex size-10 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
        >
          <TwoToneSwatch
            upperHex={color.upperHex}
            lowerHex={color.lowerHex}
            split={split}
            className={selected === color.nameEn ? "size-10 ring-1 ring-foreground" : "size-10"}
          />
          <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-[11px] text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {color.name}
          </span>
        </button>
      ))}
    </div>
  );
}

const COLOR_IMAGE_FADE_MS = 300;

function preloadProductImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Failed to preload ${src}`));
    image.src = src;
  });
}

type ImageFadePhase = "idle" | "fading-out" | "fading-in";

function ProductMainImage({
  src,
  alt,
  colorKey,
  galleryIndex,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  colorKey: string;
  galleryIndex: number;
  sizes: string;
  priority?: boolean;
}) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<ImageFadePhase>("idle");
  const displaySrcRef = useRef(src);
  const pendingSrcRef = useRef<string | null>(null);
  const phaseRef = useRef<ImageFadePhase>("idle");
  const preloadRef = useRef<Promise<void> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevColorKeyRef = useRef(colorKey);
  const prevGalleryIndexRef = useRef(galleryIndex);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const clearFadeTimer = useCallback(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const beginFadeIn = useCallback((nextSrc: string) => {
    phaseRef.current = "fading-in";
    setDisplaySrc(nextSrc);
    displaySrcRef.current = nextSrc;
    setVisible(false);
    setPhase("fading-in");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });

    clearFadeTimer();
    fadeTimerRef.current = setTimeout(() => {
      phaseRef.current = "idle";
      setPhase("idle");
      pendingSrcRef.current = null;
      preloadRef.current = null;
      fadeTimerRef.current = null;
    }, COLOR_IMAGE_FADE_MS + 50);
  }, [clearFadeTimer]);

  const completeFadeOut = useCallback(() => {
    const nextSrc = pendingSrcRef.current;
    if (!nextSrc || phaseRef.current !== "fading-out") return;

    const preload = preloadRef.current ?? Promise.resolve();
    preload
      .catch(() => {})
      .then(() => {
        if (pendingSrcRef.current !== nextSrc || phaseRef.current !== "fading-out") {
          return;
        }
        beginFadeIn(nextSrc);
      });
  }, [beginFadeIn]);

  const startFadeOut = useCallback(
    (nextSrc: string) => {
      clearFadeTimer();
      pendingSrcRef.current = nextSrc;
      preloadRef.current = preloadProductImage(nextSrc).catch(() => {});
      phaseRef.current = "fading-out";
      setPhase("fading-out");
      setVisible(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(false);
        });
      });

      fadeTimerRef.current = setTimeout(() => {
        completeFadeOut();
      }, COLOR_IMAGE_FADE_MS + 50);
    },
    [clearFadeTimer, completeFadeOut],
  );

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const colorChanged = prevColorKeyRef.current !== colorKey;
    const galleryChanged = prevGalleryIndexRef.current !== galleryIndex;
    prevColorKeyRef.current = colorKey;
    prevGalleryIndexRef.current = galleryIndex;

    if (colorChanged && !galleryChanged && src !== displaySrcRef.current) {
      startFadeOut(src);
      return;
    }

    clearFadeTimer();
    pendingSrcRef.current = null;
    preloadRef.current = null;
    setPhase("idle");
    setVisible(true);
    setDisplaySrc(src);
    displaySrcRef.current = src;
  }, [src, colorKey, galleryIndex, startFadeOut, clearFadeTimer]);

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLImageElement>) => {
      if (event.propertyName !== "opacity") return;

      if (phaseRef.current === "fading-out" && !visible) {
        clearFadeTimer();
        completeFadeOut();
        return;
      }

      if (phaseRef.current === "fading-in" && visible) {
        clearFadeTimer();
        phaseRef.current = "idle";
        setPhase("idle");
        pendingSrcRef.current = null;
        preloadRef.current = null;
      }
    },
    [visible, completeFadeOut, clearFadeTimer],
  );

  useEffect(() => () => clearFadeTimer(), [clearFadeTimer]);

  return (
    <div className="absolute inset-0 bg-muted">
      <Image
        src={displaySrc}
        alt={alt}
        fill
        unoptimized
        onTransitionEnd={handleTransitionEnd}
        className={`object-cover absolute inset-0 transition-opacity ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${COLOR_IMAGE_FADE_MS}ms` }}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

export function ProductDetail({
  slug,
  name,
  nameEn,
  capacity,
  images,
  featureImages,
  storyLabel,
  storyHeading,
  story,
  storyImages,
  otherSlug,
  otherName,
  otherNameEn,
  otherTagline,
  otherDescription,
  otherImage,
}: Props) {
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const reorderAppliedRef = useRef(false);

  const sizeOptions =
    LATTE_BOWL_SIZE_OPTIONS[slug as keyof typeof LATTE_BOWL_SIZE_OPTIONS] ??
    LATTE_BOWL_SIZE_OPTIONS.on;
  const defaultSize = (sizeOptions as readonly string[]).includes(capacity)
    ? capacity
    : sizeOptions[sizeOptions.length - 1];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(MIN_ORDER_QUANTITY);
  const [quantityError, setQuantityError] = useState(false);

  // Customization state
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const selectedSizePrice = getLatteBowlSizePrice(
    slug as LatteBowlProductSlug,
    selectedSize,
  );
  const sizeSpec = getLatteBowlSizeSpec(
    slug as LatteBowlProductSlug,
    selectedSize,
  );
  const [selectedColorOption, setSelectedColorOption] = useState<string>(
    LATTE_BOWL_COLOR_OPTIONS[0].nameEn,
  );
  const [hasLogo, setHasLogo] = useState(false);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [logoSourceUrl, setLogoSourceUrl] = useState<string | null>(null);
  const [logoImageSize, setLogoImageSize] = useState<{ width: number; height: number } | null>(null);
  const [isLogoCropOpen, setIsLogoCropOpen] = useState(false);
  const [isApplyingLogoCrop, setIsApplyingLogoCrop] = useState(false);
  const [logoCropZoom, setLogoCropZoom] = useState(1);
  const [logoPanX, setLogoPanX] = useState(0);
  const [logoPanY, setLogoPanY] = useState(0);
  const [cropViewportWidth, setCropViewportWidth] = useState(LOGO_CROP_VIEWPORT_WIDTH);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const logoCropAreaRef = useRef<HTMLDivElement>(null);
  const logoCropDragRef = useRef<{
    startClientX: number;
    startClientY: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);
  const logoPinchRef = useRef<{
    distance: number;
    zoom: number;
    panX: number;
    panY: number;
  } | null>(null);

  const cropViewportHeight = cropViewportWidth / LOGO_CROP_ASPECT_RATIO;
  const logoFitScale = logoImageSize
    ? getLogoFitScale(logoImageSize, cropViewportWidth, cropViewportHeight)
    : 1;
  const logoDisplayScale = logoFitScale * logoCropZoom;

  useEffect(() => {
    if (reorderAppliedRef.current) return;

    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const logo = searchParams.get("logo");

    if (!color && !size && logo !== "1") return;

    reorderAppliedRef.current = true;

    if (
      color &&
      LATTE_BOWL_COLOR_OPTIONS.some((option) => option.nameEn === color)
    ) {
      setSelectedColorOption(color);
    }

    if (size && (sizeOptions as readonly string[]).includes(size)) {
      setSelectedSize(size);
    }

    if (logo === "1") {
      setHasLogo(true);
      const storedLogoPreviewUrl = consumeReorderLogo();
      if (storedLogoPreviewUrl) {
        setLogoPreviewUrl(storedLogoPreviewUrl);
      }
    }
  }, [searchParams, sizeOptions]);

  useLayoutEffect(() => {
    if (!isLogoCropOpen) return;

    const cropArea = logoCropAreaRef.current;
    if (!cropArea) return;

    const updateViewportSize = () => {
      setCropViewportWidth(cropArea.clientWidth);
    };

    updateViewportSize();
    const observer = new ResizeObserver(updateViewportSize);
    observer.observe(cropArea);
    return () => observer.disconnect();
  }, [isLogoCropOpen, logoSourceUrl]);

  // カートに追加（useCallback を外して常に最新 state を参照）
  const handleAddToCart = () => {
    if (quantity < MIN_ORDER_QUANTITY) {
      setQuantityError(true);
      alertMinOrderQuantity();
      return;
    }

    const colorOptionData =
      LATTE_BOWL_COLOR_OPTIONS.find(
        (option) => option.nameEn === selectedColorOption,
      ) ?? LATTE_BOWL_COLOR_OPTIONS[0];
    const logoUnitPrice = hasLogo ? LOGO_SURCHARGE : 0;

    addItem({
      slug: slug as LatteBowlProductSlug,
      image: getLatteBowlColorDetailImagePath(slug, selectedColorOption),
      name,
      capacity: selectedSize,
      baseUnitPrice: selectedSizePrice,
      logoUnitPrice,
      unitPrice: selectedSizePrice + logoUnitPrice,
      quantity,
      colorOption: {
        name: colorOptionData.name,
        nameEn: colorOptionData.nameEn,
        upperHex: colorOptionData.upperHex,
        lowerHex: colorOptionData.lowerHex,
      },
      hasLogo,
    });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const src = await readFileAsDataUrl(file);
      const size = await loadImageSize(src);
      const viewportW = LOGO_CROP_VIEWPORT_WIDTH;
      const viewportH = viewportW / LOGO_CROP_ASPECT_RATIO;
      const fitScale = getLogoFitScale(size, viewportW, viewportH);
      const displayScale = fitScale;

      setLogoSourceUrl(src);
      setLogoImageSize(size);
      setLogoCropZoom(1);
      setLogoPanX((viewportW - size.width * displayScale) / 2);
      setLogoPanY((viewportH - size.height * displayScale) / 2);
      setIsLogoCropOpen(true);
    } catch {
      window.alert(
        "このファイル形式はプレビューできません。EPS・SVG形式推奨です。指定形式でアップロードできない場合は、お問合せフォームよりご相談ください。",
      );
    } finally {
      e.target.value = "";
    }
  };

  const handleApplyLogoCrop = useCallback(async () => {
    if (!logoSourceUrl || !logoImageSize) return;

    setIsApplyingLogoCrop(true);
    try {
      const croppedImage = await captureLogoViewportImage(
        logoSourceUrl,
        logoImageSize,
        cropViewportWidth,
        cropViewportHeight,
        logoPanX,
        logoPanY,
        logoDisplayScale,
      );
      setLogoPreviewUrl(croppedImage);
      setHasLogo(true);
      setIsLogoCropOpen(false);
    } finally {
      setIsApplyingLogoCrop(false);
    }
  }, [
    cropViewportHeight,
    cropViewportWidth,
    logoDisplayScale,
    logoImageSize,
    logoPanX,
    logoPanY,
    logoSourceUrl,
  ]);

  const handleLogoCropPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!logoImageSize || logoPinchRef.current) return;
      if (e.pointerType === "touch" && e.isPrimary === false) return;

      e.currentTarget.setPointerCapture(e.pointerId);
      logoCropDragRef.current = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startPanX: logoPanX,
        startPanY: logoPanY,
      };
    },
    [logoImageSize, logoPanX, logoPanY],
  );

  const handleLogoCropPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!logoCropDragRef.current) return;

      setLogoPanX(
        logoCropDragRef.current.startPanX +
          (e.clientX - logoCropDragRef.current.startClientX),
      );
      setLogoPanY(
        logoCropDragRef.current.startPanY +
          (e.clientY - logoCropDragRef.current.startClientY),
      );
    },
    [],
  );

  const handleLogoCropPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!logoCropDragRef.current) return;
      logoCropDragRef.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [],
  );

  const adjustLogoCropZoom = useCallback(
    (delta: number) => {
      if (!logoImageSize) return;

      const nextZoom = clamp(
        logoCropZoom + delta,
        LOGO_CROP_MIN_ZOOM,
        LOGO_CROP_MAX_ZOOM,
      );
      const nextPan = computeLogoPanForZoomChange(
        logoImageSize,
        logoFitScale,
        logoCropZoom,
        nextZoom,
        logoPanX,
        logoPanY,
      );

      setLogoCropZoom(nextZoom);
      setLogoPanX(nextPan.panX);
      setLogoPanY(nextPan.panY);
    },
    [logoCropZoom, logoFitScale, logoImageSize, logoPanX, logoPanY],
  );

  const getPinchDistance = useCallback((touches: TouchList | React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[1].clientX - touches[0].clientX;
    const dy = touches[1].clientY - touches[0].clientY;
    return Math.hypot(dx, dy);
  }, []);

  const handleLogoCropTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length !== 2 || !logoImageSize) return;
      logoCropDragRef.current = null;
      logoPinchRef.current = {
        distance: getPinchDistance(e.touches),
        zoom: logoCropZoom,
        panX: logoPanX,
        panY: logoPanY,
      };
    },
    [getPinchDistance, logoCropZoom, logoImageSize, logoPanX, logoPanY],
  );

  const handleLogoCropTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length !== 2 || !logoPinchRef.current || !logoImageSize) return;
      const distance = getPinchDistance(e.touches);
      if (distance === 0 || logoPinchRef.current.distance === 0) return;

      const nextZoom = clamp(
        logoPinchRef.current.zoom * (distance / logoPinchRef.current.distance),
        LOGO_CROP_MIN_ZOOM,
        LOGO_CROP_MAX_ZOOM,
      );
      const nextPan = computeLogoPanForZoomChange(
        logoImageSize,
        logoFitScale,
        logoPinchRef.current.zoom,
        nextZoom,
        logoPinchRef.current.panX,
        logoPinchRef.current.panY,
      );

      setLogoCropZoom(nextZoom);
      setLogoPanX(nextPan.panX);
      setLogoPanY(nextPan.panY);
    },
    [getPinchDistance, logoFitScale, logoImageSize],
  );

  const handleLogoCropTouchEnd = useCallback(() => {
    logoPinchRef.current = null;
  }, []);

  useEffect(() => {
    if (!isLogoCropOpen) return;

    const cropArea = logoCropAreaRef.current;
    if (!cropArea) return;

    const preventPinchScroll = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    cropArea.addEventListener("touchmove", preventPinchScroll, { passive: false });
    return () => cropArea.removeEventListener("touchmove", preventPinchScroll);
  }, [isLogoCropOpen]);

  // Build a map of images keyed by afterParagraph index
  const imageMap = new Map(
    storyImages.map((img) => [img.afterParagraph, img]),
  );

  const displayImage = getLatteBowlGalleryImagePath(
    slug,
    selectedColorOption,
    selectedImage,
    images,
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        {/* ===== Product Main ===== */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <FadeIn>
            {/* メイン画像 */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <ProductMainImage
                src={getProductImageSrc(displayImage)}
                alt={`${name} - ${selectedImage + 1}`}
                colorKey={selectedColorOption}
                galleryIndex={selectedImage}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="mt-3 flex gap-2">
              {images.map((_, i) => {
                const thumbnailSrc = getLatteBowlGalleryImagePath(
                  slug,
                  selectedColorOption,
                  i,
                  images,
                );
                return (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square w-16 overflow-hidden border sm:w-20 ${
                    selectedImage === i
                      ? "border-foreground"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    key={thumbnailSrc}
                    src={getProductImageSrc(thumbnailSrc)}
                    alt={`${name} サムネイル ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeUp delay={100}>
            <h1 className="flex items-baseline gap-2 text-xl font-semibold sm:text-2xl">
              {formatProductDisplayName(name)}
            </h1>
            <p className="mt-2 text-base font-semibold sm:text-lg">
              &yen;{selectedSizePrice.toLocaleString()}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                税込 / {selectedSize}
              </span>
            </p>

            {/* Quantity */}
            <div className="mt-6">
              <label className="text-sm font-medium">数量</label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (quantity <= MIN_ORDER_QUANTITY) {
                      setQuantityError(true);
                      alertMinOrderQuantity();
                    } else {
                      setQuantityError(false);
                      setQuantity((q) => q - 1);
                    }
                  }}
                  className="inline-flex size-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
                  aria-label="数量を減らす"
                >
                  <Minus className="size-3.5" />
                </button>
                <input
                  type="number"
                  min={MIN_ORDER_QUANTITY}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1) {
                      setQuantity(val);
                      setQuantityError(val < MIN_ORDER_QUANTITY);
                    }
                  }}
                  onBlur={() => {
                    if (quantity < MIN_ORDER_QUANTITY) {
                      alertMinOrderQuantity();
                      setQuantity(MIN_ORDER_QUANTITY);
                      setQuantityError(false);
                    }
                  }}
                  className="w-12 bg-transparent text-center text-base font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  onClick={() => {
                    setQuantityError(false);
                    setQuantity((q) => q + 1);
                  }}
                  className="inline-flex size-8 items-center justify-center border border-border text-foreground transition-colors hover:bg-muted"
                  aria-label="数量を増やす"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              {quantityError && (
                <p className="mt-2 text-xs text-red-500">
                  {getMinOrderQuantityMessage()}
                </p>
              )}
            </div>

            {/* ===== Design Customization ===== */}
            <div className="mt-6 space-y-6 border-t border-border pt-6">

              {/* カラー */}
              <div>
                <p className="mb-3 text-sm font-medium">カラー</p>
                <ColorOptionSelector
                  selected={selectedColorOption}
                  onSelect={setSelectedColorOption}
                  split={slug === "kaku" ? "horizontal" : "diagonal"}
                />
              </div>

              {/* サイズ */}
              <div>
                <p className="mb-3 text-sm font-medium">サイズ</p>
                <SizeOptionSelector
                  options={sizeOptions}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              {/* ロゴ */}
              <div>
                <p className="mb-3 text-sm font-medium">ロゴ</p>
                <label className="flex cursor-pointer items-center gap-2">
                  <span
                    className={`inline-flex size-4 shrink-0 items-center justify-center border transition-colors ${
                      hasLogo
                        ? "border-foreground bg-foreground"
                        : "border-border bg-background"
                    }`}
                  >
                    {hasLogo && <Check className="size-2.5 text-background" />}
                  </span>
                  <input
                    type="checkbox"
                    checked={hasLogo}
                    onChange={(e) => {
                      setHasLogo(e.target.checked);
                      if (!e.target.checked) {
                        setLogoPreviewUrl(null);
                        setLogoSourceUrl(null);
                        setLogoImageSize(null);
                        setIsLogoCropOpen(false);
                      }
                    }}
                    className="sr-only"
                  />
                  <span className="text-sm text-muted-foreground">
                    ロゴをつける（+￥{LOGO_SURCHARGE.toLocaleString()} / 個）
                  </span>
                </label>

                {hasLogo && (
                  <div className="mt-3">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept={LOGO_ACCEPT_ATTRIBUTE}
                      onChange={handleLogoChange}
                      className="sr-only"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-1.5 border border-dashed border-border bg-muted/30 px-4 py-6 text-center transition-colors hover:bg-muted/60"
                    >
                      {logoPreviewUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={logoPreviewUrl}
                            alt="アップロードされたロゴ"
                            className="max-h-12 max-w-[120px] object-contain"
                          />
                          <span className="mt-1 text-xs text-muted-foreground">
                            クリックして変更
                          </span>
                          <span className="text-[11px] text-muted-foreground/70">
                            アップロード後に正方形トリミングを調整できます
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="size-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            ロゴデータをアップロード
                          </span>
                          <span className="text-xs text-muted-foreground/70">
                            （{LOGO_FORMAT_LABEL}）
                          </span>
                        </>
                      )}
                    </label>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      ロゴデータは複数色あるロゴではなく、1色のロゴのみ転写が可能です。
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              className="mt-6 h-auto w-full rounded-none py-4 text-sm font-medium transition-all duration-300 ease-in-out hover:opacity-50"
              onClick={handleAddToCart}
            >
              カートに追加
            </Button>
          </FadeUp>
        </div>

        {/* ===== Experience Chart ===== */}
        <FadeUp>
          <ExperienceChart positions={slug === "kaku" ? KAKU_POSITIONS : ON_POSITIONS} />
        </FadeUp>

        {/* ===== Story Section ===== */}
        <section className="mx-auto mt-20 max-w-3xl sm:mt-28">
          <FadeUp>
            <h5 className="text-sm font-medium tracking-wider text-muted-foreground sm:text-base">
              {storyLabel}
            </h5>
            <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {storyHeading}
            </h3>
          </FadeUp>

          <div className="mt-10 sm:mt-14">
            {story.map((paragraph, i) => {
              const imgAfter = imageMap.get(i);
              return (
                <div key={i}>
                  <FadeUp delay={i * 60}>
                    <p className="mb-8 whitespace-pre-line text-sm leading-[2] text-foreground/80 sm:mb-10 sm:text-base sm:leading-[2.2]">
                      {paragraph}
                    </p>
                  </FadeUp>
                  {imgAfter && (
                    <FadeUp>
                      <StoryParallaxImage
                        src={imgAfter.src}
                        alt={imgAfter.alt}
                      />
                    </FadeUp>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== 特徴訴求エリア ===== */}
        <FeatureGalleryScroll images={featureImages} />

        {/* ===== AI Visualizer ===== */}
        {AI_VISUALIZER_ENABLED && (
          <AiVisualizer productNameEn={nameEn} />
        )}

        {/* ===== Product Information Accordion ===== */}
        <section className="mx-auto mt-20 max-w-3xl sm:mt-28">
          <FadeUp>
            <h2 className="text-lg font-semibold sm:text-xl">商品情報</h2>
          </FadeUp>

          <FadeUp>
            <div className="mt-4 divide-y divide-border">
              <AccordionItem title="サイズ、素材、生産地、製造方法">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {sizeSpec && <li>商品名：{sizeSpec.productName}</li>}
                  <li>
                    サイズ：
                    {sizeSpec?.dimensions ?? "直径約10cm × 高さ約8cm"}
                  </li>
                  <li>容量：{sizeSpec?.capacity ?? selectedSize}</li>
                  <li>素材：磁器</li>
                  <li>
                    生産地：日本（
                    {sizeSpec?.productionArea ?? PRODUCTION_AREA}）
                  </li>
                  <li>製造方法：鋳込み成形</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="食洗機・電子レンジの使用について">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {DISHWASHER_MICROWAVE_INFO.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="お届け日・お支払い方法">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{DELIVERY_LEAD_TIME_TEXT.basic}</p>
                  <p>{DELIVERY_LEAD_TIME_TEXT.withLogo}</p>
                  <p>{DELIVERY_LEAD_TIME_TEXT.note}</p>
                  <p>{PAYMENT_METHOD_TEXT}</p>
                </div>
              </AccordionItem>

              <AccordionItem title="取扱い上の注意">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {HANDLING_CAUTION_NOTES.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </AccordionItem>
            </div>
          </FadeUp>
        </section>
      </div>

      <div className="container-cafora">
        {/* Other Product */}
        <section className="mt-20 sm:mt-28">
          <FadeUp>
            <h2 className="text-center text-lg font-semibold sm:text-xl">
              もうひとつのラテボウル
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="mx-auto mt-8 max-w-md">
              <Link
                href={`/products/${otherSlug}`}
                className="group relative flex flex-col overflow-hidden bg-[#FBFBFB]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2]">
                  <Image
                    src={otherImage}
                    alt={formatProductDisplayName(`${otherName}（${otherNameEn}）`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-2xl font-bold tracking-wide sm:text-3xl">
                        {formatProductDisplayName(`${otherName}（${otherNameEn}）`)}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground/80 sm:text-base">
                      {otherTagline}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {otherDescription}
                    </p>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <p className="text-lg font-semibold">
                      &yen;{formatLatteBowlPriceRange(otherSlug as LatteBowlProductSlug)}
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
            </div>
          </FadeUp>
        </section>
      </div>

      <Dialog
        open={isLogoCropOpen}
        onOpenChange={(open) => {
          setIsLogoCropOpen(open);
          if (!open) {
            logoCropDragRef.current = null;
            logoPinchRef.current = null;
          }
        }}
      >
        <DialogContent className="max-w-[calc(100%-1.5rem)] gap-0 p-0 sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>ロゴをトリミング</DialogTitle>
            <DialogDescription>
              ドラッグで位置を、ピンチまたはボタンでサイズを調整してください。
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-5 px-5 py-6 sm:px-6">
            <div
              ref={logoCropAreaRef}
              className="relative aspect-video w-[min(90vw,320px)] overflow-hidden bg-white"
              onPointerDown={handleLogoCropPointerDown}
              onPointerMove={handleLogoCropPointerMove}
              onPointerUp={handleLogoCropPointerUp}
              onPointerCancel={handleLogoCropPointerUp}
              onTouchStart={handleLogoCropTouchStart}
              onTouchMove={handleLogoCropTouchMove}
              onTouchEnd={handleLogoCropTouchEnd}
              onTouchCancel={handleLogoCropTouchEnd}
              style={{ touchAction: "none" }}
            >
              {logoSourceUrl && logoImageSize && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSourceUrl}
                    alt="ロゴトリミングプレビュー"
                    draggable={false}
                    className="pointer-events-none absolute max-w-none select-none"
                    style={{
                      width: `${logoImageSize.width * logoDisplayScale}px`,
                      height: `${logoImageSize.height * logoDisplayScale}px`,
                      left: `${logoPanX}px`,
                      top: `${logoPanY}px`,
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 border border-dashed border-foreground/70" />
                </>
              )}
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="縮小"
                onClick={() => adjustLogoCropZoom(-LOGO_CROP_ZOOM_STEP)}
                disabled={logoCropZoom <= LOGO_CROP_MIN_ZOOM}
              >
                <Minus className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="拡大"
                onClick={() => adjustLogoCropZoom(LOGO_CROP_ZOOM_STEP)}
                disabled={logoCropZoom >= LOGO_CROP_MAX_ZOOM}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              {LOGO_FORMAT_LABEL}。指定形式でアップロードできない場合は、お問合せフォームよりご相談ください。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t px-5 py-4 sm:px-6">
            <Button
              type="button"
              variant="outline"
              className="h-auto rounded-none border-foreground py-3 text-sm font-medium transition-colors hover:bg-muted"
              onClick={() => {
                setIsLogoCropOpen(false);
                logoCropDragRef.current = null;
                logoPinchRef.current = null;
              }}
            >
              キャンセル
            </Button>
            <Button
              type="button"
              className="h-auto rounded-none bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-70"
              onClick={handleApplyLogoCrop}
              disabled={isApplyingLogoCrop}
            >
              {isApplyingLogoCrop ? "適用中..." : "この内容で適用"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FeatureGalleryScroll({
  images,
}: {
  images: {
    src: string;
    alt: string;
    size: "sm" | "lg";
    title: string;
    description: string;
  }[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  // マウント時にスクロール位置を必ず左端にリセット（Chromeのscroll restoration対策）
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, []);

  const CARD_W = 320;
  const CARD_GAP = 24;

  const scrollBy = useCallback((dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? CARD_W + CARD_GAP : -(CARD_W + CARD_GAP), behavior: "smooth" });
  }, []);

  // マウスドラッグスクロール
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - el.offsetLeft;
    dragStartScrollLeft.current = el.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    el.scrollLeft = dragStartScrollLeft.current - walk;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <section className="mt-20 sm:mt-28">
      {/* ヘッダー行：見出し＋矢印 */}
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">
          バリスタと共につくった{images.length}つの特徴
        </h2>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => scrollBy("prev")}
            aria-label="前へ"
            className="inline-flex size-9 items-center justify-center border border-border transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scrollBy("next")}
            aria-label="次へ"
            className="inline-flex size-9 items-center justify-center border border-border transition-colors hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* カードリスト */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`mt-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        style={{ overflowAnchor: "none" }}
      >
        <div className="flex gap-6 w-max">
          {images.map((img, i) => (
            <div key={i} className="w-64 shrink-0 sm:w-72">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={getProductImageSrc(img.src)}
                  alt={img.alt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="320px"
                  draggable={false}
                />
              </div>
              <div className="pt-5">
                <p className="text-[10px] tracking-[0.4em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 text-sm font-semibold leading-snug sm:text-base">
                  {img.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryParallaxImage({ src, alt }: { src: string; alt: string }) {
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
      className="relative my-10 aspect-[3/1] w-full overflow-hidden sm:my-14"
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-cover transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.15)` }}
        sizes="(max-width: 768px) 100vw, 672px"
      />
    </div>
  );
}
