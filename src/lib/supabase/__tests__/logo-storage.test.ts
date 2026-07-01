import { uploadLogoAsset, deleteLogoAsset } from "@/lib/supabase/logo-storage";

// Supabase クライアントをモック化
const mockUpload = jest.fn();
const mockList = jest.fn();
const mockRemove = jest.fn();
const mockFrom = jest.fn(() => ({
  upload: mockUpload,
  list: mockList,
  remove: mockRemove,
}));
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    storage: { from: mockFrom },
  })),
}));

// fetch をモック化（dataURL → Blob 変換用）
global.fetch = jest.fn().mockResolvedValue({
  blob: () => Promise.resolve(new Blob(["fake-image"], { type: "image/png" })),
});

// 環境変数を設定
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

const FAKE_DATA_URL = "data:image/png;base64,abc123";
const META = { slug: "on", size: "180ml", colorEn: "gray" };

describe("uploadLogoAsset", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpload.mockResolvedValue({ error: null });
  });

  it("returns an assetId in {timestamp}-{8hex} format", async () => {
    const { assetId } = await uploadLogoAsset(
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      META,
    );
    expect(assetId).toMatch(/^\d+-[0-9a-f]{8}$/);
  });

  it("uploads exactly 3 files (original, logo, sample)", async () => {
    await uploadLogoAsset(FAKE_DATA_URL, FAKE_DATA_URL, FAKE_DATA_URL, META);
    expect(mockUpload).toHaveBeenCalledTimes(3);
  });

  it("uploads original- prefixed file", async () => {
    const { assetId } = await uploadLogoAsset(
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      META,
    );
    const paths = mockUpload.mock.calls.map((c) => c[0] as string);
    expect(paths.some((p) => p === `${assetId}/original-180ml-gray.png`)).toBe(true);
  });

  it("uploads logo- prefixed file", async () => {
    const { assetId } = await uploadLogoAsset(
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      META,
    );
    const paths = mockUpload.mock.calls.map((c) => c[0] as string);
    expect(paths.some((p) => p === `${assetId}/logo-180ml-gray.png`)).toBe(true);
  });

  it("uploads sample- prefixed file", async () => {
    const { assetId } = await uploadLogoAsset(
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      META,
    );
    const paths = mockUpload.mock.calls.map((c) => c[0] as string);
    expect(paths.some((p) => p === `${assetId}/sample-180ml-gray.png`)).toBe(true);
  });

  it("sanitizes special characters in size/colorEn for filenames", async () => {
    const { assetId } = await uploadLogoAsset(
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      FAKE_DATA_URL,
      { slug: "kaku", size: "240ml", colorEn: "Blue Gray" },
    );
    const paths = mockUpload.mock.calls.map((c) => c[0] as string);
    expect(paths.some((p) => p === `${assetId}/logo-240ml-Blue-Gray.png`)).toBe(true);
  });

  it("throws when upload fails", async () => {
    mockUpload.mockResolvedValueOnce({ error: { message: "Storage full" } });
    await expect(
      uploadLogoAsset(FAKE_DATA_URL, FAKE_DATA_URL, FAKE_DATA_URL, META),
    ).rejects.toThrow("Logo upload failed");
  });
});

describe("deleteLogoAsset", () => {
  const ASSET_ID = "1751234567890-a1b2c3d4";

  beforeEach(() => {
    jest.clearAllMocks();
    mockList.mockResolvedValue({
      data: [
        { name: "original-180ml-gray.png" },
        { name: "logo-180ml-gray.png" },
        { name: "sample-180ml-gray.png" },
      ],
      error: null,
    });
    mockRemove.mockResolvedValue({ error: null });
  });

  it("lists files in the assetId folder then removes them", async () => {
    await deleteLogoAsset(ASSET_ID);
    expect(mockList).toHaveBeenCalledWith(ASSET_ID);
    expect(mockRemove).toHaveBeenCalledWith([
      `${ASSET_ID}/original-180ml-gray.png`,
      `${ASSET_ID}/logo-180ml-gray.png`,
      `${ASSET_ID}/sample-180ml-gray.png`,
    ]);
  });

  it("does nothing when folder is empty", async () => {
    mockList.mockResolvedValue({ data: [], error: null });
    await deleteLogoAsset(ASSET_ID);
    expect(mockRemove).not.toHaveBeenCalled();
  });

  it("does nothing when list returns null", async () => {
    mockList.mockResolvedValue({ data: null, error: null });
    await deleteLogoAsset(ASSET_ID);
    expect(mockRemove).not.toHaveBeenCalled();
  });
});
