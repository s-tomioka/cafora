// ===========================================
// CAFORA 定数
// ===========================================

export const SITE_NAME = "CAFORA";
export const SITE_DESCRIPTION =
  "カフェのための、あなただけの陶器。ロゴ転写・6色カラー展開で、お店独自のブランド食器をお作りします。";

export const MIN_ORDER_QUANTITY = 30;

export function getMinOrderQuantityMessage(): string {
  return `最低注文数量は${MIN_ORDER_QUANTITY}個からとなります。`;
}

export const FREE_SHIPPING_QUANTITY = 60;

export const SHIPPING_FEES = [
  { area: "東海（愛知・岐阜・静岡・三重）", fee: "¥4,880" },
  { area: "関東・信越・北陸・関西", fee: "¥5,140" },
  { area: "東北・中国・四国・九州", fee: "¥6,080" },
  { area: "北海道", fee: "¥6,180" },
  { area: "沖縄", fee: "¥7,500" },
] as const;

export const DELIVERY_LEAD_TIME_TEXT = {
  basic:
    "基本仕様の商品は、ご注文確定後おおよそ4週間を目安としています。",
  withLogo:
    "ロゴ転写のカスタマイズを含む場合は、仕様確定後おおよそ5~6週間を目安としています。",
  note: "数量や仕様によってはさらにお時間をいただく場合があります。開業や導入時期が決まっている場合は、お早めにご相談ください。",
} as const;

export const PAYMENT_METHOD_TEXT =
  "原則としてクレジットカード決済に対応しています。銀行振込をご希望の場合は、事前にお問い合わせフォームよりご相談ください。";

export const DISHWASHER_MICROWAVE_INFO = [
  "食洗機・電子レンジともにご使用いただけます。業務用食洗機にも対応しています。",
  "ロゴ転写ありの商品もご使用いただけますが、長くきれいにお使いいただくため、転写部分を強くこすらないようご注意ください。",
] as const;

export const HANDLING_CAUTION_NOTES = [
  "急激な温度変化は避けてください。",
  "ヒビや欠けが生じた場合はご使用を中止してください。",
  "磁器製品の特性上、色味や質感にわずかな個体差が生じる場合があります。",
] as const;

export const PRODUCTION_AREA = "瀬戸・美濃焼";

export const LOGO_FORMAT_LABEL = "EPS・SVG形式推奨";

export const LOGO_ACCEPTED_TYPES = [
  "image/svg+xml",
  "application/postscript",
  "application/illustrator",
  "application/eps",
  "application/x-eps",
] as const;

export const LOGO_ACCEPT_ATTRIBUTE =
  ".eps,.svg,image/svg+xml,application/postscript,application/illustrator,application/eps,application/x-eps";

export function alertMinOrderQuantity(): void {
  window.alert(getMinOrderQuantityMessage());
}
export const TAX_RATE = 0.1; // 消費税 10%
export const LOGO_SURCHARGE = 1000;

export const LATTE_BOWL_PRODUCTS = {
  on: {
    slug: "on",
    name: "温（ON）",
    nameEn: "ON",
  },
  kaku: {
    slug: "kaku",
    name: "拡（KAKU）",
    nameEn: "KAKU",
  },
} as const;

/** 商品詳細と同じ表示名（例: 温（ON）→ 温 -ON-） */
export function formatProductDisplayName(name: string): string {
  const match = name.match(/^(.+?)（(.+?)）$/);
  return match ? `${match[1]} -${match[2]}-` : name;
}

// カラーパレット（初期データ）
export const DEFAULT_COLORS = [
  { name: "グレー", nameEn: "Gray", hexCode: "#A89A8F" },
  { name: "チャコール", nameEn: "Charcoal", hexCode: "#3A3A3A" },
  { name: "モカ", nameEn: "Mocha", hexCode: "#6B4E3D" },
  { name: "モスグリーン", nameEn: "MossGreen", hexCode: "#8C8660" },
  { name: "ブルーグレー", nameEn: "BlueGray", hexCode: "#6B7683" },
  { name: "テラコッタ", nameEn: "Terracotta", hexCode: "#C75B39" },
] as const;

export const LATTE_BOWL_COLOR_OPTIONS = [
  {
    name: "グレー",
    nameEn: "Gray",
    upperHex: "#F4EFE8",
    lowerHex: "#A89A8F",
  },
  {
    name: "チャコール",
    nameEn: "Charcoal",
    upperHex: "#F4EFE8",
    lowerHex: "#3A3A3A",
  },
  {
    name: "モカ",
    nameEn: "Mocha",
    upperHex: "#F4EFE8",
    lowerHex: "#6B4E3D",
  },
  {
    name: "モスグリーン",
    nameEn: "MossGreen",
    upperHex: "#F4EFE8",
    lowerHex: "#8C8660",
  },
  {
    name: "ブルーグレー",
    nameEn: "BlueGray",
    upperHex: "#F4EFE8",
    lowerHex: "#6B7683",
  },
  {
    name: "テラコッタ",
    nameEn: "Terracotta",
    upperHex: "#F4EFE8",
    lowerHex: "#C75B39",
  },
] as const;

export type LatteBowlColorOption = (typeof LATTE_BOWL_COLOR_OPTIONS)[number];

export const LATTE_BOWL_SIZE_OPTIONS = {
  on: ["180ml", "240ml"],
  kaku: ["240ml", "280ml"],
} as const;

export const LATTE_BOWL_SIZE_PRICES = {
  on: {
    "180ml": 1980,
    "240ml": 2200,
  },
  kaku: {
    "240ml": 2420,
    "280ml": 2620,
  },
} as const;

export type LatteBowlProductSlug = keyof typeof LATTE_BOWL_SIZE_OPTIONS;

export type LatteBowlSizeSpec = {
  productName: string;
  dimensions: string;
  capacity: string;
  productionArea: string;
};

export const LATTE_BOWL_SIZE_SPECS: Partial<
  Record<LatteBowlProductSlug, Partial<Record<string, LatteBowlSizeSpec>>>
> = {
  on: {
    "180ml": {
      productName: "ON 180ml",
      dimensions: "直径約8cm × 高さ約6.5cm",
      capacity: "180ml",
      productionArea: "瀬戸/美濃焼",
    },
    "240ml": {
      productName: "ON 240ml",
      dimensions: "直径約9cm × 高さ約7.5cm",
      capacity: "240ml",
      productionArea: "瀬戸/美濃焼",
    },
  },
  kaku: {
    "240ml": {
      productName: "KAKU 240ml",
      dimensions: "直径約10cm × 高さ約5cm",
      capacity: "240ml",
      productionArea: "瀬戸/美濃焼",
    },
    "280ml": {
      productName: "KAKU 280ml",
      dimensions: "直径約10.5cm × 高さ約5.5cm",
      capacity: "280ml",
      productionArea: "瀬戸/美濃焼",
    },
  },
};

export function getLatteBowlSizeSpec(
  slug: LatteBowlProductSlug,
  size: string,
): LatteBowlSizeSpec | null {
  return LATTE_BOWL_SIZE_SPECS[slug]?.[size] ?? null;
}

export function getLatteBowlSizePrice(
  slug: LatteBowlProductSlug,
  size: string,
): number {
  const prices = LATTE_BOWL_SIZE_PRICES[slug] as Record<string, number>;
  return prices[size] ?? Object.values(prices)[0];
}

export function formatLatteBowlPriceRange(slug: LatteBowlProductSlug): string {
  const prices = Object.values(LATTE_BOWL_SIZE_PRICES[slug]);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return min.toLocaleString();
  return `${min.toLocaleString()}〜`;
}

export function getLatteBowlColorDetailImagePath(
  slug: string,
  colorNameEn: string,
  shot: 1 | 2 = 1,
) {
  return `/images/product/${slug}-detail-${colorNameEn.toLowerCase()}-${shot}.png`;
}

export function getLatteBowlGalleryImagePath(
  slug: string,
  colorNameEn: string,
  index: number,
  staticImages: readonly string[],
) {
  if (index === 0) return getLatteBowlColorDetailImagePath(slug, colorNameEn, 1);
  if (index === 1) return getLatteBowlColorDetailImagePath(slug, colorNameEn, 2);
  return staticImages[index];
}

/** 同名ファイル差し替え時のブラウザキャッシュ回避用。画像更新時に値を上げる。 */
export const PRODUCT_IMAGE_CACHE_KEY = "20250602a";

export function getProductImageSrc(path: string) {
  return `${path}?v=${PRODUCT_IMAGE_CACHE_KEY}`;
}

// ラテボウルのカラーゾーン
export const LATTE_BOWL_ZONES = [
  { name: "全体", nameEn: "body" },
  { name: "縁", nameEn: "rim" },
  { name: "取っ手", nameEn: "handle" },
] as const;

// 画像アップロード制限
export const LOGO_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/** @deprecated DELIVERY_LEAD_TIME_TEXT を使用してください */
export const ESTIMATED_LEAD_TIME_WEEKS = 2;
