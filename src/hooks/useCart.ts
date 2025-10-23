"use client";

import { useEffect, useState } from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  priceInCents: number;
  imageUrl?: string;
}

export interface CartState {
  id: string;
  items: CartItem[];
  subtotalInCents: number;
  totalItems: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/cart", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load cart");
        }
        const data = (await response.json()) as CartState;
        if (!cancelled) {
          setCart(data);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setCart(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadCart();

    function handleExternalUpdate(event: Event) {
      const customEvent = event as CustomEvent<CartState>;
      if (!cancelled && customEvent.detail) {
        setCart(customEvent.detail);
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("cart:updated", handleExternalUpdate as EventListener);
    }

    return () => {
      cancelled = true;
      if (typeof window !== "undefined") {
        window.removeEventListener("cart:updated", handleExternalUpdate as EventListener);
      }
    };
  }, []);

  async function mutateCart(path: string, init?: RequestInit) {
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        ...init,
      });

      if (!response.ok) {
        throw new Error("Cart request failed");
      }

      const data = (await response.json()) as CartState;
      setCart(data);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent<CartState>("cart:updated", { detail: data }));
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const addItem = (productId: string, quantity = 1) =>
    mutateCart("/api/cart/add", { body: JSON.stringify({ productId, quantity }) });

  const updateItem = (itemId: string, quantity: number) =>
    mutateCart("/api/cart/update", { body: JSON.stringify({ itemId, quantity }) });

  const removeItem = (itemId: string) =>
    mutateCart("/api/cart/remove", { body: JSON.stringify({ itemId }) });

  const clearCart = () => mutateCart("/api/cart/clear");

  return {
    cart,
    isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };
}
