type ReorderProductSlug = "on" | "kaku";

const REORDER_LOGO_STORAGE_KEY = "cafora_reorder_logo";

type ReorderOptions = {
  colorNameEn: string;
  capacity: string;
  hasLogo: boolean;
};

export function buildReorderHref(
  slug: ReorderProductSlug,
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

  try {
    window.sessionStorage.setItem(
      REORDER_LOGO_STORAGE_KEY,
      logoPreviewUrl,
    );
  } catch {
    // sessionStorageが利用できない場合は何もしない
  }
}

export function consumeReorderLogo(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const logoPreviewUrl = window.sessionStorage.getItem(
      REORDER_LOGO_STORAGE_KEY,
    );

    window.sessionStorage.removeItem(REORDER_LOGO_STORAGE_KEY);

    return logoPreviewUrl;
  } catch {
    return null;
  }
}
