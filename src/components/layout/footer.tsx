import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { CaforaLogo } from "@/components/ui/cafora-logo";

const FOOTER_LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/products", label: "商品を探す" },
  { href: "/barista", label: "WITH BARISTAS" },
  { href: "/brand", label: "CAFORAについて" },
  { href: "/journal", label: "ジャーナル" },
  { href: "/faq", label: "よくあるご質問・お問合せ" },
  { href: "/company", label: "会社概要" },
  { href: "/privacy", label: "プライバシーポリシー" },
] as const;

export function Footer() {
  return (
    <footer className="relative bg-foreground text-background">
      <div className="container-cafora py-12 sm:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <CaforaLogo className="h-6 w-auto text-white sm:h-7" />
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm text-background/70 transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-background/10 pt-6">
          <p className="text-xs text-background/50">
            Copyright &copy; {new Date().getFullYear()} CAFORA. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top */}
      <a
        href="#"
        className="absolute bottom-6 right-6 inline-flex size-10 items-center justify-center rounded-full border border-background/20 text-background/60 transition-colors hover:bg-background/10 hover:text-background sm:size-12"
        aria-label="ページトップへ"
      >
        <ArrowUp className="size-4 sm:size-5" />
      </a>
    </footer>
  );
}
