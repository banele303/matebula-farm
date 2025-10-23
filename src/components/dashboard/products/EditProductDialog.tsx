"use client";

import { useEffect, useState } from "react";
import { Product, ProductCategory, ProductImage } from "@prisma/client";
import { X, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";
import Image from "next/image";

type ProductWithRelations = Product & {
  category: ProductCategory | null;
  images: ProductImage[];
  // Optional to avoid type errors until Prisma client is regenerated
  onSale?: boolean;
  saleDiscountPercent?: number | null;
  saleEndsAt?: Date | null;
};

interface EditProductDialogProps {
  product: ProductWithRelations;
  categories: ProductCategory[];
  isOpen: boolean;
  onClose: () => void;
}

export function EditProductDialog({ product, categories, isOpen, onClose }: EditProductDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [existingImages, setExistingImages] = useState<ProductImage[]>(product.images || []);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description || "",
    priceInCents: (product.priceInCents / 100).toString(),
    categoryId: product.categoryId || "",
    stock: product.stock.toString(),
    unit: product.unit || "",
    onSale: product.onSale ?? false,
    saleDiscountPercent: product.saleDiscountPercent?.toString() ?? "",
    saleEndsAt: product.saleEndsAt ? new Date(product.saleEndsAt).toISOString().slice(0, 10) : "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Refresh product images when dialog opens to avoid stale thumbnails
  useEffect(() => {
    if (!isOpen) return;
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`/api/products/${product.id}`);
        if (!res.ok) return;
        const fresh = await res.json();
        if (!ignore) setExistingImages(fresh.images || []);
      } catch {
        // ignore fetch errors for images preview
      }
    })();
    return () => {
      ignore = true;
    };
  }, [isOpen, product.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

  let progressToast: string | number | undefined;

    try {
      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        // Server-side upload (same behavior as before): browser -> Next.js -> S3
        const form = new FormData();
        selectedFiles.forEach((f) => form.append("files", f));
        const uploadRes = await fetch("/api/uploads", { method: "POST", body: form });
        if (!uploadRes.ok) {
          const err: { error?: string } = await uploadRes.json().catch(() => ({}));
          throw new Error(`Upload failed (${uploadRes.status}): ${err.error || uploadRes.statusText}`);
        }
        const { urls } = await uploadRes.json();
        imageUrls = urls || [];

        progressToast = toast.loading("Updating product...");
      }

      // Step 3: Patch the product record
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          priceInCents: parseInt(formData.priceInCents) * 100,
          stock: parseInt(formData.stock),
          onSale: Boolean(formData.onSale),
          saleDiscountPercent: formData.onSale && formData.saleDiscountPercent ? parseInt(formData.saleDiscountPercent) : null,
          saleEndsAt: formData.onSale && formData.saleEndsAt ? formData.saleEndsAt : null,
          imageUrls,
        }),
      });

      if (!response.ok) throw new Error(`Update product failed (${response.status}): ${response.statusText}`);

      toast.success("Product updated successfully!", {
        id: progressToast,
        description: `${formData.name} has been updated`,
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product", {
        id: progressToast,
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
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-amber-100 dark:border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-border">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 dark:text-foreground">
                Edit Product
              </h2>
              <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
                Update product details
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-amber-700 dark:text-foreground" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground resize-none"
              />
            </div>

            {/* Unit, Price and Stock */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                  Unit *
                </label>
                <select
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
                >
                  <option value="">Select a unit</option>
                  <option value="piece">Piece</option>
                  <option value="pack">Pack</option>
                  <option value="box">Box</option>
                  <option value="tray">Tray</option>
                  <option value="bunch">Bunch</option>
                  <option value="dozen">Dozen</option>
                  <option value="g">Gram (g)</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="ml">Millilitre (ml)</option>
                  <option value="l">Litre (l)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                  Price (ZAR) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.priceInCents}
                  onChange={(e) => setFormData({ ...formData, priceInCents: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                Category *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sale Settings */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 sm:col-span-1">
                <input
                  id="onSaleEdit"
                  type="checkbox"
                  checked={formData.onSale}
                  onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
                  className="h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="onSaleEdit" className="text-sm font-semibold text-amber-900 dark:text-foreground">
                  On Sale
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                  Discount % {formData.onSale ? "*" : "(disabled)"}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={formData.saleDiscountPercent}
                  onChange={(e) => setFormData({ ...formData, saleDiscountPercent: e.target.value })}
                  disabled={!formData.onSale}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                  Sale Ends
                </label>
                <input
                  type="date"
                  value={formData.saleEndsAt}
                  onChange={(e) => setFormData({ ...formData, saleEndsAt: e.target.value })}
                  min={today}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground appearance-none dark:[color-scheme:dark]"
                />
              </div>
            </div>

            {/* Existing Images */}
            {existingImages?.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                  Existing Images
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {existingImages.map((img) => (
                    <div key={img.id} className="relative w-full aspect-square overflow-hidden rounded-xl border border-amber-100 dark:border-border bg-amber-50/30 dark:bg-muted">
                      <Image
                        src={img.url}
                        alt={img.altText || product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                Add New Images (Optional)
              </label>
              <ImageUpload
                files={selectedFiles}
                onChange={setSelectedFiles}
                maxFiles={10}
                required={false}
              />
              <p className="text-xs text-amber-700/70 dark:text-muted-foreground mt-2">
                New images will be added to existing ones
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-100 dark:border-border">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl border border-amber-200 dark:border-border hover:bg-amber-50 dark:hover:bg-muted transition-colors text-amber-900 dark:text-foreground font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
