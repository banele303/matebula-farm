"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, isLoading, removeItem, updateItem } = useCart();

  const subtotal = cart?.subtotalInCents ?? 0;
  const currency = "ZAR";

  const subtotalText = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
  }).format(subtotal / 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <p className="text-lg font-semibold text-amber-900">Your Cart</p>
                <p className="text-sm text-amber-700/70">
                  {cart?.totalItems ?? 0} {cart?.totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-amber-50 text-amber-900"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {isLoading && <p className="text-sm text-amber-700">Loading cart…</p>}
              {!isLoading && (!cart || cart.items.length === 0) && (
                <div className="text-center text-sm text-amber-700/70 py-12">
                  Your cart is empty. Explore our produce and add items to your order.
                </div>
              )}
              {cart && cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-amber-100">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-amber-700 text-sm font-semibold">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-semibold text-amber-900">{item.name}</p>
                        <div className="mt-1 inline-flex items-center rounded-lg border border-amber-200 overflow-hidden">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className="p-1.5 text-amber-700 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold text-amber-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            className="p-1.5 text-amber-700 hover:bg-amber-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-amber-900">
                        {new Intl.NumberFormat("en-ZA", {
                          style: "currency",
                          currency,
                        }).format((item.priceInCents * item.quantity) / 100)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-700/70 hover:text-amber-700"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t space-y-4">
              <div className="flex justify-between text-sm font-semibold text-amber-900">
                <span>Subtotal</span>
                <span>{subtotalText}</span>
              </div>
              <p className="text-xs text-amber-700/70">
                Delivery fees calculated at checkout. No payment required online yet—we confirm orders via phone or e-mail.
              </p>
              <div className="grid gap-3">
                <Link
                  href="/checkout"
                  className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-600/30 transition-all"
                  onClick={onClose}
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="block text-center px-5 py-3 rounded-xl border border-amber-200 text-amber-900 font-semibold hover:bg-amber-50"
                  onClick={onClose}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
