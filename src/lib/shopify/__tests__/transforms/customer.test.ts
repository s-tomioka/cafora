import { transformShopifyOrder } from "@/lib/shopify/transforms/customer";
import type { ShopifyOrder } from "@/lib/shopify/types";

const COLOR_OPTION = {
  name: "グレー",
  nameEn: "Gray",
  upperHex: "#F4EFE8",
  lowerHex: "#A89A8F",
};

const MOCK_ORDER: ShopifyOrder = {
  id: "gid://shopify/Order/9001",
  name: "#1001",
  orderNumber: 1001,
  processedAt: "2026-06-01T10:00:00Z",
  fulfillmentStatus: "UNFULFILLED",
  financialStatus: "PAID",
  currentTotalPrice: { amount: "88800.00", currencyCode: "JPY" },
  lineItems: {
    edges: [
      {
        node: {
          title: "温（ON）",
          quantity: 30,
          variant: {
            id: "gid://shopify/ProductVariant/103",
            title: "240ml / あり",
            selectedOptions: [
              { name: "サイズ", value: "240ml" },
              { name: "ロゴ", value: "あり" },
            ],
            product: {
              handle: "on",
              title: "温（ON）",
            },
          },
          customAttributes: [
            { key: "slug", value: "on" },
            { key: "has_logo", value: "true" },
            { key: "base_unit_price", value: "2200" },
            { key: "color_name", value: COLOR_OPTION.name },
            { key: "color_name_en", value: COLOR_OPTION.nameEn },
            { key: "color_upper_hex", value: COLOR_OPTION.upperHex },
            { key: "color_lower_hex", value: COLOR_OPTION.lowerHex },
            {
              key: "logo_url",
              value: "https://storage.supabase.co/logos/cafe-logo.svg",
            },
          ],
          originalTotalPrice: { amount: "96000.00", currencyCode: "JPY" },
        },
      },
    ],
  },
};

describe("transformShopifyOrder", () => {
  const order = transformShopifyOrder(MOCK_ORDER);

  it("maps orderNumber correctly", () => {
    expect(order.orderNumber).toBe(1001);
  });

  it("converts totalAmount to number", () => {
    expect(order.totalAmount).toBe(88800);
  });

  it("converts processedAt to Japanese date format", () => {
    expect(order.processedAt).toMatch(/2026/);
    expect(order.processedAt).toMatch(/6/);
    expect(order.processedAt).toMatch(/1/);
  });

  it("maps item slug correctly", () => {
    expect(order.items[0].slug).toBe("on");
  });

  it("maps item capacity correctly", () => {
    expect(order.items[0].capacity).toBe("240ml");
  });

  it("maps item quantity correctly", () => {
    expect(order.items[0].quantity).toBe(30);
  });

  it("maps hasLogo=true from customAttributes", () => {
    expect(order.items[0].hasLogo).toBe(true);
  });

  it("calculates unitPrice as basePrice + logoSurcharge", () => {
    expect(order.items[0].unitPrice).toBe(3200); // 2200 + 1000
  });

  it("restores colorOption from customAttributes", () => {
    expect(order.items[0].colorOption).toEqual(COLOR_OPTION);
  });

  it("maps logoUrl from customAttributes", () => {
    expect(order.items[0].logoUrl).toBe(
      "https://storage.supabase.co/logos/cafe-logo.svg",
    );
  });
});
