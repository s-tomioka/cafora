import { test, expect } from "@playwright/test";

test.describe("商品ページ", () => {
  test("ON商品ページが正しい価格を表示する", async ({ page }) => {
    await page.goto("/products/on");

    await expect(page.getByRole("heading", { name: /温/ })).toBeVisible();

    // 180ml 選択時の価格
    await page.getByRole("button", { name: "180ml" }).click();
    await expect(page.getByText("¥1,980")).toBeVisible();

    // 240ml 選択時の価格
    await page.getByRole("button", { name: "240ml" }).click();
    await expect(page.getByText("¥2,200")).toBeVisible();
  });

  test("KAKU商品ページが正しい価格を表示する", async ({ page }) => {
    await page.goto("/products/kaku");

    await expect(page.getByRole("heading", { name: /拡/ })).toBeVisible();

    await page.getByRole("button", { name: "240ml" }).click();
    await expect(page.getByText("¥2,420")).toBeVisible();

    await page.getByRole("button", { name: "280ml" }).click();
    await expect(page.getByText("¥2,620")).toBeVisible();
  });

  test("ロゴありにチェックすると価格が上がる", async ({ page }) => {
    await page.goto("/products/on");

    await page.getByRole("button", { name: "180ml" }).click();
    await expect(page.getByText("¥1,980")).toBeVisible();

    // ロゴあり チェックボックスをオン
    await page.getByLabel(/ロゴ/).check();
    await expect(page.getByText("¥2,980")).toBeVisible();
  });

  test("カートに追加ボタンが表示される", async ({ page }) => {
    await page.goto("/products/on");
    await expect(
      page.getByRole("button", { name: /カートに追加/ }),
    ).toBeVisible();
  });
});
