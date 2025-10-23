import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AddCategoryDialog } from "@/components/dashboard/categories/AddCategoryDialog";
import { CategoriesTable } from "@/components/dashboard/categories/CategoriesTable";

async function getData() {
  const categories = await prisma.productCategory.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } },
  });
  return { categories };
}

export default async function CategoriesPage() {
  const user = await requireUser("/dashboard/categories");
  if (user.role !== "ADMIN") return null;

  const { categories } = await getData();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 dark:text-foreground">Categories</h1>
          <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
            Manage product categories
          </p>
        </div>
        <AddCategoryDialog />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
