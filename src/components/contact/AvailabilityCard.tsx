"use client";

import { motion } from "framer-motion";

export default function AvailabilityCard() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-2xl items-center gap-4 rounded-full border px-6 py-4"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
        }}
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full"
            style={{ background: "#4ADE80" }}
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <span
            className="relative inline-flex h-3 w-3 rounded-full"
            style={{ background: "#4ADE80" }}
          />
        </span>
        <span className="text-[14px] font-medium" style={{ color: "var(--foreground)" }}>
          Available for Freelance &amp; Full-Time Opportunities
        </span>
      </motion.div>
    </section>
  );
}
