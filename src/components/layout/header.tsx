"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShoppingBag, User } from "lucide-react";
import { CaforaLogo } from "@/components/ui/cafora-logo";
import { IS_PRE_OPEN, PRE_OPEN_SALE_LABEL } from "@/constants";
import { useCart } from "@/contexts/cart-context";

const NAV_ITEMS = [
  { href: "/products", label: "商品を探す" },
  { href: "/barista", label: "WITH BARISTAS" },
  { href: "/brand", label: "CAFORAについて" },
  { href: "/journal", label: "ジャーナル" },
  { href: "/faq", label: "よくあるご質問・お問合せ" },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => { setMounted(true); }, []);

  const openMenu = () => {
    setMobileMenuOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuVisible(true));
    });
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setTimeout(() => setMobileMenuOpen(false), 300);
  };

  // スクロール禁止
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const mobileMenu = mobileMenuOpen && mounted ? (
    <div className="fixed inset-0 z-[9999] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity duration-300"
        style={{ opacity: menuVisible ? 1 : 0 }}
        onClick={closeMenu}
      />

      {/* Menu Panel */}
      <div
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          backgroundColor: "#ffffff",
          opacity: menuVisible ? 1 : 0,
        }}
      >
        {/* Close button — ハンバーガーと同じ位置 (px-4, h-14) */}
        <div className="flex h-14 items-center px-4">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-foreground"
            onClick={closeMenu}
            aria-label="メニューを閉じる"
          >
            <div className="relative flex h-5 w-5 flex-col items-center justify-center">
              <span className="block h-px w-5 bg-current origin-center" style={{ transform: "translateY(0.5px) rotate(45deg)" }} />
              <span className="block h-px w-5 bg-current" style={{ opacity: 0 }} />
              <span className="block h-px w-5 bg-current origin-center" style={{ transform: "translateY(-0.5px) rotate(-45deg)" }} />
            </div>
          </button>
        </div>
        {/* Nav items & buttons */}
        <div className="px-6 pt-4">
          <nav className="flex flex-col gap-6">
            {[{ href: "/", label: "ホーム" }, ...NAV_ITEMS].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-foreground transition-colors hover:text-foreground/60"
                onClick={closeMenu}
                style={{
                  opacity: menuVisible ? 1 : 0,
                  transform: menuVisible ? "translateY(0)" : "translateY(-8px)",
                  transition: `opacity 0.3s ease ${0.05 + i * 0.05}s, transform 0.3s ease ${0.05 + i * 0.05}s`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Account & Cart */}
          <div
            className="mt-10 flex gap-3"
            style={{
              opacity: menuVisible ? 1 : 0,
              transform: menuVisible ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.3s ease 0.4s, transform 0.3s ease 0.4s",
            }}
          >
            <Link
              href="/account"
              className="flex flex-1 items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
              onClick={closeMenu}
            >
              <User className="size-4" />
              アカウント
            </Link>
            {!IS_PRE_OPEN && (
              <Link
                href="/cart"
                className="flex flex-1 items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                onClick={closeMenu}
              >
                <ShoppingBag className="size-4" />
                カート
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        {IS_PRE_OPEN && (
          <div className="bg-[#333333] py-2 text-center text-[14px] text-white">
            {PRE_OPEN_SALE_LABEL}
          </div>
        )}
        <header className="w-full bg-background/95 backdrop-blur-sm">
        <div className="container-cafora flex h-14 items-center sm:h-16">
          {/* Mobile: Hamburger — flex-1 でロゴを中央に */}
          <div className="flex flex-1 lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-foreground"
              onClick={openMenu}
              aria-label="メニューを開く"
            >
              {/* ハンバーガーアイコン（アニメーション付き） */}
              <div className="relative flex h-5 w-5 flex-col justify-center gap-[5px]">
                <span className="block h-px w-5 bg-current transition-all duration-300 ease-in-out" />
                <span className="block h-px w-5 bg-current transition-all duration-300 ease-in-out" />
                <span className="block h-px w-5 bg-current transition-all duration-300 ease-in-out" />
              </div>
            </button>
          </div>

          {/* Logo — SPで中央揃え */}
          <Link href="/" className="inline-flex items-center lg:flex-none">
            <CaforaLogo className="h-5 w-auto text-foreground sm:h-6" />
          </Link>

          {/* Desktop Nav — 右寄せ */}
          <nav className="hidden flex-1 items-center justify-end gap-6 xl:gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2 lg:flex-none lg:ml-6">
            <Link
              href="/account"
              className="inline-flex items-center justify-center rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              aria-label="アカウント"
            >
              <User className="size-5" />
            </Link>
            {!IS_PRE_OPEN && (
              <Link
                href="/cart"
                className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="カート"
              >
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
                )}
              </Link>
            )}
          </div>
        </div>
        </header>
      </div>

      {/* Portal: headerのstacking contextの外にレンダリング */}
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
