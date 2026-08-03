"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DesktopFolder } from "@/lib/designer-os-data";

const FolderGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path
      d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
      fill="url(#folder-gradient)"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="folder-gradient" x1="3" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6EA8FE" />
        <stop offset="1" stopColor="#8FBBFF" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </svg>
);

export default function DesktopFolderIcon({
  folder,
  onOpen,
}: {
  folder: DesktopFolder;
  onOpen: (folder: DesktopFolder) => void;
}) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (selected) {
      onOpen(folder);
      setSelected(false);
    } else {
      setSelected(true);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onDoubleClick={() => onOpen(folder)}
      onMouseLeave={() => setSelected(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="flex w-[92px] flex-col items-center gap-2 rounded-xl px-2 py-3 text-center"
      style={{
        background: selected ? "rgba(110,168,254,0.14)" : "transparent",
        border: selected ? "1px solid rgba(110,168,254,0.3)" : "1px solid transparent",
      }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <FolderGlyph />
      </div>
      <span className="text-[11px] font-medium leading-tight text-[#F5F5F5]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
        {folder.name}
      </span>
    </motion.button>
  );
}
