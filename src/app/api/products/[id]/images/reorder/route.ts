import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/products/[id]/images/reorder - Reorder product images
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: productId } = params;
    const body = await req.json();
    const { images } = body as {
      images: Array<{ id: string; position: number }>;
    };

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: "Invalid images data" },
        { status: 400 }
      );
    }

    // Update all image positions in a transaction
    await prisma.$transaction(
      images.map((img) =>
        prisma.productImage.update({
          where: { id: img.id },
          data: { position: img.position },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering images:", error);
    return NextResponse.json(
      { error: "Failed to reorder images" },
      { status: 500 }
    );
  }
}
