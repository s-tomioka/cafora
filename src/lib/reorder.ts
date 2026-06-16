const REORDER_LOGO_KEY = "cafora:reorder-logo";

type ReorderOptions = {
  colorNameEn: string;
  capacity: string;
  hasLogo: boolean;
};

export function buildReorderHref(
  slug: string,
  { colorNameEn, capacity, hasLogo }: ReorderOptions,
): string {
  const params = new URLSearchParams();
  params.set("color", colorNameEn);
  params.set("size", capacity);
  if (hasLogo) {
    params.set("logo", "1");
  }
  return `/products/${slug}?${params.toString()}`;
}

export function stashReorderLogo(logoPreviewUrl: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(REORDER_LOGO_KEY, logoPreviewUrl);
}

export function consumeReorderLogo(): string | null {
  if (typeof window === "undefined") return null;
  const logoPreviewUrl = sessionStorage.getItem(REORDER_LOGO_KEY);
  if (logoPreviewUrl) {
    sessionStorage.removeItem(REORDER_LOGO_KEY);
  }
  return logoPreviewUrl;
}
