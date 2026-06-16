import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const DEFAULT_COLORS = [
  { name: "グレー", nameEn: "Gray", hexCode: "#A89A8F" },
  { name: "チャコール", nameEn: "Charcoal", hexCode: "#3A3A3A" },
  { name: "モカ", nameEn: "Mocha", hexCode: "#6B4E3D" },
  { name: "モスグリーン", nameEn: "MossGreen", hexCode: "#8C8660" },
  { name: "ブルーグレー", nameEn: "BlueGray", hexCode: "#6B7683" },
  { name: "テラコッタ", nameEn: "Terracotta", hexCode: "#C75B39" },
] as const;

const LATTE_BOWL_ZONES = [
  { name: "全体", nameEn: "body" },
  { name: "縁", nameEn: "rim" },
  { name: "取っ手", nameEn: "handle" },
] as const;

const pool = new pg.Pool({
  connectionString: process.env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // カラーの登録
  const colors = await Promise.all(
    DEFAULT_COLORS.map((color, index) =>
      prisma.color.upsert({
        where: { id: color.nameEn?.toLowerCase() ?? `color-${index}` },
        update: {},
        create: {
          id: color.nameEn?.toLowerCase() ?? `color-${index}`,
          name: color.name,
          nameEn: color.nameEn ?? null,
          hexCode: color.hexCode,
          sortOrder: index,
          isActive: true,
        },
      })
    )
  );
  console.log(`Created ${colors.length} colors`);

  // ラテボウル（初期商品）
  const latteBowl = await prisma.product.upsert({
    where: { slug: "latte-bowl" },
    update: {},
    create: {
      slug: "latte-bowl",
      name: "ラテボウル",
      nameEn: "Latte Bowl",
      description:
        "カフェラテやスープにぴったりの大きめボウル。ロゴ転写と6色のカラーカスタマイズで、お店のオリジナルアイテムに。",
      basePrice: 2800,
      category: "latte-bowl",
      isActive: true,
      sortOrder: 0,
    },
  });
  console.log(`Created product: ${latteBowl.name}`);

  // ラテボウルのカラーゾーン
  const zones = await Promise.all(
    LATTE_BOWL_ZONES.map((zone, index) =>
      prisma.colorZone.upsert({
        where: { id: `latte-bowl-${zone.nameEn}` },
        update: {},
        create: {
          id: `latte-bowl-${zone.nameEn}`,
          productId: latteBowl.id,
          name: zone.name,
          nameEn: zone.nameEn,
          sortOrder: index,
        },
      })
    )
  );
  console.log(`Created ${zones.length} color zones for ${latteBowl.name}`);

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
