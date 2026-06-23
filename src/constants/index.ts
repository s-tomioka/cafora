// ===========================================
// CAFORA 定数
// ===========================================

export const SITE_NAME = "CAFORA";
export const SITE_DESCRIPTION =
  "カフェのための、あなただけの陶器。ロゴ転写・6色カラー展開で、お店独自のブランド食器をお作りします。";

/** プレオープン期間中は true。正式販売開始時に false に切り替える。 */
export const IS_PRE_OPEN = true;
export const PRE_OPEN_SALE_LABEL = "2026年7月 販売開始予定";

/**
 * ロゴのファイルアップロード機能の有効/無効。
 * 初回ローンチ時は false（商品詳細では「ロゴをつける（+¥500 / 個）」を
 * 静的テキストのみ表示）。アップロード機能の準備が整ったら true に切り替える。
 */
export const IS_LOGO_UPLOAD_ENABLED = false;

export const MIN_ORDER_QUANTITY = 30;
export const TAX_RATE = 0.1; // 消費税 10%
export const LOGO_SURCHARGE = 500;

// 送料（佐川急便・30個＝最低納品数ご注文時の目安）
export const SHIPPING_FEES = [
  { area: "東海（愛知・岐阜・静岡・三重）", fee: "¥4,880" },
  { area: "関東・信越・北陸・関西", fee: "¥5,140" },
  { area: "東北・中国・四国・九州", fee: "¥6,080" },
  { area: "北海道", fee: "¥6,180" },
  { area: "沖縄", fee: "¥7,500" },
] as const;

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
  { name: "ホワイト", nameEn: "White", hexCode: "#F5F5F0" },
  { name: "チャコール", nameEn: "Charcoal", hexCode: "#3A3A3A" },
  { name: "テラコッタ", nameEn: "Terracotta", hexCode: "#C75B39" },
  { name: "インディゴ", nameEn: "Indigo", hexCode: "#2C4A7C" },
  { name: "セージ", nameEn: "Sage", hexCode: "#7D8B6E" },
  { name: "サンド", nameEn: "Sand", hexCode: "#C4AD8F" },
  { name: "モカ", nameEn: "Mocha", hexCode: "#6B4E3D" },
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

export type LatteBowlProductSlug = keyof typeof LATTE_BOWL_SIZE_OPTIONS;

export function getLatteBowlColorDetailImagePath(
  slug: string,
  colorNameEn: string,
  shot: 1 | 2 = 1,
) {
  return `/images/product/${slug}-detail-${colorNameEn.toLowerCase()}-${shot}.webp`;
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
export const LOGO_ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
] as const;

// リードタイム
export const ESTIMATED_LEAD_TIME_WEEKS = 4;
