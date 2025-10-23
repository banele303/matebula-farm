import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET /api/products/[id] - Fetch a single product with relations
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id] - Update a product
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const body = await req.json();
  const { name, description, priceInCents, categoryId, stock, imageUrls, unit, isActive, onSale, saleDiscountPercent, saleEndsAt } = body as {
    name?: string;
    description?: string | null;
    priceInCents?: number;
    categoryId?: string | null;
    stock?: number;
    imageUrls?: string[];
    unit?: string | null;
    isActive?: boolean;
    onSale?: boolean;
    saleDiscountPercent?: number | null;
    saleEndsAt?: string | Date | null;
  };

    // Prepare partial update data
    const data: any = {};
    if (typeof name === "string" && name.trim().length) {
      data.name = name;
      data.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (typeof description !== "undefined") data.description = description ?? null;
    if (typeof priceInCents === "number") data.priceInCents = priceInCents;
    if (typeof stock === "number") data.stock = stock;
    if (typeof unit !== "undefined") data.unit = unit ?? null;
    if (typeof categoryId !== "undefined") data.categoryId = categoryId ?? null;
    if (typeof isActive === "boolean") data.isActive = isActive;
    if (typeof onSale === "boolean") data.onSale = onSale;
    if (typeof saleDiscountPercent !== "undefined") {
      const v = typeof saleDiscountPercent === "number" ? saleDiscountPercent : parseInt(String(saleDiscountPercent));
      data.saleDiscountPercent = Number.isFinite(v) ? v : null;
    }
    if (typeof saleEndsAt !== "undefined") {
      data.saleEndsAt = saleEndsAt ? new Date(saleEndsAt as any) : null;
    }

    // Get existing product to check for images
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        images: true,
      },
    });

    // Handle images if provided - add new images (don't delete existing ones)
    if (imageUrls && imageUrls.length > 0) {
      const nextPosition = existingProduct.images.length;
      await prisma.productImage.createMany({
        data: imageUrls.map((url: string, index: number) => ({
          productId: id,
          url,
          altText: name,
          position: nextPosition + index,
        })),
      });
    }

    // Fetch updated product with images
    const updatedProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // If product has order items, set their productId to null but preserve historical name/snapshot
    const relatedCount = await prisma.orderItem.count({ where: { productId: id } });
    if (relatedCount > 0) {
      const prod = await prisma.product.findUnique({ where: { id }, select: { name: true } });
      const snapshotValue = JSON.stringify({ name: prod?.name });
      // Ensure snapshot is saved for items missing it
      await prisma.orderItem.updateMany({ where: { productId: id, productSnapshot: null }, data: { productSnapshot: snapshotValue } });
    }

    // Delete product; DB will set orderItem.productId to NULL (ON DELETE SET NULL) and cart items cascade
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
