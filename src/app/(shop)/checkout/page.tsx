import { Metadata } from "next";
import { PreOpenPurchaseNotice } from "@/components/pre-open/pre-open-purchase-notice";
import { IS_PRE_OPEN } from "@/constants";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "購入手続き",
};

export default function CheckoutPage() {
  if (IS_PRE_OPEN) {
    return <PreOpenPurchaseNotice title="購入手続き" />;
  }

  redirect("/cart");
}
