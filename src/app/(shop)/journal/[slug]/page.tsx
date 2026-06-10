import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { FadeUp, StaggerChildren } from "@/components/ui/scroll-animate";

// ==========================================
// 記事データ（将来的にはCMS連携を想定）
// ==========================================
const POSTS = [
  {
    slug: "brand-rim-experience",
    category: "食器のこと",
    title:
      "ブランドは口元で完成する。口当たり・縁の厚み・釉薬の艶が与える体験の差。",
    date: "2025-12-10",
    image: "/images/home/blog-1.svg",
    body: [
      {
        type: "lead" as const,
        text: "カフェで出会う一杯の印象は、コーヒーの味だけで決まらない。器の縁が唇に触れる瞬間、そこにブランドの個性が宿る。",
      },
      {
        type: "heading" as const,
        text: "飲み口は、最初の接点",
      },
      {
        type: "paragraph" as const,
        text: "器を手に取り、口に運ぶ。その動作の中で、飲み口の厚みはコーヒーやラテの印象を大きく左右します。薄い縁はなめらかさを演出し、厚い縁はどっしりとした存在感を与える。わずか1〜2mmの差が、体験のトーンを変えてしまう。",
      },
      {
        type: "paragraph" as const,
        text: "釉薬の艶もまた、視覚だけでなく触覚としての印象を作ります。マットな質感は落ち着きと素朴さを。光沢のある仕上がりはクリーンさと品格を。どちらが良いというわけではなく、ブランドのトーンとの一致が大切です。",
      },
      {
        type: "heading" as const,
        text: "縁の厚み設計について",
      },
      {
        type: "paragraph" as const,
        text: "CAFORAでは、口当たりを設計の出発点として考えています。3Dデータで形状を何度も修正し、実際にラテやコーヒーを注いで試飲することを繰り返す。その反復の中から、「これだ」と感じる縁の形が生まれます。",
      },
      {
        type: "paragraph" as const,
        text: "一杯の印象は、最初の一口で8割が決まると言っても過言ではありません。飲み口はブランドの声であり、体験の入り口です。",
      },
    ],
  },
  {
    slug: "opening-30days",
    category: "開業準備",
    title:
      "開業30日前の決断 〜検討→注文→納品、\u201c間に合わせる段取り\u201dの全記録〜",
    date: "2025-11-20",
    image: "/images/home/blog-2.svg",
    body: [
      {
        type: "lead" as const,
        text: "「もう時間がない」と思っていた。でも動いてみると、意外と間に合う道があった。開業直前にオリジナル食器を発注した記録。",
      },
      {
        type: "heading" as const,
        text: "開業30日前、食器がまだ決まっていなかった",
      },
      {
        type: "paragraph" as const,
        text: "物件の契約、内装の打ち合わせ、スタッフの採用。やることが山積みの中で、食器の選定は後回しになっていた。でも開業日は変えられない。そんな状況でCAFORAに問い合わせをしたのが、開業ちょうど30日前だった。",
      },
      {
        type: "heading" as const,
        text: "検討から決定まで3日間",
      },
      {
        type: "paragraph" as const,
        text: "サンプルを翌日発送してもらい、翌々日に届いた。実際に手に取り、コーヒーを注いでみると、迷いがなくなった。縁の薄さ、手のひらに収まる重み、スタッキングのしやすさ。「これだ」と思えたのは、口当たりを試した瞬間だった。",
      },
      {
        type: "paragraph" as const,
        text: "注文確定から納品まで約3週間。開業7日前に食器が届いた。想像していたより、ずっと間に合った。",
      },
    ],
  },
  {
    slug: "small-roastery-branding",
    category: "導入事例",
    title: "【導入事例】小さな焙煎所が\u201c統一感\u201dで席単価を上げた話",
    date: "2025-10-15",
    image: "/images/home/blog-3.svg",
    body: [
      {
        type: "lead" as const,
        text: "席数8席のマイクロロースタリー。食器をブランド化したことで、お客様の滞在時間と客単価がどう変わったか。",
      },
      {
        type: "heading" as const,
        text: "「器がバラバラ」という違和感",
      },
      {
        type: "paragraph" as const,
        text: "オーナーの田中さんが最初に感じていた課題は、食器の統一感のなさだった。コーヒーの品質にはこだわっているのに、器だけが既製品の寄せ集め。空間のトーンと器が合っていない感覚がずっとあった。",
      },
      {
        type: "heading" as const,
        text: "オリジナル食器導入後の変化",
      },
      {
        type: "paragraph" as const,
        text: "CAFORAの器を導入して3ヶ月。SNSへの投稿数が増え、「この器、どこのですか？」と聞かれる機会が格段に増えた。席単価は導入前と比べ約15%向上。お客様の滞在時間も伸び、「もう1杯」という場面が増えた。",
      },
      {
        type: "paragraph" as const,
        text: "「器が変わると、コーヒーの見え方が変わる。そして、空間全体の印象が変わる」と田中さんは話す。食器への投資は、ブランドへの投資だった。",
      },
    ],
  },
  {
    slug: "latte-art-vessel",
    category: "食器のこと",
    title: "ラテアートを最大限に引き出す器の条件とは？バリスタに聞いてみた。",
    date: "2025-09-28",
    image: "/images/home/blog-1.svg",
    body: [
      {
        type: "lead" as const,
        text: "口径・深さ・素材感。ラテアートの美しさは器選びから始まる。第一線で活躍するバリスタへのインタビュー。",
      },
      {
        type: "heading" as const,
        text: "ラテアートと器の関係",
      },
      {
        type: "paragraph" as const,
        text: "ラテアートの美しさは、スチームミルクの技術だけで決まるわけではない。器の口径、深さ、内側の角度によって、ミルクの流れ方が変わり、アートの描きやすさが大きく変わってくる。",
      },
      {
        type: "paragraph" as const,
        text: "バリスタの山本さんによれば、「理想の口径は内径12〜13cm程度。深すぎると注ぎにくく、浅すぎると泡が安定しない」とのこと。内側がなだらかなカーブを描く器は、ミルクが自然に広がり、アートが描きやすくなる。",
      },
    ],
  },
  {
    slug: "cafe-opening-checklist",
    category: "開業準備",
    title:
      "カフェ開業の備品チェックリスト。食器選びで後悔しないための7つのポイント。",
    date: "2025-09-05",
    image: "/images/home/blog-2.svg",
    body: [
      {
        type: "lead" as const,
        text: "開業準備の中でも後回しにされがちな食器選び。でもここがブランドの印象を大きく左右する。開業前に確認したいポイントをまとめました。",
      },
      {
        type: "heading" as const,
        text: "食器選びを後回しにしてはいけない理由",
      },
      {
        type: "paragraph" as const,
        text: "カフェの開業準備は、物件・内装・設備・採用と、やることが多岐にわたります。その中で食器は「最後に揃えればいい」と思われがちですが、実はオリジナル食器の場合、発注から納品まで3〜4週間かかることもある。開業直前に慌てないためにも、早めに検討を始めることをおすすめします。",
      },
      {
        type: "heading" as const,
        text: "チェックすべき7つのポイント",
      },
      {
        type: "paragraph" as const,
        text: "①メニューとのサイズ感の相性 ②スタッキング（積み重ね）のしやすさ ③食洗機対応かどうか ④ブランドトーンとの一致 ⑤耐久性と欠けにくさ ⑥最低ロット数 ⑦カラー展開の豊富さ。この7点を基準に、複数の候補を比較することで、後悔のない選択ができます。",
      },
    ],
  },
  {
    slug: "seasonal-menu-vessel",
    category: "カフェ運営",
    title: "季節のメニューに合わせて器を変える。常連が喜ぶ小さな仕掛け。",
    date: "2025-08-18",
    image: "/images/home/blog-3.svg",
    body: [
      {
        type: "lead" as const,
        text: "定番メニューはそのまま、器だけ季節で変える。それだけでSNS投稿が増え、リピーターが「また来たくなる」理由になった。",
      },
      {
        type: "heading" as const,
        text: "器を変えるだけで、店が変わる",
      },
      {
        type: "paragraph" as const,
        text: "コーヒーの味は変わらない。でも器が変わると、お客様の反応が変わる。春はパステルトーン、秋は深みのあるテラコッタやモカ。季節に合わせて器を変えるだけで、「また来てみよう」という理由が生まれる。",
      },
      {
        type: "paragraph" as const,
        text: "常連のお客様は、器の変化に気づいてくれる。「今日は違う器ですね」という会話から、関係が深まることも多い。器はコミュニケーションのきっかけにもなります。",
      },
    ],
  },
] as const;

// ==========================================
// 関連記事（同カテゴリから最大2件）
// ==========================================
function getRelatedPosts(slug: string, category: string) {
  return POSTS.filter((p) => p.slug !== slug && p.category === category).slice(
    0,
    2
  );
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category);

  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">

        {/* Back */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          Journal
        </Link>

        {/* Article */}
        <article className="mx-auto mt-8 max-w-2xl">

          {/* Meta */}
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground/60">
                {post.date.replace(/-/g, ".")}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              {post.title}
            </h1>
          </FadeUp>

          {/* Hero Image */}
          <FadeUp className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, 672px"
            />
          </FadeUp>

          {/* Body */}
          <div className="mt-10 space-y-6">
            {post.body.map((block, i) => {
              if (block.type === "lead") {
                return (
                  <FadeUp key={i}>
                    <p className="border-l-2 border-foreground/20 pl-4 text-sm leading-[2] text-foreground/70 sm:text-base">
                      {block.text}
                    </p>
                  </FadeUp>
                );
              }
              if (block.type === "heading") {
                return (
                  <FadeUp key={i}>
                    <h2 className="pt-4 text-base font-semibold sm:text-lg">
                      {block.text}
                    </h2>
                  </FadeUp>
                );
              }
              return (
                <FadeUp key={i}>
                  <p className="text-sm leading-[2] text-muted-foreground sm:text-base">
                    {block.text}
                  </p>
                </FadeUp>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mt-16 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
              CAFORA
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl">
            <FadeUp>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
                関連記事
              </h2>
            </FadeUp>
            <StaggerChildren staggerDelay={120} className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/journal/${rel.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 336px"
                    />
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {rel.category}
                      </span>
                      <span className="text-xs text-muted-foreground/50">
                        {rel.date.replace(/-/g, ".")}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                      {rel.title}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      読む
                      <ArrowRight className="size-3 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          </div>
        )}

        {/* Back to list */}
        <div className="mx-auto mt-16 max-w-2xl">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            Journalに戻る
          </Link>
        </div>

      </div>
    </div>
  );
}
