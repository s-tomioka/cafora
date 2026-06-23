import { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/ui/scroll-animate";

export const metadata: Metadata = {
  title: "プライバシーポリシー | CAFORA",
};

type PrivacySection = {
  title: string;
  intro?: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  outro?: string;
};

const PRIVACY_INTRO =
  "CAFORA（以下「当サイト」といいます）は、お客様の個人情報の重要性を認識し、個人情報の保護に関する法令その他の規範を遵守するとともに、以下の方針に基づき、適切な取得・利用・管理を行います。";

const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    title: "1. 取得する情報について",
    intro:
      "当サイトでは、お問合せ、資料請求、ご注文、サンプル依頼、見積依頼等の際に、以下の情報を取得する場合があります。",
    list: [
      "氏名",
      "企業名/店舗名",
      "住所",
      "メールアドレス",
      "配送先情報",
      "お問合せ内容",
      "ロゴデータ、入稿データ、その他制作に必要な情報",
      "当サイトの閲覧履歴、Cookie情報、アクセス解析に関する情報",
    ],
  },
  {
    title: "2. 個人情報の利用目的",
    intro: "取得した個人情報は、以下の目的の範囲内で利用いたします。",
    list: [
      "お問合せへの回答",
      "ご注文内容の確認",
      "商品・サンプル・資料等の発送",
      "見積書・請求書・領収書等の発行",
      "商品の製造、カスタマイズ、ロゴ転写等の対応",
      "納品、配送、アフターサポート",
      "サービス改善、品質向上のための分析",
      "新商品、サービス、キャンペーン等のご案内",
      "不正利用、トラブル等の防止および対応",
      "法令に基づく対応",
    ],
  },
  {
    title: "3. 個人情報の第三者提供について",
    intro:
      "当サイトは、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。",
    list: [
      "お客様の同意がある場合",
      "法令に基づき開示が必要な場合",
      "人の生命、身体または財産の保護のために必要な場合",
      "商品の製造、配送、決済、システム管理等に必要な範囲で業務委託先に提供する場合",
    ],
  },
  {
    title: "4. 業務委託先への提供について",
    paragraphs: [
      "当サイトでは、商品の製造、ロゴ転写、配送、決済、システム運用等の業務を外部事業者に委託する場合があります。その場合、業務遂行に必要な範囲で個人情報を提供し、委託先に対して適切な管理を求めます。",
    ],
  },
  {
    title: "5. Cookieおよびアクセス解析について",
    paragraphs: [
      "当サイトでは、サイトの利用状況の把握、サービス改善、広告配信、利便性向上のためにCookieを使用する場合があります。",
      "Cookieとは、お客様がサイトを閲覧した際に、ブラウザに保存される情報です。Cookieにより個人を直接特定する情報を取得するものではありません。",
      "お客様は、ブラウザの設定によりCookieの使用を拒否することができます。ただし、一部機能が正常にご利用いただけない場合があります。",
    ],
  },
  {
    title: "6. アクセス解析ツール・広告配信について",
    paragraphs: [
      "当サイトでは、Google Analytics等のアクセス解析ツールや、広告配信サービスを利用する場合があります。これらのツールではCookieを使用し、サイトの訪問状況や閲覧情報を収集することがあります。",
      "収集された情報は、各サービス提供事業者のプライバシーポリシーに基づいて管理されます。",
    ],
  },
  {
    title: "7. 個人情報の管理について",
    paragraphs: [
      "当サイトは、取得した個人情報について、不正アクセス、紛失、改ざん、漏えい等を防止するため、適切な安全管理措置を講じます。",
    ],
  },
  {
    title: "8. 個人情報の開示・訂正・削除等について",
    paragraphs: [
      "お客様ご本人から、個人情報の開示、訂正、利用停止、削除等のご希望があった場合は、ご本人確認のうえ、法令に基づき適切に対応いたします。",
    ],
  },
  {
    title: "9. 未成年の個人情報について",
    paragraphs: [
      "未成年のお客様が当サイトを利用し、個人情報を提供される場合は、保護者の同意を得たうえでご利用ください。",
    ],
  },
  {
    title: "10. プライバシーポリシーの変更について",
    paragraphs: [
      "当サイトは、法令の改正、サービス内容の変更、運用上の必要に応じて、本プライバシーポリシーを変更する場合があります。変更後の内容は、当サイト上に掲載した時点で効力を生じるものとします。",
    ],
  },
  {
    title: "11. お問合せ窓口",
    intro:
      "本プライバシーポリシーに関するお問合せは、下記窓口までお願いいたします。",
  },
];

const CONTACT_INFO = [
  { label: "事業者名", value: "株式会社ChopsTech" },
  { label: "運営サービス名", value: "CAFORA" },
  {
    label: "所在地",
    value: "東京都渋谷区神宮前3-24-1 原宿鈴木ビル3階・4階",
  },
  {
    label: "メールアドレス",
    value: "shop@chopstech.co.jp",
    href: "mailto:shop@chopstech.co.jp",
  },
  { label: "制定日", value: "2026年7月1日" },
] as const;

function PrivacySectionContent({ section }: { section: PrivacySection }) {
  return (
    <div className="space-y-3">
      {section.intro && <p>{section.intro}</p>}
      {section.list && (
        <ul className="list-disc space-y-1 pl-5">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.outro && <p>{section.outro}</p>}
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <FadeUp>
          <h1 className="text-xl font-semibold sm:text-2xl">
            プライバシーポリシー
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {PRIVACY_INTRO}
          </p>
        </FadeUp>

        <FadeUp className="mt-12 max-w-3xl space-y-12 sm:mx-auto sm:mt-16">
          {PRIVACY_SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-sm font-medium">{section.title}</h2>
              <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <PrivacySectionContent section={section} />
                {section.title === "11. お問合せ窓口" && (
                  <dl className="mt-4 divide-y divide-border border-t border-border">
                    {CONTACT_INFO.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
                      >
                        <dt className="text-muted-foreground sm:w-36 sm:shrink-0">
                          {item.label}
                        </dt>
                        <dd className="font-medium text-foreground">
                          {"href" in item && item.href ? (
                            <Link
                              href={item.href}
                              className="underline underline-offset-4 transition-opacity hover:opacity-70"
                            >
                              {item.value}
                            </Link>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </section>
          ))}
        </FadeUp>
      </div>
    </div>
  );
}
