import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { ProductsTable, AddProductDialog } from "@/components/dashboard/products";
import { Package, AlertTriangle, TrendingUp, Boxes } from "lucide-react";

async function getProductsData() {
  const [products, totalProducts, lowStockCount, totalValue, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
        images: { orderBy: { position: "asc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
    prisma.product.count({
      where: { stock: { lt: 10 } },
    }),
    prisma.product.aggregate({
      _sum: { priceInCents: true },
    }),
    prisma.productCategory.findMany(),
  ]);

  return {
    products,
    totalProducts,
    lowStockCount,
    totalValue: totalValue._sum.priceInCents ?? 0,
    categories,
  };
}

export default async function ProductsPage() {
  const user = await requireUser("/dashboard/products");

  if (user.role !== "ADMIN") {
    return null;
  }

  const data = await getProductsData();

  const stats = [
    {
      label: "Total Products",
      value: data.totalProducts,
      icon: Package,
      color: "amber",
    },
    {
      label: "Low Stock Items",
      value: data.lowStockCount,
      icon: AlertTriangle,
      color: "orange",
    },
    {
      label: "Total Inventory Value",
      value: new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(data.totalValue / 100),
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Categories",
      value: data.categories.length,
      icon: Boxes,
      color: "amber",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 dark:text-foreground">Products</h1>
          <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
            Manage your product inventory and pricing
          </p>
        </div>
        <AddProductDialog categories={data.categories} />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-700 dark:text-amber-400" />
                </div>
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground font-semibold">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-900 dark:text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Products Table */}
      <ProductsTable products={data.products} categories={data.categories} />
    </div>
  );
}
