"use client";

import { useState } from "react";
import { Plus, X, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@prisma/client";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";

interface AddProductDialogProps {
  categories: ProductCategory[];
}

export function AddProductDialog({ categories }: AddProductDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceInCents: "",
    categoryId: "",
    stock: "",
    unit: "",
    onSale: false,
    saleDiscountPercent: "",
    saleEndsAt: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate images
    if (selectedFiles.length === 0) {
      toast.error("Images required", {
        description: "Please upload at least one product image",
      });
      return;
    }

  setIsLoading(true);
  let progressToast: string | number | undefined;

    try {
      // Server-side upload (same behavior as before): browser -> Next.js -> S3
      const form = new FormData();
      selectedFiles.forEach((f) => form.append("files", f));
      const uploadRes = await fetch("/api/uploads", { method: "POST", body: form });
      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({} as any));
        throw new Error(`Upload failed (${uploadRes.status}): ${err.error || uploadRes.statusText}`);
      }
      const { urls: imageUrls } = await uploadRes.json();

  // Show a progress toast only when creating the product (after uploads complete)
  progressToast = toast.loading("Creating product...");

      // Create the product record
      const response = await fetch("/api/products", {
        method: "POST",
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

  if (!response.ok) throw new Error(`Create product failed (${response.status}): ${response.statusText}`);

      toast.success("Product created successfully!", {
        id: progressToast,
        description: `${formData.name} has been added to your inventory`,
      });

      setIsOpen(false);
      setFormData({
        name: "",
        description: "",
        priceInCents: "",
        categoryId: "",
        stock: "",
        unit: "",
        onSale: false,
        saleDiscountPercent: "",
        saleEndsAt: "",
      });
      setSelectedFiles([]);
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product", {
        id: progressToast,
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Product
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => !isLoading && setIsOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-amber-100 dark:border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-border">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 dark:text-foreground">
                Add New Product
              </h2>
              <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
                Fill in the details to add a new product to your inventory
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
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
                placeholder="e.g., Fresh Organic Eggs"
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
                placeholder="Describe your product..."
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
                  placeholder="0.00"
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
                  placeholder="0"
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
                  id="onSale"
                  type="checkbox"
                  checked={formData.onSale}
                  onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
                  className="h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="onSale" className="text-sm font-semibold text-amber-900 dark:text-foreground">
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
                  placeholder="e.g. 15"
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

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">
                Product Images *
              </label>
              <ImageUpload
                files={selectedFiles}
                onChange={setSelectedFiles}
                maxFiles={10}
                required={true}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-100 dark:border-border">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Product
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
