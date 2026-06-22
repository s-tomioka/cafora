import Link from "next/link";
import { PRE_OPEN_SALE_LABEL } from "@/constants";

type Props = {
  title: string;
};

export function PreOpenPurchaseNotice({ title }: Props) {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-cafora">
        <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
        <div className="flex flex-col items-center py-24 text-center">
          <p className="text-sm font-medium">{PRE_OPEN_SALE_LABEL}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            現在、ご購入の受付は開始しておりません。
          </p>
          <Link
            href="/products"
            className="mt-6 bg-foreground px-10 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-50"
          >
            商品を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
