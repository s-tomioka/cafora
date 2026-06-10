"use client";

import { useState } from "react";

// ─── アイコン定数 ─────────────────────────────────────────────────
const ICON_COLOR = "#333333";

// ─── カスタム SVG アイコン（全て同一 size-6 想定） ────────────────
function LipsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={ICON_COLOR}
      className={className}
    >
      <path d="m467.08-280 26.61.77q108.77 0 194.19-55.46Q773.31-390.15 821.15-482q-50.77 17.23-144.07 40.38-93.31 23.16-198.62 23.16-101.46 0-193.11-22.12-91.66-22.11-143.97-39.11 51.7 91.07 132.39 145.38Q354.46-280 467.08-280Zm0 40q-138.54 0-238.93-75.92Q127.77-391.85 80-517.69L268.92-692q13.93-12.38 30.43-19.42 16.5-7.04 35.11-7.04 13.39 0 26.27 3.81 12.89 3.8 24.81 10.73l95.23 58.54L576-703.92q11.92-6.93 24.42-10.73 12.5-3.81 25.89-3.81 18.61 0 35.5 7.04 16.88 7.04 30.81 19.42L880-518.46q-40.85 125.08-147 201.77Q626.85-240 493.69-240h-26.61Zm11.61-218.46q100.23 0 192.58-22.62 92.35-22.61 148.35-39.61L665.08-662.92q-8.31-7.54-18.89-11.7-10.57-4.15-20.88-4.15-6.77 0-13.04 1.5t-12.04 5.5l-119.46 73.15-116.15-70.84q-7.31-4.77-15.5-7.04-8.2-2.27-15.74-2.27-9.53 0-18.57 3.39-9.04 3.38-16.58 10.15L140.08-519.92q54.23 17 146.3 39.23 92.08 22.23 192.31 22.23Z" />
    </svg>
  );
}

function AromaIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="22 30 84 86"
      fill="none"
      strokeLinecap="round"
      strokeMiterlimit="10"
      className={className}
    >
      <path stroke={ICON_COLOR} strokeWidth="3" d="M88,68c0,0-7,5-24,5s-29-4-29-7s12-10,29-10s29,6,29,9s-1,19-8,26c-6,6-13,10-21,10s-15-3-21-10s-8-19-8-25" />
      <path stroke={ICON_COLOR} strokeWidth="3" d="M45.358,93.495C37.899,95.604,35,98.647,35,101c0,4,12,10,29,10s27.125-5.375,29-10" />
      <path stroke={ICON_COLOR} strokeWidth="3" d="M92.548,71c0,0,9.452,0,9.452,6s-3.534,9-13.534,9" />
      <path stroke={ICON_COLOR} strokeWidth="3" d="M59.157,62.169c0,0,3.145-2.013,1.752-5.165c-1.289-2.917-2.34-2.588-3.583-5.333c-1.308-2.888,1.75-5.417,1.75-5.417" />
      <path stroke={ICON_COLOR} strokeWidth="3" d="M67.114,62.296c0,0,5.878-4.921,3.961-9.421c-1.894-4.447-4.243-4.849-5.458-8.704c-1.303-4.131,3.458-8.583,3.458-8.583" />
    </svg>
  );
}

function ThermometerIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={ICON_COLOR}
      className={className}
    >
      <path d="M480-160q-66.85 0-113.42-46.58Q320-253.15 320-320q0-43.38 21.77-79.5T400-458.46V-720q0-33.85 23.08-56.92Q446.15-800 480-800t56.92 23.08Q560-753.85 560-720v261.54q36.46 22.84 57.85 58.96Q639.23-363.38 640-320q-.77 66.85-47.35 113.42Q546.08-160 480-160Zm0-40q50 0 85-35t35-85q0-29-12.5-54T552-416l-32-24v-280q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720v280l-32 24q-23 17-35.5 42T360-320q0 50 35 85t85 35Zm0-120Z" />
    </svg>
  );
}

function CycloneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={ICON_COLOR}
      className={className}
    >
      <path d="M480-360q-49.85 0-84.92-35.08Q360-430.15 360-480t35.08-84.92Q430.15-600 480-600t84.92 35.08Q600-529.85 600-480t-35.08 84.92Q529.85-360 480-360Zm0-40q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm201.77 284.62q14.92-54.47 22.77-108.47 7.84-54 10.54-106.92-35.31 58.16-98.46 94.46Q553.46-200 480-200q-154.46 0-230.04-9.27-75.58-9.27-134.58-26.27v-42.69q56 17.23 110 24.69 54 7.46 106.93 8.62-55.08-29.93-93.69-94.23Q200-403.46 200-480q0-103.92 10.04-198.62 10.04-94.69 24.73-166h42.69q-14.15 63.7-20.96 114.24-6.81 50.53-11.58 102.69 32.23-57.39 95.39-94.85Q403.46-760 480-760q129.31 0 213.23 9.27 83.92 9.27 151.39 25.5v42.69q-56-14.92-112.31-22.88-56.31-7.96-103.85-10.43 61.23 37.62 96.39 101.16Q760-551.15 760-480q0 140.85-10.42 223.23-10.43 82.39-25.12 141.39h-42.69ZM650-310q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70Z" />
    </svg>
  );
}

function BlurCircularIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={ICON_COLOR}
      className={className}
    >
      <path d="M424.27-535.73q9.58-9.58 9.58-24.27t-9.58-24.27q-9.58-9.58-24.27-9.58t-24.27 9.58q-9.58 9.58-9.58 24.27t9.58 24.27q9.58 9.58 24.27 9.58t24.27-9.58Zm0 160q9.58-9.58 9.58-24.27t-9.58-24.27q-9.58-9.58-24.27-9.58t-24.27 9.58q-9.58 9.58-9.58 24.27t9.58 24.27q9.58 9.58 24.27 9.58t24.27-9.58ZM294-546q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6Zm106 286q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6ZM294-386q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6Zm120-280q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6Zm170.27 130.27q9.58-9.58 9.58-24.27t-9.58-24.27q-9.58-9.58-24.27-9.58t-24.27 9.58q-9.58 9.58-9.58 24.27t9.58 24.27q9.58 9.58 24.27 9.58t24.27-9.58ZM574-666q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6Zm120 280q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6Zm0-160q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6ZM339.72-148.34q-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120q-74.67 0-140.41-28.34ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm94-106q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6Zm10.27-109.73q9.58-9.58 9.58-24.27t-9.58-24.27q-9.58-9.58-24.27-9.58t-24.27 9.58q-9.58 9.58-9.58 24.27t9.58 24.27q9.58 9.58 24.27 9.58t24.27-9.58ZM480-480Z" />
    </svg>
  );
}

function MilkUnityIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="22 38 84 78"
      fill="none"
      strokeLinecap="round"
      strokeMiterlimit="10"
      className={className}
    >
      <path stroke={ICON_COLOR} strokeWidth="3" d="M88,68c0,0-7,5-24,5s-29-4-29-7c0-5.667,6.776-8,8.692-7.5c0.833-2.917,4.535-5.732,8.618-5.566c1.356-3.917,4.189-2.601,5.898-5.393c1.156-1.888,0.291-4.633-1.042-6.724c6.833-2.364,16.715,2.766,17.536,8.016c5.631,0.941,9.046,5.332,9.964,8.917C88.972,59.888,93,62.167,93,65c0,3-1,19-8,26c-6,6-13,10-21,10s-15-3-21-10s-8-19-8-25" />
      <path stroke={ICON_COLOR} strokeWidth="3" d="M45.358,93.495C37.899,95.604,35,98.647,35,101c0,4,12,10,29,10s29-6,29-10" />
      <path stroke={ICON_COLOR} strokeWidth="3" d="M88.468,86c10,0,13.532-3,13.532-9s-9.452-6-9.452-6" />
    </svg>
  );
}

// ─── 型定義 ──────────────────────────────────────────────────────
type IconComponent = ({ className }: { className?: string }) => React.ReactElement;

type ExperienceItem = {
  id: string;
  label: string;
  icon: IconComponent;
  labelA: string;
  labelB: string;
  position: number; // 1〜5（1=Aに近い, 5=Bに近い）
  description: string;
};

// ─── 商品別ポジション定義 ─────────────────────────────────────────
export type ExperiencePositions = {
  mouthfeel: number;
  aroma: number;
  temperature: number;
  flow: number;
  unity: number;
  latte_art: number;
};

export const ON_POSITIONS: ExperiencePositions = {
  mouthfeel: 2,
  aroma: 2,
  temperature: 5,
  flow: 2,
  unity: 5,
  latte_art: 2,
};

export const KAKU_POSITIONS: ExperiencePositions = {
  mouthfeel: 5,
  aroma: 3,
  temperature: 3,
  flow: 5,
  unity: 5,
  latte_art: 5,
};

type Props = {
  positions?: ExperiencePositions;
};

// ─── ベースデータ（ポジションは商品別に上書き） ─────────────────────
export const BASE_ITEMS = [
  {
    id: "mouthfeel" as const,
    label: "口当たり",
    icon: LipsIcon,
    labelA: "シャープ",
    labelB: "まろやか",
    description: "縁の厚みや形状によって、口に触れたときの印象が変わります。",
  },
  {
    id: "aroma" as const,
    label: "香り",
    icon: AromaIcon,
    labelA: "集中",
    labelB: "広がる",
    description: "カップの口径や形状によって、香りの広がり方が変わります。",
  },
  {
    id: "temperature" as const,
    label: "温度",
    icon: ThermometerIcon,
    labelA: "すぐ飲み頃",
    labelB: "温かさが続く",
    description: "器の厚みや構造により、温度の持続時間が変わります。",
  },
  {
    id: "flow" as const,
    label: "流れ",
    icon: CycloneIcon,
    labelA: "ダイレクト",
    labelB: "なめらか",
    description:
      "内側の曲面設計によって、液体の流れ方や口への入り方が変わります。",
  },
  {
    id: "unity" as const,
    label: "ミルクの一体感",
    icon: MilkUnityIcon,
    labelA: "分離感あり",
    labelB: "一体感がある",
    description: "形状によってミルクとエスプレッソの混ざり方が変わります。",
  },
  {
    id: "latte_art" as const,
    label: "ラテアート領域",
    icon: BlurCircularIcon,
    labelA: "コンパクト",
    labelB: "広い",
    description: "口径の広さによって、ラテアートのキャンバス面積と表現の自由度が変わります。",
  },
];

const TOTAL_STEPS = 5;

// ─── ドット＋ライン スライダー ────────────────────────────────────
function DotSlider({ position }: { position: number }) {
  return (
    <div className="flex w-full items-center">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const step = i + 1;
        const isActive = step === position;
        const isLast = step === TOTAL_STEPS;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <span
              className={`relative z-10 block shrink-0 rounded-full transition-all duration-300 ${
                isActive ? "size-2.5 bg-foreground" : "size-1.5 bg-border"
              }`}
            />
            {!isLast && <span className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

// ─── カード ──────────────────────────────────────────────────────
function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div
      className="flex cursor-default flex-col gap-3 border border-border/50 p-4 transition-colors duration-200 hover:border-border hover:bg-muted/30"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onTouchStart={() => setOpen((v) => !v)}
    >
      {/* 項目名 + アイコン */}
      <div className="flex flex-col items-center gap-1.5">
        <Icon className="size-6" />
        <p className="text-center text-sm font-medium tracking-wide">
          {item.label}
        </p>
      </div>

      {/* ドット＋ラインスライダー */}
      <DotSlider position={item.position} />

      {/* ラベル A / B */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{item.labelA}</span>
        <span className="text-[10px] text-muted-foreground">{item.labelB}</span>
      </div>

      {/* 説明文（ホバー / タップ時） */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="border-t border-border/50 pt-3 text-center text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ─── メインコンポーネント ────────────────────────────────────────
export function ExperienceChart({ positions = ON_POSITIONS }: Props) {
  const items: ExperienceItem[] = BASE_ITEMS.map((base) => ({
    ...base,
    position: positions[base.id],
  }));

  return (
    <section className="mx-auto mt-20 max-w-3xl sm:mt-28">
      <h2 className="text-lg font-semibold sm:text-xl">形状特性</h2>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
