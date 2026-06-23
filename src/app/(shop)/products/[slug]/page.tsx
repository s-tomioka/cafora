import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetail } from "@/components/product/product-detail";

// MVP: 2 products - 温（ON）& 拡（KAKU）
type StoryImage = {
  src: string;
  alt: string;
  afterParagraph: number; // insert after this paragraph index
};

type FeatureImage = {
  src: string;
  alt: string;
  size: "sm" | "lg";
  title: string;
  description: string;
};

const PRODUCTS: Record<
  string,
  {
    name: string;
    nameEn: string;
    capacity: string;
    description: string;
    images: string[];
    featureImages: FeatureImage[];
    otherSlug: string;
    otherName: string;
    otherNameEn: string;
    otherTagline: string;
    otherDescription: string;
    otherImage: string;
    storyLabel: string;
    storyHeading: string;
    story: string[];
    storyImages: StoryImage[];
  }
> = {
  on: {
    name: "温（ON）",
    nameEn: "Latte Bowl ON",
    capacity: "180ml",
    description:
      "ゆったりとした丸みのあるフォルムが手に馴染むラテボウル。カフェラテはもちろん、スープやデザートにも。",
    images: [
      "/images/product/on-detail-charcoal-1.webp",
      "/images/product/on-detail-charcoal-2.webp",
      "/images/product/on-detail-3.webp",
      "/images/product/on-detail-4.webp",
    ],
    featureImages: [
      {
        src: "/images/product/on-feature-1.webp",
        alt: "温（ON）高台部分",
        size: "lg",
        title: "美味しい温度を長く保つ高台",
        description:
          "高台構造による自然な保温。テーブルに直接触れる面積を減らすことで熱が逃げにくく、ラテの美味しい温度をゆっくり保ちます。",
      },
      {
        src: "/images/product/on-feature-2.webp",
        alt: "温（ON）口元アップ",
        size: "lg",
        title: "泡を感じる口元設計",
        description:
          "ミルクの泡を感じる口当たり。わずかにフラットな口元がミルクを一瞬受け止め、泡のやわらかさとラテの液体が同時に広がります。",
      },
      {
        src: "/images/product/on-feature-3.webp",
        alt: "温（ON）全体",
        size: "sm",
        title: "ミルクの泡を長く保つ器形状",
        description:
          "丸みのある器形状がミルクフォームをやさしく保ち、きめ細かな泡の層を長く維持します。ラテアートの美しさと、なめらかな口当たりを支える設計です。",
      },
      {
        src: "/images/product/on-feature-4.webp",
        alt: "温（ON）内側の曲面",
        size: "sm",
        title: "最後まで均一な味わい",
        description:
          "角のない内側の曲面設計。ミルクとエスプレッソが自然に対流し、最後の一口まで均等な味わいが続きます。",
      },
      {
        src: "/images/product/on-feature-5.webp",
        alt: "温（ON）メインショット",
        size: "lg",
        title: "手のひらで感じる温もり",
        description:
          "ラテの温度を考慮した器の厚み。持ち上げた瞬間、ラテの温かさが手のひらにじんわりと伝わります。飲む前から一杯の時間が始まるラテボウルです。",
      },
      {
        src: "/images/product/on-feature-6.webp",
        alt: "両手でラテボウルを包む",
        size: "sm",
        title: "両手でも、片手でも",
        description:
          "自由な持ち方を生むフォルム。片手で軽やかに持つことも、両手で包み込むこともできる形。その日の気分やカフェの時間に合わせて楽しめます。",
      },
      {
        src: "/images/product/on-feature-7.webp",
        alt: "瀬戸焼のラテボウルON",
        size: "sm",
        title: "瀬戸が創る独自のラテボウル",
        description:
          "日本六古窯のひとつ、瀬戸・美濃焼の産地でつくられるラテボウル。長く受け継がれてきた焼き物の技術が、日常の一杯にやさしい質感を与えます。",
      },
    ],
    otherSlug: "kaku",
    otherName: "拡",
    otherNameEn: "KAKU",
    otherTagline: "見惚れて、味わう",
    otherDescription: "広く開いた口に描かれるラテアート。口に運ぶと、この形でしか出ない口当たりに少し驚く。",
    otherImage: "/images/product/latte-bowl-kaku.webp",
    storyLabel: "温 -ON- が紡ぐ物語",
    storyHeading: "両手で包む、冬のひととき",
    storyImages: [
      {
        src: "/images/product/on-1.webp",
        alt: "冬のカフェの入り口",
        afterParagraph: 2,
      },
      {
        src: "/images/product/on-2.webp",
        alt: "両手でラテボウルを包む手元",
        afterParagraph: 6,
      },
    ],
    story: [
      "色づいていた木々の葉が落ち、街の空気がすっかり冬の匂いを帯びてきた12月。\n吐く息が白くなる帰り道、冷えた指先をポケットに押し込みながら、小さなカフェの扉を開けた。",
      "店の奥の席に腰掛け、カフェラテをひとつ。\nほどなくして運ばれてきたそれは、どこか和の佇まいを感じさせる、丸くやわらかな器に入っていた。",
      "取っ手はない。\n自然と両手で包み込むように持ち上げる。",
      "その瞬間、まだ口をつけてもいないのに、\nラテの温もりがじんわりと手のひらに伝わってきた。",
      "冷えて赤くなっていた指先が、ゆっくりほどけていく。",
      "湯気の向こうに、きめ細かなミルクの泡。\n口に運ぶと、エスプレッソのほろ苦さと、クリーミーなミルクの甘みがゆっくり混ざり合う。",
      "身体の奥まで、じんわりと温かくなる。",
      "普段なら一口飲んだあと、ついスマホに手を伸ばしてしまう。\nけれど今日は、なぜだかそうする気にならない。",
      "両手で器を包み込みながら、\nもう一口、もう一口とラテを味わう。",
      "外は冬の空気。\nけれど、この小さな器の中だけは、\nゆっくりとした時間が流れていた。",
    ],
  },
  kaku: {
    name: "拡（KAKU）",
    nameEn: "Latte Bowl KAKU",
    capacity: "240ml",
    description:
      "すっきりとした直線が際立つモダンなフォルム。コーヒーからお茶まで、日常をアップデート。",
    images: [
      "/images/product/kaku-detail-charcoal-1.webp",
      "/images/product/kaku-detail-charcoal-2.webp",
      "/images/product/kaku-detail-3.webp",
      "/images/product/kaku-detail-4.webp",
    ],
    featureImages: [
      {
        src: "/images/product/kaku-feature-1.webp",
        alt: "ラテアートが映えるワイドリム",
        size: "lg",
        title: "ラテアートが映えるワイドリム",
        description:
          "広く開いた口径が、ラテアートを大きく美しく見せます。視界いっぱいに広がる一杯が、飲む前の体験をより豊かにします。",
      },
      {
        src: "/images/product/kaku-feature-2.webp",
        alt: "クリームと液体が同時に味わえる口当たり",
        size: "lg",
        title: "泡と液体が同時に感じる口当たり",
        description:
          "薄く設計された口元と角度により、ミルクの泡とエスプレッソが同時に流れ込みます。なめらかさとコクを同時に感じる設計です。",
      },
      {
        src: "/images/product/kaku-feature-3.webp",
        alt: "ミルクフォームの薄層化",
        size: "sm",
        title: "ミルクフォームの「薄層化」",
        description:
          "液面が広がることで、表面の泡の層を薄く引き延ばします。液体が唇を「面」で捉え、繊細な泡の質感をダイレクトに感じることができます。",
      },
      {
        src: "/images/product/kaku-feature-4.webp",
        alt: "安定感を生む低重心フォルム",
        size: "sm",
        title: "安定感を生む低重心フォルム",
        description:
          "高さを抑えた設計により、テーブルに置いたときの安定感を確保。カフェの提供・使用シーンでも扱いやすい形状です。",
      },
      {
        src: "/images/product/kaku-feature-5.webp",
        alt: "所作を美しくする垂直ハンドル",
        size: "lg",
        title: "所作を美しくする垂直ハンドル",
        description:
          "指に自然にフィットするハンドル形状。2本の指で持ち上げる動作をスムーズにし、カップを持つ所作を美しく見せます。",
      },
      {
        src: "/images/product/kaku-feature-6.webp",
        alt: "瀬戸で生まれるラテボウル",
        size: "lg",
        title: "瀬戸で生まれるラテボウル",
        description:
          "瀬戸・美濃焼の産地で製作。長く培われた焼き物の技術が、質感と佇まいにやさしい奥行きを与えます。",
      },
    ],
    otherSlug: "on",
    otherName: "温",
    otherNameEn: "ON",
    otherTagline: "両手で包む、冬のひととき",
    otherDescription: "取っ手のないまるい器。両手で包むと、ラテの温もりがじんわり手のひらに伝わってくる。",
    otherImage: "/images/product/latte-bowl-on.webp",
    storyLabel: "拡 -KAKU- が紡ぐ物語",
    storyHeading: "見惚れて、味わう",
    storyImages: [
      {
        src: "/images/product/kaku-1.webp",
        alt: "カウンターに積み重なるラテボウル",
        afterParagraph: 2,
      },
      {
        src: "/images/product/kaku-2.webp",
        alt: "ラテアートが描かれた一杯",
        afterParagraph: 6,
      },
    ],
    story: [
      "カウンターの奥で、エスプレッソマシンが静かに蒸気を吐く。\nその上には、同じ器がいくつも無造作に積み重なっている。",
      "けれど、不思議と雑然とした感じはない。\n重なった輪郭がきれいに揃い、それだけで一つの風景のようだった。",
      "席に運ばれてきた一杯。\n広く開いた器の中には、ミルクの白いキャンバスに描かれたラテアート。",
      "思わず、しばらく眺めてしまう。",
      "口元に運ぶ。\nその瞬間、少し驚いた。",
      "ミルクのなめらかさと、コーヒーのほろ苦さ。\nそのバランスが、ひと口ごとにきれいに重なる。",
      "オーナーに聞くと、この口当たりは\nこのラテボウルでしか出ない特有の感覚らしい。",
      "ふと視線を上げる。\nマシンの上には、同じ器がまた整然と重なっていた。",
      "この一杯の美味しさは、\nきっとこの形から生まれている。",
    ],
  },
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return { title: "商品が見つかりません" };

  return {
    title: `${product.name}（${product.capacity}）`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) notFound();

  return (
    <Suspense>
      <ProductDetail
        slug={slug}
        name={product.name}
        nameEn={product.nameEn}
        capacity={product.capacity}
        description={product.description}
        images={product.images}
        featureImages={product.featureImages}
        storyLabel={product.storyLabel}
        storyHeading={product.storyHeading}
        story={product.story}
        storyImages={product.storyImages}
        otherSlug={product.otherSlug}
        otherName={product.otherName}
        otherNameEn={product.otherNameEn}
        otherTagline={product.otherTagline}
        otherDescription={product.otherDescription}
        otherImage={product.otherImage}
      />
    </Suspense>
  );
}
