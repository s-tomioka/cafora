import { createClient } from "@supabase/supabase-js";

const BUCKET = "logos";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set");
  return createClient(url, key);
}

function randomHex8(): string {
  const arr = new Uint8Array(4);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

type LogoMeta = { slug: string; size: string; colorEn: string };

async function uploadFile(
  supabase: ReturnType<typeof getClient>,
  path: string,
  blob: Blob,
): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: "image/png", upsert: false });
  if (error) throw new Error(`Logo upload failed: ${error.message}`);
}

export async function uploadLogoAsset(
  originalDataUrl: string,
  logoDataUrl: string,
  compositeDataUrl: string,
  meta: LogoMeta,
): Promise<{ assetId: string }> {
  const supabase = getClient();
  const assetId = `${Date.now()}-${randomHex8()}`;
  const suffix = `${meta.size}-${meta.colorEn}`.replace(/[^a-zA-Z0-9-]/g, "-");

  const [originalBlob, logoBlob, compositeBlob] = await Promise.all([
    dataUrlToBlob(originalDataUrl),
    dataUrlToBlob(logoDataUrl),
    dataUrlToBlob(compositeDataUrl),
  ]);

  await Promise.all([
    uploadFile(supabase, `${assetId}/original-${suffix}.png`, originalBlob),
    uploadFile(supabase, `${assetId}/logo-${suffix}.png`, logoBlob),
    uploadFile(supabase, `${assetId}/sample-${suffix}.png`, compositeBlob),
  ]);

  return { assetId };
}

export async function deleteLogoAsset(assetId: string): Promise<void> {
  const supabase = getClient();
  const { data: files } = await supabase.storage.from(BUCKET).list(assetId);
  if (!files?.length) return;
  const paths = files.map((f) => `${assetId}/${f.name}`);
  await supabase.storage.from(BUCKET).remove(paths);
}
