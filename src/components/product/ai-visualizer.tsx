"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import { FadeUp } from "@/components/ui/scroll-animate";

type ProductType = "on" | "kaku";

// デフォルトのカフェ生成イメージ（API繋ぎ込み時に差し替え）
const DEFAULT_IMAGE: Record<ProductType, string> = {
  on: "/images/product/on-default.png",
  kaku: "/images/product/kaku-default.png",
};

type Props = {
  productNameEn: string;
};

export const AI_VISUALIZER_ENABLED = false;

export function AiVisualizer({ productNameEn }: Props) {
  const defaultType: ProductType =
    productNameEn.toLowerCase().includes("kaku") ? "kaku" : "on";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ProductType>(defaultType);
  const [generatedImage, setGeneratedImage] = useState<string>(
    DEFAULT_IMAGE[defaultType],
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    // TODO: AI生成APIとの繋ぎ込み
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImage(DEFAULT_IMAGE[selectedType]);
    }, 2500);
  }, [selectedType]);

  const handleTypeChange = useCallback((type: ProductType) => {
    setSelectedType(type);
    setGeneratedImage(DEFAULT_IMAGE[type]);
  }, []);

  return (
    <section className="mx-auto mt-20 max-w-3xl sm:mt-28">
      <FadeUp>
        <h2 className="text-lg font-semibold sm:text-xl">
          あなたのカフェでCAFORAを試す
        </h2>
        <p className="mt-3 text-sm leading-[2em] text-muted-foreground">
          店内写真をアップロードすると、CAFORAの器が使われているイメージを作成します。
        </p>
      </FadeUp>

      <FadeUp delay={100}>
        {/* items-stretch でグリッド行の高さを左右が共有 */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-4">

          {/* ===== 左: 1カラム — アップロード + 器選択 + 生成ボタン（下揃え） ===== */}
          <div className="flex h-full flex-col gap-3 sm:col-span-1">

            {/* アップロードエリア — flex-1 で残り縦幅を埋める */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-border bg-stone-50/60 py-8 transition-colors hover:border-foreground/30 hover:bg-stone-100/60 sm:py-0"
            >
              {uploadedImage ? (
                <>
                  <Image
                    src={uploadedImage}
                    alt="アップロードされたカフェ写真"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <span className="text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      写真を変更
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex size-10 items-center justify-center rounded-full bg-stone-200/80 transition-colors group-hover:bg-stone-300/60">
                    <Upload className="size-4 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground">
                      店内写真を
                      <br />
                      アップロード
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      JPG, PNG
                    </p>
                  </div>
                </>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* 器タイプ選択（セグメントコントロール） */}
            <div className="flex overflow-hidden border border-border">
              <button
                type="button"
                onClick={() => handleTypeChange("on")}
                className="flex-1 py-2.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor:
                    selectedType === "on" ? "#78716c" : "transparent",
                  color: selectedType === "on" ? "#fff" : "#a8a29e",
                }}
              >
                温 -ON-
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("kaku")}
                className="flex-1 border-l border-border py-2.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor:
                    selectedType === "kaku" ? "#78716c" : "transparent",
                  color: selectedType === "kaku" ? "#fff" : "#a8a29e",
                }}
              >
                拡 -KAKU-
              </button>
            </div>

            {/* 生成ボタン — 右カラム下部に揃う */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex w-full shrink-0 items-center justify-center gap-2 bg-foreground py-3 text-xs font-medium text-background transition-opacity hover:opacity-70 disabled:opacity-40"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  生成中...
                </>
              ) : (
                "イメージを生成する"
              )}
            </button>
          </div>

          {/* ===== 右: 3カラム分 — 生成されたカフェ画像（1枚、4:3） ===== */}
          <div className="sm:col-span-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              {isGenerating ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <Loader2 className="size-6 animate-spin text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground/50">
                    画像を生成しています...
                  </p>
                </div>
              ) : (
                <Image
                  src={generatedImage}
                  alt={`${selectedType === "on" ? "温 -ON-" : "拡 -KAKU-"}が使われているカフェのイメージ`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              )}
            </div>
          </div>

        </div>
      </FadeUp>
    </section>
  );
}
