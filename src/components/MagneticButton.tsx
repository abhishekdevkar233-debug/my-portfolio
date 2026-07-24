"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium transition-colors duration-200 ease-out";
  const styles =
    variant === "primary"
      ? "bg-[#6EA8FE] text-[#050505] hover:bg-[#8FBBFF]"
      : "border border-white/[0.12] text-[#F5F5F5] hover:border-white/25 hover:bg-white/[0.03]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${styles}`}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}
