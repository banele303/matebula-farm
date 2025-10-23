import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET /api/products - List all products
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured");
    
    const where: any = {};
    
    // Only show active products
    where.isActive = true;
    
    // Filter by featured if requested
    if (featured === "true") {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
      orderBy: { createdAt: "desc" },
      ...(limit && { take: parseInt(limit) }),
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  const body = await req.json();
  const { name, description, priceInCents, categoryId, stock, imageUrls, unit, onSale, saleDiscountPercent, saleEndsAt } = body as {
    name: string;
    description: string;
    priceInCents: number;
    categoryId: string;
    stock: number;
    imageUrls: string[];
    unit?: string;
    onSale?: boolean;
    saleDiscountPercent?: number;
    saleEndsAt?: string;
  };

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Create product with images if provided
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        priceInCents,
        stock,
        unit: unit || null,
        onSale: Boolean(onSale) || false,
        saleDiscountPercent: onSale ? (typeof saleDiscountPercent === "number" ? saleDiscountPercent : parseInt(String(saleDiscountPercent) || "")) || null : null,
        saleEndsAt: onSale && saleEndsAt ? new Date(saleEndsAt) : null,
        categoryId: categoryId || null,
        ...(imageUrls && imageUrls.length > 0 && {
          images: {
            create: imageUrls.map((url: string, index: number) => ({
              url,
              altText: name,
              position: index,
            })),
          },
        }),
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
