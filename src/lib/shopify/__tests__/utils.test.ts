import {
  formatJPY,
  shopifyAmountToNumber,
  extractGidId,
  buildVariantLookupKey,
} from "@/lib/shopify/utils";

describe("formatJPY", () => {
  it("formats 1980 as ¥1,980", () => {
    expect(formatJPY(1980)).toBe("¥1,980");
  });

  it("formats 0 as ¥0", () => {
    expect(formatJPY(0)).toBe("¥0");
  });

  it("formats large numbers with commas", () => {
    expect(formatJPY(10000)).toBe("¥10,000");
  });
});

describe("shopifyAmountToNumber", () => {
  it("converts string '1980.00' to number 1980", () => {
    expect(shopifyAmountToNumber("1980.00")).toBe(1980);
  });

  it("converts string '2420.50' to number 2420.5", () => {
    expect(shopifyAmountToNumber("2420.50")).toBe(2420.5);
  });

  it("converts integer strings", () => {
    expect(shopifyAmountToNumber("2200")).toBe(2200);
  });
});

describe("extractGidId", () => {
  it("extracts id from ProductVariant GID", () => {
    expect(
      extractGidId("gid://shopify/ProductVariant/123456"),
    ).toBe("123456");
  });

  it("extracts id from Product GID", () => {
    expect(extractGidId("gid://shopify/Product/789")).toBe("789");
  });

  it("returns original string if no slash", () => {
    expect(extractGidId("abc123")).toBe("abc123");
  });
});

describe("buildVariantLookupKey", () => {
  it("creates key for size without logo", () => {
    expect(buildVariantLookupKey("180ml", false)).toBe("180ml__none");
  });

  it("creates key for size with logo", () => {
    expect(buildVariantLookupKey("240ml", true)).toBe("240ml__logo");
  });
});
