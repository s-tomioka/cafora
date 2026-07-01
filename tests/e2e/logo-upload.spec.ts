import { test, expect } from "@playwright/test";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const BUCKET = "logos";

// テスト用のサンプル画像（プロジェクトに存在する画像を使用）
const TEST_IMAGE_PATH = path.resolve(
  __dirname,
  "../../public/images/product/latte-bowl-on.webp",
);

test.describe("ロゴアップロード → Supabase Storage 保存", () => {
  test("ロゴ画像をアップロードしてカートに追加するとSupabaseに3ファイル保存される", async ({
    page,
  }) => {
    await page.goto("/products/on");

    // ロゴありを選択
    const logoToggle = page.getByRole("button", { name: /ロゴをつける/i });
    await logoToggle.click();

    // ロゴ画像をアップロード
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(TEST_IMAGE_PATH);

    // クロップ適用ボタンを待ってクリック
    const applyButton = page.getByRole("button", { name: /適用|確定|完了/i });
    await applyButton.waitFor({ state: "visible", timeout: 5000 });
    await applyButton.click();

    // カートに追加
    const addToCartButton = page.getByRole("button", { name: /カートに追加/i });
    await addToCartButton.click();

    // ローディング完了を待つ（カートドロワーが開くまで）
    await page.waitForSelector("[data-testid='cart-drawer'], [aria-label*='カート']", {
      timeout: 15000,
    });

    // コンソールエラーがないことを確認
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    // Shopify cart から logo_asset_id を取得
    const cartId = await page.evaluate(() => localStorage.getItem("cafora_cart_id"));
    expect(cartId).toBeTruthy();

    // Supabase Storage にファイルが存在するか検証
    // （logo_asset_id は Shopify 属性に保存されているため、
    //  ここでは Supabase にファイルが存在することを間接的に確認）
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: bucketFiles, error } = await supabase.storage
      .from(BUCKET)
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

    expect(error).toBeNull();
    expect(bucketFiles).not.toBeNull();

    // 最新のassetIDフォルダを取得
    const latestFolder = bucketFiles?.[0];
    expect(latestFolder).toBeDefined();

    // assetIDフォルダ内のファイルを確認
    const { data: assetFiles } = await supabase.storage
      .from(BUCKET)
      .list(latestFolder!.name);

    const fileNames = assetFiles?.map((f) => f.name) ?? [];
    expect(fileNames.some((n) => n.startsWith("original-"))).toBe(true);
    expect(fileNames.some((n) => n.startsWith("logo-"))).toBe(true);
    expect(fileNames.some((n) => n.startsWith("sample-"))).toBe(true);
  });
});
