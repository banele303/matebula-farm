import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function ensureString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

export async function POST(request: Request) {
  const user = await requireUser("/checkout");

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch (error) {
    console.error("Invalid JSON payload for POST /api/orders", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const contactName = ensureString(body.contactName);
  const contactEmail = ensureString(body.contactEmail);
  const phone = ensureString(body.phone);
  const notes = ensureString(body.notes);
  const addressId = ensureString(body.addressId);

  if (!contactName || !contactEmail || !phone || !addressId) {
    return NextResponse.json({ error: "Missing required checkout details." }, { status: 400 });
  }

  const [cart, address] = await Promise.all([
    prisma.cart.findUnique({
      where: { userId: user.dbId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.address.findFirst({ where: { id: addressId, userId: user.dbId } }),
  ]);

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  if (!address) {
    return NextResponse.json({ error: "Delivery address not found." }, { status: 404 });
  }

  const subtotalInCents = cart.items.reduce(
    (total, item) => total + item.unitPriceInCents * item.quantity,
    0
  );

  const combinedNotes = [notes, phone ? `Phone: ${phone}` : ""]
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join("\n");

  try {
    const order = await prisma.$transaction(async (tx) => {
      if (contactName || contactEmail) {
        await tx.user.update({
          where: { id: user.dbId },
          data: {
            ...(contactName ? { name: contactName } : {}),
            ...(contactEmail ? { email: contactEmail } : {}),
          },
        });
      }

      if (phone) {
        await tx.address.update({
          where: { id: address.id },
          data: { phone },
        });
      }

      const createdOrder = await tx.order.create({
        data: {
          userId: user.dbId,
          addressId: address.id,
          subtotalInCents,
          shippingInCents: 0,
          totalInCents: subtotalInCents,
          notes: combinedNotes || null,
        },
      });

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            productId: item.productId,
            productName: item.product.name,
            productSnapshot: JSON.stringify({
              name: item.product.name,
              priceInCents: item.unitPriceInCents,
              productId: item.product.id,
            }),
            quantity: item.quantity,
            unitPriceInCents: item.unitPriceInCents,
          },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return tx.order.findUnique({
        where: { id: createdOrder.id },
        include: {
          items: true,
          shippingAddress: true,
        },
      });
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order", error);
    return NextResponse.json({ error: "Could not submit order request." }, { status: 500 });
  }
}
