import type { LatteBowlProductSlug } from "@/constants";
import { shopifyAmountToNumber } from "../utils";
import type { AppProduct, AppProductVariant, ShopifyProduct } from "../types";

const LOGO_OPTION_NAME = "ロゴ";
const LOGO_OPTION_WITH_VALUE = "あり";
const SIZE_OPTION_NAME = "サイズ";
const COLOR_OPTION_NAME = "カラー";

export function transformShopifyProduct(raw: ShopifyProduct): AppProduct {
  const variants: AppProductVariant[] = raw.variants.edges.map(({ node }) => {
    const sizeOption = node.selectedOptions.find(
      (o) => o.name === SIZE_OPTION_NAME,
    );
    const logoOption = node.selectedOptions.find(
      (o) => o.name === LOGO_OPTION_NAME,
    );
    const colorOption = node.selectedOptions.find(
      (o) => o.name === COLOR_OPTION_NAME,
    );
    return {
      id: node.id,
      size: sizeOption?.value ?? node.title,
      hasLogo: logoOption?.value === LOGO_OPTION_WITH_VALUE,
      color: colorOption?.value ?? "",
      price: shopifyAmountToNumber(node.price.amount),
      available: node.availableForSale,
    };
  });

  return {
    id: raw.id,
    handle: raw.handle as LatteBowlProductSlug,
    variants,
  };
}

export function findVariantId(
  variants: AppProductVariant[],
  size: string,
  hasLogo: boolean,
  color?: string,
): string | null {
  const variant = variants.find(
    (v) =>
      v.size === size &&
      v.hasLogo === hasLogo &&
      (color === undefined || v.color === "" || v.color === color),
  );
  return variant?.id ?? null;
}
