"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/contact-data";

export default function ProcessTimeline() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14"
      >
        <h2
          className="text-[28px] sm:text-[34px]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400, color: "var(--foreground)" }}
        >
          My design process
        </h2>
      </motion.div>

      <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-6">
        <div
          className="absolute left-0 right-0 top-[18px] hidden sm:block"
          style={{ height: 1, background: "var(--border)" }}
          aria-hidden="true"
        />

        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            className="relative"
          >
            <div
              className="relative z-10 mb-4 flex h-9 w-9 items-center justify-center rounded-full border text-[12px] font-semibold"
              style={{
                borderColor: "var(--border-strong)",
                background: "var(--background)",
                color: "var(--foreground)",
              }}
            >
              {step.step}
            </div>
            <h3 className="text-[16px] font-semibold" style={{ color: "var(--foreground)" }}>
              {step.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
