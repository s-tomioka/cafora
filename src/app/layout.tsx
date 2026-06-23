import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { IS_PRE_OPEN } from "@/constants";

// 本番のみ計測する。NEXT_PUBLIC_GA_ID は Vercel の Production スコープにのみ登録すること
// （Preview / ローカルでは未定義になり、GA タグは出力されない）。
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false, // CJKフォントはファイルサイズが大きいためpreloadを無効化
});

export const metadata: Metadata = {
  title: {
    default: "CAFORA | カフェのための、あなただけの陶器",
    template: "%s | CAFORA",
  },
  description:
    "カフェのための、あなただけの陶器。ロゴ転写・7色カラー展開で、お店独自のブランド食器をお作りします。",
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
      "ロゴ転写・7色カラー展開で、お店独自のブランド食器をお作りします。",
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
    <html lang="ja" className={notoSerifJP.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0"
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <ScrollToTop />
          {children}
          {!IS_PRE_OPEN && <CartDrawer />}
          <Toaster position="top-right" />
        </CartProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
