import {
  getLatteBowlSizePrice,
  formatLatteBowlPriceRange,
  getLatteBowlSizeSpec,
} from "@/constants";

describe("getLatteBowlSizePrice", () => {
  it("returns correct price for ON 180ml", () => {
    expect(getLatteBowlSizePrice("on", "180ml")).toBe(1980);
  });

  it("returns correct price for ON 240ml", () => {
    expect(getLatteBowlSizePrice("on", "240ml")).toBe(2200);
  });

  it("returns correct price for KAKU 240ml", () => {
    expect(getLatteBowlSizePrice("kaku", "240ml")).toBe(2420);
  });

  it("returns correct price for KAKU 280ml", () => {
    expect(getLatteBowlSizePrice("kaku", "280ml")).toBe(2620);
  });

  it("falls back to first price for unknown size", () => {
    expect(getLatteBowlSizePrice("on", "999ml")).toBe(1980);
  });
});

describe("formatLatteBowlPriceRange", () => {
  it("returns price range with trailing 〜 for ON (min ≠ max)", () => {
    expect(formatLatteBowlPriceRange("on")).toBe("1,980〜");
  });

  it("returns price range with trailing 〜 for KAKU (min ≠ max)", () => {
    expect(formatLatteBowlPriceRange("kaku")).toBe("2,420〜");
  });
});

describe("getLatteBowlSizeSpec", () => {
  it("returns correct spec for ON 180ml", () => {
    const spec = getLatteBowlSizeSpec("on", "180ml");
    expect(spec).not.toBeNull();
    expect(spec?.productName).toBe("ON 180ml");
    expect(spec?.capacity).toBe("180ml");
    expect(spec?.productionArea).toBe("瀬戸・美濃焼");
  });

  it("returns null for unknown size", () => {
    expect(getLatteBowlSizeSpec("on", "999ml")).toBeNull();
  });
});
