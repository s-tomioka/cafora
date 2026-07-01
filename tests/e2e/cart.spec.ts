import { test, expect } from "@playwright/test";

test.describe("カート", () => {
  test("商品をカートに追加するとドロワーが開く", async ({ page }) => {
    await page.goto("/products/on");

    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();

    // カートドロワーが開いてカートの確認リンクが表示される
    await expect(
      page.getByRole("link", { name: "カートの確認" }),
    ).toBeVisible({ timeout: 10000 });
  });

  test("カートページで商品が表示される", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();
    await page.waitForTimeout(2000);

    // カートページへ（ドロワー内の「カートの確認」リンクをクリック）
    await page.getByRole("link", { name: "カートの確認" }).click();
    await expect(page).toHaveURL("/cart");
    await expect(
      page.getByRole("main").getByRole("link", { name: "温 -ON-（180ml）" }),
    ).toBeVisible();
  });

  test("カートページでShopify checkoutURLへのリンクが表示される", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();
    await page.waitForTimeout(2000);

    await page.getByRole("link", { name: "カートの確認" }).click();
    await expect(page).toHaveURL("/cart");

    // カートページの購入手続きボタン
    const checkoutLink = page.getByRole("main").getByRole("link", { name: "購入手続き" });
    await expect(checkoutLink).toBeVisible({ timeout: 10000 });
    const href = await checkoutLink.getAttribute("href");
    expect(href).toContain("caforadevstore.myshopify.com");
  });

  test("ページリロード後もカートが維持される（Shopify永続化）", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();

    // localStorage に cafora_cart_id が書き込まれるまで待つ（Shopify cartCreate完了の証拠）
    // CartDrawer は常にDOMにあるため toBeVisible は不十分 — localStorage を直接監視する
    await page.waitForFunction(
      () => localStorage.getItem("cafora_cart_id") !== null,
      { timeout: 15000 },
    );

    // フルページナビゲーションで CartProvider を再マウント → Shopify getCart で復元
    await page.goto("/cart");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("main").getByRole("link", { name: "温 -ON-（180ml）" }),
    ).toBeVisible({ timeout: 20000 });
  });

  test("カートから商品を削除できる", async ({ page }) => {
    await page.goto("/products/on");
    await page.getByRole("button", { name: "180ml" }).click();
    await page.getByRole("button", { name: "カートに追加" }).click();
    await page.waitForTimeout(2000);

    await page.getByRole("link", { name: "カートの確認" }).click();
    await expect(page).toHaveURL("/cart");

    await page.getByRole("main").getByRole("button", { name: "削除" }).click();
    await expect(
      page.getByRole("main").getByText("カートに商品がありません"),
    ).toBeVisible({ timeout: 10000 });
  });
});
