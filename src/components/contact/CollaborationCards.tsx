"use client";

import { motion } from "framer-motion";
import { COLLABORATION_TYPES } from "@/lib/contact-data";

export default function CollaborationCards({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (projectType: string) => void;
}) {
  return (
    <section className="px-6 py-20 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <h2
          className="text-[28px] sm:text-[34px]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400, color: "var(--foreground)" }}
        >
          Choose your collaboration
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Pick what fits best — it'll pre-fill the project type below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {COLLABORATION_TYPES.map((c, i) => {
          const active = selected === c.projectType;
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.projectType)}
              data-cursor-hover
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-[22px] border p-6 text-left transition-colors duration-300"
              style={{
                borderColor: active ? "var(--foreground)" : "var(--border)",
                background: active
                  ? "rgba(var(--hairline-rgb), 0.06)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] font-semibold" style={{ color: "var(--foreground)" }}>
                  {c.title}
                </h3>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px]"
                  style={{
                    borderColor: active ? "var(--foreground)" : "var(--border-strong)",
                    color: "var(--foreground)",
                    background: active ? "var(--foreground)" : "transparent",
                  }}
                >
                  {active ? (
                    <span style={{ color: "var(--background)" }}>✓</span>
                  ) : (
                    <span className="opacity-0">✓</span>
                  )}
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {c.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
