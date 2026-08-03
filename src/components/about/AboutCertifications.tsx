"use client";

import { motion } from "framer-motion";

const CERTIFICATIONS = [
  { title: "Google UX Design Certificate", issuer: "Google / Coursera" },
  { title: "UI/UX Design Specialization", issuer: "CalArts / Coursera" },
  { title: "Design Systems Fundamentals", issuer: "Interaction Design Foundation" },
];

export default function AboutCertifications() {
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
        Certifications
      </motion.h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            className="rounded-2xl border p-5"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "rgba(110,168,254,0.15)", color: "#6EA8FE" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
                <path d="M8.5 11 6 22l6-3 6 3-2.5-11" />
              </svg>
            </div>
            <h3 className="mt-3 text-[15px] font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
              {cert.title}
            </h3>
            <p className="mt-1 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
              {cert.issuer}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
