import { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "カート",
};

export default function CartPage() {
  return <CartView />;
}
