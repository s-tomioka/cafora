import type { NextConfig } from "next";
import { IS_PRE_OPEN, IS_JOURNAL_ENABLED } from "./src/flags";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // 非公開ルートの redirect はフラグで出し分ける（src/flags.ts）。
  // permanent: false（307）でブラウザにキャッシュさせない。
  // ※ redirect はビルド/起動時に評価されるため、フラグ変更後は再デプロイが必要。
  async redirects() {
    const list = [
      // 開発者・デザイナー確認用のデザインシステムページ（恒久的に外部非公開）
      { source: "/design", destination: "/", permanent: false },
    ];

    // プレオープン中はアカウント（マイページ）を非公開
    if (IS_PRE_OPEN) {
      list.push(
        { source: "/account", destination: "/", permanent: false },
        { source: "/account/:slug*", destination: "/", permanent: false },
      );
    }

    // ジャーナル未公開中は /journal を非公開
    if (!IS_JOURNAL_ENABLED) {
      list.push(
        { source: "/journal", destination: "/", permanent: false },
        { source: "/journal/:slug*", destination: "/", permanent: false },
      );
    }

    return list;
  },
};

export default nextConfig;
