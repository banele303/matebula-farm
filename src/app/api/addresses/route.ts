import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

type AddressRequestBody = {
  recipient?: unknown;
  line1?: unknown;
  line2?: unknown;
  city?: unknown;
  province?: unknown;
  postalCode?: unknown;
  isDefault?: unknown;
};

function ensureString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

export async function POST(request: Request) {
  const user = await requireUser("/checkout");

  let body: AddressRequestBody;

  try {
    body = (await request.json()) as AddressRequestBody;
  } catch (error) {
    console.error("Invalid JSON payload for address", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const recipient = ensureString(body.recipient);
  const line1 = ensureString(body.line1);
  const line2 = ensureString(body.line2);
  const city = ensureString(body.city);
  const province = ensureString(body.province);
  const postalCode = ensureString(body.postalCode);
  const isDefaultRequested = typeof body.isDefault === "boolean" ? body.isDefault : body.isDefault === "true";

  if (!recipient || !line1 || !city || !province || !postalCode) {
    return NextResponse.json({ error: "Missing required address details." }, { status: 400 });
  }

  const existingAddressCount = await prisma.address.count({ where: { userId: user.dbId } });
  const shouldBeDefault = existingAddressCount === 0 ? true : Boolean(isDefaultRequested);

  try {
    const address = await prisma.$transaction(async (tx) => {
      if (shouldBeDefault) {
        await tx.address.updateMany({
          where: { userId: user.dbId, isDefault: true },
          data: { isDefault: false },
        });
      }

      return tx.address.create({
        data: {
          userId: user.dbId,
          recipient,
          line1,
          line2: line2 || null,
          city,
          province,
          postalCode,
          isDefault: shouldBeDefault,
        },
      });
    });

    return NextResponse.json({ address });
  } catch (error) {
    console.error("Failed to save address", error);
    return NextResponse.json({ error: "Could not save address." }, { status: 500 });
  }
}
