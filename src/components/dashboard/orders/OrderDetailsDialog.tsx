"use client";

import { X } from "lucide-react";
import { Order, OrderItem, Address, User } from "@prisma/client";

export type OrderWithRelations = Order & {
  user: User;
  shippingAddress: Address;
  items: (OrderItem & { product?: { name: string } | null })[];
};

interface OrderDetailsDialogProps {
  order: OrderWithRelations;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsDialog({ order, isOpen, onClose }: OrderDetailsDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => onClose()}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-amber-100 dark:border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-border">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 dark:text-foreground">
                Order #{order.orderNumber.slice(0, 8)}
              </h2>
              <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
                Placed on {new Date(order.placedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-amber-700 dark:text-foreground" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Customer & Shipping */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-amber-100 dark:border-border p-4">
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-700/70 dark:text-muted-foreground mb-2">Customer</p>
                <p className="font-semibold text-amber-900 dark:text-foreground">{order.user.name || "Customer"}</p>
                <p className="text-sm text-amber-700/70 dark:text-muted-foreground">{order.user.email}</p>
              </div>
              <div className="rounded-xl border border-amber-100 dark:border-border p-4">
                <p className="text-xs uppercase tracking-wider font-semibold text-amber-700/70 dark:text-muted-foreground mb-2">Shipping Address</p>
                <p className="text-sm text-amber-900 dark:text-foreground">{order.shippingAddress.recipient}</p>
                <p className="text-sm text-amber-700/80 dark:text-muted-foreground">{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && (
                  <p className="text-sm text-amber-700/80 dark:text-muted-foreground">{order.shippingAddress.line2}</p>
                )}
                <p className="text-sm text-amber-700/80 dark:text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-amber-700/80 dark:text-muted-foreground">{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Items */}
            <div className="rounded-xl border border-amber-100 dark:border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-amber-50/80 dark:bg-muted text-left text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="px-4 py-3 font-semibold">Qty</th>
                    <th className="px-4 py-3 font-semibold">Unit Price</th>
                    <th className="px-4 py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it) => (
                    <tr key={it.id} className="border-t border-amber-100/80 dark:border-border">
                      <td className="px-4 py-3">{it.productName}</td>
                      <td className="px-4 py-3">{it.quantity}</td>
                      <td className="px-4 py-3">
                        {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(it.unitPriceInCents / 100)}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format((it.unitPriceInCents * it.quantity) / 100)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex items-center justify-end gap-8">
              <div className="text-sm">
                <div className="flex items-center justify-between gap-12">
                  <span className="text-amber-700/80 dark:text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-amber-900 dark:text-foreground">
                    {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(order.subtotalInCents / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-12">
                  <span className="text-amber-700/80 dark:text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-amber-900 dark:text-foreground">
                    {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(order.shippingInCents / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-12 mt-2 pt-2 border-t border-amber-100 dark:border-border">
                  <span className="text-amber-700/80 dark:text-muted-foreground">Total</span>
                  <span className="font-bold text-amber-900 dark:text-foreground">
                    {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(order.totalInCents / 100)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
