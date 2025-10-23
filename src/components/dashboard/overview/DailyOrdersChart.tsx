"use client";

import { useMemo } from "react";
import type { Order } from "@prisma/client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type MinimalOrder = Pick<Order, "placedAt">;

interface DailyOrdersChartProps {
  orders: MinimalOrder[];
}

function formatDayLabel(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function DailyOrdersChart({ orders }: DailyOrdersChartProps) {
  const data = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    // last 7 days inclusive => create 7 buckets
    start.setDate(now.getDate() - 6);

    const buckets: Record<string, { date: Date; count: number }> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      buckets[key] = { date: d, count: 0 };
    }

    orders.forEach((o) => {
      const d = new Date(o.placedAt);
      const key = d.toISOString().slice(0, 10);
      if (buckets[key]) {
        buckets[key].count += 1;
      }
    });

    return Object.values(buckets).map((b) => ({
      label: formatDayLabel(b.date),
      Orders: b.count,
    }));
  }, [orders]);

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#f0d9b5" opacity={0.6} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#8a6b3f" />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#8a6b3f" />
          <Tooltip />
          <Line type="monotone" dataKey="Orders" stroke="#f59e0b" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
