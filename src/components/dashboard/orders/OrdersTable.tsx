"use client";

import { useEffect, useMemo, useState } from "react";
import { Order, OrderItem, Address, User, OrderStatus } from "@prisma/client";
import { Search, MoreVertical, Eye, ChevronDown } from "lucide-react";
import { OrderDetailsDialog } from "@/components/dashboard/orders/OrderDetailsDialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type OrderWithRelations = Order & {
  user: User;
  shippingAddress: Address;
  items: (OrderItem & { product?: { name: string } | null })[];
};

interface OrdersTableProps {
  orders: OrderWithRelations[];
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    PENDING: "bg-orange-100 text-orange-800 dark:bg-orange-600/20 dark:text-orange-400",
    PAID: "bg-emerald-100 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-400",
    FULFILLED: "bg-blue-100 text-blue-800 dark:bg-blue-600/20 dark:text-blue-400",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-600/20 dark:text-red-400",
  };
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<OrderWithRelations | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [rows, setRows] = useState<OrderWithRelations[]>(orders);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<10 | 20>(10);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    setRows(orders);
  }, [orders]);

  const filtered = useMemo(() => {
    return rows.filter((o) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = (
        o.orderNumber.toLowerCase().includes(q) ||
        (o.user.name?.toLowerCase() || "").includes(q) ||
        (o.user.email?.toLowerCase() || "").includes(q) ||
        o.status.toLowerCase().includes(q)
      );
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rows, searchQuery, statusFilter]);

  // Reset to first page when filters or page size change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, pageSize, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const pageRows = filtered.slice(startIndex, startIndex + pageSize);
  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(filtered.length, startIndex + pageSize);

  const openDetails = (order: OrderWithRelations) => {
    setSelected(order);
    setIsDetailsOpen(true);
  };

  const statusOptions: OrderStatus[] = ["PENDING", "PAID", "FULFILLED", "CANCELLED"];

  async function updateStatus(orderId: string, next: OrderStatus) {
    // Optimistic update
    const prev = rows.find((r) => r.id === orderId)?.status;
    if (!prev || prev === next) return;

    setUpdating((m) => ({ ...m, [orderId]: true }));
    setRows((rs) => rs.map((r) => (r.id === orderId ? { ...r, status: next } : r)));
    const t = toast.loading("Updating status...");
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) {
        throw new Error((await res.json()).error || "Failed to update status");
      }
      toast.success("Order status updated", { id: t });
      // Refresh server data (KPIs etc.)
      router.refresh();
    } catch (err) {
      console.error(err);
      // Revert
      setRows((rs) => rs.map((r) => (r.id === orderId ? { ...r, status: prev } : r)));
      toast.error("Could not update status", {
        id: t,
        description: err instanceof Error ? err.message : "Please try again",
      });
    } finally {
      setUpdating((m) => {
        const { [orderId]: _, ...rest } = m;
        return rest;
      });
    }
  }

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
              placeholder="Search orders by number, name, email, status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring focus:border-amber-500 dark:focus:border-input"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FULFILLED">Shipped (Fulfilled)</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700/60 dark:text-muted-foreground" />
          </div>

          {/* Page size */}
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value) as 10 | 20)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-amber-200/70 dark:border-input bg-amber-50/30 dark:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:focus:ring-ring text-amber-900 dark:text-foreground"
            >
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
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
              <th className="px-6 py-4 font-semibold">Order</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Items</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-amber-700/70 dark:text-muted-foreground">
                  {searchQuery ? "No orders match your search" : "No orders yet."}
                </td>
              </tr>
            ) : (
              pageRows.map((o) => (
                <tr key={o.id} className="border-t border-amber-100/80 dark:border-border hover:bg-amber-50/30 dark:hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-amber-900 dark:text-foreground">#{o.orderNumber.slice(0, 8)}</span>
                      <span className="text-xs text-amber-700/70 dark:text-muted-foreground">{new Date(o.placedAt).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-amber-900 dark:text-foreground">{o.user.name || "Customer"}</span>
                      <span className="text-xs text-amber-700/70 dark:text-muted-foreground">{o.user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{o.items.reduce((sum, it) => sum + it.quantity, 0)}</td>
                  <td className="px-6 py-4 font-semibold text-amber-900 dark:text-foreground">
                    {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(o.totalInCents / 100)}
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === o.id ? null : o.id)}
                          className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-muted transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVertical className="w-4 h-4 text-amber-700 dark:text-foreground" />
                        </button>
                        {activeMenu === o.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-card border border-amber-100 dark:border-border shadow-lg z-20 py-2">
                              <button
                                onClick={() => {
                                  setActiveMenu(null);
                                  openDetails(o);
                                }}
                                className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-amber-50 dark:hover:bg-muted text-amber-900 dark:text-foreground"
                              >
                                <Eye className="w-4 h-4" />
                                View details
                              </button>
                              <div className="my-1 h-px bg-amber-100 dark:bg-border" />
                              {statusOptions.map((s) => (
                                <button
                                  key={s}
                                  disabled={!!updating[o.id] || o.status === s}
                                  onClick={() => {
                                    setActiveMenu(null);
                                    updateStatus(o.id, s);
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-amber-50 dark:hover:bg-muted text-amber-900 dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                  {s === "PENDING" && <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />}
                                  {s === "PAID" && <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />}
                                  {s === "FULFILLED" && <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />}
                                  {s === "CANCELLED" && <span className="inline-block w-2 h-2 rounded-full bg-red-600" />}
                                  <span>{s === "CANCELLED" ? "Cancel order" : `Mark ${s.toLowerCase()}`}</span>
                                </button>
                              ))}
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

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-amber-100 dark:border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-amber-700/70 dark:text-muted-foreground">
          Showing {showingFrom}-{showingTo} of {filtered.length}
        </p>
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

      {selected && (
        <OrderDetailsDialog order={selected} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
      )}
    </div>
  );
}
