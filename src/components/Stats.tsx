"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "25+", label: "Projects" },
  { value: "8+", label: "Enterprise Products" },
  { value: "100%", label: "User Focused" },
];

export default function Stats() {
  return (
    <section
      className="border-y px-6 py-14 sm:px-10 lg:px-16"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
          >
            <div
              className="font-[var(--font-instrument-serif)] text-4xl sm:text-5xl"
              style={{ color: "#F5F5F5" }}
            >
              {stat.value}
            </div>
            <div
              className="mt-2 text-[12px] uppercase tracking-[0.2em]"
              style={{ color: "#A8A8A8" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
