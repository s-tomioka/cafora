import { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { PreOpenPurchaseNotice } from "@/components/pre-open/pre-open-purchase-notice";
import { IS_PRE_OPEN } from "@/constants";

export const metadata: Metadata = {
  title: "カート",
};

export default function CartPage() {
  if (IS_PRE_OPEN) {
    return <PreOpenPurchaseNotice title="カート" />;
  }

  return <CartView />;
}
