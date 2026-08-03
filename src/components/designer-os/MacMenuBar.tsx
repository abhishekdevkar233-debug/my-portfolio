"use client";

import { useEffect, useState } from "react";

const MENUS = ["File", "Edit", "View", "Go", "Window", "Help"];

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function MacMenuBar({
  onToggleControlCenter,
}: {
  onToggleControlCenter: () => void;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-x-0 top-0 z-30 flex h-8 items-center justify-between px-4 text-[13px] font-medium sm:px-5"
      style={{
        color: "#F5F5F5",
        background: "rgba(20,20,22,0.45)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <span aria-hidden="true" className="text-[15px] leading-none"></span>
        <span className="font-semibold">Portfolio</span>
        <div className="hidden items-center gap-4 opacity-80 sm:flex">
          {MENUS.map((menu) => (
            <span key={menu}>{menu}</span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleControlCenter}
        className="flex items-center gap-3 rounded-md px-1.5 py-0.5 opacity-90 transition-colors hover:bg-white/10 sm:gap-4"
        aria-label="Control Center"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <path d="M5 12.86a10 10 0 0 1 14 0" />
          <path d="M8.5 16.4a5 5 0 0 1 7 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="7" width="17" height="10" rx="2" />
          <path d="M22 10v4" />
          <rect x="4" y="9" width="11" height="6" fill="currentColor" stroke="none" />
        </svg>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
        <span className="tabular-nums">{time ?? ""}</span>
      </button>
    </div>
  );
}
