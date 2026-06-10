import { Metadata } from "next";
import { FadeUp } from "@/components/ui/scroll-animate";

export const metadata: Metadata = {
  title: "会社概要 | CAFORA",
};

const COMPANY_INFO = [
  { label: "社名", value: "株式会社ChopsTech" },
  { label: "資本金", value: "3,000,000 円" },
  { label: "設立", value: "2023年11月1日" },
  { label: "所在地", value: "東京都渋谷区神宮前3-24-1 原宿鈴木ビル3階・4階" },
  { label: "代表取締役社長", value: "冨岡 周平" },
  {
    label: "事業内容",
    value:
      "食に関わる事業のマーケティング支援\n食器の製造販売\n食器デバイスの開発とデータ支援",
  },
] as const;

export default function CompanyPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <FadeUp>
          <h1 className="text-xl font-semibold sm:text-2xl">会社概要</h1>
        </FadeUp>

        <FadeUp className="mt-12 max-w-3xl sm:mx-auto sm:mt-16">
          <dl className="divide-y divide-border">
            {COMPANY_INFO.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:gap-0 sm:py-8"
              >
                <dt className="text-sm text-muted-foreground sm:w-48 sm:shrink-0">
                  {item.label}
                </dt>
                <dd className="text-sm font-medium sm:flex-1">
                  {item.value.includes("\n")
                    ? item.value.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.value.split("\n").length - 1 && <br />}
                        </span>
                      ))
                    : item.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>
    </div>
  );
}
