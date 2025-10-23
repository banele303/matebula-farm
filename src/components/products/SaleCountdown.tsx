"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

type Props = {
  saleEndsAt: string; // ISO string
  className?: string;
  variant?: "compact" | "detailed";
};

function getTimeRemaining(ms: number) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, ended: false };
}

export function SaleCountdown({ saleEndsAt, className, variant = "compact" }: Props) {
  const end = useMemo(() => new Date(saleEndsAt).getTime(), [saleEndsAt]);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, end - now);
  const { days, hours, minutes, seconds, ended } = getTimeRemaining(remaining);

  if (!saleEndsAt) return null;

  if (ended) {
    return (
      <span className={className ?? "inline-flex items-center rounded-full bg-gray-400 text-white text-xs font-bold px-3 py-1.5"}>
        Sale Ended
      </span>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={className ?? "flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl px-4 py-3 shadow-lg"}>
        <Clock className="w-5 h-5 animate-pulse" />
        <div className="flex items-center gap-2 font-bold">
          {days > 0 && (
            <div className="flex flex-col items-center min-w-[3rem] bg-white/20 rounded-lg px-2 py-1">
              <span className="text-2xl leading-none">{days}</span>
              <span className="text-[10px] uppercase opacity-90">Day{days !== 1 ? 's' : ''}</span>
            </div>
          )}
          <div className="flex flex-col items-center min-w-[3rem] bg-white/20 rounded-lg px-2 py-1">
            <span className="text-2xl leading-none">{hours.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-90">Hours</span>
          </div>
          <span className="text-2xl leading-none opacity-70">:</span>
          <div className="flex flex-col items-center min-w-[3rem] bg-white/20 rounded-lg px-2 py-1">
            <span className="text-2xl leading-none">{minutes.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-90">Mins</span>
          </div>
          <span className="text-2xl leading-none opacity-70">:</span>
          <div className="flex flex-col items-center min-w-[3rem] bg-white/20 rounded-lg px-2 py-1">
            <span className="text-2xl leading-none">{seconds.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase opacity-90">Secs</span>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant
  const compactLabel = days > 0 
    ? `${days}d ${hours}h ${minutes}m`
    : hours > 0 
    ? `${hours}h ${minutes}m ${seconds}s`
    : `${minutes}m ${seconds}s`;

  return (
    <span
      className={className ?? "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 shadow-md animate-pulse"}
      title={`Sale ends: ${new Date(saleEndsAt).toLocaleString()}`}
    >
      <Clock className="w-3.5 h-3.5" />
      Ends in {compactLabel}
    </span>
  );
}

export default SaleCountdown;
