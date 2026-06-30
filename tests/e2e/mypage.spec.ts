import { test, expect } from "@playwright/test";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@cafora-dev.jp";
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "testpass123";

test.describe("マイページ（注文履歴）", () => {
  test("ログイン後にマイページが表示される", async ({ page }) => {
    await page.goto("/account");
    await page.locator('input[type="email"]').fill(TEST_EMAIL);
    await page.locator('input[type="password"]').fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByText(/様/)).toBeVisible({ timeout: 10000 });
  });

  test("注文履歴がある場合は注文カード、ない場合は空状態を表示する", async ({ page }) => {
    await page.goto("/account");
    await page.locator('input[type="email"]').fill(TEST_EMAIL);
    await page.locator('input[type="password"]').fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "ログイン" }).click();
    await page.waitForTimeout(3000);

    const hasOrders = await page.getByText(/注文番号/).isVisible();
    if (hasOrders) {
      const reorderLink = page.getByRole("link", { name: "再購入" }).first();
      if (await reorderLink.isVisible()) {
        const href = await reorderLink.getAttribute("href");
        expect(href).toMatch(/\/products\/(on|kaku)/);
      }
    } else {
      await expect(
        page.getByText("注文した履歴はありません。"),
      ).toBeVisible();
    }
  });
});
