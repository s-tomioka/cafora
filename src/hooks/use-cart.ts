"use client";

// TODO: カート状態管理フックを実装
// Supabase 認証と連携し、カートの CRUD を行う
export function useCart() {
  return {
    items: [],
    itemCount: 0,
    total: 0,
    isLoading: false,
    addItem: async () => {},
    removeItem: async () => {},
    updateQuantity: async () => {},
    clearCart: async () => {},
  };
}
