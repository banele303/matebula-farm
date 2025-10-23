"use client";

import { useMemo, useState } from "react";
import type { Order } from "@prisma/client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type OrderForChart = Pick<Order, "placedAt" | "totalInCents">;

interface OrdersChartsProps {
  orders: OrderForChart[];
}

function formatCurrencyZAR(value: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);
}

function formatDayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function OrdersCharts({ orders }: OrdersChartsProps) {
  const [range, setRange] = useState<7 | 30 | 90>(30);

  const data = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (range - 1));

    // Build date buckets
    const buckets: Record<string, { date: Date; orders: number; revenue: number }> = {};
    for (let i = 0; i < range; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      buckets[key] = { date: d, orders: 0, revenue: 0 };
    }

    orders.forEach((o) => {
      const d = new Date(o.placedAt);
      // ignore outside range
      if (d < start || d > now) return;
      const key = d.toISOString().slice(0, 10);
      if (!buckets[key]) return;
      buckets[key].orders += 1;
      buckets[key].revenue += o.totalInCents / 100;
    });

    return Object.values(buckets).map((b) => ({
      label: formatDayLabel(b.date),
      Orders: b.orders,
      Revenue: Number(b.revenue.toFixed(2)),
    }));
  }, [orders, range]);

  return (
    <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-900 dark:text-foreground">Orders & Revenue</h3>
          <p className="text-sm text-amber-700/70 dark:text-muted-foreground">Last {range} days</p>
        </div>
        <div className="flex items-center gap-2">
          {[7, 30, 90].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r as 7 | 30 | 90)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                range === r
                  ? "bg-amber-100 border-amber-200 text-amber-900 dark:bg-amber-600/20 dark:border-border dark:text-amber-400"
                  : "border-amber-200/70 dark:border-input text-amber-700/80 dark:text-foreground hover:bg-amber-50 dark:hover:bg-muted"
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#f0d9b5" opacity={0.5} />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#8a6b3f" />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#8a6b3f" />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#8a6b3f" />
            <Tooltip formatter={(value: number, name: string) => (name === "Revenue" ? formatCurrencyZAR(value) : value)} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="Orders" stroke="#f59e0b" strokeWidth={3} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="Revenue" stroke="#059669" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
