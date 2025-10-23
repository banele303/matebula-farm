import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

function ensureOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function ensureBoolean(value: unknown) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return undefined;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const user = await requireUser("/checkout");
  const { id } = await context.params;

  const address = await prisma.address.findFirst({ where: { id, userId: user.dbId } });

  if (!address) {
    return NextResponse.json({ error: "Address not found." }, { status: 404 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch (error) {
    console.error("Invalid JSON payload for PATCH /api/addresses/[id]", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const recipient = ensureOptionalString(payload.recipient) ?? address.recipient;
  const line1 = ensureOptionalString(payload.line1) ?? address.line1;
  const line2Parsed = ensureOptionalString(payload.line2);
  const line2 = Object.prototype.hasOwnProperty.call(payload, "line2") ? line2Parsed ?? null : address.line2;
  const city = ensureOptionalString(payload.city) ?? address.city;
  const province = ensureOptionalString(payload.province) ?? address.province;
  const postalCode = ensureOptionalString(payload.postalCode) ?? address.postalCode;
  const requestedDefault = ensureBoolean(payload.isDefault);

  if (!recipient || !line1 || !city || !province || !postalCode) {
    return NextResponse.json({ error: "Missing required address details." }, { status: 400 });
  }

  try {
    const updatedAddress = await prisma.$transaction(async (tx) => {
      if (requestedDefault === true) {
        await tx.address.updateMany({
          where: { userId: user.dbId, isDefault: true, NOT: { id } },
          data: { isDefault: false },
        });
      }

      return tx.address.update({
        where: { id },
        data: {
          recipient,
          line1,
          line2,
          city,
          province,
          postalCode,
          ...(requestedDefault !== undefined ? { isDefault: requestedDefault } : {}),
        },
      });
    });

    return NextResponse.json({ address: updatedAddress });
  } catch (error) {
    console.error("Failed to update address", error);
    return NextResponse.json({ error: "Could not update address." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  const user = await requireUser("/checkout");
  const { id } = await context.params;

  const address = await prisma.address.findFirst({ where: { id, userId: user.dbId } });

  if (!address) {
    return NextResponse.json({ error: "Address not found." }, { status: 404 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.address.delete({ where: { id } });

      if (address.isDefault) {
        const nextDefault = await tx.address.findFirst({
          where: { userId: user.dbId },
          orderBy: { createdAt: "asc" },
        });

        if (nextDefault) {
          await tx.address.update({
            where: { id: nextDefault.id },
            data: { isDefault: true },
          });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete address", error);
    return NextResponse.json({ error: "Could not delete address." }, { status: 500 });
  }
}
