"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { GraphicsProject } from "@/lib/graphics-projects";
import { GRAPHICS_PROJECTS } from "@/lib/graphics-projects";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

export default function GraphicsProjectDetail({ project }: { project: GraphicsProject }) {
  const currentIndex = GRAPHICS_PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = GRAPHICS_PROJECTS[(currentIndex + 1) % GRAPHICS_PROJECTS.length];

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      <main className="px-6 pb-24 pt-16 sm:px-10 lg:px-16 xl:px-[160px]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <Link
            href="/graphics"
            className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            ← Back to gallery
          </Link>
        </motion.div>

        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: project.tint }}
          >
            {project.category}
          </span>
          <h1
            className="mt-4 max-w-3xl font-[var(--font-instrument-serif)] text-[36px] leading-[1.1] sm:text-[52px]"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h1>
          <p
            className="mt-5 max-w-xl text-[16px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {project.description}
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative mt-10 overflow-hidden rounded-[24px] border"
          style={{ borderColor: "var(--border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageSrc}
            alt={project.title}
            className="w-full object-cover"
            draggable={false}
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
            <h2
              className="text-[13px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--subtle-foreground)" }}
            >
              Tools used
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border px-3 py-1 text-[12px]"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
            <h2
              className="text-[13px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--subtle-foreground)" }}
            >
              Design highlights
            </h2>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2 text-[14px] leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <span style={{ color: project.tint }}>✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 border-t pt-10"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: "var(--subtle-foreground)" }}
          >
            Next project
          </div>
          <Link
            href={`/graphics/${next.slug}`}
            className="group mt-4 inline-flex items-center gap-3 font-[var(--font-instrument-serif)] text-[28px] sm:text-[34px]"
            style={{ color: "var(--foreground)" }}
          >
            {next.title}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
