import { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/ui/scroll-animate";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | CAFORA",
};

type TokushoItem = {
  label: string;
  content:
    | string
    | {
        paragraphs?: readonly string[];
        listIntro?: string;
        listIntroExtra?: string;
        list?: readonly string[];
        listOutro?: string;
        note?: string;
        href?: string;
      };
};

const TOKUSHO_ITEMS: readonly TokushoItem[] = [
  { label: "販売業者", content: "株式会社ChopsTech" },
  { label: "運営サービス名", content: "CAFORA" },
  { label: "運営責任者", content: "冨岡周平" },
  {
    label: "所在地",
    content: "東京都渋谷区神宮前3-24-1 原宿鈴木ビル3階・4階",
  },
  {
    label: "メールアドレス",
    content: {
      paragraphs: ["shop@chopstech.co.jp"],
      href: "mailto:shop@chopstech.co.jp",
    },
  },
  {
    label: "販売URL",
    content: { paragraphs: ["cafora.jp"], href: "https://cafora.jp" },
  },
  {
    label: "販売価格",
    content: {
      paragraphs: [
        "各商品ページまたは個別のお見積書に記載の価格とします。",
        "商品形状、数量、カラー、ロゴ転写の有無、配送先、その他カスタマイズ内容により価格が異なる場合があります。",
      ],
    },
  },
  {
    label: "商品代金以外に必要な料金",
    content: {
      listIntro: "商品代金のほか、以下の費用が発生する場合があります。",
      list: [
        "消費税",
        "送料",
        "銀行振込手数料",
        "ロゴ転写費用",
        "サンプル費用",
        "複数拠点への分割配送費用",
        "特殊対応・追加加工にかかる費用",
      ],
      listOutro: "詳細は、ご注文前のお見積り時にご案内いたします。",
    },
  },
  {
    label: "お支払い方法",
    content: {
      paragraphs: [
        "原則としてクレジットカード決済に対応しています。",
        "銀行振込をご希望の場合は、事前にお問合せフォームよりご相談ください。",
      ],
    },
  },
  {
    label: "お支払い時期",
    content: {
      paragraphs: [
        "原則として、正式発注後、当社が指定する期日までにお支払いください。",
        "銀行振込の場合、振込手数料はお客様のご負担となります。",
        "法人・店舗様とのお取引条件により、別途支払条件を定める場合があります。",
      ],
    },
  },
  {
    label: "商品の引渡時期",
    content: {
      paragraphs: [
        "基本仕様の商品は、ご注文確定後おおよそ4週間を目安としています。",
        "ロゴ転写のカスタマイズを含む場合は、仕様確定後おおよそ5~6週間を目安としています。",
        "数量や仕様によってはさらにお時間をいただく場合があります。開業日、リニューアル日、イベント日など納品希望日がある場合は、事前にご相談ください。",
      ],
    },
  },
  {
    label: "最低注文数量",
    content: {
      paragraphs: [
        "CAFORAの器は業務用途を想定した受注生産のため、最低注文数量は20個からとなっています。",
      ],
    },
  },
  {
    label: "申込みの有効期限",
    content: {
      paragraphs: [
        "お見積りの有効期限は、原則としてお見積書に記載の期限までとします。",
        "期限を過ぎた場合、価格・納期・仕様が変更となる場合があります。",
      ],
    },
  },
  {
    label: "ご注文後のキャンセル・変更について",
    content: {
      paragraphs: [
        "受注生産品のため、ご注文確定後のキャンセル、数量変更、仕様変更は原則としてお受けできません。",
        "ご注文内容、カラー、数量、ロゴ転写の有無、入稿データ、配送先等を十分にご確認のうえ、正式にご発注ください。",
      ],
    },
  },
  {
    label: "返品・交換について",
    content: {
      paragraphs: [
        "受注生産品のため、お客様都合による返品・交換は原則としてお受けできません。",
        "ただし、商品不良、配送中の破損、ご注文内容と異なる商品が届いた場合は、商品到着後7日以内にお問合せください。内容を確認のうえ、交換または代替対応をいたします。",
      ],
    },
  },
  {
    label: "破損・不良品について",
    content: {
      listIntro:
        "商品到着時に破損・欠け・明らかな不良が確認された場合は、商品到着後7日以内にご連絡ください。",
      listIntroExtra: "その際、以下の写真をご共有いただく場合があります。",
      list: [
        "破損または不良箇所が分かる写真",
        "商品全体の写真",
        "外箱、梱包材の状態が分かる写真",
      ],
      listOutro: "確認後、当社の判断により、交換または代替対応を行います。",
    },
  },
  {
    label: "使用中の破損について",
    content: {
      paragraphs: [
        "磁器製品のため、強い衝撃、落下、急激な温度変化等により、割れや欠けが生じる場合があります。",
        "通常使用中に発生した破損、経年使用による劣化、お客様の取り扱いに起因する破損については、返品・交換の対象外となります。",
      ],
    },
  },
  {
    label: "ロゴ転写について",
    content: {
      paragraphs: [
        "ロゴ転写は、現在単色での対応となります。",
        "複数色のロゴデータをご入稿いただいた場合も、基本的には1色に変換したうえで転写いたします。",
        "ロゴデータは、EPS・SVG形式を推奨しています。指定形式のファイルでアップロードができない場合でも、お気軽にお問合せください。",
        "磁器への転写や焼成の工程を経るため、画面上の色味と実際の仕上がりには差が生じる場合があります。",
      ],
    },
  },
  {
    label: "商品の個体差について",
    content: {
      paragraphs: [
        "CAFORAの器は、瀬戸・美濃焼の産地で焼かれた磁器です。",
        "そのため、同一仕様の商品であっても、色味、質感、サイズ、釉薬の表情にわずかな個体差が生じる場合があります。",
        "これらは焼き物の特性として、あらかじめご了承ください。",
      ],
    },
  },
  {
    label: "表現および商品に関する注意事項",
    content: {
      paragraphs: [
        "当サイトに掲載している商品画像、色味、質感は、撮影環境や閲覧環境により実物と異なって見える場合があります。",
        "また、商品仕様、価格、納期、対応可能なカスタマイズ内容は、予告なく変更となる場合があります。",
      ],
    },
  },
  {
    label: "販売数量の制限",
    content: {
      paragraphs: [
        "商品・仕様・製造状況により、販売数量に制限を設ける場合があります。",
      ],
    },
  },
  {
    label: "配送エリア",
    content: {
      paragraphs: [
        "基本的に日本国内への配送に対応しています。日本国内における一部の離島や海外への発送については個別にご相談ください。",
      ],
    },
  },
  { label: "屋号またはサービス名", content: "CAFORA" },
] as const;

function TokushoContent({
  content,
}: {
  content: TokushoItem["content"];
}) {
  if (typeof content === "string") {
    return <p className="font-medium">{content}</p>;
  }

  const {
    paragraphs,
    listIntro,
    listIntroExtra,
    list,
    listOutro,
    note,
    href,
  } = content;

  return (
    <div className="space-y-3">
      {paragraphs?.map((paragraph) => (
        <p key={paragraph}>
          {href ? (
            <Link
              href={href}
              className="font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              {paragraph}
            </Link>
          ) : (
            paragraph
          )}
        </p>
      ))}
      {listIntro && <p>{listIntro}</p>}
      {listIntroExtra && <p>{listIntroExtra}</p>}
      {list && (
        <ul className="list-disc space-y-1 pl-5">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {listOutro && <p>{listOutro}</p>}
      {note && <p className="text-muted-foreground/80">{note}</p>}
    </div>
  );
}

export default function TokushoPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <FadeUp>
          <h1 className="text-xl font-semibold sm:text-2xl">
            特定商取引法に基づく表記
          </h1>
        </FadeUp>

        <FadeUp className="mt-12 max-w-3xl sm:mx-auto sm:mt-16">
          <dl className="divide-y divide-border">
            {TOKUSHO_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:gap-8 sm:py-8"
              >
                <dt className="text-sm font-medium sm:w-52 sm:shrink-0">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground sm:flex-1">
                  <TokushoContent content={item.content} />
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>
    </div>
  );
}
