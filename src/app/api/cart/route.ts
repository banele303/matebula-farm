import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function toCartResponse(cart: Awaited<ReturnType<typeof getCart>>) {
  if (!cart) {
    return {
      id: "",
      items: [],
      subtotalInCents: 0,
      totalItems: 0,
    };
  }

  const subtotalInCents = cart.items.reduce((total, item) => total + item.unitPriceInCents * item.quantity, 0);

  return {
    id: cart.id,
    subtotalInCents,
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
    items: cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      quantity: item.quantity,
      priceInCents: item.unitPriceInCents,
      imageUrl: item.product.images[0]?.url,
    })),
  };
}

async function getCart(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: { images: { orderBy: { position: "asc" } } },
          },
        },
      },
    },
  });
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(toCartResponse(null));
  }

  const cart = await getCart(user.dbId);
  return NextResponse.json(toCartResponse(cart));
}
