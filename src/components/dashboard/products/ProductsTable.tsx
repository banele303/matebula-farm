"use client";

import { Product, ProductCategory, ProductImage } from "@prisma/client";
import { useState } from "react";
import { Search, MoreVertical, Edit, Trash2, AlertCircle, ChevronDown } from "lucide-react";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";
import Image from "next/image";

type ProductWithRelations = Product & {
  category: ProductCategory | null;
  images: ProductImage[];
};

interface ProductsTableProps {
  products: ProductWithRelations[];
  categories: ProductCategory[];
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductWithRelations | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock < 10) ||
      (stockFilter === "out" && product.stock === 0) ||
      (stockFilter === "in" && product.stock >= 10);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleEdit = (product: ProductWithRelations) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
    setActiveMenu(null);
  };

  const handleDelete = (product: ProductWithRelations) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
    setActiveMenu(null);
  };

  return (
    <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card shadow-sm">
      {/* Filters Bar */}
      <div className="p-6 border-b border-amber-100 dark:border-border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring focus:border-amber-500 dark:focus:border-input"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
          </div>

          {/* Stock Filter */}
          <div className="relative">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
            >
              <option value="all">All Stock Levels</option>
              <option value="in">In Stock (10+)</option>
              <option value="low">Low Stock (&lt;10)</option>
              <option value="out">Out of Stock</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-amber-50/80 dark:bg-muted text-left text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap min-w-[120px]">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-amber-700/70 dark:text-muted-foreground">
                  {searchQuery || categoryFilter !== "all" || stockFilter !== "all"
                    ? "No products match your filters"
                    : "No products yet. Add your first product to get started."}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-amber-100/80 dark:border-border hover:bg-amber-50/30 dark:hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-[76px] h-12 min-w-[76px] flex-shrink-0 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 flex items-center justify-center overflow-hidden">
                        {product.images[0]?.url ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.images[0].altText || product.name}
                            fill
                            className="object-cover"
                            sizes="76px"
                          />
                        ) : (
                          <span className="text-lg">📦</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-amber-900 dark:text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-amber-700/70 dark:text-muted-foreground truncate w-[200px]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-600/20 text-amber-800 dark:text-amber-400">
                      {product.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-amber-900 dark:text-foreground">
                    {new Intl.NumberFormat("en-ZA", {
                      style: "currency",
                      currency: "ZAR",
                    }).format(product.priceInCents / 100)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-900 dark:text-foreground">
                        {product.stock}
                        {product.unit ? ` ${product.unit}${product.stock !== 1 && !["g","kg","ml","l"].includes(product.unit) ? "s" : ""}` : ""}
                      </span>
                      {product.stock < 10 && product.stock > 0 && (
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                      )}
                      {product.stock === 0 && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    {product.stock === 0 ? (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-600/20 text-red-800 dark:text-red-400">
                        Out of Stock
                      </span>
                    ) : product.stock < 10 ? (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-600/20 text-orange-800 dark:text-orange-400">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-600/20 text-emerald-800 dark:text-emerald-400">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveMenu(activeMenu === product.id ? null : product.id)
                          }
                          className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-muted transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-amber-700 dark:text-foreground" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenu === product.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveMenu(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-card border border-amber-100 dark:border-border shadow-lg z-20 py-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-amber-50 dark:hover:bg-muted text-amber-900 dark:text-foreground"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Product
                              </button>
                              <button
                                onClick={() => handleDelete(product)}
                                className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-600/10 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Product
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-amber-100 dark:border-border">
        <p className="text-sm text-amber-700/70 dark:text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Dialogs */}
      {selectedProduct && (
        <>
          <EditProductDialog
            product={selectedProduct}
            categories={categories}
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedProduct(null);
            }}
          />
          <DeleteProductDialog
            product={selectedProduct}
            isOpen={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
              setSelectedProduct(null);
            }}
          />
        </>
      )}
    </div>
  );
}
