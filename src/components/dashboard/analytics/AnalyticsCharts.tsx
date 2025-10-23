"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useMemo } from "react";

type RevenuePoint = { label: string; Orders: number; Revenue: number };
type StatusPoint = { status: string; count: number };
type CategoryPoint = { category: string; revenue: number };
type ProductPoint = { name: string; revenue: number };
type ProvincePoint = { province: string; count: number };

export function AnalyticsCharts({
  revenueSeries,
  statusData,
  salesByCategory,
  topProducts,
  ordersByProvince,
}: {
  revenueSeries: RevenuePoint[];
  statusData: StatusPoint[];
  salesByCategory: CategoryPoint[];
  topProducts: ProductPoint[];
  ordersByProvince: ProvincePoint[];
}) {
  const COLORS = ["#f59e0b", "#fb923c", "#fbbf24", "#eab308", "#fcd34d", "#fde68a", "#78350f", "#a16207"];

  const statusTotal = useMemo(() => statusData.reduce((s, x) => s + x.count, 0), [statusData]);

  return (
    <div className="grid gap-8 xl:grid-cols-3">
      {/* Revenue and Orders over time */}
      <div className="xl:col-span-2 rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900 dark:text-foreground">Revenue & Orders</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-900">ZAR</span>
          </div>
        </div>
  <div className="h-72 min-h-[18rem] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueSeries} margin={{ left: 8, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5d5a5" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#92400e"/>
              <YAxis yAxisId="left" orientation="left" stroke="#92400e" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#92400e" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Revenue" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="Orders" stroke="#78350f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by status (donut) */}
      <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900 dark:text-foreground">Orders by Status</h3>
          <p className="text-xs text-amber-700/70">{statusTotal} total</p>
        </div>
  <div className="h-72 min-h-[18rem] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} dataKey="count" nameKey="status" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales by category (bar) */}
      <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900 dark:text-foreground">Sales by Category</h3>
        </div>
  <div className="h-72 min-h-[18rem] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByCategory} margin={{ left: 8, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5d5a5" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#92400e"/>
              <YAxis stroke="#92400e" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products (area) */}
      <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900 dark:text-foreground">Top Products</h3>
        </div>
  <div className="h-72 min-h-[18rem] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={topProducts} margin={{ left: 8, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5d5a5" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#92400e"/>
              <YAxis stroke="#92400e" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by day (bar) */}
      <div className="rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900 dark:text-foreground">Orders by Day</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueSeries} margin={{ left: 8, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5d5a5" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#92400e"/>
              <YAxis stroke="#92400e" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="Orders" fill="#78350f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by province (radar) */}
      <div className="xl:col-span-3 rounded-2xl border border-amber-100 dark:border-border bg-white dark:bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-amber-900 dark:text-foreground">Orders by Province</h3>
        </div>
  <div className="h-96 min-h-[24rem] min-w-0 max-w-5xl mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={ordersByProvince} outerRadius="80%">
              <PolarGrid />
              <PolarAngleAxis dataKey="province" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis />
              <Radar name="Orders" dataKey="count" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
