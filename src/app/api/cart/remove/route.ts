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
  const { itemId } = await request.json();

  if (!itemId) {
    return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
  }

  // Ensure we only remove from the current user's cart and avoid throwing if not found
  const cart = await prisma.cart.findUnique({ where: { userId: user.dbId }, select: { id: true } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
  }

  const updated = await getCart(user.dbId);
  return NextResponse.json(toResponse(updated));
}
