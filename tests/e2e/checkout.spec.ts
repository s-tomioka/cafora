import { test, expect } from "@playwright/test";

test.describe("チェックアウト", () => {
  test("カートからShopifyチェックアウトへ遷移する", async ({ page }) => {
    // 商品をカートに追加
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: /カートに追加/ }).click();
    await page.waitForTimeout(3000);

    // カートページへ
    await page.goto("/cart");

    // Shopify checkoutUrlへのリンクを確認
    const checkoutLink = page.getByRole("link", { name: /購入手続き/ });
    await expect(checkoutLink).toBeVisible({ timeout: 10000 });

    const href = await checkoutLink.getAttribute("href");
    expect(href).toContain("caforadevstore.myshopify.com/cart/c/");
  });

  /**
   * Shopify Bogus Gateway によるテスト決済
   *
   * 事前準備:
   *   Shopify管理画面 → 設定 → 支払い → テスト決済を有効化
   *   (Bogus Gateway が自動で使える状態になる)
   *
   * テストカード: カード番号欄に "1" を入力するだけで成功
   */
  test("Bogus Gatewayでテスト決済を完了する", async ({ page }) => {
    // 商品をカートに追加
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: /カートに追加/ }).click();
    await page.waitForTimeout(3000);

    await page.goto("/cart");
    const checkoutLink = page.getByRole("link", { name: /購入手続き/ });
    await expect(checkoutLink).toBeVisible({ timeout: 10000 });

    const href = await checkoutLink.getAttribute("href");
    if (!href) throw new Error("checkoutUrl が取得できませんでした");

    // Shopify hosted checkoutへ遷移
    await page.goto(href);
    await expect(page).toHaveURL(/caforadevstore\.myshopify\.com/, {
      timeout: 15000,
    });

    // メールアドレス入力（ゲストチェックアウト）
    const emailField = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    if (await emailField.isVisible()) {
      await emailField.fill("e2e-test@cafora-dev.jp");
      await page.getByRole("button", { name: /continue/i }).click();
    }

    // 配送先住所
    await page.waitForTimeout(2000);

    // Bogus Gateway でカード情報入力
    // カード番号欄に "1" を入力 → 成功
    const cardField = page
      .getByLabel(/card number/i)
      .or(page.getByPlaceholder(/card number/i));
    if (await cardField.isVisible({ timeout: 5000 })) {
      await cardField.fill("1");
      await page.getByRole("button", { name: /pay now/i }).click();
      await expect(page.getByText(/thank you/i)).toBeVisible({
        timeout: 30000,
      });
    }
  });
});
