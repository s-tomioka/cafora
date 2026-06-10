import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Direct connection (port 5432) - CLI操作（マイグレーション・db push）用
    url: process.env["DIRECT_URL"],
  },
});
