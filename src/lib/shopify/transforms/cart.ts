import type { LatteBowlProductSlug } from "@/constants";
import { LOGO_SURCHARGE } from "@/constants";
import { shopifyAmountToNumber } from "../utils";
import type {
  CartItem,
  ColorOption,
  ShopifyCartLine,
  ShopifyCartLineAttribute,
  ShopifyCartLineInput,
} from "../types";

// Attribute keys stored in Shopify cart line attributes
const ATTR_COLOR_NAME = "color_name";
const ATTR_COLOR_NAME_EN = "color_name_en";
const ATTR_COLOR_UPPER_HEX = "color_upper_hex";
const ATTR_COLOR_LOWER_HEX = "color_lower_hex";
const ATTR_LOGO_URL = "logo_url";
const ATTR_HAS_LOGO = "has_logo";
const ATTR_SLUG = "slug";
const ATTR_BASE_PRICE = "base_unit_price";
const ATTR_IMAGE = "image";

type BuildCartLineInputPayload = {
  variantId: string;
  quantity: number;
  slug: LatteBowlProductSlug;
  image?: string;
  baseUnitPrice: number;
  colorOption: ColorOption | null;
  hasLogo: boolean;
  logoUrl?: string;
};

export function buildCartLineInput(
  payload: BuildCartLineInputPayload,
): ShopifyCartLineInput {
  const {
    variantId,
    quantity,
    slug,
    image,
    baseUnitPrice,
    colorOption,
    hasLogo,
    logoUrl,
  } = payload;

  const attributes: ShopifyCartLineAttribute[] = [
    { key: ATTR_SLUG, value: slug },
    { key: ATTR_HAS_LOGO, value: hasLogo ? "true" : "false" },
    { key: ATTR_BASE_PRICE, value: String(baseUnitPrice) },
  ];

  if (image) {
    attributes.push({ key: ATTR_IMAGE, value: image });
  }

  if (colorOption) {
    attributes.push(
      { key: ATTR_COLOR_NAME, value: colorOption.name },
      { key: ATTR_COLOR_NAME_EN, value: colorOption.nameEn },
      { key: ATTR_COLOR_UPPER_HEX, value: colorOption.upperHex },
      { key: ATTR_COLOR_LOWER_HEX, value: colorOption.lowerHex },
    );
  }

  if (hasLogo && logoUrl) {
    attributes.push({ key: ATTR_LOGO_URL, value: logoUrl });
  }

  return { merchandiseId: variantId, quantity, attributes };
}

function getAttr(
  attrs: ShopifyCartLineAttribute[],
  key: string,
): string | undefined {
  return attrs.find((a) => a.key === key)?.value;
}

export function transformShopifyCartLine(raw: ShopifyCartLine): CartItem {
  const attrs = raw.attributes;
  const hasLogo = getAttr(attrs, ATTR_HAS_LOGO) === "true";
  const baseUnitPrice = parseInt(getAttr(attrs, ATTR_BASE_PRICE) ?? "0", 10);
  const logoUnitPrice = hasLogo ? LOGO_SURCHARGE : 0;
  const unitPrice = baseUnitPrice + logoUnitPrice;

  const colorName = getAttr(attrs, ATTR_COLOR_NAME);
  const colorNameEn = getAttr(attrs, ATTR_COLOR_NAME_EN);
  const colorUpperHex = getAttr(attrs, ATTR_COLOR_UPPER_HEX);
  const colorLowerHex = getAttr(attrs, ATTR_COLOR_LOWER_HEX);

  const colorOption: ColorOption | null =
    colorName && colorNameEn && colorUpperHex && colorLowerHex
      ? {
          name: colorName,
          nameEn: colorNameEn,
          upperHex: colorUpperHex,
          lowerHex: colorLowerHex,
        }
      : null;

  const slug =
    (getAttr(attrs, ATTR_SLUG) as LatteBowlProductSlug) ??
    (raw.merchandise.product.handle as LatteBowlProductSlug);

  const sizeOption = raw.merchandise.selectedOptions.find(
    (o) => o.name === "サイズ",
  );
  const capacity = sizeOption?.value ?? raw.merchandise.title;

  const pricePerItem = shopifyAmountToNumber(
    raw.cost.amountPerQuantity.amount,
  );

  const FALLBACK_IMAGES: Record<string, string> = {
    on: "/images/product/latte-bowl-on.webp",
    kaku: "/images/product/latte-bowl-kaku.webp",
  };
  const image =
    getAttr(attrs, ATTR_IMAGE) ?? FALLBACK_IMAGES[slug] ?? "";

  return {
    id: raw.id,
    slug,
    image,
    name: raw.merchandise.product.title,
    capacity,
    baseUnitPrice: baseUnitPrice || pricePerItem - logoUnitPrice,
    logoUnitPrice,
    unitPrice: unitPrice || pricePerItem,
    quantity: raw.quantity,
    colorOption,
    hasLogo,
  };
}

// Re-export type aliases so imports from transforms/cart work
export type { CartItem, ColorOption };
