"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

function CaseCard({
  c,
  i,
  progress,
  range,
  targetScale,
}: {
  c: CaseStudy;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex items-center justify-center sm:top-28">
      <motion.div style={{ scale, top: i * 14 }} className="relative w-full origin-top">
        <Link
          href={`/case-studies/${c.slug}`}
          className="group relative block overflow-hidden rounded-[28px] border shadow-2xl shadow-black/30"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          {/* opaque backing layer prevents the sticky-stacked card behind
              from bleeding through the tint gradient's transparent stop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: c.bg }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 px-10 py-8 sm:px-12 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
          <div>
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
              className="mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13px] font-medium"
              style={{
                borderColor: "var(--border-strong)",
                background: "rgba(var(--hairline-rgb), 0.04)",
                color: "var(--foreground)",
              }}
            >
              View Case Study
              <span>→</span>
            </span>
          </div>

          {/* phone mockup */}
          <div className="relative flex justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/iphone-16-pro-mockup.png"
              alt={`${c.title} shown on an iPhone 16 Pro`}
              className="-mb-10 w-full max-w-[320px] select-none transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:max-w-[400px] lg:max-w-[460px]"
              draggable={false}
            />
          </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="case-studies"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]"
    >
      <div className="mb-14">
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
      </div>

      <div ref={container} className="relative flex flex-col gap-16 pb-16 sm:pb-20">
        {CASE_STUDIES.map((c, i) => {
          const targetScale = Math.max(0.85, 1 - (CASE_STUDIES.length - i - 1) * 0.05);
          return (
            <CaseCard
              key={c.slug}
              c={c}
              i={i}
              progress={scrollYProgress}
              range={[i * (1 / CASE_STUDIES.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="flex justify-center"
      >
        <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-[14px] font-medium transition-all duration-300"
          style={{
            borderColor: "rgba(255,255,255,0.16)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            color: "var(--foreground)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
        >
          Explore All
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
