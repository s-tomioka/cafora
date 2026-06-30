import { test, expect } from "@playwright/test";

function uniqueEmail() {
  return `e2e-${Date.now()}@cafora-test.dev`;
}

test.describe("認証", () => {
  test("新規登録してメール確認ページへ遷移する", async ({ page }) => {
    const email = uniqueEmail();

    await page.goto("/account/register");
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').first().fill("testpass123");
    await page.locator('input[type="password"]').last().fill("testpass123");
    await page.getByRole("button", { name: "新規作成" }).click();

    await expect(page).toHaveURL(/verify-sent/, { timeout: 10000 });
  });

  test("パスワード不一致でエラーを表示する", async ({ page }) => {
    await page.goto("/account/register");
    await page.locator('input[type="email"]').fill("test@example.com");
    await page.locator('input[type="password"]').first().fill("password123");
    await page.locator('input[type="password"]').last().fill("different456");
    await page.getByRole("button", { name: "新規作成" }).click();

    await expect(page.getByText(/一致しません/)).toBeVisible();
  });

  test("誤ったパスワードでログインエラーを表示する", async ({ page }) => {
    await page.goto("/account");
    await page.locator('input[type="email"]').fill("wrong@example.com");
    await page.locator('input[type="password"]').fill("wrongpass");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(
      page.getByText(/正しくありません/),
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("認証フロー（登録済みユーザー）", () => {
  const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@cafora-dev.jp";
  const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "testpass123";

  test("ログイン → マイページ表示 → ログアウト", async ({ page }) => {
    await page.goto("/account");
    await page.locator('input[type="email"]').fill(TEST_EMAIL);
    await page.locator('input[type="password"]').fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByText(/様/)).toBeVisible({ timeout: 10000 });

    await page.getByRole("button", { name: "ログアウト" }).click();
    await expect(
      page.getByRole("button", { name: "ログイン" }),
    ).toBeVisible({ timeout: 5000 });
  });
});
