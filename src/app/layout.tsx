import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { IS_PRE_OPEN } from "@/constants";

// 本番のみ計測する。NEXT_PUBLIC_GA_ID は Vercel の Production スコープにのみ登録すること
// （Preview / ローカルでは未定義になり、GA タグは出力されない）。
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Tag Manager コンテナID（全環境で発火。環境の出し分けは GTM 側で管理）
const GTM_ID = "GTM-TBTLHNHS";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false, // CJKフォントはファイルサイズが大きいためpreloadを無効化
});

export const metadata: Metadata = {
  // opengraph-image / twitter-image の絶対URL生成に使用（本番URL）
  metadataBase: new URL("https://cafora.jp"),
  title: {
    default: "CAFORA | カフェのための、あなただけの陶器",
    template: "%s | CAFORA",
  },
  description:
    "カフェのための、あなただけの陶器。ロゴ転写・6色カラー展開で、お店独自のブランド食器をお作りします。",
  keywords: [
    "カフェ",
    "陶器",
    "カスタマイズ",
    "ロゴ転写",
    "ラテボウル",
    "ブランド食器",
    "CAFORA",
  ],
  openGraph: {
    title: "CAFORA | カフェのための、あなただけの陶器",
    description:
      "ロゴ転写・6色カラー展開で、お店独自のブランド食器をお作りします。",
    type: "website",
    locale: "ja_JP",
    siteName: "CAFORA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSerifJP.variable} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0"
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <CartProvider>
          <ScrollToTop />
          {children}
          {!IS_PRE_OPEN && <CartDrawer />}
          <Toaster position="top-right" />
        </CartProvider>
      </body>
      <GoogleTagManager gtmId={GTM_ID} />
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
