import {
  buildCartLineInput,
  transformShopifyCartLine,
} from "@/lib/shopify/transforms/cart";
import type { ShopifyCartLine } from "@/lib/shopify/types";

const COLOR_OPTION = {
  name: "チャコール",
  nameEn: "Charcoal",
  upperHex: "#F4EFE8",
  lowerHex: "#3A3A3A",
};

// ─── buildCartLineInput ───────────────────────────────────────────────────────

describe("buildCartLineInput", () => {
  it("includes correct merchandiseId and quantity", () => {
    const input = buildCartLineInput({
      variantId: "gid://shopify/ProductVariant/101",
      quantity: 30,
      slug: "on",
      baseUnitPrice: 1980,
      colorOption: null,
      hasLogo: false,
    });
    expect(input.merchandiseId).toBe("gid://shopify/ProductVariant/101");
    expect(input.quantity).toBe(30);
  });

  it("includes color attributes when colorOption is provided", () => {
    const input = buildCartLineInput({
      variantId: "gid://shopify/ProductVariant/101",
      quantity: 30,
      slug: "on",
      baseUnitPrice: 1980,
      colorOption: COLOR_OPTION,
      hasLogo: false,
    });
    const attrs = Object.fromEntries(input.attributes.map((a) => [a.key, a.value]));
    expect(attrs["_color_name"]).toBe("チャコール");
    expect(attrs["_color_name_en"]).toBe("Charcoal");
    expect(attrs["_color_upper_hex"]).toBe("#F4EFE8");
    expect(attrs["_color_lower_hex"]).toBe("#3A3A3A");
  });

  it("includes logo_asset_id attribute when hasLogo=true and logoAssetId is provided", () => {
    const input = buildCartLineInput({
      variantId: "gid://shopify/ProductVariant/102",
      quantity: 30,
      slug: "on",
      baseUnitPrice: 1980,
      colorOption: null,
      hasLogo: true,
      logoAssetId: "1751234567890-a1b2c3d4",
    });
    const attrs = Object.fromEntries(input.attributes.map((a) => [a.key, a.value]));
    expect(attrs["_has_logo"]).toBe("true");
    expect(attrs["_logo_asset_id"]).toBe("1751234567890-a1b2c3d4");
  });

  it("accepts long strings as logo_asset_id (no 255-char limit)", () => {
    const longId = "a".repeat(300);
    const input = buildCartLineInput({
      variantId: "gid://shopify/ProductVariant/102",
      quantity: 30,
      slug: "on",
      baseUnitPrice: 1980,
      colorOption: null,
      hasLogo: true,
      logoAssetId: longId,
    });
    const attrs = Object.fromEntries(input.attributes.map((a) => [a.key, a.value]));
    expect(attrs["_logo_asset_id"]).toBe(longId);
  });

  it("does not include logo_asset_id when hasLogo=false", () => {
    const input = buildCartLineInput({
      variantId: "gid://shopify/ProductVariant/101",
      quantity: 30,
      slug: "on",
      baseUnitPrice: 1980,
      colorOption: null,
      hasLogo: false,
    });
    const keys = input.attributes.map((a) => a.key);
    expect(keys).not.toContain("_logo_asset_id");
  });

  it("does not include color attributes when colorOption is null", () => {
    const input = buildCartLineInput({
      variantId: "gid://shopify/ProductVariant/101",
      quantity: 30,
      slug: "on",
      baseUnitPrice: 1980,
      colorOption: null,
      hasLogo: false,
    });
    const keys = input.attributes.map((a) => a.key);
    expect(keys).not.toContain("_color_name");
    expect(keys).not.toContain("_color_name_en");
  });
});

// ─── transformShopifyCartLine ─────────────────────────────────────────────────

const makeMockCartLine = (
  overrides: Partial<{
    id: string;
    quantity: number;
    handle: string;
    capacity: string;
    hasLogo: boolean;
    unitPrice: number;
    colorOption: typeof COLOR_OPTION | null;
    logoUrl: string | null;
  }> = {},
): ShopifyCartLine => {
  const o = {
    id: "gid://shopify/CartLine/1",
    quantity: 30,
    handle: "on",
    capacity: "240ml",
    hasLogo: false,
    unitPrice: 2200,
    colorOption: null as typeof COLOR_OPTION | null,
    logoAssetId: null as string | null,
    ...overrides,
  };

  const baseUnitPrice = o.hasLogo ? o.unitPrice - 1000 : o.unitPrice;

  const attributes = [
    { key: "_slug", value: o.handle },
    { key: "_has_logo", value: o.hasLogo ? "true" : "false" },
    { key: "_base_unit_price", value: String(baseUnitPrice) },
  ];
  if (o.colorOption) {
    attributes.push(
      { key: "_color_name", value: o.colorOption.name },
      { key: "_color_name_en", value: o.colorOption.nameEn },
      { key: "_color_upper_hex", value: o.colorOption.upperHex },
      { key: "_color_lower_hex", value: o.colorOption.lowerHex },
    );
  }
  if (o.hasLogo && o.logoAssetId) {
    attributes.push({ key: "_logo_asset_id", value: o.logoAssetId });
  }

  return {
    id: o.id,
    quantity: o.quantity,
    merchandise: {
      id: "gid://shopify/ProductVariant/103",
      title: `${o.capacity} / ${o.hasLogo ? "あり" : "なし"}`,
      selectedOptions: [
        { name: "サイズ", value: o.capacity },
        { name: "ロゴ", value: o.hasLogo ? "あり" : "なし" },
      ],
      product: {
        handle: o.handle,
        title: "温（ON）",
      },
    },
    attributes,
    cost: {
      totalAmount: {
        amount: String(o.unitPrice * o.quantity),
        currencyCode: "JPY",
      },
      amountPerQuantity: {
        amount: String(o.unitPrice),
        currencyCode: "JPY",
      },
    },
  };
};

describe("transformShopifyCartLine", () => {
  it("maps slug and capacity correctly", () => {
    const line = makeMockCartLine({ handle: "on", capacity: "240ml" });
    const item = transformShopifyCartLine(line);
    expect(item.slug).toBe("on");
    expect(item.capacity).toBe("240ml");
  });

  it("maps quantity correctly", () => {
    const line = makeMockCartLine({ quantity: 50 });
    const item = transformShopifyCartLine(line);
    expect(item.quantity).toBe(50);
  });

  it("returns logoUnitPrice=0 and correct unitPrice when hasLogo=false", () => {
    const line = makeMockCartLine({ hasLogo: false, unitPrice: 1980 });
    const item = transformShopifyCartLine(line);
    expect(item.hasLogo).toBe(false);
    expect(item.logoUnitPrice).toBe(0);
    expect(item.unitPrice).toBe(1980);
  });

  it("returns logoUnitPrice=1000 and correct unitPrice when hasLogo=true", () => {
    const line = makeMockCartLine({ hasLogo: true, unitPrice: 2980 });
    const item = transformShopifyCartLine(line);
    expect(item.hasLogo).toBe(true);
    expect(item.logoUnitPrice).toBe(1000);
    expect(item.unitPrice).toBe(2980);
  });

  it("restores colorOption from attributes", () => {
    const line = makeMockCartLine({ colorOption: COLOR_OPTION });
    const item = transformShopifyCartLine(line);
    expect(item.colorOption).toEqual(COLOR_OPTION);
  });

  it("returns colorOption=null when color attributes are absent", () => {
    const line = makeMockCartLine({ colorOption: null });
    const item = transformShopifyCartLine(line);
    expect(item.colorOption).toBeNull();
  });
});
