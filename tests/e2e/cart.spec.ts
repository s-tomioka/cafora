import { test, expect } from "@playwright/test";

test.describe("カート", () => {
  test("商品をカートに追加するとドロワーが開く", async ({ page }) => {
    await page.goto("/products/on");

    // サイズ・カラーを選択
    await page.getByRole("button", { name: "180ml" }).click();
    // カラーオプションを選択（最初の選択肢）
    const colorButtons = page.getByRole("button").filter({ hasText: /^[^¥]+$/ });
    // カートに追加
    await page.getByRole("button", { name: /カートに追加/ }).click();

    // カートドロワーが開く
    await expect(page.getByText(/カート/)).toBeVisible({ timeout: 10000 });
  });

  test("カートページで商品が表示される", async ({ page }) => {
    // まず商品をカートに追加
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: /カートに追加/ }).click();
    await page.waitForTimeout(2000);

    // カートページへ
    await page.goto("/cart");
    await expect(page.getByText(/温/)).toBeVisible();
    await expect(page.getByText("¥1,980")).toBeVisible();
  });

  test("カートページでチェックアウトURLが表示される", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: /カートに追加/ }).click();
    await page.waitForTimeout(2000);

    await page.goto("/cart");
    // 購入手続きボタンがリンクになっている（Shopify checkoutUrl）
    const checkoutLink = page.getByRole("link", { name: /購入手続き/ });
    await expect(checkoutLink).toBeVisible({ timeout: 10000 });
    const href = await checkoutLink.getAttribute("href");
    expect(href).toContain("caforadevstore.myshopify.com");
  });

  test("ページリロード後もカートが維持される", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: /カートに追加/ }).click();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.goto("/cart");
    await expect(page.getByText(/温/)).toBeVisible();
  });

  test("カートから商品を削除できる", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: /カートに追加/ }).click();
    await page.waitForTimeout(2000);

    await page.goto("/cart");
    await page.getByRole("button", { name: /削除/ }).click();
    await page.waitForTimeout(2000);

    await expect(page.getByText(/カートに商品がありません/)).toBeVisible();
  });
});
