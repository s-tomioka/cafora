"use client";

import { IS_PRE_OPEN } from "@/constants";
import type { CartItem, ColorOption } from "@/lib/shopify/types";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type { CartItem, ColorOption };

// ─── コンテキスト型 ───────────────────────────────────────────
type CartContextType = {
  items: CartItem[];
  itemCount: number;
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, "id"> & { variantId?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  // 後方互換
  setItemCount: (count: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  isDrawerOpen: false,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
  setItemCount: () => {},
});

// ─── プロバイダー ─────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "id"> & { variantId?: string }) => {
      if (IS_PRE_OPEN) return;
      const { variantId: _variantId, ...rest } = newItem;
      const id = `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setItems((prev) => [...prev, { ...rest, id }]);
      setIsDrawerOpen(true);
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const openDrawer = useCallback(() => {
    if (IS_PRE_OPEN) return;
    setIsDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // 後方互換（cart-view.tsx 等が呼ぶ）
  const setItemCount = useCallback(() => {}, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        openDrawer,
        closeDrawer,
        setItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
