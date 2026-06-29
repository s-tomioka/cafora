import { createStorefrontApiClient } from "@shopify/storefront-api-client";

let _client: ReturnType<typeof createStorefrontApiClient> | null = null;

export function getStorefrontClient() {
  if (!_client) {
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const accessToken =
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!storeDomain || !accessToken) {
      throw new Error(
        "Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN",
      );
    }

    _client = createStorefrontApiClient({
      storeDomain,
      apiVersion: "2025-01",
      publicAccessToken: accessToken,
    });
  }
  return _client;
}
