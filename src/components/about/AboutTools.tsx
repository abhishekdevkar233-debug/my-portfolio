"use client";

import { motion } from "framer-motion";
import { DESKTOP_TOOLS } from "@/lib/designer-os-data";

export default function AboutTools() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[220px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[28px] sm:text-[34px]"
        style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400, color: "var(--foreground)" }}
      >
        Software &amp; tool knowledge
      </motion.h2>

      <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {DESKTOP_TOOLS.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.04 }}
            className="flex flex-col items-center gap-2.5 rounded-2xl border p-4"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[22%]"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tool.logo} alt={tool.name} className="h-6 w-6 object-contain" draggable={false} />
            </div>
            <span className="text-center text-[12px] font-medium" style={{ color: "var(--foreground)" }}>
              {tool.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
