import { test, expect } from "@playwright/test";

test.describe("商品ページ", () => {
  test("ON商品ページが正しい価格を表示する", async ({ page }) => {
    await page.goto("/products/on");

    await expect(
      page.getByRole("heading", { name: "温 -ON-", level: 1 }),
    ).toBeVisible();

    // 180ml 選択時の価格
    await page.getByRole("button", { name: "180ml" }).click();
    await expect(page.getByText(/1,980/)).toBeVisible();

    // 240ml 選択時の価格
    await page.getByRole("button", { name: "240ml" }).click();
    await expect(page.getByText(/2,200/)).toBeVisible();
  });

  test("KAKU商品ページが正しい価格を表示する", async ({ page }) => {
    await page.goto("/products/kaku");

    await expect(
      page.getByRole("heading", { name: "拡 -KAKU-", level: 1 }),
    ).toBeVisible();

    await page.getByRole("button", { name: "240ml" }).click();
    await expect(page.getByText(/2,420/)).toBeVisible();

    await page.getByRole("button", { name: "280ml" }).click();
    await expect(page.getByText(/2,620/)).toBeVisible();
  });

  test("カートに追加ボタンが表示される", async ({ page }) => {
    await page.goto("/products/on");
    await expect(
      page.getByRole("button", { name: "カートに追加" }),
    ).toBeVisible();
  });

  test("サイズボタンが押下可能", async ({ page }) => {
    await page.goto("/products/on");
    const btn180 = page.getByRole("button", { name: "180ml" });
    const btn240 = page.getByRole("button", { name: "240ml" });
    await expect(btn180).toBeVisible();
    await expect(btn240).toBeVisible();

    await btn240.click();
    await expect(btn240).toHaveAttribute("aria-pressed", "true");
    await expect(btn180).toHaveAttribute("aria-pressed", "false");
  });
});
