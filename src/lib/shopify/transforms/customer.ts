import type { LatteBowlColorOption, LatteBowlProductSlug } from "@/constants";
import { LOGO_SURCHARGE } from "@/constants";
import { shopifyAmountToNumber } from "../utils";
import type { AppOrder, AppOrderItem, ShopifyOrder } from "../types";

function getAttr(
  attrs: Array<{ key: string; value: string }>,
  key: string,
): string | undefined {
  return attrs.find((a) => a.key === key)?.value;
}

function formatOrderDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function transformShopifyOrder(raw: ShopifyOrder): AppOrder {
  const items: AppOrderItem[] = raw.lineItems.edges.map(({ node }) => {
    const attrs = node.customAttributes;
    const hasLogo = getAttr(attrs, "has_logo") === "true";
    const baseUnitPrice = parseInt(getAttr(attrs, "base_unit_price") ?? "0", 10);
    const logoUnitPrice = hasLogo ? LOGO_SURCHARGE : 0;

    const colorName = getAttr(attrs, "color_name");
    const colorNameEn = getAttr(attrs, "color_name_en");
    const colorUpperHex = getAttr(attrs, "color_upper_hex");
    const colorLowerHex = getAttr(attrs, "color_lower_hex");

    type ColorOptionSubset = Pick<
      LatteBowlColorOption,
      "name" | "nameEn" | "upperHex" | "lowerHex"
    >;
    const colorOption: ColorOptionSubset | null =
      colorName && colorNameEn && colorUpperHex && colorLowerHex
        ? {
            name: colorName,
            nameEn: colorNameEn,
            upperHex: colorUpperHex,
            lowerHex: colorLowerHex,
          }
        : null;

    const slugAttr = getAttr(attrs, "slug");
    const slug = (slugAttr ??
      node.variant?.product.handle ??
      "on") as LatteBowlProductSlug;

    const sizeOption = node.variant?.selectedOptions.find(
      (o) => o.name === "サイズ",
    );
    const capacity = sizeOption?.value ?? node.variant?.title ?? "";

    const logoUrl = getAttr(attrs, "logo_url") ?? null;

    return {
      slug,
      name: node.title,
      capacity,
      quantity: node.quantity,
      unitPrice: baseUnitPrice + logoUnitPrice,
      hasLogo,
      colorOption,
      logoUrl,
    };
  });

  return {
    id: raw.id,
    orderNumber: raw.orderNumber,
    processedAt: formatOrderDate(raw.processedAt),
    totalAmount: shopifyAmountToNumber(raw.currentTotalPrice.amount),
    status: raw.fulfillmentStatus,
    items,
  };
}
