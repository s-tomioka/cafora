"use client";

import { IS_PRE_OPEN } from "@/constants";
import type { CartItem, ColorOption, ShopifyCart } from "@/lib/shopify/types";
import {
  getCart,
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  buildCartLineInput,
  transformShopifyCartLine,
} from "@/lib/shopify";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";

export type { CartItem, ColorOption };

const CART_ID_KEY = "cafora_cart_id";

const hasShopifyConfig =
  typeof window !== "undefined" &&
  !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// ─── コンテキスト型 ───────────────────────────────────────────
export type AddItemPayload = Omit<CartItem, "id"> & {
  variantId?: string;
  logoUrl?: string;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  isDrawerOpen: boolean;
  isLoading: boolean;
  cartError: string | null;
  checkoutUrl: string | null;
  addItem: (payload: AddItemPayload) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  openDrawer: () => void;
  closeDrawer: () => void;
  // 後方互換
  setItemCount: (count: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  isDrawerOpen: false,
  isLoading: false,
  cartError: null,
  checkoutUrl: null,
  addItem: async () => {},
  removeItem: async () => {},
  updateQuantity: async () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
  setItemCount: () => {},
});

// ─── カートデータからアイテム配列を抽出 ──────────────────────
function extractItems(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }) => transformShopifyCartLine(node));
}

// ─── プロバイダー ─────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const isAddingRef = useRef(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Shopify カートを適用
  function applyCart(cart: ShopifyCart) {
    setItems(extractItems(cart));
    setCheckoutUrl(cart.checkoutUrl);
    setCartId(cart.id);
    localStorage.setItem(CART_ID_KEY, cart.id);
  }

  // 初期化: 保存済みカートを復元
  useEffect(() => {
    if (!hasShopifyConfig) return;
    const stored = localStorage.getItem(CART_ID_KEY);
    if (!stored) return;
    setIsLoading(true);
    getCart(stored)
      .then((cart) => {
        if (cart) applyCart(cart);
        else localStorage.removeItem(CART_ID_KEY);
      })
      .catch(() => localStorage.removeItem(CART_ID_KEY))
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Shopify Cart API 経由の addItem ─────────────────────────
  const addItemShopify = useCallback(
    async (payload: AddItemPayload) => {
      if (!payload.variantId) return;
      if (isAddingRef.current) return;
      isAddingRef.current = true;
      setIsLoading(true);
      try {
        const lineInput = buildCartLineInput({
          variantId: payload.variantId,
          quantity: payload.quantity,
          slug: payload.slug,
          image: payload.image,
          baseUnitPrice: payload.baseUnitPrice,
          colorOption: payload.colorOption,
          hasLogo: payload.hasLogo,
          logoUrl: payload.logoUrl,
        });

        setCartError(null);
        let cart: ShopifyCart;
        const stored = localStorage.getItem(CART_ID_KEY);
        if (stored) {
          try {
            cart = await cartLinesAdd(stored, [lineInput]);
          } catch {
            // カートが期限切れの可能性 — 新規作成にフォールバック
            localStorage.removeItem(CART_ID_KEY);
            cart = await cartCreate([lineInput]);
          }
        } else {
          cart = await cartCreate([lineInput]);
        }
        applyCart(cart);
        setIsDrawerOpen(true);
      } catch (err) {
        setCartError(err instanceof Error ? err.message : "カートの更新に失敗しました。");
      } finally {
        isAddingRef.current = false;
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // ─── インメモリ fallback の addItem ──────────────────────────
  const addItemMemory = useCallback((payload: AddItemPayload) => {
    const id = `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setItems((prev) => [...prev, { ...payload, id }]);
    setIsDrawerOpen(true);
  }, []);

  const addItem = useCallback(
    async (payload: AddItemPayload) => {
      if (IS_PRE_OPEN) return;
      if (hasShopifyConfig && payload.variantId) {
        await addItemShopify(payload);
      } else {
        addItemMemory(payload);
      }
    },
    [addItemShopify, addItemMemory],
  );

  // ─── removeItem ──────────────────────────────────────────────
  const removeItem = useCallback(
    async (id: string) => {
      const storedCartId = cartId ?? localStorage.getItem(CART_ID_KEY);
      if (hasShopifyConfig && storedCartId) {
        setIsLoading(true);
        try {
          setCartError(null);
          const cart = await cartLinesRemove(storedCartId, [id]);
          applyCart(cart);
        } catch (err) {
          setCartError(err instanceof Error ? err.message : "カートの更新に失敗しました。");
        } finally {
          setIsLoading(false);
        }
      } else {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartId],
  );

  // ─── updateQuantity ──────────────────────────────────────────
  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      const storedCartId = cartId ?? localStorage.getItem(CART_ID_KEY);
      if (hasShopifyConfig && storedCartId) {
        setIsLoading(true);
        try {
          setCartError(null);
          const cart = await cartLinesUpdate(storedCartId, [{ id, quantity }]);
          applyCart(cart);
        } catch (err) {
          setCartError(err instanceof Error ? err.message : "カートの更新に失敗しました。");
        } finally {
          setIsLoading(false);
        }
      } else {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartId],
  );

  const openDrawer = useCallback(() => {
    if (IS_PRE_OPEN) return;
    setIsDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const setItemCount = useCallback(() => {}, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isDrawerOpen,
        isLoading,
        cartError,
        checkoutUrl,
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
