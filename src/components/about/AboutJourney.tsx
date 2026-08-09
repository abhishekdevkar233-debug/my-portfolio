"use client";

import { motion } from "framer-motion";

const JOURNEY = [
  {
    org: "USD Services",
    role: "UI/UX Designer",
    period: "2021 — 2023",
    description:
      "Started my design journey by crafting intuitive digital experiences and transforming business requirements into thoughtful, user-centered 	product interfaces. Developed a strong foundation in interaction design, usability, and visual design.",
  },
  {
    org: "Vinsys IT Services",
    role: "UI/UX Designer",
    period: "2023 — Present",
    description:
      "Designing impactful digital experiences across enterprise SaaS, government, and AI-driven products. Leading end-to-end design initiatives with a focus on usability, scalability, consistency, and seamless user experiences.",
  },
];

export default function AboutJourney() {
  return (
    <section className="px-6 py-22 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[28px] sm:text-[34px]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 400,
          color: "var(--foreground)",
        }}
      >
        My design journey
      </motion.h2>

      <div className="mt-10 flex flex-col">
        {JOURNEY.map((step, i) => (
          <motion.div
            key={step.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="flex gap-6 border-t py-8 first:pt-0"
            style={{
              borderColor: i === 0 ? "transparent" : "var(--border)",
              textAlign: "justify",
            }}
          >
            <div className="flex flex-col items-center pt-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: "#6EA8FE" }}
              />
              {i < JOURNEY.length - 1 && (
                <span
                  className="mt-2 w-px flex-1"
                  style={{ background: "var(--border)" }}
                />
              )}
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3
                  className="text-[19px] font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {step.org}
                </h3>
                <span
                  className="text-[12px] font-medium uppercase tracking-[0.15em]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {step.period}
                </span>
              </div>
              <p
                className="mt-1 text-[13px] font-medium"
                style={{ color: "#6EA8FE" }}
              >
                {step.role}
              </p>
              <p
                className="mt-3 max-w-xl text-[15px] leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
