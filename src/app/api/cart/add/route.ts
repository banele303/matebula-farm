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
  const { productId, quantity = 1 } = await request.json();

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const cart = await prisma.cart.upsert({
    where: { userId: user.dbId },
    update: {},
    create: { userId: user.dbId },
  });

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: product.id },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity,
        unitPriceInCents: product.priceInCents,
      },
    });
  }

  const updatedCart = await getCart(user.dbId);
  return NextResponse.json(toResponse(updatedCart));
}
