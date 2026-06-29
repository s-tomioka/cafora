import { test, expect } from "@playwright/test";

// テスト用ユニークメールアドレス（並列実行でも衝突しないよう timestamp を使用）
function uniqueEmail() {
  return `e2e-${Date.now()}@cafora-test.dev`;
}

test.describe("認証", () => {
  test("新規登録してメール確認ページへ遷移する", async ({ page }) => {
    const email = uniqueEmail();

    await page.goto("/account/register");
    await page.getByLabel(/メールアドレス/).fill(email);
    await page.getByLabel(/^パスワード$/).fill("testpass123");
    await page.getByLabel(/確認/).fill("testpass123");
    await page.getByRole("button", { name: /新規作成/ }).click();

    await expect(page).toHaveURL(/verify-sent/, { timeout: 10000 });
  });

  test("パスワードが短すぎる場合にエラーを表示する", async ({ page }) => {
    await page.goto("/account/register");
    await page.getByLabel(/メールアドレス/).fill("test@example.com");
    await page.getByLabel(/^パスワード$/).fill("short");
    await page.getByLabel(/確認/).fill("short");
    await page.getByRole("button", { name: /新規作成/ }).click();

    await expect(page.getByText(/8文字以上/)).toBeVisible();
  });

  test("パスワード不一致でエラーを表示する", async ({ page }) => {
    await page.goto("/account/register");
    await page.getByLabel(/メールアドレス/).fill("test@example.com");
    await page.getByLabel(/^パスワード$/).fill("password123");
    await page.getByLabel(/確認/).fill("different456");
    await page.getByRole("button", { name: /新規作成/ }).click();

    await expect(page.getByText(/一致しません/)).toBeVisible();
  });

  test("誤ったパスワードでログインエラーを表示する", async ({ page }) => {
    await page.goto("/account");
    await page.getByLabel(/メールアドレス/).fill("wrong@example.com");
    await page.getByLabel(/パスワード/).fill("wrongpass");
    await page.getByRole("button", { name: /ログイン/ }).click();

    await expect(
      page.getByText(/正しくありません/),
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("認証フロー（登録済みユーザー）", () => {
  // このテストはユーザー登録後に手動でメール確認が必要なため、
  // 既存テストアカウントを使う
  const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@cafora-dev.jp";
  const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "testpass123";

  test("ログイン → マイページ表示 → ログアウト", async ({ page }) => {
    await page.goto("/account");

    await page.getByLabel(/メールアドレス/).fill(TEST_EMAIL);
    await page.getByLabel(/パスワード/).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /ログイン/ }).click();

    // ログイン後: 顧客情報が表示される
    await expect(page.getByText(/様/)).toBeVisible({ timeout: 10000 });

    // ログアウト
    await page.getByRole("button", { name: /ログアウト/ }).click();
    await expect(page.getByRole("button", { name: /ログイン/ })).toBeVisible({
      timeout: 5000,
    });
  });
});
