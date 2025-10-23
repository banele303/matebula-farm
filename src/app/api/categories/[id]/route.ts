import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// PATCH /api/categories/[id] - update category
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { name, description } = body as { name?: string; description?: string | null };

    if (!name && typeof description === "undefined") {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const data: any = {};
    if (typeof name === "string" && name.trim().length) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      data.name = name;
      data.slug = slug;
    }
    if (typeof description !== "undefined") {
      data.description = description && description.length ? description : null;
    }

    const updated = await prisma.productCategory.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
