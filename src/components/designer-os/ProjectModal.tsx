"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/case-studies";

export default function ProjectModal({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}) {
  if (!caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background:
            "linear-gradient(180deg, rgba(24,24,26,0.96), rgba(10,10,11,0.98))",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#F5F5F5] transition-colors hover:bg-white/10"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          ✕
        </button>

        <div className="relative h-[180px] w-full sm:h-[220px]" style={{ background: caseStudy.bg }}>
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <span
              className="mb-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em]"
              style={{ background: "rgba(0,0,0,0.35)", color: "#F5F5F5" }}
            >
              {caseStudy.tag}
            </span>
            <h3
              className="text-[26px] leading-tight sm:text-[32px]"
              style={{ fontFamily: "var(--font-instrument-serif)", color: "#F5F5F5" }}
            >
              {caseStudy.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-[15px] leading-relaxed text-[#A8A8A8]">
            {caseStudy.overview}
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {caseStudy.sections.map((section) => (
              <div key={section.heading}>
                <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#6EA8FE]">
                  {section.heading}
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#A8A8A8]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.08] p-4">
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#F5F5F5]">
              Outcome
            </div>
            <p className="mt-1.5 text-[14px] leading-relaxed text-[#A8A8A8]">
              {caseStudy.outcome}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/case-studies/${caseStudy.slug}`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium transition-colors"
              style={{ background: "#6EA8FE", color: "#050505" }}
            >
              View Full Case Study →
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[13px] font-medium text-[#F5F5F5] transition-colors hover:border-white/25"
            >
              Prototype
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[13px] font-medium text-[#F5F5F5] transition-colors hover:border-white/25"
            >
              Behance
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[13px] font-medium text-[#F5F5F5] transition-colors hover:border-white/25"
            >
              Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
