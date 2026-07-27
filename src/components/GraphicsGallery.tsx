"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "./Navbar";
import { CATEGORIES, GRAPHICS_PROJECTS, type GraphicsProject } from "@/lib/graphics-projects";

function ProjectCard({ project, index }: { project: GraphicsProject; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const aspect = 16 / 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 6) * 0.06 }}
    >
      <Link
        href={`/graphics/${project.slug}`}
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative block overflow-hidden rounded-[20px] border"
        style={{
          borderColor: "var(--border)",
          perspective: 900,
        }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full"
        >
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageSrc}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              draggable={false}
              loading="lazy"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

            {/* hover reveal panel */}
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span
                className="mb-2 inline-block rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                {project.category}
              </span>
              <h3 className="text-lg font-semibold text-white" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
                {project.title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90">
                View Full Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>

            {/* always-visible title (mobile/no-hover fallback) */}
            <div className="absolute inset-x-0 bottom-0 p-5 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
              <span
                className="mb-1 inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-white/70"
              >
                {project.category}
              </span>
              <h3 className="text-lg font-semibold text-white" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
                {project.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function GraphicsGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return GRAPHICS_PROJECTS;
    return GRAPHICS_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      {/* hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(124,138,255,0.12), transparent 55%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1
            className="mx-auto max-w-3xl text-[40px] leading-[1.1] sm:text-[56px]"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 400,
              color: "var(--foreground)",
            }}
          >
            Graphic Design Collection
          </h1>
        </motion.div>

        {/* category chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full border px-4 py-2 text-[13px] font-medium transition-colors"
                style={{
                  borderColor: active ? "var(--foreground)" : "var(--border)",
                  background: active
                    ? "var(--foreground)"
                    : "rgba(var(--hairline-rgb), 0.03)",
                  color: active ? "var(--background)" : "var(--muted-foreground)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* grid of horizontal project boxes */}
      <section className="px-6 pb-28 sm:px-10 lg:px-16 xl:px-[120px]">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-[20px] border p-12 text-center text-[15px]"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            No projects in this category yet — check back soon.
          </div>
        )}
      </section>

      <footer
        className="px-6 py-10 text-center text-[12px] uppercase tracking-[0.25em] sm:px-10 lg:px-16"
        style={{ color: "var(--footer-foreground)" }}
      >
        © {new Date().getFullYear()} Abhishek Devkar — Crafted with care
      </footer>
    </div>
  );
}
