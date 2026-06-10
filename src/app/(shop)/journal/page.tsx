"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate";

const CATEGORIES = [
  { id: "all", label: "すべて" },
  { id: "case-study", label: "導入事例" },
  { id: "ceramics", label: "食器のこと" },
  { id: "opening", label: "開業準備" },
  { id: "operation", label: "カフェ運営" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const BLOG_POSTS = [
  {
    slug: "brand-rim-experience",
    category: "ceramics" as CategoryId,
    categoryLabel: "食器のこと",
    title: "ブランドは口元で完成する。口当たり・縁の厚み・釉薬の艶が与える体験の差。",
    excerpt:
      "カフェで出会う一杯の印象は、コーヒーの味だけで決まらない。器の縁が唇に触れる瞬間、そこにブランドの個性が宿る。",
    date: "2025-12-10",
    image: "/images/home/blog-1.svg",
  },
  {
    slug: "opening-30days",
    category: "opening" as CategoryId,
    categoryLabel: "開業準備",
    title: "開業30日前の決断 〜検討→注文→納品、\u201c間に合わせる段取り\u201dの全記録〜",
    excerpt:
      "「もう時間がない」と思っていた。でも動いてみると、意外と間に合う道があった。開業直前にオリジナル食器を発注した記録。",
    date: "2025-11-20",
    image: "/images/home/blog-2.svg",
  },
  {
    slug: "small-roastery-branding",
    category: "case-study" as CategoryId,
    categoryLabel: "導入事例",
    title: "【導入事例】小さな焙煎所が\u201c統一感\u201dで席単価を上げた話",
    excerpt:
      "席数8席のマイクロロースタリー。食器をブランド化したことで、お客様の滞在時間と客単価がどう変わったか。",
    date: "2025-10-15",
    image: "/images/home/blog-3.svg",
  },
  {
    slug: "latte-art-vessel",
    category: "ceramics" as CategoryId,
    categoryLabel: "食器のこと",
    title: "ラテアートを最大限に引き出す器の条件とは？バリスタに聞いてみた。",
    excerpt:
      "口径・深さ・素材感。ラテアートの美しさは器選びから始まる。第一線で活躍するバリスタへのインタビュー。",
    date: "2025-09-28",
    image: "/images/home/blog-1.svg",
  },
  {
    slug: "cafe-opening-checklist",
    category: "opening" as CategoryId,
    categoryLabel: "開業準備",
    title: "カフェ開業の備品チェックリスト。食器選びで後悔しないための7つのポイント。",
    excerpt:
      "開業準備の中でも後回しにされがちな食器選び。でもここがブランドの印象を大きく左右する。開業前に確認したいポイントをまとめました。",
    date: "2025-09-05",
    image: "/images/home/blog-2.svg",
  },
  {
    slug: "seasonal-menu-vessel",
    category: "operation" as CategoryId,
    categoryLabel: "カフェ運営",
    title: "季節のメニューに合わせて器を変える。常連が喜ぶ小さな仕掛け。",
    excerpt:
      "定番メニューはそのまま、器だけ季節で変える。それだけでSNS投稿が増え、リピーターが「また来たくなる」理由になった。",
    date: "2025-08-18",
    image: "/images/home/blog-3.svg",
  },
] as const;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filtered =
    activeCategory === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        {/* Page Header */}
        <FadeUp>
          <h1 className="text-xl font-semibold sm:text-2xl">Journal</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            食器のこと、カフェのこと、つくる人たちの話。
          </p>
        </FadeUp>

        {/* Category Filter */}
        <FadeUp>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Articles Grid */}
        <StaggerChildren
          className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={80}
        >
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="mt-4 flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {post.categoryLabel}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    {post.date.replace(/-/g, ".")}
                  </span>
                </div>
                <h2 className="mt-2 text-sm font-semibold leading-relaxed text-foreground sm:text-base">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                  読む
                  <ArrowRight className="size-3 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </StaggerChildren>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-sm text-muted-foreground">
            該当する記事はまだありません。
          </div>
        )}
      </div>
    </div>
  );
}
