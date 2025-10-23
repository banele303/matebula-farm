import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import type { AddressDetails } from "@/components/checkout/AddressForm";

export const metadata: Metadata = {
  title: "Checkout | Mathebula Farm Store",
  description: "Finalize your Mathebula Farm order with delivery and contact details.",
};

async function getCheckoutDetails(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  const subtotal = cart?.items.reduce((total, item) => total + item.unitPriceInCents * item.quantity, 0) ?? 0;

  return {
    cart,
    addresses,
    subtotal,
  };
}

export default async function CheckoutPage() {
  const user = await requireUser("/checkout");
  const { cart, addresses, subtotal } = await getCheckoutDetails(user.dbId);
  const serializedAddresses: AddressDetails[] = addresses.map((address) => ({
    id: address.id,
    recipient: address.recipient,
    label: address.label ?? null,
    line1: address.line1,
    line2: address.line2 ?? null,
    city: address.city,
    province: address.province,
    postalCode: address.postalCode,
    isDefault: address.isDefault,
  }));

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-amber-900">Your cart is empty</h1>
        <p className="text-sm text-amber-700/70 mt-4">
          Add products to your basket before heading to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-600/30"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  const cartItems = cart.items.map((item) => ({
    id: item.id,
    name: item.product.name,
    quantity: item.quantity,
    lineTotalInCents: item.unitPriceInCents * item.quantity,
  }));

  return (
    <CheckoutFlow
      userName={user.name}
      userEmail={user.email}
      addresses={serializedAddresses}
      cartItems={cartItems}
      subtotalInCents={subtotal}
    />
  );
}
