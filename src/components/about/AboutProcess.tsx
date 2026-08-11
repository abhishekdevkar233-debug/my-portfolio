"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/contact-data";

export default function AboutProcess() {
  return (
    <section className="px-6 py-12 sm:px-10 sm:py-24 lg:px-16 xl:px-[160px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[28px] sm:text-[34px]"
        style={{
          fontFamily: "var(--font-instrument-serif)",
          color: "var(--foreground)",
        }}
      >
        My design process
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
            className="border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="text-[12px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--muted-foreground)" }}
            >
              {step.step}
            </div>
            <div
              className="mt-2 text-[18px] font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {step.title}
            </div>
            <p
              className="mt-2 text-[14px] leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
