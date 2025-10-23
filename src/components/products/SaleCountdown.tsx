"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  saleEndsAt: string; // ISO string
  className?: string;
};

function formatRemaining(ms: number) {
  if (ms <= 0) return "Ended";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours.toString().padStart(2, "0")}h`;
  if (hours > 0) return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function SaleCountdown({ saleEndsAt, className }: Props) {
  const end = useMemo(() => new Date(saleEndsAt).getTime(), [saleEndsAt]);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    // Update more frequently when under 1 hour
    const tickMs = end - Date.now() <= 60 * 60 * 1000 ? 1000 : 30_000;
    const id = setInterval(() => setNow(Date.now()), tickMs);
    return () => clearInterval(id);
  }, [end]);

  const remaining = Math.max(0, end - now);
  const ended = remaining <= 0;
  const label = ended ? "Ended" : `Ends in ${formatRemaining(remaining)}`;

  if (!saleEndsAt) return null;

  return (
    <span
      className={
        className ??
        "inline-flex items-center rounded-full bg-red-600/95 text-white text-[10px] font-bold px-2.5 py-1 shadow-md"
      }
      title={new Date(saleEndsAt).toLocaleString()}
    >
      {label}
    </span>
  );
}

export default SaleCountdown;
