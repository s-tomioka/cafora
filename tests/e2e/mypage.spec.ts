import { test, expect } from "@playwright/test";

const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@cafora-dev.jp";
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "testpass123";

test.describe("マイページ（注文履歴）", () => {
  test.beforeEach(async ({ page }) => {
    // APIでログイン（UIより高速）
    await page.request.post("/api/auth/login", {
      data: { email: TEST_EMAIL, password: TEST_PASSWORD },
    });
  });

  test("ログイン後にマイページが表示される", async ({ page }) => {
    // ログイン
    await page.goto("/account");
    await page.getByLabel(/メールアドレス/).fill(TEST_EMAIL);
    await page.getByLabel(/パスワード/).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /ログイン/ }).click();

    // 顧客名が表示される
    await expect(page.getByText(/様/)).toBeVisible({ timeout: 10000 });
  });

  test("注文履歴がある場合に注文カードが表示される", async ({ page }) => {
    await page.goto("/account");
    await page.getByLabel(/メールアドレス/).fill(TEST_EMAIL);
    await page.getByLabel(/パスワード/).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /ログイン/ }).click();
    await page.waitForTimeout(2000);

    // 注文があれば注文番号が表示される
    const hasOrders = await page.getByText(/注文番号/).isVisible();
    if (hasOrders) {
      // 再購入リンクが商品ページへのURLを持つ
      const reorderLink = page.getByRole("link", { name: /再購入/ }).first();
      if (await reorderLink.isVisible()) {
        const href = await reorderLink.getAttribute("href");
        expect(href).toMatch(/\/products\/(on|kaku)/);
      }
    } else {
      // 注文なしの場合のメッセージ
      await expect(page.getByText(/注文した履歴はありません/)).toBeVisible();
    }
  });
});
