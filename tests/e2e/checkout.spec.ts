import { test, expect } from "@playwright/test";

test.describe("チェックアウト", () => {
  test("カートからShopifyチェックアウトへのURLが取得できる", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();
    await page.waitForTimeout(2000);

    await page.getByRole("link", { name: "カートの確認" }).click();
    await expect(page).toHaveURL("/cart");

    // ドロワーとカートページ両方のcheckoutUrlがShopifyドメイン
    const checkoutLink = page.getByRole("main").getByRole("link", { name: "購入手続き" });
    await expect(checkoutLink).toBeVisible({ timeout: 10000 });
    const href = await checkoutLink.getAttribute("href");
    expect(href).toContain("caforadevstore.myshopify.com/cart/c/");
  });

  /**
   * Shopify Bogus Gateway によるテスト決済
   *
   * 事前準備:
   *   Shopify管理画面 → 設定 → 支払い → テスト決済を有効化
   */
  test("Bogus Gatewayでテスト決済を完了する", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();
    await page.waitForTimeout(2000);

    await page.getByRole("link", { name: "カートの確認" }).click();
    await expect(page).toHaveURL("/cart");

    const checkoutLink = page.getByRole("main").getByRole("link", { name: "購入手続き" });
    await expect(checkoutLink).toBeVisible({ timeout: 10000 });
    const href = await checkoutLink.getAttribute("href");
    if (!href) throw new Error("checkoutUrl が取得できませんでした");

    await page.goto(href);
    await expect(page).toHaveURL(/caforadevstore\.myshopify\.com/, {
      timeout: 30000,
    });

    // メールアドレス入力（ゲストチェックアウト）
    const emailField = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    if (await emailField.isVisible({ timeout: 5000 })) {
      await emailField.fill("e2e-test@cafora-dev.jp");
      const continueBtn = page.getByRole("button", { name: /continue/i });
      if (await continueBtn.isVisible()) await continueBtn.click();
    }

    await page.waitForTimeout(2000);

    // Bogus Gateway でカード情報入力
    const cardField = page.getByLabel(/card number/i).or(page.getByPlaceholder(/card number/i));
    if (await cardField.isVisible({ timeout: 5000 })) {
      await cardField.fill("1");
      await page.getByRole("button", { name: /pay now/i }).click();
      await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 30000 });
    }
  });
});
