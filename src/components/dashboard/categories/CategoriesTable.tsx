"use client";

import { ProductCategory } from "@prisma/client";
import { EditCategoryDialog } from "./EditCategoryDialog";

type CategoryWithCount = ProductCategory & { _count?: { products: number } };

export function CategoriesTable({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-amber-50/80 dark:bg-muted text-left text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground">
          <tr>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Slug</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold text-right">Products</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-amber-700/70 dark:text-muted-foreground">No categories yet.</td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr key={c.id} className="border-t border-amber-100/80 dark:border-border">
                <td className="px-6 py-4 font-semibold text-amber-900 dark:text-foreground">{c.name}</td>
                <td className="px-6 py-4 text-amber-800/80 dark:text-muted-foreground">{c.slug}</td>
                <td className="px-6 py-4 text-amber-800/80 dark:text-muted-foreground">{c.description || "—"}</td>
                <td className="px-6 py-4 text-right font-semibold text-amber-900 dark:text-foreground">{c._count?.products ?? 0}</td>
                <td className="px-6 py-4 text-right">
                  <EditCategoryDialog id={c.id} name={c.name} description={c.description ?? null} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
