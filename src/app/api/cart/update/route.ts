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

export async function POST(request: Request) {
  const user = await requireUser("/cart");
  const { itemId, quantity } = await request.json();

  if (!itemId || typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  const cart = await getCart(user.dbId);
  return NextResponse.json(toResponse(cart));
}
