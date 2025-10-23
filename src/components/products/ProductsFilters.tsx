"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

type Category = { id: string; name: string; slug: string };

type Props = {
  categories: Category[];
  current: {
    q: string;
    category?: string;
    sort: string;
    page: number;
    perPage: number;
    min?: number;
    max?: number;
  };
  total: number;
};

export default function ProductsFilters({ categories, current, total }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(current.q ?? "");
  const [min, setMin] = useState(current.min?.toString() ?? "");
  const [max, setMax] = useState(current.max?.toString() ?? "");

  useEffect(() => {
    setQ(current.q ?? "");
    setMin(current.min?.toString() ?? "");
    setMax(current.max?.toString() ?? "");
  }, [current.q, current.min, current.max]);

  const setParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params?.toString());
    if (value && value.length > 0) next.set(key, value);
    else next.delete(key);
    next.delete("page"); // reset page on filter change
    router.push(`?${next.toString()}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParam("q", q);
    setParam("min", min);
    setParam("max", max);
  };

  const selectedCategory = current.category ?? "";
  const sort = current.sort ?? "name-asc";

  // Shared select styling for a modern, consistent look
  const selectClass =
    "appearance-none w-full pr-10 px-3 py-2.5 rounded-xl border border-amber-200 bg-amber-50/60 text-sm font-semibold text-amber-900 shadow-sm " +
    "focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-300 hover:border-amber-300 transition-colors";

  return (
    <div className="p-4 rounded-2xl border border-amber-200 bg-white text-amber-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700/80">Filters</p>
        <button
          type="button"
          onClick={() => {
            const next = new URLSearchParams(params?.toString());
            ["q", "category", "sort", "min", "max", "page", "perPage"].forEach((k) => next.delete(k));
            setQ("");
            setMin("");
            setMax("");
            router.push(`?${next.toString()}`);
          }}
          className="text-xs font-semibold text-amber-700/80 hover:text-amber-900 underline underline-offset-4"
        >
          Clear
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="search" className="text-xs font-semibold text-amber-800">Search</label>
          <div className="flex items-center gap-2">
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-amber-900 text-white text-sm font-semibold">
              Apply
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="category" className="text-xs font-semibold text-amber-800">Category</label>
          <div className="relative group">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setParam("category", e.target.value || undefined)}
              className={selectClass}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/70 group-hover:text-amber-900 transition-colors" />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="sort" className="text-xs font-semibold text-amber-800">Sort by</label>
          <div className="relative group">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className={selectClass}
            >
              <option value="name-asc">Name A→Z</option>
              <option value="name-desc">Name Z→A</option>
              <option value="price-asc">Price low→high</option>
              <option value="price-desc">Price high→low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/70 group-hover:text-amber-900 transition-colors" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-amber-800">Price range (ZAR cents)</label>
          <div className="flex items-center gap-2">
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-sm"
            />
            <span className="text-amber-700/60">–</span>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-sm"
            />
          </div>
        </div>

        <div className="pt-2 text-xs font-semibold text-amber-700/70">{total} items</div>
      </form>
    </div>
  );
}
