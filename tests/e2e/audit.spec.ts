import { test, expect } from "@playwright/test";

const PAGES = [
  "/",
  "/products",
  "/products/on",
  "/products/kaku",
  "/cart",
  "/account",
  "/account/register",
  "/brand",
  "/barista",
  "/faq",
];

for (const path of PAGES) {
  test(`コンソールエラーなし: ${path}`, async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const t = msg.text();
        // ブラウザ拡張や外部リソース起因のエラーを除外
        if (t.includes("favicon") || t.includes("chrome-extension")) return;
        errors.push(t);
      }
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    expect(errors, `${path} にコンソールエラーあり:\n${errors.join("\n")}`).toEqual([]);
  });
}

test("カート追加フロー コンソールエラーなし", async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const t = msg.text();
      if (t.includes("favicon") || t.includes("chrome-extension")) return;
      errors.push(t);
    }
  });
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/products/on", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "180ml" }).click();
  await page.getByRole("button", { name: "カートに追加" }).click();

  // Shopify cartCreate 完了を待つ
  await page.waitForFunction(
    () => localStorage.getItem("cafora_cart_id") !== null,
    { timeout: 15000 },
  );

  // ドロワー確認
  await page.waitForTimeout(500);

  // カートページへ SPA ナビゲーション
  await page.getByRole("link", { name: "カートの確認" }).first().click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(2000);

  expect(errors, `カート追加フローでエラー:\n${errors.join("\n")}`).toEqual([]);
});
