"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCardParallax } from "@/components/ui/parallax-card";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

const MotionLink = motion.create(Link);

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  const { containerRef, tiltRef } = useCardParallax<HTMLAnchorElement, HTMLDivElement>(
    i % 2 === 0 ? -1.5 : 1.5
  );

  return (
    <MotionLink
      ref={containerRef}
      href={`/case-studies/${c.slug}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
      className="group relative block overflow-hidden rounded-[28px] border shadow-sm transition-shadow hover:shadow-2xl hover:shadow-black/40"
      style={{
        borderColor: "var(--border)",
        background: c.bg,
      }}
    >
      <div
        ref={tiltRef}
        className="grid grid-cols-1 items-center gap-8 px-10 py-8 sm:px-12 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16"
      >
      <div data-parallax-layer="front">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.25em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {String(i + 1).padStart(2, "0")} &bull; {c.tag}
        </span>
        <h3
          className="mt-4 font-[var(--font-instrument-serif)] text-[28px] leading-[1.15] sm:text-[34px]"
          style={{ color: "var(--foreground)" }}
        >
          {c.title}
        </h3>
        <p
          className="mt-4 max-w-md text-[15px] leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {c.desc}
        </p>
        <span
          className="mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13px] font-medium transition-colors"
          style={{
            borderColor: "var(--border-strong)",
            background: "rgba(var(--hairline-rgb), 0.04)",
            color: "var(--foreground)",
          }}
        >
          View Case Study
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>

      {/* phone mockup */}
      <div className="relative flex justify-center lg:justify-end">
        <div
          data-parallax-layer="back"
          className="relative -mb-10 w-[220px] overflow-hidden rounded-[24px] border shadow-xl transition-transform duration-500 group-hover:-translate-y-1 sm:w-[240px]"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-2)",
          }}
        >
          <div className="h-2.5 w-full" style={{ background: c.accent }} />
          <div className="space-y-3 p-4">
            <div
              className="h-2 w-14 rounded-full"
              style={{ background: c.tint, opacity: 0.7 }}
            />
            <div className="text-[11px] font-medium" style={{ color: "var(--foreground)" }}>
              {c.screen.heading}
            </div>
            <div className="text-[9px] leading-relaxed" style={{ color: "var(--subtle-foreground)" }}>
              {c.screen.sub}
            </div>
            <div className="space-y-2 pt-1">
              {[0, 1, 2].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between rounded-lg px-2.5 py-2"
                  style={{ background: "rgba(var(--hairline-rgb), 0.04)" }}
                >
                  <div
                    className="h-1.5 w-16 rounded-full"
                    style={{ background: "rgba(var(--hairline-rgb), 0.14)" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: c.tint, opacity: 0.8 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </MotionLink>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14"
      >
        <h2
          className="text-[32px] sm:text-[40px]"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 400,
          }}
        >
          Selected work
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Stories which encapsulate my thought process &amp; display my
          prowess in interactive design.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {CASE_STUDIES.map((c, i) => (
          <CaseCard key={c.title} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}
