import { Metadata } from "next";
import { AccordionItem } from "@/components/ui/accordion";
import { FadeUp } from "@/components/ui/scroll-animate";
import { FaqContactSection } from "@/components/faq/faq-contact-section";
import { SHIPPING_FEES } from "@/constants";

export const metadata: Metadata = {
  title: "よくあるご質問・お問合せ | CAFORA",
};

function ShippingFeeAnswer() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        送料は配送エリア・配送数量・配送先数によって異なります。佐川急便での配送を基本としており、ベース料金および30個（最低納品数）ご注文時の目安送料は以下の通りです。同一配送先への納品が60個以上の場合は送料無料です。複数拠点へ分割配送する場合は、配送先ごとに送料および送料無料条件を判定します。日本国内の一部の離島や海外への発送については、個別にご相談ください。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] text-sm text-muted-foreground">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-medium text-foreground">配送エリア</th>
              <th className="pb-2 font-medium text-foreground">30個（最低納品数）</th>
            </tr>
          </thead>
          <tbody>
            {SHIPPING_FEES.map((row) => (
              <tr key={row.area} className="border-b border-border/60">
                <td className="py-2.5 pr-4">{row.area}</td>
                <td className="py-2.5 tabular-nums">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type FaqSection = {
  label: string;
  items: FaqItem[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    label: "ご注文について",
    items: [
      {
        question: "最低注文数量はありますか？",
        answer:
          "はい、CAFORAの器は業務用途を想定した受注生産のため、最低注文数量は30個からとなっています。",
      },
      {
        question: "注文の流れを教えてください。",
        answer:
          "商品・カラー・数量・ロゴ転写の有無をお選びいただき、サイトからご注文ください。",
      },
      {
        question: "サンプルを事前に確認することはできますか？",
        answer:
          "サンプルのご提供が可能です。サンプルについてはお問い合わせフォームよりご相談ください。在庫状況によっては、選択できるサンプルの色味が限られる場合がございます。",
      },
      {
        question: "注文後のキャンセル・変更はできますか？",
        answer:
          "受注生産のため、ご注文確定後のキャンセル・内容変更は原則としてお受けできません。ご注文内容はご確認のうえ、お手続きをお願いいたします。なお、ご注文前のご相談はいつでも承っています。",
      },
      {
        question: "見積書・請求書・領収書は発行できますか？",
        answer:
          "はい、法人・店舗様向けに見積書・請求書・領収書の発行に対応しています。必要な書類がある場合は、お問い合わせください。",
      },
      {
        question: "支払い方法は何がありますか？",
        answer:
          "原則としてクレジットカード決済に対応しています。銀行振込をご希望の場合は、事前にお問い合わせフォームよりご相談ください。",
      },
      {
        question: "注文から納品まで、どのくらいかかりますか？",
        answer:
          "基本仕様の商品は、ご注文確定後おおよそ4週間を目安としています。ロゴ転写のカスタマイズを含む場合は、仕様確定後おおよそ5~6週間を目安としています。数量や仕様によってはさらにお時間をいただく場合があります。開業や導入時期が決まっている場合は、お早めにご相談ください。",
      },
      {
        question: "急ぎの納品は可能ですか？",
        answer:
          "数量や仕様によっては、短納期で対応できる場合があります。開業日・リニューアル日・イベント日など納期が決まっている場合はご相談ください。",
      },
    ],
  },
  {
    label: "カスタマイズについて",
    items: [
      {
        question: "カラーはどのように選べますか？",
        answer:
          "現在、グレー、チャコール、モカ、モスグリーン、ブルーグレー、テラコッタの6色をご用意しています。商品詳細ページからカラーをご選択いただけます。ブランドに合わせたカラーを制作したい場合は事前に問い合わせからご相談ください。",
      },
      {
        question: "ロゴや名入れの転写は可能ですか？",
        answer:
          "はい、ロゴ転写に対応しています。商品をカートに入れる際にロゴデータ（EPS・SVG形式推奨）をアップロードしてください。指定形式のファイルでアップロードができない場合でも、お気軽にお問い合わせください。",
      },
      {
        question: "ロゴ転写は何色まで対応できますか？",
        answer:
          "ロゴ転写は、現在単色での対応となります。複数色のロゴデータをご入稿いただいた場合も、基本的には1色に変換したうえで転写いたします。ブランドカラーや仕上がりイメージにご希望がある場合は、事前にご相談ください。",
      },
      {
        question: "ロゴの色は画面上の色と同じになりますか？",
        answer:
          "磁器への転写や焼成の工程を経るため、画面上で見える色と実際の仕上がりには差が出る場合があります。",
      },
      {
        question: "完全オリジナルの形状でつくってもらえますか？",
        answer:
          "現在はCAFORAが設計した形状（ON / KAKU）をベースにしたカスタマイズを承っています。完全オリジナル形状のOEMについては個別にお問い合わせください。規模や内容によって対応可能な場合があります。また強いこだわりがある場合、一緒にマグ開発をすることも可能です。ご希望の場合はお問い合わせください。",
      },
    ],
  },
  {
    label: "商品・素材について",
    items: [
      {
        question: "器の素材は何ですか？",
        answer:
          "CAFORAの器は、瀬戸・美濃焼の産地で焼かれた磁器です。通常の陶土や磁器土にアルミナの強化粒子を混ぜ、原料を微粉砕して密度を高めることで高い強度を実現しています。",
      },
      {
        question: "食洗機・電子レンジは使用できますか？",
        answer:
          "食洗機・電子レンジともにご使用いただけます。業務用食洗機にも対応しています。ロゴ転写ありの商品も使用可能ですが、長くきれいにお使いいただくため、転写部分を強くこすらないようご注意ください。",
      },
      {
        question: "同じ注文でも色や形に個体差がありますか？",
        answer:
          "磁器は一点一点、原料・釉薬・焼成の工程を経るため、わずかな個体差が生じる場合があります。これは焼き物の特性であり、自然な表情としてご理解ください。",
      },
      {
        question: "業務用として毎日使えますか？",
        answer:
          "CAFORAの器は、飲食店やカフェなどでの使用を想定して製作しています。ただし磁器製品のため、強い衝撃や急激な温度変化にはご注意ください。長くお使いいただくために、洗浄・保管時は丁寧なお取り扱いをおすすめします。",
      },
      {
        question: "再注文時に同じ仕様で作れますか？",
        answer:
          "過去のご注文仕様をもとに、同じ形状・カラー・ロゴ転写での再注文が可能です。ただし焼きものの特性上、原料や釉薬、焼成条件によって色味や質感にわずかな個体差が生じる場合があります。",
      },
      {
        question: "飲食店以外でも注文できますか？",
        answer:
          "はい、カフェ・レストラン以外にも、ホテル、オフィス、ショールーム、ギフト、イベント、ノベルティなどの用途でご相談いただけます。ブランドや空間に合わせた器づくりをご希望の場合は、お気軽にご相談ください。",
      },
    ],
  },
  {
    label: "追加注文・返品・破損について",
    items: [
      {
        question: "割れや欠けが生じた場合、補充注文はできますか？",
        answer:
          "追加・補充注文は承っています。ただし受注生産のため、原則として最低注文数量（30個）がございます。補充分のみの少量注文についてはお問い合わせください。",
      },
      {
        question: "返品・交換はできますか？",
        answer:
          "受注生産品のため、お客様都合による返品・交換は原則としてお受けできません。万が一、商品不良やご注文内容と異なる商品が届いた場合は、商品到着後7日以内にご連絡ください。内容を確認のうえ、対応いたします。",
      },
      {
        question: "納品時に割れや欠けがあった場合はどうなりますか？",
        answer:
          "配送中の破損や初期不良が確認された場合は、商品到着後7日以内にご連絡ください。破損状況が分かる写真と、外箱・梱包材の状態を確認できる写真をご共有いただくと、対応がスムーズです。",
      },
      {
        question: "使用中に割れた場合、交換できますか？",
        answer:
          "通常使用中の破損については、原則として交換対象外となります。追加・補充注文については承っていますので、必要数量や納期についてお問い合わせください。",
      },
    ],
  },
  {
    label: "配送・納品について",
    items: [
      {
        question: "配送エリアに制限はありますか？",
        answer:
          "基本的に日本国内への配送に対応しています。日本国内における一部の離島や海外への発送については、個別にご相談ください。",
      },
      {
        question: "まとめて複数店舗に配送してもらえますか？",
        answer:
          "複数拠点への分割配送にも対応しています。ご注文時または発送前にご連絡いただければ、各店舗・倉庫への個別配送が可能です。配送先が多い場合は追加費用が発生する場合があります。",
      },
      {
        question: "梱包はどのようになっていますか？",
        answer:
          "割れ物対応の緩衝材で個別に梱包し、ダンボールに収めてお届けします。業務用の導入を想定した、開封後すぐに使い始められる形でお届けしています。",
      },
      {
        question: "送料はいくらですか？",
        answer: <ShippingFeeAnswer />,
      },
    ],
  },
  {
    label: "お問い合わせについて",
    items: [
      {
        question: "どのような方法でお問い合わせできますか？",
        answer:
          "ページ下部のお問い合わせフォームからお気軽にご連絡ください。内容を確認のうえ、通常2〜3営業日以内にご返信いたします。",
      },
      {
        question: "導入前に相談できますか？",
        answer:
          "はい、導入前のご相談を歓迎しています。器選びやカラー・カスタマイズの方向性、コスト感のご確認など、どのような段階のご相談でもお気軽にどうぞ。",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">

        <FadeUp>
          <h1 className="text-xl font-semibold sm:text-2xl">よくあるご質問・お問合せ</h1>
        </FadeUp>

        <div className="mt-12 max-w-2xl space-y-12 sm:mx-auto sm:mt-16">
          {FAQ_SECTIONS.map((section) => (
            <FadeUp key={section.label}>
              <section>
                <h2 className="text-[10px] tracking-[0.3em] text-muted-foreground">
                  {section.label}
                </h2>
                <div className="mt-4 divide-y divide-border">
                  {section.items.map((item) => (
                    <AccordionItem key={item.question} title={item.question}>
                      {typeof item.answer === "string" ? (
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.answer}
                        </p>
                      ) : (
                        item.answer
                      )}
                    </AccordionItem>
                  ))}
                </div>
              </section>
            </FadeUp>
          ))}
        </div>

        <FaqContactSection />

      </div>
    </div>
  );
}
