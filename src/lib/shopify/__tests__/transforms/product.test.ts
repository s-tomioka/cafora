import {
  transformShopifyProduct,
  findVariantId,
} from "@/lib/shopify/transforms/product";
import type { ShopifyProduct } from "@/lib/shopify/types";

const MOCK_ON_PRODUCT: ShopifyProduct = {
  id: "gid://shopify/Product/1",
  handle: "on",
  title: "温（ON）",
  description: "ゆったりとした丸みのあるフォルムが手に馴染むラテボウル。",
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/101",
          title: "180ml / なし",
          availableForSale: true,
          price: { amount: "1980.00", currencyCode: "JPY" },
          selectedOptions: [
            { name: "サイズ", value: "180ml" },
            { name: "ロゴ", value: "なし" },
          ],
        },
      },
      {
        node: {
          id: "gid://shopify/ProductVariant/102",
          title: "180ml / あり",
          availableForSale: true,
          price: { amount: "2980.00", currencyCode: "JPY" },
          selectedOptions: [
            { name: "サイズ", value: "180ml" },
            { name: "ロゴ", value: "あり" },
          ],
        },
      },
      {
        node: {
          id: "gid://shopify/ProductVariant/103",
          title: "240ml / なし",
          availableForSale: true,
          price: { amount: "2200.00", currencyCode: "JPY" },
          selectedOptions: [
            { name: "サイズ", value: "240ml" },
            { name: "ロゴ", value: "なし" },
          ],
        },
      },
      {
        node: {
          id: "gid://shopify/ProductVariant/104",
          title: "240ml / あり",
          availableForSale: true,
          price: { amount: "3200.00", currencyCode: "JPY" },
          selectedOptions: [
            { name: "サイズ", value: "240ml" },
            { name: "ロゴ", value: "あり" },
          ],
        },
      },
    ],
  },
};

describe("transformShopifyProduct", () => {
  const product = transformShopifyProduct(MOCK_ON_PRODUCT);

  it("has correct handle", () => {
    expect(product.handle).toBe("on");
  });

  it("has 4 variants (2 sizes × 2 logo options)", () => {
    expect(product.variants).toHaveLength(4);
  });

  it("correctly maps 180ml ロゴなし variant", () => {
    const variant = product.variants.find(
      (v) => v.size === "180ml" && !v.hasLogo,
    );
    expect(variant).toBeDefined();
    expect(variant?.price).toBe(1980);
    expect(variant?.id).toBe("gid://shopify/ProductVariant/101");
  });

  it("correctly maps 180ml ロゴあり variant", () => {
    const variant = product.variants.find(
      (v) => v.size === "180ml" && v.hasLogo,
    );
    expect(variant).toBeDefined();
    expect(variant?.price).toBe(2980);
  });

  it("correctly maps 240ml ロゴなし variant", () => {
    const variant = product.variants.find(
      (v) => v.size === "240ml" && !v.hasLogo,
    );
    expect(variant?.price).toBe(2200);
  });

  it("correctly maps 240ml ロゴあり variant", () => {
    const variant = product.variants.find(
      (v) => v.size === "240ml" && v.hasLogo,
    );
    expect(variant?.price).toBe(3200);
  });
});

describe("findVariantId", () => {
  const { variants } = transformShopifyProduct(MOCK_ON_PRODUCT);

  it("finds correct variant ID for 180ml without logo", () => {
    expect(findVariantId(variants, "180ml", false)).toBe(
      "gid://shopify/ProductVariant/101",
    );
  });

  it("finds correct variant ID for 240ml with logo", () => {
    expect(findVariantId(variants, "240ml", true)).toBe(
      "gid://shopify/ProductVariant/104",
    );
  });

  it("returns null for unknown size", () => {
    expect(findVariantId(variants, "999ml", false)).toBeNull();
  });
});
