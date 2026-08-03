"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function CaseStudiesIndex() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      <main className="px-6 pb-24 pt-16 sm:px-10 lg:px-16 xl:px-[220px]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            ← Back to home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mb-14"
        >
          <h1
            className="text-[40px] sm:text-[56px]"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "var(--foreground)",
            }}
          >
            All Case Studies
          </h1>
          <p
            className="mt-4 max-w-xl text-[16px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Every selected work in one place — enterprise platforms,
            government services, fintech, and AI products.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {CASE_STUDIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (i % 4) * 0.06 }}
            >
              <Link
                href={`/case-studies/${c.slug}`}
                className="group relative block overflow-hidden rounded-[28px] border shadow-sm"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
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

                  <div className="relative flex justify-end">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/iphone-16-pro-mockup.png"
                      alt={`${c.title} shown on an iPhone 16 Pro`}
                      className="-mb-10 w-full max-w-[320px] select-none transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105 sm:max-w-[400px] lg:max-w-[460px]"
                      draggable={false}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
