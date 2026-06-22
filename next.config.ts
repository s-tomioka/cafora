import type { NextConfig } from "next";

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
  // プレオープン中はジャーナルを非公開。準備完了後にこのリダイレクトを削除する。
  // permanent: false（307）でブラウザにキャッシュさせない
  async redirects() {
    return [
      {
        source: "/journal",
        destination: "/",
        permanent: false,
      },
      {
        source: "/journal/:slug*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
