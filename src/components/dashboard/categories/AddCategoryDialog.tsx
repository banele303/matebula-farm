"use client";

import { useState } from "react";
import { Plus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

export function AddCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const t = toast.loading("Creating category...");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create category");
      }
      toast.success("Category created", { id: t });
      setIsOpen(false);
      setName("");
      setDescription("");
      // simple refresh
      window.location.reload();
    } catch (err) {
      toast.error((err as Error).message, { id: t });
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Category
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => !isLoading && setIsOpen(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-md border border-amber-100 dark:border-border">
          <div className="flex items-center justify-between p-6 border-b border-amber-100 dark:border-border">
            <h2 className="text-xl font-bold text-amber-900 dark:text-foreground">Add Category</h2>
            <button onClick={() => setIsOpen(false)} disabled={isLoading} className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-muted">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-amber-900 dark:text-foreground mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-100 dark:border-border">
              <button type="button" onClick={() => setIsOpen(false)} disabled={isLoading} className="px-5 py-2.5 rounded-xl border border-amber-200 dark:border-border hover:bg-amber-50">Cancel</button>
              <button type="submit" disabled={isLoading} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold flex items-center gap-2">
                {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin"/>Creating...</>) : (<>Create</>)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
