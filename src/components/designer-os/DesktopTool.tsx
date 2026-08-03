"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DesktopTool } from "@/lib/designer-os-data";

const BASE_SIZE = 44;

export default function DesktopToolIcon({
  tool,
  index,
  hoveredIndex,
  onHover,
  onOpen,
}: {
  tool: DesktopTool;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  onOpen?: () => void;
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const distance = hoveredIndex === null ? Infinity : Math.abs(hoveredIndex - index);
  const scale = distance === 0 ? 1.55 : distance === 1 ? 1.22 : distance === 2 ? 1.08 : 1;
  const size = Math.round(BASE_SIZE * scale);

  return (
    <div className="relative flex flex-col items-center justify-end">
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-5 w-[220px] -translate-x-1/2 rounded-xl border p-4 text-left shadow-2xl"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(28,28,30,0.9)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold text-[#F5F5F5]">
                {tool.name}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                style={{ background: `${tool.tint}22`, color: tool.tint }}
              >
                {tool.level}
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-[#A8A8A8]">
              {tool.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onMouseEnter={() => {
          onHover(index);
          setTooltipOpen(true);
        }}
        onMouseLeave={() => {
          onHover(null);
          setTooltipOpen(false);
        }}
        onClick={onOpen}
        style={{
          width: size,
          height: size,
          transition: "width 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        className={`relative flex shrink-0 items-center justify-center rounded-[22%] ${onOpen ? "cursor-pointer" : "cursor-default"}`}
      >
        <div
          className="absolute inset-0 rounded-[22%]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.logo}
          alt={tool.name}
          className="relative h-[62%] w-[62%] select-none object-contain"
          draggable={false}
        />
      </div>

      <span
        className="mt-1.5 h-1 w-1 shrink-0 rounded-full transition-opacity duration-200"
        style={{ background: tool.tint, opacity: tooltipOpen ? 1 : 0 }}
      />
    </div>
  );
}
