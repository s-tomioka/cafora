import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";

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
          <CartDrawer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
