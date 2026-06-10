import { Metadata } from "next";
import { AccordionItem } from "@/components/ui/accordion";
import { FadeUp } from "@/components/ui/scroll-animate";
import { FaqContactSection } from "@/components/faq/faq-contact-section";

export const metadata: Metadata = {
  title: "よくあるご質問・お問合せ | CAFORA",
};

const FAQ_SECTIONS = [
  {
    label: "ご注文について",
    items: [
      {
        question: "最低注文数量はありますか？",
        answer:
          "はい、CAFORAの器は業務用途を想定した受注生産のため、最低注文数量は20個からとなっています。カラーやロゴの有無などのカスタマイズ内容は、同一注文内で組み合わせが可能です。詳しくはお問合せください。",
      },
      {
        question: "注文後のキャンセル・変更はできますか？",
        answer:
          "受注生産のため、ご注文確定後のキャンセル・内容変更は原則としてお受けできません。ご注文内容はご確認のうえ、お手続きをお願いいたします。なお、ご注文前のご相談はいつでも承っています。",
      },
      {
        question: "サンプルを事前に確認することはできますか？",
        answer:
          "サンプルのご提供が可能です。実際の質感や色みは画面上と異なる場合があるため、本注文前にサンプルをご確認いただくことをお勧めしています。サンプルについてはお問合せフォームよりご相談ください。",
      },
      {
        question: "注文から納品まで、どのくらいかかりますか？",
        answer:
          "内容やカスタマイズの複雑さによって異なりますが、ご注文確定後おおよそ6〜10週間を目安としています。ロゴ転写や特殊カラーを含む場合はさらにお時間をいただく場合があります。開業や導入時期が決まっている場合は、お早めにご相談ください。",
      },
    ],
  },
  {
    label: "カスタマイズについて",
    items: [
      {
        question: "カラーはどのように選べますか？",
        answer:
          "現在、ホワイト・チャコール・テラコッタ・インディゴ・セージ・サンド・モカの7色をご用意しています。商品詳細ページからカラーをご選択いただけます。特定のカラーイメージがある場合はご相談ください。",
      },
      {
        question: "ロゴや名入れの転写は可能ですか？",
        answer:
          "はい、ロゴ転写に対応しています。注文フォームからロゴデータ（AI・EPS・PDF推奨）をアップロードいただき、転写位置・サイズをご指定ください。転写イメージのプレビューを確認してからご入稿いただけます。",
      },
      {
        question: "ロゴ転写に対応しているフォーマットは何ですか？",
        answer:
          "AI・EPS・PDFのベクター形式を推奨しています。PNG・JPGでもご入稿可能ですが、仕上がりの品質を保つためにベクターデータをお勧めしています。ご不明な点はお気軽にお問合せください。",
      },
      {
        question: "完全オリジナルの形状でつくってもらえますか？",
        answer:
          "現在はCAFORAが設計した形状（ON / KAKU）をベースにしたカスタマイズを承っています。完全オリジナル形状のOEMについては個別にご相談ください。規模や内容によって対応可能な場合があります。",
      },
    ],
  },
  {
    label: "商品・素材について",
    items: [
      {
        question: "器の素材は何ですか？",
        answer:
          "CAFORAの器は、愛知県の瀬戸・美濃焼の産地で焼かれた陶器です。土と釉薬の組み合わせにより、丈夫さと独特の質感を両立しています。",
      },
      {
        question: "食洗機・電子レンジは使用できますか？",
        answer:
          "基本的に食洗機・電子レンジともにご使用いただけます。ただし、ロゴ転写ありの器については、食洗機の繰り返し使用により転写部分が色落ちする可能性があるため、手洗いをお勧めしています。",
      },
      {
        question: "同じ注文でも色や形に個体差がありますか？",
        answer:
          "陶器は一点一点、土・釉薬・焼きの工程を経るため、わずかな個体差が生じます。これは陶器の特性であり、手作業による自然な表情としてご理解ください。均質を求める場合はご相談ください。",
      },
      {
        question: "割れや欠けが生じた場合、補充注文はできますか？",
        answer:
          "追加・補充注文は承っています。ただし受注生産のため、最低注文数量（20個）がございます。補充分のみの少量注文についてはお問合せください。",
      },
    ],
  },
  {
    label: "配送・納品について",
    items: [
      {
        question: "配送エリアに制限はありますか？",
        answer:
          "現在は日本国内への配送に対応しています。海外への発送については個別にご相談ください。",
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
    ],
  },
  {
    label: "お問合せについて",
    items: [
      {
        question: "どのような方法でお問合せできますか？",
        answer:
          "ページ下部のお問合せフォームからお気軽にご連絡ください。内容を確認のうえ、通常2〜3営業日以内にご返信いたします。",
      },
      {
        question: "導入前に相談できますか？",
        answer:
          "はい、導入前のご相談を歓迎しています。器選びやカラー・カスタマイズの方向性、コスト感のご確認など、どのような段階のご相談でもお気軽にどうぞ。",
      },
    ],
  },
] as const;

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
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.answer}
                      </p>
                    </AccordionItem>
                  ))}
                </div>
              </section>
            </FadeUp>
          ))}
        </div>

        {/* お問合せフォーム */}
        <FaqContactSection />

      </div>
    </div>
  );
}
