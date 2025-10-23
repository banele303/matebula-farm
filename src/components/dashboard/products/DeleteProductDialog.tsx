"use client";

import { useState } from "react";
import { Product, ProductCategory, ProductImage } from "@prisma/client";
import { X, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

type ProductWithRelations = Product & {
  category: ProductCategory | null;
  images: ProductImage[];
};

interface DeleteProductDialogProps {
  product: ProductWithRelations;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteProductDialog({ product, isOpen, onClose }: DeleteProductDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const deleteToast = toast.loading("Deleting product...");

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (response.status === 409 && data?.code === "HAS_ORDER_ITEMS") {
          throw new Error(
            "This product has existing order history and cannot be deleted. You can deactivate it instead so it no longer appears in the store."
          );
        }
        throw new Error(data?.error || "Failed to delete product");
      }

      toast.success("Product deleted successfully!", {
        id: deleteToast,
        description: `${product.name} has been removed from your inventory`,
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product", {
        id: deleteToast,
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => !isLoading && onClose()}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-md border border-amber-100 dark:border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-600/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-amber-900 dark:text-foreground">
                Delete Product
              </h2>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-amber-700 dark:text-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-amber-900 dark:text-foreground">
              Are you sure you want to delete <span className="font-bold">{product.name}</span>?
            </p>
            <p className="text-sm text-amber-700/70 dark:text-muted-foreground">
              This action cannot be undone. If this product has existing orders, deletion will be blocked to preserve order history.
            </p>

            {/* Product Info */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-muted border border-amber-100 dark:border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 flex items-center justify-center overflow-hidden">
                  {product.images[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].altText || product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">📦</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-900 dark:text-foreground">
                    {product.name}
                  </p>
                  <p className="text-xs text-amber-700/70 dark:text-muted-foreground">
                    {product.category?.name || "Uncategorized"} • {product.stock} in stock
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-amber-100 dark:border-border">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl border border-amber-200 dark:border-border hover:bg-amber-50 dark:hover:bg-muted transition-colors text-amber-900 dark:text-foreground font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
