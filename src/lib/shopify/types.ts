import type { LatteBowlProductSlug } from "@/constants";

// ─── Shopify API response types ──────────────────────────────────────────────

export type ShopifyMoneyAmount = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  price: ShopifyMoneyAmount;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
};

export type ShopifyCartLineAttribute = {
  key: string;
  value: string;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: Array<{ name: string; value: string }>;
    product: {
      handle: string;
      title: string;
    };
  };
  attributes: ShopifyCartLineAttribute[];
  cost: {
    totalAmount: ShopifyMoneyAmount;
    amountPerQuantity: ShopifyMoneyAmount;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
  cost: {
    totalAmount: ShopifyMoneyAmount;
    subtotalAmount: ShopifyMoneyAmount;
  };
};

export type ShopifyOrderLineItem = {
  title: string;
  quantity: number;
  variant: {
    id: string;
    title: string;
    selectedOptions: Array<{ name: string; value: string }>;
    product: {
      handle: string;
      title: string;
    };
  } | null;
  customAttributes: ShopifyCartLineAttribute[];
  originalTotalPrice: ShopifyMoneyAmount;
};

export type ShopifyOrder = {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  currentTotalPrice: ShopifyMoneyAmount;
  lineItems: {
    edges: Array<{
      node: ShopifyOrderLineItem;
    }>;
  };
};

export type ShopifyCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  orders: {
    edges: Array<{
      node: ShopifyOrder;
    }>;
  };
};

// ─── App internal types ───────────────────────────────────────────────────────

export type AppProductVariant = {
  id: string;
  size: string;
  hasLogo: boolean;
  color: string;
  price: number;
  available: boolean;
};

export type AppProduct = {
  id: string;
  handle: LatteBowlProductSlug;
  variants: AppProductVariant[];
};

export type ShopifyCartLineInput = {
  merchandiseId: string;
  quantity: number;
  attributes: ShopifyCartLineAttribute[];
};

export type AppOrder = {
  id: string;
  orderNumber: number;
  processedAt: string;
  totalAmount: number;
  status: string;
  items: AppOrderItem[];
};

export type ColorOption = {
  name: string;
  nameEn: string;
  upperHex: string;
  lowerHex: string;
};

export type CartItem = {
  id: string;
  slug: LatteBowlProductSlug;
  image: string;
  name: string;
  capacity: string;
  baseUnitPrice: number;
  logoUnitPrice: number;
  unitPrice: number;
  quantity: number;
  colorOption: ColorOption | null;
  hasLogo: boolean;
};

export type AppOrderItem = {
  slug: LatteBowlProductSlug;
  name: string;
  capacity: string;
  quantity: number;
  unitPrice: number;
  hasLogo: boolean;
  colorOption: ColorOption | null;
  logoUrl: string | null;
};
