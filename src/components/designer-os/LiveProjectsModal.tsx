"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function LiveProjectsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "linear-gradient(180deg, rgba(28,28,30,0.96), rgba(14,14,16,0.98))",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(28,28,30,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 className="text-[17px] font-semibold" style={{ color: "#F5F5F5" }}>
            Live Projects
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.08)", color: "#F5F5F5" }}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          {CASE_STUDIES.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.06 }}
              className="flex flex-col overflow-hidden rounded-xl border"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex h-24 items-center justify-center px-4" style={{ background: project.bg }}>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em]"
                  style={{ background: "rgba(0,0,0,0.35)", color: "#F5F5F5" }}
                >
                  {project.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                <h3 className="text-[15px] font-semibold leading-snug" style={{ color: "#F5F5F5" }}>
                  {project.title}
                </h3>
                <p className="flex-1 text-[13px] leading-relaxed" style={{ color: "#A8A8A8" }}>
                  {project.desc}
                </p>
                <Link
                  href={`/case-studies/${project.slug}`}
                  target="_blank"
                  className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium transition-transform active:scale-95"
                  style={{ background: "#6EA8FE", color: "#050505" }}
                >
                  View Project →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
