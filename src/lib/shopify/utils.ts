export function formatJPY(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

export function shopifyAmountToNumber(amount: string): number {
  return parseFloat(amount);
}

export function extractGidId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

export function buildVariantLookupKey(size: string, hasLogo: boolean): string {
  return `${size}__${hasLogo ? "logo" : "none"}`;
}
