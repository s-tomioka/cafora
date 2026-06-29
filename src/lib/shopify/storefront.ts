import { getStorefrontClient } from "./client";

export class StorefrontError extends Error {
  constructor(
    message: string,
    public readonly errors?: unknown,
  ) {
    super(message);
    this.name = "StorefrontError";
  }
}

export async function executeQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const client = getStorefrontClient();
  const { data, errors } = await client.request<T>(query, { variables });

  if (errors) {
    throw new StorefrontError("Shopify Storefront API error", errors);
  }

  if (!data) {
    throw new StorefrontError("No data returned from Storefront API");
  }

  return data;
}
