"use client";

import { useEffect, useMemo, useState } from "react";
import { Address, Order, OrderItem, User } from "@prisma/client";
import { Search, MoreVertical, Eye } from "lucide-react";

export type CustomerWithRelations = User & {
  addresses: Address[];
  orders: (Order & { items: OrderItem[] })[];
};

interface CustomersTableProps {
  customers: CustomerWithRelations[];
  ordersByUser: Record<string, number>;
}

export function CustomersTable({ customers, ordersByUser }: CustomersTableProps) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(customers);
  const [pageSize, setPageSize] = useState<10 | 20>(10);
  const [page, setPage] = useState(1);

  useEffect(() => setRows(customers), [customers]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((c) =>
      (c.name?.toLowerCase() || "").includes(q) ||
      (c.email?.toLowerCase() || "").includes(q)
    );
  }, [rows, query]);

  useEffect(() => setPage(1), [query, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const pageRows = filtered.slice(startIndex, startIndex + pageSize);
  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(filtered.length, startIndex + pageSize);

  return (
    <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card shadow-sm">
      <div className="p-6 border-b border-amber-100 dark:border-border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring focus:border-amber-500 dark:focus:border-input"
            />
          </div>
          <div>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value) as 10 | 20)}
              className="px-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
            >
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-amber-50/80 dark:bg-muted text-left text-xs uppercase tracking-widest text-amber-700/70 dark:text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Orders</th>
              <th className="px-6 py-4 font-semibold">Addresses</th>
              <th className="px-6 py-4 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-amber-700/70 dark:text-muted-foreground">
                  {query ? "No customers match your search" : "No customers yet."}
                </td>
              </tr>
            ) : (
              pageRows.map((c) => (
                <tr key={c.id} className="border-t border-amber-100/80 dark:border-border hover:bg-amber-50/30 dark:hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-amber-900 dark:text-foreground">{c.name || "Customer"}</td>
                  <td className="px-6 py-4">{c.email || "-"}</td>
                  <td className="px-6 py-4">{ordersByUser[c.id] || 0}</td>
                  <td className="px-6 py-4">{c.addresses.length}</td>
                  <td className="px-6 py-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-amber-100 dark:border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-amber-700/70 dark:text-muted-foreground">Showing {showingFrom}-{showingTo} of {filtered.length}</p>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-amber-200/70 dark:border-input text-sm font-semibold text-amber-900 dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-muted"
          >
            Previous
          </button>
          <span className="text-sm text-amber-700/80 dark:text-muted-foreground">Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-amber-200/70 dark:border-input text-sm font-semibold text-amber-900 dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-muted"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
