export * from "./types";
export * from "./utils";
export * from "./client";
export * from "./storefront";
export * from "./transforms/product";
export * from "./transforms/cart";
export * from "./transforms/customer";

import { executeQuery } from "./storefront";
import {
  GET_PRODUCT_BY_HANDLE,
  GET_ALL_PRODUCTS,
} from "./queries/products";
import {
  GET_CART,
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
} from "./queries/cart";
import {
  CUSTOMER_CREATE,
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  GET_CUSTOMER,
} from "./queries/customer";
import { transformShopifyProduct } from "./transforms/product";
import { transformShopifyCartLine } from "./transforms/cart";
import { transformShopifyOrder } from "./transforms/customer";
import type {
  AppProduct,
  AppOrder,
  ShopifyCart,
  ShopifyCartLineInput,
  ShopifyCustomer,
  ShopifyProduct,
} from "./types";

// ─── Product API ──────────────────────────────────────────────────────────────

export async function getProductByHandle(
  handle: string,
): Promise<AppProduct | null> {
  const data = await executeQuery<{ product: ShopifyProduct | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle },
  );
  if (!data.product) return null;
  return transformShopifyProduct(data.product);
}

export async function getProducts(): Promise<AppProduct[]> {
  const data = await executeQuery<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(GET_ALL_PRODUCTS);
  return data.products.edges.map(({ node }) => transformShopifyProduct(node));
}

// ─── Cart API ─────────────────────────────────────────────────────────────────

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await executeQuery<{ cart: ShopifyCart | null }>(GET_CART, {
    cartId,
  });
  return data.cart;
}

export async function cartCreate(
  lines: ShopifyCartLineInput[],
): Promise<ShopifyCart> {
  const data = await executeQuery<{
    cartCreate: { cart: ShopifyCart; userErrors: unknown[] };
  }>(CART_CREATE, { lines });
  return data.cartCreate.cart;
}

export async function cartLinesAdd(
  cartId: string,
  lines: ShopifyCartLineInput[],
): Promise<ShopifyCart> {
  const data = await executeQuery<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: unknown[] };
  }>(CART_LINES_ADD, { cartId, lines });
  return data.cartLinesAdd.cart;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<ShopifyCart> {
  const data = await executeQuery<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: unknown[] };
  }>(CART_LINES_UPDATE, { cartId, lines });
  return data.cartLinesUpdate.cart;
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[],
): Promise<ShopifyCart> {
  const data = await executeQuery<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: unknown[] };
  }>(CART_LINES_REMOVE, { cartId, lineIds });
  return data.cartLinesRemove.cart;
}

// ─── Customer API ─────────────────────────────────────────────────────────────

type CustomerCreateInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type CustomerCreateResult = {
  customer: { id: string; email: string } | null;
  customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
};

export async function customerCreate(
  input: CustomerCreateInput,
): Promise<CustomerCreateResult> {
  const data = await executeQuery<{ customerCreate: CustomerCreateResult }>(
    CUSTOMER_CREATE,
    { input },
  );
  return data.customerCreate;
}

type CustomerAccessTokenResult = {
  customerAccessToken: { accessToken: string; expiresAt: string } | null;
  customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
};

export async function customerAccessTokenCreate(
  email: string,
  password: string,
): Promise<CustomerAccessTokenResult> {
  const data = await executeQuery<{
    customerAccessTokenCreate: CustomerAccessTokenResult;
  }>(CUSTOMER_ACCESS_TOKEN_CREATE, { input: { email, password } });
  return data.customerAccessTokenCreate;
}

export async function customerAccessTokenDelete(
  customerAccessToken: string,
): Promise<void> {
  await executeQuery(CUSTOMER_ACCESS_TOKEN_DELETE, { customerAccessToken });
}

export async function getCustomer(customerAccessToken: string): Promise<{
  customer: ShopifyCustomer | null;
  orders: AppOrder[];
}> {
  const data = await executeQuery<{ customer: ShopifyCustomer | null }>(
    GET_CUSTOMER,
    { customerAccessToken },
  );
  const customer = data.customer;
  if (!customer) return { customer: null, orders: [] };

  const orders = customer.orders.edges.map(({ node }) =>
    transformShopifyOrder(node),
  );

  return { customer, orders };
}
