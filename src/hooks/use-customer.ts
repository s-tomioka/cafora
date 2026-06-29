"use client";

import { useState, useEffect, useCallback } from "react";
import type { ShopifyCustomer, AppOrder } from "@/lib/shopify/types";

type CustomerState = {
  customer: ShopifyCustomer | null;
  orders: AppOrder[];
  isLoading: boolean;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
};

export function useCustomer(): CustomerState {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [orders, setOrders] = useState<AppOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomer = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setCustomer(data.customer ?? null);
      setOrders(data.orders ?? []);
    } catch {
      setCustomer(null);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCustomer(null);
    setOrders([]);
  }, []);

  return {
    customer,
    orders,
    isLoading,
    isLoggedIn: customer !== null,
    logout,
    refetch: fetchCustomer,
  };
}
