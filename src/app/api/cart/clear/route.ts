import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

function toResponse(cart: Awaited<ReturnType<typeof getCart>>) {
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

export async function POST() {
  const user = await requireUser("/cart");

  const cart = await prisma.cart.findUnique({ where: { userId: user.dbId } });

  if (!cart) {
    return NextResponse.json({ id: "", items: [], subtotalInCents: 0, totalItems: 0 });
  }

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  const updatedCart = await getCart(user.dbId);
  return NextResponse.json(toResponse(updatedCart));
}
